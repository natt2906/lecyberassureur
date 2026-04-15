import { ArrowRight, Phone, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const videos = ['/question1.mp4', '/question2.mp4', '/question3.mp4', '/question4.mp4'];
  const FADE_DURATION_SECONDS = 0.7;
  const [activeSlot, setActiveSlot] = useState(0);
  const [slotIndices, setSlotIndices] = useState([0, 1]);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([null, null]);
  const slotIndicesRef = useRef([0, 1]);
  const crossfadeTimeoutRef = useRef<number | null>(null);

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    slotIndicesRef.current = slotIndices;
  }, [slotIndices]);

  useEffect(() => {
    const activeVideo = videoRefs.current[activeSlot];
    const inactiveVideo = videoRefs.current[activeSlot === 0 ? 1 : 0];

    if (activeVideo) {
      activeVideo.muted = isMuted;
      activeVideo.play().catch(() => {});
    }
    if (inactiveVideo) {
      inactiveVideo.muted = true;
      if (!isCrossfading) {
        inactiveVideo.pause();
      }
    }
  }, [activeSlot, isMuted, isCrossfading]);

  const handleTimeUpdate = (slot: number) => {
    if (isCrossfading || slot !== activeSlot) {
      return;
    }

    const currentVideo = videoRefs.current[slot];
    if (!currentVideo || !Number.isFinite(currentVideo.duration)) {
      return;
    }

    const remaining = currentVideo.duration - currentVideo.currentTime;
    if (remaining <= FADE_DURATION_SECONDS) {
      const nextSlot = slot === 0 ? 1 : 0;
      const nextVideo = videoRefs.current[nextSlot];
      if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.muted = true;
        nextVideo.play().catch(() => {});
      }

      setIsCrossfading(true);
      setActiveSlot(nextSlot);

      if (crossfadeTimeoutRef.current !== null) {
        window.clearTimeout(crossfadeTimeoutRef.current);
      }
      crossfadeTimeoutRef.current = window.setTimeout(() => {
        setSlotIndices((current) => {
          const updated = [...current];
          const followingIndex = (slotIndicesRef.current[nextSlot] + 1) % videos.length;
          updated[slot] = followingIndex;
          return updated;
        });
        setIsCrossfading(false);
        const prevVideo = videoRefs.current[slot];
        if (prevVideo) {
          prevVideo.pause();
        }
      }, FADE_DURATION_SECONDS * 1000);
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-grid-overlay hero-section__grid-overlay"></div>

      <div className="hero-section__container">
        <div className="hero-section__grid">
          <div className="hero-section__content">
            <div className="hero-section__eyebrow-wrap">
              <span className="hero-section__eyebrow">
                Le Cyberassureur, hero sans masque
              </span>
            </div>

            <h1 className="hero-section__title">
              Ne laissez pas une cyberattaque couler votre entreprise.
            </h1>

            <p className="hero-section__description">
              L'assurance qui rembourse vos pertes d'exploitation et finance votre remise en état. Une protection 100% financière pour les TPE/PME.
            </p>

            <div className="hero-section__actions">
              <button
                onClick={scrollToForm}
                className="hero-section__primary-button"
              >
                <span>Estimer ma protection financière</span>
                <ArrowRight className="hero-section__button-icon hero-section__button-icon--shift" />
              </button>

              <button
                onClick={scrollToForm}
                className="hero-section__secondary-button"
              >
                <Phone className="hero-section__button-icon" />
                <span>Parler avec un expert</span>
              </button>
            </div>
          </div>

          <div className="hero-section__media">
            <div className="hero-section__media-glow"></div>
            <div
              className="hero-section__video-shell"
              onClick={() => setIsMuted((value) => !value)}
            >
              {[0, 1].map((slot) => (
                <video
                  key={`${slot}-${slotIndices[slot]}`}
                  ref={(node) => {
                    videoRefs.current[slot] = node;
                  }}
                  className={`hero-section__video ${
                    slot === activeSlot ? 'hero-section__video--active' : ''
                  }`}
                  autoPlay
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  onTimeUpdate={() => handleTimeUpdate(slot)}
                >
                  <source src={videos[slotIndices[slot]]} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de la video.
                </video>
              ))}
              <div className="hero-section__mute-indicator">
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
