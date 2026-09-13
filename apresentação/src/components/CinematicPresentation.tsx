import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PhoneDevice, ScreenType } from './PhoneDevice';
import { 
  ExternalLink, Presentation, Target, ArrowDown, 
  Shield, Radio, CheckCircle2, AlertTriangle, Sparkles, 
  Zap, Clock, Award, Users, Compass, Lock,
  BarChart3, School, Layers, Settings, BookOpen,
  Heart, ArrowRight, Check, Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CinematicPresentationProps {
  onOpenPitch: () => void;
}

const CHAPTERS = [
  { label: '01. Início', progress: 0.00 },
  { label: '02. A Pesquisa', progress: 0.10 },
  { label: '03. A Proposta', progress: 0.20 },
  { label: '04. Como Funciona', progress: 0.31 },
  { label: '05. O Gestor', progress: 0.42 },
  { label: '06. Os 3 Pilares', progress: 0.53 },
  { label: '07. Saúde Mental', progress: 0.64 },
  { label: '08. Viabilidade', progress: 0.75 },
  { label: '09. Próximos Passos', progress: 0.85 },
  { label: '10. Conclusão', progress: 0.95 },
];

export const CinematicPresentation: React.FC<CinematicPresentationProps> = ({ onOpenPitch }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentProgressVal, setCurrentProgressVal] = useState(0);

  // Smooth continuous scroll track across 1100vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Responsive momentum spring calibrated to feel immediate and butter-smooth with Lenis
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.0005,
  });

  useEffect(() => {
    return smoothProgress.onChange((v: number) => {
      setCurrentProgressVal(v);
    });
  }, [smoothProgress]);

  // Keyboard navigation utilizing Lenis smooth scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT' || (e.target as HTMLElement)?.tagName === 'TEXTAREA') return;
      const lenis = (window as any).__lenis;
      const step = window.innerHeight * 0.85;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(window.scrollY + step, { duration: 0.9 });
        } else {
          window.scrollBy({ top: step, behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(window.scrollY - step, { duration: 0.9 });
        } else {
          window.scrollBy({ top: -step, behavior: 'smooth' });
        }
      } else if (e.key === 'p' || e.key === 'P') {
        onOpenPitch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenPitch]);

  const jumpToChapter = (progressTarget: number) => {
    if (!containerRef.current) return;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = progressTarget * totalScrollable;
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(targetY, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div ref={containerRef} className="relative bg-[#04060b] text-slate-100 min-h-[1100vh] select-none">
      
      {/* Tactile Cinematic Film Grain */}
      <div className="film-grain" />

      {/* Fixed Sticky Keynote Stage */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Dynamic Narrative Lighting Rig */}
        <DynamicNarrativeLighting progress={smoothProgress} />

        {/* Minimalist Executive Header */}
        <header className="absolute top-4 sm:top-6 left-5 sm:left-10 right-5 sm:right-10 z-50 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff]" />
            <div className="flex flex-col">
              <span className="font-bold text-xs tracking-[0.25em] text-white font-space uppercase">
                ONFOCUS
              </span>
              <span className="text-[9px] font-mono text-cyan-400/80 hidden sm:inline">
                HACKTUDO 2026 · ÚLTIMA HORA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 pointer-events-auto">
            <button
              onClick={onOpenPitch}
              aria-label="Abrir resumo do Pitch Deck"
              className="text-xs font-mono text-slate-300 hover:text-white px-3.5 sm:px-4 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition-all flex items-center gap-1.5"
            >
              <Presentation className="w-3.5 h-3.5 text-cyan-400" />
              <span>Pitch Deck (10 Slides)</span>
            </button>
            <a
              href="https://hackthon-ultima-hora.vercel.app/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Acessar o Gestor Web na Vercel"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] active:scale-95"
            >
              <span>Gestor Web</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </header>

        {/* Floating Chapter Progress Navigator (Desktop Right Safe Margin) */}
        <nav aria-label="Navegação por Capítulos" className="hidden xl:flex flex-col gap-2.5 absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 z-50 pointer-events-auto">
          {CHAPTERS.map((ch, idx) => {
            const isActive = Math.abs(currentProgressVal - ch.progress) < 0.055;
            return (
              <button
                key={idx}
                onClick={() => jumpToChapter(ch.progress)}
                title={ch.label}
                aria-label={`Ir para ${ch.label}`}
                className="group flex items-center gap-2.5 justify-end text-right transition-all outline-none py-0.5"
              >
                <span className={`text-[10px] font-mono tracking-wider transition-all duration-300 ${
                  isActive ? 'text-cyan-400 font-bold opacity-100 translate-x-0' : 'text-slate-500 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
                }`}>
                  {ch.label}
                </span>
                <span className={`rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'w-2.5 h-2.5 bg-cyan-400 shadow-[0_0_12px_#00f0ff] ring-4 ring-cyan-400/20' 
                    : 'w-1.5 h-1.5 bg-white/20 group-hover:bg-white/60'
                }`} />
              </button>
            );
          })}
        </nav>

        {/* Narrative Scrollytelling Stages (Synchronized with the 10 Slides) */}
        <HeroStage progress={smoothProgress} />
        <ProblemStage progress={smoothProgress} />
        <ProposalStage progress={smoothProgress} />
        <HowItWorksStage progress={smoothProgress} />
        <GestorShowcaseStage progress={smoothProgress} />
        <ThreePillarsStage progress={smoothProgress} />
        <MentalHealthStage progress={smoothProgress} />
        <ViabilityStage progress={smoothProgress} />
        <RoadmapStage progress={smoothProgress} />
        <FinalRevealStage progress={smoothProgress} onOpenPitch={onOpenPitch} />

        {/* Central Kinetic Smartphone Protagonist */}
        <CentralKineticPhone progress={smoothProgress} />

      </div>

    </div>
  );
};

