import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import MascotSvg from './MascotSvg';

interface HeroSectionProps {
  onOpenModal: (type: 'comunidad' | 'sponsor' | 'charla') => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const badgesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(badgesRef.current, { opacity: 0, y: -20, duration: 0.6, ease: 'power2.out' });
      gsap.from(titleRef.current, { opacity: 0, x: -30, duration: 0.8, delay: 0.2, ease: 'power2.out' });
      gsap.from(subtitleRef.current, { opacity: 0, x: -30, duration: 0.8, delay: 0.35, ease: 'power2.out' });
      gsap.from(descRef.current, { opacity: 0, y: 20, duration: 0.8, delay: 0.5, ease: 'power2.out' });
      gsap.from(actionsRef.current, { opacity: 0, y: 20, duration: 0.8, delay: 0.65, ease: 'power2.out' });
      gsap.from(visualRef.current, { opacity: 0, scale: 0.8, duration: 1, delay: 0.3, ease: 'back.out(1.7)' });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 md:pt-20 md:pb-32 flex flex-col md:flex-row items-center gap-12 md:gap-16">
      <div className="flex-1 text-center md:text-left space-y-6">
        <div ref={badgesRef} className="flex flex-wrap justify-center md:justify-start gap-3">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-red-50 dark:bg-red-950/30 text-red-500 border border-red-200/50 dark:border-red-900/50 shadow-sm">
            ☁️ Cloud
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border border-green-200/50 dark:border-green-900/50 shadow-sm">
            👥 Community
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-900/50 shadow-sm">
            🌈 Diversity
          </span>
        </div>

        <h1 ref={titleRef} className="font-outfit text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-none text-slate-900 dark:text-white">
          AWSPECTRUM<br />
          <span className="logo-gradient">LATAM 2026</span>
        </h1>

        <p ref={subtitleRef} className="font-outfit text-lg sm:text-xl font-bold text-slate-600 dark:text-slate-300 tracking-wide flex items-center justify-center md:justify-start space-x-2">
          <span>Cloud</span> <span className="text-awsOrange">•</span>
          <span>Community</span> <span className="text-awsOrange">•</span>
          <span>Diversity</span>
        </p>

        <p ref={descRef} className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed font-light">
          AWSPECTRUM es una iniciativa comunitaria enfocada en visibilizar, educar y fortalecer la participación de la comunidad{' '}
          <span className="font-semibold text-slate-700 dark:text-slate-200 underline decoration-indigo-400/60 decoration-2">LGBTQ+</span>{' '}
          dentro del ecosistema de AWS y tecnologías cloud en Latinoamérica.
        </p>

        <div ref={actionsRef} className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
          <button onClick={() => onOpenModal('comunidad')} className="inline-flex items-center justify-center px-7 py-4 rounded-xl text-sm font-semibold text-white bg-awsOrange hover:bg-awsOrangeHover shadow-xl shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
            Únete a la comunidad
          </button>
          <button onClick={() => onOpenModal('sponsor')} className="inline-flex items-center justify-center px-7 py-4 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/50 shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
            Convertirse en sponsor
          </button>
          <button onClick={() => onOpenModal('charla')} className="inline-flex items-center justify-center px-7 py-4 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-awsOrange dark:hover:text-awsOrange transition-colors duration-200">
            Proponer charla
          </button>
        </div>
      </div>

      <div ref={visualRef} className="flex-1 w-full max-w-md md:max-w-lg flex justify-center items-center relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-400/10 via-green-400/10 to-blue-400/10 rounded-full filter blur-2xl opacity-80 pointer-events-none scale-90" />
        <div className="relative w-80 h-80 sm:w-96 sm:h-96 animate-float-slow select-none group cursor-pointer">
          <MascotSvg />
        </div>
      </div>
    </section>
  );
}
