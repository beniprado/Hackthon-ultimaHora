import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PhoneDevice, ScreenType } from './PhoneDevice';
import { 
  ExternalLink, Presentation, Target, ArrowDown, 
  Shield, Radio, CheckCircle2, AlertTriangle, Sparkles, 
  Zap, Clock, Award, Users, Compass, Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CinematicPresentationProps {
  onOpenPitch: () => void;
}

const CHAPTERS = [
  { label: '01. Início', progress: 0.00 },
  { label: '02. O Problema', progress: 0.14 },
  { label: '03. A Solução', progress: 0.28 },
  { label: '04. Como Funciona', progress: 0.42 },
  { label: '05. GeoGebra', progress: 0.56 },
  { label: '06. O Diferencial', progress: 0.70 },
  { label: '07. Impacto', progress: 0.82 },
  { label: '08. Revelação', progress: 0.95 },
];

export const CinematicPresentation: React.FC<CinematicPresentationProps> = ({ onOpenPitch }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentProgressVal, setCurrentProgressVal] = useState(0);

  // Smooth continuous scroll track across 900vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Inertial momentum spring for Apple-grade smoothness
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001,
  });

  useEffect(() => {
    return smoothProgress.onChange((v: number) => {
      setCurrentProgressVal(v);
    });
  }, [smoothProgress]);

  // Full keyboard accessibility (ArrowDown/Up, PageDown/Up, Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const jumpToChapter = (progressTarget: number) => {
    if (!containerRef.current) return;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: progressTarget * totalScrollable,
      behavior: 'smooth',
    });
  };

  return (
    <div ref={containerRef} className="relative bg-[#04060b] text-slate-100 min-h-[900vh] select-none">
      
      {/* Tactile Cinematic Film Grain (1.5% opacity) */}
      <div className="film-grain" />

      {/* Fixed Sticky Keynote Stage */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Dynamic Narrative Lighting Rig (4 Cinematic Phases) */}
        <DynamicNarrativeLighting progress={smoothProgress} />

        {/* Minimalist Executive Header (Safe Zone: 0 - 8vh) */}
        <header className="absolute top-5 sm:top-6 left-6 sm:left-10 right-6 sm:right-10 z-50 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff]" />
            <span className="font-bold text-xs tracking-[0.25em] text-white font-space uppercase">
              ONFOCUS
            </span>
          </div>

          <div className="flex items-center gap-3 pointer-events-auto">
            <button
              onClick={onOpenPitch}
              aria-label="Abrir resumo executivo do Pitch Deck"
              className="text-xs font-mono text-slate-300 hover:text-white px-4 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] transition-all"
            >
              Pitch Deck
            </button>
            <a
              href="https://hackthon-ultima-hora.vercel.app/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Acessar o sistema real na Vercel"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] active:scale-95"
            >
              <span>Sistema Real</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </header>

        {/* Floating Chapter Progress Navigator (Desktop Right Safe Margin) */}
        <nav aria-label="Navegação por Capítulos" className="hidden lg:flex flex-col gap-3.5 absolute right-8 sm:right-10 top-1/2 -translate-y-1/2 z-50 pointer-events-auto">
          {CHAPTERS.map((ch, idx) => {
            const isActive = Math.abs(currentProgressVal - ch.progress) < 0.06;
            return (
              <button
                key={idx}
                onClick={() => jumpToChapter(ch.progress)}
                title={ch.label}
                aria-label={`Ir para ${ch.label}`}
                className="group flex items-center gap-3 justify-end text-right transition-all outline-none"
              >
                <span className={`text-[11px] font-mono tracking-wider transition-all duration-300 ${
                  isActive ? 'text-cyan-400 font-bold opacity-100 translate-x-0' : 'text-slate-500 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
                }`}>
                  {ch.label}
                </span>
                <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'w-2.5 h-2.5 bg-cyan-400 shadow-[0_0_12px_#00f0ff] ring-4 ring-cyan-400/20' 
                    : 'bg-white/20 group-hover:bg-white/60'
                }`} />
              </button>
            );
          })}
        </nav>

        {/* Narrative Scrollytelling Stages (Strict Safe Zones: Zero Overlap) */}
        <HeroStage progress={smoothProgress} />
        <ProblemStage progress={smoothProgress} />
        <SolutionStage progress={smoothProgress} />
        <HowItWorksStage progress={smoothProgress} />
        <GeoGebraStage progress={smoothProgress} />
        <DifferentialsStage progress={smoothProgress} />
        <ImpactMetricsStage progress={smoothProgress} />
        <EmotionalPauseStage progress={smoothProgress} />
        <FinalRevealStage progress={smoothProgress} onOpenPitch={onOpenPitch} />

        {/* Central Kinetic Smartphone Protagonist */}
        <CentralKineticPhone progress={smoothProgress} />

      </div>

    </div>
  );
};

/* =========================================================================
   DYNAMIC NARRATIVE LIGHTING RIG (4 CINEMATIC PHASES)
   ========================================================================= */
const DynamicNarrativeLighting: React.FC<{ progress: any }> = ({ progress }) => {
  const warmOpacity = useTransform(progress, [0.08, 0.16, 0.25], [0, 0.75, 0]);
  const cyanOpacity = useTransform(progress, [0.25, 0.35, 0.52], [0, 0.85, 0]);
  const blueOpacity = useTransform(progress, [0.52, 0.65, 0.84], [0, 0.8, 0]);
  const goldOpacity = useTransform(progress, [0.84, 0.94, 1.0], [0, 0.85, 1]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />

      {/* Phase 1: Distraction Warm Flare */}
      <motion.div 
        style={{ opacity: warmOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[460px] radial-halo-warm rounded-full blur-[130px]" 
      />

      {/* Phase 2: NFC Transition Cyan Laser Halo */}
      <motion.div 
        style={{ opacity: cyanOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] radial-halo-cyan rounded-full blur-[150px]" 
      />

      {/* Phase 3: Sapphire Blue Focus Aura */}
      <motion.div 
        style={{ opacity: blueOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] radial-halo-blue rounded-full blur-[160px]" 
      />

      {/* Phase 4: Gold Champagne Finale Aura */}
      <motion.div 
        style={{ opacity: goldOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] radial-halo-gold rounded-full blur-[150px]" 
      />
    </div>
  );
};

/* =========================================================================
   CENTRAL KINETIC PHONE CONTROLLER
   Smoothly controls scale, rotation, screen change and camera depth based on scroll
   ========================================================================= */
const CentralKineticPhone: React.FC<{ progress: any }> = ({ progress }) => {
  // Master Scale (Controlled max: 1.08 to strictly avoid clipping any part of device or captions)
  const phoneScale = useTransform(
    progress,
    [0.0, 0.08, 0.15, 0.28, 0.42, 0.56, 0.70, 0.82, 0.90, 0.96, 1.0],
    [0.82, 0.92, 1.00, 1.00, 1.00, 1.08, 0.95, 0.90, 0.70, 0.88, 0.92]
  );

  // Phone Y Position: Starts low (y: 360) at progress 0 so Hero text in top 28vh is completely unobstructed
  const phoneY = useTransform(
    progress,
    [0.0, 0.08, 0.14, 0.26, 0.56, 0.70, 0.84, 0.92, 1.0],
    [360, 200, 0, 0, -8, 0, 10, 35, 0]
  );

  // Phone X Position: Shifts right on desktop for 2-column narrative chapters (Split Screen)
  const phoneX = useTransform(
    progress,
    [0.0, 0.24, 0.29, 0.48, 0.54, 0.68, 0.74, 0.84, 1.0],
    [0, 0, 200, 200, 0, 0, 0, 0, 0]
  );

  // Phone 3D Rotation for physical presence
  const phoneRotateY = useTransform(
    progress,
    [0.0, 0.12, 0.24, 0.32, 0.46, 0.56, 0.70, 0.86, 1.0],
    [0, -4, 0, -6, -6, 0, 0, 0, 0]
  );

  const phoneRotateX = useTransform(
    progress,
    [0.0, 0.08, 0.28, 0.56, 0.80, 1.0],
    [5, 0, 2, 0, 0, 0]
  );

  // Phone Opacity: Fades to 0.06 in Emotional Pause to put 100% focus on the text
  const phoneOpacity = useTransform(
    progress,
    [0.0, 0.04, 0.86, 0.90, 0.94, 1.0],
    [0.75, 1, 1, 0.06, 0.85, 1]
  );

  const [activeScreen, setActiveScreen] = useState<ScreenType>('standby');

  useEffect(() => {
    return progress.onChange((v: number) => {
      if (v < 0.22) {
        setActiveScreen('standby');
      } else if (v < 0.38) {
        setActiveScreen('nfc');
      } else if (v < 0.52) {
        setActiveScreen('launcher');
      } else if (v < 0.68) {
        setActiveScreen('geogebra');
      } else if (v < 0.82) {
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
        x: phoneX,
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
   STAGE 0: HERO — PRIMEIRO IMPACTO (0.00 - 0.10)
   Cinematic opening teaser with generous negative space
   ========================================================================= */
const HeroStage: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.0, 0.06, 0.09], [1, 0.6, 0]);
  const y = useTransform(progress, [0.0, 0.09], [0, -35]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute top-12 sm:top-14 left-0 w-full flex flex-col items-center justify-start text-center px-6 z-30 pointer-events-none"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Minimal Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md mb-3 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[9.5px] sm:text-[10.5px] font-mono uppercase tracking-[0.25em] text-cyan-300 font-semibold">
            TECNOLOGIA PEDAGÓGICA • HACKATHON 2026
          </span>
        </div>

        {/* Master Brand Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold font-space tracking-[-0.04em] uppercase text-white leading-none mb-3">
          <span className="gradient-title-hero">ONFOCUS</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl md:text-2xl font-light text-slate-300 font-space max-w-xl mx-auto mb-4 tracking-tight leading-snug">
          "Transformando o celular no maior aliado da sala de aula."
        </p>

        {/* Scroll Invitation */}
        <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/[0.03] px-3.5 py-1 rounded-full border border-white/[0.06]">
          <ArrowDown className="w-3 h-3 text-cyan-400 animate-bounce" />
          <span>Scroll para explorar ↓</span>
        </div>

      </div>
    </motion.div>
  );
};

/* =========================================================================
   STAGE 1: O PROBLEMA (TENSÃO NARRATIVA) (0.12 - 0.24)
   Cinematic Cadence: "Um problema simples" → "O smartphone distrai" → "Mas e se..."
   ========================================================================= */
const ProblemStage: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.11, 0.14, 0.23, 0.25], [0, 1, 1, 0]);
  const chaosScale = useTransform(progress, [0.12, 0.17, 0.23], [1.05, 1, 0.92]);

  // Sequential punchy statement transitions
  const p1Op = useTransform(progress, [0.12, 0.14, 0.165, 0.175], [0, 1, 1, 0]);
  const p2Op = useTransform(progress, [0.175, 0.19, 0.215, 0.225], [0, 1, 1, 0]);
  const p3Op = useTransform(progress, [0.225, 0.235, 0.25, 0.26], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 pointer-events-none z-30"
    >
      {/* Top Headline Safe Zone */}
      <div className="absolute top-12 sm:top-14 left-0 w-full flex flex-col items-center text-center px-6">
        <span className="text-[10.5px] font-mono uppercase tracking-[0.25em] text-rose-400 font-semibold mb-1.5 block">
          01 / O PROBLEMA REAL
        </span>
        
        {/* Dynamic Sequential Messages */}
        <div className="relative h-14 sm:h-16 w-full max-w-xl mx-auto flex items-center justify-center">
          <motion.h2 style={{ opacity: p1Op }} className="absolute text-xl sm:text-3xl md:text-4xl font-bold font-space tracking-[-0.03em] text-white">
            "Um problema simples."
          </motion.h2>

          <motion.h2 style={{ opacity: p2Op }} className="absolute text-xl sm:text-3xl md:text-4xl font-bold font-space tracking-[-0.03em] text-rose-300">
            "O smartphone distrai."
          </motion.h2>

          <motion.h2 style={{ opacity: p3Op }} className="absolute text-lg sm:text-2xl md:text-3xl font-bold font-space tracking-[-0.03em] text-white">
            "Mas e se ele entendesse quando é hora de focar?"
          </motion.h2>
        </div>
      </div>

      {/* Floating Distraction Banners (Positioned strictly in outer wings) */}
      <motion.div
        style={{ scale: chaosScale }}
        className="absolute inset-0 w-full max-w-6xl mx-auto flex items-center justify-center pointer-events-none"
      >
        {/* Instagram Popup */}
        <div className="absolute top-[34%] left-3 sm:left-8 lg:left-14 w-48 sm:w-56 px-3.5 py-2.5 rounded-2xl toast-distraction border border-rose-500/30 text-left shadow-2xl -rotate-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span className="text-[11px] font-bold text-white font-space">Instagram • Agora</span>
          </div>
          <div className="text-[11px] text-slate-300 font-light leading-tight">Lucas e 18 pessoas curtiram seu story</div>
        </div>

        {/* WhatsApp Popup */}
        <div className="absolute top-[30%] right-3 sm:right-8 lg:right-14 w-48 sm:w-56 px-3.5 py-2.5 rounded-2xl toast-distraction border border-emerald-500/30 text-left shadow-2xl rotate-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold text-white font-space">WhatsApp (42 msgs)</span>
          </div>
          <div className="text-[11px] text-slate-300 font-light leading-tight">Grupo da Turma: "Alguém fez o trabalho?"</div>
        </div>

        {/* TikTok Popup */}
        <div className="absolute bottom-[18%] left-4 sm:left-10 lg:left-16 w-48 sm:w-56 px-3.5 py-2.5 rounded-2xl toast-distraction border border-sky-500/30 text-left shadow-2xl rotate-3 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span className="text-[11px] font-bold text-white font-space">TikTok</span>
          </div>
          <div className="text-[11px] text-slate-300 font-light leading-tight">Novo vídeo viral em alta 🔥</div>
        </div>

        {/* Games Popup */}
        <div className="absolute bottom-[22%] right-4 sm:right-10 lg:right-16 w-48 sm:w-56 px-3.5 py-2.5 rounded-2xl toast-distraction border border-amber-500/30 text-left shadow-2xl -rotate-3 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[11px] font-bold text-white font-space">Jogo Online</span>
          </div>
          <div className="text-[11px] text-slate-300 font-light leading-tight">Recompensa expira em 12 minutos!</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* =========================================================================
   STAGE 2: A SOLUÇÃO (TRANSFORMAÇÃO) (0.26 - 0.38)
   SPLIT SCREEN: Left Column Narrative | Right Column Phone
   ========================================================================= */
const SolutionStage: React.FC<{ progress: any }> = ({ progress }) => {
  const op = useTransform(progress, [0.26, 0.29, 0.36, 0.38], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.26, 0.29, 0.36, 0.38], [20, 0, 0, -20]);

  return (
    <div className="absolute inset-y-0 left-6 sm:left-12 lg:left-28 flex items-center max-w-md w-full z-30 pointer-events-none">
      <motion.div style={{ opacity: op, y }} className="space-y-3">
        <span className="text-[10.5px] font-mono text-cyan-400 font-semibold tracking-[0.2em] block">
          02 / A TRANSFORMAÇÃO
        </span>
        <h3 className="text-3xl sm:text-5xl font-bold font-space text-white tracking-[-0.03em] leading-tight">
          A Proximidade que Gera Foco.
        </h3>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          Sem caixas recolhedoras. Sem aplicativos invasivos. 1 aproximação na carteira transforma o smartphone em um terminal de aprendizagem ativa.
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Autenticação NFC Criptografada em 400ms</span>
        </div>
      </motion.div>
    </div>
  );
};

/* =========================================================================
   STAGE 3: COMO FUNCIONA (FLUXO CONTÍNUO) (0.38 - 0.52)
   Sequential Progressive Walkthrough
   ========================================================================= */
const HowItWorksStage: React.FC<{ progress: any }> = ({ progress }) => {
  // Step 1: Aproximação
  const op1 = useTransform(progress, [0.38, 0.40, 0.42, 0.43], [0, 1, 1, 0]);
  const y1 = useTransform(progress, [0.38, 0.40, 0.42, 0.43], [15, 0, 0, -15]);

  // Step 2: Kiosk Mode Ativado
  const op2 = useTransform(progress, [0.43, 0.45, 0.47, 0.48], [0, 1, 1, 0]);
  const y2 = useTransform(progress, [0.43, 0.45, 0.47, 0.48], [15, 0, 0, -15]);

  // Step 3: Whitelist Pedagógica
  const op3 = useTransform(progress, [0.48, 0.50, 0.52, 0.53], [0, 1, 1, 0]);
  const y3 = useTransform(progress, [0.48, 0.50, 0.52, 0.53], [15, 0, 0, -15]);

  return (
    <div className="absolute inset-y-0 left-6 sm:left-12 lg:left-28 flex items-center max-w-md w-full z-30 pointer-events-none">
      <div className="relative w-full">
        
        {/* Step 1 */}
        <motion.div style={{ opacity: op1, y: y1 }} className="absolute inset-0">
          <span className="text-[10.5px] font-mono text-cyan-400 font-semibold tracking-[0.2em] block mb-1.5">
            03 / PASSO 01: APROXIMAÇÃO
          </span>
          <h3 className="text-3xl sm:text-5xl font-bold font-space text-white tracking-[-0.03em] mb-3 leading-tight">
            "1 toque na carteira."
          </h3>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            O aluno chega à sala e posiciona o aparelho sobre a tag física autenticada da mesa.
          </p>
        </motion.div>

        {/* Step 2 */}
        <motion.div style={{ opacity: op2, y: y2 }} className="absolute inset-0">
          <span className="text-[10.5px] font-mono text-cyan-400 font-semibold tracking-[0.2em] block mb-1.5">
            03 / PASSO 02: LOCK TASK MODE
          </span>
          <h3 className="text-3xl sm:text-5xl font-bold font-space text-white tracking-[-0.03em] mb-3 leading-tight">
            "O foco é automático."
          </h3>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            O Android fixa o Launcher Seguro pedagógico sem necessidade de fiscalização manual.
          </p>
        </motion.div>

        {/* Step 3 */}
        <motion.div style={{ opacity: op3, y: y3 }} className="absolute inset-0">
          <span className="text-[10.5px] font-mono text-cyan-400 font-semibold tracking-[0.2em] block mb-1.5">
            03 / PASSO 03: WHITELIST
          </span>
          <h3 className="text-3xl sm:text-5xl font-bold font-space text-white tracking-[-0.03em] mb-3 leading-tight">
            "Sem distrações."
          </h3>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Apenas GeoGebra, Calculadora e documentos autorizados pelo professor ficam visíveis.
          </p>
        </motion.div>

      </div>
    </div>
  );
};

/* =========================================================================
   STAGE 4: GEOGEBRA & DEMONSTRAÇÃO DE PRODUTO (0.54 - 0.68)
   Macro Zoom + Mathematical Plot Feature Showcase
   ========================================================================= */
const GeoGebraStage: React.FC<{ progress: any }> = ({ progress }) => {
  const op = useTransform(progress, [0.54, 0.57, 0.65, 0.68], [0, 1, 1, 0]);

  return (
    <div className="absolute bottom-6 sm:bottom-8 left-0 w-full flex items-center justify-center text-center px-6 z-30 pointer-events-none">
      <motion.div style={{ opacity: op }} className="text-center max-w-lg">
        <span className="text-[10.5px] font-mono text-cyan-400 uppercase tracking-widest font-semibold block mb-1">
          04 / PRODUTO EM AÇÃO
        </span>
        <h3 className="text-2xl sm:text-4xl font-bold font-space text-white tracking-[-0.03em] mb-1">
          "Menos distração. Mais atenção."
        </h3>
        <p className="text-xs font-mono text-slate-400">
          GeoGebra Pro e ferramentas analíticas ativas em modo tela cheia com segurança.
        </p>
      </motion.div>
    </div>
  );
};

/* =========================================================================
   STAGE 5: O DIFERENCIAL (GTA VI / APPLE TRAILER HIGH-IMPACT) (0.68 - 0.80)
   Sequential Monumental Statements with generous breathing space
   ========================================================================= */
const DifferentialsStage: React.FC<{ progress: any }> = ({ progress }) => {
  const d1Op = useTransform(progress, [0.68, 0.70, 0.72, 0.73], [0, 1, 1, 0]);
  const d2Op = useTransform(progress, [0.73, 0.75, 0.77, 0.78], [0, 1, 1, 0]);
  const d3Op = useTransform(progress, [0.78, 0.80, 0.82, 0.83], [0, 1, 1, 0]);

  return (
    <div className="absolute inset-0 flex items-center justify-center text-center px-6 z-30 pointer-events-none">
      
      {/* Statement 1 */}
      <motion.div style={{ opacity: d1Op }} className="absolute max-w-3xl">
        <span className="text-[10.5px] font-mono uppercase tracking-[0.25em] text-cyan-400 font-semibold mb-2 block">
          05 / O DIFERENCIAL
        </span>
        <h2 className="text-3xl sm:text-6xl md:text-7xl font-extrabold font-space tracking-[-0.04em] uppercase text-white leading-tight">
          "Sem recolher celulares."
        </h2>
      </motion.div>

      {/* Statement 2 */}
      <motion.div style={{ opacity: d2Op }} className="absolute max-w-3xl">
        <span className="text-[10.5px] font-mono uppercase tracking-[0.25em] text-cyan-400 font-semibold mb-2 block">
          05 / O DIFERENCIAL
        </span>
        <h2 className="text-3xl sm:text-6xl md:text-7xl font-extrabold font-space tracking-[-0.04em] uppercase text-white leading-tight">
          "Sem fiscalização constante."
        </h2>
      </motion.div>

      {/* Statement 3 */}
      <motion.div style={{ opacity: d3Op }} className="absolute max-w-3xl">
        <span className="text-[10.5px] font-mono uppercase tracking-[0.25em] text-cyan-400 font-semibold mb-2 block">
          05 / O DIFERENCIAL
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-space tracking-[-0.04em] uppercase text-white leading-tight">
          "Controle inteligente baseado em proximidade."
        </h2>
      </motion.div>

    </div>
  );
};

/* =========================================================================
   STAGE 6: IMPACTO & MÉTRICAS (0.80 - 0.88)
   Real Quantitative / Qualitative Benefits
   ========================================================================= */
const ImpactMetricsStage: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.80, 0.83, 0.87, 0.89], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.80, 0.83, 0.87, 0.89], [20, 0, 0, -20]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute top-12 sm:top-14 left-0 w-full flex flex-col items-center text-center px-6 z-30 pointer-events-none"
    >
      <span className="text-[10.5px] font-mono uppercase tracking-[0.25em] text-emerald-400 font-semibold mb-1.5 block">
        06 / IMPACTO COMPROVADO
      </span>
      <h3 className="text-2xl sm:text-4xl font-bold font-space text-white tracking-tight mb-6">
        Precisão Técnica & Conformidade
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl w-full">
        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-center">
          <div className="text-2xl sm:text-3xl font-extrabold font-space text-cyan-400 mb-0.5">400ms</div>
          <div className="text-[11px] font-mono text-slate-300">Leitura NFC Instantânea</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-center">
          <div className="text-2xl sm:text-3xl font-extrabold font-space text-emerald-400 mb-0.5">100%</div>
          <div className="text-[11px] font-mono text-slate-300">Conforme LGPD</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-center">
          <div className="text-2xl sm:text-3xl font-extrabold font-space text-indigo-400 mb-0.5">0</div>
          <div className="text-[11px] font-mono text-slate-300">Interrupções em Aula</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-center">
          <div className="text-2xl sm:text-3xl font-extrabold font-space text-white mb-0.5">50 min</div>
          <div className="text-[11px] font-mono text-slate-300">Foco Ativo Garantido</div>
        </div>
      </div>
    </motion.div>
  );
};

/* =========================================================================
   STAGE 7: PAUSA EMOCIONAL (0.88 - 0.94)
   Phone recedes into dark void; Pure typography focus
   ========================================================================= */
const EmotionalPauseStage: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.88, 0.90, 0.93, 0.95], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.88, 0.95], [15, -15]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-30 pointer-events-none"
    >
      <div className="max-w-3xl mx-auto">
        <span className="text-[10.5px] font-mono uppercase tracking-[0.3em] text-slate-500 mb-4 block font-semibold">
          O PROPÓSITO
        </span>

        <h2 className="text-2xl sm:text-5xl md:text-6xl font-bold font-space text-slate-500 mb-3 leading-tight tracking-[-0.03em]">
          "FOCO NÃO É PROIBIR."
        </h2>

        <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold font-space text-white leading-tight tracking-[-0.03em]">
          "É CRIAR O <span className="gradient-title-accent">AMBIENTE CERTO</span>."
        </h3>
      </div>
    </motion.div>
  );
};

/* =========================================================================
   STAGE 8: REVELAÇÃO FINAL & CTAS (0.95 - 1.00)
   Cinematic Trailer Conclusion
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
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-40 bg-black/75 backdrop-blur-md"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Logo Monogram */}
        <div
          onClick={triggerReward}
          className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mb-5 shadow-[0_0_40px_rgba(0,240,255,0.3)] cursor-pointer hover:scale-105 transition-transform"
        >
          <Target className="w-7 h-7" />
        </div>

        <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold font-space tracking-[-0.04em] text-white mb-2 leading-none">
          ONFOCUS
        </h2>

        <p className="text-lg sm:text-2xl text-slate-300 font-light max-w-xl mx-auto mb-8 font-space tracking-tight">
          "Menos distração. Mais foco."
        </p>

        {/* Action Triggers */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-8">
          <a
            href="https://hackthon-ultima-hora.vercel.app/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-950/50 transition-all flex items-center gap-2 active:scale-95"
          >
            <span>Experimentar o OnFocus</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenPitch}
            className="px-7 py-3 rounded-full font-mono text-xs font-medium uppercase tracking-wider text-slate-300 bg-white/10 hover:bg-white/15 border border-white/10 transition-all flex items-center gap-2 active:scale-95"
          >
            <Presentation className="w-4 h-4 text-cyan-400" />
            <span>Ver Pitch Deck</span>
          </button>
        </div>

        <div className="text-xs font-mono text-slate-500">
          "Uma nova forma de transformar tecnologia em foco."<br />
          <span className="text-slate-600 mt-1 block">Hackathon Última Hora 2026</span>
        </div>

      </div>
    </motion.div>
  );
};



