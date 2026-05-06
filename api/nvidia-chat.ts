type RequestLike = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  socket?: {
    remoteAddress?: string;
  };
};

type ResponseLike = {
  status: (code: number) => ResponseLike;
  json: (payload: unknown) => void;
  setHeader?: (name: string, value: string) => void;
};

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type NvidiaChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

const NVIDIA_CHAT_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MODEL = 'mistralai/mistral-medium-3.5-128b';
const MAX_USER_MESSAGE_LENGTH = 1200;
const MAX_HISTORY_MESSAGES = 10;
const MINUTE_LIMIT = 20; // Increased from 12
const HOUR_LIMIT = 60; // Increased from 40

const rateBuckets = new Map<string, { minute: number[]; hour: number[] }>();

const SYSTEM_PROMPT = `Tu es l'assistant commercial de LeCyberAssureur, une marque de Prorisk Assurances specialisee en assurance cyber pour professionnels, TPE et PME.

Objectif: aider le visiteur a comprendre les offres, les garanties et l'orienter vers une demande de devis ou un rappel.

Informations a respecter:
- Basic: a partir de 29,99 euros par mois, sans option supplementaire.
- Silver: a partir de 49,99 euros par mois, inclut les dommages subis.
- Gold: a partir de 99,99 euros par mois, inclut dommages subis + fraude.
- Les prix sont des prix d'appel indicatifs, sous reserve d'analyse de l'activite, du chiffre d'affaires, des garanties et de l'acceptation par l'assureur.
- Le site cible les professionnels et entreprises, pas les particuliers.
- Pour obtenir une proposition, invite l'utilisateur a demander un devis via le formulaire.

Regles:
- Reponds en francais, avec un ton clair, direct et rassurant.
- Ne demande jamais de mot de passe, RIB, numero de carte bancaire, document sensible ou donnee medicale.
- Ne donne pas de conseil juridique definitif.
- Si la question sort du sujet, ramene vers l'assurance cyber, les garanties ou le devis.
- Reponses courtes: 2 a 5 phrases maximum, sauf demande explicite de detail.`;

const getHeader = (req: RequestLike, name: string) => {
  const value = req.headers[name] ?? req.headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
};

const getIp = (req: RequestLike) => {
  const forwarded = getHeader(req, 'x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }
  return getHeader(req, 'x-real-ip') || req.socket?.remoteAddress || 'unknown';
};

const normalizeApiKey = (value: string | undefined) => {
  const trimmed = value?.trim();
  if (!trimmed) {
    return '';
  }

  return trimmed
    .replace(/^Bearer\s+/i, '')
    .replace(/^['"]|['"]$/g, '')
    .replace(/\s+/g, '');
};

const normalizeBody = (body: unknown) => {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as unknown;
    } catch {
      return null;
    }
  }
  return body;
};

const sanitizeMessages = (body: unknown): ChatMessage[] | null => {
  if (!body || typeof body !== 'object' || !('messages' in body)) {
    return null;
  }

  const messages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(messages)) {
    return null;
  }

  const sanitized = messages
    .slice(-MAX_HISTORY_MESSAGES)
    .map((message): ChatMessage | null => {
      if (!message || typeof message !== 'object') {
        return null;
      }

      const { role, content } = message as { role?: unknown; content?: unknown };
      if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') {
        return null;
      }

      const trimmed = content.trim();
      if (!trimmed || (role === 'user' && trimmed.length > MAX_USER_MESSAGE_LENGTH)) {
        return null;
      }

      return { role, content: trimmed };
    });

  if (sanitized.some((message) => message === null)) {
    return null;
  }

  const cleanMessages = sanitized as ChatMessage[];
  const lastMessage = cleanMessages[cleanMessages.length - 1];
  if (!lastMessage || lastMessage.role !== 'user') {
    return null;
  }

  return cleanMessages;
};

