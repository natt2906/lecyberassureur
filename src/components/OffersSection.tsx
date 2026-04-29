import { useNavigate } from 'react-router-dom';
import { offers } from '../data/offers';
import { writeSelectedOffer } from '../lib/selectedOffer';

type OffersSectionProps = {
  showHeading?: boolean;
};

export default function OffersSection({ showHeading = true }: OffersSectionProps) {
  const navigate = useNavigate();

  const handleOfferClick = (offerId: string) => {
    writeSelectedOffer(offerId);
    navigate({
      pathname: '/',
      search: `?offer=${offerId}`,
      hash: '#devis-cyber',
    });
  };

  return (
    <section id="offers" className="offers-section">
      <div className="offers-section__container">
        {showHeading ? (
          <div className="offers-section__heading">
            <div className="offers-section__eyebrow">Nos offres</div>
            <h2 className="offers-section__title">Choisissez le niveau de protection adapté</h2>
            <p className="offers-section__intro">
              Trois niveaux de couverture pour structurer votre protection cyber.
              Les montants affichés sont des tarifs indicatifs, à affiner
              selon le profil de votre entreprise.
            </p>
          </div>
        ) : null}

        <div className="offers-section__grid">
          {offers.map((offer) => (
            <article
              key={offer.id}
              className={`${offer.cardClassName} offers-section__plan--interactive`}
              role="button"
              tabIndex={0}
              aria-label={`Choisir l'offre ${offer.name}`}
              onClick={() => handleOfferClick(offer.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleOfferClick(offer.id);
                }
              }}
            >
              <div className={offer.badgeClassName}>{offer.subtitle}</div>

              <div className="offers-section__plan-head">
                <img
                  src="/brand-assets/logo-cropped-384.png"
                  alt={`Logo offre ${offer.name} Le Cyberassureur`}
                  className={offer.logoClassName}
                />
                <div className="offers-section__plan-copy">
                  <h3 className="offers-section__plan-title">{offer.name}</h3>
                  <div className="offers-section__price-wrap">
                    <span className="offers-section__price-caption">a partir de</span>
                    <span className="offers-section__price">{offer.price}</span>
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

              <div className="offers-section__cta">
                Recevoir un devis pour cette offre
              </div>
            </article>
          ))}
        </div>

        <p className="offers-section__disclaimer">
          Tarifs indicatifs donnés à titre d&apos;exemple. Le niveau réel de prime
          dépend du chiffre d&apos;affaires, de l&apos;activité, du niveau d&apos;exposition
          et des garanties retenues.
        </p>
      </div>
    </section>
  );
}
