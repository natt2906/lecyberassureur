import { ArrowRight } from 'lucide-react';
import { getBrandLogo } from '../lib/brandLogo';
import { useSelectedOffer } from '../lib/selectedOffer';

export default function FinalCTA() {
  const selectedOffer = useSelectedOffer();
  const scrollToForm = () => {
    document.getElementById('devis-cyber')?.scrollIntoView({ behavior: 'smooth' });
  };

  const logoClassName = [
    'final-cta__logo',
    selectedOffer ? `final-cta__logo--${selectedOffer}` : '',
  ]
    .filter(Boolean)
    .join(' ');
  const logoSrc = getBrandLogo(selectedOffer);

  return (
    <section className="site-section site-section--deferred final-cta">
      <div className="final-cta__overlay" />

      <div className="site-section__container">
        <div className="final-cta__inner">
          <img
            src={logoSrc}
            alt="Le Cyberassureur"
            className={logoClassName}
          />

          <p className="final-cta__text">
            Chaque jour sans assurance cyber est un jour où votre entreprise est exposée financièrement. Bénéficiez d'une protection complète et d'un accompagnement d'experts quand cela compte le plus.
          </p>

          <button
            onClick={scrollToForm}
            className="final-cta__button"
          >
            <span>Obtenir mon devis maintenant</span>
            <ArrowRight className="final-cta__button-icon" strokeWidth={2.5} />
          </button>

          <p className="final-cta__caption">
            Rejoignez des centaines d'entreprises protégées contre les pertes financières liées au cyber
          </p>
        </div>
      </div>
    </section>
  );
}
