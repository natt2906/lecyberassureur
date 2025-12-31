import { DollarSign, Search, Scale, Megaphone, Users, ShieldCheck } from 'lucide-react';

export default function CoverageSection() {
  const coverages = [
    {
      icon: DollarSign,
      title: 'Pertes financières & perte de revenus',
      description: "Couverture des pertes financières directes, de l'interruption d'activité et des revenus perdus pendant la reprise."
    },
    {
      icon: Search,
      title: 'Experts en réponse aux incidents',
      description: 'Accès immédiat à des spécialistes en informatique légale, en récupération de données et en cybersécurité.'
    },
    {
      icon: Scale,
      title: 'Défense juridique & coûts réglementaires',
      description: 'Représentation juridique, accompagnement conformité et coûts liés aux notifications de violation de données.'
    },
    {
      icon: Megaphone,
      title: 'Communication de crise & réputation',
      description: 'Gestion de crise RP, campagnes de rétablissement de réputation et support de communication client.'
    },
    {
      icon: Users,
      title: 'Dommages aux tiers',
      description: "Indemnisation des dommages subis par les clients, partenaires et tiers affectés par votre incident cyber."
    }
  ];

  return (
    <section id="coverage" className="bg-slate-900 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-cyan-400 mb-6">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wider uppercase">Protection complète</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ce que l'assurance cyber couvre réellement
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Protection financière et accompagnement d'experts quand vous en avez le plus besoin
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {coverages.map((coverage, index) => (
            <div
              key={index}
              className="bg-slate-950 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all group"
            >
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-5 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                <coverage.icon className="w-6 h-6 text-cyan-400" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{coverage.title}</h3>
              <p className="text-gray-400 leading-relaxed">{coverage.description}</p>
            </div>
          ))}

          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/50 rounded-xl p-6 flex items-center justify-center md:col-span-2 lg:col-span-1">
            <div className="text-center">
              <ShieldCheck className="w-12 h-12 text-cyan-400 mx-auto mb-4" strokeWidth={2} />
              <p className="text-lg font-bold text-white">
                Ce n'est pas un outil informatique.
                <span className="block text-cyan-400 mt-2">C'est un contrat d'assurance.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
