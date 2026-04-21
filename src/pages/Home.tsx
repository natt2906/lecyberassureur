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
    title: 'Assurance cyber entreprise, TPE et PME : devis et accompagnement | Le Cyberassureur',
    description:
      "Le Cyberassureur accompagne les TPE et PME avec une assurance cyber pensée pour absorber les pertes financières, l’arrêt d’activité et les frais de gestion de crise.",
    path: '/',
    keywords:
      'assurance cyber entreprise, assurance cyber TPE, assurance cyber PME, devis assurance cyber, protection cyber entreprise, couverture cyber entreprise',
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
