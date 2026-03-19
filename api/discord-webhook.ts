type RequestLike = {
  method?: string;
  body?: unknown;
  json?: () => Promise<unknown>;
};

type ResponseLike = {
  status: (code: number) => {
    json: (payload: unknown) => unknown;
  };
};

type LeadPayload = {
  companyName?: string;
  phone?: string;
  industry?: string;
  source?: string;
  createdAt?: string;
  submission_page?: string;
  page_url?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  landing_page?: string;
  referrer?: string;
  first_seen_at?: string;
  last_seen_at?: string;
};

type DiscordEmbedField = {
  name: string;
  value: string;
  inline?: boolean;
};

type DiscordPayload = {
  content?: string | null;
  embeds?: Array<{
    title?: string;
    color?: number;
    fields?: DiscordEmbedField[];
    footer?: {
      text?: string;
    };
    timestamp?: string;
  }>;
};

type FormPayload = {
  hp?: string;
  honeypot?: string;
  lead?: LeadPayload;
  discord?: DiscordPayload;
};

function text(value: unknown) {
  return String(value || '').trim();
}

async function parsePayload(req: RequestLike): Promise<FormPayload> {
  if (typeof req.body === 'string' && req.body.trim().length > 0) {
    return JSON.parse(req.body) as FormPayload;
  }

  if (req.body && typeof req.body === 'object') {
    return req.body as FormPayload;
  }

  if (typeof req.json === 'function') {
    return (await req.json()) as FormPayload;
  }

  return {};
}

function toDiscordValue(value: unknown) {
  const normalized = text(value);
  return normalized ? normalized.slice(0, 1000) : '-';
}

function buildDiscordPayload(lead: LeadPayload, fallback?: DiscordPayload): DiscordPayload {
  if (fallback?.embeds?.length) {
    return fallback;
  }

  return {
    content: 'Nouveau lead recu depuis le formulaire lecyberassureur.fr',
    embeds: [
      {
        title: 'Nouveau lead Le Cyberassureur',
        color: 65535,
        fields: [
          { name: 'Entreprise', value: toDiscordValue(lead.companyName), inline: true },
          { name: 'Telephone', value: toDiscordValue(lead.phone), inline: true },
          { name: 'Secteur', value: toDiscordValue(lead.industry), inline: true },
          { name: 'UTM Source', value: toDiscordValue(lead.utm_source), inline: true },
          { name: 'UTM Medium', value: toDiscordValue(lead.utm_medium), inline: true },
          { name: 'UTM Campaign', value: toDiscordValue(lead.utm_campaign), inline: true },
          { name: 'Landing Page', value: toDiscordValue(lead.landing_page), inline: false },
          { name: 'Referrer', value: toDiscordValue(lead.referrer), inline: false },
        ],
        footer: {
          text: `Source: ${toDiscordValue(lead.source)} | Page: ${toDiscordValue(lead.submission_page)}`,
        },
        timestamp: lead.createdAt || new Date().toISOString(),
      },
    ],
  };
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, message: 'API discord-webhook active' });
  }

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Methode non autorisee' });
  }

  try {
    const payload = await parsePayload(req);

    if (text(payload.honeypot) || text(payload.hp)) {
      return res.status(200).json({ ok: true, skipped: true });
    }

    const lead = payload.lead || {};
    const companyName = text(lead.companyName);
    const phone = text(lead.phone);
    const industry = text(lead.industry);

    if (!companyName || !phone || !industry) {
      return res.status(400).json({ error: 'Champs lead manquants' });
    }

    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!discordWebhookUrl && !sheetsWebhookUrl) {
      return res.status(500).json({ error: 'Aucune destination webhook configuree cote serveur' });
    }

    const tasks: Promise<{ target: string; ok: boolean; status?: number; body?: string }>[] = [];

    if (discordWebhookUrl) {
      const discordPayload = buildDiscordPayload(
        {
          ...lead,
          companyName,
          phone,
          industry,
        },
        payload.discord,
      );

      tasks.push(
        fetch(discordWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(discordPayload),
        }).then(async (response) => ({
          target: 'discord',
          ok: response.ok,
          status: response.status,
          body: response.ok ? undefined : await response.text(),
        })),
      );
    }

    if (sheetsWebhookUrl) {
      tasks.push(
        fetch(sheetsWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            ...lead,
            companyName,
            phone,
            industry,
          }),
        }).then(async (response) => ({
          target: 'sheets',
          ok: response.ok,
          status: response.status,
          body: response.ok ? undefined : await response.text(),
        })),
      );
    }

    const results = await Promise.all(tasks);
    const successes = results.filter((result) => result.ok);
    const failures = results.filter((result) => !result.ok);

    failures.forEach((failure) => {
      console.error(`Erreur ${failure.target}:`, failure.status, failure.body);
    });

    if (successes.length === 0) {
      return res.status(500).json({ error: 'Toutes les destinations webhook ont echoue' });
    }

    return res.status(200).json({
      ok: true,
      warnings: failures.map((failure) => ({
        target: failure.target,
        status: failure.status,
      })),
    });
  } catch (error) {
    console.error('Erreur interne API:', error);
    return res.status(500).json({ error: 'Erreur interne API' });
  }
}
