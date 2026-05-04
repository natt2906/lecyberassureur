import ContactForm from '../components/ContactForm';
import CardIllustration from '../components/CardIllustration';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PageFeatureImage from '../components/PageFeatureImage';
import { cyberRisksFaqItems } from '../data/faqs';
import { usePageMeta } from '../lib/usePageMeta';

export default function CyberRisksPage() {
  usePageMeta({
    title: 'Risques cyber entreprise | Le Cyberassureur',
    description:
      "Identifiez les cyber-risques les plus coûteux pour une entreprise, les impacts concrets sur l'activité et la manière dont une couverture adaptée peut limiter la perte.",
    path: '/assurance-cyber-risques',
    keywords:
      'cyber risques entreprise, risques cyber PME, cout cyberattaque entreprise, exposition cyber entreprise, couverture cyber risques',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: cyberRisksFaqItems.map((item) => ({
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
              <span className="site-section__eyebrow-text">Cyber-risques</span>
            </div>
            <h1 className="site-section__title mt-6">
              Quels cyber-risques coûtent vraiment à une entreprise ?
            </h1>
            <p className="site-section__intro mt-6">
              Le sujet n’est pas seulement l’attaque elle-même. Le vrai risque vient de
              ce qu’elle bloque, détruit, expose ou détourne : arrêt d’activité, remise
              en état, dommages subis, fraude ou responsabilités liées aux données.
            </p>
          </div>
        </section>

        <PageFeatureImage
          src="/card-images/interruption-activite.jpg"
          alt="Equipe dirigeante analysant les impacts d'un incident cyber sur l'activite"
        />

        <section className="site-section site-section--muted">
          <div className="site-section__container">
            <div className="site-section__header">
              <div className="site-section__eyebrow">
                <span className="site-section__eyebrow-text">L’impact réel</span>
              </div>
              <h2 className="site-section__title">Les cyber-risques deviennent coûteux dès qu’ils empêchent l’entreprise de travailler normalement</h2>
              <p className="site-section__intro">
                Une entreprise peut être touchée même sans e-commerce. Quelques outils clés,
                des données clients, des emails ou des accès distants suffisent à créer une
                vraie exposition économique.
              </p>
            </div>

            <div className="site-card-grid site-card-grid--three">
              <article className="site-card">
                <CardIllustration variant="downtime-impact" />
                <h2 className="site-card__title">Rançongiciel</h2>
                <p className="site-card__body">
                  Le problème n’est pas seulement le chiffrement. Le coût se construit
                  surtout autour de l’arrêt d’activité, du temps perdu et de la remise en état.
                </p>
              </article>
              <article className="site-card">
                <CardIllustration variant="finance-impact" />
                <h2 className="site-card__title">Compromission de messagerie</h2>
                <p className="site-card__body">
                  Une messagerie compromise peut ouvrir la porte à la fraude, à
                  l’usurpation, à la fuite d’informations et à des erreurs de paiement.
                </p>
              </article>
              <article className="site-card">
                <CardIllustration variant="third-party" />
                <h2 className="site-card__title">Données et tiers</h2>
                <p className="site-card__body">
                  Dès qu’un incident touche des données clients, fournisseurs ou partenaires,
                  l’exposition dépasse le cadre technique et devient aussi juridique et financier.
                </p>
              </article>
            </div>

            <div className="site-panel site-panel--accent topic-page__panel">
              <p className="site-panel__eyebrow">Ce qu’il faut arbitrer</p>
              <h2 className="site-panel__title">Une assurance cyber-risques utile doit couvrir les conséquences qui déséquilibrent vraiment l’entreprise</h2>
              <div className="topic-page__stack">
                <p className="site-panel__body">
                  Selon le profil de l’entreprise, le risque principal ne sera pas le même.
                  Certaines structures craignent surtout l’arrêt, d’autres les dommages subis,
                  d’autres encore la fraude. C’est pour cela qu’un niveau d’offre doit rester
                  lié à l’exposition réelle. Si vous vous demandez si cette couverture
                  devient vraiment nécessaire dans votre cas, lisez aussi notre page
                  {' '}
                  <a className="topic-page__inline-link" href="/assurance-cyber-obligatoire">
                    assurance cyber obligatoire ou non
                  </a>
                  . Pour cadrer le budget, consultez ensuite la page sur le
                  <a className="topic-page__inline-link" href="/assurance-cyber-prix">prix d’une assurance cyber</a>.
                </p>
                <ul className="topic-page__list">
                  <li>Temps d’arrêt acceptable avant impact de trésorerie</li>
                  <li>Dépendance aux paiements, aux emails et aux échanges clients</li>
                  <li>Part du chiffre d’affaires portée par quelques outils critiques</li>
                  <li>Niveau de sensibilité des données exploitées par l’entreprise</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="site-section">
          <div className="site-section__container">
            <div className="site-section__header">
              <div className="site-section__eyebrow">
                <span className="site-section__eyebrow-text">Les postes qui font vraiment mal</span>
              </div>
              <h2 className="site-section__title">Quand on parle de cyber-risques, il faut distinguer les impacts qui déséquilibrent réellement l’entreprise</h2>
              <p className="site-section__intro">
                Les entreprises se focalisent souvent sur l’attaque. Pourtant, ce qui coûte
                le plus cher est souvent l’effet de chaîne sur l’exploitation, la trésorerie,
                la conformité et la relation client.
              </p>
            </div>

            <div className="site-card-grid site-card-grid--two">
              <article className="site-card">
                <CardIllustration variant="finance-impact" />
                <h3 className="site-card__title">Pertes financières immédiates</h3>
                <p className="site-card__body">
                  Prestataires d’urgence, temps perdu, paiements bloqués, retard
                  de facturation et décisions prises dans l’urgence créent rapidement
                  une tension directe sur la trésorerie.
                </p>
              </article>
              <article className="site-card">
                <CardIllustration variant="downtime-impact" />
                <h3 className="site-card__title">Interruption d’activité</h3>
                <p className="site-card__body">
                  Quand les outils tombent, l’entreprise continue rarement “comme avant”.
                  Même un fonctionnement dégradé pendant plusieurs jours produit une perte concrète.
                </p>
              </article>
              <article className="site-card">
                <CardIllustration variant="legal-impact" />
                <h3 className="site-card__title">Exposition juridique et réglementaire</h3>
                <p className="site-card__body">
                  Une fuite ou une compromission de données peut créer des obligations
                  de notification, des frais de conseil et une charge de conformité lourde.
                </p>
              </article>
              <article className="site-card">
                <CardIllustration variant="reputation-impact" />
                <h3 className="site-card__title">Atteinte à la réputation</h3>
                <p className="site-card__body">
                  Une crise mal pilotée fragilise la confiance des clients et partenaires.
                  Le sujet devient alors commercial autant que technique.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="site-section site-section--muted">
          <div className="site-section__container">
            <div className="site-section__header">
              <div className="site-section__eyebrow">
                <span className="site-section__eyebrow-text">Le bon prolongement</span>
              </div>
              <h2 className="site-section__title">Une fois les risques identifiés, il faut choisir le bon angle de protection</h2>
              <p className="site-section__intro">
                La bonne page suivante dépend surtout de votre taille d’entreprise et du
                niveau de couverture recherché.
              </p>
            </div>

            <div className="site-card-grid site-card-grid--three">
              <article className="site-card">
                <h3 className="site-card__title">Pour une TPE ou une startup</h3>
                <p className="site-card__body">
                  Les petites structures doivent surtout protéger leur capacité à continuer
                  à travailler malgré un incident ou une fraude.
                </p>
                <a href="/assurance-cyber-tpe" className="site-card__meta">
                  Voir l’assurance cyber TPE
                </a>
              </article>
              <article className="site-card">
                <h3 className="site-card__title">Pour une PME</h3>
                <p className="site-card__body">
                  Une PME doit arbitrer entre interruption d’activité, données, tiers,
                  gestion de crise et niveau de protection financière.
                </p>
                <a href="/assurance-cyber-pme" className="site-card__meta">
                  Voir l’assurance cyber PME
                </a>
              </article>
              <article className="site-card">
                <h3 className="site-card__title">Pour cadrer le devis</h3>
                <p className="site-card__body">
                  Une demande bien renseignée permet de qualifier plus vite l’exposition
                  et d’orienter l’entreprise vers la bonne couverture.
                </p>
                <a href="/devis-assurance-cyber" className="site-card__meta">
                  Demander un devis assurance cyber
                </a>
              </article>
            </div>
          </div>
        </section>

        <FAQ
          sectionId="cyber-risks-faq"
          eyebrow="Questions fréquentes"
          title="Questions fréquentes sur les cyber-risques"
          intro="Cette page détaille les questions les plus importantes pour comprendre ce qui crée réellement le risque cyber pour une entreprise et ce qui doit guider le niveau de couverture."
          items={cyberRisksFaqItems}
        />

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
