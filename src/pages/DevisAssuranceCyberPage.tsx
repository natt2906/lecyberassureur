import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PageFeatureImage from '../components/PageFeatureImage';
import { devisAssuranceCyberFaqItems } from '../data/faqs';
import { usePageMeta } from '../lib/usePageMeta';

export default function DevisAssuranceCyberPage() {
  usePageMeta({
    title: 'Devis assurance cyber : demande rapide pour entreprise | Le Cyberassureur',
    description:
      "Demandez un devis assurance cyber pour votre entreprise. Décrivez votre activité, votre exposition et votre besoin de couverture pour obtenir un cadrage rapide et cohérent.",
    path: '/devis-assurance-cyber',
    keywords:
      'devis assurance cyber, demande devis assurance cyber, devis cyber entreprise, prix assurance cyber devis, formulaire assurance cyber',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: devisAssuranceCyberFaqItems.map((item) => ({
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
              <span className="site-section__eyebrow-text">Devis assurance cyber</span>
            </div>
            <h1 className="site-section__title mt-6">
              Demander un devis assurance cyber pour votre entreprise
            </h1>
            <p className="site-section__intro mt-6">
              Décrivez votre activité, votre taille et votre niveau d’exposition pour
              obtenir un cadrage rapide du besoin. L’objectif n’est pas de produire un
              prix générique, mais un devis assurance cyber cohérent avec votre réalité.
            </p>
          </div>
        </section>

        <PageFeatureImage
          src="/seo-images/assurance-cyber-prix.png"
          alt="Conseillere et dirigeant cadrant une demande de devis assurance cyber"
        />

        <section className="site-section site-section--muted">
          <div className="site-section__container">
            <div className="site-section__header">
              <div className="site-section__eyebrow">
                <span className="site-section__eyebrow-text">Avant le formulaire</span>
              </div>
              <h2 className="site-section__title">Un devis assurance cyber utile repose sur quelques informations simples</h2>
              <p className="site-section__intro">
                Plus la demande est claire, plus il est possible d’orienter l’entreprise
                vers un niveau de couverture réellement cohérent.
              </p>
            </div>

            <div className="site-card-grid site-card-grid--three">
              <article className="site-card">
                <h2 className="site-card__title">Votre activité</h2>
                <p className="site-card__body">
                  Domaine d’activité, taille de structure, présence de données clients,
                  dépendance aux outils numériques et exposition à des tiers.
                </p>
              </article>
              <article className="site-card">
                <h2 className="site-card__title">Votre besoin de couverture</h2>
                <p className="site-card__body">
                  Niveau de garantie visé, sensibilité à l’arrêt d’activité, aux dommages
                  subis, à la fraude et aux responsabilités liées aux données.
                </p>
              </article>
              <article className="site-card">
                <h2 className="site-card__title">Votre niveau de maturité</h2>
                <p className="site-card__body">
                  Sauvegardes, MFA, prestataire IT, exposition déjà connue et historique
                  d’incidents éventuels permettent de mieux lire le profil de risque.
                </p>
              </article>
            </div>

            <div className="site-panel site-panel--accent topic-page__panel">
              <p className="site-panel__eyebrow">La bonne logique</p>
              <h2 className="site-panel__title">Demander un devis cyber ne consiste pas à cocher une formule, mais à cadrer une exposition réelle</h2>
              <div className="topic-page__stack">
                <p className="site-panel__body">
                  Une entreprise peut avoir besoin d’un premier socle de protection ou
                  d’une couverture plus large selon ses usages, son secteur et les conséquences
                  financières d’un incident. Le formulaire sert précisément à qualifier ce besoin.
                </p>
                <ul className="topic-page__list">
                  <li>Identifier les scénarios de perte les plus critiques</li>
                  <li>Vérifier le niveau de garanties réellement utile</li>
                  <li>Éviter les contrats trop courts ou trop larges</li>
                  <li>Accélérer le traitement du devis avec des données fiables</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <ContactForm />

        <FAQ
          sectionId="devis-assurance-cyber-faq"
          eyebrow="Questions fréquentes"
          title="Questions fréquentes sur la demande de devis assurance cyber"
          intro="Cette page répond aux questions les plus utiles avant de remplir un formulaire de devis assurance cyber."
          items={devisAssuranceCyberFaqItems}
        />

        <section className="site-section">
          <div className="site-section__container">
            <div className="site-card-grid site-card-grid--two">
              <article className="site-card">
                <h3 className="site-card__title">Comparer les niveaux d’offre</h3>
                <p className="site-card__body">
                  Avant ou après votre demande, vous pouvez comparer les différences entre
                  Basic, Silver et Gold pour mieux positionner votre besoin.
                </p>
                <Link to="/offres" className="site-card__meta">
                  Voir les offres d’assurance cyber
                </Link>
              </article>
              <article className="site-card">
                <h3 className="site-card__title">Comprendre le budget à prévoir</h3>
                <p className="site-card__body">
                  Le devis dépend de votre exposition réelle. Si vous voulez comprendre
                  ce qui fait varier le prix, la page dédiée vous donne le bon cadrage.
                </p>
                <Link to="/assurance-cyber-prix" className="site-card__meta">
                  Comprendre le prix d’une assurance cyber
                </Link>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
