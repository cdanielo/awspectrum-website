import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeText() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        xPercent: -30,
        ease: 'linear',
        scrollTrigger: {
          trigger: el,
          scrub: 1.5,
          start: 'top bottom',
          end: 'bottom top',
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full overflow-hidden py-4 border-y border-slate-100 dark:border-slate-800/60 select-none">
      <div ref={marqueeRef} className="flex whitespace-nowrap space-x-12 text-2xl sm:text-3xl font-outfit font-bold uppercase tracking-wider">
        <span className="text-slate-300 dark:text-slate-800/80">&ldquo;The future of cloud is diverse&rdquo;</span>
        <span className="text-slate-300 dark:text-slate-800/80">•</span>
        <span className="logo-gradient">&ldquo;Building visibility in cloud&rdquo;</span>
        <span className="text-slate-300 dark:text-slate-800/80">•</span>
        <span className="text-slate-300 dark:text-slate-800/80">&ldquo;Community-driven cloud culture&rdquo;</span>
        <span className="text-slate-300 dark:text-slate-800/80">•</span>
        <span className="logo-gradient">&ldquo;The future of cloud is diverse&rdquo;</span>
        <span className="text-slate-300 dark:text-slate-800/80">•</span>
        <span className="text-slate-300 dark:text-slate-800/80">&ldquo;Building visibility&rdquo;</span>
      </div>
    </div>
  );
}
