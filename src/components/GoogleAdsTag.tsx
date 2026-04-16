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
      GOOGLE_TAG_IDS.forEach((tagId) => {
        trackPageView(tagId);
      });
    });
  }, [location.pathname, location.search, location.hash]);

  return null;
}
