import { Link } from 'react-router-dom';
import CardIllustration from '../components/CardIllustration';
import PageFeatureImage from '../components/PageFeatureImage';
import TopicPageLayout from '../components/TopicPageLayout';
import { assuranceCyberPmeFaqItems } from '../data/faqs';
import { usePageMeta } from '../lib/usePageMeta';

export default function AssuranceCyberPmePage() {
  usePageMeta({
    title: 'Assurance cyber PME | Le Cyberassureur',
    description:
      "Assurance cyber PME : couvrez les risques les plus coûteux, clarifiez garanties et exclusions, puis obtenez un devis aligné avec votre activité réelle.",
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
      directAnswer={{
        question: "Qu’est-ce qu’une assurance cyber pour PME ?",
        answer:
          "Une assurance cyber pour PME couvre les conséquences financières et opérationnelles d’un incident numérique qui bloque les flux quotidiens. Elle peut inclure l’interruption d’activité, les frais d’experts techniques et juridiques, la gestion de crise et, selon contrat, des garanties complémentaires comme les dommages subis ou la fraude. L’objectif principal est de protéger la continuité d’activité, la relation client et la trésorerie lorsque la messagerie, l’ERP, la facturation ou les accès distants sont touchés. Une PME choisit son contrat en fonction de scénarios concrets: rançongiciel, compromission de messagerie, indisponibilité d’outil métier ou exposition de données. Les points décisifs restent les exclusions, plafonds, franchises et conditions de déclenchement, ainsi que la capacité de l’assureur à mobiliser rapidement les intervenants adaptés, y compris pendant les premières heures de crise.",
      }}
      showTrustNote
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
            <h2 className="site-section__title">Pourquoi les PME ont besoin d’une assurance cyber ?</h2>
            <p className="site-section__intro">
              Dans une PME, la dépendance à quelques outils suffit à créer un impact fort.
              Quand la messagerie, l&apos;ERP, la facturation ou les dossiers clients deviennent
              indisponibles, le sujet devient immédiatement opérationnel et financier. Une couverture
              pertinente sert surtout à gagner du temps dans les premières heures: accès à des experts,
              organisation des priorités, limitation des pertes et reprise encadrée.
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
                manipulées, et quelles conséquences elle peut supporter seule. Cette approche évite
                de choisir une formule sur un prix isolé, sans vérifier les limites contractuelles
                qui deviennent décisives en situation réelle.
              </p>
              <ul className="topic-page__list">
                <li>Interruption d’activité et perte de revenus</li>
                <li>Frais d’experts, remédiation et gestion de crise</li>
                <li>Exposition aux données et à des tiers</li>
                <li>Dommages subis et fraude selon les besoins réels</li>
              </ul>
              <p className="site-panel__body">
                Pour comparer les scénarios et les postes de coûts, consultez aussi{' '}
                <Link to="/assurance-cyber-prix" className="topic-page__inline-link">la page dédiée au prix</Link>{' '}
                et{' '}
                <Link to="/assurance-cyber-que-couvre" className="topic-page__inline-link">le détail des garanties couvertes</Link>.
              </p>
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
            <h2 className="site-section__title">Quelles garanties privilégier ?</h2>
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

      <section className="site-section site-section--muted">
        <div className="site-section__container">
          <div className="site-section__header">
            <div className="site-section__eyebrow">
              <span className="site-section__eyebrow-text">Scénarios PME fréquents</span>
            </div>
            <h2 className="site-section__title">Quels risques cyber touchent les PME ?</h2>
          </div>
          <div className="site-card-grid site-card-grid--three">
            <article className="site-card">
              <h3 className="site-card__title">Interruption d’activité</h3>
              <p className="site-card__body">
                Un incident sur la messagerie ou l’ERP peut stopper la production, retarder les livraisons et ralentir la facturation.
              </p>
            </article>
            <article className="site-card">
              <h3 className="site-card__title">Fraude et usurpation</h3>
              <p className="site-card__body">
                Les compromissions de comptes email peuvent mener à des virements frauduleux ou à des changements de RIB non détectés.
              </p>
            </article>
            <article className="site-card">
              <h3 className="site-card__title">Rançongiciel et crise client</h3>
              <p className="site-card__body">
                La restauration technique prend du temps et peut s’accompagner d’une crise de confiance côté clients et partenaires.
              </p>
            </article>
          </div>
          <div className="site-panel site-panel--accent topic-page__panel">
            <p className="site-panel__eyebrow">Exigences clients et fournisseurs</p>
            <p className="site-panel__body">
              De plus en plus de PME doivent démontrer leur niveau de protection cyber dans des appels d’offres, contrats-cadres ou relations donneurs d’ordre. Une couverture lisible peut devenir un facteur de maintien d’activité commerciale.
            </p>
            <h2 className="site-panel__title">Combien peut coûter une interruption d’activité ?</h2>
            <p className="site-panel__body">
              Le coût dépend de la durée d’arrêt, du niveau de dépendance numérique et des flux commerciaux concernés. Même quelques jours peuvent générer un effet significatif sur la trésorerie d’une PME.
            </p>
            <h2 className="site-panel__title">Comment préparer son dossier ?</h2>
            <p className="site-panel__body">
              Préparez une vue claire de vos outils critiques, des données traitées, des mesures de sécurité et des scénarios redoutés pour accélérer la qualification du devis.
            </p>
            <h2 className="site-panel__title">Comment choisir une couverture adaptée ?</h2>
            <p className="site-panel__body">
              Comparez garanties, franchises et plafonds sur des cas concrets puis validez une formule cohérente avec vos contraintes opérationnelles.
            </p>
            <p className="site-panel__body">
              Deux exemples concrets observés en PME: premièrement, une compromission de messagerie avec changement de RIB fournisseur peut entraîner des pertes directes et une mobilisation comptable urgente; deuxièmement, une indisponibilité ERP pendant plusieurs jours retarde livraisons et facturation, avec effet immédiat sur la trésorerie. Dans ces deux cas, la valeur d’un contrat tient à la rapidité d’activation des assistances et au niveau des garanties réellement mobilisables.
            </p>
            <p className="site-panel__body">
              Pour finaliser votre choix, vous pouvez comparer{' '}
              <Link to="/offres" className="topic-page__inline-link">les niveaux d’offres</Link>,{' '}
              vérifier les{' '}
              <Link to="/assurance-cyber" className="topic-page__inline-link">fondamentaux de l’assurance cyber entreprise</Link>{' '}
              puis lancer une{' '}
              <Link to="/devis-assurance-cyber" className="topic-page__inline-link">demande de devis détaillée</Link>.
            </p>
            <p className="site-panel__body">
              Sources de référence: <a className="topic-page__inline-link" href="https://www.anssi.gouv.fr/" target="_blank" rel="noreferrer">ANSSI</a> et <a className="topic-page__inline-link" href="https://www.francenum.gouv.fr/" target="_blank" rel="noreferrer">France Num</a>.
            </p>
          </div>
        </div>
      </section>
    </TopicPageLayout>
  );
}
