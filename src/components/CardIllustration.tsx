import { cardImages, type CardIllustrationVariant } from '../data/cardImages';

export default function CardIllustration({ variant }: { variant: CardIllustrationVariant }) {
  const image = cardImages[variant];

  return (
    <div className="site-card__media">
      <img
        alt={image.alt}
        className="site-card__media-image"
        decoding="async"
        loading="lazy"
        src={image.src}
        style={{
          filter: image.filter,
          objectPosition: image.objectPosition ?? 'center',
        }}
      />
      <div
        className="site-card__media-overlay"
        style={{
          background: `linear-gradient(to top, rgba(2, 6, 23, ${image.overlayOpacity ?? 0.2}), rgba(2, 6, 23, 0.02) 48%, rgba(2, 6, 23, 0))`,
        }}
      />
    </div>
  );
}
