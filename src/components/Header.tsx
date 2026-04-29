import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelectedOffer } from '../lib/selectedOffer';
import { useTheme } from './theme-context';

type NavigationItem = {
  label: string;
  href?: string;
  to?: string;
};

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const selectedOffer = useSelectedOffer();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const closeDesktopMenuTimeoutRef = useRef<number | undefined>(undefined);

  const clearDesktopMenuCloseTimeout = () => {
    if (closeDesktopMenuTimeoutRef.current !== undefined) {
      window.clearTimeout(closeDesktopMenuTimeoutRef.current);
      closeDesktopMenuTimeoutRef.current = undefined;
    }
  };

  const openDesktopGroup = (groupId: string) => {
    clearDesktopMenuCloseTimeout();
    setOpenDesktopMenu(groupId);
  };

  const scheduleDesktopMenuClose = (groupId: string) => {
    clearDesktopMenuCloseTimeout();
    closeDesktopMenuTimeoutRef.current = window.setTimeout(() => {
      setOpenDesktopMenu((current) => (current === groupId ? null : current));
      closeDesktopMenuTimeoutRef.current = undefined;
    }, 220);
  };

  const toggleDesktopGroup = (groupId: string) => {
    clearDesktopMenuCloseTimeout();
    setOpenDesktopMenu((current) => (current === groupId ? null : groupId));
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDesktopMenu(null);
    clearDesktopMenuCloseTimeout();
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        clearDesktopMenuCloseTimeout();
        setOpenDesktopMenu(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDesktopMenu(null);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      clearDesktopMenuCloseTimeout();
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const mobileNavigationItems: NavigationItem[] = [
    { to: '/qui-sommes-nous', label: 'Qui sommes-nous ?' },
    { to: '/assurance-cyber', label: 'Assurance cyber' },
    { to: '/offres', label: 'Offres' },
    { href: '/#coverage', label: 'Garanties' },
    { href: '/#who-for', label: 'Pour qui' },
    { to: '/articles', label: 'Articles' },
    { to: '/temoignages', label: 'Temoignages' },
    { to: '/faq', label: 'FAQ' },
  ];

  const desktopNavigationGroups = [
    {
      id: 'assurance',
      label: 'Assurance cyber',
      items: [
        { to: '/assurance-cyber', label: "Vue d'ensemble" },
        { href: '/#coverage', label: 'Garanties' },
        { href: '/#who-for', label: 'Pour qui' },
        { to: '/assurance-cyber-tpe', label: 'Assurance cyber TPE' },
        { to: '/assurance-cyber-pme', label: 'Assurance cyber PME' },
      ],
    },
    {
      id: 'resources',
      label: 'Ressources',
      items: [
        { to: '/assurance-cyber-prix', label: 'Prix assurance cyber' },
        { to: '/assurance-cyber-obligatoire', label: 'Assurance cyber obligatoire' },
        { to: '/articles', label: 'Articles' },
        { to: '/temoignages', label: 'Temoignages' },
        { to: '/faq', label: 'FAQ' },
      ],
    },
  ] as const;

  const desktopNavigationItems: NavigationItem[] = [
    { to: '/offres', label: 'Offres' },
    { to: '/qui-sommes-nous', label: 'A propos' },
  ];

  const secondaryLinkClassName = 'site-header__cta';
  const navLinkClassName = 'site-header__nav-link';
  const logoClassName = [
    'site-header__logo',
    selectedOffer ? `site-header__logo--${selectedOffer}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const renderNavigationItem = (item: NavigationItem, className: string) =>
    item.to ? (
      <Link key={item.label} to={item.to} className={className}>
        {item.label}
      </Link>
    ) : (
      <a key={item.label} href={item.href} className={className}>
        {item.label}
      </a>
    );

  return (
    <header ref={headerRef} className="site-header">
      <div className="site-header__container">
        <div className="site-header__bar">
          <Link to="/" className="site-header__brand">
            <img
              src="/brand-assets/logo-cropped-384.png"
              alt="Le Cyberassureur"
              className={logoClassName}
            />
            <span className="site-header__brand-text">Le Cyberassureur</span>
          </Link>

          <div className="site-header__actions">
            <nav className="site-header__nav">
              {desktopNavigationGroups
                .filter((group) => group.id === 'assurance')
                .map((group) => {
                  const isOpen = openDesktopMenu === group.id;

                  return (
                    <div
                      key={group.id}
                      className="site-header__nav-group"
                      onMouseEnter={() => openDesktopGroup(group.id)}
                      onMouseLeave={() => scheduleDesktopMenuClose(group.id)}
                    >
                      <button
                        type="button"
                        className="site-header__nav-trigger"
                        aria-expanded={isOpen}
                        aria-controls={`desktop-nav-${group.id}`}
                        onClick={() => toggleDesktopGroup(group.id)}
                      >
                        <span>{group.label}</span>
                        <ChevronDown
                          className={`site-header__nav-trigger-icon${isOpen ? ' site-header__nav-trigger-icon--open' : ''}`}
                        />
                      </button>

                      {isOpen && (
                        <div id={`desktop-nav-${group.id}`} className="site-header__nav-menu">
                          {group.items.map((item) => renderNavigationItem(item, 'site-header__nav-menu-link'))}
                        </div>
                      )}
                    </div>
                  );
                })}

              {desktopNavigationItems
                .filter((item) => item.label === 'Offres')
                .map((item) => renderNavigationItem(item, navLinkClassName))}

              {desktopNavigationGroups
                .filter((group) => group.id === 'resources')
                .map((group) => {
                  const isOpen = openDesktopMenu === group.id;

                  return (
                    <div
                      key={group.id}
                      className="site-header__nav-group"
                      onMouseEnter={() => openDesktopGroup(group.id)}
                      onMouseLeave={() => scheduleDesktopMenuClose(group.id)}
                    >
                      <button
                        type="button"
                        className="site-header__nav-trigger"
                        aria-expanded={isOpen}
                        aria-controls={`desktop-nav-${group.id}`}
                        onClick={() => toggleDesktopGroup(group.id)}
                      >
                        <span>{group.label}</span>
                        <ChevronDown
                          className={`site-header__nav-trigger-icon${isOpen ? ' site-header__nav-trigger-icon--open' : ''}`}
                        />
                      </button>

                      {isOpen && (
                        <div id={`desktop-nav-${group.id}`} className="site-header__nav-menu">
                          {group.items.map((item) => renderNavigationItem(item, 'site-header__nav-menu-link'))}
                        </div>
                      )}
                    </div>
                  );
                })}

              {desktopNavigationItems
                .filter((item) => item.label !== 'Offres')
                .map((item) => renderNavigationItem(item, navLinkClassName))}

              <a href="/#devis-cyber" className={secondaryLinkClassName}>
                Recevoir un devis
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
              {mobileNavigationItems.map((item) => renderNavigationItem(item, 'site-header__mobile-link'))}

              <div className="site-header__mobile-actions">
                <a href="/#devis-cyber" className={secondaryLinkClassName}>
                  Recevoir un devis
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
