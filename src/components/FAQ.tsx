import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Nous sommes trop petits pour être ciblés par des cyberattaques',
      answer: "Les TPE et PME sont en réalité des cibles principales. Les attaquants savent que les petites entreprises disposent souvent de moins de moyens de sécurité, tout en traitant des données et des paiements de valeur. Plus de 60 % des cyberattaques ciblent les PME, précisément parce qu'elles sont perçues comme des cibles plus faciles et moins protégées."
    },
    {
      question: 'Notre prestataire IT nous protège déjà',
      answer: "Les prestataires IT se concentrent sur la prévention et les mesures de sécurité, ce qui est essentiel. Mais l'assurance cyber couvre ce qui se passe après qu'une attaque réussit : pertes financières, coûts juridiques, interruption d'activité et dépenses de rétablissement. Même avec une excellente sécurité informatique, aucun système n'est sécurisé à 100 %. L'assurance absorbe l'impact financier quand la prévention échoue."
    },
    {
      question: "Nous n'avons pas de données sensibles à protéger",
      answer: "Si vous avez des emails, des contacts clients, des factures, des informations de paiement ou des dossiers RH, vous avez des données sensibles. Même des informations basiques d'entreprise peuvent être chiffrées par un rançongiciel, vous forçant à payer ou à perdre l'accès. L'impact financier vient de l'interruption d'activité, pas seulement du vol de données."
    },
    {
      question: 'Notre RC Pro couvre déjà les incidents cyber',
      answer: "Les contrats RC Pro excluent généralement les risques cyber ou offrent une couverture très limitée. Les incidents cyber exigent une couverture spécialisée pour les actifs numériques, les violations de données, l'interruption d'activité liée à des pannes IT et les amendes réglementaires, ce qui n'est pas couvert par la responsabilité civile classique. Il vous faut une assurance cyber dédiée."
    },
    {
      question: "En combien de temps pouvons-nous être couverts après un incident ?",
      answer: "La couverture doit être en place avant qu'un incident ne se produise : on ne peut pas souscrire après une attaque. En revanche, une fois couverts, notre équipe de réponse 24/7 s'active immédiatement dès votre déclaration, avec un accès instantané à des experts techniques et juridiques."
    },
    {
      question: "Quelle est la différence entre assurance cyber et services de cybersécurité ?",
      answer: "Les services de cybersécurité visent à prévenir les attaques. L'assurance cyber apporte une protection financière et un soutien d'experts après un incident. Les deux sont essentiels : la sécurité réduit le risque, l'assurance transfère les conséquences financières des incidents qui réussissent malgré vos mesures."
    }
  ];

  return (
    <section id="faq" className="bg-slate-900 py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 text-cyan-400 mb-6">
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wider uppercase">Questions fréquentes</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Foire aux questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
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
