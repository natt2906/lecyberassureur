import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem, homeFaqItems } from '../data/faqs';

type FAQProps = {
  items?: FAQItem[];
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
};

export default function FAQ({
  items = homeFaqItems,
  sectionId = 'faq',
  eyebrow = 'Questions fréquentes',
  title = 'Foire aux questions',
  intro,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id={sectionId} className="site-section site-section--muted site-section--deferred">
      <div className="site-section__container">
        <div className="site-section__header">
          <div className="site-section__eyebrow">
            <HelpCircle className="site-section__eyebrow-icon" />
            <span className="site-section__eyebrow-text">{eyebrow}</span>
          </div>
          <h2 className="site-section__title">{title}</h2>
          {intro ? <p className="site-section__intro">{intro}</p> : null}
        </div>

        <div className="faq-list">
          {items.map((faq, index) => (
            <div
              key={index}
              className="faq-list__item"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="faq-list__button"
              >
                <span className="faq-list__question">{faq.question}</span>
                <ChevronDown
                  className={`faq-list__icon ${
                    openIndex === index ? 'faq-list__icon--open' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <p className="faq-list__answer">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
