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
    <div className="page-shell">
      <Header />
      <main className="page-main page-main--spacious">
        <article className="site-panel legal-page mx-auto max-w-4xl p-8 shadow-2xl shadow-cyan-500/10 sm:p-12">
          <header className="legal-page__header">
            <h1 className="legal-page__title">{title}</h1>
            <p className="legal-page__intro">{intro}</p>
          </header>
          <div className="legal-page__content">{children}</div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
