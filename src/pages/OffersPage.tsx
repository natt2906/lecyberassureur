import Footer from '../components/Footer';
import Header from '../components/Header';
import OffersSection from '../components/OffersSection';

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="pt-20">
        <section className="px-4 pb-8 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
              Nos offres
            </span>
            <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
              Découvrez nos formules Basic, Silver et Gold
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-300">
              Une lecture simple de nos niveaux de protection cyber, avec des prix
              d&apos;appel indicatifs pour structurer votre première approche.
            </p>
          </div>
        </section>
        <OffersSection />
      </main>
      <Footer />
    </div>
  );
}
