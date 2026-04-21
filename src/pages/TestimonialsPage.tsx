import Header from '../components/Header';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { usePageMeta } from '../lib/usePageMeta';

export default function TestimonialsPage() {
  usePageMeta({
    title: 'Témoignages clients cyberassurance | Le Cyberassureur',
    description:
      "Découvrez des retours d'expérience concrets sur la gestion d'incidents, l'absorption des pertes financières et l'accompagnement après cyberattaque.",
    path: '/temoignages',
    robots: 'noindex,follow',
  });

  return (
    <div className="page-shell">
      <Header />
      <main className="page-main">
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
