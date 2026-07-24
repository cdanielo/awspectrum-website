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
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M6.94 8.5A1.56 1.56 0 1 0 6.94 5.38a1.56 1.56 0 0 0 0 3.12ZM5.5 9.75h2.88V18H5.5zM10.38 9.75h2.76v1.11h.04c.38-.72 1.31-1.48 2.7-1.48 2.89 0 3.42 1.9 3.42 4.37V18h-2.88v-7.61c0-1.81-.03-4.14-2.52-4.14-2.52 0-2.91 1.97-2.91 4V18H10.38z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/awspectrum.latam?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-awsOrange hover:text-awsOrange dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm5 3.25A3.75 3.75 0 1 1 8.25 12 3.76 3.76 0 0 1 12 8.25Zm0 2A1.75 1.75 0 1 0 13.75 12 1.75 1.75 0 0 0 12 10.25Zm4.5-3.25a.75.75 0 1 1-.75.75.75.75 0 0 1 .75-.75Z" />
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-awsOrange hover:text-awsOrange dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M13.5 21v-8h2.7l.4-3h-3.1V3.9c0-.87.24-1.46 1.49-1.46H17V.1c-.26-.03-1.15-.1-2.18-.1-2.16 0-3.64 1.32-3.64 3.74V10H8.7v3h2.48v8z" />
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
