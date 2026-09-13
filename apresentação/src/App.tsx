import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CinematicPresentation } from './components/CinematicPresentation';
import { PitchDeckModal } from './components/PitchDeckModal';

export const App: React.FC = () => {
  const [isPitchOpen, setIsPitchOpen] = useState(false);

  useEffect(() => {
    // Lenis Smooth Momentum Scrolling for Apple-grade smoothness
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.2,
    });

    (window as any).__lenis = lenis;

    let rfId: number;
    function raf(time: number) {
      lenis.raf(time);
      rfId = requestAnimationFrame(raf);
    }

    rfId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rfId);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  return (
    <div className="bg-[#05070e] text-slate-100 min-h-screen relative font-sans selection:bg-cyan-500 selection:text-black">
      {/* Master Continuous Scroll-Driven Keynote Experience */}
      <CinematicPresentation onOpenPitch={() => setIsPitchOpen(true)} />

      {/* Pitch Deck Summary Modal */}
      <PitchDeckModal isOpen={isPitchOpen} onClose={() => setIsPitchOpen(false)} />
    </div>
  );
};

export default App;
