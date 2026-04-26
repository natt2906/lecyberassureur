import { useEffect } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { usePageMeta } from '../lib/usePageMeta';

declare global {
  interface Window {
    gtag_report_conversion?: (
      url?: string,
      userData?: {
        phone_number?: string;
      },
    ) => boolean;
  }
}

export default function ThankYouPage() {
  const location = useLocation();

  usePageMeta({
    title: 'Merci pour votre demande | Le Cyberassureur',
    description:
      "Votre demande d'analyse de risque cyber a bien été transmise. Un expert revient vers vous pour qualifier votre besoin et la suite à donner.",
    path: '/merci',
    robots: 'noindex,follow',
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const state = location.state as
      | { trackConversion?: boolean; conversionKey?: string; conversionPhone?: string }
      | null;

    if (!state?.trackConversion) {
      return;
    }

    const conversionKey = state.conversionKey || 'default';
    const storageKey = 'lecyberassureur-google-ads-conversion';
    const lastTrackedKey = window.sessionStorage.getItem(storageKey);

    if (lastTrackedKey === conversionKey) {
      return;
    }

    window.sessionStorage.setItem(storageKey, conversionKey);
    window.gtag_report_conversion?.(
      undefined,
      state.conversionPhone ? { phone_number: state.conversionPhone } : undefined,
    );
  }, [location.state]);

  return (
    <div className="page-shell">
      <Header />
      <main className="page-main page-main--spacious">
        <section className="site-panel site-panel--center mx-auto max-w-4xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-2xl shadow-cyan-500/10 sm:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10">
            <CheckCircle className="h-10 w-10 text-cyan-400" />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Merci, votre demande a bien ete transmise.
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
            Votre demande d'analyse de risque cyber est en cours de traitement. Un expert revient vers vous sous 24 heures ouvrees.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/"
              className="final-cta__button"
            >
              Retour a l'accueil
              <ArrowRight className="final-cta__button-icon" />
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
