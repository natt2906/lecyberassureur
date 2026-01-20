import { ArrowRight, Phone, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const videos = [
    '/Le_cyberassureur_1.mp4',
    '/Le_cyberassureur_2.mp4',
    '/Le_cyberassureur_3.mp4',
    '/Le_cyberassureur_4.mp4',
    '/Le_cyberassureur_5.mp4',
  ];
  const FADE_DURATION_SECONDS = 0.6;
  const [activeSlot, setActiveSlot] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isFading, setIsFading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const videoRefs = [useRef<HTMLVideoElement | null>(null), useRef<HTMLVideoElement | null>(null)];
  const stickySentinelRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const stickyStartOffset = 24;

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const activeVideo = videoRefs[activeSlot].current;
    const inactiveVideo = videoRefs[activeSlot === 0 ? 1 : 0].current;

    if (activeVideo) {
      activeVideo.muted = isMuted;
      activeVideo.play().catch(() => {});
    }
    if (inactiveVideo) {
      inactiveVideo.muted = true;
      if (!isFading) {
        inactiveVideo.pause();
      }
    }
  }, [activeSlot, isMuted, isFading]);

  useEffect(() => {
    if (!isMuted) {
      return;
    }

    const enableSound = () => {
      const activeVideo = videoRefs[activeSlot].current;
      setIsMuted(false);
      if (activeVideo) {
        activeVideo.muted = false;
        activeVideo.play().catch(() => {});
      }
      window.removeEventListener('scroll', enableSound);
      window.removeEventListener('touchmove', enableSound);
    };

    window.addEventListener('scroll', enableSound, { passive: true });
    window.addEventListener('touchmove', enableSound, { passive: true });

    return () => {
      window.removeEventListener('scroll', enableSound);
      window.removeEventListener('touchmove', enableSound);
    };
  }, [isMuted]);

  useEffect(() => {
    const sentinel = stickySentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: `-${stickyStartOffset}px 0px 0px 0px`,
      }
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleTimeUpdate = (slot: number) => {
    if (isFading) {
      return;
    }

    const currentVideo = videoRefs[slot].current;
    if (!currentVideo || !Number.isFinite(currentVideo.duration)) {
      return;
    }

    const remaining = currentVideo.duration - currentVideo.currentTime;
    if (remaining <= FADE_DURATION_SECONDS) {
      const nextSlot = slot === 0 ? 1 : 0;
      const prevSlot = slot;
      const nextVideo = videoRefs[nextSlot].current;
      if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.muted = true;
        nextVideo.play().catch(() => {});
      }

      setIsFading(true);
      setActiveSlot(nextSlot);
      window.setTimeout(() => {
        const followingIndex = (nextIndex + 1) % videos.length;
        setCurrentIndex(nextIndex);
        setNextIndex(followingIndex);
        setIsFading(false);
        const previousVideo = videoRefs[prevSlot].current;
        if (previousVideo) {
          previousVideo.pause();
        }
      }, FADE_DURATION_SECONDS * 1000);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDYsIDE4MiwgMjEyLCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/20">
                Spécialiste de l'assurance cyber
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Les cyberattaques sont inévitables.
              <span className="block text-cyan-400 mt-2">Les pertes financières ne le sont pas.</span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Une assurance cyber conçue pour absorber les pertes financières, protéger votre activité et sécuriser votre entreprise après un incident cyber.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={scrollToForm}
                className="group bg-cyan-500 hover:bg-cyan-600 text-slate-950 px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
              >
                <span>Obtenir mon diagnostic d'exposition cyber</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToForm}
                className="border-2 border-cyan-400/50 hover:border-cyan-400 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Parler avec un expert</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"></div>
            <div ref={stickySentinelRef} className="h-0 w-full"></div>
            <div className="relative w-full aspect-video rounded-2xl">
              <div
                ref={videoContainerRef}
                onClick={() => setIsMuted((value) => !value)}
                className={`rounded-2xl overflow-hidden transition-shadow duration-300 cursor-pointer ${
                  isSticky
                    ? 'fixed top-24 right-6 z-50 w-64 sm:w-72 lg:w-80 aspect-video shadow-2xl border border-white/10 bg-slate-950/80'
                    : 'relative h-full w-full'
                }`}
              >
                {[0, 1].map((slot) => (
                  <video
                    key={slot}
                    ref={videoRefs[slot]}
                    className={`absolute inset-0 h-full w-full object-cover object-[50%_20%] transition-opacity duration-700 pointer-events-none ${
                      slot === activeSlot ? 'opacity-100' : 'opacity-0'
                    }`}
                    autoPlay
                    muted={isMuted}
                    playsInline
                    poster="/hero-cyber.png"
                    preload="metadata"
                    onTimeUpdate={() => handleTimeUpdate(slot)}
                  >
                    <source src={videos[slot === activeSlot ? currentIndex : nextIndex]} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de la video.
                  </video>
                ))}
                <div
                  aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
                  className="absolute bottom-3 right-3 bg-slate-900/80 text-white p-2 rounded-full border border-white/10 transition"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