/* =========================================================================
   DYNAMIC NARRATIVE LIGHTING RIG (Cinematic Atmospheres)
   ========================================================================= */
const DynamicNarrativeLighting: React.FC<{ progress: any }> = ({ progress }) => {
  const warmOpacity = useTransform(progress, [0.07, 0.14, 0.22], [0, 0.75, 0]);
  const cyanOpacity = useTransform(progress, [0.22, 0.35, 0.52], [0, 0.85, 0]);
  const blueOpacity = useTransform(progress, [0.52, 0.65, 0.78], [0, 0.8, 0]);
  const goldOpacity = useTransform(progress, [0.78, 0.90, 1.0], [0, 0.85, 1]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />

      {/* Warm Distraction Flare */}
      <motion.div 
        style={{ opacity: warmOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[460px] radial-halo-warm rounded-full blur-[130px]" 
      />

      {/* Cyan Proximity Halo */}
      <motion.div 
        style={{ opacity: cyanOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] radial-halo-cyan rounded-full blur-[150px]" 
      />

      {/* Sapphire Blue Focus Aura */}
      <motion.div 
        style={{ opacity: blueOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] radial-halo-blue rounded-full blur-[160px]" 
      />

      {/* Gold Finale Aura */}
      <motion.div 
        style={{ opacity: goldOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] radial-halo-gold rounded-full blur-[150px]" 
      />
    </div>
  );
};

/* =========================================================================
   CENTRAL KINETIC PHONE CONTROLLER
   ========================================================================= */
const CentralKineticPhone: React.FC<{ progress: any }> = ({ progress }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const phoneScale = useTransform(
    progress,
    [0.0, 0.08, 0.15, 0.25, 0.40, 0.52, 0.64, 0.75, 0.85, 0.94, 1.0],
    [0.82, 0.92, 0.98, 0.95, 0.95, 0.92, 0.92, 0.72, 0.88, 0.92, 0.90]
  );

  const phoneY = useTransform(
    progress,
    [0.0, 0.08, 0.15, 0.25, 0.50, 0.75, 0.85, 1.0],
    [340, 180, 0, 0, -6, 35, 0, 0]
  );

  const phoneXRaw = useTransform(
    progress,
    [0.0, 0.18, 0.22, 0.40, 0.44, 0.50, 0.54, 0.73, 0.76, 0.84, 0.88, 0.93, 0.96, 1.0],
    [0, 0, 220, 220, 230, 230, 210, 210, 0, 0, 210, 210, 0, 0]
  );

  const phoneRotateY = useTransform(
    progress,
    [0.0, 0.12, 0.24, 0.35, 0.50, 0.65, 0.80, 1.0],
    [0, -4, 0, -5, -4, 0, 0, 0]
  );

  const phoneRotateX = useTransform(
    progress,
    [0.0, 0.08, 0.28, 0.56, 0.80, 1.0],
    [4, 0, 2, 0, 0, 0]
  );

  const phoneOpacity = useTransform(
    progress,
    [0.0, 0.03, 0.74, 0.77, 0.82, 0.85, 1.0],
    [0.8, 1, 1, 0.3, 0.3, 1, 1]
  );

  const [activeScreen, setActiveScreen] = useState<ScreenType>('standby');

  useEffect(() => {
    return progress.onChange((v: number) => {
      if (v < 0.19) {
        setActiveScreen('standby');
      } else if (v < 0.30) {
        setActiveScreen('nfc');
      } else if (v < 0.41) {
        setActiveScreen('launcher');
      } else if (v < 0.52) {
        setActiveScreen('geogebra');
      } else if (v < 0.74) {
        setActiveScreen('restricted');
      } else {
        setActiveScreen('unlocked');
      }
    });
  }, [progress]);

  return (
    <motion.div
      style={{
        scale: phoneScale,
        y: phoneY,
        x: isMobile ? 0 : phoneXRaw,
        rotateY: phoneRotateY,
        rotateX: phoneRotateX,
        opacity: phoneOpacity,
        transformPerspective: 1400,
      }}
      className="relative z-20 flex items-center justify-center pointer-events-none will-change-transform"
    >
      <PhoneDevice currentScreen={activeScreen} />
    </motion.div>
  );
};

/* =========================================================================
   STAGE 1: HERO (Slide 1 do PDF)
   ========================================================================= */
const HeroStage: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.0, 0.05, 0.08], [1, 0.5, 0]);
  const y = useTransform(progress, [0.0, 0.08], [0, -30]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute top-10 sm:top-14 left-0 w-full flex flex-col items-center justify-start text-center px-6 z-30 pointer-events-none"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Hacktudo Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md mb-2.5 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[9px] sm:text-[10.5px] font-mono uppercase tracking-[0.25em] text-cyan-300 font-semibold">
            HACKTUDO 2026 · USO CONSCIENTE DE SMARTPHONES NA ESCOLA
          </span>
        </div>

        {/* Master Brand */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold font-space tracking-[-0.04em] uppercase text-white leading-none mb-2">
          <span className="gradient-title-hero">ONFOCUS</span>
        </h1>

        {/* Slogan */}
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-cyan-300 font-space mb-3 tracking-tight">
          "Seu foco começa aqui."
        </p>

        {/* Official Subtitle from PDF */}
        <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl mx-auto mb-4 leading-relaxed font-sans">
          Projeto para uso consciente do celular na escola: a liberação de aplicativos é definida aula a aula e ativada pela aproximação física do aparelho à sala.
        </p>

        {/* Team Credits & Scroll Cue */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-[11px] font-mono text-slate-400 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
            Equipe · Última Hora | Pré-Pitching · 13/09/2026
          </span>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-500/30">
            <ArrowDown className="w-3 h-3 animate-bounce" />
            <span>Scroll para explorar ↓</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

/* =========================================================================
   STAGE 2: A PESQUISA & O PROBLEMA (Slide 2 do PDF)
   ========================================================================= */
const ProblemStage: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.08, 0.11, 0.17, 0.19], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.08, 0.11, 0.17, 0.19], [20, 0, 0, -20]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-between items-center text-center px-4 sm:px-8 pt-16 sm:pt-20 pb-8 sm:pb-12 z-30 pointer-events-none"
    >
      {/* Top Header */}
      <div className="max-w-2xl mx-auto">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-rose-400 font-semibold mb-1 block">
          01 · O PROBLEMA REAL
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-space text-white tracking-tight leading-snug mb-1">
          O que a pesquisa mostra sobre o celular em sala de aula
        </h2>
        <p className="text-xs text-slate-300 font-light leading-relaxed">
          O desafio da edição pede uma relação mais consciente entre tecnologia e educação.
        </p>
      </div>

      {/* Floating Distraction Notifications */}
      <div className="absolute inset-0 max-w-6xl mx-auto flex items-center justify-between pointer-events-none px-4">
        <div className="w-44 sm:w-52 p-2.5 rounded-2xl toast-distraction border border-rose-500/30 text-left shadow-2xl -rotate-6 backdrop-blur-xl">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span className="text-[10px] font-bold text-white font-space">Instagram</span>
          </div>
          <div className="text-[10px] text-slate-300 font-light leading-tight">18 pessoas curtiram seu story</div>
        </div>

        <div className="w-44 sm:w-52 p-2.5 rounded-2xl toast-distraction border border-emerald-500/30 text-left shadow-2xl rotate-6 backdrop-blur-xl">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-white font-space">WhatsApp (42 msgs)</span>
          </div>
          <div className="text-[10px] text-slate-300 font-light leading-tight">"Alguém fez o trabalho de hoje?"</div>
        </div>
      </div>

      {/* Bottom 3 Scientific Research Cards */}
      <div className="w-full max-w-5xl mx-auto space-y-2.5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 text-left">
          
          {/* Study 1 */}
          <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.04] border border-rose-500/30 backdrop-blur-md">
            <span className="text-[10px] font-mono font-bold text-rose-400 block mb-1">
              ESTUDO RUTGERS UNIVERSITY
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-white font-space mb-1">
              A distração é coletiva
            </h4>
            <p className="text-[11px] text-slate-300 font-light leading-relaxed">
              Sem estrutura de uso, o celular em sala prejudica as notas <strong>até de quem não está usando o aparelho</strong>.
            </p>
          </div>

          {/* Study 2 */}
          <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.04] border border-cyan-500/30 backdrop-blur-md">
            <span className="text-[10px] font-mono font-bold text-cyan-400 block mb-1">
              INFORMATION SYSTEMS RESEARCH
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-white font-space mb-1">
              Proibição x liberação
            </h4>
            <p className="text-[11px] text-slate-300 font-light leading-relaxed">
              Liberação livre reduz o desempenho, mas esse <strong>desempenho aumenta quando o uso é guiado pelo professor</strong>.
            </p>
          </div>

          {/* Study 3 */}
          <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.04] border border-amber-500/30 backdrop-blur-md">
            <span className="text-[10px] font-mono font-bold text-amber-400 block mb-1">
              LEVANTAMENTO EM SALA DE AULA
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-white font-space mb-1">
              Falta incentivo para o professor
            </h4>
            <p className="text-[11px] text-slate-300 font-light leading-relaxed">
              A ausência de incentivo é uma das <strong>principais razões pelas quais professores não adotam novas ferramentas</strong>.
            </p>
          </div>

        </div>

        {/* Synthesis Callout */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs text-cyan-200">
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>
            <strong>O Onfocus parte desses 3 pontos:</strong> reduzir distração coletiva, achar o meio-termo e dar visibilidade ao docente.
          </span>
        </div>
      </div>

    </motion.div>
  );
};

