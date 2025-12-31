import { ArrowRight, Shield } from 'lucide-react';

export default function FinalCTA() {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDYsIDE4MiwgMjEyLCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-500/10 rounded-2xl mb-8 border border-cyan-500/20">
          <Shield className="w-10 h-10 text-cyan-400" strokeWidth={2} />
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Un incident cyber n'arrive jamais seul.
          <span className="block text-cyan-400 mt-2">Soyez assuré.</span>
        </h2>

        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          Chaque jour sans assurance cyber est un jour où votre entreprise est exposée financièrement. Bénéficiez d'une protection complète et d'un accompagnement d'experts quand cela compte le plus.
        </p>

        <button
          onClick={scrollToForm}
          className="group bg-cyan-500 hover:bg-cyan-600 text-slate-950 px-10 py-5 rounded-lg font-bold text-xl transition-all inline-flex items-center space-x-3 shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50"
        >
          <span>Protéger mon entreprise maintenant</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
        </button>

        <p className="text-sm text-gray-400 mt-6">
          Rejoignez des centaines d'entreprises protégées contre les pertes financières liées au cyber
        </p>
      </div>
    </section>
  );
}
