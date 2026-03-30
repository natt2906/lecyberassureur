import { useEffect, useRef, useState } from 'react';
import { Send, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { captureLeadAttribution } from '../lib/leadAttribution';

const FORM_DRAFT_STORAGE_KEY = 'lecyberassureur-contact-form-draft';
const FORM_DRAFT_ABANDONED_SIGNATURE_KEY = 'lecyberassureur-contact-form-abandoned-signature';

const EMPTY_FORM_DATA = {
  companyName: '',
  industry: '',
  phone: ''
};

function readStoredFormDraft() {
  if (typeof window === 'undefined') {
    return EMPTY_FORM_DATA;
  }

  try {
    const storedDraft = window.localStorage.getItem(FORM_DRAFT_STORAGE_KEY);

    if (!storedDraft) {
      return EMPTY_FORM_DATA;
    }

    const parsedDraft = JSON.parse(storedDraft) as Partial<typeof EMPTY_FORM_DATA>;

    return {
      companyName: typeof parsedDraft.companyName === 'string' ? parsedDraft.companyName : '',
      industry: typeof parsedDraft.industry === 'string' ? parsedDraft.industry : '',
      phone: typeof parsedDraft.phone === 'string' ? parsedDraft.phone : ''
    };
  } catch {
    return EMPTY_FORM_DATA;
  }
}

function normalizeFormDataDraft(formData: typeof EMPTY_FORM_DATA) {
  return {
    companyName: formData.companyName.trim(),
    industry: formData.industry.trim(),
    phone: formData.phone.trim()
  };
}

function getFormDraftSignature(formData: typeof EMPTY_FORM_DATA) {
  return JSON.stringify(normalizeFormDataDraft(formData));
}

function hasMeaningfulFormData(formData: typeof EMPTY_FORM_DATA) {
  return Object.values(normalizeFormDataDraft(formData)).some((value) => value.length > 0);
}

function toDiscordValue(value: string) {
  const normalized = value.trim();
  if (!normalized) {
    return '-';
  }

  return normalized.slice(0, 1000);
}

export default function ContactForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(readStoredFormDraft);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const formDataRef = useRef(formData);
  const honeypotRef = useRef(honeypot);
  const isSubmittingRef = useRef(false);
  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    formDataRef.current = formData;

    const isFormEmpty = !hasMeaningfulFormData(formData);

    if (isFormEmpty) {
      window.localStorage.removeItem(FORM_DRAFT_STORAGE_KEY);
      window.localStorage.removeItem(FORM_DRAFT_ABANDONED_SIGNATURE_KEY);
      return;
    }

    window.localStorage.setItem(FORM_DRAFT_STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    honeypotRef.current = honeypot;
  }, [honeypot]);

  useEffect(() => {
    isSubmittingRef.current = isSubmitting;
  }, [isSubmitting]);

  useEffect(() => {
    const handlePageHide = () => {
      if (isSubmittingRef.current || hasSubmittedRef.current || honeypotRef.current.trim()) {
        return;
      }

      const currentFormData = formDataRef.current;

      if (!hasMeaningfulFormData(currentFormData)) {
        return;
      }

      const normalizedDraft = normalizeFormDataDraft(currentFormData);
      const signature = getFormDraftSignature(currentFormData);
      const lastAbandonedSignature = window.localStorage.getItem(FORM_DRAFT_ABANDONED_SIGNATURE_KEY);

      if (lastAbandonedSignature === signature) {
        return;
      }

      window.localStorage.setItem(FORM_DRAFT_ABANDONED_SIGNATURE_KEY, signature);

      const leadWebhookUrl =
        (import.meta.env.VITE_LEAD_WEBHOOK_URL as string | undefined) ||
        '/api/discord-webhook';

      if (!leadWebhookUrl) {
        return;
      }

      const abandonedAt = new Date().toISOString();
      const attribution = captureLeadAttribution();
      const submissionPage = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const payload = {
        hp: honeypotRef.current,
        lead: {
          ...normalizedDraft,
          source: 'lecyberassureur.fr',
          createdAt: abandonedAt,
          status_label: 'Formulaire non soumis',
          submission_status: 'not_submitted',
          abandoned_at: abandonedAt,
          submission_page: submissionPage,
          page_url: window.location.href,
          ...attribution,
        },
      };
      const body = JSON.stringify(payload);

      if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
        const beaconSent = navigator.sendBeacon(
          leadWebhookUrl,
          new Blob([body], { type: 'application/json' }),
        );

        if (beaconSent) {
          return;
        }
      }

      void fetch(leadWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => undefined);
    };

    window.addEventListener('pagehide', handlePageHide);

    return () => {
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    if (honeypot.trim()) {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
      return;
    }

    try {
      const leadWebhookUrl =
        (import.meta.env.VITE_LEAD_WEBHOOK_URL as string | undefined) ||
        '/api/discord-webhook';

      if (!leadWebhookUrl) {
        throw new Error('VITE_LEAD_WEBHOOK_URL manquant');
      }

      const createdAt = new Date().toISOString();
      const attribution = captureLeadAttribution();
      const submissionPage = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const embedFields = [
        { name: 'Entreprise', value: toDiscordValue(formData.companyName), inline: true },
        { name: 'Telephone', value: toDiscordValue(formData.phone), inline: true },
        { name: 'Secteur', value: toDiscordValue(formData.industry), inline: true },
        { name: 'UTM Source', value: toDiscordValue(attribution.utm_source), inline: true },
        { name: 'UTM Medium', value: toDiscordValue(attribution.utm_medium), inline: true },
        { name: 'UTM Campaign', value: toDiscordValue(attribution.utm_campaign), inline: true },
        { name: 'UTM Content', value: toDiscordValue(attribution.utm_content), inline: true },
        { name: 'UTM Term', value: toDiscordValue(attribution.utm_term), inline: true },
        { name: 'GCLID', value: toDiscordValue(attribution.gclid), inline: false },
        { name: 'FBCLID', value: toDiscordValue(attribution.fbclid), inline: false },
        { name: 'Landing Page', value: toDiscordValue(attribution.landing_page), inline: false },
        { name: 'Referrer', value: toDiscordValue(attribution.referrer), inline: false },
        { name: 'Page URL', value: toDiscordValue(window.location.href), inline: false },
        { name: 'First Seen', value: toDiscordValue(attribution.first_seen_at), inline: true },
        { name: 'Last Seen', value: toDiscordValue(attribution.last_seen_at), inline: true },
      ];
      const discordPayload = {
        content: null,
        embeds: [
          {
            title: 'Nouveau lead Le Cyberassureur',
            color: 65535,
            fields: embedFields,
            footer: {
              text: `Source: lecyberassureur.fr | Page: ${submissionPage.slice(0, 120)}`,
            },
            timestamp: createdAt,
          },
        ],
      };
      const response = await fetch(leadWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hp: honeypot,
          lead: {
            companyName: formData.companyName,
            phone: formData.phone,
            industry: formData.industry,
            source: 'lecyberassureur.fr',
            createdAt,
            status_label: 'Formulaire soumis',
            submission_status: 'submitted',
            submitted_at: createdAt,
            submission_page: submissionPage,
            page_url: window.location.href,
            ...attribution,
          },
          discord: discordPayload,
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook lead en erreur (${response.status})`);
      }

      hasSubmittedRef.current = true;
      window.localStorage.removeItem(FORM_DRAFT_STORAGE_KEY);
      window.localStorage.removeItem(FORM_DRAFT_ABANDONED_SIGNATURE_KEY);
      setFormData(EMPTY_FORM_DATA);
      setHoneypot('');
      navigate('/merci');
    } catch (error) {
      console.error(error);
      setSubmitError("Impossible d'envoyer votre demande pour le moment. Merci de reessayer.");
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact-form" className="bg-slate-950 py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 text-cyan-400 mb-6">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wider uppercase">Protégez-vous dès aujourd'hui</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Recevez votre analyse de risque cyber
          </h2>
          <p className="text-lg text-gray-400">
            Pas de spam. Sans engagement. Contact d'experts uniquement.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/20 rounded-2xl p-8 lg:p-12 shadow-2xl shadow-cyan-500/10">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 md:gap-8">
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
              className="hidden"
              aria-hidden="true"
            />

            <div className="md:col-span-1">
              <label htmlFor="companyName" className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                Nom de l'entreprise *
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-cyan-500/20 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-colors"
                placeholder="Nom de votre entreprise"
              />
            </div>

            <div className="md:col-span-1">
              <label htmlFor="phone" className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                Téléphone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-cyan-500/20 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-colors"
                placeholder="+33 6 12 34 56 78"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="industry" className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                Secteur d'activité *
              </label>
              <input
                type="text"
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-cyan-500/20 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-colors"
                placeholder="Ex: Technologie, santé, commerce"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="md:col-span-2 w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
            >
              <span>{isSubmitting ? 'Envoi en cours...' : "Recevoir mon analyse du risque et de l'exposition cyber"}</span>
              <Send className="w-5 h-5" />
            </button>

            {submitError && (
              <p className="md:col-span-2 text-center text-sm text-red-400">{submitError}</p>
            )}

            <p className="md:col-span-2 text-center text-sm text-gray-400">
              En soumettant ce formulaire, vous acceptez d'être contacté par nos experts en assurance cyber. Nous respectons votre vie privée et ne partagerons jamais vos informations.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
