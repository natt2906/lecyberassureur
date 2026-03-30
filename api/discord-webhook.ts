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
  status_label?: string;
  submission_status?: string;
  submitted_at?: string;
  abandoned_at?: string;
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

type NormalizedLeadPayload = {
  companyName: string;
  phone: string;
  industry: string;
  source: string;
  createdAt: string;
  status_label: string;
  submission_status: string;
  submitted_at: string;
  abandoned_at: string;
  submission_page: string;
  page_url: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  gclid: string;
  fbclid: string;
  landing_page: string;
  referrer: string;
  first_seen_at: string;
  last_seen_at: string;
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

function normalizeLeadPayload(lead: LeadPayload): NormalizedLeadPayload {
  const createdAt = text(lead.createdAt) || new Date().toISOString();
  const submissionStatus = text(lead.submission_status) || 'submitted';
  const isAbandoned = submissionStatus === 'not_submitted';

  return {
    companyName: text(lead.companyName),
    phone: text(lead.phone),
    industry: text(lead.industry),
    source: text(lead.source) || 'lecyberassureur.fr',
    createdAt,
    status_label: text(lead.status_label) || (isAbandoned ? 'Formulaire non soumis' : 'Formulaire soumis'),
    submission_status: submissionStatus,
    submitted_at: text(lead.submitted_at) || (isAbandoned ? '' : createdAt),
    abandoned_at: text(lead.abandoned_at) || (isAbandoned ? createdAt : ''),
    submission_page: text(lead.submission_page),
    page_url: text(lead.page_url),
    utm_source: text(lead.utm_source),
    utm_medium: text(lead.utm_medium),
    utm_campaign: text(lead.utm_campaign),
    utm_content: text(lead.utm_content),
    utm_term: text(lead.utm_term),
    gclid: text(lead.gclid),
    fbclid: text(lead.fbclid),
    landing_page: text(lead.landing_page),
    referrer: text(lead.referrer),
    first_seen_at: text(lead.first_seen_at),
    last_seen_at: text(lead.last_seen_at),
  };
}

function buildDiscordPayload(lead: NormalizedLeadPayload): DiscordPayload {
  const isAbandoned = lead.submission_status === 'not_submitted';

  return {
    content: isAbandoned
      ? 'Brouillon detecte: formulaire non soumis sur lecyberassureur.fr'
      : 'Nouveau lead recu depuis le formulaire lecyberassureur.fr',
    embeds: [
      {
        title: isAbandoned ? 'Formulaire non soumis Le Cyberassureur' : 'Nouveau lead Le Cyberassureur',
        color: isAbandoned ? 16753920 : 65535,
        fields: [
          { name: 'Statut', value: toDiscordValue(lead.status_label), inline: true },
          { name: 'Entreprise', value: toDiscordValue(lead.companyName), inline: true },
          { name: 'Telephone', value: toDiscordValue(lead.phone), inline: true },
          { name: 'Secteur', value: toDiscordValue(lead.industry), inline: true },
          { name: 'UTM Source', value: toDiscordValue(lead.utm_source), inline: true },
          { name: 'UTM Medium', value: toDiscordValue(lead.utm_medium), inline: true },
          { name: 'UTM Campaign', value: toDiscordValue(lead.utm_campaign), inline: true },
          { name: 'UTM Content', value: toDiscordValue(lead.utm_content), inline: true },
          { name: 'UTM Term', value: toDiscordValue(lead.utm_term), inline: true },
          { name: 'GCLID', value: toDiscordValue(lead.gclid), inline: false },
          { name: 'FBCLID', value: toDiscordValue(lead.fbclid), inline: false },
          { name: 'Landing Page', value: toDiscordValue(lead.landing_page), inline: false },
          { name: 'Referrer', value: toDiscordValue(lead.referrer), inline: false },
          { name: 'Page URL', value: toDiscordValue(lead.page_url), inline: false },
          ...(lead.abandoned_at
            ? [{ name: 'Abandonne le', value: toDiscordValue(lead.abandoned_at), inline: true }]
            : []),
          ...(lead.submitted_at
            ? [{ name: 'Soumis le', value: toDiscordValue(lead.submitted_at), inline: true }]
            : []),
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
    const normalizedLead = normalizeLeadPayload(lead);
    const { companyName, phone, industry, submission_status: submissionStatus } = normalizedLead;
    const isAbandoned = submissionStatus === 'not_submitted';

    if ((!companyName || !phone || !industry) && !isAbandoned) {
      return res.status(400).json({ error: 'Champs lead manquants' });
    }

    if (isAbandoned && !companyName && !phone && !industry) {
      return res.status(200).json({ ok: true, skipped: true, reason: 'Brouillon vide' });
    }

    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const sheetsWebhookUrl =
      process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;

    if (!discordWebhookUrl && !sheetsWebhookUrl) {
      return res.status(500).json({ error: 'Aucune destination webhook configuree cote serveur' });
    }

    const tasks: Promise<{ target: string; ok: boolean; status?: number; body?: string }>[] = [];

    if (discordWebhookUrl) {
      const discordPayload = buildDiscordPayload(normalizedLead);

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
          body: JSON.stringify(normalizedLead),
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
