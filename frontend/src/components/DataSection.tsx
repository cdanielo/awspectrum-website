import { useScrollReveal } from '../hooks/useGSAP';
import Countdown from './Countdown';

export default function DataSection() {
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  return (
    <section id="datos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-100 dark:border-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div ref={leftRef} className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-spectrumPurple">Información General</span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Octubre 2026<br />
              <span className="text-awsOrange">Ciudad de México</span>
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed">
              AWSPECTRUM LATAM se convertirá en el epicentro de la computación inclusiva. Te compartimos los datos clave proyectados para nuestra edición 2026.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80">
              <span className="text-2xl">📍</span>
              <div>
                <h4 className="font-outfit font-bold text-sm text-slate-900 dark:text-white">Ubicación Estratégica</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Ciudad de México, México (Sede híbrida por anunciar)</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80">
              <span className="text-2xl">📅</span>
              <div>
                <h4 className="font-outfit font-bold text-sm text-slate-900 dark:text-white">Fecha Programada</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Mediados de Octubre de 2026</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">👥</span>
                  <h4 className="font-outfit font-bold text-sm text-slate-900 dark:text-white">Audiencia Objetivo</h4>
                </div>
                <span className="text-xs font-bold text-awsOrange">200 - 400 Asistentes</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 via-orange-400 via-green-500 to-blue-500 rounded-full" style={{ width: '75%' }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Aforo de comunidades</span>
                <span>75% Proyectado</span>
              </div>
            </div>
          </div>
        </div>

        <div ref={rightRef} className="lg:col-span-7 flex justify-center">
          <Countdown />
        </div>
      </div>
    </section>
  );
}
