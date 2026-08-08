import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useGSAP';

interface MerchItem {
  name: string;
  price: string;
  description: string;
  gradient: string;
}

const merch: MerchItem[] = [
  { name: 'Hoodie AWSPECTRUM', price: '$45', description: 'Felpa premium con logo bordado.', gradient: 'from-orange-500 to-rose-500' },
  { name: 'T-Shirt Edición Limitada', price: '$25', description: 'Algogón orgánico, diseño exclusivo 2026.', gradient: 'from-amber-400 to-orange-600' },
  { name: 'Tote Bag Cloud', price: '$15', description: 'Lona resistente con arte de la nube.', gradient: 'from-sky-500 to-indigo-500' },
  { name: 'Stickers Pack', price: '$8', description: 'Set de stickers colección LGBTQ+ cloud.', gradient: 'from-violet-500 to-fuchsia-500' },
  { name: 'Gorra Embroidered', price: '$20', description: 'Gorra clásica con parche bordado.', gradient: 'from-emerald-500 to-teal-500' },
  { name: 'Mug Diversity', price: '$12', description: 'Taza de cerámica con arte inclusivo.', gradient: 'from-rose-500 to-pink-500' },
];

export default function MerchCarousel() {
  const revealRef = useScrollReveal();
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section id="merch" ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-100 dark:border-slate-900">
      <div className="space-y-8">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-awsOrange">Merch & Memorabilia</span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Llévate la comunidad<br />contigo
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-xl">
              Colección exclusiva AWSPECTRUM. Próximamente disponible en línea y durante el evento.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Ver productos anteriores"
              className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:border-awsOrange hover:text-awsOrange transition flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Ver más productos"
              className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:border-awsOrange hover:text-awsOrange transition flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
        >
          {merch.map((item, i) => (
            <article
              key={i}
              className="group flex-shrink-0 w-[280px] snap-start rounded-3xl bg-white dark:bg-darkCard border border-slate-200 dark:border-slate-800/80 overflow-hidden transition hover:shadow-xl hover:shadow-orange-500/5"
            >
              <div className={`aspect-[4/3] bg-gradient-to-br ${item.gradient} relative flex items-center justify-center`}>
                <span className="text-4xl text-white/90 font-outfit font-black tracking-tighter drop-shadow-md">{'AWS'}</span>
                <span className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-white/20 backdrop-blur-sm text-[9px] font-bold text-white uppercase tracking-wider">
                  Merch 2026
                </span>
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-outfit font-bold text-sm text-slate-900 dark:text-white">{item.name}</h3>
                  <span className="text-xs font-extrabold text-awsOrange">{item.price}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
