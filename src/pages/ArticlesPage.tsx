import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import CardIllustration from '../components/CardIllustration';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { articles } from '../data/articles';

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-400">
              <BookOpen className="h-4 w-4" />
              Articles cyber
            </div>
            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
              Articles, analyses et repères sur la cyberassurance
            </h1>
            <p className="text-lg leading-relaxed text-gray-300">
              Cette page reprend les grands thèmes de la landing et les transforme
              en articles dédiés, avec un contenu concret sur les risques,
              garanties, profils d&apos;entreprises et réflexes de protection.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={`/articles/${article.slug}`}
                aria-label={`Lire l'article complet : ${article.title}`}
                className="group flex h-full flex-col rounded-2xl border border-cyan-500/20 bg-slate-900 p-6 shadow-xl shadow-cyan-500/5 transition-all hover:-translate-y-0.5 hover:border-cyan-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
              >
                <CardIllustration variant={article.variant} />
                <h2 className="mb-3 text-2xl font-bold text-white">{article.title}</h2>
                <p className="mb-6 flex-1 leading-relaxed text-gray-400">{article.excerpt}</p>
                <span className="inline-flex items-center gap-2 font-semibold text-cyan-400 transition-colors group-hover:text-cyan-300">
                  Lire l&apos;article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
