import { useEffect, useRef, useState } from 'react';
import { Send, Shield } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { captureLeadAttribution } from '../lib/leadAttribution';
import { getLeadWebhookHint, resolveLeadWebhookUrl } from '../lib/leadWebhook';
import { readSelectedOffer, writeSelectedOffer } from '../lib/selectedOffer';
import { isOfferId, offerLabelById } from '../data/offers';

const FORM_DRAFT_STORAGE_KEY = 'lecyberassureur-contact-form-draft';
const FORM_DRAFT_ABANDONED_SIGNATURE_KEY = 'lecyberassureur-contact-form-abandoned-signature';
const FORM_DRAFT_TTL_MS = 24 * 60 * 60 * 1000;

const EMPTY_FORM_DATA = {
  companyName: '',
  industry: '',
  phone: '',
  offer: '',
};

type FormDraftData = Partial<typeof EMPTY_FORM_DATA>;
type StoredFormDraft = FormDraftData | { savedAt?: string; data?: FormDraftData };

function readStoredFormDraft() {
  if (typeof window === 'undefined') {
    return EMPTY_FORM_DATA;
  }

  try {
    const storedDraft = window.localStorage.getItem(FORM_DRAFT_STORAGE_KEY);

    if (!storedDraft) {
      return EMPTY_FORM_DATA;
    }

    const parsedDraft = JSON.parse(storedDraft) as StoredFormDraft;
    const draftSavedAt =
      typeof parsedDraft === 'object' && parsedDraft && 'savedAt' in parsedDraft
        ? parsedDraft.savedAt
        : '';
    const draftData: FormDraftData =
      typeof parsedDraft === 'object' && parsedDraft && 'data' in parsedDraft
        ? parsedDraft.data || {}
        : (parsedDraft as FormDraftData);

    if (
      typeof draftSavedAt === 'string' &&
      draftSavedAt &&
      Date.now() - new Date(draftSavedAt).getTime() > FORM_DRAFT_TTL_MS
    ) {
      window.localStorage.removeItem(FORM_DRAFT_STORAGE_KEY);
      window.localStorage.removeItem(FORM_DRAFT_ABANDONED_SIGNATURE_KEY);
      return EMPTY_FORM_DATA;
    }

    return {
      companyName: typeof draftData?.companyName === 'string' ? draftData.companyName : '',
      industry: typeof draftData?.industry === 'string' ? draftData.industry : '',
      phone: typeof draftData?.phone === 'string' ? draftData.phone : '',
      offer: typeof draftData?.offer === 'string' ? draftData.offer : '',
    };
  } catch {
    return EMPTY_FORM_DATA;
  }
}

function normalizeFormDataDraft(formData: typeof EMPTY_FORM_DATA) {
  return {
    companyName: formData.companyName.trim(),
    industry: formData.industry.trim(),
    phone: formData.phone.trim(),
    offer: formData.offer.trim(),
  };
}

function getFormDraftSignature(formData: typeof EMPTY_FORM_DATA) {
  return JSON.stringify(normalizeFormDataDraft(formData));
}

function hasMeaningfulFormData(formData: typeof EMPTY_FORM_DATA) {
  return [
    formData.companyName.trim(),
    formData.industry.trim(),
    formData.phone.trim(),
  ].some((value) => value.length > 0);
}

