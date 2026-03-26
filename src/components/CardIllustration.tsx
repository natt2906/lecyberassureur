type CardIllustrationVariant =
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

type CardImageConfig = {
  alt: string;
  src: string;
};

const cardImages: Record<CardIllustrationVariant, CardImageConfig> = {
  'finance-impact': {
    alt: 'Pertes financieres',
    src: '/card-images/pertes-financieres.jpg',
  },
  'downtime-impact': {
    alt: "Interruption d'activite",
    src: '/card-images/interruption-activite.jpg',
  },
  'legal-impact': {
    alt: 'Exposition juridique et reglementaire',
    src: '/card-images/exposition-juridique-reglementaire.jpg',
  },
  'reputation-impact': {
    alt: 'Atteinte a la reputation',
    src: '/card-images/atteinte-reputation.jpg',
  },
  'revenue-cover': {
    alt: 'Pertes financieres et perte de revenus',
    src: '/card-images/pertes-financieres-perte-revenus.jpg',
  },
  'incident-experts': {
    alt: 'Experts en reponse aux incidents',
    src: '/card-images/experts-reponse-incidents.jpg',
  },
  'legal-defense': {
    alt: 'Defense juridique et couts reglementaires',
    src: '/card-images/defense-juridique-couts-reglementaires.jpg',
  },
  'crisis-comms': {
    alt: 'Communication de crise et reputation',
    src: '/card-images/communication-crise-reputation.jpg',
  },
  'third-party': {
    alt: 'Dommages aux tiers',
    src: '/card-images/dommages-tiers.jpg',
  },
  'startup-stack': {
    alt: 'TPE et startups',
    src: '/card-images/tpe-startups.jpg',
  },
  'sme-ops': {
    alt: 'PME',
    src: '/card-images/pme.jpg',
  },
  'enterprise-grid': {
    alt: 'ETI et grandes entreprises',
    src: '/card-images/eti-grandes-entreprises.jpg',
  },
  'specialist-focus': {
    alt: "Specialiste de l'assurance cyber",
    src: '/card-images/specialiste-assurance-cyber.jpg',
  },
  'support-247': {
    alt: 'Assistance humaine 24/7',
    src: '/card-images/assistance-humaine-247.jpg',
  },
  'expert-network': {
    alt: "Reseau d'experts",
    src: '/card-images/reseau-experts.jpg',
  },
  'rapid-response': {
    alt: 'Activation rapide',
    src: '/card-images/activation-rapide.jpg',
  },
  'continuity-core': {
    alt: "Priorite a la continuite d'activite",
    src: '/card-images/priorite-continuite-activite.jpg',
  },
};

export default function CardIllustration({ variant }: { variant: CardIllustrationVariant }) {
  const image = cardImages[variant];

  return (
    <div className="relative mb-6 aspect-[16/8.5] overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-950/80">
      <img
        alt={image.alt}
        className="h-full w-full object-cover"
        decoding="async"
        loading="lazy"
        src={image.src}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
    </div>
  );
}
