import type { ReactNode } from 'react';
import ContactForm from './ContactForm';
import FAQ from './FAQ';
import Footer from './Footer';
import Header from './Header';
import type { FAQItem } from '../data/faqs';

type TopicPageLayoutProps = {
  eyebrow: string;
  title: string;
  intro: string;
  faqItems: FAQItem[];
  faqSectionId: string;
  faqTitle: string;
  faqIntro: string;
  directAnswer?: {
    question: string;
    answer: string;
  };
  children: ReactNode;
};

export default function TopicPageLayout({
  eyebrow,
  title,
  intro,
  faqItems,
  faqSectionId,
  faqTitle,
  faqIntro,
  directAnswer,
  children,
}: TopicPageLayoutProps) {
  return (
    <div className="page-shell">
      <Header />
      <main className="page-main">
        <section className="page-header">
          <div className="page-header__inner">
            <div className="site-section__eyebrow">
              <span className="site-section__eyebrow-text">{eyebrow}</span>
            </div>
            <h1 className="site-section__title mt-6">{title}</h1>
            <p className="site-section__intro mt-6">{intro}</p>
          </div>
        </section>
        {directAnswer && (
          <section className="site-section site-section--muted">
            <div className="site-section__container">
              <article className="site-card">
                <h2 className="site-card__title">{directAnswer.question}</h2>
                <p className="site-card__body">{directAnswer.answer}</p>
              </article>
            </div>
          </section>
        )}

        {children}

        <FAQ
          sectionId={faqSectionId}
          eyebrow="Questions fréquentes"
          title={faqTitle}
          intro={faqIntro}
          items={faqItems}
        />

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
