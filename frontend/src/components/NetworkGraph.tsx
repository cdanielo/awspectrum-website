import { useState } from 'react';
import { useScrollReveal } from '../hooks/useGSAP';

const nodeData = {
  center: {
    title: 'AWSPECTRUM Hub',
    desc: 'La intersección central donde la comunidad cloud, las tecnologías emergentes, el sector DevOps y la inclusión convergen en Latinoamérica.',
    color: 'border-l-purple-500',
  },
  aws: {
    title: 'Computación en la Nube & AWS',
    desc: 'Visibilizar las capacidades técnicas en infraestructura cloud, bases de datos resilientes, redes seguras y certificaciones oficiales de AWS.',
    color: 'border-l-orange-400',
  },
  devops: {
    title: 'DevOps & Automatización',
    desc: 'Prácticas de CI/CD, infraestructura como código (Terraform, CloudFormation) y contenedores (Kubernetes/ECS) explicados de forma práctica.',
    color: 'border-l-green-500',
  },
  lgbt: {
    title: 'Diversidad, Talento & Inclusión',
    desc: 'Fortalecer la presencia de la comunidad LGBTQ+ en tech. Becas exclusivas, mentorías directas y generación de entornos libres de sesgos.',
    color: 'border-l-red-500',
  },
  ai: {
    title: 'Inteligencia Artificial y Datos',
    desc: 'Charlas y laboratorios enfocados en el despliegue de modelos de lenguaje, IA generativa (Amazon Bedrock) y ciencia de datos inclusiva.',
    color: 'border-l-blue-500',
  },
};

type NodeKey = keyof typeof nodeData;

const nodes: { key: NodeKey; x: number; y: number; label: string; accent: string }[] = [
  { key: 'center', x: 200, y: 200, label: 'HUB', accent: '#1E293B' },
  { key: 'aws', x: 80, y: 120, label: 'AWS', accent: '#FF9900' },
  { key: 'devops', x: 320, y: 120, label: 'DEVOPS', accent: '#22C55E' },
  { key: 'lgbt', x: 100, y: 280, label: 'TALENTO', accent: '#EF4444' },
  { key: 'ai', x: 300, y: 280, label: 'AI', accent: '#2563EB' },
];

const lines: { x1: number; y1: number; x2: number; y2: number }[] = [
  { x1: 200, y1: 200, x2: 80, y2: 120 },
  { x1: 200, y1: 200, x2: 320, y2: 120 },
  { x1: 200, y1: 200, x2: 100, y2: 280 },
  { x1: 200, y1: 200, x2: 300, y2: 280 },
  { x1: 80, y1: 120, x2: 320, y2: 120 },
  { x1: 100, y1: 280, x2: 300, y2: 280 },
];

export default function NetworkGraph() {
  const [selected, setSelected] = useState<NodeKey>('center');
  const desc = nodeData[selected];

  const graphRef = useScrollReveal();
  const textRef = useScrollReveal();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-100 dark:border-slate-900 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div ref={graphRef} className="lg:col-span-7 flex justify-center relative">
          <div className="w-full max-w-lg aspect-square border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 rounded-3xl p-6 relative select-none">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              {lines.map((l, i) => (
                <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                  strokeWidth={i < 4 ? 1.5 : 1} strokeDasharray={i < 4 ? '4' : undefined} 
                  className="stroke-slate-300 dark:stroke-slate-700" />
              ))}

              {nodes.map((node) => {
                const isCenter = node.key === 'center';
                const isSelected = selected === node.key;
                const r = isCenter ? 45 : 30;
                return (
                  <g key={node.key} className="cursor-pointer" onClick={() => setSelected(node.key)}>
                    {isCenter ? (
                      <circle cx={node.x} cy={node.y} r={r} fill="#1E293B" stroke="url(spectrumGradient)" strokeWidth={isSelected ? 6 : 4}
                        className={`dark:fill-slate-800 drop-shadow-lg transition-all duration-300 ${isSelected ? 'r-48' : ''}`} />
                    ) : (
                      <circle cx={node.x} cy={node.y} r={r} fill="#FFFFFF" stroke={node.accent} strokeWidth={isSelected ? 5 : 3}
                        className="dark:fill-slate-900 drop-shadow-md" />
                    )}
                    <text x={node.x} y={node.y + 4} textAnchor="middle" fill={isCenter ? '#FFFFFF' : '#1E293B'}
                      fontFamily="Outfit, sans-serif" fontWeight="bold"
                      fontSize={isCenter ? 11 : 8} className="dark:fill-white">
                      {node.label}
                    </text>
                  </g>
                );
              })}
              <defs>
                <linearGradient id="spectrumNet" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="25%" stopColor="#F97316" />
                  <stop offset="50%" stopColor="#22C55E" />
                  <stop offset="75%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute top-4 left-4 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-xl px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Interactivo
            </div>
          </div>
        </div>

        <div ref={textRef} className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-spectrumGreen">Ecosistema Colaborativo</span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Community Hub:<br />
              Uniendo Fuerza y Talento
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed">
              AWSPECTRUM funciona como un catalizador en Latinoamérica, entrelazando a múltiples verticales tecnológicas y sociales. Haz clic sobre los nodos del diagrama para explorar cómo interactúan.
            </p>
          </div>

          <div className={`p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 transition-all duration-300 relative ${desc.color} border-l-4`}>
            <h4 className="font-outfit font-bold text-slate-900 dark:text-white text-base mb-2">{desc.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">{desc.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