/* =========================================================================
   STAGE 3: A PROPOSTA (Slide 3 do PDF)
   ========================================================================= */
const ProposalStage: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.19, 0.22, 0.28, 0.30], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.19, 0.22, 0.28, 0.30], [20, 0, 0, -20]);

  return (
    <div className="absolute inset-y-0 left-4 sm:left-10 lg:left-20 flex items-center max-w-lg w-full z-30 pointer-events-none">
      <motion.div style={{ opacity, y }} className="space-y-3.5 text-left">
        
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold block mb-1">
            02 · A PROPOSTA
          </span>
          <h3 className="text-2xl sm:text-4xl font-bold font-space text-white tracking-tight leading-tight">
            Cada aula define o que o celular pode fazer.
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mt-1">
            Em vez de proibir ou liberar o aparelho inteiro, o Onfocus muda o que é controlado: <strong>não é o celular do aluno, é o contexto da aula em que ele está</strong>.
          </p>
        </div>

        {/* 3 Pillars of Proposal */}
        <div className="space-y-2.5">
          <div className="p-3 rounded-xl bg-white/[0.04] border border-cyan-500/30 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
              <Radio className="w-3.5 h-3.5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white font-space">A aula é a unidade de controle, não o aparelho</h5>
              <p className="text-[11px] text-slate-300 font-light leading-tight mt-0.5">
                A mesma aluna pode ter o <strong>GeoGebra liberado em Matemática</strong> e só o <strong>dicionário em Português</strong>.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.04] border border-rose-500/30 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
              <Heart className="w-3.5 h-3.5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white font-space">Reflexão em vez de punição</h5>
              <p className="text-[11px] text-slate-300 font-light leading-tight mt-0.5">
                Ao tentar abrir algo fora da lista, a resposta é uma <strong>tela de reflexão sobre o uso</strong>, não um bloqueio punitivo.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.04] border border-indigo-500/30 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white font-space">O uso pedagógico deixa de ser invisível</h5>
              <p className="text-[11px] text-slate-300 font-light leading-tight mt-0.5">
                O uso educativo aparece para a escola, criando a base para reconhecer quem ensina a favor do aprendizado.
              </p>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

