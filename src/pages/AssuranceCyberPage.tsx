import ContactForm from '../components/ContactForm';
import CardIllustration from '../components/CardIllustration';
import EditorialTrustNote from '../components/EditorialTrustNote';
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
      "Assurance cyber entreprise : comprenez garanties, exclusions et critères de choix pour protéger activité, données sensibles et continuité financière.",
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
        <section className="site-section site-section--muted">
          <div className="site-section__container">
            <article className="site-card">
              <h2 className="site-card__title">Qu’est-ce qu’une assurance cyber pour entreprise ?</h2>
              <p className="site-card__body">
                Une assurance cyber pour entreprise protège la continuité d’activité lorsque la cybersécurité ne suffit plus. Elle intervient après un incident qui bloque la production, perturbe la facturation, expose des données ou déclenche une crise client. Le contrat peut inclure l’interruption d’activité, des frais d’experts techniques et juridiques, et d’autres postes selon les garanties retenues. Elle ne remplace pas un prestataire IT: elle couvre les conséquences financières et opérationnelles du sinistre. Pour choisir un contrat utile, il faut comparer les garanties réellement activables, les exclusions, les plafonds, les franchises et la rapidité de mobilisation. Il faut aussi vérifier la durée d’indemnisation et le niveau d’accompagnement en gestion de crise. L’objectif n’est pas un prix d’appel, mais une protection cohérente avec les risques de votre activité.
              </p>
            </article>
          </div>
        </section>
        <EditorialTrustNote
          updatedAt="8 mai 2026"
          reviewer="Relu par un conseiller spécialisé en assurance cyber entreprise"
        />

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
                <p className="site-panel__body">
                  Sources utiles : <a className="topic-page__inline-link" href="https://www.cybermalveillance.gouv.fr/" target="_blank" rel="noreferrer">Cybermalveillance.gouv.fr</a>, <a className="topic-page__inline-link" href="https://www.anssi.gouv.fr/" target="_blank" rel="noreferrer">ANSSI</a>, <a className="topic-page__inline-link" href="https://www.cnil.fr/" target="_blank" rel="noreferrer">CNIL</a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="site-section">
          <div className="site-section__container">
            <div className="site-section__header">
              <div className="site-section__eyebrow">
                <span className="site-section__eyebrow-text">Ce qui est couvert ou non</span>
              </div>
              <h2 className="site-section__title">Que couvre une assurance cyber ?</h2>
              <p className="site-section__intro">
                Les contrats se ressemblent parfois sur la forme, mais diffèrent dans la façon dont les garanties se déclenchent.
              </p>
            </div>
            <div className="site-card">
              <div className="seo-table-wrapper">
                <table className="seo-table">
                  <thead>
                    <tr>
                      <th>Ce qui est généralement couvert</th>
                      <th>Ce qui est souvent exclu ou limité</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Interruption d’activité liée à un incident cyber déclaré</td>
                      <td>Incidents antérieurs à la souscription ou non déclarés dans les délais</td>
                    </tr>
                    <tr>
                      <td>Frais d’experts techniques et pilotage de crise</td>
                      <td>Absence de mesures minimales de sécurité prévues au contrat</td>
                    </tr>
                    <tr>
                      <td>Accompagnement juridique et obligations liées aux données selon contrat</td>
                      <td>Sanctions, amendes ou postes spécifiques non prévus dans les conditions</td>
                    </tr>
                    <tr>
                      <td>Dommages subis ou fraude selon formule et options</td>
                      <td>Fraude non incluse dans la formule choisie ou plafonds insuffisants</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="site-card mt-6">
              <h2 className="site-card__title">Ce qui est souvent exclu ou limité</h2>
              <p className="site-card__body">
                Les exclusions fréquentes concernent les incidents antérieurs à la souscription, certains manquements graves aux mesures de sécurité prévues, ou des postes non inclus dans la formule choisie. Il faut aussi vérifier les franchises et plafonds qui peuvent limiter la protection économique réelle au moment du sinistre.
              </p>
            </div>
          </div>
        </section>

        <section className="site-section site-section--muted">
          <div className="site-section__container">
            <div className="site-section__header">
              <div className="site-section__eyebrow">
                <span className="site-section__eyebrow-text">Différence avec la RC Pro</span>
              </div>
              <h2 className="site-section__title">Assurance cyber et RC Pro : quelles différences ?</h2>
            </div>
            <div className="site-card-grid site-card-grid--two">
              <article className="site-card">
                <h3 className="site-card__title">RC Pro</h3>
                <p className="site-card__body">
                  La RC Pro protège principalement la responsabilité civile de l’entreprise dans le cadre de son activité professionnelle générale.
                </p>
                <p className="site-card__body">
                  Elle n’est pas conçue pour couvrir l’ensemble des conséquences d’un sinistre numérique complexe: arrêt des systèmes, crise IT, remédiation technique ou pertes d’exploitation cyber.
                </p>
              </article>
              <article className="site-card">
                <h3 className="site-card__title">Assurance cyber</h3>
                <p className="site-card__body">
                  L’assurance cyber cible les événements numériques: compromission de messagerie, rançongiciel, indisponibilité d’outils, exfiltration de données, fraude selon contrat.
                </p>
                <p className="site-card__body">
                  Elle doit être lue comme une protection de continuité d’activité et de résilience financière, avec des garanties, des limites et des conditions spécifiques.
                </p>
              </article>
            </div>
            <div className="site-panel site-panel--accent topic-page__panel">
              <p className="site-panel__eyebrow">Exemples de sinistres</p>
              <p className="site-panel__body">
                Exemple 1: compromission d’un compte email de direction suivie d’une fraude fournisseur. Exemple 2: rançongiciel bloquant l’ERP et la facturation pendant plusieurs jours. Exemple 3: exposition de données clients nécessitant analyse technique, gestion juridique et communication.
              </p>
              <p className="site-panel__body">
                Pour cadrer votre niveau de protection, consultez aussi <a className="topic-page__inline-link" href="/assurance-cyber-prix">le prix d’une assurance cyber</a> et <a className="topic-page__inline-link" href="/devis-assurance-cyber">la page devis</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="site-section">
          <div className="site-section__container">
            <div className="site-section__header">
              <div className="site-section__eyebrow">
                <span className="site-section__eyebrow-text">Adaptation TPE/PME</span>
              </div>
              <h2 className="site-section__title">Comment adapter la couverture à une TPE ou PME ?</h2>
              <p className="site-section__intro">
                Le choix dépend des outils critiques, des données manipulées et du coût d’un arrêt. Une petite structure peut privilégier un socle de continuité, alors qu’une PME plus digitalisée peut étendre le périmètre.
              </p>
            </div>
            <div className="site-card-grid site-card-grid--two">
              <article className="site-card">
                <h3 className="site-card__title">Pour une TPE</h3>
                <p className="site-card__body">
                  Commencer par les garanties essentielles et une franchise supportable pour protéger la trésorerie sur les scénarios les plus fréquents.
                </p>
                <a className="site-card__meta" href="/assurance-cyber-tpe">Voir l’angle TPE</a>
              </article>
              <article className="site-card">
                <h3 className="site-card__title">Pour une PME</h3>
                <p className="site-card__body">
                  Ajouter une lecture fine des dépendances métiers, de l’exposition aux tiers et des obligations contractuelles avec clients et fournisseurs.
                </p>
                <a className="site-card__meta" href="/assurance-cyber-pme">Voir l’angle PME</a>
              </article>
            </div>
          </div>
        </section>

        <section className="site-section site-section--muted">
          <div className="site-section__container">
            <div className="site-section__header">
              <div className="site-section__eyebrow">
                <span className="site-section__eyebrow-text">Étape suivante</span>
              </div>
              <h2 className="site-section__title">Comment demander un devis ?</h2>
              <p className="site-section__intro">
                Préparez activité, taille, outils critiques et garanties attendues pour obtenir un cadrage cohérent avec votre exposition réelle.
              </p>
            </div>
            <div className="site-card-grid site-card-grid--two">
              <article className="site-card">
                <h3 className="site-card__title">Comprendre le budget</h3>
                <a className="site-card__meta" href="/assurance-cyber-prix">Voir les facteurs de prix</a>
              </article>
              <article className="site-card">
                <h3 className="site-card__title">Lancer la demande</h3>
                <a className="site-card__meta" href="/devis-assurance-cyber">Demander un devis assurance cyber</a>
              </article>
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
