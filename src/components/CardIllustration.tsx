import { cardImages, type CardIllustrationVariant } from '../data/cardImages';

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
        style={{
          filter: image.filter,
          objectPosition: image.objectPosition ?? 'center',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, rgba(2, 6, 23, ${image.overlayOpacity ?? 0.2}), rgba(2, 6, 23, 0.02) 48%, rgba(2, 6, 23, 0))`,
        }}
      />
    </div>
  );
}
