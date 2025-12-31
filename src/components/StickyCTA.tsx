import { useState, useEffect } from 'react';
import { Shield, X } from 'lucide-react';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800 && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 800) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-slate-900 border-2 border-cyan-400/50 rounded-xl shadow-2xl shadow-cyan-500/20 p-4 max-w-sm">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center border border-cyan-500/20 hover:bg-slate-700 transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
              <Shield className="w-5 h-5 text-cyan-400" strokeWidth={2} />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold mb-1">Protégez votre entreprise</h3>
            <p className="text-sm text-gray-400 mb-3">Obtenez votre diagnostic de risque cyber gratuit</p>
            <button
              onClick={scrollToForm}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 px-4 py-2 rounded-lg font-semibold text-sm transition-all"
            >
              Commencer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
