import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

type LegalPageLayoutProps = {
  title: string;
  intro: string;
  children: ReactNode;
};

export default function LegalPageLayout({ title, intro, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-4xl rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-8 shadow-2xl shadow-cyan-500/10 sm:p-12">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">{title}</h1>
          <p className="mb-10 max-w-3xl text-lg text-gray-300">{intro}</p>
          <div className="space-y-8 text-gray-300">{children}</div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
