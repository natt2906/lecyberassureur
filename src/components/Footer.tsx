import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { openCookiePreferences } from '../lib/cookieConsent';

export default function Footer() {
  return (
    <footer className="site-section site-section--strong site-section--compact site-footer">
      <div className="site-section__container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__brand-link" aria-label="Retour à l'accueil">
              <img
                src="/brand-assets/logo-cropped-384.png"
                alt=""
                aria-hidden="true"
                className="site-footer__brand-logo"
              />
              <span className="site-footer__brand-title">Le Cyberassureur</span>
            </Link>
            <p className="site-footer__brand-text">
              Courtier spécialisé en cyberassurance, Le Cyberassureur accompagne ses clients quelle que soit la situation.
            </p>
          </div>

          <div>
            <h3 className="site-footer__heading">Liens rapides</h3>
            <ul className="site-footer__list site-footer__list--two-columns">
              <li><Link to="/assurance-cyber" className="site-footer__link">Assurance cyber</Link></li>
              <li><a href="/#coverage" className="site-footer__link">Garanties</a></li>
              <li><Link to="/assurance-cyber-risques" className="site-footer__link">Cyber-risques</Link></li>
              <li><Link to="/offres" className="site-footer__link">Offres</Link></li>
              <li><a href="/#who-for" className="site-footer__link">Pour qui</a></li>
              <li><Link to="/articles" className="site-footer__link">Articles</Link></li>
              <li><Link to="/faq" className="site-footer__link">FAQ</Link></li>
              <li><a href="/#devis-cyber" className="site-footer__link">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="site-footer__heading">Contact</h3>
            <ul className="site-footer__list">
              <li className="site-footer__contact-item">
                <Phone className="site-footer__contact-icon" strokeWidth={2} />
                <span>Rappel sous 24h ouvrées</span>
              </li>
              <li className="site-footer__contact-item">
                <Mail className="site-footer__contact-icon" strokeWidth={2} />
                <a href="mailto:contact@lecyberassureur.fr" className="site-footer__link">
                  contact@lecyberassureur.fr
                </a>
              </li>
              <li className="site-footer__contact-item">
                <MapPin className="site-footer__contact-icon" strokeWidth={2} />
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">
            &copy; 2026 Le Cyberassureur. Tous droits réservés.
          </p>
          <div className="site-footer__legal">
            <Link to="/politique-confidentialite" className="site-footer__link">Politique de confidentialité</Link>
            <Link to="/conditions-utilisation" className="site-footer__link">Conditions d'utilisation</Link>
            <Link to="/mentions-legales" className="site-footer__link">Mentions légales</Link>
            <button
              type="button"
              onClick={openCookiePreferences}
              className="site-footer__legal-button"
            >
              Gérer les cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