/* =========================================================================
   STAGE 4: COMO FUNCIONA (Slide 4 do PDF)
   ========================================================================= */
const HowItWorksStage: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.30, 0.33, 0.39, 0.41], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.30, 0.33, 0.39, 0.41], [20, 0, 0, -20]);

  return (
    <div className="absolute inset-y-0 left-4 sm:left-10 lg:left-20 flex items-center max-w-lg w-full z-30 pointer-events-none">
      <motion.div style={{ opacity, y }} className="space-y-3.5 text-left">
        
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold block mb-1">
            03 · COMO FUNCIONA
          </span>
          <h3 className="text-2xl sm:text-4xl font-bold font-space text-white tracking-tight leading-tight">
            Da configuração da aula ao uso em sala
          </h3>
          <div className="mt-2 p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200">
            <span className="font-semibold">Antes da aula, no Gestor:</span> o professor escolhe quais aplicativos ficam liberados para aquela turma.
          </div>
        </div>

        {/* 4 Sequential Steps */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <span className="text-lg font-extrabold font-space text-cyan-400 block mb-0.5">01</span>
            <h5 className="text-xs font-bold text-white font-space mb-0.5">Aproximar</h5>
            <p className="text-[11px] text-slate-300 font-light leading-tight">
              O aluno encosta o celular na tag NFC da sala, no início da aula.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <span className="text-lg font-extrabold font-space text-cyan-400 block mb-0.5">02</span>
            <h5 className="text-xs font-bold text-white font-space mb-0.5">Validar</h5>
            <p className="text-[11px] text-slate-300 font-light leading-tight">
              Assinatura digital confirma a sala certa e carrega a lista da aula.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <span className="text-lg font-extrabold font-space text-cyan-400 block mb-0.5">03</span>
            <h5 className="text-xs font-bold text-white font-space mb-0.5">Focar</h5>
            <p className="text-[11px] text-slate-300 font-light leading-tight">
              Na tela do aluno, aparecem apenas os aplicativos autorizados.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.04] border border-emerald-500/30">
            <span className="text-lg font-extrabold font-space text-emerald-400 block mb-0.5">04</span>
            <h5 className="text-xs font-bold text-white font-space mb-0.5">Liberar</h5>
            <p className="text-[11px] text-slate-300 font-light leading-tight">
              Ao fim do horário, o controle total volta automaticamente.
            </p>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

/* =========================================================================
   STAGE 5: DEMONSTRAÇÃO DO GESTOR SAAS (Slide 5 do PDF)
   ========================================================================= */
const GestorShowcaseStage: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.41, 0.44, 0.50, 0.52], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.41, 0.44, 0.50, 0.52], [20, 0, 0, -20]);

  const modules = [
    { name: 'Dashboard', icon: BarChart3 },
    { name: 'Turmas', icon: Users },
    { name: 'Aulas', icon: BookOpen },
    { name: 'Salas', icon: School },
    { name: 'Aplicativos', icon: Layers },
    { name: 'Relatórios', icon: Award },
    { name: 'Configurações', icon: Settings },
  ];

  return (
    <div className="absolute inset-y-0 left-4 sm:left-10 lg:left-20 flex items-center max-w-lg w-full z-30 pointer-events-none">
      <motion.div style={{ opacity, y }} className="space-y-3.5 text-left">
        
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold block mb-1">
            04 · DEMONSTRAÇÃO
          </span>
          <h3 className="text-2xl sm:text-4xl font-bold font-space text-white tracking-tight leading-tight">
            O Gestor: painel já implementado
          </h3>
          <p className="text-xs text-slate-300 font-light leading-relaxed mt-1">
            Aplicação web construída em <strong>Next.js</strong>, com sete módulos navegáveis e deploy ativo, disponível para consulta.
          </p>
        </div>

        {/* 7 Modules List */}
        <div className="grid grid-cols-2 gap-2">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div key={idx} className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-2">
                <Icon className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs text-white font-medium">{mod.name}</span>
              </div>
            );
          })}
        </div>

        {/* 7 Modules Highlight & Link */}
        <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between pointer-events-auto">
          <div>
            <div className="text-2xl font-extrabold font-space text-cyan-400">7 Módulos</div>
            <div className="text-[11px] text-slate-300 font-light">Métricas simuladas em tempo real</div>
          </div>
          <a
            href="https://hackthon-ultima-hora.vercel.app/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-cyan-400 text-black font-space font-bold text-xs hover:bg-cyan-300 transition-all flex items-center gap-1.5 shadow-md"
          >
            <span>Ver Gestor</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </motion.div>
    </div>
  );
};

