import { useScrollReveal } from '../hooks/useGSAP';

interface SpeakerCardProps {
  icon: string;
  color: string;
  title: string;
  subtitle: string;
  border: string;
}

function SpeakerCard({ icon, title, subtitle, border }: SpeakerCardProps) {
  return (
    <div className={`p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition duration-300 ${border}`}>
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 to-orange-400" />
      <div className="space-y-6">
        <div className="w-full aspect-square bg-slate-200/60 dark:bg-slate-800 rounded-2xl flex items-center justify-center relative overflow-hidden">
          <span className="text-5xl opacity-40">{icon}</span>
          <div className="absolute bottom-2 bg-white/70 dark:bg-slate-900/70 py-1 px-3 rounded-full text-[9px] font-bold text-slate-500 dark:text-slate-300 tracking-wider uppercase">
            Por confirmar
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="font-outfit font-bold text-slate-900 dark:text-white text-base">{title}</h4>
          <p className="text-xs text-slate-400 font-light">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

interface SpeakersSectionProps {
  onOpenModal: (type: 'comunidad' | 'sponsor' | 'charla') => void;
}

export default function SpeakersSection({ onOpenModal }: SpeakersSectionProps) {
  const ref = useScrollReveal();

  return (
    <section id="speakers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-100 dark:border-slate-900">
      <div ref={ref} className="text-center max-w-3xl mx-auto space-y-4 mb-20">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 dark:bg-purple-950/20 text-spectrumPurple border border-purple-200/50 dark:border-purple-900/50">
          Convocatoria Abierta
        </div>
        <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">Nuestros Speakers</h2>
        <p className="text-base text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
          Una cartelera diversa que representa la excelencia técnica y el liderazgo en inclusión en la región.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <SpeakerCard icon="☁️" color="text-slate-500" title="AWS Hero / Community Leader" subtitle="Cloud Architect & Dev Advocate" border="border-red-500" />
        <SpeakerCard icon="🛠️" color="text-slate-500" title="DevOps Engineer Expert" subtitle="Automation & Platform Specialist" border="border-orange-400" />
        <SpeakerCard icon="🤖" color="text-slate-500" title="AI Gen Engineer Expert" subtitle="Machine Learning Lead" border="border-green-500" />

        <div className="p-6 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-4 hover:border-awsOrange dark:hover:border-awsOrange transition duration-300">
          <span className="text-4xl animate-bounce">📢</span>
          <div className="space-y-1">
            <h4 className="font-outfit font-extrabold text-slate-900 dark:text-white text-base">¿Quieres proponer una charla?</h4>
            <p className="text-xs text-slate-400 font-light">Buscamos contenido sobre AWS, Kubernetes, Serverless, Diversidad y más.</p>
          </div>
          <button onClick={() => onOpenModal('charla')} className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-awsOrange hover:bg-awsOrangeHover shadow-md">
            Postularse ahora
          </button>
        </div>
      </div>
    </section>
  );
}
