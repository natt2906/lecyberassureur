import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CookieConsent from './components/CookieConsent';
import GoogleAdsTag from './components/GoogleAdsTag';
import StickyCTA from './components/StickyCTA';
import Home from './pages/Home';

const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const LegalMentionsPage = lazy(() => import('./pages/LegalMentionsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));
const OffersPage = lazy(() => import('./pages/OffersPage'));
const AssuranceCyberPage = lazy(() => import('./pages/AssuranceCyberPage'));
const AssuranceCyberCoveragePage = lazy(() => import('./pages/AssuranceCyberCoveragePage'));
const AssuranceCyberMandatoryPage = lazy(() => import('./pages/AssuranceCyberMandatoryPage'));
const AssuranceCyberPricePage = lazy(() => import('./pages/AssuranceCyberPricePage'));
const AssuranceCyberPmePage = lazy(() => import('./pages/AssuranceCyberPmePage'));
const AssuranceCyberTpePage = lazy(() => import('./pages/AssuranceCyberTpePage'));
const CyberRisksPage = lazy(() => import('./pages/CyberRisksPage'));
const DevisAssuranceCyberPage = lazy(() => import('./pages/DevisAssuranceCyberPage'));
const RiskTestPage = lazy(() => import('./pages/RiskTestPage'));
const ChatBot = lazy(() => import('./components/ChatBot'));

function App() {
  const [showChatBot, setShowChatBot] = useState(false);

  useEffect(() => {
    const activate = () => setShowChatBot(true);
    const idleId =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? window.requestIdleCallback(activate, { timeout: 2200 })
        : null;
    const timeoutId = window.setTimeout(activate, 2200);

    return () => {
      if (idleId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <GoogleAdsTag />
      <Suspense fallback={<div className="page-shell" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qui-sommes-nous" element={<AboutPage />} />
          <Route path="/offres" element={<OffersPage />} />
          <Route path="/assurance-cyber" element={<AssuranceCyberPage />} />
          <Route path="/assurance-cyber-prix" element={<AssuranceCyberPricePage />} />
          <Route path="/assurance-cyber-obligatoire" element={<AssuranceCyberMandatoryPage />} />
          <Route path="/assurance-cyber-que-couvre" element={<AssuranceCyberCoveragePage />} />
          <Route path="/assurance-cyber-risques" element={<CyberRisksPage />} />
          <Route path="/assurance-cyber-pme" element={<AssuranceCyberPmePage />} />
          <Route path="/assurance-cyber-tpe" element={<AssuranceCyberTpePage />} />
          <Route path="/devis-assurance-cyber" element={<DevisAssuranceCyberPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/merci" element={<ThankYouPage />} />
          <Route path="/politique-confidentialite" element={<PrivacyPage />} />
          <Route path="/conditions-utilisation" element={<TermsPage />} />
          <Route path="/mentions-legales" element={<LegalMentionsPage />} />
          <Route path="/temoignages" element={<TestimonialsPage />} />
          <Route path="/test-risque-cyber" element={<RiskTestPage />} />
        </Routes>
      </Suspense>
      <StickyCTA />
      {showChatBot ? (
        <Suspense fallback={null}>
          <ChatBot />
        </Suspense>
      ) : null}
      <CookieConsent />
    </>
  );
}

export default App;
