import Footer from '../components/Footer';
import Header from '../components/Header';
import OffersSection from '../components/OffersSection';

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="pt-20">
        <OffersSection />
      </main>
      <Footer />
    </div>
  );
}
