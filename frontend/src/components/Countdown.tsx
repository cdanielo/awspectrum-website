import { useCountdown } from '../hooks/useCountdown';

export default function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown();

  const boxes = [
    { id: 'cdDays', value: days, label: 'Días' },
    { id: 'cdHours', value: hours, label: 'Horas' },
    { id: 'cdMinutes', value: minutes, label: 'Minutos' },
    { id: 'cdSeconds', value: seconds, label: 'Segundos', isSeconds: true },
  ];

  return (
    <div className="w-full max-w-xl p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 spectrum-shadow text-center relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-400/5 rounded-full filter blur-xl" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-purple-400/5 rounded-full filter blur-xl" />

      <span className="text-xs font-bold text-awsOrange uppercase tracking-widest block mb-4">El futuro se construye hoy</span>
      <h3 className="font-outfit text-2xl font-extrabold text-slate-900 dark:text-white mb-8">Cuenta regresiva para la cumbre</h3>

      <div className="grid grid-cols-4 gap-4 sm:gap-6">
        {boxes.map(b => (
          <div key={b.id} className="p-3 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-md relative overflow-hidden group">
            {b.isSeconds && (
              <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 to-purple-600" />
            )}
            <span className={`block font-outfit font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white ${b.isSeconds ? 'text-awsOrange' : ''}`}>
              {b.value}
            </span>
            <span className="block text-[9px] sm:text-xxs font-bold text-slate-400 uppercase tracking-widest mt-1">{b.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-slate-400 font-light">¿Quieres ser speaker o sponsor? Agenda de registro abierta.</span>
        <a href="#sponsors" className="inline-flex items-center text-xs font-bold text-awsOrange hover:underline gap-1">
          Registrar mi interés <span>→</span>
        </a>
      </div>
    </div>
  );
}