function getOfferLabel(value: string) {
  return isOfferId(value) ? offerLabelById[value] : value;
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
  const location = useLocation();
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

    window.localStorage.setItem(
      FORM_DRAFT_STORAGE_KEY,
      JSON.stringify({
        savedAt: new Date().toISOString(),
        data: formData,
      }),
    );
  }, [formData]);

  useEffect(() => {
    honeypotRef.current = honeypot;
  }, [honeypot]);

  useEffect(() => {
    if (!formData.offer || !isOfferId(formData.offer)) {
      return;
    }

    if (readSelectedOffer()) {
      return;
    }

    writeSelectedOffer(formData.offer);
  }, [formData.offer]);

  useEffect(() => {
    const offerParam = new URLSearchParams(location.search).get('offer');

    if (!offerParam || !isOfferId(offerParam)) {
      return;
    }

    writeSelectedOffer(offerParam);

    setFormData((current) => {
      if (current.offer === offerParam) {
        return current;
      }

      return {
        ...current,
        offer: offerParam,
      };
    });
  }, [location.search]);

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

      const leadWebhookUrl = resolveLeadWebhookUrl();

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
          offer_label: normalizedDraft.offer ? getOfferLabel(normalizedDraft.offer) : '',
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
      const leadWebhookUrl = resolveLeadWebhookUrl();
      const leadWebhookHint = getLeadWebhookHint();

      if (!leadWebhookUrl || (import.meta.env.DEV && !import.meta.env.VITE_LEAD_WEBHOOK_URL)) {
        throw new Error(leadWebhookHint || 'VITE_LEAD_WEBHOOK_URL manquant');
      }

      const createdAt = new Date().toISOString();
      const attribution = captureLeadAttribution();
      const submissionPage = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const embedFields = [
        { name: 'Entreprise', value: toDiscordValue(formData.companyName), inline: true },
        { name: 'Telephone', value: toDiscordValue(formData.phone), inline: true },
        { name: 'Secteur', value: toDiscordValue(formData.industry), inline: true },
        { name: 'Offre', value: toDiscordValue(formData.offer ? getOfferLabel(formData.offer) : ''), inline: true },
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
            offer: formData.offer,
            offer_label: formData.offer ? getOfferLabel(formData.offer) : '',
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
        const responseText = await response.text();
        throw new Error(responseText || `Webhook lead en erreur (${response.status})`);
      }

      hasSubmittedRef.current = true;
      window.localStorage.removeItem(FORM_DRAFT_STORAGE_KEY);
      window.localStorage.removeItem(FORM_DRAFT_ABANDONED_SIGNATURE_KEY);
      setFormData(EMPTY_FORM_DATA);
      setHoneypot('');
      navigate('/merci', {
        state: {
          trackConversion: true,
          conversionKey: createdAt,
        },
      });
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Impossible d'envoyer votre demande pour le moment. Merci de reessayer.";
      setSubmitError(message);
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.name === 'offer') {
      writeSelectedOffer(e.target.value);
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="devis-cyber" className="contact-form-section">
      <div className="contact-form-section__container">
        <div className="contact-form-section__heading">
          <div className="contact-form-section__eyebrow">
            <Shield className="w-5 h-5" />
            <span className="contact-form-section__eyebrow-text">Protégez-vous dès aujourd'hui</span>
          </div>
          <h2 className="contact-form-section__title">
            Recevez votre analyse de risque cyber
          </h2>
          <p className="contact-form-section__description">
            Pas de spam. Sans engagement. Contact d'experts uniquement.
          </p>
        </div>

        <div className="contact-form-card">
          <form onSubmit={handleSubmit} className="contact-form-grid">
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
              className="contact-form-grid__honeypot"
              aria-hidden="true"
            />

            <div className="contact-form-field">
              <label htmlFor="companyName" className="contact-form-field__label">
                Nom de l'entreprise *
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="contact-form-field__input"
                placeholder="Nom de votre entreprise"
              />
            </div>

            <div className="contact-form-field">
              <label htmlFor="phone" className="contact-form-field__label">
                Téléphone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="contact-form-field__input"
                placeholder="+33 6 12 34 56 78"
              />
            </div>

            <div className="contact-form-field contact-form-field--full">
              <label htmlFor="industry" className="contact-form-field__label">
                Secteur d'activité *
              </label>
              <input
                type="text"
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="contact-form-field__input"
                placeholder="Ex: Technologie, santé, commerce"
              />
            </div>

            <div className="contact-form-field contact-form-field--full">
              <label htmlFor="offer" className="contact-form-field__label">
                Choisir une offre
              </label>
              <select
                id="offer"
                name="offer"
                value={formData.offer}
                onChange={handleChange}
                className="contact-form-field__input contact-form-field__select"
              >
                <option value="">Selectionnez une offre</option>
                <option value="basic">Basic</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="contact-form-grid__submit"
            >
              <span>{isSubmitting ? 'Envoi en cours...' : "Recevoir mon analyse du risque et de l'exposition cyber"}</span>
              <Send className="w-5 h-5" />
            </button>

            {submitError && (
              <p className="contact-form-grid__error">{submitError}</p>
            )}

            <p className="contact-form-grid__privacy">
              En soumettant ce formulaire, vous acceptez d'être contacté par nos experts en assurance cyber. Nous respectons votre vie privée et ne partagerons jamais vos informations.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
