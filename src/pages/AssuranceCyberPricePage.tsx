import { Link } from 'react-router-dom';
import CardIllustration from '../components/CardIllustration';
import PageFeatureImage from '../components/PageFeatureImage';
import TopicPageLayout from '../components/TopicPageLayout';
import { assuranceCyberPriceFaqItems } from '../data/faqs';
import { usePageMeta } from '../lib/usePageMeta';

export default function AssuranceCyberPricePage() {
  usePageMeta({
    title: 'Prix assurance cyber PME | Le Cyberassureur',
    description:
      "Prix assurance cyber : comprenez les critères de tarif, évitez les garanties inadaptées et demandez un devis cohérent avec votre exposition réelle.",
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
      directAnswer={{
        question: "Combien coûte une assurance cyber pour une TPE ou une PME ?",
        answer:
          "Le prix d’une assurance cyber varie selon le profil de risque de l’entreprise, pas selon une grille unique. Les assureurs évaluent la taille, le chiffre d’affaires, le secteur, la dépendance aux outils numériques, la sensibilité des données, le niveau de sécurité en place et la profondeur des garanties demandées. Les franchises, plafonds et options (par exemple sur la fraude) influencent aussi le tarif final. Deux entreprises de taille comparable peuvent donc recevoir des propositions différentes. Pour obtenir un montant pertinent, il faut décrire vos usages critiques et vos scénarios de sinistre les plus probables. Un devis bien qualifié évite les contrats trop courts, mais aussi les protections surdimensionnées. Il permet également de comparer la qualité réelle de couverture et pas seulement le coût annuel affiché, sur des bases réellement comparables.",
      }}
      showTrustNote
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
            <h2 className="site-section__title">Pourquoi les prix varient selon les entreprises ?</h2>
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
              <span className="site-section__eyebrow-text">Tableau de tarification</span>
            </div>
              <h2 className="site-section__title">Quels critères analysent les assureurs ?</h2>
          </div>
          <div className="site-card">
            <div className="seo-table-wrapper">
              <table className="seo-table">
                <thead>
                  <tr>
                    <th>Facteur</th>
                    <th>Effet possible sur le tarif</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Taille de l’entreprise et chiffre d’affaires</td>
                    <td>Augmente généralement le niveau de risque assuré et les plafonds à envisager</td>
                  </tr>
                  <tr>
                    <td>Secteur d’activité</td>
                    <td>Certains secteurs très digitalisés ou sensibles peuvent nécessiter une couverture plus large</td>
                  </tr>
                  <tr>
                    <td>Dépendance aux outils numériques</td>
                    <td>Plus l’arrêt d’outils critiques coûte cher, plus le contrat doit être robuste</td>
                  </tr>
                  <tr>
                    <td>Niveau de sécurité (MFA, sauvegardes, accès)</td>
                    <td>Peut faciliter la souscription et améliorer la qualité de proposition</td>
                  </tr>
                  <tr>
                    <td>Franchises et plafonds</td>
                    <td>Franchise haute = coût souvent plus bas, mais reste à charge plus important en sinistre</td>
                  </tr>
                  <tr>
                    <td>Garanties complémentaires (dommages subis, fraude)</td>
                    <td>Étend le périmètre du contrat et peut augmenter le prix selon les options</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section site-section--muted">
        <div className="site-section__container">
          <div className="site-section__header">
            <div className="site-section__eyebrow">
              <span className="site-section__eyebrow-text">Lecture du budget</span>
            </div>
              <h2 className="site-section__title">Plafond, franchise, garanties : quel impact sur le prix ?</h2>
          </div>
          <div className="site-card-grid site-card-grid--two">
            <article className="site-card">
              <h3 className="site-card__title">Franchise supportable</h3>
              <p className="site-card__body">
                Une franchise faible réduit le reste à charge, mais peut augmenter le coût annuel. La bonne valeur dépend de votre trésorerie disponible en cas de crise.
              </p>
            </article>
            <article className="site-card">
              <h3 className="site-card__title">Plafond réaliste</h3>
              <p className="site-card__body">
                Le plafond doit être aligné avec le coût potentiel d’un arrêt, des frais d’experts et des impacts juridiques pour éviter une couverture insuffisante.
              </p>
            </article>
          </div>
            <div className="site-panel site-panel--accent topic-page__panel">
              <p className="site-panel__eyebrow">Sources et repères</p>
            <p className="site-panel__body">
              Pour structurer vos critères, consultez <a className="topic-page__inline-link" href="https://www.anssi.gouv.fr/" target="_blank" rel="noreferrer">ANSSI</a>, <a className="topic-page__inline-link" href="https://www.cnil.fr/" target="_blank" rel="noreferrer">CNIL</a> et <a className="topic-page__inline-link" href="https://www.cybermalveillance.gouv.fr/" target="_blank" rel="noreferrer">Cybermalveillance.gouv.fr</a>.
            </p>
            </div>
          </div>
        </section>

      <section className="site-section">
        <div className="site-section__container">
          <div className="site-section__header">
            <div className="site-section__eyebrow">
              <span className="site-section__eyebrow-text">Profils comparatifs</span>
            </div>
            <h2 className="site-section__title">Exemples de profils TPE/PME et points d’attention</h2>
          </div>
          <div className="site-card">
            <div className="seo-table-wrapper">
              <table className="seo-table">
                <thead>
                  <tr>
                    <th>Profil</th>
                    <th>Points d’attention principaux</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TPE de services très dépendante à la messagerie</td>
                    <td>Compromission email, fraude, interruption d’activité courte mais critique</td>
                  </tr>
                  <tr>
                    <td>PME industrielle avec ERP central</td>
                    <td>Arrêt de production, retards logistiques, coûts de reprise élevés</td>
                  </tr>
                  <tr>
                    <td>PME B2B avec données clients et fournisseurs</td>
                    <td>Responsabilités liées aux données, exigences contractuelles et réputation</td>
                  </tr>
                </tbody>
              </table>
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
            <h2 className="site-section__title">Comment réduire le coût sans réduire la protection essentielle ?</h2>
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
              <Link to="/devis-assurance-cyber" className="site-card__meta">
                Demander un devis cyber
              </Link>
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
          <div className="site-card mt-6">
            <h2 className="site-card__title">Comment obtenir un tarif adapté ?</h2>
            <p className="site-card__body">
              Commencez par un devis précis, comparez les garanties sur vos scénarios clés, puis ajustez franchises et plafonds pour atteindre un équilibre entre budget et niveau de protection.
            </p>
            <p className="site-card__body">
              Pour éviter les écarts d’interprétation, recoupez avec <Link to="/assurance-cyber" className="topic-page__inline-link">les fondamentaux de l’assurance cyber</Link>, <Link to="/assurance-cyber-pme" className="topic-page__inline-link">la page PME</Link> et <Link to="/assurance-cyber-tpe" className="topic-page__inline-link">la page TPE</Link> avant validation finale.
            </p>
          </div>
        </div>
      </section>
    </TopicPageLayout>
  );
}
