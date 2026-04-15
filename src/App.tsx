import { Route, Routes } from 'react-router-dom';
import StickyCTA from './components/StickyCTA';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import ArticlesPage from './pages/ArticlesPage';
import FAQPage from './pages/FAQPage';
import LegalMentionsPage from './pages/LegalMentionsPage';
import PrivacyPage from './pages/PrivacyPage';
import ThankYouPage from './pages/ThankYouPage';
import TermsPage from './pages/TermsPage';
import TestimonialsPage from './pages/TestimonialsPage';
import OffersPage from './pages/OffersPage';

function App() {
  return (
    <>
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
      <StickyCTA />
    </>
  );
}

export default App;
