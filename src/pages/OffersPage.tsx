import Footer from '../components/Footer';
import Header from '../components/Header';
import OffersSection from '../components/OffersSection';
import { usePageMeta } from '../lib/usePageMeta';

export default function OffersPage() {
  usePageMeta({
    title: "Offres d'assurance cyber pour TPE et PME | Le Cyberassureur",
    description:
      "Comparez nos offres Basic, Silver et Gold pour structurer une protection cyber adaptée à votre activité, votre exposition et vos besoins de couverture.",
    path: '/offres',
  });

  return (
    <div className="page-shell">
      <Header />
      <main className="page-main">
        <OffersSection />
      </main>
      <Footer />
    </div>
  );
}
