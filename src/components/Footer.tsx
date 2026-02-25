import { Shield, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-cyan-500/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-8 h-8 text-cyan-400" strokeWidth={2} />
              <span className="text-xl font-bold text-white">Le Cyberassureur</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Courtier spécialisé en cyberassurance, Le Cyberassureur accompagne ses clients quelle que soit la situation.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><a href="#coverage" className="text-gray-400 hover:text-cyan-400 transition-colors">Garanties</a></li>
              <li><a href="#who-for" className="text-gray-400 hover:text-cyan-400 transition-colors">Pour qui</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-cyan-400 transition-colors">FAQ</a></li>
              <li><a href="#contact-form" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-gray-400">
                <Phone className="w-5 h-5 mt-0.5 text-cyan-400" strokeWidth={2} />
                <span>Ligne d'urgence 24/7</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-400">
                <Mail className="w-5 h-5 mt-0.5 text-cyan-400" strokeWidth={2} />
                <span>contact@cyberguard.com</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-400">
                <MapPin className="w-5 h-5 mt-0.5 text-cyan-400" strokeWidth={2} />
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-cyan-500/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; 2024 Le Cyberassureur. Tous droits réservés.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Politique de confidentialité</a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Conditions d'utilisation</a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Mentions légales</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
