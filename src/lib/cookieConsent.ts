import { useEffect, useState } from 'react';

export type CookieConsentPreferences = {
  necessary: true;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
};

export type CookieConsentRecord = {
  version: number;
  updatedAt: string;
  preferences: CookieConsentPreferences;
};

const COOKIE_CONSENT_VERSION = 1;
const COOKIE_CONSENT_STORAGE_KEY = 'lecyberassureur-cookie-consent';
const COOKIE_CONSENT_EVENT = 'lecyberassureur:cookie-consent-updated';
const COOKIE_PREFERENCES_EVENT = 'lecyberassureur:open-cookie-preferences';

export const DEFAULT_COOKIE_PREFERENCES: CookieConsentPreferences = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
};

function normalizeCookieConsentRecord(value: unknown): CookieConsentRecord | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const record = value as Partial<CookieConsentRecord>;
  const preferences = record.preferences;

  if (!preferences || typeof preferences !== 'object') {
    return null;
  }

  const normalizedPreferences: CookieConsentPreferences = {
    necessary: true,
    preferences: Boolean((preferences as Partial<CookieConsentPreferences>).preferences),
    analytics: Boolean((preferences as Partial<CookieConsentPreferences>).analytics),
    marketing: Boolean((preferences as Partial<CookieConsentPreferences>).marketing),
  };

  return {
    version:
      typeof record.version === 'number' ? record.version : COOKIE_CONSENT_VERSION,
    updatedAt:
      typeof record.updatedAt === 'string' ? record.updatedAt : new Date().toISOString(),
    preferences: normalizedPreferences,
  };
}

function applyCookieConsentToDocument(record: CookieConsentRecord | null) {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;

  if (!record) {
    root.removeAttribute('data-cookie-preferences');
    root.removeAttribute('data-cookie-analytics');
    root.removeAttribute('data-cookie-marketing');
    return;
  }

  root.dataset.cookiePreferences = record.preferences.preferences ? 'granted' : 'denied';
  root.dataset.cookieAnalytics = record.preferences.analytics ? 'granted' : 'denied';
  root.dataset.cookieMarketing = record.preferences.marketing ? 'granted' : 'denied';
}

export function readStoredCookieConsent(): CookieConsentRecord | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);

    if (!storedValue) {
      return null;
    }

    const parsedValue = JSON.parse(storedValue);
    const normalizedRecord = normalizeCookieConsentRecord(parsedValue);

    if (!normalizedRecord || normalizedRecord.version !== COOKIE_CONSENT_VERSION) {
      window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
      applyCookieConsentToDocument(null);
      return null;
    }

    applyCookieConsentToDocument(normalizedRecord);
    return normalizedRecord;
  } catch {
    return null;
  }
}

export function writeCookieConsent(
  preferences: Partial<Omit<CookieConsentPreferences, 'necessary'>>,
) {
  if (typeof window === 'undefined') {
    return null;
  }

  const record: CookieConsentRecord = {
    version: COOKIE_CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    preferences: {
      necessary: true,
      preferences: Boolean(preferences.preferences),
      analytics: Boolean(preferences.analytics),
      marketing: Boolean(preferences.marketing),
    },
  };

  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(record));
  applyCookieConsentToDocument(record);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: record }));

  return record;
}

export function acceptAllCookieConsent() {
  return writeCookieConsent({
    preferences: true,
    analytics: true,
    marketing: true,
  });
}

export function rejectOptionalCookieConsent() {
  return writeCookieConsent({
    preferences: false,
    analytics: false,
    marketing: false,
  });
}

export function openCookiePreferences() {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new CustomEvent(COOKIE_PREFERENCES_EVENT));
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsentRecord | null>(() =>
    readStoredCookieConsent(),
  );

  useEffect(() => {
    const handleStorage = () => {
      setConsent(readStoredCookieConsent());
    };

    const handleCustomUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<CookieConsentRecord>;
      const normalizedRecord = normalizeCookieConsentRecord(customEvent.detail);
      applyCookieConsentToDocument(normalizedRecord);
      setConsent(normalizedRecord);
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(COOKIE_CONSENT_EVENT, handleCustomUpdate as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(COOKIE_CONSENT_EVENT, handleCustomUpdate as EventListener);
    };
  }, []);

  return consent;
}

export function useCookiePreferencesTrigger(handler: () => void) {
  useEffect(() => {
    const openHandler = () => {
      handler();
    };

    window.addEventListener(COOKIE_PREFERENCES_EVENT, openHandler);

    return () => {
      window.removeEventListener(COOKIE_PREFERENCES_EVENT, openHandler);
    };
  }, [handler]);
}
