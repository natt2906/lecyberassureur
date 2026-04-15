import { Building2, Building, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getArticleLinkByTitle } from '../data/articleLinks';
import CardIllustration from './CardIllustration';

export default function WhoForSection() {
  const audiences = [
    {
      icon: Briefcase,
      title: 'TPE & Startups',
      description: "Utilisation de l'email, d'outils cloud et de transactions numériques",
      risks: 'Exposées au phishing, aux rançongiciels et à la fraude aux paiements',
      illustration: 'startup-stack' as const,
    },
    {
      icon: Building2,
      title: 'PME',
      description: 'Gestion des bases clients, des données RH et des opérations numériques',
      risks: "Vulnérables aux fuites de données, à l'interruption d'activité et aux amendes réglementaires",
      illustration: 'sme-ops' as const,
    },
    {
      icon: Building,
      title: 'ETI & Grandes entreprises',
      description: 'Infrastructures IT complexes, prestataires tiers et données à forte valeur',
      risks: 'Exposition réglementaire élevée, impact réputationnel et pertes financières',
      illustration: 'enterprise-grid' as const,
    }
  ];

  return (
    <section id="who-for" className="site-section site-section--strong site-section--deferred">
      <div className="site-section__container">
        <div className="site-section__header">
          <h2 className="site-section__title">Pour qui c'est fait</h2>
          <p className="site-section__intro">
            Si votre entreprise utilise des outils numériques, elle est exposée.
          </p>
        </div>

        <div className="site-card-grid site-card-grid--three">
          {audiences.map((audience) => {
            const article = getArticleLinkByTitle(audience.title);

            if (!article) {
              return null;
            }

            return (
              <Link
                key={audience.title}
                to={`/articles/${article.slug}`}
                aria-label={`Lire l'article complet : ${audience.title}`}
                className="site-card site-card--interactive"
              >
                <CardIllustration variant={audience.illustration} />
                <div className="site-card__icon">
                  <audience.icon className="w-8 h-8 text-cyan-400" strokeWidth={2} />
                </div>
                <h3 className="site-card__title">{audience.title}</h3>
                <p className="site-card__body">{audience.description}</p>
                <div className="site-card__divider">
                  <p className="site-card__meta">{audience.risks}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="site-panel site-panel--accent site-panel--center mt-8">
          <h3 className="site-panel__title">
            Toute entreprise numérique a besoin d'une assurance cyber
          </h3>
          <p className="site-panel__body mx-auto max-w-3xl">
            De l'email au cloud, des systèmes de paiement aux bases clients, si votre entreprise dépend d'outils numériques, un incident cyber peut tout perturber. L'assurance cyber garantit votre capacité à vous relever financièrement.
          </p>
        </div>
      </div>
    </section>
  );
}
