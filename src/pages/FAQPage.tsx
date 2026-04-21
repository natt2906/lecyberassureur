import Header from '../components/Header';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import { faqPageItems } from '../data/faqs';
import { usePageMeta } from '../lib/usePageMeta';

export default function FAQPage() {
  usePageMeta({
    title: 'FAQ assurance cyber : questions fréquentes | Le Cyberassureur',
    description:
      "Retrouvez les réponses clés sur l'assurance cyber, les garanties, les pertes d'exploitation, la fraude et les conditions de couverture pour les TPE et PME.",
    path: '/faq',
    robots: 'noindex,follow',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqPageItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  });

  return (
    <div className="page-shell">
      <Header />
      <main className="page-main">
        <section className="page-header">
          <div className="page-header__inner">
            <div className="site-section__eyebrow">
              <span className="site-section__eyebrow-text">Centre de réponses</span>
            </div>
            <h1 className="site-section__title mt-6">FAQ Cyberassurance</h1>
            <p className="site-section__intro mt-6">
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
