export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, message: 'API discord-webhook active' });
  }

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

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

    const companyName = String(payload?.lead?.companyName || '').trim();
    const phone = String(payload?.lead?.phone || '').trim();
    const industry = String(payload?.lead?.industry || '').trim();

    if (!companyName || !phone || !industry) {
      return res.status(400).json({ error: 'Champs lead manquants' });
    }

    const discordPayload = {
      content: 'Nouveau lead recu depuis le formulaire lecyberassureur.fr',
      embeds: [
        {
          title: 'Nouveau lead',
          color: 65535,
          fields: [
            { name: 'Entreprise', value: companyName, inline: false },
            { name: 'Telephone', value: phone, inline: false },
            { name: "Secteur d'activite", value: industry, inline: false },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload),
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
