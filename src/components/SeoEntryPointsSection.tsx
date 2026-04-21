import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CardIllustration from './CardIllustration';

const entries = [
  {
    to: '/assurance-cyber-prix',
    title: 'Prix assurance cyber',
    body: "Comprendre ce qui fait varier le tarif, comment lire un prix d'appel et comment cadrer un devis cohérent avec votre exposition.",
    meta: 'Comparer le budget réel',
    variant: 'finance-impact' as const,
  },
  {
    to: '/assurance-cyber-obligatoire',
    title: 'Assurance cyber obligatoire ou non',
    body: "Distinguer l'absence d'obligation générale, les exigences contractuelles et les cas où la couverture devient nécessaire en pratique.",
    meta: 'Clarifier l’obligation',
    variant: 'legal-impact' as const,
  },
  {
    to: '/assurance-cyber-que-couvre',
    title: 'Que couvre une assurance cyber',
    body: "Vérifier les garanties vraiment utiles: interruption d'activité, frais d'experts, responsabilités liées aux données, dommages subis et fraude.",
    meta: 'Lire le périmètre utile',
    variant: 'incident-experts' as const,
  },
] as const;

export default function SeoEntryPointsSection() {
  return (
    <section className="site-section site-section--muted site-section--deferred">
      <div className="site-section__container">
        <div className="site-section__header">
          <div className="site-section__eyebrow">
            <span className="site-section__eyebrow-text">Questions concrètes</span>
          </div>
          <h2 className="site-section__title">Trois questions utiles avant de demander un devis cyber</h2>
          <p className="site-section__intro">
            Ces pages complètent la landing avec des réponses plus précises sur le prix,
            l’obligation réelle et le périmètre de couverture d’une assurance cyber.
          </p>
        </div>

        <div className="site-card-grid site-card-grid--three">
          {entries.map((entry) => (
            <Link
              key={entry.to}
              to={entry.to}
              className="site-card site-card--interactive group"
              aria-label={`Lire la page : ${entry.title}`}
            >
              <CardIllustration variant={entry.variant} />
              <p className="site-card__meta">{entry.meta}</p>
              <h3 className="site-card__title">{entry.title}</h3>
              <p className="site-card__body">{entry.body}</p>
              <span className="site-card__meta inline-flex items-center gap-2">
                Lire la page
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
