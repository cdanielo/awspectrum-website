import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = ref.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const interactive = 'a, button, select, input, textarea, [data-cursor-interactive]';
    const onEnter = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.(interactive)) {
        cursor.classList.add('w-12', 'h-12', 'bg-awsOrange/10', 'border-awsOrange');
      } else {
        onLeave();
      }
    };
    const onLeave = () => {
      cursor.classList.remove('w-12', 'h-12', 'bg-awsOrange/10', 'border-awsOrange');
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', (e) => {
      const related = e.relatedTarget as Node | null;
      if (!related || !(e.target as Element | null)?.closest?.(interactive)) return;
      if (!(related as Element | null)?.closest?.(interactive)) {
        onLeave();
      }
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hidden lg:block fixed w-8 h-8 rounded-full pointer-events-none z-50 border-2 border-awsOrange/20 -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color] duration-300 mix-blend-difference bg-white/5"
    />
  );
}
