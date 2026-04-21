import {
  Activity,
  BadgeCheck,
  ShieldCheck,
  Target,
  TimerReset,
  Waypoints,
} from 'lucide-react';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { usePageMeta } from '../lib/usePageMeta';

export default function AboutPage() {
  usePageMeta({
    title: 'Qui sommes-nous ? | Le Cyberassureur',
    description:
      "Découvrez Le Cyberassureur, la marque spécialisée de Prorisk Assurances dédiée à l'assurance cyber entreprise, à la protection financière et à l'accompagnement des organisations face aux cyber-risques.",
    path: '/qui-sommes-nous',
    keywords:
      'qui sommes nous cyberassurance, le cyberassureur, prorisk assurances, courtier assurance cyber entreprise, specialiste assurance cyber',
  });

  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Une expertise technique avancée',
      body: "Nous analysons l'exposition réelle des entreprises face aux cyber-risques, au-delà des discours génériques et des garanties standardisées.",
    },
    {
      icon: Target,
      title: 'Une précision assurantielle',
      body: "Chaque recommandation vise une cohérence stricte entre les enjeux de l'entreprise, ses risques et le niveau de couverture réellement utile.",
    },
    {
      icon: Waypoints,
      title: 'Un accompagnement sur mesure',
      body: "Nous construisons des solutions personnalisées, sans garanties inutiles, avec une lecture claire des priorités opérationnelles et financières.",
    },
  ];

  const commitments = [
    {
      icon: BadgeCheck,
      title: "Une analyse rigoureuse des risques",
    },
    {
      icon: Activity,
      title: 'Des solutions sur mesure, sans compromis',
    },
    {
      icon: TimerReset,
      title: "Une réactivité immédiate en cas d'incident",
    },
  ];

  return (
    <div className="page-shell">
      <Header />
      <main className="page-main">
        <section className="page-header">
          <div className="page-header__inner">
            <div className="site-section__eyebrow">
              <span className="site-section__eyebrow-text">Qui sommes-nous ?</span>
            </div>
            <h1 className="site-section__title mt-6">Une marque spécialisée portée par Prorisk Assurances</h1>
            <p className="site-section__intro mt-6">
              LeCyberAssureur est la marque spécialisée du cabinet Prorisk Assurances,
              dédiée à la protection des entreprises face aux cyber-risques et aux
              enjeux assurantiels modernes.
            </p>
          </div>
        </section>

        <section className="site-section site-section--muted">
          <div className="site-section__container">
            <div className="site-card-grid site-card-grid--two">
              <article className="site-card">
                <p className="site-card__meta">Notre positionnement</p>
                <h2 className="site-card__title">Une vision globale du courtage, avec une spécialisation pointue en assurance cyber entreprise</h2>
                <p className="site-card__body">
                  Adossé à l’expertise et à la solidité de Prorisk Assurances, nous
                  accompagnons les entreprises exposées aux menaces numériques avec
                  une approche fondée sur la précision, l’exigence et la performance.
                </p>
                <p className="site-card__body">
                  Dans un contexte marqué par l’augmentation des cyberattaques,
                  notre ambition est claire : sécuriser durablement les entreprises
                  grâce à des solutions d’assurance cyber performantes et sur mesure.
                </p>
              </article>

              <article className="site-card">
                <p className="site-card__meta">Marque spécialisée</p>
                <h2 className="site-card__title">LeCyberAssureur s’appuie sur Prorisk Assurances</h2>
                <div className="partners-section__logo-wrap">
                  <img
                    src="/partners/prorisk-assurnaces-logo.png"
                    alt="Prorisk Assurances"
                    className="partners-section__logo partners-section__logo--prorisk"
                  />
                </div>
                <p className="site-card__body">
                  Nous bénéficions d’une expertise reconnue en risques professionnels,
                  d’une sélection rigoureuse des compagnies spécialisées et d’une
                  analyse approfondie de chaque activité.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="site-section">
          <div className="site-section__container">
            <div className="site-section__header">
              <div className="site-section__eyebrow">
                <span className="site-section__eyebrow-text">Une vision exigeante du courtage</span>
              </div>
              <h2 className="site-section__title">Nous ne proposons pas de solutions standardisées</h2>
              <p className="site-section__intro">
                Chaque entreprise fait l’objet d’une analyse approfondie de son exposition,
                afin de construire une assurance cyber entreprise parfaitement adaptée
                à ses enjeux réels.
              </p>
            </div>

            <div className="site-card-grid site-card-grid--three">
              {pillars.map((pillar) => (
                <article key={pillar.title} className="site-card">
                  <div className="site-card__icon">
                    <pillar.icon className="h-7 w-7 text-cyan-400" strokeWidth={2} />
                  </div>
                  <h3 className="site-card__title">{pillar.title}</h3>
                  <p className="site-card__body">{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="site-section site-section--muted">
          <div className="site-section__container">
            <div className="site-section__header">
              <div className="site-section__eyebrow">
                <span className="site-section__eyebrow-text">Risques stratégiques</span>
              </div>
              <h2 className="site-section__title">Une expertise dédiée aux environnements sensibles</h2>
              <p className="site-section__intro">
                LeCyberAssureur accompagne les entreprises sur des problématiques à
                forte sensibilité, où les risques juridiques, technologiques et financiers
                s’entrecroisent.
              </p>
            </div>

            <div className="site-card-grid site-card-grid--two">
              <article className="site-card">
                <h3 className="site-card__title">Nos domaines d’intervention</h3>
                <ul className="topic-page__list">
                  <li>Assurance cyber entreprise : prévention, gestion de crise et couverture financière</li>
                  <li>Responsabilité civile professionnelle</li>
                  <li>Protection des systèmes d’information et des données</li>
                  <li>Risques complexes et émergents</li>
                </ul>
              </article>

              <article className="site-card">
                <h3 className="site-card__title">Ce qu’une cyberattaque peut provoquer</h3>
                <ul className="topic-page__list">
                  <li>Interruption d’activité</li>
                  <li>Perte de chiffre d’affaires</li>
                  <li>Atteinte à la réputation</li>
                  <li>Sanctions RGPD et coûts de remédiation élevés</li>
                </ul>
                <p className="site-card__body">
                  L’assurance cyber entreprise devient alors un levier essentiel
                  de continuité et de protection financière.
                </p>
              </article>
            </div>

            <div className="site-panel site-panel--accent topic-page__panel">
              <p className="site-panel__eyebrow">Notre méthode</p>
              <h2 className="site-panel__title">Une compréhension fine des risques juridiques, technologiques et financiers</h2>
              <p className="site-panel__body">
                Notre approche repose sur une lecture concrète des environnements
                technologiques, des contraintes réglementaires et de l’impact financier
                réel que peut subir l’entreprise en cas d’incident.
              </p>
            </div>
          </div>
        </section>

        <section className="site-section">
          <div className="site-section__container">
            <div className="site-section__header">
              <div className="site-section__eyebrow">
                <span className="site-section__eyebrow-text">L’exigence comme signature</span>
              </div>
              <h2 className="site-section__title">Une relation fondée sur la confiance et l’excellence opérationnelle</h2>
              <p className="site-section__intro">
                Parce que les enjeux sont critiques, nous faisons le choix d’un
                accompagnement précis, engagé et résolument orienté résultats.
              </p>
            </div>

            <div className="site-card-grid site-card-grid--three">
              {commitments.map((commitment) => (
                <article key={commitment.title} className="site-card">
                  <div className="site-card__icon">
                    <commitment.icon className="h-7 w-7 text-cyan-400" strokeWidth={2} />
                  </div>
                  <h3 className="site-card__title">{commitment.title}</h3>
                </article>
              ))}
            </div>

            <div className="site-panel site-panel--center topic-page__panel">
              <p className="site-panel__eyebrow">Notre signature</p>
              <h2 className="site-panel__title">Anticiper. Protéger. Sécuriser.</h2>
              <p className="site-panel__body">
                Nous construisons avec nos clients une protection concrète, opérationnelle
                et durable, fondée sur la transparence, la confidentialité, la réactivité
                et la performance.
              </p>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
