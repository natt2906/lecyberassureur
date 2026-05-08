import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getArticleBySlug } from '../data/articles';
import { cardImages } from '../data/cardImages';
import { siteMeta, usePageMeta } from '../lib/usePageMeta';

export default function ArticlePage() {
  const { slug = '' } = useParams();
  const article = getArticleBySlug(slug);

  usePageMeta(
    article
      ? {
          title: `${article.title} | Le Cyberassureur`,
          description: article.excerpt,
          path: `/articles/${article.slug}`,
          image: cardImages[article.variant].src,
          type: 'article',
          structuredData: {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            image: [new URL(cardImages[article.variant].src, siteMeta.siteUrl).toString()],
            mainEntityOfPage: new URL(`/articles/${article.slug}`, siteMeta.siteUrl).toString(),
            author: {
              '@type': 'Organization',
              name: siteMeta.siteName,
            },
            publisher: {
              '@type': 'Organization',
              name: siteMeta.siteName,
              logo: {
                '@type': 'ImageObject',
                url: new URL(siteMeta.logoUrl, siteMeta.siteUrl).toString(),
              },
            },
          },
        }
      : {
          title: 'Article introuvable | Le Cyberassureur',
          description:
            "L'article demandé n'est plus disponible. Retrouvez l'ensemble de nos contenus cyberassurance dans la rubrique articles.",
          path: `/articles/${slug}`,
          robots: 'noindex,follow',
        },
  );

  if (!article) {
    return (
      <div className="page-shell">
        <Header />
        <main className="page-main page-main--spacious">
          <section className="mx-auto max-w-3xl rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-8 text-center shadow-2xl shadow-cyan-500/10 sm:p-12">
            <div className="mb-6 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 p-4 text-cyan-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-white">Article introuvable</h1>
            <p className="mb-8 text-lg text-gray-300">
              Le contenu demandé n&apos;existe pas ou n&apos;est plus disponible.
            </p>
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-cyan-600"
            >
              Retour aux articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const image = cardImages[article.variant];
  const isPmeGuide = article.slug === 'cyberassurance-pour-pme';

  return (
    <div className="page-shell">
      <Header />
      <main className="page-main page-main--spacious">
        <article className="mx-auto max-w-5xl">
          <Link
            to="/articles"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-400 transition-colors hover:text-cyan-300 focus-visible:outline-none"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux articles
          </Link>

          <header className="mb-10">
            <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-400">
              <span>{article.category}</span>
              <span className="h-1 w-1 rounded-full bg-cyan-400" />
              <span>{article.readTime}</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
              {article.title}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-gray-300">
              {article.intro}
            </p>
            <p className="mt-4 text-sm text-gray-400">
              Auteur: Équipe Le Cyberassureur · Relecture: expert assurance cyber · Dernière mise à jour: 8 mai 2026 · Le Cyberassureur, marque spécialisée de Prorisk Assurances
            </p>
          </header>

          <div className="mb-12 overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-900">
            <img
              src={image.src}
              alt={image.alt}
              className="h-full max-h-[30rem] w-full object-cover"
              style={{
                filter: image.filter,
                objectPosition: image.objectPosition ?? 'center',
              }}
            />
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="space-y-10">
              <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-6 sm:p-8">
                <p className="text-lg leading-relaxed text-gray-200">{article.excerpt}</p>
              </div>
              {isPmeGuide ? (
                <section className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-6 sm:p-8">
                  <h2 className="mb-5 text-2xl font-bold text-white">Quelle assurance cyber choisir pour une PME ?</h2>
                  <p className="leading-relaxed text-gray-300">
                    Une PME doit choisir une assurance cyber en fonction de son exposition réelle: dépendance aux outils numériques, coût d’un arrêt d’activité, sensibilité des données et capacité de trésorerie à absorber un incident. Le bon contrat n’est pas seulement celui qui affiche un tarif attractif, mais celui dont les garanties restent activables sur vos scénarios concrets: rançongiciel, compromission de messagerie, fraude ou indisponibilité d’un outil métier. Avant de souscrire, comparez les exclusions, plafonds, franchises et délais d’intervention. Ensuite, validez le niveau de couverture avec un devis détaillé. Cette approche réduit les angles morts et améliore la continuité d’activité si un sinistre survient. Elle facilite aussi les échanges avec clients et partenaires qui demandent des preuves de maîtrise du risque cyber, notamment dans les appels d’offres et contrats-cadres.
                  </p>
                  <h3 className="mb-4 mt-6 text-xl font-bold text-white">Checklist rapide PME avant devis</h3>
                  <ul className="list-disc space-y-2 pl-6 text-gray-300">
                    <li>Identifier les outils critiques (messagerie, ERP, facturation, CRM)</li>
                    <li>Estimer le coût d’un arrêt de 24 à 72 heures</li>
                    <li>Cartographier les données sensibles traitées</li>
                    <li>Vérifier les mesures minimales de sécurité (MFA, sauvegardes)</li>
                    <li>Comparer garanties, franchises et plafonds sur des scénarios concrets</li>
                  </ul>
                  <p className="mt-6 leading-relaxed text-gray-300">
                    Mis à jour le 8 mai 2026. Rédigé par l’équipe Le Cyberassureur. Le Cyberassureur, marque spécialisée de Prorisk Assurances. Pour le cadre société et réglementaire, consultez <Link className="text-cyan-400 hover:text-cyan-300" to="/qui-sommes-nous">qui sommes-nous</Link> et <Link className="text-cyan-400 hover:text-cyan-300" to="/mentions-legales">mentions légales</Link>. Numéro ORIAS: se référer aux mentions légales officielles du cabinet.
                  </p>
                </section>
              ) : null}

              {article.sections.map((section) => (
                <section key={section.title} className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-6 sm:p-8">
                  <h2 className="mb-5 text-2xl font-bold text-white">{section.title}</h2>
                  <div className="space-y-4">
                    {section.body.map((paragraph, index) => (
                      <p key={index} className="leading-relaxed text-gray-300">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <section className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-6 sm:p-8">
                <h2 className="mb-5 text-2xl font-bold text-white">Sources utiles et pages liées</h2>
                <div className="space-y-4">
                  <p className="leading-relaxed text-gray-300">
                    Références externes: <a className="text-cyan-400 hover:text-cyan-300" href="https://www.anssi.gouv.fr/" target="_blank" rel="noreferrer">ANSSI</a>, <a className="text-cyan-400 hover:text-cyan-300" href="https://www.cybermalveillance.gouv.fr/" target="_blank" rel="noreferrer">Cybermalveillance.gouv.fr</a>, <a className="text-cyan-400 hover:text-cyan-300" href="https://www.cnil.fr/" target="_blank" rel="noreferrer">CNIL</a>.
                  </p>
                  <p className="leading-relaxed text-gray-300">
                    Continuer: <Link className="text-cyan-400 hover:text-cyan-300" to="/assurance-cyber">Assurance cyber</Link> · <Link className="text-cyan-400 hover:text-cyan-300" to="/offres">Offres</Link> · <Link className="text-cyan-400 hover:text-cyan-300" to="/devis-assurance-cyber">Demander un devis</Link>.
                  </p>
                  <p className="leading-relaxed text-gray-300">
                    Confiance et cadre réglementaire: <Link className="text-cyan-400 hover:text-cyan-300" to="/qui-sommes-nous">Qui sommes-nous</Link> · <Link className="text-cyan-400 hover:text-cyan-300" to="/mentions-legales">Mentions légales</Link>.
                  </p>
                </div>
              </section>
            </div>

            <aside className="h-fit rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-xl shadow-cyan-500/10">
              <h2 className="mb-5 text-lg font-bold text-white">Points clés</h2>
              <ul className="space-y-4">
                {article.takeaways.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-gray-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
                <p className="mb-4 text-sm leading-relaxed text-gray-200">
                  Besoin d&apos;une lecture rapide de votre exposition cyber et du
                  niveau de protection pertinent pour votre entreprise ?
                </p>
                <Link
                  to="/devis-assurance-cyber"
                  className="inline-flex items-center gap-2 font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  Demander une analyse
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
