import { useLocation, useNavigate } from 'react-router-dom';
import { useSelectedOffer } from '../lib/selectedOffer';

export default function StickyCTA() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedOffer = useSelectedOffer();
  const logoClassName = [
    'sticky-cta__logo-image',
    selectedOffer ? `sticky-cta__logo-image--${selectedOffer}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const scrollToForm = () => {
    const contactForm = document.getElementById('devis-cyber');

    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (location.pathname === '/' && location.hash === '#devis-cyber') {
      return;
    }

    navigate('/#devis-cyber');
  };

  return (
    <div className="sticky-cta animate-slide-up">
      <button
        type="button"
        onClick={scrollToForm}
        className={[
          'sticky-cta__button',
          selectedOffer ? `sticky-cta__button--${selectedOffer}` : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label="Acceder au formulaire de devis cyber"
      >
        <span
          className="sticky-cta__logo-scene"
          aria-hidden="true"
        >
          <span className="sticky-cta__logo-face sticky-cta__logo-face--front">
            <img
              src="/brand-assets/logo-cropped-384.png"
              alt="Devis cyber Le Cyberassureur"
              className={logoClassName}
            />
          </span>
          <span className="sticky-cta__logo-face sticky-cta__logo-face--back">
            <span>Devis</span>
            <strong>cyber</strong>
          </span>
        </span>
        <span className="sticky-cta__mobile-label" aria-hidden="true">
          Devis cyber
        </span>
      </button>
    </div>
  );
}
