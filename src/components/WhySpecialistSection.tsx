import { Award, Headphones, Network, Zap, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getArticleByTitle } from '../data/articles';
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
      const article = getArticleByTitle(item.title);

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
      className="bg-slate-950 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all block hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
    >
      <CardIllustration variant={item.illustration} />
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
            <item.icon className="w-6 h-6 text-cyan-400" strokeWidth={2} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
          <p className="text-gray-400">{item.description}</p>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="bg-slate-900 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pourquoi un courtier cyber spécialisé
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            Le Cyberassureur est un courtier dédié à la cyberassurance. Il parle clair, sans masque, et vous accompagne dans chaque situation, avant et après un incident.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {firstRow.map(renderCard)}
        </div>

        <div className="bg-slate-950 border border-cyan-500/20 rounded-xl p-8 mb-8 lg:p-10">
          <p className="text-lg text-cyan-400 font-semibold mb-3">
            Contrairement aux assureurs traditionnels :
          </p>
          <p className="text-gray-300 leading-relaxed text-lg">
            Nous comprenons que les incidents cyber exigent une réponse immédiate technique,
            juridique et communicationnelle, pas un expert des sinistres des semaines plus tard.
            Notre réseau est prêt quand vous en avez le plus besoin.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {secondRow.map(renderCard)}
        </div>

        {finalCard && (
          <div className="max-w-3xl mx-auto">
            {renderCard(finalCard)}
          </div>
        )}
      </div>
    </section>
  );
}
