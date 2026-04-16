import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID || 'AW-11278008764';
const GOOGLE_TAG_SRC = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;

function ensureGoogleAdsScript() {
  if (typeof document === 'undefined') {
    return;
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src="${GOOGLE_TAG_SRC}"]`,
  );

  if (existingScript) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = GOOGLE_TAG_SRC;
  document.head.appendChild(script);
}

function ensureGoogleAdsBootstrap() {
  if (typeof window === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args);
    };
  }
}

function initGoogleAds() {
  ensureGoogleAdsBootstrap();

  window.gtag?.('js', new Date());
  window.gtag?.('config', GOOGLE_ADS_ID, { send_page_view: false });
}

function trackPageView() {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'page_view', {
    send_to: GOOGLE_ADS_ID,
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
  });
}

export default function GoogleAdsTag() {
  const location = useLocation();
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    ensureGoogleAdsScript();
    initGoogleAds();
    hasInitializedRef.current = true;
  }, []);

  useEffect(() => {
    if (!hasInitializedRef.current) {
      return;
    }

    trackPageView();
  }, [location.pathname, location.search, location.hash]);

  return null;
}
