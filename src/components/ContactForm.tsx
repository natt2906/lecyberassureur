import { useEffect, useRef, useState } from 'react';
import { Send, Shield } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { activityDomains, isKnownActivityDomain } from '../data/activityDomains';
import { captureLeadAttribution } from '../lib/leadAttribution';
import {
  isRejectedCompanyName,
  isRejectedFrenchPhone,
  isValidFrenchPhone,
  toCanonicalPhone,
} from '../lib/leadReview';
import { getLeadWebhookHint, resolveLeadWebhookUrl } from '../lib/leadWebhook';
import { readSelectedOffer, writeSelectedOffer } from '../lib/selectedOffer';
import { isOfferId, offerLabelById, offers } from '../data/offers';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
          theme?: 'auto' | 'light' | 'dark';
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove?: (widgetId?: string) => void;
    };
  }
}

const FORM_DRAFT_STORAGE_KEY = 'lecyberassureur-contact-form-draft';
const FORM_DRAFT_ABANDONED_SIGNATURE_KEY = 'lecyberassureur-contact-form-abandoned-signature';
const FORM_DRAFT_TTL_MS = 24 * 60 * 60 * 1000;
const TURNSTILE_SCRIPT_ID = 'cf-turnstile-script';
const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAAC_qG144rn3nXwSr';
const TURNSTILE_ERROR_MESSAGE =
  'La vérification de sécurité est obligatoire avant l’envoi du formulaire.';

const EMPTY_FORM_DATA = {
  companyName: '',
  industry: '',
  phone: '',
  offer: '',
};

type FormDataState = typeof EMPTY_FORM_DATA;
type FieldErrors = Partial<Record<keyof FormDataState, string>>;

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

function normalizePhoneDigits(value: string) {
  return value.replace(/\D/g, '');
}

function formatFrenchPhoneInput(value: string) {
  const digits = normalizePhoneDigits(value);

  if (!digits) {
    return '';
  }

  if (digits.startsWith('33')) {
    const rest = digits.slice(2, 11);
    const groups = [
      rest.slice(0, 1),
      rest.slice(1, 3),
      rest.slice(3, 5),
      rest.slice(5, 7),
      rest.slice(7, 9),
    ].filter(Boolean);

    return `+33 ${groups.join(' ')}`.trim();
  }

  const localDigits = digits.slice(0, 10);
  const groups = [
    localDigits.slice(0, 2),
    localDigits.slice(2, 4),
    localDigits.slice(4, 6),
    localDigits.slice(6, 8),
    localDigits.slice(8, 10),
  ].filter(Boolean);

  return groups.join(' ');
}

