import { useLocation, useNavigate } from 'react-router-dom';

export default function StickyCTA() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToForm = () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (location.pathname === '/' && location.hash === '#contact-form') {
      return;
    }

    navigate('/#contact-form');
  };

  return (
    <div className="sticky-cta animate-slide-up">
      <button
        type="button"
        onClick={scrollToForm}
        className="sticky-cta__button"
        aria-label="Acceder au formulaire de contact"
      >
        <img
          src="/acces-documentaire-prive/assets/logo-cropped.png"
          alt=""
          aria-hidden="true"
          className="sticky-cta__logo"
        />
      </button>
    </div>
  );
}
