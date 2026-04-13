import { Menu, Moon, Shield, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './theme-context';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.search, location.hash]);

  const navigationItems = [
    { href: '/#coverage', label: 'Garanties' },
    { href: '/#who-for', label: 'Pour qui' },
    { to: '/temoignages', label: 'Temoignages' },
    { href: '/#faq', label: 'FAQ' },
  ] as const;

  const secondaryLinkClassName =
    'inline-flex items-center justify-center rounded-lg border border-cyan-400/30 px-5 py-2.5 font-semibold text-white transition-all hover:border-cyan-300 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/30';
  const navLinkClassName =
    'font-semibold text-gray-300 transition-colors hover:text-cyan-400 focus-visible:outline-none focus-visible:text-cyan-300';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-cyan-400" strokeWidth={2} />
            <span className="hidden text-xl font-semibold text-white sm:inline">Le Cyberassureur</span>
          </Link>

          <div className="flex items-center gap-3">
            <nav className="hidden md:flex items-center space-x-8">
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-500/20 bg-slate-900/70 text-white transition-colors hover:border-cyan-400/40 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/30 md:hidden"
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
            className="border-t border-cyan-500/20 py-4 md:hidden"
          >
            <nav className="flex flex-col gap-3">
              {navigationItems.map((item) =>
                'to' in item ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="rounded-lg px-3 py-2 text-base font-semibold text-gray-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-300"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-base font-semibold text-gray-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-300"
                  >
                    {item.label}
                  </a>
                ),
              )}

              <div className="grid gap-3 pt-2">
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
