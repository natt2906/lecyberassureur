type PageFeatureImageProps = {
  src: string;
  alt: string;
};

export default function PageFeatureImage({ src, alt }: PageFeatureImageProps) {
  return (
    <section className="site-section site-section--compact">
      <div className="site-section__container">
        <div className="topic-page__feature-media">
          <img
            src={src}
            alt={alt}
            className="topic-page__feature-media-image"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
