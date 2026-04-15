import { useLocation, useNavigate } from 'react-router-dom';

export default function OffersSection() {
  const location = useLocation();
  const navigate = useNavigate();
  const offers = [
    {
      id: 'basic',
      name: 'Basic',
      price: '29.99€',
      subtitle: "Socle de protection",
      highlight: 'Sans option supplémentaire',
      description:
        "Une formule d'entrée pour poser une première base de protection cyber et d'accompagnement.",
      features: [
        'Assistance en cas d’incident',
        'Gestion de crise',
        'Responsabilité liée aux données',
      ],
      logoClassName: 'offers-section__plan-logo offers-section__plan-logo--basic',
      cardClassName: 'offers-section__plan',
      badgeClassName: 'offers-section__badge',
    },
    {
      id: 'silver',
      name: 'Silver',
      price: '49.99€',
      subtitle: 'Protection renforcée',
      highlight: 'Inclut dommages subis',
      description:
        "Une offre plus protectrice pour les entreprises qui veulent couvrir au-delà du socle standard.",
      features: [
        'Tout le socle Basic',
        'Dommages subis',
        'Accompagnement renforcé en cas d’arrêt',
      ],
      logoClassName: 'offers-section__plan-logo offers-section__plan-logo--silver',
      cardClassName: 'offers-section__plan offers-section__plan--featured',
      badgeClassName: 'offers-section__badge offers-section__badge--silver',
    },
    {
      id: 'gold',
      name: 'Gold',
      price: '99.99€',
      subtitle: 'Protection premium',
      highlight: 'Inclut dommages subis + fraude',
      description:
        'La formule la plus complète pour couvrir les impacts financiers et les scénarios de fraude.',
      features: [
        'Tout le socle Silver',
        'Fraude',
        'Niveau de protection le plus complet',
      ],
      logoClassName: 'offers-section__plan-logo offers-section__plan-logo--gold',
      cardClassName: 'offers-section__plan',
      badgeClassName: 'offers-section__badge offers-section__badge--gold',
    },
  ] as const;

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
    <section id="offers" className="offers-section">
      <div className="offers-section__container">
        <div className="offers-section__heading">
          <div className="offers-section__eyebrow">Nos offres</div>
          <h2 className="offers-section__title">Choisissez le niveau de protection adapté</h2>
          <p className="offers-section__intro">
            Trois niveaux de couverture pour structurer votre protection cyber.
            Les montants affichés sont des prix d&apos;appel indicatifs, à affiner
            selon le profil de votre entreprise.
          </p>
        </div>

        <div className="offers-section__grid">
          {offers.map((offer) => (
            <article key={offer.id} className={offer.cardClassName}>
              <div className={offer.badgeClassName}>{offer.subtitle}</div>

              <div className="offers-section__plan-head">
                <img
                  src="/acces-documentaire-prive/assets/logo-cropped.png"
                  alt=""
                  aria-hidden="true"
                  className={offer.logoClassName}
                />
                <div className="offers-section__plan-copy">
                  <h3 className="offers-section__plan-title">{offer.name}</h3>
                  <div className="offers-section__price-wrap">
                    <span className="offers-section__price">{offer.price}</span>
                    <span className="offers-section__price-caption">prix d&apos;appel</span>
                  </div>
                  <p className="offers-section__plan-highlight">{offer.highlight}</p>
                </div>
              </div>

              <p className="offers-section__description">{offer.description}</p>

              <ul className="offers-section__features">
                {offer.features.map((feature) => (
                  <li key={feature} className="offers-section__feature">
                    <span className="offers-section__feature-dot" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={scrollToForm}
                className="offers-section__cta"
              >
                Demander cette offre
              </button>
            </article>
          ))}
        </div>

        <p className="offers-section__disclaimer">
          Tarifs d&apos;appel donnés à titre d&apos;exemple. Le niveau réel de prime
          dépend du chiffre d&apos;affaires, de l&apos;activité, du niveau d&apos;exposition
          et des garanties retenues.
        </p>
      </div>
    </section>
  );
}