/* =========================================================================
   STAGE 6: OS 3 PILARES DO DESAFIO (Slide 6 do PDF)
   ========================================================================= */
const ThreePillarsStage: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.52, 0.55, 0.61, 0.63], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.52, 0.55, 0.61, 0.63], [20, 0, 0, -20]);

  return (
    <div className="absolute inset-y-0 left-4 sm:left-10 lg:left-20 flex items-center max-w-xl w-full z-30 pointer-events-none">
      <motion.div style={{ opacity, y }} className="space-y-3 text-left">
        
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold block mb-0.5">
            05 · OS 3 PILARES
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-space text-white tracking-tight">
            Cada pilar do desafio, em ação no produto
          </h3>
        </div>

        <div className="space-y-2.5">
          {/* Tecnologia */}
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-cyan-500/30">
            <div className="flex items-center gap-2 text-cyan-400 font-space font-bold text-xs mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Tecnologia</span>
            </div>
            <p className="text-[11px] text-slate-300 font-light leading-relaxed">
              Tags NFC com assinatura digital renovada a cada 24h contra fraudes, Android em modo Kiosk e visibilidade do uso para a coordenação.
            </p>
          </div>

          {/* Metodologia */}
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-indigo-500/30">
            <div className="flex items-center gap-2 text-indigo-400 font-space font-bold text-xs mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Metodologia</span>
            </div>
            <p className="text-[11px] text-slate-300 font-light leading-relaxed">
              O professor escolhe aula a aula quais apps ficam disponíveis, com catálogo validado pedagogicamente antes de entrar no sistema.
            </p>
          </div>

          {/* Saúde Mental */}
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-rose-500/30">
            <div className="flex items-center gap-2 text-rose-400 font-space font-bold text-xs mb-1">
              <Heart className="w-3.5 h-3.5" />
              <span>Saúde Mental</span>
            </div>
            <p className="text-[11px] text-slate-300 font-light leading-relaxed">
              Tela de reflexão em vez de bloqueio punitivo. Privacidade total (nunca acessa câmera, microfone ou dados). Selo de foco para engajamento genuíno.
            </p>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

/* =========================================================================
   STAGE 7: SAÚDE MENTAL & THE LANCET (Slide 7 do PDF)
   ========================================================================= */
const MentalHealthStage: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.63, 0.66, 0.72, 0.74], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.63, 0.66, 0.72, 0.74], [20, 0, 0, -20]);

  return (
    <div className="absolute inset-y-0 left-4 sm:left-10 lg:left-20 flex items-center max-w-lg w-full z-30 pointer-events-none">
      <motion.div style={{ opacity, y }} className="space-y-3.5 text-left">
        
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-rose-400 font-semibold block mb-1">
            06 · SAÚDE MENTAL & CIÊNCIA
          </span>
          <h3 className="text-2xl sm:text-4xl font-bold font-space text-white tracking-tight leading-tight">
            Combater o tédio, não só o tempo de tela.
          </h3>
        </div>

        {/* Lancet Study Box */}
        <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/30 backdrop-blur-md">
          <span className="text-[10px] font-mono font-bold text-rose-300 block mb-1">
            THE LANCET REGIONAL HEALTH
          </span>
          <p className="text-xs text-slate-200 font-light leading-relaxed">
            Restringir o celular, sozinho, <strong>não garante bem-estar</strong>: estudo publicado no Lancet não encontrou relação entre políticas meramente restritivas e melhora mental dos jovens.
          </p>
        </div>

        <p className="text-xs text-slate-300 font-light leading-relaxed">
          Por isso o Onfocus mira em duas causas reais: <strong>o tédio em sala de aula</strong> e <strong>o uso do celular sem estrutura</strong>.
        </p>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <h5 className="text-xs font-bold text-white font-space mb-0.5">O tédio tem custo real</h5>
            <p className="text-[11px] text-slate-400 font-light">Ferramentas interativas ativas combatem a apatia.</p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <h5 className="text-xs font-bold text-white font-space mb-0.5">Uso Guiado</h5>
            <p className="text-[11px] text-slate-400 font-light">O professor direciona a atenção para o conteúdo.</p>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

/* =========================================================================
   STAGE 8: VIABILIDADE ESCOLAR (Slide 8 do PDF)
   ========================================================================= */
const ViabilityStage: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.74, 0.77, 0.82, 0.84], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.74, 0.77, 0.82, 0.84], [20, 0, 0, -20]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-8 z-30 pointer-events-none"
    >
      <div className="max-w-3xl mx-auto mb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 font-semibold mb-1 block">
          07 · VIABILIDADE INSTITUCIONAL
        </span>
        <h3 className="text-2xl sm:text-4xl font-extrabold font-space text-white tracking-tight leading-snug mb-1.5">
          O que facilita a adoção pela escola
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl mx-auto leading-relaxed">
          Além de funcionar tecnicamente, a proposta tem mecanismos que ajudam a própria escola a decidir por adotá-la.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-4xl w-full text-left">
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-cyan-500/25 backdrop-blur-md">
          <span className="text-xs font-bold text-cyan-400 font-space block mb-1">
            Uma visão única para a direção
          </span>
          <p className="text-xs text-slate-300 font-light leading-relaxed">
            A coordenação acompanha, em um só painel, o uso pedagógico do celular em todas as turmas, sem depender de relatos soltos de cada professor.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.04] border border-indigo-500/25 backdrop-blur-md">
          <span className="text-xs font-bold text-indigo-400 font-space block mb-1">
            Professores e alunos, na mesma régua
          </span>
          <p className="text-xs text-slate-300 font-light leading-relaxed">
            Como o uso de cada professor também fica visível, a adoção da proposta deixa de depender só da boa vontade individual.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.04] border border-emerald-500/25 backdrop-blur-md">
          <span className="text-xs font-bold text-emerald-400 font-space block mb-1">
            Mais proximidade com as famílias
          </span>
          <p className="text-xs text-slate-300 font-light leading-relaxed">
            Os pais passam a ter mais visibilidade sobre o uso do celular do filho durante as aulas, o que facilita a conversa entre escola e família.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.04] border border-amber-500/25 backdrop-blur-md">
          <span className="text-xs font-bold text-amber-400 font-space block mb-1">
            Metodologia com respaldo de pesquisa
          </span>
          <p className="text-xs text-slate-300 font-light leading-relaxed">
            Estudos sobre ferramentas interativas mostram ganhos de engajamento, o que dá à equipe pedagógica uma base concreta para apoiar a proposta.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* =========================================================================
   STAGE 9: PRÓXIMOS PASSOS (Slide 9 do PDF)
   ========================================================================= */
