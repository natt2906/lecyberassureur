import { isKnownActivityDomain } from '../data/activityDomains';

export type LeadReviewStatus = 'accepted' | 'suspect' | 'rejected';

export const MIN_FORM_COMPLETION_MS = 3_000;
export const SUSPECT_FORM_COMPLETION_MS = 5_000;

const REJECTED_PHONE_NUMBERS = new Set([
  '0000000000',
  '0123456789',
  '0987654321',
  '0102030405',
  '0606060606',
  '0611111111',
  '0612345678',
  '0666666666',
  '0677777777',
  '0700000000',
  '0777777777',
]);

const REJECTED_COMPANY_MARKERS = [
  'aaa',
  'aaaa',
  'azerty',
  'demo',
  'fake',
  'faux',
  'jdgshsgh',
  'qsd',
  'qsdf',
  'qwerty',
  'sample',
  'test',
] as const;

export function normalizePhoneDigits(value: string) {
  return value.replace(/\D/g, '');
}

export function isValidFrenchPhone(value: string) {
  return /^(?:0[1-9]\d{8}|33[1-9]\d{8})$/.test(normalizePhoneDigits(value));
}

export function toCanonicalPhone(value: string) {
  const digits = normalizePhoneDigits(value);

  if (/^0[1-9]\d{8}$/.test(digits)) {
    return `+33${digits.slice(1)}`;
  }

  if (/^33[1-9]\d{8}$/.test(digits)) {
    return `+${digits}`;
  }

  return value.trim();
}

export function toLocalFrenchPhoneDigits(value: string) {
  const digits = normalizePhoneDigits(value);

  if (/^33[1-9]\d{8}$/.test(digits)) {
    return `0${digits.slice(2)}`;
  }

  if (/^0[1-9]\d{8}$/.test(digits)) {
    return digits;
  }

  return digits;
}

export function isRejectedFrenchPhone(value: string) {
  const localPhone = toLocalFrenchPhoneDigits(value);

  if (!/^0[1-9]\d{8}$/.test(localPhone)) {
    return false;
  }

  if (REJECTED_PHONE_NUMBERS.has(localPhone)) {
    return true;
  }

  if (/^(..)\1{4}$/.test(localPhone)) {
    return true;
  }

  if (/^0[1-9](\d)\1{7}$/.test(localPhone)) {
    return true;
  }

  return /(\d)\1{4,}/.test(localPhone) && new Set(localPhone).size <= 3;
}

export function normalizeAscii(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function isRejectedCompanyName(value: string) {
  const normalized = normalizeAscii(value).replace(/['’]/g, '').trim();
  const compact = normalized.replace(/[^a-z0-9]/g, '');
  const lettersOnly = normalized.replace(/[^a-z]/g, '');
  const vowelCount = (lettersOnly.match(/[aeiouy]/g) || []).length;
  const hasSpace = /\s/.test(normalized);

  if (lettersOnly.length < 3) {
    return true;
  }

  if (REJECTED_COMPANY_MARKERS.some((marker) => compact === marker || compact.includes(marker))) {
    return true;
  }

  if (/(azerty|qwerty|qsdf|asdf|wxcv|hjkl)/.test(compact)) {
    return true;
  }

  if (/([a-z])\1{3,}/.test(lettersOnly)) {
    return true;
  }

  if (!hasSpace && lettersOnly.length >= 6 && vowelCount === 0) {
    return true;
  }

  if (!hasSpace && lettersOnly.length >= 7 && vowelCount <= 1) {
    return true;
  }

  if (!hasSpace && lettersOnly.length >= 7 && new Set(lettersOnly).size <= 3) {
    return true;
  }

  return !hasSpace && /[^aeiouy]{6,}/.test(lettersOnly);
}

export function isAcceptedActivityDomain(value: string) {
  return isKnownActivityDomain(value);
}

export function getLeadFingerprint(phone: string) {
  const canonicalPhone = toCanonicalPhone(phone);

  if (!canonicalPhone || !isValidFrenchPhone(canonicalPhone)) {
    return '';
  }

  return canonicalPhone;
}

export function getLeadReviewDecision(input: {
  submissionStatus: string;
  formCompletionMs: number;
  isPhoneChurnSuspicious: boolean;
}) {
  if (input.submissionStatus === 'not_submitted') {
    return {
      reviewStatus: 'suspect' as const,
      reviewReason: 'abandoned_draft',
    };
  }

  const reasons: string[] = [];

  if (input.formCompletionMs < MIN_FORM_COMPLETION_MS) {
    return {
      reviewStatus: 'rejected' as const,
      reviewReason: 'submitted_too_fast',
    };
  }

  if (input.formCompletionMs < SUSPECT_FORM_COMPLETION_MS) {
    reasons.push('fast_submission');
  }

  if (input.isPhoneChurnSuspicious) {
    reasons.push('ip_phone_churn');
  }

  if (reasons.length > 0) {
    return {
      reviewStatus: 'suspect' as const,
      reviewReason: reasons.join(','),
    };
  }

  return {
    reviewStatus: 'accepted' as const,
    reviewReason: 'validated',
  };
}