const checkRateLimit = (ip: string) => {
  const now = Date.now();
  const minuteWindow = now - 60_000;
  const hourWindow = now - 3_600_000;
  const bucket = rateBuckets.get(ip) ?? { minute: [], hour: [] };

  bucket.minute = bucket.minute.filter((timestamp) => timestamp > minuteWindow);
  bucket.hour = bucket.hour.filter((timestamp) => timestamp > hourWindow);

  if (bucket.minute.length >= MINUTE_LIMIT || bucket.hour.length >= HOUR_LIMIT) {
    rateBuckets.set(ip, bucket);
    return false;
  }

  bucket.minute.push(now);
  bucket.hour.push(now);
  rateBuckets.set(ip, bucket);
  return true;
};

const sendJson = (res: ResponseLike, status: number, payload: unknown) => {
  res.setHeader?.('Cache-Control', 'no-store');
  res.status(status).json(payload);
};

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'method_not_allowed' });
  }

  const ip = getIp(req);
  const userAgent = getHeader(req, 'user-agent');

  if (!userAgent) {
    console.warn('[nvidia-chat] rejected missing user-agent', { ip });
    return sendJson(res, 403, { error: 'forbidden' });
  }

  if (!checkRateLimit(ip)) {
    console.warn('[nvidia-chat] rate limited', { ip, userAgent: userAgent.slice(0, 120) });
    return sendJson(res, 429, { error: 'rate_limited' });
  }

  const apiKey = normalizeApiKey(process.env.NVIDIA_API_KEY);
  if (!apiKey) {
    console.error('[nvidia-chat] missing NVIDIA_API_KEY');
    return sendJson(res, 500, { error: 'server_not_configured' });
  }

  const body = normalizeBody(req.body);
  const messages = sanitizeMessages(body);

  if (!messages) {
    console.warn('[nvidia-chat] invalid payload', { ip, userAgent: userAgent.slice(0, 120) });
    return sendJson(res, 400, { error: 'invalid_payload' });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000);

  try {
    console.log('[nvidia-chat] Processing request for IP:', ip, 'with', messages.length, 'messages');

    const requestBody = {
      model: MODEL,
      reasoning_effort: 'high',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 900,
      temperature: 0.7,
      top_p: 1,
      stream: false,
    };

    console.log('[nvidia-chat] provider request body size:', JSON.stringify(requestBody).length);
    console.log('[nvidia-chat] Using model:', MODEL);

    const providerResponse = await fetch(NVIDIA_CHAT_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'LeCyberAssureur/1.0 (+https://lecyberassureur.fr)',
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    console.log('[nvidia-chat] Provider response status:', providerResponse.status);

    if (!providerResponse.ok) {
      const providerStatus = providerResponse.status;
      const providerText = await providerResponse.text();
      const providerError = providerText.slice(0, 500);
      console.error('[nvidia-chat] provider error body:', providerText);
      console.warn('[nvidia-chat] provider error', {
        ip,
        providerStatus,
        providerError,
        messages: messages.length,
      });
      return sendJson(res, 502, {
        error:
          providerStatus === 401 || providerStatus === 403
            ? 'provider_auth_error'
            : 'provider_error',
      });
    }

    const data = (await providerResponse.json()) as NvidiaChatResponse;
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      console.warn('[nvidia-chat] empty provider reply', { ip, messages: messages.length });
      return sendJson(res, 502, { error: 'empty_provider_reply' });
    }

    console.info('[nvidia-chat] accepted', { ip, messages: messages.length });
    return sendJson(res, 200, { reply });
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === 'AbortError';
    const message = error instanceof Error ? error.message : 'unknown_error';
    console.warn('[nvidia-chat] request failed', { ip, isTimeout, message, errorType: error?.constructor?.name });
    if (isTimeout) {
      console.error('[nvidia-chat] TIMEOUT: Request to NVIDIA API took longer than 60 seconds');
    }
    return sendJson(res, isTimeout ? 504 : 502, {
      error: isTimeout ? 'provider_timeout' : 'provider_unreachable',
    });
  } finally {
    clearTimeout(timeout);
  }
}
