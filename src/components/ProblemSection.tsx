import { DollarSign, Clock, Scale, TrendingDown, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getArticleLinkByTitle } from '../data/articleLinks';
import CardIllustration from './CardIllustration';

export default function ProblemSection() {
  const impacts = [
    {
      icon: DollarSign,
      title: 'Pertes financières',
      description: "Coûts directs et perturbation de trésorerie qui menacent l'activité",
      illustration: 'finance-impact' as const,
    },
    {
      icon: Clock,
      title: "Interruption d'activité",
      description: "Perte de chiffre d'affaires pendant l'arrêt et la reprise",
      illustration: 'downtime-impact' as const,
    },
    {
      icon: Scale,
      title: 'Exposition juridique et réglementaire',
      description: 'Amendes, pénalités et coûts de conformité liés aux violations de données',
      illustration: 'legal-impact' as const,
    },
    {
      icon: TrendingDown,
      title: 'Atteinte à la réputation',
      description: 'Perte de confiance des clients et impact durable sur la marque',
      illustration: 'reputation-impact' as const,
    }
  ];

  return (
    <section className="site-section site-section--strong site-section--deferred">
      <div className="site-section__container">
        <div className="site-section__header">
          <div className="site-section__eyebrow">
            <AlertTriangle className="site-section__eyebrow-icon" />
            <span className="site-section__eyebrow-text">Le vrai coût des incidents cyber</span>
          </div>
          <h2 className="site-section__title">Les incidents cyber génèrent toujours des coûts</h2>
          <p className="site-section__intro">
            La question n'est pas de savoir si un incident va arriver, mais si votre entreprise peut en absorber l'impact financier.
          </p>
        </div>

        <div className="site-card-grid site-card-grid--two">
          {impacts.map((impact) => {
            const article = getArticleLinkByTitle(impact.title);

            if (!article) {
              return null;
            }

            return (
              <Link
                key={impact.title}
                to={article.path}
                aria-label={`Lire l'article complet : ${impact.title}`}
                className="site-card site-card--interactive"
              >
                <CardIllustration variant={impact.illustration} />
                <div className="site-card__icon">
                  <impact.icon className="w-7 h-7 text-cyan-400" strokeWidth={2} />
                </div>
                <h3 className="site-card__title">{impact.title}</h3>
                <p className="site-card__body">{impact.description}</p>
              </Link>
            );
          })}
        </div>

        <div className="site-panel site-panel--accent site-panel--center mt-8">
          <p className="site-panel__body">
            <span className="font-bold text-[color:var(--text-strong)]">Le coût moyen d'une attaque par rançongiciel</span> pour une entreprise de taille moyenne dépasse <span className="font-bold text-[color:var(--accent)]">200 000 EUR</span>, incluant l'arrêt d'activité, la remise en etat et les pertes de revenus.
          </p>
        </div>
      </div>
    </section>
  );
}
