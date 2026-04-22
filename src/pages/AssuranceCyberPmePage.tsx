import { Link } from 'react-router-dom';
import CardIllustration from '../components/CardIllustration';
import PageFeatureImage from '../components/PageFeatureImage';
import TopicPageLayout from '../components/TopicPageLayout';
import { assuranceCyberPmeFaqItems } from '../data/faqs';
import { usePageMeta } from '../lib/usePageMeta';

export default function AssuranceCyberPmePage() {
  usePageMeta({
    title: 'Assurance cyber PME : couverture et devis pour votre activité | Le Cyberassureur',
    description:
      "Assurance cyber PME : identifiez les risques les plus coûteux pour une PME, les garanties réellement utiles et la meilleure façon d'obtenir un devis cohérent avec votre activité.",
    path: '/assurance-cyber-pme',
    keywords:
      'assurance cyber pme, devis assurance cyber pme, couverture cyber pme, cyber risques pme, prix assurance cyber pme',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: assuranceCyberPmeFaqItems.map((item) => ({
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
      eyebrow="Assurance cyber PME"
      title="Assurance cyber PME : protéger la continuité d’activité, les données et la trésorerie"
      intro="Une PME concentre souvent messagerie, ERP, données clients, RH, comptabilité et accès distants. Cette combinaison suffit à créer un risque cyber important, même sans activité e-commerce."
      faqItems={assuranceCyberPmeFaqItems}
      faqSectionId="assurance-cyber-pme-faq"
      faqTitle="Questions fréquentes sur l’assurance cyber pour PME"
      faqIntro="Cette page aide les dirigeants de PME à comprendre les risques cyber les plus coûteux, les garanties utiles et la logique d’un devis bien calibré."
    >
      <PageFeatureImage
        src="/card-images/pme.jpg"
        alt="Equipe PME analysant les operations numeriques et le risque cyber dans un bureau"
      />

      <section className="site-section site-section--muted">
        <div className="site-section__container">
          <div className="site-section__header">
            <div className="site-section__eyebrow">
              <span className="site-section__eyebrow-text">Les points de fragilité d’une PME</span>
            </div>
            <h2 className="site-section__title">Le vrai risque cyber PME apparaît dès qu’un incident bloque les flux quotidiens</h2>
            <p className="site-section__intro">
              Dans une PME, la dépendance à quelques outils suffit à créer un impact fort.
              Quand la messagerie, l&apos;ERP, la facturation ou les dossiers clients deviennent
              indisponibles, le sujet devient immédiatement opérationnel et financier.
            </p>
          </div>

          <div className="site-card-grid site-card-grid--three">
            <article className="site-card">
              <CardIllustration variant="sme-ops" />
              <h2 className="site-card__title">Outils métiers critiques</h2>
              <p className="site-card__body">
                Une PME dépend souvent de quelques briques clés: messagerie, ERP, CRM,
                logiciels de production, facturation ou paie. Leur arrêt a un impact immédiat.
              </p>
            </article>
            <article className="site-card">
              <CardIllustration variant="legal-impact" />
              <h2 className="site-card__title">Données clients, RH et finance</h2>
              <p className="site-card__body">
                Les PME manipulent déjà assez de données pour générer un risque juridique,
                réglementaire et commercial en cas d’exposition ou de compromission.
              </p>
            </article>
            <article className="site-card">
              <CardIllustration variant="finance-impact" />
              <h2 className="site-card__title">Trésorerie et capacité d’absorption</h2>
              <p className="site-card__body">
                Plus la structure est tendue, plus un arrêt de quelques jours, des frais
                d’experts ou une fraude peuvent déséquilibrer rapidement l’activité.
              </p>
            </article>
          </div>

          <div className="site-panel site-panel--accent topic-page__panel">
            <p className="site-panel__eyebrow">Ce qu’une PME doit arbitrer</p>
            <h2 className="site-panel__title">Le bon contrat cyber pour PME ne se choisit pas uniquement sur un prix d’appel</h2>
            <div className="topic-page__stack">
              <p className="site-panel__body">
                Une PME a besoin d&apos;une lecture claire du risque: combien coûte un arrêt,
                quelle part du chiffre d&apos;affaires dépend des outils, quelles données sont
                manipulées, et quelles conséquences elle peut supporter seule.
              </p>
              <ul className="topic-page__list">
                <li>Interruption d’activité et perte de revenus</li>
                <li>Frais d’experts, remédiation et gestion de crise</li>
                <li>Exposition aux données et à des tiers</li>
                <li>Dommages subis et fraude selon les besoins réels</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-section__container">
          <div className="site-section__header">
            <div className="site-section__eyebrow">
              <span className="site-section__eyebrow-text">Les bonnes étapes</span>
            </div>
            <h2 className="site-section__title">Comment cadrer une assurance cyber cohérente pour une PME ?</h2>
            <p className="site-section__intro">
              L’objectif n’est pas de multiplier les garanties, mais de couvrir ce qui
              déséquilibrerait réellement votre entreprise en cas d’incident.
            </p>
          </div>

          <div className="site-card-grid site-card-grid--two">
            <article className="site-card">
              <h3 className="site-card__title">Comprendre les risques les plus coûteux</h3>
              <p className="site-card__body">
                Avant de choisir une formule, il faut identifier les scénarios qui
                menacent réellement votre continuité d’activité et votre trésorerie.
              </p>
              <Link to="/assurance-cyber-risques" className="site-card__meta">
                Voir les cyber-risques PME les plus coûteux
              </Link>
            </article>
            <article className="site-card">
              <h3 className="site-card__title">Demander un devis assurance cyber PME</h3>
              <p className="site-card__body">
                Une demande bien renseignée permet de qualifier plus vite le besoin et
                d’orienter la PME vers un niveau de couverture cohérent.
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
