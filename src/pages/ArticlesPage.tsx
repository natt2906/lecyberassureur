import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import CardIllustration from '../components/CardIllustration';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { visibleArticles } from '../data/articles';
import { usePageMeta } from '../lib/usePageMeta';

export default function ArticlesPage() {
  usePageMeta({
    title: 'Articles assurance cyber | Le Cyberassureur',
    description:
      "Consultez nos articles sur les pertes financières, l'interruption d'activité, les garanties cyber, la fraude et les profils d'entreprises à protéger.",
    path: '/articles',
  });

  return (
    <div className="page-shell">
      <Header />
      <main className="page-main">
        <section className="site-section">
          <div className="site-section__container">
            <div className="site-section__header">
              <div className="site-section__eyebrow">
                <BookOpen className="site-section__eyebrow-icon" />
                <span className="site-section__eyebrow-text">Articles cyber</span>
              </div>
              <h1 className="site-section__title">
                Articles, analyses et repères sur la cyberassurance
              </h1>
              <p className="site-section__intro">
                Cette page reprend les grands thèmes de la landing et les transforme
                en articles dédiés, avec un contenu concret sur les risques,
                garanties, profils d&apos;entreprises et réflexes de protection.
              </p>
            </div>

            <div className="site-card-grid site-card-grid--three">
              {visibleArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/articles/${article.slug}`}
                  aria-label={`Lire l'article complet : ${article.title}`}
                  className="site-card site-card--interactive group"
                >
                  <CardIllustration variant={article.variant} />
                  <h2 className="site-card__title">{article.title}</h2>
                  <p className="site-card__body">{article.excerpt}</p>
                  <span className="inline-flex items-center gap-2 font-semibold text-cyan-400 transition-colors group-hover:text-cyan-300">
                    Lire l&apos;article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
