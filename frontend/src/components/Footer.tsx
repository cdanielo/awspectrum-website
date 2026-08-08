import { useState } from 'react';
import { submitContact } from '../utils/api';
import { fireConfetti } from '../utils/confetti';

interface FooterProps {
  onOpenModal: (type: 'comunidad' | 'sponsor' | 'charla') => void;
}

export default function Footer({ onOpenModal }: FooterProps) {
  const [email, setEmail] = useState('');

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact({
        type: 'newsletter', name: '', email, interest: 'newsletter', message: '',
      });
      fireConfetti();
      setEmail('');
    } catch {
      alert('Ocurrió un error. Intenta de nuevo.');
    }
  };

  return (
    <footer className="border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/80 py-16 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M25 60 C15 60 10 50 15 40 C15 30 25 20 40 20 C48 10 65 10 75 25 C85 25 90 35 87 45 C87 55 78 60 70 60 Z"
                  fill="#FFFFFF" stroke="url(#footerGradient)" strokeWidth={8} className="dark:fill-slate-900" />
                <defs>
                  <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EF4444" /><stop offset="25%" stopColor="#F97316" />
                    <stop offset="50%" stopColor="#22C55E" /><stop offset="75%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="font-outfit font-extrabold text-lg logo-gradient">AWSPECTRUM</span>
          </div>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Iniciativa comunitaria latinoamericana enfocada en visibilizar y capacitar a la comunidad LGBTQ+ dentro de tecnologías cloud y AWS.
          </p>
          <div className="text-[10px] text-slate-500 font-medium">
            Made with 🌈 & ☁️ in Latin America.
          </div>
        </div>

        <div className="md:col-span-4 grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-outfit font-bold text-xs text-slate-800 dark:text-white uppercase tracking-wider">Enlaces</h4>
            <ul className="space-y-2 text-xs font-light text-slate-500 dark:text-slate-400">
              <li><a href="#sobre" className="hover:text-awsOrange">Sobre Nosotros</a></li>
              <li><a href="#evento" className="hover:text-awsOrange">El Evento</a></li>
              <li><a href="#datos" className="hover:text-awsOrange">Datos Clave</a></li>
              <li><a href="#speakers" className="hover:text-awsOrange">Speakers</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-outfit font-bold text-xs text-slate-800 dark:text-white uppercase tracking-wider">Comunidad</h4>
            <ul className="space-y-2 text-xs font-light text-slate-500 dark:text-slate-400">
              <li><a href="#" onClick={() => onOpenModal('comunidad')} className="hover:text-awsOrange">Unirse al Hub</a></li>
              <li><a href="#" onClick={() => onOpenModal('sponsor')} className="hover:text-awsOrange">Aliados</a></li>
              <li><a href="#" onClick={() => onOpenModal('charla')} className="hover:text-awsOrange">Call for Papers</a></li>
            </ul>
          </div>
        </div>

        <div className="md:col-span-4 space-y-4">
          <h4 className="font-outfit font-bold text-xs text-slate-800 dark:text-white uppercase tracking-wider">Boletín</h4>
          <p className="text-xs text-slate-400 font-light">Suscríbete para recibir notificaciones sobre becas y aperturas de registro.</p>
          <form onSubmit={handleNewsletter} className="flex gap-2">
            <input
              type="email" placeholder="Correo electrónico" required value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-awsOrange"
            />
            <button type="submit" className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-awsOrange hover:bg-awsOrangeHover active:scale-95 transition-all">
              Enviar
            </button>
          </form>

          <div className="space-y-2">
            <h4 className="font-outfit font-bold text-xs text-slate-800 dark:text-white uppercase tracking-wider">Redes sociales</h4>
            <div className="flex flex-wrap gap-2">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-awsOrange hover:text-awsOrange dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/awspectrum.latam?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-awsOrange hover:text-awsOrange dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-awsOrange hover:text-awsOrange dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 pt-2 flex flex-col space-y-1">
            <span>Organización: <strong>Joselyn Lagunas</strong> (Founder & AWS Community Builder)</span>
            <a href="mailto:awspectrum.latam@gmail.com" className="text-awsOrange font-mono hover:underline">awspectrum.latam@gmail.com</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-100 dark:border-slate-800/60 text-center text-[10px] text-slate-400">
        &copy; 2026 AWSPECTRUM LATAM. Todos los derechos reservados. AWSPECTRUM es una iniciativa de la comunidad independiente y no está directamente afiliada, patrocinada ni operada por Amazon Web Services, Inc.
      </div>
    </footer>
  );
}
