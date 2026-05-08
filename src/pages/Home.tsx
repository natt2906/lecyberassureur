import { Suspense, lazy } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
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
          <article className="site-card">
            <h2 className="site-card__title">Assurance cyber TPE/PME : définition, garanties et limites à connaître</h2>
            <p className="site-card__body">
              Une assurance cyber est un contrat qui aide l’entreprise à absorber les conséquences économiques d’un incident numérique: interruption d’activité, frais d’experts techniques, dépenses juridiques, atteinte aux données, et autres postes selon la formule retenue. Pour une TPE ou une PME, l’objectif principal est de préserver la continuité d’activité et la trésorerie quand les outils critiques sont indisponibles.
            </p>
            <p className="site-card__body">
              Les bénéfices concrets sont opérationnels: accès à des interlocuteurs mobilisables rapidement, réduction du temps de crise, meilleure capacité à reprendre l’activité, et visibilité financière plus claire sur les scénarios les plus lourds. Les garanties varient selon les contrats: il faut lire précisément les plafonds, franchises, conditions de déclenchement et exclusions.
            </p>
            <p className="site-card__body">
              Le prix dépend de critères structurants: activité, chiffre d’affaires, dépendance aux systèmes d’information, données traitées, mesures de sécurité minimales (MFA, sauvegardes, gestion des accès), et niveau de protection souhaité. Le bon réflexe est de comparer les offres sur le périmètre réel, puis de demander un devis aligné avec l’exposition de l’entreprise.
            </p>
            <p className="site-card__body">
              Méthode de cadrage recommandée: 1) identifier vos scénarios de sinistre critiques, 2) estimer l’impact financier d’un arrêt, 3) vérifier les garanties clés et exclusions, 4) arbitrer entre budget et profondeur de couverture, 5) formaliser un devis. Pour continuer, consultez <a className="topic-page__inline-link" href="/assurance-cyber">la vue d’ensemble assurance cyber</a>, <a className="topic-page__inline-link" href="/assurance-cyber-que-couvre">ce que couvre le contrat</a>, <a className="topic-page__inline-link" href="/assurance-cyber-prix">les critères de prix</a> et <a className="topic-page__inline-link" href="/offres">la comparaison des offres</a>.
            </p>
            <p className="site-card__body">
              Références publiques: <a className="topic-page__inline-link" href="https://www.anssi.gouv.fr/" target="_blank" rel="noreferrer">ANSSI</a>, <a className="topic-page__inline-link" href="https://www.cybermalveillance.gouv.fr/" target="_blank" rel="noreferrer">Cybermalveillance.gouv.fr</a>, <a className="topic-page__inline-link" href="https://www.cnil.fr/" target="_blank" rel="noreferrer">CNIL</a>.
            </p>
          </article>
        </div>
      </section>
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
