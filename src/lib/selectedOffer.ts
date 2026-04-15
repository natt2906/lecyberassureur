import { useEffect, useState } from 'react';
import { isOfferId, type OfferId } from '../data/offers';

const SELECTED_OFFER_STORAGE_KEY = 'lecyberassureur-selected-offer';
const SELECTED_OFFER_EVENT = 'lecyberassureur:selected-offer';

function normalizeSelectedOffer(value: string | null | undefined): OfferId | '' {
  if (value && isOfferId(value)) {
    return value;
  }

  return '';
}

export function readSelectedOffer(): OfferId | '' {
  if (typeof window === 'undefined') {
    return '';
  }

  return normalizeSelectedOffer(window.localStorage.getItem(SELECTED_OFFER_STORAGE_KEY));
}

export function writeSelectedOffer(value: string | null | undefined) {
  if (typeof window === 'undefined') {
    return;
  }

  const normalizedValue = normalizeSelectedOffer(value);

  if (normalizedValue) {
    window.localStorage.setItem(SELECTED_OFFER_STORAGE_KEY, normalizedValue);
  } else {
    window.localStorage.removeItem(SELECTED_OFFER_STORAGE_KEY);
  }

  window.dispatchEvent(
    new CustomEvent<OfferId | ''>(SELECTED_OFFER_EVENT, { detail: normalizedValue }),
  );
}

export function useSelectedOffer() {
  const [selectedOffer, setSelectedOffer] = useState<OfferId | ''>(() => readSelectedOffer());

  useEffect(() => {
    const syncFromStorage = () => {
      setSelectedOffer(readSelectedOffer());
    };

    const syncFromCustomEvent = (event: Event) => {
      const customEvent = event as CustomEvent<OfferId | ''>;
      setSelectedOffer(normalizeSelectedOffer(customEvent.detail));
    };

    window.addEventListener('storage', syncFromStorage);
    window.addEventListener(SELECTED_OFFER_EVENT, syncFromCustomEvent as EventListener);

    return () => {
      window.removeEventListener('storage', syncFromStorage);
      window.removeEventListener(SELECTED_OFFER_EVENT, syncFromCustomEvent as EventListener);
    };
  }, []);

  return selectedOffer;
}
