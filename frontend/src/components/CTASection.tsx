import MarqueeText from './MarqueeText';
import { useScrollReveal } from '../hooks/useGSAP';

interface CTASectionProps {
  onOpenModal: (type: 'comunidad' | 'charla' | 'contactGeneral') => void;
}

export default function CTASection({ onOpenModal }: CTASectionProps) {
  const ref = useScrollReveal();

  return (
    <section className="py-24 border-t border-slate-100 dark:border-slate-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-12">
        <MarqueeText />
        <div ref={ref} className="max-w-2xl mx-auto space-y-6">
          <h3 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            ¿Listo para formar parte de la historia?
          </h3>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-light">
            Colabora, únete como asistente, postúlate como speaker o impulsa la inclusión tecnológica como sponsor.
            Cada contribución expande el espectro.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button onClick={() => onOpenModal('comunidad')}
              className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-awsOrange hover:bg-awsOrangeHover shadow-lg">
              Unirse
            </button>
            <button onClick={() => onOpenModal('charla')}
              className="px-6 py-3.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/50">
              Colaborar
            </button>
            <button onClick={() => onOpenModal('contactGeneral')}
              className="px-6 py-3.5 rounded-xl text-sm font-bold text-slate-500 hover:text-awsOrange">
              Contactar
            </button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
    </section>
  );
}
