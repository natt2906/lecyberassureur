import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-4xl rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 text-center shadow-2xl shadow-cyan-500/10 sm:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10">
            <CheckCircle className="h-10 w-10 text-cyan-400" />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Merci, votre demande a bien ete transmise.
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
            Votre demande d'analyse de risque cyber est en cours de traitement. Un expert revient vers vous sous 24 heures ouvrees.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-8 py-4 text-lg font-bold text-slate-950 transition-all hover:bg-cyan-600"
            >
              Retour a l'accueil
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/temoignages"
              className="inline-flex items-center justify-center rounded-lg border border-cyan-400/40 px-8 py-4 text-lg font-semibold text-white transition-colors hover:border-cyan-300 hover:text-cyan-300"
            >
              Voir les temoignages
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
