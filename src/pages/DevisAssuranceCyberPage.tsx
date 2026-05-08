import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import EditorialTrustNote from '../components/EditorialTrustNote';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PageFeatureImage from '../components/PageFeatureImage';
import { devisAssuranceCyberFaqItems } from '../data/faqs';
import { usePageMeta } from '../lib/usePageMeta';

export default function DevisAssuranceCyberPage() {
  usePageMeta({
    title: 'Devis assurance cyber rapide | Le Cyberassureur',
    description:
      "Devis assurance cyber : décrivez votre activité et vos risques pour obtenir rapidement un cadrage clair, utile et cohérent avec votre niveau d’exposition.",
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
        <section className="site-section site-section--muted">
          <div className="site-section__container">
            <article className="site-card">
              <h2 className="site-card__title">Comment obtenir un devis d’assurance cyber ?</h2>
              <p className="site-card__body">
                Obtenir un devis assurance cyber utile consiste à qualifier votre risque réel avant de parler prix. Les informations clés sont votre activité, la taille de l’entreprise, vos outils critiques, les données traitées et les garanties recherchées. L’objectif n’est pas un montant standard mais une proposition cohérente avec votre exposition opérationnelle et financière. Une bonne demande de devis permet d’éviter deux erreurs fréquentes: sous-couverture (angles morts au sinistre) et sur-couverture (coût inutile). Le devis doit ensuite être lu avec attention: garanties activables, exclusions, plafonds, franchises, délais et périmètre d’intervention. Vérifiez aussi les conditions de déclaration et la disponibilité des experts en cas d’incident, ainsi que le support prévu lors de la reprise. Cette méthode vous aide à comparer des offres sur des bases concrètes et à choisir un contrat réellement exploitable.
              </p>
            </article>
          </div>
        </section>
        <EditorialTrustNote
          updatedAt="8 mai 2026"
          reviewer="Relu par un conseiller spécialisé en souscription cyber"
        />

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
              <h2 className="site-section__title">Quelles informations sont nécessaires ?</h2>
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

        <section className="site-section">
          <div className="site-section__container">
            <div className="site-section__header">
              <div className="site-section__eyebrow">
                <span className="site-section__eyebrow-text">Tableau pratique</span>
              </div>
              <h2 className="site-section__title">Informations utiles pour préparer un devis</h2>
            </div>
            <div className="site-card">
              <div className="seo-table-wrapper">
                <table className="seo-table">
                  <thead>
                    <tr>
                      <th>Information à préparer</th>
                      <th>Pourquoi c’est important</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Activité, effectif, chiffre d’affaires</td>
                      <td>Permet de calibrer le niveau d’exposition et les plafonds pertinents</td>
                    </tr>
                    <tr>
                      <td>Outils critiques (messagerie, ERP, caisse, cloud)</td>
                      <td>Aide à estimer l’impact d’un arrêt d’activité et la priorité des garanties</td>
                    </tr>
                    <tr>
                      <td>Type de données traitées (clients, RH, finance)</td>
                      <td>Oriente les besoins sur les volets juridiques et responsabilités</td>
                    </tr>
                    <tr>
                      <td>Mesures de sécurité en place (MFA, sauvegardes)</td>
                      <td>Influence l’analyse du risque, les conditions d’acceptation et parfois le tarif</td>
                    </tr>
                    <tr>
                      <td>Scénarios redoutés (fraude, rançongiciel, indisponibilité)</td>
                      <td>Permet de comparer les garanties sur des cas concrets</td>
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
                <span className="site-section__eyebrow-text">Étapes du devis</span>
              </div>
              <h2 className="site-section__title">Que se passe-t-il après la demande ?</h2>
              <p className="site-section__intro">
                Le délai dépend de la qualité des informations transmises. Plus votre demande est précise, plus l’analyse est rapide.
              </p>
            </div>
            <div className="site-card-grid site-card-grid--three">
              <article className="site-card">
                <h3 className="site-card__title">1. Qualification initiale</h3>
                <p className="site-card__body">
                  Vérification des informations essentielles et du périmètre d’activité pour cadrer les besoins prioritaires.
                </p>
              </article>
              <article className="site-card">
                <h3 className="site-card__title">2. Analyse des garanties</h3>
                <p className="site-card__body">
                  Comparaison des garanties, exclusions, plafonds et franchises selon vos scénarios de sinistre probables.
                </p>
              </article>
              <article className="site-card">
                <h3 className="site-card__title">3. Restitution et arbitrage</h3>
                <p className="site-card__body">
                  Présentation d’un cadrage clair pour choisir une formule cohérente, puis passage à la souscription si validé.
                </p>
              </article>
            </div>
            <div className="site-panel site-panel--accent topic-page__panel">
              <p className="site-panel__eyebrow">Sources utiles</p>
              <p className="site-panel__body">
                Pour préparer la demande, vous pouvez aussi consulter <a className="topic-page__inline-link" href="https://www.cybermalveillance.gouv.fr/" target="_blank" rel="noreferrer">Cybermalveillance.gouv.fr</a>, <a className="topic-page__inline-link" href="https://www.cnil.fr/" target="_blank" rel="noreferrer">CNIL</a> et <a className="topic-page__inline-link" href="https://www.francenum.gouv.fr/" target="_blank" rel="noreferrer">France Num</a>.
              </p>
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
                <h2 className="site-card__title">Pourquoi comparer les garanties et franchises ?</h2>
                <p className="site-card__body">
                  Avant ou après votre demande, vous pouvez comparer les différences entre
                  Basic, Silver et Gold pour mieux positionner votre besoin.
                </p>
                <Link to="/offres" className="site-card__meta">
                  Voir les offres d’assurance cyber
                </Link>
              </article>
              <article className="site-card">
                <h2 className="site-card__title">Quels critères influencent le prix ?</h2>
                <p className="site-card__body">
                  Le devis dépend de votre exposition réelle. Si vous voulez comprendre
                  ce qui fait varier le prix, la page dédiée vous donne le bon cadrage.
                </p>
                <Link to="/assurance-cyber-prix" className="site-card__meta">
                  Comprendre le prix d’une assurance cyber
                </Link>
              </article>
            </div>
            <div className="site-card mt-6">
              <h2 className="site-card__title">Quand demander un devis ?</h2>
              <p className="site-card__body">
                Le meilleur moment est avant un changement majeur: croissance, nouvel outil métier, externalisation d’un service critique, ou nouvelle exigence contractuelle client. Demander tôt permet d’ajuster la couverture avant qu’un incident ne survienne.
              </p>
              <p className="site-card__body">
                Pour préparer votre arbitrage, vous pouvez relier cette étape avec <Link to="/assurance-cyber" className="topic-page__inline-link">la page assurance cyber entreprise</Link>, <Link to="/assurance-cyber-pme" className="topic-page__inline-link">les besoins PME</Link> et <Link to="/assurance-cyber-tpe" className="topic-page__inline-link">les priorités TPE</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
