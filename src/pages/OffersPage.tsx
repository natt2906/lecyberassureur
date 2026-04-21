import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import Header from '../components/Header';
import OffersSection from '../components/OffersSection';
import { offersFaqItems } from '../data/faqs';
import { usePageMeta } from '../lib/usePageMeta';

export default function OffersPage() {
  usePageMeta({
    title: 'Offre assurance cyber : Basic, Silver et Gold | Le Cyberassureur',
    description:
      "Comparez nos offres d'assurance cyber Basic, Silver et Gold pour choisir une formule cohérente avec votre activité, votre exposition au risque et votre besoin de couverture.",
    path: '/offres',
    keywords:
      "offre assurance cyber, offres assurance cyber entreprise, formule assurance cyber, prix assurance cyber entreprise, niveau de couverture cyber",
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: offersFaqItems.map((item) => ({
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
              <span className="site-section__eyebrow-text">Nos offres</span>
            </div>
            <h1 className="site-section__title mt-6">
              Quelle offre d&apos;assurance cyber choisir pour votre entreprise ?
            </h1>
            <p className="site-section__intro mt-6">
              Cette page permet de comparer rapidement trois niveaux de protection cyber.
              Le bon choix dépend de votre exposition au risque, de votre dépendance au
              système d&apos;information, du coût potentiel d&apos;un arrêt et de votre besoin
              de couverture sur les dommages subis ou la fraude.
            </p>
          </div>
        </section>

        <OffersSection showHeading={false} />

        <section className="site-section site-section--muted">
          <div className="site-section__container">
            <div className="site-section__header">
              <div className="site-section__eyebrow">
                <span className="site-section__eyebrow-text">Lire avant de choisir</span>
              </div>
              <h2 className="site-section__title">Une offre d’assurance cyber se choisit selon votre exposition réelle</h2>
              <p className="site-section__intro">
                Le bon niveau ne se résume pas à un prix d&apos;appel. Il dépend surtout de
                la réalité du risque supporté par votre entreprise et du niveau d&apos;impact
                financier que vous pouvez absorber sans déséquilibrer votre activité.
              </p>
            </div>

            <div className="site-card-grid site-card-grid--three">
              <article className="site-card">
                <h3 className="site-card__title">Basic</h3>
                <p className="site-card__body">
                  Pour un premier socle de protection cyber, avec assistance en cas
                  d&apos;incident, gestion de crise et responsabilité liée aux données.
                </p>
              </article>
              <article className="site-card">
                <h3 className="site-card__title">Silver</h3>
                <p className="site-card__body">
                  Pour les entreprises qui veulent aller au-delà du socle et intégrer
                  les dommages subis parmi les scénarios couverts.
                </p>
              </article>
              <article className="site-card">
                <h3 className="site-card__title">Gold</h3>
                <p className="site-card__body">
                  Pour les structures qui souhaitent aussi traiter le sujet de la fraude
                  en plus des dommages subis et du cœur de protection cyber.
                </p>
              </article>
            </div>

            <div className="site-panel site-panel--accent site-panel--center topic-page__panel">
              <p className="site-panel__eyebrow">À vérifier avant toute demande</p>
              <h2 className="site-panel__title">Une offre d’assurance cyber doit rester cohérente avec vos cyber-risques</h2>
              <p className="site-panel__body">
                Plus votre entreprise dépend de ses outils numériques, de ses emails,
                de ses données clients ou de ses prestataires, plus l&apos;écart entre un
                incident et son coût réel peut être important. Pour comprendre ce
                qui doit guider le choix d&apos;une offre, consulte aussi nos pages dédiées à
                {' '}
                <Link className="topic-page__inline-link" to="/assurance-cyber">l&apos;assurance cyber</Link>
                {' '}et aux
                <Link className="topic-page__inline-link" to="/assurance-cyber-risques">cyber-risques</Link>.
              </p>
            </div>
          </div>
        </section>

        <FAQ
          sectionId="offers-faq"
          eyebrow="Questions fréquentes"
          title="Questions clés avant de choisir une offre d’assurance cyber"
          intro="Cette FAQ complète la page offres avec les questions les plus utiles pour comparer les niveaux de protection et comprendre ce qui influence réellement le choix d’une formule."
          items={offersFaqItems}
        />
      </main>
      <Footer />
    </div>
  );
}
