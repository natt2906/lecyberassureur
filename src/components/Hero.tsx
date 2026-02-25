import { ArrowRight, Phone, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const videos = ['/question1.mp4', '/question2.mp4', '/question3.mp4', '/question4.mp4'];
  const FADE_DURATION_SECONDS = 0.7;
  const [activeSlot, setActiveSlot] = useState(0);
  const [slotIndices, setSlotIndices] = useState([0, 1]);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = [useRef<HTMLVideoElement | null>(null), useRef<HTMLVideoElement | null>(null)];
  const slotIndicesRef = useRef([0, 1]);
  const crossfadeTimeoutRef = useRef<number | null>(null);

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    slotIndicesRef.current = slotIndices;
  }, [slotIndices]);

  useEffect(() => {
    const activeVideo = videoRefs[activeSlot].current;
    const inactiveVideo = videoRefs[activeSlot === 0 ? 1 : 0].current;

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
  }, [activeSlot, isMuted, isCrossfading, videoRefs]);

  const handleTimeUpdate = (slot: number) => {
    if (isCrossfading || slot !== activeSlot) {
      return;
    }

    const currentVideo = videoRefs[slot].current;
    if (!currentVideo || !Number.isFinite(currentVideo.duration)) {
      return;
    }

    const remaining = currentVideo.duration - currentVideo.currentTime;
    if (remaining <= FADE_DURATION_SECONDS) {
      const nextSlot = slot === 0 ? 1 : 0;
      const nextVideo = videoRefs[nextSlot].current;
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
        const prevVideo = videoRefs[slot].current;
        if (prevVideo) {
          prevVideo.pause();
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
                Le Cyberassureur, hero sans masque
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Le courtier spécialisé en cyberassurance
              <span className="block text-cyan-400 mt-2">qui accompagne ses clients quelle que soit la situation.</span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Le Cyberassureur est un hero transparent : pas de masque, pas de jargon. Il vous guide avant, pendant et après un incident pour protéger votre activité et vos finances.
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
            <div
              className="relative w-full max-w-xs lg:max-w-sm aspect-[9/16] rounded-2xl bg-slate-900/60 border border-white/5 overflow-hidden mx-auto lg:ml-auto"
              onClick={() => setIsMuted((value) => !value)}
            >
              {[0, 1].map((slot) => (
                <video
                  key={`${slot}-${slotIndices[slot]}`}
                  ref={videoRefs[slot]}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                    slot === activeSlot ? 'opacity-100' : 'opacity-0'
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
              <div className="absolute bottom-3 right-3 bg-slate-900/80 text-white p-2 rounded-full border border-white/10 transition">
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
