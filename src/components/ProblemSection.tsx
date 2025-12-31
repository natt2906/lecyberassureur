import { DollarSign, Clock, Scale, TrendingDown, AlertTriangle } from 'lucide-react';

export default function ProblemSection() {
  const impacts = [
    {
      icon: DollarSign,
      title: 'Pertes financières',
      description: "Coûts directs et perturbation de trésorerie qui menacent l'activité"
    },
    {
      icon: Clock,
      title: "Interruption d'activité",
      description: "Perte de chiffre d'affaires pendant l'arrêt et la reprise"
    },
    {
      icon: Scale,
      title: 'Exposition juridique et réglementaire',
      description: 'Amendes, pénalités et coûts de conformité liés aux violations de données'
    },
    {
      icon: TrendingDown,
      title: 'Atteinte à la réputation',
      description: 'Perte de confiance des clients et impact durable sur la marque'
    }
  ];

  return (
    <section className="bg-slate-950 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-cyan-400 mb-6">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wider uppercase">Le vrai coût des incidents cyber</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Les incidents cyber génèrent toujours des coûts
          </h2>
          <p className="text-xl text-gray-400">
            La question n'est pas de savoir si un incident va arriver, mais si votre entreprise peut en absorber l'impact financier.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {impacts.map((impact, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-500/40 transition-all"
            >
              <div className="w-14 h-14 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-6 border border-cyan-500/20">
                <impact.icon className="w-7 h-7 text-cyan-400" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{impact.title}</h3>
              <p className="text-gray-400 leading-relaxed">{impact.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-8 text-center">
          <p className="text-xl text-gray-300">
            <span className="font-bold text-white">Le coût moyen d'une attaque par rançongiciel</span> pour une entreprise de taille moyenne dépasse <span className="text-cyan-400 font-bold">200 000 €</span>, incluant l'arrêt d'activité, la remise en état et les pertes de revenus.
          </p>
        </div>
      </div>
    </section>
  );
}
