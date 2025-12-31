import { ArrowRight, Phone } from 'lucide-react';

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDYsIDE4MiwgMjEyLCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/20">
                Spécialiste de l'assurance cyber
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Les cyberattaques sont inévitables.
              <span className="block text-cyan-400 mt-2">Les pertes financières ne le sont pas.</span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Une assurance cyber conçue pour absorber les pertes financières, protéger votre activité et sécuriser votre entreprise après un incident cyber.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={scrollToForm}
                className="group bg-cyan-500 hover:bg-cyan-600 text-slate-950 px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
              >
                <span>Obtenir mon diagnostic d'exposition cyber</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToForm}
                className="border-2 border-cyan-400/50 hover:border-cyan-400 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Parler avec un expert</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"></div>
            <img
              src="/chatgpt_image_31_déc._2025,_18_07_20.png"
              alt="Protecteur de l'assurance cyber"
              className="relative w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
