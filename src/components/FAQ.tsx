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
    <section id={sectionId} className="bg-slate-900 py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 text-cyan-400 mb-6">
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wider uppercase">{eyebrow}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {title}
          </h2>
          {intro ? <p className="mx-auto max-w-3xl text-lg text-gray-300">{intro}</p> : null}
        </div>

        <div className="space-y-4">
          {items.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-950 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-semibold text-white pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-cyan-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
