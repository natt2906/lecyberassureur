import { Link } from 'react-router-dom';
import CardIllustration from '../components/CardIllustration';
import PageFeatureImage from '../components/PageFeatureImage';
import TopicPageLayout from '../components/TopicPageLayout';
import { assuranceCyberPriceFaqItems } from '../data/faqs';
import { usePageMeta } from '../lib/usePageMeta';

export default function AssuranceCyberPricePage() {
  usePageMeta({
    title: 'Prix assurance cyber PME : comment estimer le bon budget | Le Cyberassureur',
    description:
      "Prix assurance cyber PME : découvrez ce qui fait varier le tarif, comment lire un prix d'appel et comment demander un devis cohérent avec votre exposition réelle.",
    path: '/assurance-cyber-prix',
    keywords:
      'assurance cyber prix pme, prix assurance cyber, tarif assurance cyber entreprise, devis assurance cyber, budget assurance cyber',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: assuranceCyberPriceFaqItems.map((item) => ({
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
      eyebrow="Prix assurance cyber"
      title="Prix assurance cyber PME : comment estimer un budget cohérent ?"
      intro="Le prix d’une assurance cyber ne se résume pas à une grille standard. Il dépend surtout de votre exposition réelle, du niveau de garanties recherché et du coût potentiel d’un incident pour votre entreprise."
      faqItems={assuranceCyberPriceFaqItems}
      faqSectionId="assurance-cyber-prix-faq"
      faqTitle="Questions fréquentes sur le prix d’une assurance cyber"
      faqIntro="Cette page répond aux questions les plus utiles pour comprendre ce qui fait varier le prix d’une assurance cyber et comment demander un devis plus rapidement."
    >
      <PageFeatureImage
        src="/seo-images/assurance-cyber-prix.png"
        alt="Dirigeants d PME et conseillère analysant le budget et le coût d'une couverture cyber"
      />

      <section className="site-section site-section--muted">
        <div className="site-section__container">
          <div className="site-section__header">
            <div className="site-section__eyebrow">
              <span className="site-section__eyebrow-text">Ce qui fait varier le prix</span>
            </div>
            <h2 className="site-section__title">Le tarif dépend surtout du risque économique porté par votre entreprise</h2>
            <p className="site-section__intro">
              Deux entreprises de taille proche n&apos;ont pas toujours le même prix.
              Ce qui compte, c&apos;est votre dépendance aux outils numériques, la nature
              des données manipulées et le niveau de couverture réellement attendu.
            </p>
          </div>

          <div className="site-card-grid site-card-grid--three">
            <article className="site-card">
              <CardIllustration variant="sme-ops" />
              <h2 className="site-card__title">Taille, chiffre d’affaires et organisation</h2>
              <p className="site-card__body">
                Plus une structure compte de postes, de flux, d’utilisateurs ou de
                dépendances métiers, plus le coût potentiel d’un incident peut
                augmenter, et avec lui le niveau de protection à prévoir.
              </p>
            </article>
            <article className="site-card">
              <CardIllustration variant="continuity-core" />
              <h2 className="site-card__title">Dépendance aux outils et aux données</h2>
              <p className="site-card__body">
                Une entreprise très dépendante à sa messagerie, son ERP, ses accès
                distants, ses données clients ou ses paiements en ligne supporte
                un risque économique plus élevé qu’une structure moins exposée.
              </p>
            </article>
            <article className="site-card">
              <CardIllustration variant="specialist-focus" />
              <h2 className="site-card__title">Niveau de garanties et options retenues</h2>
              <p className="site-card__body">
                Le tarif évolue selon les garanties choisies, les plafonds, les
                franchises et l’ajout de protections sur les dommages subis
                ou la fraude selon la formule retenue.
              </p>
            </article>
          </div>

          <div className="site-panel site-panel--accent topic-page__panel">
            <p className="site-panel__eyebrow">Le bon raisonnement</p>
            <h2 className="site-panel__title">Un bon prix n’est pas le plus bas, c’est celui qui reste cohérent avec l’impact potentiel</h2>
            <div className="topic-page__stack">
              <p className="site-panel__body">
                Une assurance cyber sous-dimensionnée peut sembler économique au départ
                mais devenir insuffisante au moment du sinistre. À l’inverse, un devis
                bien calibré protège mieux la trésorerie et la continuité d’activité.
              </p>
              <ul className="topic-page__list">
                <li>Coût potentiel d’un arrêt de quelques jours</li>
                <li>Importance des données clients, RH ou financières</li>
                <li>Exposition à la fraude, à la messagerie compromise ou aux tiers</li>
                <li>Capacité de l’entreprise à absorber seule le choc financier</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-section__container">
          <div className="site-section__header">
            <div className="site-section__eyebrow">
              <span className="site-section__eyebrow-text">Pour aller plus vite</span>
            </div>
            <h2 className="site-section__title">Comment demander un devis assurance cyber plus efficacement ?</h2>
            <p className="site-section__intro">
              Plus les informations sont claires dès le départ, plus l’analyse du besoin
              et le cadrage du devis sont rapides.
            </p>
          </div>

          <div className="site-card-grid site-card-grid--two">
            <article className="site-card">
              <h3 className="site-card__title">Préparer son besoin réel</h3>
              <p className="site-card__body">
                Précisez votre activité, votre dépendance aux outils numériques, votre
                taille, les données manipulées et les scénarios que vous craignez le plus.
              </p>
              <a href="/#devis-cyber" className="site-card__meta">
                Demander un devis cyber
              </a>
            </article>
            <article className="site-card">
              <h3 className="site-card__title">Comparer le niveau de couverture</h3>
              <p className="site-card__body">
                Avant de raisonner prix seul, comparez aussi le périmètre des formules
                disponibles et les écarts entre Basic, Silver et Gold.
              </p>
              <Link to="/offres" className="site-card__meta">
                Voir les offres d&apos;assurance cyber
              </Link>
            </article>
          </div>
        </div>
      </section>
    </TopicPageLayout>
  );
}
