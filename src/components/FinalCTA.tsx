import { ArrowRight, Shield } from 'lucide-react';

export default function FinalCTA() {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="site-section site-section--deferred final-cta">
      <div className="final-cta__overlay" />

      <div className="site-section__container">
        <div className="final-cta__inner">
          <div className="final-cta__icon">
            <Shield className="h-10 w-10 text-cyan-400" strokeWidth={2} />
          </div>

          <h2 className="final-cta__title">
            Un incident cyber n'arrive jamais seul.
            <span className="final-cta__title-accent">Soyez assuré.</span>
          </h2>

          <p className="final-cta__text">
            Chaque jour sans assurance cyber est un jour où votre entreprise est exposée financièrement. Bénéficiez d'une protection complète et d'un accompagnement d'experts quand cela compte le plus.
          </p>

          <button
            onClick={scrollToForm}
            className="final-cta__button"
          >
            <span>Protéger mon entreprise maintenant</span>
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
