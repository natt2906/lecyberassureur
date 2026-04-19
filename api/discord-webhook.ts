type RequestLike = {
  method?: string;
  body?: unknown;
  json?: () => Promise<unknown>;
  headers?: Headers | Record<string, string | string[] | undefined>;
};

type ResponseLike = {
  setHeader?: (name: string, value: string) => void;
  status: (code: number) => {
    json: (payload: unknown) => unknown;
  };
};

type LeadPayload = {
  companyName?: string;
  phone?: string;
  industry?: string;
  offer?: string;
  offer_label?: string;
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
  offer: string;
  offer_label: string;
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

const MAX_PAYLOAD_CHARS = 20_000;
const DEFAULT_MAX_FIELD_LENGTH = 500;
const MAX_URL_FIELD_LENGTH = 2048;
const IP_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_IP_PER_WINDOW = 8;
const SUBMITTED_LEAD_DEDUP_TTL_MS = 24 * 60 * 60 * 1000;
const ABANDONED_LEAD_DEDUP_TTL_MS = 6 * 60 * 60 * 1000;

const ipRequestLog = new Map<string, number[]>();
const leadFingerprintLog = new Map<string, { timestamp: number; status: string }>();

function setHeaderIfPossible(res: ResponseLike, name: string, value: string) {
  res.setHeader?.(name, value);
}

function getHeader(req: RequestLike, name: string) {
  const normalizedName = name.toLowerCase();
  const headers = req.headers;

  if (!headers) {
    return '';
  }

  if (typeof Headers !== 'undefined' && headers instanceof Headers) {
    return headers.get(name) || headers.get(normalizedName) || '';
  }

  const value = headers[normalizedName] ?? headers[name];

  if (Array.isArray(value)) {
    return value[0] || '';
  }

  return typeof value === 'string' ? value : '';
}

function applySecurityHeaders(res: ResponseLike, allowedOrigin = '') {
  setHeaderIfPossible(res, 'Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  setHeaderIfPossible(res, 'Pragma', 'no-cache');
  setHeaderIfPossible(res, 'Expires', '0');
  setHeaderIfPossible(res, 'Referrer-Policy', 'no-referrer');
  setHeaderIfPossible(res, 'X-Content-Type-Options', 'nosniff');
  setHeaderIfPossible(res, 'X-Frame-Options', 'DENY');
  setHeaderIfPossible(res, 'Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  setHeaderIfPossible(res, 'X-Robots-Tag', 'noindex, nofollow, noarchive');
  setHeaderIfPossible(res, 'Vary', 'Origin');
  setHeaderIfPossible(res, 'Access-Control-Allow-Methods', 'POST, OPTIONS');
  setHeaderIfPossible(res, 'Access-Control-Allow-Headers', 'Content-Type');

  if (allowedOrigin) {
    setHeaderIfPossible(res, 'Access-Control-Allow-Origin', allowedOrigin);
  }
}

function text(value: unknown, maxLength = DEFAULT_MAX_FIELD_LENGTH) {
  return String(value || '').trim().slice(0, maxLength);
}

function normalizePhoneDigits(value: string) {
  return value.replace(/\D/g, '');
}

function isValidFrenchPhone(value: string) {
  return /^(?:0[1-9]\d{8}|33[1-9]\d{8})$/.test(normalizePhoneDigits(value));
}

function toCanonicalPhone(value: string) {
  const digits = normalizePhoneDigits(value);

  if (/^0[1-9]\d{8}$/.test(digits)) {
    return `+33${digits.slice(1)}`;
  }

  if (/^33[1-9]\d{8}$/.test(digits)) {
    return `+${digits}`;
  }

  return value.trim();
}

function normalizeCompanyName(value: string) {
  return value.trim().replace(/\s+/g, ' ').toLowerCase();
}

function getLeadFingerprint(companyName: string, phone: string) {
  const normalizedCompanyName = normalizeCompanyName(companyName);
  const canonicalPhone = toCanonicalPhone(phone);

  if (!normalizedCompanyName || !canonicalPhone || !isValidFrenchPhone(canonicalPhone)) {
    return '';
  }

  return `${normalizedCompanyName}::${canonicalPhone}`;
}

function getClientIp(req: RequestLike) {
  const forwardedFor = getHeader(req, 'x-forwarded-for');

  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim();
    if (firstIp) {
      return firstIp;
    }
  }

  return text(getHeader(req, 'x-real-ip'), 120);
}

function cleanIpRequestLog(now: number) {
  ipRequestLog.forEach((timestamps, ip) => {
    const freshTimestamps = timestamps.filter((timestamp) => now - timestamp < IP_RATE_LIMIT_WINDOW_MS);

    if (freshTimestamps.length === 0) {
      ipRequestLog.delete(ip);
      return;
    }

    ipRequestLog.set(ip, freshTimestamps);
  });
}

function hasExceededIpRateLimit(ip: string) {
  if (!ip) {
    return false;
  }

  const now = Date.now();
  cleanIpRequestLog(now);
  const timestamps = ipRequestLog.get(ip) || [];

  if (timestamps.length >= MAX_REQUESTS_PER_IP_PER_WINDOW) {
    return true;
  }

  ipRequestLog.set(ip, [...timestamps, now]);
  return false;
}

function cleanLeadFingerprintLog(now: number) {
  leadFingerprintLog.forEach((entry, fingerprint) => {
    const ttl = entry.status === 'submitted' ? SUBMITTED_LEAD_DEDUP_TTL_MS : ABANDONED_LEAD_DEDUP_TTL_MS;

    if (now - entry.timestamp > ttl) {
      leadFingerprintLog.delete(fingerprint);
    }
  });
}

function checkLeadFingerprint(fingerprint: string, status: string) {
  if (!fingerprint) {
    return { duplicate: false };
  }

  const now = Date.now();
  cleanLeadFingerprintLog(now);

  const existingEntry = leadFingerprintLog.get(fingerprint);

  if (existingEntry) {
    const ttl =
      existingEntry.status === 'submitted' ? SUBMITTED_LEAD_DEDUP_TTL_MS : ABANDONED_LEAD_DEDUP_TTL_MS;

    if (now - existingEntry.timestamp <= ttl) {
      return {
        duplicate: true,
        existingStatus: existingEntry.status,
      };
    }
  }

  leadFingerprintLog.set(fingerprint, {
    timestamp: now,
    status,
  });

  return { duplicate: false };
}

function parseAllowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isAllowedOrigin(req: RequestLike) {
  const origin = getHeader(req, 'origin');
  const fallback = {
    allowed: false,
    origin: '',
  };

  if (!origin) {
    return fallback;
  }

  const explicitAllowedOrigins = parseAllowedOrigins();
  const forwardedHost = getHeader(req, 'x-forwarded-host');
  const host = forwardedHost || getHeader(req, 'host');
  const protocol = getHeader(req, 'x-forwarded-proto') || 'https';
  const sameOrigin = host ? origin === `${protocol}://${host}` : false;
  const isLocalDevOrigin =
    process.env.NODE_ENV !== 'production' &&
    /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);

  return {
    allowed: sameOrigin || explicitAllowedOrigins.includes(origin) || isLocalDevOrigin,
    origin,
  };
}

function ensurePayloadSize(payload: FormPayload) {
  const serializedPayload = JSON.stringify(payload);

  if (serializedPayload.length > MAX_PAYLOAD_CHARS) {
    throw new Error('Payload trop volumineux');
  }
}

async function parsePayload(req: RequestLike): Promise<FormPayload> {
  if (typeof req.body === 'string' && req.body.trim().length > 0) {
    if (req.body.length > MAX_PAYLOAD_CHARS) {
      throw new Error('Payload trop volumineux');
    }

    try {
      return JSON.parse(req.body) as FormPayload;
    } catch {
      throw new Error('Payload JSON invalide');
    }
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
  const createdAt = text(lead.createdAt, 80) || new Date().toISOString();
  const submissionStatus = text(lead.submission_status, 40) || 'submitted';
  const isAbandoned = submissionStatus === 'not_submitted';

  return {
    companyName: text(lead.companyName, 120),
    phone: toCanonicalPhone(text(lead.phone, 40)),
    industry: text(lead.industry, 120),
    offer: text(lead.offer, 40),
    offer_label: text(lead.offer_label, 80),
    source: text(lead.source, 120) || 'lecyberassureur.fr',
    createdAt,
    status_label: text(lead.status_label, 80) || (isAbandoned ? 'Formulaire non soumis' : 'Formulaire soumis'),
    submission_status: submissionStatus,
    submitted_at: text(lead.submitted_at, 80) || (isAbandoned ? '' : createdAt),
    abandoned_at: text(lead.abandoned_at, 80) || (isAbandoned ? createdAt : ''),
    submission_page: text(lead.submission_page, 300),
    page_url: text(lead.page_url, MAX_URL_FIELD_LENGTH),
    utm_source: text(lead.utm_source, 120),
    utm_medium: text(lead.utm_medium, 120),
    utm_campaign: text(lead.utm_campaign, 180),
    utm_content: text(lead.utm_content, 180),
    utm_term: text(lead.utm_term, 180),
    gclid: text(lead.gclid, 300),
    fbclid: text(lead.fbclid, 300),
    landing_page: text(lead.landing_page, 300),
    referrer: text(lead.referrer, MAX_URL_FIELD_LENGTH),
    first_seen_at: text(lead.first_seen_at, 80),
    last_seen_at: text(lead.last_seen_at, 80),
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
          { name: "Domaine d'activite", value: toDiscordValue(lead.industry), inline: true },
          { name: 'Offre', value: toDiscordValue(lead.offer_label || lead.offer), inline: true },
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
  const { allowed, origin } = isAllowedOrigin(req);
  applySecurityHeaders(res, allowed ? origin : '');

  if (req.method === 'GET') {
    return res.status(404).json({ error: 'Not found' });
  }

  if (req.method === 'OPTIONS') {
    if (!allowed) {
      return res.status(403).json({ error: 'Origine non autorisee' });
    }

    return res.status(200).json({ ok: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Methode non autorisee' });
  }

  try {
    if (!allowed) {
      return res.status(403).json({ error: 'Origine non autorisee' });
    }

    const contentType = getHeader(req, 'content-type').toLowerCase();

    if (
      contentType &&
      !contentType.includes('application/json') &&
      !contentType.includes('text/plain')
    ) {
      return res.status(415).json({ error: 'Type de contenu non autorise' });
    }

    const payload = await parsePayload(req);
    ensurePayloadSize(payload);

    if (text(payload.honeypot) || text(payload.hp)) {
      return res.status(200).json({ ok: true, skipped: true });
    }

    const clientIp = getClientIp(req);

    if (hasExceededIpRateLimit(clientIp)) {
      return res.status(429).json({ error: 'Trop de tentatives depuis cette origine. Merci de réessayer plus tard.' });
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

    if (!isAbandoned && !isValidFrenchPhone(phone)) {
      return res.status(400).json({ error: 'Le numéro de téléphone doit être un numéro français valide.' });
    }

    const leadFingerprint = getLeadFingerprint(companyName, phone);
    const fingerprintCheck = checkLeadFingerprint(leadFingerprint, submissionStatus);

    if (fingerprintCheck.duplicate && !isAbandoned) {
      return res.status(409).json({ error: 'Une demande récente existe déjà pour ce contact.' });
    }

    if (fingerprintCheck.duplicate && isAbandoned) {
      return res.status(200).json({ ok: true, skipped: true, reason: 'Brouillon déjà enregistré récemment' });
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

    if (error instanceof Error) {
      if (error.message === 'Payload JSON invalide') {
        return res.status(400).json({ error: error.message });
      }

      if (error.message === 'Payload trop volumineux') {
        return res.status(413).json({ error: error.message });
      }
    }

    return res.status(500).json({ error: 'Erreur interne API' });
  }
}
