import { Link } from 'react-router-dom';
import CardIllustration from '../components/CardIllustration';
import PageFeatureImage from '../components/PageFeatureImage';
import TopicPageLayout from '../components/TopicPageLayout';
import { assuranceCyberTpeFaqItems } from '../data/faqs';
import { usePageMeta } from '../lib/usePageMeta';

export default function AssuranceCyberTpePage() {
  usePageMeta({
    title: 'Assurance cyber TPE : protéger une petite entreprise contre le risque cyber | Le Cyberassureur',
    description:
      "Assurance cyber TPE : découvrez pourquoi une petite entreprise, une startup ou une structure agile reste exposée, quelles garanties regarder et comment demander un devis adapté.",
    path: '/assurance-cyber-tpe',
    keywords:
      'assurance cyber tpe, assurance cyber petite entreprise, devis assurance cyber tpe, cyber risque tpe, assurance cyber startup',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: assuranceCyberTpeFaqItems.map((item) => ({
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
    <TopicPageLayout
      eyebrow="Assurance cyber TPE"
      title="Assurance cyber TPE : pourquoi une petite structure reste fortement exposée"
      intro="Une TPE, une startup ou une petite équipe peut subir un impact cyber disproportionné. Quelques outils cloud, une messagerie compromise ou une fraude suffisent à bloquer l’activité et à fragiliser la trésorerie."
      faqItems={assuranceCyberTpeFaqItems}
      faqSectionId="assurance-cyber-tpe-faq"
      faqTitle="Questions fréquentes sur l’assurance cyber pour TPE"
      faqIntro="Cette page aide les petites structures à comprendre pourquoi le risque cyber les concerne directement et comment choisir une protection réaliste."
    >
      <PageFeatureImage
        src="/card-images/tpe-startups.jpg"
        alt="Equipe de petite entreprise travaillant autour d'outils cloud et d'un ordinateur portable"
      />

      <section className="site-section site-section--muted">
        <div className="site-section__container">
          <div className="site-section__header">
            <div className="site-section__eyebrow">
              <span className="site-section__eyebrow-text">Pourquoi une TPE est concernée</span>
            </div>
            <h2 className="site-section__title">La petite taille ne réduit pas le risque, elle réduit surtout la capacité à absorber le choc</h2>
            <p className="site-section__intro">
              Une petite structure peut être très digitale avec peu de moyens internes.
              C’est précisément ce qui rend un incident cyber plus critique: tout repose
              sur quelques outils, quelques comptes et une organisation très compacte.
            </p>
          </div>

          <div className="site-card-grid site-card-grid--three">
            <article className="site-card">
              <CardIllustration variant="startup-stack" />
              <h2 className="site-card__title">Email, cloud et paiements</h2>
              <p className="site-card__body">
                Une TPE fonctionne souvent avec peu d’outils, mais ils sont critiques:
                email, stockage, comptabilité, accès distants, signature ou paiement.
              </p>
            </article>
            <article className="site-card">
              <CardIllustration variant="continuity-core" />
              <h2 className="site-card__title">Arrêt d’activité très sensible</h2>
              <p className="site-card__body">
                Quelques jours d’indisponibilité suffisent parfois à bloquer la production,
                la relation client ou l’encaissement, avec un effet immédiat sur la trésorerie.
              </p>
            </article>
            <article className="site-card">
              <CardIllustration variant="support-247" />
              <h2 className="site-card__title">Besoin d’une réponse simple et rapide</h2>
              <p className="site-card__body">
                Une TPE n’a généralement ni RSSI ni équipe dédiée. L’assurance cyber sert
                aussi à accéder vite à des interlocuteurs compétents et mobilisables.
              </p>
            </article>
          </div>

          <div className="site-panel site-panel--accent topic-page__panel">
            <p className="site-panel__eyebrow">Le bon réflexe</p>
            <h2 className="site-panel__title">Une assurance cyber TPE utile protège d’abord la capacité à continuer à travailler</h2>
            <div className="topic-page__stack">
              <p className="site-panel__body">
                Pour une petite structure, la question n’est pas seulement la gravité
                technique de l’attaque. C’est surtout l’impact concret sur les ventes,
                les règlements, la relation client et l’organisation quotidienne.
              </p>
              <ul className="topic-page__list">
                <li>Protection financière en cas d’arrêt ou de remise en état</li>
                <li>Accès rapide à des experts quand l’incident survient</li>
                <li>Couverture cohérente avec la taille réelle de la structure</li>
                <li>Lecture simple du contrat et des garanties utiles</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-section__container">
          <div className="site-section__header">
            <div className="site-section__eyebrow">
              <span className="site-section__eyebrow-text">Pour avancer</span>
            </div>
            <h2 className="site-section__title">Les deux sujets à cadrer en priorité pour une TPE</h2>
            <p className="site-section__intro">
              Une petite entreprise n’a pas besoin d’un dispositif compliqué. Elle a besoin
              d’une vision claire de son risque et d’un devis lisible.
            </p>
          </div>

          <div className="site-card-grid site-card-grid--two">
            <article className="site-card">
              <h3 className="site-card__title">Comprendre les impacts réels</h3>
              <p className="site-card__body">
                Un phishing, une compromission de messagerie ou une fraude peuvent suffire
                à déstabiliser une TPE. Il faut d’abord mesurer ce risque économique.
              </p>
              <Link to="/assurance-cyber-risques" className="site-card__meta">
                Voir les risques cyber les plus coûteux
              </Link>
            </article>
            <article className="site-card">
              <h3 className="site-card__title">Obtenir un devis ciblé</h3>
              <p className="site-card__body">
                Une demande de devis bien cadrée permet de distinguer le socle utile
                d’une surprotection inutile pour une petite structure.
              </p>
              <Link to="/devis-assurance-cyber" className="site-card__meta">
                Demander un devis assurance cyber
              </Link>
            </article>
          </div>
        </div>
      </section>
    </TopicPageLayout>
  );
}