function validateFormData(formData: FormDataState): FieldErrors {
  const errors: FieldErrors = {};

  if (!formData.companyName.trim()) {
    errors.companyName = "Le nom de l'entreprise est obligatoire.";
  } else if (formData.companyName.trim().length < 3) {
    errors.companyName = "Le nom de l'entreprise doit contenir au moins 3 caractères.";
  } else if (isRejectedCompanyName(formData.companyName)) {
    errors.companyName = "Le nom de l'entreprise semble invalide. Merci de renseigner une raison sociale réelle.";
  }

  if (!formData.phone.trim()) {
    errors.phone = 'Le numéro de téléphone est obligatoire.';
  } else if (!isValidFrenchPhone(formData.phone)) {
    errors.phone = 'Saisissez un numéro français valide, par exemple 06 12 34 56 78.';
  } else if (isRejectedFrenchPhone(formData.phone)) {
    errors.phone = 'Le numéro de téléphone semble invalide. Merci de renseigner un numéro professionnel réel.';
  }

  if (!formData.industry.trim()) {
    errors.industry = "Le domaine d'activité est obligatoire.";
  } else if (!isKnownActivityDomain(formData.industry)) {
    errors.industry = "Sélectionnez un domaine d'activité dans la liste.";
  }

  return errors;
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
  const [isTurnstileReady, setIsTurnstileReady] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [honeypot, setHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const formDataRef = useRef(formData);
  const honeypotRef = useRef(honeypot);
  const isSubmittingRef = useRef(false);
  const hasSubmittedRef = useRef(false);
  const formOpenedAtRef = useRef(Date.now());
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const selectedOffer = isOfferId(formData.offer)
    ? offers.find((offer) => offer.id === formData.offer)
    : undefined;

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
    window.localStorage.removeItem('lecyberassureur-submitted-leads');
  }, []);

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
    if (!TURNSTILE_SITE_KEY || !turnstileContainerRef.current || turnstileWidgetIdRef.current) {
      return;
    }

    let cancelled = false;
    let scriptElement = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null;

    const renderTurnstile = () => {
      if (
        cancelled ||
        !window.turnstile ||
        !turnstileContainerRef.current ||
        turnstileWidgetIdRef.current
      ) {
        return;
      }

      turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'auto',
        callback: (token) => {
          setTurnstileToken(token);
          setSubmitError((current) => (current === TURNSTILE_ERROR_MESSAGE ? '' : current));
        },
        'expired-callback': () => {
          setTurnstileToken('');
        },
        'error-callback': () => {
          setTurnstileToken('');
          setSubmitError('La vérification Cloudflare a échoué. Merci de réessayer.');
        },
      });
      setIsTurnstileReady(true);
    };

    const handleLoad = () => {
      renderTurnstile();
    };

    if (window.turnstile) {
      renderTurnstile();
    } else if (scriptElement) {
      scriptElement.addEventListener('load', handleLoad);
    } else {
      const script = document.createElement('script');
      script.id = TURNSTILE_SCRIPT_ID;
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.addEventListener('load', handleLoad);
      document.head.appendChild(script);
      scriptElement = script;
    }

    return () => {
      cancelled = true;

      scriptElement?.removeEventListener('load', handleLoad);

      if (window.turnstile && turnstileWidgetIdRef.current) {
        window.turnstile.remove?.(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = null;
      }
    };
  }, []);

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
    setFieldErrors({});
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    if (honeypot.trim()) {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
      return;
    }

    try {
      const validationErrors = validateFormData(formData);

      if (Object.keys(validationErrors).length > 0) {
        setFieldErrors(validationErrors);
        throw new Error('Merci de corriger les champs signalés.');
      }

      if (!turnstileToken) {
        throw new Error(TURNSTILE_ERROR_MESSAGE);
      }

      const leadWebhookUrl = resolveLeadWebhookUrl();
      const leadWebhookHint = getLeadWebhookHint();
      const canonicalPhone = toCanonicalPhone(formData.phone);
      const formCompletionMs = Date.now() - formOpenedAtRef.current;

      if (!leadWebhookUrl || (import.meta.env.DEV && !import.meta.env.VITE_LEAD_WEBHOOK_URL)) {
        throw new Error(leadWebhookHint || 'VITE_LEAD_WEBHOOK_URL manquant');
      }

      const createdAt = new Date().toISOString();
      const attribution = captureLeadAttribution();
      const submissionPage = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const embedFields = [
        { name: 'Entreprise', value: toDiscordValue(formData.companyName), inline: true },
        { name: 'Telephone', value: toDiscordValue(canonicalPhone), inline: true },
        { name: "Domaine d'activite", value: toDiscordValue(formData.industry), inline: true },
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
          turnstileToken,
          lead: {
            companyName: formData.companyName,
            phone: canonicalPhone,
            industry: formData.industry,
            offer: formData.offer,
            offer_label: formData.offer ? getOfferLabel(formData.offer) : '',
            form_completion_ms: formCompletionMs,
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
        let message = `Webhook lead en erreur (${response.status})`;
        const responseText = await response.text();

        try {
          const payload = JSON.parse(responseText) as { error?: string };

          if (payload?.error) {
            message = payload.error;
          } else if (responseText) {
            message = responseText;
          }
        } catch {
          if (responseText) {
            message = responseText;
          }
        }

        throw new Error(message);
      }

      const responsePayload = (await response.json()) as {
        leadStatus?: 'accepted' | 'suspect' | 'rejected';
        reviewReason?: string;
      };
      const leadStatus = responsePayload.leadStatus || 'accepted';

      hasSubmittedRef.current = true;
      window.localStorage.removeItem(FORM_DRAFT_STORAGE_KEY);
      window.localStorage.removeItem(FORM_DRAFT_ABANDONED_SIGNATURE_KEY);
      setFormData(EMPTY_FORM_DATA);
      setHoneypot('');
      setTurnstileToken('');
      window.turnstile?.reset(turnstileWidgetIdRef.current || undefined);
      navigate('/merci', {
        state: {
          trackConversion: leadStatus === 'accepted',
          conversionKey: createdAt,
          conversionPhone: canonicalPhone,
          leadStatus,
          reviewReason: responsePayload.reviewReason || '',
        },
      });
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Impossible d'envoyer votre demande pour le moment. Merci de reessayer.";
      setSubmitError(message);
      if (window.turnstile && turnstileWidgetIdRef.current) {
        setTurnstileToken('');
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target.name === 'offer') {
      writeSelectedOffer(e.target.value);
    }

    if (fieldErrors[name as keyof FormDataState]) {
      setFieldErrors((current) => ({
        ...current,
        [name]: '',
      }));
    }

    setFormData({
      ...formData,
      [name]: name === 'phone' ? formatFrenchPhoneInput(value) : value,
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
            Recevez votre devis cyber ou demandez un rappel
          </h2>
          <p className="contact-form-section__description">
            Choisissez une offre, laissez vos coordonnées et un expert vous recontacte pour cadrer votre devis.
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
                autoComplete="organization"
                aria-invalid={fieldErrors.companyName ? 'true' : 'false'}
                aria-describedby={fieldErrors.companyName ? 'companyName-error' : undefined}
                className="contact-form-field__input"
                placeholder="Nom de votre entreprise"
              />
              {fieldErrors.companyName && (
                <p id="companyName-error" className="contact-form-field__error">
                  {fieldErrors.companyName}
                </p>
              )}
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
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={fieldErrors.phone ? 'true' : 'false'}
                aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                className="contact-form-field__input"
                placeholder="+33 6 12 34 56 78"
              />
              {fieldErrors.phone && (
                <p id="phone-error" className="contact-form-field__error">
                  {fieldErrors.phone}
                </p>
              )}
            </div>

            <div className="contact-form-field contact-form-field--full">
              <label htmlFor="industry" className="contact-form-field__label">
                Domaine d'activité *
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                aria-invalid={fieldErrors.industry ? 'true' : 'false'}
                aria-describedby={fieldErrors.industry ? 'industry-error' : undefined}
                className="contact-form-field__input contact-form-field__select"
              >
                <option value="">Sélectionnez votre domaine d'activité</option>
                {activityDomains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
              {fieldErrors.industry && (
                <p id="industry-error" className="contact-form-field__error">
                  {fieldErrors.industry}
                </p>
              )}
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
              {selectedOffer && (
                <div className={`contact-form-offer-summary contact-form-offer-summary--${selectedOffer.id}`}>
                  <div className="contact-form-offer-summary__topline">
                    <span className="contact-form-offer-summary__name">{selectedOffer.name}</span>
                    <span className="contact-form-offer-summary__price">
                      à partir de {selectedOffer.price} {selectedOffer.period}
                    </span>
                  </div>
                  <p className="contact-form-offer-summary__highlight">{selectedOffer.highlight}</p>
                  <p className="contact-form-offer-summary__description">{selectedOffer.description}</p>
                  <ul className="contact-form-offer-summary__features">
                    {selectedOffer.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="contact-form-field contact-form-field--full contact-form-field--turnstile">
              <div ref={turnstileContainerRef} className="contact-form-field__turnstile" />
              {!isTurnstileReady && (
                <p className="contact-form-field__meta">
                  Chargement de la vérification Cloudflare…
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !isTurnstileReady}
              className="contact-form-grid__submit"
            >
              <span>{isSubmitting ? 'Envoi en cours...' : 'Recevoir mon devis ou être rappelé'}</span>
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
