import { Clock, Users, Award } from 'lucide-react';

export default function TrustBar() {
  const features = [
    {
      icon: Clock,
      text: 'Réponse 24/7 aux incidents cyber'
    },
    {
      icon: Users,
      text: 'Accès immédiat à des experts certifiés'
    },
    {
      icon: Award,
      text: 'Conçu pour les professionnels, pas pour les particuliers'
    }
  ];

  return (
    <section className="bg-slate-900 border-y border-cyan-500/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
                  <feature.icon className="w-6 h-6 text-cyan-400" strokeWidth={2} />
                </div>
              </div>
              <p className="text-gray-300 font-medium">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
