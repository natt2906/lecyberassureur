export type CardIllustrationVariant =
  | 'finance-impact'
  | 'downtime-impact'
  | 'legal-impact'
  | 'reputation-impact'
  | 'revenue-cover'
  | 'incident-experts'
  | 'legal-defense'
  | 'crisis-comms'
  | 'third-party'
  | 'startup-stack'
  | 'sme-ops'
  | 'enterprise-grid'
  | 'specialist-focus'
  | 'support-247'
  | 'expert-network'
  | 'rapid-response'
  | 'continuity-core';

export type CardImageConfig = {
  alt: string;
  src: string;
  filter?: string;
  objectPosition?: string;
  overlayOpacity?: number;
};

export const cardImages: Record<CardIllustrationVariant, CardImageConfig> = {
  'finance-impact': {
    alt: 'Pertes financieres',
    src: '/card-images/pertes-financieres.jpg',
    filter: 'brightness(1.2) contrast(1.03) saturate(1.08)',
    overlayOpacity: 0.08,
  },
  'downtime-impact': {
    alt: "Interruption d'activite",
    src: '/card-images/interruption-activite.jpg',
    filter: 'brightness(1.22) contrast(1.03) saturate(1.08)',
    overlayOpacity: 0.08,
  },
  'legal-impact': {
    alt: 'Exposition juridique et reglementaire',
    src: '/card-images/exposition-juridique-reglementaire.jpg',
    filter: 'brightness(1.24) contrast(1.02) saturate(1.05)',
    overlayOpacity: 0.06,
  },
  'reputation-impact': {
    alt: 'Atteinte a la reputation',
    src: '/card-images/atteinte-reputation.jpg',
    filter: 'brightness(1.18) contrast(1.04) saturate(1.02)',
    overlayOpacity: 0.1,
  },
  'revenue-cover': {
    alt: 'Pertes financieres et perte de revenus',
    src: '/card-images/pertes-financieres-perte-revenus.jpg',
    filter: 'brightness(1.2) contrast(1.03) saturate(1.08)',
    overlayOpacity: 0.08,
  },
  'incident-experts': {
    alt: 'Experts en reponse aux incidents',
    src: '/card-images/experts-reponse-incidents.jpg',
    filter: 'brightness(1.18) contrast(1.04) saturate(1.08)',
    overlayOpacity: 0.09,
  },
  'legal-defense': {
    alt: 'Defense juridique et couts reglementaires',
    src: '/card-images/defense-juridique-couts-reglementaires.jpg',
    filter: 'brightness(1.24) contrast(1.02) saturate(1.05)',
    overlayOpacity: 0.06,
  },
  'crisis-comms': {
    alt: 'Communication de crise et reputation',
    src: '/card-images/communication-crise-reputation.jpg',
    filter: 'brightness(1.2) contrast(1.03) saturate(1.08)',
    overlayOpacity: 0.08,
  },
  'third-party': {
    alt: 'Dommages aux tiers',
    src: '/card-images/dommages-tiers.jpg',
    filter: 'brightness(1.24) contrast(1.03) saturate(1.08)',
    overlayOpacity: 0.07,
  },
  'startup-stack': {
    alt: 'TPE et startups',
    src: '/card-images/tpe-startups.jpg',
    filter: 'brightness(1.26) contrast(1.02) saturate(1.1)',
    overlayOpacity: 0.05,
  },
  'sme-ops': {
    alt: 'PME',
    src: '/card-images/pme.jpg',
    filter: 'brightness(1.22) contrast(1.03) saturate(1.08)',
    overlayOpacity: 0.07,
  },
  'enterprise-grid': {
    alt: 'ETI et grandes entreprises',
    src: '/card-images/eti-grandes-entreprises.jpg',
    filter: 'brightness(1.16) contrast(1.05) saturate(1.05)',
    overlayOpacity: 0.1,
  },
  'specialist-focus': {
    alt: "Specialiste de l'assurance cyber",
    src: '/card-images/specialiste-assurance-cyber.jpg',
    filter: 'brightness(1.2) contrast(1.03) saturate(1.06)',
    overlayOpacity: 0.08,
  },
  'support-247': {
    alt: 'Assistance humaine 24/7',
    src: '/card-images/assistance-humaine-247.jpg',
    filter: 'brightness(1.22) contrast(1.03) saturate(1.1)',
    overlayOpacity: 0.07,
  },
  'expert-network': {
    alt: "Reseau d'experts",
    src: '/card-images/reseau-experts.jpg',
    filter: 'brightness(1.18) contrast(1.04) saturate(1.05)',
    overlayOpacity: 0.09,
  },
  'rapid-response': {
    alt: 'Activation rapide',
    src: '/card-images/activation-rapide.jpg',
    filter: 'brightness(1.24) contrast(1.04) saturate(1.08)',
    overlayOpacity: 0.07,
  },
  'continuity-core': {
    alt: "Priorite a la continuite d'activite",
    src: '/card-images/priorite-continuite-activite.jpg',
    filter: 'brightness(1.16) contrast(1.04) saturate(1.02)',
    overlayOpacity: 0.1,
  },
};
