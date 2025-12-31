import { Building2, Building, Briefcase } from 'lucide-react';

export default function WhoForSection() {
  const audiences = [
    {
      icon: Briefcase,
      title: 'TPE & Startups',
      description: "Utilisation de l'email, d'outils cloud et de transactions numériques",
      risks: 'Exposées au phishing, aux rançongiciels et à la fraude aux paiements'
    },
    {
      icon: Building2,
      title: 'PME',
      description: 'Gestion des bases clients, des données RH et des opérations numériques',
      risks: "Vulnérables aux fuites de données, à l'interruption d'activité et aux amendes réglementaires"
    },
    {
      icon: Building,
      title: 'ETI & Grandes entreprises',
      description: 'Infrastructures IT complexes, prestataires tiers et données à forte valeur',
      risks: 'Exposition réglementaire élevée, impact réputationnel et pertes financières'
    }
  ];

  return (
    <section id="who-for" className="bg-slate-950 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pour qui c'est fait
          </h2>
          <p className="text-xl text-gray-400">
            Si votre entreprise utilise des outils numériques, elle est exposée.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-500/40 transition-all"
            >
              <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 border border-cyan-500/20">
                <audience.icon className="w-8 h-8 text-cyan-400" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{audience.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">{audience.description}</p>
              <div className="pt-4 border-t border-cyan-500/20">
                <p className="text-sm text-cyan-400 font-medium">{audience.risks}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Toute entreprise numérique a besoin d'une assurance cyber
          </h3>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            De l'email au cloud, des systèmes de paiement aux bases clients, si votre entreprise dépend d'outils numériques, un incident cyber peut tout perturber. L'assurance cyber garantit votre capacité à vous relever financièrement.
          </p>
        </div>
      </div>
    </section>
  );
}