const RoadmapStage: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.84, 0.87, 0.92, 0.94], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.84, 0.87, 0.92, 0.94], [20, 0, 0, -20]);

  return (
    <div className="absolute inset-y-0 left-4 sm:left-10 lg:left-20 flex items-center max-w-lg w-full z-30 pointer-events-none">
      <motion.div style={{ opacity, y }} className="space-y-3 text-left">
        
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold block mb-1">
            08 · PRÓXIMOS PASSOS
          </span>
          <h3 className="text-2xl sm:text-4xl font-bold font-space text-white tracking-tight leading-tight">
            Sabemos exatamente pra onde o Onfocus vai
          </h3>
        </div>

        <div className="space-y-2">
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <div className="flex items-center justify-between mb-0.5">
              <h5 className="text-xs font-bold text-white font-space">Painel de incentivo docente</h5>
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/30">Fase 1</span>
            </div>
            <p className="text-[11px] text-slate-300 font-light leading-tight">
              Acompanhar e reconhecer professores que configuram aulas com apps pedagógicos.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <div className="flex items-center justify-between mb-0.5">
              <h5 className="text-xs font-bold text-white font-space">Selo de foco (gamificação)</h5>
              <span className="text-[9px] font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-500/30">Fase 2</span>
            </div>
            <p className="text-[11px] text-slate-300 font-light leading-tight">
              Reconhecimento visual para o aluno sem alertas de distração durante as aulas.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <div className="flex items-center justify-between mb-0.5">
              <h5 className="text-xs font-bold text-white font-space">Autoconhecimento do próprio uso</h5>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">Fase 3</span>
            </div>
            <p className="text-[11px] text-slate-300 font-light leading-tight">
              Resumo semanal do padrão de foco devolvido ao próprio aluno para autorregulação.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <div className="flex items-center justify-between mb-0.5">
              <h5 className="text-xs font-bold text-white font-space">Piloto com tags físicas e expansão</h5>
              <span className="text-[9px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">Fase 4</span>
            </div>
            <p className="text-[11px] text-slate-300 font-light leading-tight">
              Launcher Android nativo e expansão gradual da whitelist para todas as disciplinas.
            </p>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

/* =========================================================================
   STAGE 10: REVELAÇÃO FINAL & CTAS (Slide 10 do PDF)
   ========================================================================= */
const FinalRevealStage: React.FC<{ progress: any; onOpenPitch: () => void }> = ({ progress, onOpenPitch }) => {
  const opacity = useTransform(progress, [0.94, 0.97, 1.0], [0, 1, 1]);
  const scale = useTransform(progress, [0.94, 1.0], [0.95, 1]);

  const triggerReward = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#38bdf8', '#818cf8', '#ffffff', '#fbbf24'],
    });
  };

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-40 bg-black/85 backdrop-blur-xl"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Logo Monogram */}
        <div
          onClick={triggerReward}
          className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_40px_rgba(0,240,255,0.3)] cursor-pointer hover:scale-105 transition-transform"
        >
          <Target className="w-7 h-7" />
        </div>

        <span className="text-[10.5px] font-mono text-cyan-400 uppercase tracking-[0.25em] font-semibold mb-1 block">
          ONFOCUS · HACKTUDO 2026
        </span>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold font-space tracking-[-0.04em] text-white mb-2 leading-none">
          Seu foco começa aqui.
        </h2>

        <p className="text-sm sm:text-lg text-slate-300 font-light max-w-xl mx-auto mb-6 font-sans">
          Tecnologia, metodologia e saúde mental integradas em uma mesma solução, já em desenvolvimento.
        </p>

        {/* 3 Interactive Cards from Slide 10 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl mb-6 text-left">
          <a
            href="https://hackthon-ultima-hora.vercel.app/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-400 transition-all group pointer-events-auto"
          >
            <span className="text-[9px] font-mono text-cyan-400 uppercase block mb-1 font-semibold">01 / PRODUTO IMPLEMENTADO</span>
            <div className="font-bold text-white text-xs font-space group-hover:text-cyan-300 flex items-center justify-between">
              <span>MVP (Gestor)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">hackthon-ultima-hora.vercel.app</span>
          </a>

          <button
            onClick={onOpenPitch}
            className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] hover:border-white/[0.2] transition-all text-left group pointer-events-auto"
          >
            <span className="text-[9px] font-mono text-indigo-400 uppercase block mb-1 font-semibold">02 / APRESENTAÇÃO</span>
            <div className="font-bold text-white text-xs font-space group-hover:text-indigo-300 flex items-center justify-between">
              <span>Pitch Deck Completo</span>
              <Presentation className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">10 Slides navegáveis</span>
          </button>

          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-left">
            <span className="text-[9px] font-mono text-emerald-400 uppercase block mb-1 font-semibold">03 / PITCH EXECUTIVO</span>
            <div className="font-bold text-white text-xs font-space">
              <span>Vídeo (2 min)</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">Disponível para avaliação</span>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-3xl pt-4 border-t border-white/[0.08] text-xs font-mono text-slate-500 gap-2">
          <span>Equipe · Última Hora</span>
          <span className="text-cyan-400/80">contato@hacktudo.com.br</span>
        </div>

      </div>
    </motion.div>
  );
};
