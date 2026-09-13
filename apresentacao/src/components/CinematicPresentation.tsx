import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MorphingDevice } from './MorphingDevice';
import { 
  ExternalLink, Presentation, Target, ArrowDown, 
  Shield, Radio, CheckCircle2, AlertTriangle, Sparkles, 
  Zap, Clock, Award, Users, Compass, Lock,
  BarChart3, School, Layers, Settings, BookOpen,
  Heart, ArrowRight, Check, Eye, Smartphone, Laptop
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

  // Continuous scroll track across 1100vh
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
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden">
        
        {/* Dynamic Narrative Lighting Rig */}
        <DynamicNarrativeLighting progress={smoothProgress} />

        {/* Minimalist Executive Header */}
        <header className="relative top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-10 pt-4 sm:pt-6 pointer-events-none shrink-0">
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
              className="text-xs font-mono text-slate-300 hover:text-white px-3.5 sm:px-4 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Presentation className="w-3.5 h-3.5 text-cyan-400" />
              <span>Pitch Deck (10 Slides)</span>
            </button>
            <a
              href="https://hackthon-ultima-hora.vercel.app/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Acessar o Gestor Web na Vercel"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] active:scale-95 cursor-pointer"
            >
              <span>Gestor Web</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </header>

        {/* Floating Chapter Progress Navigator (Desktop Right Safe Margin) */}
        <nav aria-label="Navegação por Capítulos" className="hidden xl:flex flex-col gap-2 absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 z-50 pointer-events-auto">
          {CHAPTERS.map((ch, idx) => {
            const isActive = Math.abs(currentProgressVal - ch.progress) < 0.055;
            return (
              <button
                key={idx}
                onClick={() => jumpToChapter(ch.progress)}
                title={ch.label}
                aria-label={`Ir para ${ch.label}`}
                className="group flex items-center gap-2.5 justify-end text-right transition-all outline-none py-0.5 cursor-pointer"
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

        {/* =================================================================
            STRICT TWO-ZONE SPLIT STAGE
            Zone 1 (Left 46-48% on Desktop, Top 40vh on Mobile): Dedicated exclusively to Text/Cards
            Zone 2 (Right 52-54% on Desktop, Bottom 48vh on Mobile): Dedicated exclusively to Device
            ABSOLUTELY ZERO TEXT COLLISION OR OVERLAY!
            ================================================================= */}
        <main className="relative flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 overflow-hidden z-20 pb-2 sm:pb-4">
          
          {/* ZONE 1: Narrative Text Column (Left) */}
          <div className="w-full lg:w-[46%] xl:w-[48%] h-[38vh] sm:h-[40vh] lg:h-[78vh] flex flex-col justify-center relative z-20 pointer-events-none">
            <HeroStageText progress={smoothProgress} />
            <ProblemStageText progress={smoothProgress} />
            <ProposalStageText progress={smoothProgress} />
            <HowItWorksStageText progress={smoothProgress} />
            <GestorShowcaseStageText progress={smoothProgress} />
            <ThreePillarsStageText progress={smoothProgress} />
            <MentalHealthStageText progress={smoothProgress} />
            <ViabilityStageText progress={smoothProgress} />
            <RoadmapStageText progress={smoothProgress} />
            <FinalRevealStageText progress={smoothProgress} onOpenPitch={onOpenPitch} />
          </div>

          {/* ZONE 2: Interactive Device & Solution Pillar Column (Right) */}
          <div className="w-full lg:w-[54%] xl:w-[52%] h-[46vh] sm:h-[48vh] lg:h-[78vh] flex flex-col items-center justify-center relative z-10">
            
            {/* Active Solution Dynamic Badge */}
            <ActiveSolutionBadge progress={smoothProgress} />

            {/* Morphing Kinetic Device (Fluidly transforms Phone <-> Laptop) */}
            <div className="relative w-full flex-1 flex items-center justify-center">
              <MorphingDevice progress={smoothProgress} />
            </div>

          </div>

        </main>

        {/* Subtle Bottom Status Bar */}
        <footer className="relative bottom-0 left-0 right-0 px-6 sm:px-10 py-2 sm:py-2.5 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-white/[0.05] z-30 pointer-events-none shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-slate-400">Pré-Pitching Hacktudo 2026</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <span>Setas [↑ / ↓] para navegar</span>
            <span>Tecla [P] abre Pitch Deck</span>
          </div>
          <span className="text-cyan-400/80 font-bold">ÚLTIMA HORA</span>
        </footer>

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
   ACTIVE SOLUTION BADGE (Clearly displays which application is featured)
   ========================================================================= */
const ActiveSolutionBadge: React.FC<{ progress: any }> = ({ progress }) => {
  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    return progress.onChange((v: number) => {
      // Laptop mode active during Gestor Showcase (0.38 - 0.63) and Viability (0.74 - 0.86)
      const laptopActive = (v >= 0.38 && v < 0.63) || (v >= 0.74 && v < 0.86);
      setIsLaptop(laptopActive);
    });
  }, [progress]);

  return (
    <div className="mb-2 sm:mb-3 flex items-center justify-center pointer-events-none transition-all duration-300">
      <div className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full text-[9.5px] sm:text-[10.5px] font-mono border backdrop-blur-md shadow-lg transition-all duration-300 ${
        isLaptop
          ? 'bg-indigo-950/80 border-indigo-400/50 text-indigo-200 shadow-[0_0_20px_rgba(99,102,241,0.25)]'
          : 'bg-cyan-950/80 border-cyan-400/50 text-cyan-200 shadow-[0_0_20px_rgba(0,240,255,0.25)]'
      }`}>
        {isLaptop ? (
          <Laptop className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
        ) : (
          <Smartphone className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        )}
        <span className="font-bold uppercase tracking-wider">
          {isLaptop ? 'Aplicação 2: Sistema Gestor Web' : 'Aplicação 1: Aplicativo Mobile'}
        </span>
        <span className="text-white/30 hidden sm:inline">•</span>
        <span className="text-slate-300 hidden sm:inline font-sans text-[10px]">
          {isLaptop ? 'Painel Docente & Coordenação (Next.js SaaS)' : 'Experiência do Aluno em Sala de Aula'}
        </span>
      </div>
    </div>
  );
};

/* =========================================================================
   STAGE 1: HERO (Slide 1 do PDF)
   ========================================================================= */
const HeroStageText: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.0, 0.05, 0.075], [1, 0.5, 0]);
  const y = useTransform(progress, [0.0, 0.075], [0, -25]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center text-left pointer-events-none"
    >
      <div className="space-y-3 sm:space-y-3.5 max-w-xl">
        
        {/* Hacktudo Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-300 font-semibold">
            HACKTUDO 2026 · USO CONSCIENTE DE SMARTPHONES
          </span>
        </div>

        {/* Master Brand */}
        <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold font-space tracking-[-0.04em] uppercase text-white leading-none">
          <span className="gradient-title-hero">ONFOCUS</span>
        </h1>

        {/* Slogan */}
        <p className="text-lg sm:text-2xl font-light text-cyan-300 font-space tracking-tight">
          "Seu foco começa aqui."
        </p>

        {/* Official Subtitle from PDF */}
        <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed font-sans">
          Projeto para uso consciente do celular na escola: a liberação de aplicativos é definida aula a aula e ativada pela aproximação física do aparelho à sala.
        </p>

        {/* 2 Connected Applications Highlights */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="p-2 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-left">
            <div className="flex items-center gap-1.5 text-cyan-400 text-[10px] font-mono font-bold mb-0.5">
              <Smartphone className="w-3 h-3" />
              <span>App Mobile Aluno</span>
            </div>
            <p className="text-[10.5px] text-slate-400 leading-tight">Kiosk, NFC na carteira e reflexão consciente.</p>
          </div>

          <div className="p-2 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-left">
            <div className="flex items-center gap-1.5 text-indigo-400 text-[10px] font-mono font-bold mb-0.5">
              <Laptop className="w-3 h-3" />
              <span>Gestor Web Escola</span>
            </div>
            <p className="text-[10.5px] text-slate-400 leading-tight">Next.js 14, 7 módulos e telemetria em tempo real.</p>
          </div>
        </div>

        {/* Team Credits & Scroll Cue */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1.5">
          <span className="text-[10.5px] font-mono text-slate-400 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
            Equipe · Última Hora | Pré-Pitching
          </span>
          <div className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-500/30">
            <ArrowDown className="w-3 h-3 animate-bounce" />
            <span>Role para explorar ↓</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

/* =========================================================================
   STAGE 2: A PESQUISA & O PROBLEMA (Slide 2 do PDF)
   ========================================================================= */
const ProblemStageText: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.07, 0.095, 0.165, 0.185], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.07, 0.095, 0.165, 0.185], [25, 0, 0, -25]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center text-left pointer-events-none"
    >
      <div className="space-y-2.5 sm:space-y-3 max-w-xl">
        
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-rose-400 font-semibold mb-0.5 block">
            01 · O PROBLEMA REAL
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold font-space text-white tracking-tight leading-snug">
            O que a pesquisa mostra sobre o celular na aula
          </h2>
          <p className="text-xs text-slate-300 font-light leading-relaxed mt-0.5">
            O desafio da edição pede uma relação mais consciente entre tecnologia e educação.
          </p>
        </div>

        {/* 3 Scientific Research Cards */}
        <div className="space-y-2">
          {/* Study 1 */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-rose-500/30 backdrop-blur-md">
            <span className="text-[9.5px] font-mono font-bold text-rose-400 block mb-0.5">
              ESTUDO RUTGERS UNIVERSITY
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-white font-space mb-0.5">
              A distração é coletiva
            </h4>
            <p className="text-[11px] text-slate-300 font-light leading-snug">
              Sem estrutura de uso, o celular em sala prejudica as notas <strong>até de quem não está usando o aparelho</strong>.
            </p>
          </div>

          {/* Study 2 */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-cyan-500/30 backdrop-blur-md">
            <span className="text-[9.5px] font-mono font-bold text-cyan-400 block mb-0.5">
              INFORMATION SYSTEMS RESEARCH
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-white font-space mb-0.5">
              Proibição x liberação
            </h4>
            <p className="text-[11px] text-slate-300 font-light leading-snug">
              Liberação livre reduz o desempenho, mas esse <strong>desempenho aumenta quando o uso é guiado pelo professor</strong>.
            </p>
          </div>

          {/* Study 3 */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-amber-500/30 backdrop-blur-md">
            <span className="text-[9.5px] font-mono font-bold text-amber-400 block mb-0.5">
              LEVANTAMENTO EM SALA DE AULA
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-white font-space mb-0.5">
              Falta incentivo para o professor
            </h4>
            <p className="text-[11px] text-slate-300 font-light leading-snug">
              A ausência de incentivo é uma das <strong>principais razões pelas quais professores não adotam novas ferramentas</strong>.
            </p>
          </div>
        </div>

        {/* Synthesis Callout */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-[11px] text-cyan-200">
          <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
          <span>
            <strong>O Onfocus parte desses 3 pontos:</strong> foco coletivo, mediação docente e visibilidade.
          </span>
        </div>

      </div>
    </motion.div>
  );
};

/* =========================================================================
   STAGE 3: A PROPOSTA (Slide 3 do PDF)
   ========================================================================= */
const ProposalStageText: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.18, 0.205, 0.275, 0.295], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.18, 0.205, 0.275, 0.295], [25, 0, 0, -25]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center text-left pointer-events-none"
    >
      <div className="space-y-3 max-w-xl">
        
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold block mb-1">
            02 · A PROPOSTA
          </span>
          <h3 className="text-xl sm:text-3xl font-bold font-space text-white tracking-tight leading-tight">
            Cada aula define o que o celular pode fazer.
          </h3>
          <p className="text-xs text-slate-300 font-light leading-relaxed mt-1">
            Em vez de proibir ou liberar o aparelho inteiro, o Onfocus muda o que é controlado: <strong>não é o celular do aluno, é o contexto da aula em que ele está</strong>.
          </p>
        </div>

        {/* 3 Pillars of Proposal */}
        <div className="space-y-2">
          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-cyan-500/30 flex items-start gap-2.5">
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

          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-rose-500/30 flex items-start gap-2.5">
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

          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-indigo-500/30 flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white font-space">O uso pedagógico deixa de ser invisível</h5>
              <p className="text-[11px] text-slate-300 font-light leading-tight mt-0.5">
                O uso educativo aparece para a escola no Gestor, criando a base para reconhecer quem ensina a favor do aprendizado.
              </p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

/* =========================================================================
   STAGE 4: COMO FUNCIONA (Slide 4 do PDF)
   ========================================================================= */
const HowItWorksStageText: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.29, 0.315, 0.385, 0.405], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.29, 0.315, 0.385, 0.405], [25, 0, 0, -25]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center text-left pointer-events-none"
    >
      <div className="space-y-2.5 sm:space-y-3 max-w-xl">
        
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold block mb-0.5">
            03 · COMO FUNCIONA
          </span>
          <h3 className="text-xl sm:text-3xl font-bold font-space text-white tracking-tight leading-tight">
            Da configuração da aula ao uso em sala
          </h3>
          <div className="mt-1.5 p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-[11px] text-cyan-200">
            <span className="font-semibold">Antes da aula, no Gestor:</span> o professor escolhe quais aplicativos ficam liberados para aquela turma.
          </div>
        </div>

        {/* 4 Sequential Steps */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <span className="text-base font-extrabold font-space text-cyan-400 block mb-0.5">01</span>
            <h5 className="text-xs font-bold text-white font-space mb-0.5">Aproximar</h5>
            <p className="text-[10.5px] text-slate-300 font-light leading-tight">
              O aluno encosta o celular na tag NFC da carteira no início da aula.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <span className="text-base font-extrabold font-space text-cyan-400 block mb-0.5">02</span>
            <h5 className="text-xs font-bold text-white font-space mb-0.5">Validar</h5>
            <p className="text-[10.5px] text-slate-300 font-light leading-tight">
              Assinatura digital 24h confirma a sala e carrega a lista da aula.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <span className="text-base font-extrabold font-space text-cyan-400 block mb-0.5">03</span>
            <h5 className="text-xs font-bold text-white font-space mb-0.5">Focar</h5>
            <p className="text-[10.5px] text-slate-300 font-light leading-tight">
              Na tela do aluno, aparecem apenas os aplicativos autorizados.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-emerald-500/30">
            <span className="text-base font-extrabold font-space text-emerald-400 block mb-0.5">04</span>
            <h5 className="text-xs font-bold text-white font-space mb-0.5">Liberar</h5>
            <p className="text-[10.5px] text-slate-300 font-light leading-tight">
              Ao fim do horário, o controle total volta automaticamente.
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

/* =========================================================================
   STAGE 5: DEMONSTRAÇÃO DO GESTOR SAAS (Slide 5 do PDF)
   Here the smartphone morphs physically into a Laptop!
   ========================================================================= */
const GestorShowcaseStageText: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.40, 0.425, 0.495, 0.515], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.40, 0.425, 0.495, 0.515], [25, 0, 0, -25]);

  const modules = [
    { name: 'Dashboard', icon: BarChart3 },
    { name: 'Turmas (12)', icon: Users },
    { name: 'Aulas Hoje (36)', icon: BookOpen },
    { name: 'Salas NFC', icon: School },
    { name: 'Aplicativos', icon: Layers },
    { name: 'Relatórios', icon: Award },
    { name: 'Configurações', icon: Settings },
  ];

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center text-left pointer-events-none"
    >
      <div className="space-y-2.5 sm:space-y-3 max-w-xl">
        
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-400 font-semibold block mb-0.5">
            04 · DEMONSTRAÇÃO DO GESTOR
          </span>
          <h3 className="text-xl sm:text-3xl font-bold font-space text-white tracking-tight leading-tight">
            O Gestor: painel já implementado
          </h3>
          <p className="text-xs text-slate-300 font-light leading-relaxed mt-0.5">
            Aplicação web construída em <strong>Next.js 14</strong>, com sete módulos navegáveis e deploy ativo, disponível para consulta. Veja a transformação física ao lado!
          </p>
        </div>

        {/* 7 Modules List */}
        <div className="grid grid-cols-2 gap-1.5">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div key={idx} className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-2">
                <Icon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-xs text-white font-medium truncate">{mod.name}</span>
              </div>
            );
          })}
        </div>

        {/* 7 Modules Highlight & Link */}
        <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between pointer-events-auto">
          <div>
            <div className="text-xl font-extrabold font-space text-indigo-300">7 Módulos Web</div>
            <div className="text-[10.5px] text-slate-300 font-light">Métricas simuladas em tempo real</div>
          </div>
          <a
            href="https://hackthon-ultima-hora.vercel.app/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-cyan-400 text-black font-space font-bold text-xs hover:bg-cyan-300 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <span>Ver Gestor</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </motion.div>
  );
};

/* =========================================================================
   STAGE 6: OS 3 PILARES DO DESAFIO (Slide 6 do PDF)
   ========================================================================= */
const ThreePillarsStageText: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.51, 0.535, 0.605, 0.625], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.51, 0.535, 0.605, 0.625], [25, 0, 0, -25]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center text-left pointer-events-none"
    >
      <div className="space-y-2.5 max-w-xl">
        
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold block mb-0.5">
            05 · OS 3 PILARES
          </span>
          <h3 className="text-xl sm:text-3xl font-bold font-space text-white tracking-tight">
            Cada pilar do desafio, em ação no produto
          </h3>
        </div>

        <div className="space-y-2">
          {/* Tecnologia */}
          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-cyan-500/30">
            <div className="flex items-center gap-2 text-cyan-400 font-space font-bold text-xs mb-0.5">
              <Shield className="w-3.5 h-3.5" />
              <span>Tecnologia</span>
            </div>
            <p className="text-[11px] text-slate-300 font-light leading-relaxed">
              Tags NFC com assinatura digital renovada a cada 24h contra fraudes, Android em modo Kiosk e visibilidade do uso para a coordenação.
            </p>
          </div>

          {/* Metodologia */}
          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-indigo-500/30">
            <div className="flex items-center gap-2 text-indigo-400 font-space font-bold text-xs mb-0.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Metodologia</span>
            </div>
            <p className="text-[11px] text-slate-300 font-light leading-relaxed">
              O professor escolhe aula a aula quais apps ficam disponíveis, com catálogo validado pedagogicamente antes de entrar no sistema.
            </p>
          </div>

          {/* Saúde Mental */}
          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-rose-500/30">
            <div className="flex items-center gap-2 text-rose-400 font-space font-bold text-xs mb-0.5">
              <Heart className="w-3.5 h-3.5" />
              <span>Saúde Mental</span>
            </div>
            <p className="text-[11px] text-slate-300 font-light leading-relaxed">
              Tela de reflexão em vez de bloqueio punitivo. Privacidade total (nunca acessa câmera ou microfone). Selo de foco para engajamento genuíno.
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

/* =========================================================================
   STAGE 7: SAÚDE MENTAL & THE LANCET (Slide 7 do PDF)
   Device morphs back to Smartphone displaying Mindful Reflection Screen
   ========================================================================= */
const MentalHealthStageText: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.62, 0.645, 0.715, 0.735], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.62, 0.645, 0.715, 0.735], [25, 0, 0, -25]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center text-left pointer-events-none"
    >
      <div className="space-y-2.5 sm:space-y-3 max-w-xl">
        
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-rose-400 font-semibold block mb-0.5">
            06 · SAÚDE MENTAL & CIÊNCIA
          </span>
          <h3 className="text-xl sm:text-3xl font-bold font-space text-white tracking-tight leading-tight">
            Combater o tédio, não só o tempo de tela.
          </h3>
        </div>

        {/* Lancet Study Box */}
        <div className="p-3 rounded-2xl bg-rose-950/30 border border-rose-500/30 backdrop-blur-md">
          <span className="text-[9.5px] font-mono font-bold text-rose-300 block mb-0.5">
            THE LANCET REGIONAL HEALTH
          </span>
          <p className="text-xs text-slate-200 font-light leading-relaxed">
            Restringir o celular, sozinho, <strong>não garante bem-estar</strong>: estudo publicado no Lancet não encontrou relação entre políticas meramente restritivas e melhora mental dos jovens.
          </p>
        </div>

        <p className="text-xs text-slate-300 font-light leading-relaxed">
          Por isso o Onfocus mira em duas causas reais: <strong>o tédio em sala de aula</strong> e <strong>o uso do celular sem estrutura</strong>. Veja na tela ao lado a Pausa Consciente!
        </p>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <h5 className="text-xs font-bold text-white font-space mb-0.5">O tédio tem custo real</h5>
            <p className="text-[10.5px] text-slate-400 font-light">Ferramentas didáticas ativas combatem a apatia dos estudantes.</p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <h5 className="text-xs font-bold text-white font-space mb-0.5">Uso Guiado</h5>
            <p className="text-[10.5px] text-slate-400 font-light">O professor direciona a atenção para o aprendizado prático.</p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

/* =========================================================================
   STAGE 8: VIABILIDADE ESCOLAR (Slide 8 do PDF)
   Device morphs to Laptop showing institutional management
   ========================================================================= */
const ViabilityStageText: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.73, 0.755, 0.825, 0.845], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.73, 0.755, 0.825, 0.845], [25, 0, 0, -25]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center text-left pointer-events-none"
    >
      <div className="space-y-2 max-w-xl">
        
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 font-semibold mb-0.5 block">
            07 · VIABILIDADE INSTITUCIONAL
          </span>
          <h3 className="text-xl sm:text-3xl font-extrabold font-space text-white tracking-tight leading-snug">
            O que facilita a adoção pela escola
          </h3>
          <p className="text-xs text-slate-300 font-light leading-relaxed mt-0.5">
            Além de funcionar tecnicamente, a proposta tem mecanismos que ajudam a própria escola a decidir por adotá-la.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-cyan-500/25 backdrop-blur-md">
            <span className="text-xs font-bold text-cyan-400 font-space block mb-0.5">
              Visão única para a direção
            </span>
            <p className="text-[10.5px] text-slate-300 font-light leading-snug">
              A coordenação acompanha o uso pedagógico em todas as turmas em tempo real.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-indigo-500/25 backdrop-blur-md">
            <span className="text-xs font-bold text-indigo-400 font-space block mb-0.5">
              Professores na mesma régua
            </span>
            <p className="text-[10.5px] text-slate-300 font-light leading-snug">
              Adoção deixa de depender só da boa vontade individual com métricas claras.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-emerald-500/25 backdrop-blur-md">
            <span className="text-xs font-bold text-emerald-400 font-space block mb-0.5">
              Proximidade com famílias
            </span>
            <p className="text-[10.5px] text-slate-300 font-light leading-snug">
              Pais acompanham o foco do filho, gerando transparência e confiança.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-amber-500/25 backdrop-blur-md">
            <span className="text-xs font-bold text-amber-400 font-space block mb-0.5">
              Respaldo científico
            </span>
            <p className="text-[10.5px] text-slate-300 font-light leading-snug">
              Ferramentas interativas comprovadamente aumentam o engajamento estudantil.
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

/* =========================================================================
   STAGE 9: PRÓXIMOS PASSOS (Slide 9 do PDF)
   ========================================================================= */
const RoadmapStageText: React.FC<{ progress: any }> = ({ progress }) => {
  const opacity = useTransform(progress, [0.84, 0.865, 0.935, 0.95], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.84, 0.865, 0.935, 0.95], [25, 0, 0, -25]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center text-left pointer-events-none"
    >
      <div className="space-y-2 max-w-xl">
        
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold block mb-0.5">
            08 · PRÓXIMOS PASSOS
          </span>
          <h3 className="text-xl sm:text-3xl font-bold font-space text-white tracking-tight leading-tight">
            Sabemos exatamente pra onde o Onfocus vai
          </h3>
        </div>

        <div className="space-y-1.5">
          <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <div className="flex items-center justify-between mb-0.5">
              <h5 className="text-xs font-bold text-white font-space">Painel de incentivo docente</h5>
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/30">Fase 1</span>
            </div>
            <p className="text-[10.5px] text-slate-300 font-light leading-tight">
              Acompanhar e reconhecer professores que configuram aulas com apps pedagógicos.
            </p>
          </div>

          <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <div className="flex items-center justify-between mb-0.5">
              <h5 className="text-xs font-bold text-white font-space">Selo de foco (gamificação)</h5>
              <span className="text-[9px] font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-500/30">Fase 2</span>
            </div>
            <p className="text-[10.5px] text-slate-300 font-light leading-tight">
              Reconhecimento visual para o aluno sem alertas de distração durante as aulas.
            </p>
          </div>

          <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <div className="flex items-center justify-between mb-0.5">
              <h5 className="text-xs font-bold text-white font-space">Autoconhecimento do próprio uso</h5>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">Fase 3</span>
            </div>
            <p className="text-[10.5px] text-slate-300 font-light leading-tight">
              Resumo semanal do padrão de foco devolvido ao próprio aluno para autorregulação.
            </p>
          </div>

          <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <div className="flex items-center justify-between mb-0.5">
              <h5 className="text-xs font-bold text-white font-space">Piloto com tags físicas e expansão</h5>
              <span className="text-[9px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">Fase 4</span>
            </div>
            <p className="text-[10.5px] text-slate-300 font-light leading-tight">
              Launcher Android nativo e expansão gradual da whitelist para todas as disciplinas.
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

/* =========================================================================
   STAGE 10: REVELAÇÃO FINAL & CTAS (Slide 10 do PDF)
   Celebratory ending in strict Zone 1 format
   ========================================================================= */
const FinalRevealStageText: React.FC<{ progress: any; onOpenPitch: () => void }> = ({ progress, onOpenPitch }) => {
  const opacity = useTransform(progress, [0.945, 0.97, 1.0], [0, 1, 1]);
  const y = useTransform(progress, [0.945, 0.97, 1.0], [25, 0, 0]);

  const triggerReward = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#38bdf8', '#818cf8', '#ffffff', '#fbbf24'],
    });
  };

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center text-left pointer-events-none"
    >
      <div className="space-y-2.5 sm:space-y-3 max-w-xl">
        
        {/* Monogram Button */}
        <div className="flex items-center gap-3">
          <div
            onClick={triggerReward}
            className="w-11 h-11 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.35)] cursor-pointer hover:scale-105 transition-transform pointer-events-auto"
            title="Celebrar conquista!"
          >
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.25em] font-semibold block">
              ONFOCUS · HACKTUDO 2026
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-space text-white leading-none">
              Seu foco começa aqui.
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed font-sans">
          Tecnologia, metodologia e saúde mental integradas em uma mesma solução, pronta para transformar o aprendizado em sala de aula.
        </p>

        {/* 3 Interactive Cards */}
        <div className="space-y-2">
          <a
            href="https://hackthon-ultima-hora.vercel.app/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-400 transition-all flex items-center justify-between group pointer-events-auto cursor-pointer"
          >
            <div>
              <span className="text-[8.5px] font-mono text-cyan-400 uppercase block font-semibold">01 / PRODUTO IMPLEMENTADO</span>
              <span className="font-bold text-white text-xs font-space group-hover:text-cyan-300">MVP Gestor Web (Vercel)</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </a>

          <button
            onClick={onOpenPitch}
            className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:border-white/[0.2] transition-all flex items-center justify-between group pointer-events-auto text-left cursor-pointer"
          >
            <div>
              <span className="text-[8.5px] font-mono text-indigo-400 uppercase block font-semibold">02 / APRESENTAÇÃO</span>
              <span className="font-bold text-white text-xs font-space group-hover:text-indigo-300">Pitch Deck Completo (10 Slides)</span>
            </div>
            <Presentation className="w-3.5 h-3.5 text-indigo-400" />
          </button>

          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between text-left">
            <div>
              <span className="text-[8.5px] font-mono text-emerald-400 uppercase block font-semibold">03 / PITCH EXECUTIVO</span>
              <span className="font-bold text-white text-xs font-space">Vídeo (2 min) para Avaliação</span>
            </div>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-white/[0.08] text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <span>Equipe · Última Hora</span>
          <span className="text-cyan-400/80">contato@hacktudo.com.br</span>
        </div>

      </div>
    </motion.div>
  );
};
