import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID || 'AW-11278008764';
const GOOGLE_ANALYTICS_ID =
  import.meta.env.VITE_GOOGLE_ANALYTICS_ID || 'G-94V9TT7R08';
const GOOGLE_TAG_IDS = [GOOGLE_ANALYTICS_ID, GOOGLE_ADS_ID].filter(Boolean);
const PRIMARY_GOOGLE_TAG_ID = GOOGLE_ANALYTICS_ID || GOOGLE_ADS_ID;
const GOOGLE_TAG_SRC = `https://www.googletagmanager.com/gtag/js?id=${PRIMARY_GOOGLE_TAG_ID}`;

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

function initGoogleTags() {
  ensureGoogleAdsBootstrap();

  window.gtag?.('js', new Date());
  GOOGLE_TAG_IDS.forEach((tagId) => {
    window.gtag?.('config', tagId, { send_page_view: false });
  });
}

function trackPageView(sendTo: string) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'page_view', {
    send_to: sendTo,
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
    initGoogleTags();
    hasInitializedRef.current = true;
  }, []);

  useEffect(() => {
    if (!hasInitializedRef.current) {
      return;
    }

    GOOGLE_TAG_IDS.forEach((tagId) => {
      trackPageView(tagId);
    });
  }, [location.pathname, location.search, location.hash]);

  return null;
}
