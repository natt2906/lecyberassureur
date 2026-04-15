import { Award, Headphones, Network, Zap, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getArticleLinkByTitle } from '../data/articleLinks';
import CardIllustration from './CardIllustration';

export default function WhySpecialistSection() {
  const differentiators = [
    {
      icon: Award,
      title: "Spécialiste de l'assurance cyber",
      description: "Nous nous concentrons exclusivement sur la couverture des risques cyber, pas sur l'assurance généraliste",
      illustration: 'specialist-focus' as const,
    },
    {
      icon: Headphones,
      title: 'Assistance humaine 24/7',
      description: "Accès immédiat à un support expert lorsqu'un incident survient",
      illustration: 'support-247' as const,
    },
    {
      icon: Network,
      title: "Réseau d'experts",
      description: 'Professionnels certifiés en cyber, juridique, forensic et communication de crise',
      illustration: 'expert-network' as const,
    },
    {
      icon: Zap,
      title: 'Activation rapide',
      description: "Réponse rapide et mobilisation des ressources après détection d'un incident",
      illustration: 'rapid-response' as const,
    },
    {
      icon: FileCheck,
      title: "Priorité à la continuité d'activité",
      description: "Couverture conçue pour minimiser l'arrêt et protéger vos opérations",
      illustration: 'continuity-core' as const,
    }
  ];

  const linkedDifferentiators = differentiators
    .map((item) => {
      const article = getArticleLinkByTitle(item.title);

      if (!article) {
        return null;
      }

      return {
        ...item,
        slug: article.slug,
      };
    })
    .filter((item) => item !== null);

  const firstRow = linkedDifferentiators.slice(0, 2);
  const secondRow = linkedDifferentiators.slice(2, 4);
  const finalCard = linkedDifferentiators[4];

  const renderCard = (item: NonNullable<(typeof linkedDifferentiators)[number]>) => (
    <Link
      key={item.title}
      to={`/articles/${item.slug}`}
      aria-label={`Lire l'article complet : ${item.title}`}
      className="site-card site-card--interactive"
    >
      <CardIllustration variant={item.illustration} />
      <div className="site-card__inline">
        <div className="site-card__icon site-card__icon--small">
          <item.icon className="w-6 h-6 text-cyan-400" strokeWidth={2} />
        </div>
        <div className="site-card__copy">
          <h3 className="site-card__title">{item.title}</h3>
          <p className="site-card__body">{item.description}</p>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="site-section site-section--muted site-section--deferred">
      <div className="site-section__container">
        <div className="site-section__header">
          <h2 className="site-section__title">Pourquoi un courtier cyber spécialisé</h2>
          <p className="site-section__intro">
            Le Cyberassureur est un courtier dédié à la cyberassurance. Il parle clair, sans masque, et vous accompagne dans chaque situation, avant et après un incident.
          </p>
        </div>

        <div className="site-card-grid site-card-grid--two">
          {firstRow.map(renderCard)}
        </div>

        <div className="site-panel mt-8">
          <p className="site-panel__eyebrow">
            Contrairement aux assureurs traditionnels :
          </p>
          <p className="site-panel__body">
            Nous comprenons que les incidents cyber exigent une réponse immédiate technique,
            juridique et communicationnelle, pas un expert des sinistres des semaines plus tard.
            Notre réseau est prêt quand vous en avez le plus besoin.
          </p>
        </div>

        <div className="site-card-grid site-card-grid--two mt-8">
          {secondRow.map(renderCard)}
        </div>

        {finalCard && (
          <div className="mx-auto mt-8 max-w-3xl">
            {renderCard(finalCard)}
          </div>
        )}
      </div>
    </section>
  );
}
