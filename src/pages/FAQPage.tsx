import Header from '../components/Header';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import { faqPageItems } from '../data/faqs';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="pt-20">
        <section className="px-4 pb-8 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
              Centre de réponses
            </span>
            <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
              FAQ Cyberassurance
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-300">
              Toutes les réponses essentielles pour comprendre l&apos;assurance cyber,
              les conditions de couverture, les risques concrets et les points à
              vérifier avant de protéger votre entreprise.
            </p>
          </div>
        </section>

        <FAQ
          sectionId="faq-page"
          eyebrow="Questions fréquentes"
          title="Questions et réponses détaillées"
          intro="Cette page reprend les questions clés visibles sur la landing et ajoute des réponses complémentaires sur la couverture, les incidents, la fraude, la déclaration et le choix du bon niveau de protection."
          items={faqPageItems}
        />
      </main>
      <Footer />
    </div>
  );
}
