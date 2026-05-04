import ContactForm from '../components/ContactForm';
import CardIllustration from '../components/CardIllustration';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PageFeatureImage from '../components/PageFeatureImage';
import { assuranceCyberFaqItems } from '../data/faqs';
import { usePageMeta } from '../lib/usePageMeta';

export default function AssuranceCyberPage() {
  usePageMeta({
    title: 'Assurance cyber entreprise | Le Cyberassureur',
    description:
      "Guide pratique pour comprendre le rôle d'une assurance cyber en entreprise, ce qu'elle couvre, ce qu'elle ne remplace pas et comment choisir le bon niveau de protection.",
    path: '/assurance-cyber',
    keywords:
      "fonctionnement assurance cyber, couverture assurance cyber, assurance cyber entreprise guide, que couvre assurance cyber, protection cyber entreprise",
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: assuranceCyberFaqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  });

  return (
    <div className="page-shell">
      <Header />
      <main className="page-main">
        <section className="page-header">
          <div className="page-header__inner">
            <div className="site-section__eyebrow">
              <span className="site-section__eyebrow-text">Assurance cyber</span>
            </div>
            <h1 className="site-section__title mt-6">
              Comment fonctionne une assurance cyber pour entreprise ?
            </h1>
            <p className="site-section__intro mt-6">
              Une assurance cyber sert à limiter l&apos;impact financier d&apos;un incident
              numérique sur l&apos;activité. Elle intervient quand la cybersécurité ne suffit
              plus à éviter la perte : arrêt des outils, remise en état, frais d&apos;experts,
              responsabilités liées aux données ou besoin d&apos;accompagnement de crise.
            </p>
          </div>
        </section>

        <PageFeatureImage
          src="/seo-images/assurance-cyber-overview.png"
          alt="Dirigeants et conseiller en cyberassurance en réunion dans un bureau moderne"
        />

        <section className="site-section site-section--muted">
          <div className="site-section__container">
            <div className="site-section__header">
              <div className="site-section__eyebrow">
                <span className="site-section__eyebrow-text">Le bon cadrage</span>
              </div>
              <h2 className="site-section__title">Une assurance cyber ne remplace pas la sécurité, elle protège l’entreprise quand l’incident a déjà eu lieu</h2>
              <p className="site-section__intro">
                Beaucoup d’entreprises confondent encore outil de cybersécurité, prestataire IT et assurance cyber. Les trois n’ont pas le même rôle et ne couvrent pas la même réalité.
              </p>
            </div>

            <div className="site-card-grid site-card-grid--three">
              <article className="site-card">
                <CardIllustration variant="downtime-impact" />
                <h2 className="site-card__title">Interruption d’activité</h2>
                <p className="site-card__body">
                  Quand la messagerie, l’ERP, les fichiers ou les postes deviennent
                  indisponibles, le sujet principal n’est plus technique : il devient
                  immédiatement économique.
                </p>
              </article>
              <article className="site-card">
                <CardIllustration variant="crisis-comms" />
                <h2 className="site-card__title">Gestion de crise</h2>
                <p className="site-card__body">
                  Une assurance cyber permet d’accéder à des experts techniques,
                  juridiques et opérationnels pour piloter la réaction au bon moment.
                </p>
              </article>
              <article className="site-card">
                <CardIllustration variant="third-party" />
                <h2 className="site-card__title">Responsabilité liée aux données</h2>
                <p className="site-card__body">
                  Quand un incident touche des données clients, RH ou partenaires, le
                  coût dépasse vite la simple remise en route du système.
                </p>
              </article>
            </div>

            <div className="site-panel site-panel--accent topic-page__panel">
              <p className="site-panel__eyebrow">Ce qu’une entreprise doit regarder</p>
              <h2 className="site-panel__title">Le bon niveau d’assurance cyber dépend de l’impact potentiel, pas d’un réflexe standard</h2>
              <div className="topic-page__stack">
                <p className="site-panel__body">
                  Une entreprise doit d’abord se demander combien lui coûterait un arrêt,
                  une remise en état, une fraude ou une atteinte aux données. C’est cette
                  réalité qui permet ensuite de choisir un niveau de protection cohérent.
                  Pour affiner ce cadrage, consulte aussi
                  {' '}
                  <a className="topic-page__inline-link" href="/assurance-cyber-que-couvre">
                    ce que couvre une assurance cyber
                  </a>
                  {' '}et comparez ensuite les
                  <a className="topic-page__inline-link" href="/offres">différents niveaux d’offre</a>.
                </p>
                <ul className="topic-page__list">
                  <li>Dépendance à la messagerie, à l’ERP, au CRM ou aux outils métiers</li>
                  <li>Sensibilité des données manipulées et obligations associées</li>
                  <li>Capacité financière à absorber un arrêt de plusieurs jours</li>
                  <li>Exposition potentielle à la fraude ou à des dommages subis</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <FAQ
          sectionId="assurance-cyber-faq"
          eyebrow="Questions fréquentes"
          title="Questions fréquentes sur l’assurance cyber"
          intro="Cette page répond aux questions les plus fréquentes sur le rôle réel d’une assurance cyber et sur la manière de choisir une protection cohérente avec l’exposition d’une entreprise."
          items={assuranceCyberFaqItems}
        />

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
