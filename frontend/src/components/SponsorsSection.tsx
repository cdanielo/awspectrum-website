import { useScrollReveal } from '../hooks/useGSAP';

interface Sponsor {
  icon: string;
  label: string;
  hoverColor: string;
}

const sponsors: Sponsor[] = [
  { icon: '☁️', label: 'Cloud Partner', hoverColor: 'border-red-500' },
  { icon: '🤝', label: 'Inclusion Org', hoverColor: 'border-orange-500' },
  { icon: '🚀', label: 'Edu Partner', hoverColor: 'border-green-500' },
  { icon: '💻', label: 'Tech Ally', hoverColor: 'border-blue-500' },
  { icon: '🌟', label: 'Media Partner', hoverColor: 'border-purple-500' },
  { icon: '🌈', label: 'Local Hub', hoverColor: 'border-orange-500' },
];

interface SponsorsSectionProps {
  onOpenModal: (type: 'comunidad' | 'sponsor' | 'charla' | 'contactGeneral') => void;
}

export default function SponsorsSection({ onOpenModal }: SponsorsSectionProps) {
  const left = useScrollReveal();
  const right = useScrollReveal();

  return (
    <section id="sponsors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-100 dark:border-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div ref={left} className="lg:col-span-5 space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-awsOrange">Patrocinadores & Aliados</span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Aliados de la Nube<br />
              y la Inclusión
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light">
              Organizaciones y empresas líderes que respaldan activamente el talento diverso y el desarrollo tecnológico inclusivo en toda la región.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 space-y-4">
            <h4 className="font-outfit font-bold text-sm text-slate-900 dark:text-white">Conviértete en Aliado Estratégico</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
              Obtén visibilidad ante constructores cloud calificados, apoya becas y destaca como marca inclusiva.
            </p>
            <button onClick={() => onOpenModal('sponsor')} className="inline-flex items-center justify-center px-5 py-3 rounded-xl text-xs font-semibold text-white bg-awsOrange hover:bg-awsOrangeHover shadow-md shadow-orange-500/10 active:scale-95 transition-all duration-200">
              Convertirse en Aliado
            </button>
          </div>
        </div>
        <div ref={right} className="lg:col-span-7">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {sponsors.map((s, i) => (
              <div key={i} className={`aspect-video p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 ${s.hoverColor} dark:hover:bg-slate-900/80 transition duration-300 group cursor-pointer`}>
                <span className="text-3xl opacity-50 group-hover:scale-110 transition duration-300">{s.icon}</span>
                <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
