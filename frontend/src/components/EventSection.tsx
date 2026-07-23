import { useScrollReveal } from '../hooks/useGSAP';

const cards = [
  {
    icon: '🎤', color: 'text-red-500', bg: 'bg-red-500/10',
    title: 'Keynotes & Panels',
    desc: 'Conversaciones y ponencias magistrales dirigidas por expertos de la industria, arquitectos cloud certificados y defensores globales de la inclusión tecnológica.',
    accent: 'text-red-500',
  },
  {
    icon: '🛠️', color: 'text-awsOrange', bg: 'bg-orange-500/10',
    title: 'Workshops Prácticos',
    desc: 'Laboratorios enfocados en computación serverless, bases de datos resilientes, DevOps, IA generativa y la preparación para las certificaciones oficiales de AWS.',
    accent: 'text-awsOrange',
  },
  {
    icon: '🌈', color: 'text-green-500', bg: 'bg-green-500/10',
    title: 'Community Hub',
    desc: 'Espacios exclusivos para el diálogo, donde comunidades tecnológicas e iniciativas sociales conectan para debatir estrategias de inserción laboral diversa.',
    accent: 'text-green-500',
  },
  {
    icon: '🤝', color: 'text-blue-500', bg: 'bg-blue-500/10',
    title: 'Sponsor Area',
    desc: 'Zonas de networking corporativo que reúnen a empresas dispuestas a capacitar y contratar perfiles talentosos e inclusivos dentro del ecosistema cloud.',
    accent: 'text-blue-500',
  },
];

export default function EventSection() {
  const headerRef = useScrollReveal();

  return (
    <section id="evento" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-100 dark:border-slate-900">
      <div ref={headerRef} className="text-center max-w-3xl mx-auto space-y-4 mb-20">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-50 dark:bg-orange-950/20 text-awsOrange border border-orange-200/50 dark:border-orange-900/50">
          Ejes del Evento
        </div>
        <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Un Evento Diseñado para Impactar
        </h2>
        <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
          Combinamos el rigor de la innovación técnica con la calidez comunitaria de la diversidad en un summit único.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, i) => (
          <div key={i} className="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 shadow-sm spectrum-shadow-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-6">
              <div className={`w-12 h-12 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center text-2xl group-hover:scale-110 transition duration-300`}>
                {card.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-outfit font-extrabold text-lg text-slate-900 dark:text-white">{card.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">{card.desc}</p>
              </div>
            </div>
            <div className="pt-6">
              <span className={`text-xs font-semibold ${card.accent} group-hover:underline flex items-center gap-1`}>
                Conocer más <span className="group-hover:translate-x-1 transition duration-200">→</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
