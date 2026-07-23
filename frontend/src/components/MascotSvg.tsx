import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import confetti from 'canvas-confetti';

export default function MascotSvg() {
  const armRef = useRef<SVGGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [greeting, setGreeting] = useState('¡Salúdame!');

  const triggerGreeting = () => {
    if (!armRef.current || !containerRef.current) return;
    const arm = armRef.current;
    const container = containerRef.current;

    gsap.to(arm, { opacity: 1, duration: 0.15 });
    gsap.to(arm, {
      rotation: 25, duration: 0.15, repeat: 5, yoyo: true, ease: 'power1.inOut',
      onComplete: () => gsap.to(arm, { opacity: 0, duration: 0.3, delay: 0.2 }),
    });
    gsap.to(container, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 });

    const rect = container.getBoundingClientRect();
    confetti({
      particleCount: 50, spread: 50,
      origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
      colors: ['#EF4444', '#F97316', '#22C55E', '#2563EB', '#7C3AED'],
    });

    setGreeting('¡Hola! 🌈');
    setTimeout(() => setGreeting('¡Salúdame!'), 2000);
  };

  return (
    <div ref={containerRef} onClick={triggerGreeting} className="w-full h-full">
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
        <path
          id="mascotCloudBody"
          d="M50 120 C30 120 20 100 30 80 C30 60 50 40 80 40 C95 20 130 20 150 50 C170 50 180 70 175 90 C175 110 155 120 140 120 L50 120 Z"
          fill="#FFFFFF" stroke="url(#spectrumGradient)" strokeWidth={7}
          className="dark:fill-slate-900"
        />

        <g ref={armRef} className="origin-[60px_90px]" opacity={0}>
          <path d="M60 90 C45 88 35 75 40 65 C45 55 58 55 60 70" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth={2} className="dark:fill-slate-100" />
          <path d="M60 90 C45 88 35 75 40 65 C45 55 58 55 60 70" fill="none" stroke="#CBD5E1" strokeWidth={2} className="dark:stroke-slate-700" />
        </g>

        <g id="mascotFace">
          <path d="M84 75 Q90 69 96 75" stroke="#1E293B" strokeWidth={5} strokeLinecap="round" fill="none" className="dark:stroke-white" />
          <path d="M114 75 Q120 69 126 75" stroke="#1E293B" strokeWidth={5} strokeLinecap="round" fill="none" className="dark:stroke-white" />
          <path d="M80 87 Q104 102 124 87" stroke="#FF9900" strokeWidth={6} strokeLinecap="round" fill="none" />
          <path d="M121 82 L125 88 L117 91" stroke="#FF9900" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        <defs>
          <linearGradient id="spectrumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="25%" stopColor="#F97316" />
            <stop offset="50%" stopColor="#22C55E" />
            <stop offset="75%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute bottom-4 right-0 z-50 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl py-2.5 px-4 shadow-xl text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:scale-105 transition duration-300 tracking-wide uppercase flex items-center gap-2 cursor-pointer">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse-slow" />
        <span>{greeting}</span>
      </div>
    </div>
  );
}
