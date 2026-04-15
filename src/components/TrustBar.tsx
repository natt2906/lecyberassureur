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
    <section className="site-section site-section--muted site-section--bordered site-section--compact">
      <div className="site-section__container">
        <div className="trust-strip__grid">
          {features.map((feature, index) => (
            <div key={index} className="trust-strip__item">
              <div className="site-card__icon site-card__icon--small">
                <feature.icon className="w-6 h-6 text-cyan-400" strokeWidth={2} />
              </div>
              <p className="trust-strip__text">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
