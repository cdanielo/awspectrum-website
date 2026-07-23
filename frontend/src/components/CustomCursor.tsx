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

    const interactive = 'a, button, select, input, textarea, [onclick]';
    const onEnter = () => {
      cursor.classList.add('w-12', 'h-12', 'bg-awsOrange/10', 'border-awsOrange');
    };
    const onLeave = () => {
      cursor.classList.remove('w-12', 'h-12', 'bg-awsOrange/10', 'border-awsOrange');
    };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll(interactive).forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="hidden lg:block fixed w-8 h-8 rounded-full pointer-events-none z-50 border-2 border-awsOrange/20 -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color] duration-300 mix-blend-difference bg-white/5"
    />
  );
}
