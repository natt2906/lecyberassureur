import { Suspense, lazy } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import ContactForm from '../components/ContactForm';
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
    title: 'Assurance cyber pour TPE et PME | Le Cyberassureur',
    description:
      "Le Cyberassureur aide les TPE et PME à protéger leur trésorerie face aux cyberattaques avec une couverture dédiée, une analyse de risque et un accompagnement expert.",
    path: '/',
    keywords:
      'assurance cyber, cyberassurance entreprise, assurance cyber PME, assurance cyber TPE, risque cyber entreprise, protection financière cyber',
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
    ],
  });

  return (
    <div className="page-shell">
      <Header />
      <Hero />
      <ContactForm />
      <TrustBar />
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
