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
const FAQ = lazy(() => import('../components/FAQ'));
const FinalCTA = lazy(() => import('../components/FinalCTA'));
const Footer = lazy(() => import('../components/Footer'));

export default function Home() {
  usePageMeta({
    title: 'Assurance cyber pour entreprise, TPE et PME | Le Cyberassureur',
    description:
      "Le Cyberassureur propose une assurance cyber pour entreprise avec analyse du risque, couverture des pertes financières, dommages subis, fraude et accompagnement expert pour TPE et PME.",
    path: '/',
    keywords:
      "assurance cyber, assurance cyber entreprise, offre assurance cyber, assurance cyber risques, assurance cyber PME, assurance cyber TPE, risque cyber entreprise, protection financière cyber",
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Le Cyberassureur',
        url: 'https://lecyberassureur.fr',
        logo: 'https://lecyberassureur.fr/brand-assets/logo-cropped-384.png',
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
      <PartnersSection />
      <Suspense fallback={null}>
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
