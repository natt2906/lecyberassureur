import type { OfferId } from '../data/offers';

export const DEFAULT_BRAND_LOGO = '/brand-assets/logo-blue-hq.png';

export const OFFER_BRAND_LOGOS: Record<OfferId, string> = {
  basic: '/brand-assets/logo-blue-hq.png',
  silver: '/brand-assets/logo-silver-hq.png',
  gold: '/brand-assets/logo-gold-hq.png',
};

export function getBrandLogo(selectedOffer?: OfferId | '') {
  return selectedOffer ? OFFER_BRAND_LOGOS[selectedOffer] : DEFAULT_BRAND_LOGO;
}
