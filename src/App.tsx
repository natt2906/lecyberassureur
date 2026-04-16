import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import CookieConsent from './components/CookieConsent';
import GoogleAdsTag from './components/GoogleAdsTag';
import StickyCTA from './components/StickyCTA';
import Home from './pages/Home';

const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const LegalMentionsPage = lazy(() => import('./pages/LegalMentionsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));
const OffersPage = lazy(() => import('./pages/OffersPage'));

function App() {
  return (
    <>
      <GoogleAdsTag />
      <Suspense fallback={<div className="page-shell" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offres" element={<OffersPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/merci" element={<ThankYouPage />} />
          <Route path="/politique-confidentialite" element={<PrivacyPage />} />
          <Route path="/conditions-utilisation" element={<TermsPage />} />
          <Route path="/mentions-legales" element={<LegalMentionsPage />} />
          <Route path="/temoignages" element={<TestimonialsPage />} />
        </Routes>
      </Suspense>
      <StickyCTA />
      <CookieConsent />
    </>
  );
}

export default App;
