import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { captureLeadAttribution } from '../lib/leadAttribution';

export default function NavigationEffects() {
  const location = useLocation();

  useEffect(() => {
    captureLeadAttribution();
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        window.requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
      return;
    }

    window.scrollTo({ top: 0, left: 0 });
  }, [location.pathname, location.hash]);

  return null;
}
