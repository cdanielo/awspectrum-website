import { useScrollReveal } from '../hooks/useGSAP';

export default function AboutSection() {
  const ref = useScrollReveal();

  return (
    <section id="sobre" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-100 dark:border-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div ref={ref} className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="h-1.5 w-24 bg-gradient-to-r from-red-500 via-orange-400 via-green-500 to-blue-500 rounded-full" />
            <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              ¿Qué es AWSPECTRUM?
            </h2>
          </div>

          <div className="prose prose-slate dark:prose-invert space-y-5 text-slate-600 dark:text-slate-400 leading-relaxed font-light text-base">
            <p>
              AWSPECTRUM es el primer espacio comunitario formalmente articulado en Latinoamérica enfocado en visibilizar, educar y crear redes de valor para la comunidad{' '}
              <span className="font-semibold text-slate-800 dark:text-slate-200">LGBTQ+</span>{' '}
              que forma parte o aspira a integrarse al sector de tecnologías cloud y, en específico, al ecosistema global de{' '}
              <strong className="font-bold text-slate-800 dark:text-slate-200">Amazon Web Services (AWS)</strong>.
            </p>
            <p>
              El proyecto nace bajo el firme propósito de romper barreras culturales y de acceso dentro de la industria tecnológica de la región, facilitando que profesionales junior, experimentados, estudiantes y entusiastas se encuentren en un entorno libre de sesgos.
            </p>
            <p>
              Aquí, la <strong className="font-bold text-slate-800 dark:text-slate-200">excelencia técnica en computación en la nube</strong> convive armónicamente con la{' '}
              <strong className="font-bold text-slate-800 dark:text-slate-200">inclusión y la diversidad</strong>, demostrando que los equipos más representativos son los que diseñan y construyen la mejor infraestructura para el futuro digital.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-2">
              <span className="text-2xl">🎓</span>
              <h3 className="font-outfit font-bold text-sm text-slate-900 dark:text-white">Educación Accesible</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light">Facilitamos becas, bootcamps y mentorías en tecnologías de la nube.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-2">
              <span className="text-2xl">✨</span>
              <h3 className="font-outfit font-bold text-sm text-slate-900 dark:text-white">Visibilidad Activa</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light">Destacamos historias de éxito y liderazgo diverso en roles cloud.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-2">
              <span className="text-2xl">🤝</span>
              <h3 className="font-outfit font-bold text-sm text-slate-900 dark:text-white">Conexión Segura</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light">Alianzas directas con sponsors alineados a nuestros valores.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 spectrum-shadow relative overflow-hidden group">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-500 via-orange-400 via-green-500 to-blue-500" />
            <div className="space-y-6">
              <span className="text-5xl font-serif text-slate-200 dark:text-slate-800 block leading-none select-none">&ldquo;</span>
              <p className="text-slate-600 dark:text-slate-300 italic font-light leading-relaxed text-sm">
                &ldquo;AWSPECTRUM no nace únicamente para hacer networking; nace como un puente de oportunidades reales. Queremos que cada profesional LGBTQ+ en LATAM sepa que su identidad es un valor agregado y que la nube es lo suficientemente amplia para albergar el talento de todos.&rdquo;
              </p>
              <div className="flex items-center space-x-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-awsOrange to-spectrumRed text-white flex items-center justify-center font-outfit font-bold text-sm shadow-md">
                  JL
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-outfit font-bold text-slate-900 dark:text-white truncate">Joselyn Lagunas</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Fundadora de AWSPECTRUM</p>
                  <p className="text-[10px] text-awsOrange font-bold tracking-wider uppercase mt-0.5">AWS Community Builder</p>
                </div>
              </div>
              <div className="pt-2 text-center">
                <a href="mailto:awspectrum.latam@gmail.com" className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-awsOrange hover:underline">
                  <span>📧 awspectrum.latam@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-md space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-spectrumGreen">Nuestra Misión</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                Facilitar el acceso técnico equitativo a certificaciones y competencias cloud, consolidando un clúster de talento diverso en AWS.
              </p>
            </div>
            <hr className="border-slate-100 dark:border-slate-800" />
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-spectrumBlue">Nuestra Visión</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                Posicionarse para 2026 como la red de talento e inclusión más grande de habla hispana, aliada a los principales partners de infraestructura en la nube.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
