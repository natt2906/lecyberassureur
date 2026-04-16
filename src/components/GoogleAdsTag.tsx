import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GOOGLE_TAG_ID = import.meta.env.VITE_GOOGLE_TAG_ID || 'GT-WBTNPQ2P';

function trackPageView() {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
  });
}

function runWhenGtagReady(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  if (window.gtag) {
    callback();
    return () => {};
  }

  let attempts = 0;
  const interval = window.setInterval(() => {
    attempts += 1;

    if (window.gtag) {
      window.clearInterval(interval);
      callback();
      return;
    }

    if (attempts >= 40) {
      window.clearInterval(interval);
    }
  }, 250);

  return () => window.clearInterval(interval);
}

export default function GoogleAdsTag() {
  const location = useLocation();
  const lastTrackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}${location.hash}`;

    if (lastTrackedPathRef.current === pagePath) {
      return;
    }

    lastTrackedPathRef.current = pagePath;

    return runWhenGtagReady(() => {
      window.gtag?.('config', GOOGLE_TAG_ID, { send_page_view: false });
      trackPageView();
    });
  }, [location.pathname, location.search, location.hash]);

  return null;
}
