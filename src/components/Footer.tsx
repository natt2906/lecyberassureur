import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { openCookiePreferences } from '../lib/cookieConsent';

export default function Footer() {
  return (
    <footer className="site-section site-section--strong site-section--compact site-footer">
      <div className="site-section__container">
        <div className="site-footer__hero">
          <div className="site-footer__hero-copy">
            <p className="site-footer__section-label">Le cabinet</p>
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
                Marque spécialisée de Prorisk Assurances, nous structurons des solutions de cyberassurance claires,
                réactives et adaptées aux entreprises exposées aux risques numériques.
              </p>
            </div>
          </div>
          <div className="site-footer__hero-tags" aria-label="Points clés">
            <span className="site-footer__tag">Analyse sur mesure</span>
            <span className="site-footer__tag">Réponse rapide</span>
            <span className="site-footer__tag">Protection financière</span>
          </div>
        </div>

        <div className="site-footer__panel">
          <div className="site-footer__column">
            <p className="site-footer__section-label">Navigation</p>
            <h3 className="site-footer__heading">Explorer</h3>
            <ul className="site-footer__list">
              <li><Link to="/assurance-cyber" className="site-footer__link">Assurance cyber</Link></li>
              <li><Link to="/offres" className="site-footer__link">Offres</Link></li>
              <li><Link to="/devis-assurance-cyber" className="site-footer__link">Devis assurance cyber</Link></li>
              <li><Link to="/articles" className="site-footer__link">Articles</Link></li>
              <li><Link to="/qui-sommes-nous" className="site-footer__link">Qui sommes-nous ?</Link></li>
            </ul>
          </div>

          <div className="site-footer__column">
            <p className="site-footer__section-label">Ressources</p>
            <h3 className="site-footer__heading">Contenus utiles</h3>
            <ul className="site-footer__list">
              <li><a href="/#coverage" className="site-footer__link">Garanties</a></li>
              <li><Link to="/assurance-cyber-prix" className="site-footer__link">Prix assurance cyber</Link></li>
              <li><Link to="/assurance-cyber-pme" className="site-footer__link">Assurance cyber PME</Link></li>
              <li><Link to="/assurance-cyber-tpe" className="site-footer__link">Assurance cyber TPE</Link></li>
              <li><Link to="/assurance-cyber-que-couvre" className="site-footer__link">Ce que couvre l&apos;assurance cyber</Link></li>
              <li><Link to="/faq" className="site-footer__link">FAQ</Link></li>
            </ul>
          </div>

          <div className="site-footer__column site-footer__column--contact">
            <p className="site-footer__section-label">Contact</p>
            <h3 className="site-footer__heading">Échanger avec nous</h3>
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
              <li>
                <Link to="/devis-assurance-cyber" className="site-footer__mini-cta">Demander un devis cyber</Link>
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
