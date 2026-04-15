import { LockKeyhole, Settings2, ShieldCheck, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  acceptAllCookieConsent,
  DEFAULT_COOKIE_PREFERENCES,
  rejectOptionalCookieConsent,
  useCookieConsent,
  useCookiePreferencesTrigger,
  writeCookieConsent,
  type CookieConsentPreferences,
} from '../lib/cookieConsent';

type CookieToggleProps = {
  title: string;
  description: string;
  checked: boolean;
  locked?: boolean;
  onChange?: (checked: boolean) => void;
};

function CookieToggle({
  title,
  description,
  checked,
  locked = false,
  onChange,
}: CookieToggleProps) {
  return (
    <div className="cookie-consent__toggle">
      <div className="cookie-consent__toggle-copy">
        <div className="cookie-consent__toggle-title-row">
          <h3 className="cookie-consent__toggle-title">{title}</h3>
          {locked && (
            <span className="cookie-consent__toggle-lock">
              <LockKeyhole className="h-3.5 w-3.5" />
              Obligatoire
            </span>
          )}
        </div>
        <p className="cookie-consent__toggle-description">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        disabled={locked}
        onClick={() => onChange?.(!checked)}
        className={[
          'cookie-consent__switch',
          checked ? 'cookie-consent__switch--checked' : '',
          locked ? 'cookie-consent__switch--locked' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span className="cookie-consent__switch-thumb" />
      </button>
    </div>
  );
}

export default function CookieConsent() {
  const consent = useCookieConsent();
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isBannerExpanded, setIsBannerExpanded] = useState(false);
  const [draftPreferences, setDraftPreferences] = useState<CookieConsentPreferences>(
    consent?.preferences ?? DEFAULT_COOKIE_PREFERENCES,
  );

  useEffect(() => {
    setDraftPreferences(consent?.preferences ?? DEFAULT_COOKIE_PREFERENCES);
  }, [consent]);

  useCookiePreferencesTrigger(() => {
    setDraftPreferences(consent?.preferences ?? DEFAULT_COOKIE_PREFERENCES);
    setIsPreferencesOpen(true);
  });

  useEffect(() => {
    if (!isPreferencesOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isPreferencesOpen]);

  const shouldShowBanner = consent === null;

  const consentSummary = useMemo(() => {
    if (!consent) {
      return 'Aucun cookie non essentiel n’est déposé sans votre accord.';
    }

    const enabledCategories = [
      consent.preferences.preferences ? 'préférences' : null,
      consent.preferences.analytics ? 'mesure d’audience' : null,
      consent.preferences.marketing ? 'marketing' : null,
    ].filter(Boolean);

    if (enabledCategories.length === 0) {
      return 'Seuls les cookies strictement nécessaires sont activés.';
    }

    return `Cookies activés : nécessaires, ${enabledCategories.join(', ')}.`;
  }, [consent]);

  const savePreferences = () => {
    writeCookieConsent({
      preferences: draftPreferences.preferences,
      analytics: draftPreferences.analytics,
      marketing: draftPreferences.marketing,
    });
    setIsPreferencesOpen(false);
  };

  return (
    <>
      {shouldShowBanner && !isPreferencesOpen && (
        <div className="cookie-consent">
          <div className="cookie-consent__banner">
            <div className="cookie-consent__banner-copy">
              <div className="cookie-consent__banner-title-row">
                <ShieldCheck className="h-5 w-5" />
                <p className="cookie-consent__banner-title">Gestion des cookies</p>
              </div>
              <div
                className={[
                  'cookie-consent__banner-body',
                  isBannerExpanded ? 'cookie-consent__banner-body--expanded' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <p className="cookie-consent__banner-text">
                  Nous utilisons des cookies nécessaires au bon fonctionnement du site et,
                  avec votre accord, des cookies destinés à la mesure d’audience, à la
                  personnalisation et à nos actions marketing. Vous pouvez accepter, refuser
                  ou paramétrer vos préférences.
                </p>
                <p className="cookie-consent__banner-meta">
                  Consultez notre <Link to="/politique-confidentialite">politique de confidentialité</Link>.
                </p>
              </div>
              <button
                type="button"
                className="cookie-consent__banner-toggle"
                onClick={() => setIsBannerExpanded((current) => !current)}
              >
                {isBannerExpanded ? 'Voir moins' : 'Voir plus'}
              </button>
            </div>

            <div className="cookie-consent__banner-actions">
              <button
                type="button"
                className="cookie-consent__button cookie-consent__button--ghost"
                onClick={() => setIsPreferencesOpen(true)}
              >
                Personnaliser
              </button>
              <button
                type="button"
                className="cookie-consent__button cookie-consent__button--secondary"
                onClick={rejectOptionalCookieConsent}
              >
                Tout refuser
              </button>
              <button
                type="button"
                className="cookie-consent__button cookie-consent__button--primary"
                onClick={acceptAllCookieConsent}
              >
                Tout accepter
              </button>
            </div>
          </div>
        </div>
      )}

      {isPreferencesOpen && (
        <div className="cookie-consent__overlay" role="presentation">
          <div
            className="cookie-consent__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-consent-title"
          >
            <div className="cookie-consent__modal-header">
              <div>
                <div className="cookie-consent__modal-icon">
                  <Settings2 className="h-5 w-5" />
                </div>
                <h2 id="cookie-consent-title" className="cookie-consent__modal-title">
                  Préférences de confidentialité
                </h2>
                <p className="cookie-consent__modal-text">
                  Choisissez les catégories de cookies que vous autorisez sur le site.
                  Les cookies nécessaires restent toujours activés.
                </p>
              </div>

              <button
                type="button"
                className="cookie-consent__close"
                onClick={() => setIsPreferencesOpen(false)}
                aria-label="Fermer les préférences cookies"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="cookie-consent__summary">{consentSummary}</div>

            <div className="cookie-consent__toggles">
              <CookieToggle
                title="Cookies nécessaires"
                description="Indispensables au fonctionnement du site, à sa sécurité et à la mémorisation de vos choix."
                checked
                locked
              />
              <CookieToggle
                title="Préférences"
                description="Permettent de mémoriser certains réglages d’affichage et de confort de navigation."
                checked={draftPreferences.preferences}
                onChange={(checked) =>
                  setDraftPreferences((current) => ({ ...current, preferences: checked }))
                }
              />
              <CookieToggle
                title="Mesure d’audience"
                description="Permettent de mesurer l’utilisation du site et d’améliorer les parcours de navigation."
                checked={draftPreferences.analytics}
                onChange={(checked) =>
                  setDraftPreferences((current) => ({ ...current, analytics: checked }))
                }
              />
              <CookieToggle
                title="Publicité et marketing"
                description="Permettent de suivre l’attribution des campagnes et d’adapter les actions marketing lorsqu’elles sont activées."
                checked={draftPreferences.marketing}
                onChange={(checked) =>
                  setDraftPreferences((current) => ({ ...current, marketing: checked }))
                }
              />
            </div>

            <div className="cookie-consent__modal-actions">
              <button
                type="button"
                className="cookie-consent__button cookie-consent__button--ghost"
                onClick={() => {
                  rejectOptionalCookieConsent();
                  setIsPreferencesOpen(false);
                }}
              >
                Tout refuser
              </button>
              <button
                type="button"
                className="cookie-consent__button cookie-consent__button--secondary"
                onClick={() => {
                  acceptAllCookieConsent();
                  setIsPreferencesOpen(false);
                }}
              >
                Tout accepter
              </button>
              <button
                type="button"
                className="cookie-consent__button cookie-consent__button--primary"
                onClick={savePreferences}
              >
                Enregistrer mes choix
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
