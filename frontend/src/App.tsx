import { useState } from 'react';
import './App.css';
import { useTheme } from './hooks/useTheme';
import ParticleCanvas from './components/ParticleCanvas';
import BackgroundGlow from './components/BackgroundGlow';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EventSection from './components/EventSection';
import DataSection from './components/DataSection';
import NetworkGraph from './components/NetworkGraph';
import SpeakersSection from './components/SpeakersSection';
import SponsorsSection from './components/SponsorsSection';
import CTASection from './components/CTASection';
import MerchCarousel from './components/MerchCarousel';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import type { ModalType } from './types';

function App() {
  const { dark, toggle } = useTheme();
  const [modal, setModal] = useState<{ visible: boolean; type: ModalType }>({
    visible: false,
    type: 'comunidad',
  });

  const openModal = (type: ModalType) => setModal({ visible: true, type });
  const closeModal = () => setModal({ visible: false, type: modal.type });

  return (
    <div className="font-inter bg-white dark:bg-darkBg text-slate-800 dark:text-slate-100 transition-colors duration-300 relative overflow-x-hidden bg-grid-pattern">
      <ParticleCanvas />
      <BackgroundGlow />
      <CustomCursor />

      <Header dark={dark} onToggleTheme={toggle} onOpenModal={openModal} />

      <main className="relative z-20">
        <HeroSection onOpenModal={openModal} />
        <AboutSection />
        <EventSection />
        <DataSection />
        <NetworkGraph />
        <SpeakersSection onOpenModal={openModal} />
        <SponsorsSection onOpenModal={openModal} />
        <CTASection onOpenModal={openModal} />
        <MerchCarousel />
      </main>

      <Footer onOpenModal={openModal} />

      <ContactModal
        visible={modal.visible}
        type={modal.type}
        onClose={closeModal}
      />
    </div>
  );
}

export default App;
