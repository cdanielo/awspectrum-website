import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { submitContact } from '../utils/api';
import { fireConfetti } from '../utils/confetti';
import type { ModalType } from '../types';

interface ContactModalProps {
  visible: boolean;
  type: ModalType;
  onClose: () => void;
}

const modalConfig: Record<ModalType, { category: string; title: string; subtitle: string; interest: string; typeValue: string }> = {
  sponsor: {
    category: 'Sponsor / Partner Program',
    title: 'Conviértete en Patrocinador',
    subtitle: 'Asóciate con AWSPECTRUM LATAM 2026. Ayúdanos a fundar becas de estudio y destaca tu compromiso corporativo.',
    interest: 'Sponsor',
    typeValue: 'sponsor',
  },
  charla: {
    category: 'Call for Speakers',
    title: 'Postula tu Ponencia / Taller',
    subtitle: 'Comparte tu experiencia en AWS o diversidad ante cientos de profesionales.',
    interest: 'Speaker',
    typeValue: 'speaker',
  },
  comunidad: {
    category: 'Unirse a la Red',
    title: 'Únete como Asistente o Aliado',
    subtitle: 'Sé el primero en enterarte de las convocatorias, boletos, workshops y mentorías.',
    interest: 'Comunidad',
    typeValue: 'community',
  },
  contactGeneral: {
    category: 'Contacto General',
    title: 'Ponte en contacto con nosotros',
    subtitle: 'Dudas, propuestas locales o alianzas de medios.',
    interest: 'Comunidad',
    typeValue: 'general',
  },
};

export default function ContactModal({ visible, type, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!visible) return;
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [visible, onClose]);

  const config = modalConfig[type];

  if (!visible) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await submitContact({
        type: config.typeValue,
        name,
        email,
        interest: config.interest,
        message,
      });
      fireConfetti();
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    } catch {
      alert('Ocurrió un error. Intenta de nuevo.');
    } finally {
      setSending(false);
    }
  };

  const handleBgClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      gsap.to(e.currentTarget.firstElementChild, {
        scale: 0.9, opacity: 0, duration: 0.2, ease: 'power2.in',
        onComplete: onClose,
      });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={config.title}
      className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleBgClick}
    >
      <div
        className="w-full max-w-lg p-8 sm:p-10 rounded-3xl bg-white dark:bg-darkCard border border-slate-200 dark:border-slate-800/80 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button ref={closeBtnRef} onClick={onClose} aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="space-y-2 mb-8">
          <span className="text-xs font-bold text-awsOrange uppercase tracking-wider">{config.category}</span>
          <h3 className="font-outfit text-2xl font-extrabold text-slate-900 dark:text-white">{config.title}</h3>
          <p className="text-xs text-slate-400 font-light">{config.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest" htmlFor="formName">Nombre Completo</label>
            <input id="formName" type="text" required maxLength={255} value={name} onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-awsOrange"
              placeholder="Ingresa tu nombre" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest" htmlFor="formEmail">Correo Electrónico</label>
            <input id="formEmail" type="email" required maxLength={320} value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-awsOrange"
              placeholder="ejemplo@correo.com" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest" htmlFor="formMsg">Mensaje / Detalles Adicionales</label>
            <textarea id="formMsg" rows={3} maxLength={5000} value={message} onChange={e => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-awsOrange"
              placeholder="Cuéntanos un poco sobre ti o tu propuesta..." />
          </div>

          <button type="submit" disabled={sending}
            className="w-full py-4.5 rounded-xl text-xs font-bold text-white bg-awsOrange hover:bg-awsOrangeHover active:scale-[0.98] shadow-lg shadow-orange-500/10 transition-all duration-200 flex items-center justify-center gap-2 mt-4 disabled:opacity-50">
            {sending ? 'Enviando...' : 'Enviar Registro'}
          </button>
        </form>
      </div>
    </div>
  );
}
