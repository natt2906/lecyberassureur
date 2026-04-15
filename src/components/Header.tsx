import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelectedOffer } from '../lib/selectedOffer';
import { useTheme } from './theme-context';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const selectedOffer = useSelectedOffer();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.search, location.hash]);

  const navigationItems = [
    { href: '/#coverage', label: 'Garanties' },
    { to: '/offres', label: 'Offres' },
    { href: '/#who-for', label: 'Pour qui' },
    { to: '/articles', label: 'Articles' },
    { to: '/temoignages', label: 'Temoignages' },
    { to: '/faq', label: 'FAQ' },
  ] as const;

  const secondaryLinkClassName = 'site-header__cta';
  const navLinkClassName =
    'site-header__nav-link';
  const logoClassName = [
    'site-header__logo',
    selectedOffer ? `site-header__logo--${selectedOffer}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className="site-header">
      <div className="site-header__container">
        <div className="site-header__bar">
          <Link to="/" className="site-header__brand">
            <img
              src="/brand-assets/logo-cropped.png"
              alt=""
              aria-hidden="true"
              className={logoClassName}
            />
            <span className="site-header__brand-text">Le Cyberassureur</span>
          </Link>

          <div className="site-header__actions">
            <nav className="site-header__nav">
              {navigationItems.map((item) =>
                'to' in item ? (
                  <Link key={item.label} to={item.to} className={navLinkClassName}>
                    {item.label}
                  </Link>
                ) : (
                  <a key={item.label} href={item.href} className={navLinkClassName}>
                    {item.label}
                  </a>
                ),
              )}
              <a href="/#contact-form" className={secondaryLinkClassName}>
                Obtenir une expertise
              </a>
            </nav>

            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle-button"
              aria-label={theme === 'dark' ? 'Activer le theme clair' : 'Activer le theme sombre'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              className="site-header__menu-button"
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="site-header__mobile"
          >
            <nav className="site-header__mobile-nav">
              {navigationItems.map((item) =>
                'to' in item ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="site-header__mobile-link"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="site-header__mobile-link"
                  >
                    {item.label}
                  </a>
                ),
              )}

              <div className="site-header__mobile-actions">
                <a href="/#contact-form" className={secondaryLinkClassName}>
                  Obtenir une expertise
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
