import { Suspense, lazy } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import EditorialTrustNote from '../components/EditorialTrustNote';
import PartnersSection from '../components/PartnersSection';
import ContactForm from '../components/ContactForm';
import { homeFaqItems } from '../data/faqs';
import { usePageMeta } from '../lib/usePageMeta';

const ProblemSection = lazy(() => import('../components/ProblemSection'));
const CoverageSection = lazy(() => import('../components/CoverageSection'));
const WhoForSection = lazy(() => import('../components/WhoForSection'));
const WhySpecialistSection = lazy(() => import('../components/WhySpecialistSection'));
const SeoEntryPointsSection = lazy(() => import('../components/SeoEntryPointsSection'));
const FAQ = lazy(() => import('../components/FAQ'));
const FinalCTA = lazy(() => import('../components/FinalCTA'));
const Footer = lazy(() => import('../components/Footer'));

export default function Home() {
  usePageMeta({
    title: 'Assurance cyber TPE PME dès 29,99 € par mois | Le Cyberassureur',
    description:
      "Assurance cyber TPE/PME : protégez activité, données et trésorerie avec des garanties lisibles, un accompagnement expert et un devis adapté à votre risque.",
    path: '/',
    keywords:
      'assurance cyber entreprise, assurance cyber TPE, assurance cyber PME, devis assurance cyber, protection cyber entreprise, couverture cyber entreprise',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Le Cyberassureur',
        legalName: 'Le Cyberassureur - marque spécialisée de Prorisk Assurances',
        url: 'https://lecyberassureur.fr',
        logo: 'https://lecyberassureur.fr/brand-assets/logo-blue-hq.png',
        sameAs: [],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+33-1-88-83-08-60',
          contactType: 'customer support',
          areaServed: 'FR',
          availableLanguage: ['fr'],
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Le Cyberassureur',
        url: 'https://lecyberassureur.fr',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Assurance cyber pour entreprise',
        serviceType: 'Assurance cyber',
        provider: {
          '@type': 'Organization',
          name: 'Le Cyberassureur',
          url: 'https://lecyberassureur.fr',
        },
        areaServed: 'FR',
        audience: {
          '@type': 'BusinessAudience',
          audienceType: 'TPE, PME et entreprises',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: homeFaqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  });

  return (
    <div className="page-shell">
      <Header />
      <Hero />
      <ContactForm />
      <TrustBar />
      <section className="site-section">
        <div className="site-section__container">
          <div className="site-card-grid site-card-grid--three">
            <article className="site-card">
              <h2 className="site-card__title">Pourquoi assurer une TPE ou PME contre le risque cyber ?</h2>
              <p className="site-card__body">
                Une TPE ou une PME dépend souvent d’un nombre limité d’outils: messagerie, facturation, ERP, caisse, CRM, stockage cloud. Quand un incident bloque ces briques, l’impact n’est pas seulement technique: l’activité ralentit, les encaissements se décalent et la relation client se tend. L’assurance cyber aide à absorber ces conséquences financières et à mobiliser rapidement les bons experts. L’objectif est de réduire le temps de crise et d’éviter qu’un incident ponctuel se transforme en fragilité durable. Cette logique est particulièrement utile pour les structures qui n’ont pas d’équipe cyber interne dédiée. En pratique, la couverture devient un outil de continuité: elle permet de financer l’assistance technique, l’appui juridique et la coordination de crise sans attendre. Pour aller plus loin sur les scénarios concrets, consultez <a className="topic-page__inline-link" href="/assurance-cyber-risques">les risques cyber en entreprise</a> et <a className="topic-page__inline-link" href="/articles/cyberassurance-pour-pme">notre guide cyberassurance pour PME</a>.
              </p>
            </article>
            <article className="site-card">
              <h2 className="site-card__title">Ce que couvre une assurance cyber</h2>
              <p className="site-card__body">
                Une assurance cyber peut couvrir l’interruption d’activité, les frais d’expertise technique, des coûts juridiques liés aux données, et d’autres postes selon le niveau de formule choisi. Les contrats varient: il faut comparer les garanties activables, les exclusions, les plafonds et les franchises. Le point clé est la cohérence entre la couverture et vos scénarios de risque concrets: rançongiciel, compromission de messagerie, indisponibilité d’un outil critique, fraude selon options. Certaines entreprises donnent la priorité à la reprise opérationnelle rapide, d’autres à la protection financière face aux incidents longs. Pour cadrer précisément le périmètre, consultez <a className="topic-page__inline-link" href="/assurance-cyber">la page assurance cyber</a> puis <a className="topic-page__inline-link" href="/assurance-cyber-que-couvre">les garanties détaillées</a>. Vous pouvez aussi comparer les profils <a className="topic-page__inline-link" href="/assurance-cyber-tpe">TPE</a> et <a className="topic-page__inline-link" href="/assurance-cyber-pme">PME</a> avant de sélectionner un niveau de couverture.
              </p>
            </article>
            <article className="site-card">
              <h2 className="site-card__title">Comment obtenir un devis adapté ?</h2>
              <p className="site-card__body">
                Un devis utile repose sur des informations simples: activité, taille, outils critiques, données traitées, mesures de sécurité, garanties attendues. Cette préparation permet de comparer des offres sur des bases concrètes et d’éviter les contrats trop courts ou surdimensionnés. Un bon devis ne se limite pas à un montant mensuel: il précise les conditions de déclenchement, le niveau de franchise, les plafonds et les options complémentaires. Pour estimer le budget, consultez <a className="topic-page__inline-link" href="/assurance-cyber-prix">les critères de prix</a>, puis lancez une demande sur <a className="topic-page__inline-link" href="/devis-assurance-cyber">la page devis assurance cyber</a>. Vous pouvez ensuite affiner le niveau de protection via <a className="topic-page__inline-link" href="/offres">les offres</a> et vérifier les différences avec <a className="topic-page__inline-link" href="/assurance-cyber-obligatoire">les obligations éventuelles selon votre contexte contractuel</a>.
              </p>
            </article>
          </div>
          <div className="site-panel site-panel--accent topic-page__panel">
            <p className="site-panel__eyebrow">Sources fiables</p>
            <p className="site-panel__body">
              Références utiles: <a className="topic-page__inline-link" href="https://www.ssi.gouv.fr/" target="_blank" rel="noreferrer">ANSSI</a>, <a className="topic-page__inline-link" href="https://www.cybermalveillance.gouv.fr/" target="_blank" rel="noreferrer">Cybermalveillance.gouv.fr</a>, <a className="topic-page__inline-link" href="https://www.cnil.fr/" target="_blank" rel="noreferrer">CNIL</a>, <a className="topic-page__inline-link" href="https://www.francenum.gouv.fr/" target="_blank" rel="noreferrer">France Num</a>.
            </p>
          </div>
        </div>
      </section>
      <EditorialTrustNote
        updatedAt="8 mai 2026"
        reviewer="Rédigé par l’équipe Le Cyberassureur"
      />
      <PartnersSection />
      <Suspense fallback={null}>
        <SeoEntryPointsSection />
        <ProblemSection />
        <CoverageSection />
        <WhoForSection />
        <WhySpecialistSection />
        <FAQ />
        <FinalCTA />
        <Footer />
      </Suspense>
    </div>
  );
}
