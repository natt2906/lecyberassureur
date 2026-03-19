import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LegalMentionsPage from './pages/LegalMentionsPage';
import PrivacyPage from './pages/PrivacyPage';
import ThankYouPage from './pages/ThankYouPage';
import TermsPage from './pages/TermsPage';
import TestimonialsPage from './pages/TestimonialsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/merci" element={<ThankYouPage />} />
      <Route path="/politique-confidentialite" element={<PrivacyPage />} />
      <Route path="/conditions-utilisation" element={<TermsPage />} />
      <Route path="/mentions-legales" element={<LegalMentionsPage />} />
      <Route path="/temoignages" element={<TestimonialsPage />} />
    </Routes>
  );
}

export default App;
