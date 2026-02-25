import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Camille D.',
    role: 'Directrice generale, secteur tech',
    summary: 'Une prise en charge rapide apres un incident critique.',
    videoSrc: '/temoignage-1.mp4',
  },
  {
    name: 'Hugo L.',
    role: 'CFO, e-commerce',
    summary: "L'assurance a absorbe l'impact financier d'une attaque.",
    videoSrc: '/temoignage-2.mp4',
  },
  {
    name: 'Nadia R.',
    role: 'Operations, sante',
    summary: 'Un accompagnement clair et humain du debut a la fin.',
    videoSrc: '/temoignage-3.mp4',
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  const goPrev = () => {
    setActiveIndex((index) => (index - 1 + testimonials.length) % testimonials.length);
  };

  const goNext = () => {
    setActiveIndex((index) => (index + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="bg-slate-950 py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 text-cyan-400 mb-5">
            <Quote className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wider uppercase">Temoignages clients</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ils racontent leur experience
          </h2>
          <p className="text-lg text-gray-400">
            Des retours concrets de dirigeants assures apres incident.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/20 rounded-2xl p-6 md:p-10 shadow-2xl shadow-cyan-500/10">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900/60 border border-white/5 flex items-center justify-center text-center p-6">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-wider text-cyan-400">Video de temoignage</p>
                <p className="text-lg text-white font-semibold">Ajoutez votre video ici</p>
                <p className="text-sm text-gray-400">Remplacez ce bloc par votre lecteur video.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-2xl font-semibold text-white">{active.name}</p>
                <p className="text-sm uppercase tracking-wider text-cyan-400">{active.role}</p>
              </div>
              <p className="text-lg text-gray-300">{active.summary}</p>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex items-center justify-center w-11 h-11 rounded-full border border-cyan-400/40 text-cyan-200 hover:border-cyan-300 hover:text-white transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="flex items-center justify-center w-11 h-11 rounded-full border border-cyan-400/40 text-cyan-200 hover:border-cyan-300 hover:text-white transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-400">
                  {activeIndex + 1} / {testimonials.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
