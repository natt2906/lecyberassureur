import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import ProblemSection from './components/ProblemSection';
import CoverageSection from './components/CoverageSection';
import WhoForSection from './components/WhoForSection';
import WhySpecialistSection from './components/WhySpecialistSection';
import ContactForm from './components/ContactForm';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <Hero />
      <ContactForm />
      <TrustBar />
      <ProblemSection />
      <CoverageSection />
      <WhoForSection />
      <WhySpecialistSection />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyCTA />
    </div>
  );
}

export default App;
