import { cardImages, type CardImageConfig, type CardIllustrationVariant } from '../data/cardImages';

type CardIllustrationProps = {
  image?: CardImageConfig;
  variant?: CardIllustrationVariant;
};

export default function CardIllustration({ image: imageOverride, variant }: CardIllustrationProps) {
  const image = imageOverride ?? (variant ? cardImages[variant] : null);

  if (!image) {
    return null;
  }

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
