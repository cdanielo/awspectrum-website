import { useState } from 'react';
import Logo from '/media/Logo.jpg';

interface HeaderProps {
  dark: boolean;
  onToggleTheme: () => void;
  onOpenModal: (type: 'comunidad') => void;
}

export default function Header({ dark, onToggleTheme, onOpenModal }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: '#sobre', label: 'Sobre Nosotros' },
    { href: '#evento', label: 'El Evento' },
    { href: '#datos', label: 'Datos Clave' },
    { href: '#speakers', label: 'Speakers' },
    { href: '#sponsors', label: 'Sponsors' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 dark:border-slate-800/80 glass-card transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-3 group relative">
          <div className="relative w-10 h-10 flex items-center justify-center transform group-hover:scale-110 transition duration-300">
            <img src={Logo} alt="AWSPECTRUM Logo" className="w-full h-full object-contain drop-shadow-md rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="font-outfit font-extrabold text-xl tracking-tight leading-none logo-gradient">AWSPECTRUM</span>
            <span className="font-outfit font-semibold text-[9px] tracking-[0.25em] text-slate-400 uppercase leading-none mt-1">LATAM 2026</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-awsOrange dark:hover:text-awsOrange transition duration-200">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-500 dark:text-slate-400 transition-all duration-300"
          >
            {dark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => onOpenModal('comunidad')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-awsOrange hover:bg-awsOrangeHover shadow-lg shadow-orange-500/20 active:scale-95 transition-all duration-200"
          >
            Únete a la comunidad
          </button>

          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Open mobile menu"
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-darkBg py-4 px-4 space-y-3 transition duration-300">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-awsOrange">
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { onOpenModal('comunidad'); setMobileOpen(false); }}
            className="block text-center w-full py-3 rounded-xl text-sm font-semibold text-white bg-awsOrange hover:bg-awsOrangeHover shadow-lg"
          >
            Únete a la comunidad
          </button>
        </div>
      )}
    </header>
  );
}
