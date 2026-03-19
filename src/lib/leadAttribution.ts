const STORAGE_KEY = 'lead-attribution';

const TRACKED_QUERY_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
] as const;

type TrackedQueryParam = (typeof TRACKED_QUERY_PARAMS)[number];

export type LeadAttribution = Record<TrackedQueryParam, string> & {
  referrer: string;
  landing_page: string;
  last_page: string;
  first_seen_at: string;
  last_seen_at: string;
};

const EMPTY_ATTRIBUTION: LeadAttribution = {
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_content: '',
  utm_term: '',
  gclid: '',
  fbclid: '',
  referrer: '',
  landing_page: '',
  last_page: '',
  first_seen_at: '',
  last_seen_at: '',
};

function isBrowser() {
  return typeof window !== 'undefined';
}

function getCurrentPage() {
  if (!isBrowser()) {
    return '';
  }

  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function hasTrackedParams(searchParams: URLSearchParams) {
  return TRACKED_QUERY_PARAMS.some((key) => {
    const value = searchParams.get(key);
    return typeof value === 'string' && value.trim().length > 0;
  });
}

export function readLeadAttribution(): LeadAttribution {
  if (!isBrowser()) {
    return { ...EMPTY_ATTRIBUTION };
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { ...EMPTY_ATTRIBUTION };
    }

    return {
      ...EMPTY_ATTRIBUTION,
      ...JSON.parse(stored),
    };
  } catch {
    return { ...EMPTY_ATTRIBUTION };
  }
}

export function captureLeadAttribution() {
  if (!isBrowser()) {
    return { ...EMPTY_ATTRIBUTION };
  }

  const existing = readLeadAttribution();
  const searchParams = new URLSearchParams(window.location.search);
  const currentPage = getCurrentPage();
  const now = new Date().toISOString();
  const trackedParamsPresent = hasTrackedParams(searchParams);

  const nextAttribution: LeadAttribution = {
    ...existing,
    last_page: currentPage,
    last_seen_at: now,
    referrer: existing.referrer || document.referrer || '',
    landing_page: existing.landing_page || currentPage,
    first_seen_at: existing.first_seen_at || now,
  };

  if (trackedParamsPresent) {
    nextAttribution.landing_page = currentPage;
    nextAttribution.first_seen_at = now;
    nextAttribution.referrer = document.referrer || existing.referrer || '';

    TRACKED_QUERY_PARAMS.forEach((key) => {
      nextAttribution[key] = searchParams.get(key)?.trim() || '';
    });
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAttribution));

  return nextAttribution;
}
