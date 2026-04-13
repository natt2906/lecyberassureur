export function resolveLeadWebhookUrl() {
  return (import.meta.env.VITE_LEAD_WEBHOOK_URL as string | undefined) || '/api/discord-webhook';
}

export function getLeadWebhookHint() {
  if (!import.meta.env.DEV || import.meta.env.VITE_LEAD_WEBHOOK_URL) {
    return '';
  }

  return "En local avec Vite, configurez VITE_LEAD_WEBHOOK_URL vers votre endpoint Vercel ou lancez l'API avec Vercel.";
}
