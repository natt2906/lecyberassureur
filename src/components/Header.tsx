import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-cyan-400" strokeWidth={2} />
            <span className="text-xl font-semibold text-white">Le Cyberassureur</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="/#coverage" className="text-gray-300 hover:text-cyan-400 transition-colors font-semibold">Garanties</a>
            <a href="/#who-for" className="text-gray-300 hover:text-cyan-400 transition-colors font-semibold">Pour qui</a>
            <Link to="/temoignages" className="text-gray-300 hover:text-cyan-400 transition-colors font-semibold">Temoignages</Link>
            <a href="/#faq" className="text-gray-300 hover:text-cyan-400 transition-colors font-semibold">FAQ</a>
            <a
              href="/#contact-form"
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 px-6 py-2.5 rounded-lg font-semibold transition-all"
            >
              Obtenir un diagnostic
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
