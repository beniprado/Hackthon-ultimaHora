import React, { useEffect, useState } from 'react';

const CHAPTERS = [
  { id: 'hero', name: '01 / IMPACTO' },
  { id: 'problema', name: '02 / O PROBLEMA' },
  { id: 'descoberta', name: '03 / A DESCOBERTA' },
  { id: 'produto', name: '04 / O PRODUTO' },
  { id: 'como-funciona', name: '05 / COMO FUNCIONA' },
  { id: 'proximidade', name: '06 / KIOSK MODE' },
  { id: 'tecnologia', name: '07 / TECNOLOGIA' },
  { id: 'dashboard', name: '08 / GESTOR SAAS' },
  { id: 'beneficios', name: '09 / BENEFÍCIOS' },
  { id: 'wow', name: '10 / FILOSOFIA' },
  { id: 'futuro', name: '11 / FUTURO' },
  { id: 'cta', name: '12 / CTA' },
];

export const HudProgress: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeChapter, setActiveChapter] = useState('01 / IMPACTO');

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const current = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollPercent(current);

      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveChapter(CHAPTERS[i].name);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col items-start gap-4 pointer-events-none">
      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 rotate-180 [writing-mode:vertical-rl]">
        NARRATIVA VERTICAL
      </div>
      <div className="w-[2px] h-32 bg-white/10 relative rounded-full overflow-hidden">
        <div
          className="w-full bg-gradient-to-b from-cyan-400 to-[#0284c7] transition-all duration-150"
          style={{ height: `${scrollPercent}%` }}
        />
      </div>
      <span className="text-xs font-mono font-bold text-cyan-400">{activeChapter}</span>
    </aside>
  );
};
