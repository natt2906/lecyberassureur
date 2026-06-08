type RequestLike = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
};

type ResponseLike = {
  status: (code: number) => ResponseLike;
  json: (payload: unknown) => void;
  setHeader?: (name: string, value: string) => void;
};

const DEFAULT_REPOSITORY = 'natt2906/lecyberassureur';
const DEFAULT_WORKFLOW_ID = 'weekly-article.yml';
const DEFAULT_REF = 'main';

const getHeader = (req: RequestLike, name: string) => {
  const value = req.headers[name] ?? req.headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
};

const normalizeSecret = (value: string | undefined) => value?.trim() || '';

const isAuthorized = (req: RequestLike) => {
  const secret = normalizeSecret(process.env.CRON_SECRET);
  if (!secret) {
    return false;
  }

  const authorization = getHeader(req, 'authorization') || '';
  return authorization === `Bearer ${secret}`;
};

export default async function handler(req: RequestLike, res: ResponseLike) {
  res.setHeader?.('Cache-Control', 'no-store');

  if (req.method && !['GET', 'POST'].includes(req.method)) {
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const token = normalizeSecret(process.env.GITHUB_ARTICLE_WORKFLOW_TOKEN);
  if (!token) {
    return res.status(500).json({ error: 'missing_github_workflow_token' });
  }

  const repository = normalizeSecret(process.env.GITHUB_ARTICLE_REPOSITORY) || DEFAULT_REPOSITORY;
  const workflowId = normalizeSecret(process.env.GITHUB_ARTICLE_WORKFLOW_ID) || DEFAULT_WORKFLOW_ID;
  const ref = normalizeSecret(process.env.GITHUB_ARTICLE_REF) || DEFAULT_REF;
  const dispatchUrl = `https://api.github.com/repos/${repository}/actions/workflows/${encodeURIComponent(
    workflowId,
  )}/dispatches`;

  const response = await fetch(dispatchUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'LeCyberAssureur-Vercel-Cron/1.0',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      ref,
      inputs: {
        source: 'vercel-cron',
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    return res.status(502).json({
      error: 'github_dispatch_failed',
      status: response.status,
      detail: body.slice(0, 500),
    });
  }

  return res.status(202).json({
    ok: true,
    repository,
    workflowId,
    ref,
  });
}
