export type OfferId = 'basic' | 'silver' | 'gold';

export type Offer = {
  id: OfferId;
  name: string;
  price: string;
  period: string;
  subtitle: string;
  highlight: string;
  description: string;
  features: string[];
  logoClassName: string;
  cardClassName: string;
  badgeClassName: string;
};

export const offers: Offer[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: '29,99 €',
    period: 'par mois',
    subtitle: 'Socle de protection',
    highlight: 'Sans option supplémentaire',
    description:
      "Une formule d'entrée pour poser une première base de protection cyber et d'accompagnement.",
    features: [
      'Assistance en cas d’incident',
      'Gestion de crise',
      'Responsabilité liée aux données',
    ],
    logoClassName: 'offers-section__plan-logo offers-section__plan-logo--basic',
    cardClassName: 'offers-section__plan',
    badgeClassName: 'offers-section__badge',
  },
  {
    id: 'silver',
    name: 'Silver',
    price: '49,99 €',
    period: 'par mois',
    subtitle: 'Protection renforcée',
    highlight: 'Inclut dommages subis',
    description:
      "Une offre plus protectrice pour les entreprises qui veulent couvrir au-delà du socle standard.",
    features: [
      'Tout le socle Basic',
      'Dommages subis',
      'Accompagnement renforcé en cas d’arrêt',
    ],
    logoClassName: 'offers-section__plan-logo offers-section__plan-logo--silver',
    cardClassName: 'offers-section__plan offers-section__plan--featured',
    badgeClassName: 'offers-section__badge offers-section__badge--silver',
  },
  {
    id: 'gold',
    name: 'Gold',
    price: '99,99 €',
    period: 'par mois',
    subtitle: 'Protection premium',
    highlight: 'Inclut dommages subis + fraude',
    description:
      'La formule la plus complète pour couvrir les impacts financiers et les scénarios de fraude.',
    features: [
      'Tout le socle Silver',
      'Fraude',
      'Niveau de protection le plus complet',
    ],
    logoClassName: 'offers-section__plan-logo offers-section__plan-logo--gold',
    cardClassName: 'offers-section__plan',
    badgeClassName: 'offers-section__badge offers-section__badge--gold',
  },
];

export const offerLabelById: Record<OfferId, string> = {
  basic: 'Basic',
  silver: 'Silver',
  gold: 'Gold',
};

export function isOfferId(value: string): value is OfferId {
  return value === 'basic' || value === 'silver' || value === 'gold';
}
