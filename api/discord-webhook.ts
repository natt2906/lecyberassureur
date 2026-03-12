export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Methode non autorisee' });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(500).json({ error: 'DISCORD_WEBHOOK_URL manquant cote serveur' });
  }

  try {
    const payload =
      typeof req.body === 'string' && req.body.trim().length > 0
        ? JSON.parse(req.body)
        : req.body || {};

    if (payload?.honeypot || payload?.hp) {
      return res.status(200).json({ ok: true, skipped: true });
    }

    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!discordResponse.ok) {
      const text = await discordResponse.text();
      console.error('Erreur Discord:', discordResponse.status, text);
      return res.status(500).json({ error: 'Erreur retour Discord' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Erreur interne API:', error);
    return res.status(500).json({ error: 'Erreur interne API' });
  }
}
