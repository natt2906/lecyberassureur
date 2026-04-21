const test = require('node:test');
const assert = require('node:assert/strict');

function createResponseRecorder() {
  const output = {
    statusCode: 0,
    json: null,
    headers: {},
  };

  return {
    output,
    response: {
      setHeader(name, value) {
        output.headers[name] = value;
      },
      status(code) {
        output.statusCode = code;
        return {
          json(payload) {
            output.json = payload;
            return payload;
          },
        };
      },
    },
  };
}

test('la route API accepte un lead valide avec Turnstile vérifié', async () => {
  process.env.ALLOWED_ORIGINS = 'https://lecyberassureur.fr';
  process.env.TURNSTILE_SECRET_KEY = 'secret';
  process.env.DISCORD_WEBHOOK_URL = 'https://discord.test/webhook';
  process.env.GOOGLE_SHEETS_WEBHOOK_URL = 'https://sheets.test/webhook';
  process.env.NODE_ENV = 'production';

  const originalFetch = global.fetch;
  global.fetch = async (url) => {
    if (String(url).includes('turnstile/v0/siteverify')) {
      return {
        ok: true,
        async json() {
          return { success: true, hostname: 'lecyberassureur.fr' };
        },
      };
    }

    return {
      ok: true,
      status: 200,
      async text() {
        return '';
      },
      async json() {
        return {};
      },
    };
  };

  try {
    const { default: handler } = await import('../api/discord-webhook.ts');
    const { output, response } = createResponseRecorder();

    await handler(
      {
        method: 'POST',
        headers: {
          origin: 'https://lecyberassureur.fr',
          'content-type': 'application/json',
          'user-agent': 'Mozilla/5.0 test',
          host: 'lecyberassureur.fr',
          'x-forwarded-host': 'lecyberassureur.fr',
        },
        body: {
          turnstileToken: 'token',
          hp: '',
          lead: {
            companyName: 'Prorisk Assurances',
            phone: '06 12 34 56 79',
            industry: 'Assurance, courtage et mutuelle',
            submission_status: 'submitted',
            form_completion_ms: 7000,
          },
        },
      },
      response,
    );

    assert.equal(output.statusCode, 200);
    assert.equal(output.json.ok, true);
    assert.equal(output.json.leadStatus, 'accepted');
  } finally {
    global.fetch = originalFetch;
  }
});

test('la route API rejette un envoi sans token Turnstile', async () => {
  process.env.ALLOWED_ORIGINS = 'https://lecyberassureur.fr';
  process.env.TURNSTILE_SECRET_KEY = 'secret';
  process.env.DISCORD_WEBHOOK_URL = 'https://discord.test/webhook';
  process.env.GOOGLE_SHEETS_WEBHOOK_URL = 'https://sheets.test/webhook';
  process.env.NODE_ENV = 'production';

  const originalFetch = global.fetch;
  global.fetch = async () => ({
    ok: true,
    status: 200,
    async text() {
      return '';
    },
    async json() {
      return {};
    },
  });

  try {
    const { default: handler } = await import('../api/discord-webhook.ts');
    const { output, response } = createResponseRecorder();

    await handler(
      {
        method: 'POST',
        headers: {
          origin: 'https://lecyberassureur.fr',
          'content-type': 'application/json',
          'user-agent': 'Mozilla/5.0 test',
          host: 'lecyberassureur.fr',
          'x-forwarded-host': 'lecyberassureur.fr',
        },
        body: {
          hp: '',
          lead: {
            companyName: 'Prorisk Assurances',
            phone: '06 12 34 56 79',
            industry: 'Assurance, courtage et mutuelle',
            submission_status: 'submitted',
            form_completion_ms: 7000,
          },
        },
      },
      response,
    );

    assert.equal(output.statusCode, 400);
    assert.equal(output.json.leadStatus, 'rejected');
    assert.match(output.json.error, /sécurité/i);
  } finally {
    global.fetch = originalFetch;
  }
});
