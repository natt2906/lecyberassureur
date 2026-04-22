import { DollarSign, Search, Scale, Megaphone, Users, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getArticleLinkByTitle } from '../data/articleLinks';
import CardIllustration from './CardIllustration';

export default function CoverageSection() {
  const coverages = [
    {
      icon: DollarSign,
      title: 'Pertes financières & perte de revenus',
      description: "Couverture des pertes financières directes, de l'interruption d'activité et des revenus perdus pendant la reprise.",
      illustration: 'revenue-cover' as const,
    },
    {
      icon: Search,
      title: 'Experts en réponse aux incidents',
      description: 'Accès immédiat à des spécialistes en informatique légale, en récupération de données et en cybersécurité.',
      illustration: 'incident-experts' as const,
    },
    {
      icon: Scale,
      title: 'Défense juridique & coûts réglementaires',
      description: 'Représentation juridique, accompagnement conformité et coûts liés aux notifications de violation de données.',
      illustration: 'legal-defense' as const,
    },
    {
      icon: Megaphone,
      title: 'Communication de crise & réputation',
      description: 'Gestion de crise RP, campagnes de rétablissement de réputation et support de communication client.',
      illustration: 'crisis-comms' as const,
    },
    {
      icon: Users,
      title: 'Dommages aux tiers',
      description: "Indemnisation des dommages subis par les clients, partenaires et tiers affectés par votre incident cyber.",
      illustration: 'third-party' as const,
    }
  ];

  return (
    <section id="coverage" className="site-section site-section--muted site-section--deferred">
      <div className="site-section__container">
        <div className="site-section__header">
          <div className="site-section__eyebrow">
            <ShieldCheck className="site-section__eyebrow-icon" />
            <span className="site-section__eyebrow-text">Protection complète</span>
          </div>
          <h2 className="site-section__title">Ce que l'assurance cyber couvre réellement</h2>
          <p className="site-section__intro">
            Protection financière et accompagnement d'experts quand vous en avez le plus besoin
          </p>
        </div>

        <div className="site-card-grid site-card-grid--three">
          {coverages.map((coverage) => {
            const article = getArticleLinkByTitle(coverage.title);

            if (!article) {
              return null;
            }

            return (
              <Link
                key={coverage.title}
                to={article.path}
                aria-label={`Lire l'article complet : ${coverage.title}`}
                className="site-card site-card--interactive group"
              >
                <CardIllustration variant={coverage.illustration} />
                <div className="site-card__icon site-card__icon--small">
                  <coverage.icon className="w-6 h-6 text-cyan-400" strokeWidth={2} />
                </div>
                <h3 className="site-card__title">{coverage.title}</h3>
                <p className="site-card__body">{coverage.description}</p>
              </Link>
            );
          })}

          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/50 rounded-xl p-6 flex items-center justify-center md:col-span-2 lg:col-span-1">
            <div>
              <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-cyan-400" strokeWidth={2} />
              <p className="text-lg font-bold text-white text-center">
                Ce n'est pas un outil informatique.
                <span className="mt-2 block text-[color:var(--accent)]">C'est un contrat d'assurance.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
