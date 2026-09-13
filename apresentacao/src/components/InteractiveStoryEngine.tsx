import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Radio, CheckCircle2, ChevronLeft, ChevronRight, Play, Pause, 
  ExternalLink, Smartphone, LayoutDashboard, ShieldCheck, HelpCircle, 
  Battery, AlertTriangle, ArrowRight, BookOpen, RefreshCw, XCircle
} from 'lucide-react';

interface StoryEngineProps {
  onOpenPitch: () => void;
}

const SCENES = [
  {
    id: 1,
    tag: '01 / INTRODUÇÃO',
    title: 'OnFocus',
    subtitle: 'O smartphone do aluno como ferramenta pedagógica.',
    desc: 'Uma plataforma integrada que resolve o conflito dos celulares na escola através de aproximação física NFC e Launcher Seguro temporário.',
    sceneKey: 'hero',
  },
  {
    id: 2,
    tag: '02 / O PROBLEMA',
    title: 'O Dilema da Distração',
    subtitle: 'Notificações constantes fragmentam o aprendizado.',
    desc: 'Caixas recolhedoras na porta causam perda de tempo e conflitos. Deixar o celular solto expõe o aluno a algoritmos de dopamina contínua.',
    sceneKey: 'chaos',
  },
  {
    id: 3,
    tag: '03 / APROXIMAÇÃO',
    title: '1 Toque NFC na Carteira',
    subtitle: 'Identificação instantânea sem login demorado.',
    desc: 'Ao entrar na sala, o aluno aproxima o celular da Tag NFC da carteira. Em 400ms o sistema valida a presença com criptografia ECDSA P-256.',
    sceneKey: 'nfc',
  },
  {
    id: 4,
    tag: '04 / LAUNCHER SEGURO',
    title: 'Modo Foco Ativado',
    subtitle: 'Whitelist de aplicativos autorizados pelo professor.',
    desc: 'O Android assume o Launcher Protegido: redes sociais e jogos são suspensos, liberando apenas as ferramentas pedagógicas da aula.',
    sceneKey: 'launcher',
  },
  {
    id: 5,
    tag: '05 / USO EM AULA',
    title: 'GeoGebra em Execução',
    subtitle: 'Potencial computacional a serviço da matemática.',
    desc: 'O aluno calcula funções e explora geometria dinâmica com a barra de segurança ativa. O celular torna-se um instrumento científico de ponta.',
    sceneKey: 'geogebra',
  },
  {
    id: 6,
    tag: '06 / INTERCEPTAÇÃO',
    title: 'Acesso Restrito Educativo',
    subtitle: 'Conscientização imediata sem invasão de privacidade.',
    desc: 'Se o aluno tentar alternar para apps restritos, o sistema bloqueia suavemente e orienta o retorno ao estudo, sem espionar dados pessoais (LGPD).',
    sceneKey: 'restricted',
  },
  {
    id: 7,
    tag: '07 / VISÃO DA ESCOLA',
    title: 'Painel do Gestor (SaaS)',
    subtitle: 'Telemetria em tempo real para a coordenação.',
    desc: 'O professor acompanha no painel web quais alunos estão conectados, nível de bateria, aplicativo em uso e eventuais alertas da turma.',
    sceneKey: 'dashboard',
  },
  {
    id: 8,
    tag: '08 / CONCLUSÃO',
    title: 'Desbloqueio Pós-Aula',
    subtitle: 'Término automático ao soar o sinal da escola.',
    desc: 'Ao final do horário, o OnFocus encerra-se e restaura 100% das funções do aparelho sem qualquer retenção ou processo manual.',
    sceneKey: 'unlocked',
  },
];

export const InteractiveStoryEngine: React.FC<StoryEngineProps> = ({ onOpenPitch }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const isTransitioning = useRef(false);

  const currentScene = SCENES[currentIdx];

  const goToNext = () => {
    if (currentIdx < SCENES.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  // Keyboard navigation (Arrow keys & Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx]);

  // Wheel / Scroll event listener for smooth slide advancement
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning.current) return;
      if (Math.abs(e.deltaY) > 40 || Math.abs(e.deltaX) > 40) {
        isTransitioning.current = true;
        if (e.deltaY > 0 || e.deltaX > 0) {
          goToNext();
        } else {
          goToPrev();
        }
        setTimeout(() => {
          isTransitioning.current = false;
        }, 700);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentIdx]);

  // Touch / Drag events for mobile and desktop swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
    touchStartX.current = null;
  };

  // Autoplay presentation mode timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIdx((prev) => (prev < SCENES.length - 1 ? prev + 1 : 0));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090d16] via-[#07090e] to-black pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Controls Bar */}
      <header className="relative z-30 px-6 lg:px-12 py-4 flex items-center justify-between border-b border-white/10 backdrop-blur-md bg-black/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0284c7] flex items-center justify-center text-white shadow-[0_0_15px_rgba(2,132,199,0.5)]">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-base text-white tracking-tight leading-tight block">
              OnFocus
            </span>
            <span className="text-[10px] text-sky-400 font-mono tracking-wider block">
              PLATAFORMA INTEGRADA DE FOCO PEDAGÓGICO
            </span>
          </div>
        </div>

        {/* Autoplay & Link Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isPlaying
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-sky-400" /> : <Play className="w-3.5 h-3.5 text-sky-400" />}
            <span>{isPlaying ? 'Pausar Apresentação' : 'Apresentar Automaticamente'}</span>
          </button>

          <button
            onClick={onOpenPitch}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            Pitch Deck
          </button>

          <a
            href="https://hackthon-ultima-hora.vercel.app/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#0284c7] hover:bg-[#0369a1] shadow-md transition-all active:scale-95"
          >
            <span>Ver Painel no Vercel</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Drag / Swipe Story Area */}
      <div className="relative z-20 flex-1 max-w-7xl mx-auto w-full px-6 lg:px-12 py-6 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left: Narrative Text Description */}
          <motion.div
            key={`text-${currentScene.id}`}
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-xs font-bold uppercase w-fit mb-4">
              <span>{currentScene.tag}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-3">
              {currentScene.title}
            </h1>

            <h2 className="text-lg sm:text-2xl font-semibold text-sky-300 mb-6 font-sans">
              {currentScene.subtitle}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-8 max-w-xl">
              {currentScene.desc}
            </p>

            {/* Micro badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Seguro & LGPD</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-2">
                <Radio className="w-4 h-4 text-sky-400" />
                <span>NFC ECDSA P-256</span>
              </div>
            </div>

            {/* Instruction Tip */}
            <div className="mt-8 text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span>Arraste na tela, use o scroll do mouse ou clique nas setas para navegar</span>
            </div>
          </motion.div>

          {/* Right: Live Interactive Device Frame matching the Current Scene */}
          <div className="lg:col-span-6 flex items-center justify-center">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={`visual-${currentScene.id}`}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="w-full flex justify-center"
              >

                {/* SCENE 7: SaaS Dashboard Expansion */}
                {currentScene.sceneKey === 'dashboard' ? (
                  <div className="w-full max-w-lg bg-white rounded-3xl p-5 border border-slate-700 shadow-2xl text-slate-900 text-xs">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-[#0284c7] text-white flex items-center justify-center font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-slate-900">OnFocus Gestor • Sala 101</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                        28/32 Alunos Conectados
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-800">Ana Beatriz S.</div>
                          <div className="text-[10px] text-slate-500">Samsung Tab S7 • GeoGebra</div>
                        </div>
                        <span className="text-emerald-600 font-bold text-[10px]">100% FOCO</span>
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-800">Bruno C.</div>
                          <div className="text-[10px] text-slate-500">iPad Air • Calculadora</div>
                        </div>
                        <span className="text-emerald-600 font-bold text-[10px]">100% FOCO</span>
                      </div>

                      <div className="p-2.5 bg-red-50 rounded-xl flex items-center justify-between border border-red-200">
                        <div>
                          <div className="font-bold text-slate-800">Diego F.</div>
                          <div className="text-[10px] text-red-600">Tentativa Bloqueada</div>
                        </div>
                        <span className="text-red-600 font-bold text-[10px]">INTERCEPTADO</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                      <span>WebSockets Síncronos</span>
                      <span className="text-[#0284c7] font-semibold">Prof. Ricardo Silva</span>
                    </div>
                  </div>
                ) : (
                  /* Mobile Phone Chassis for all other scenes */
                  <div className="w-[300px] sm:w-[325px] h-[570px] bg-white rounded-[44px] p-3 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(2,132,199,0.2)] border-[5px] border-slate-800 relative flex flex-col justify-between overflow-hidden text-slate-800">
                    
                    {/* Top Phone Header */}
                    <div className="w-full flex items-center justify-between px-3 py-1 border-b border-slate-100 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded bg-[#0284c7] flex items-center justify-center text-white">
                          <Lock className="w-2.5 h-2.5" />
                        </div>
                        <span className="font-bold text-slate-800 text-[11px]">OnFocus</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 text-[10px]">
                        <span>85%</span>
                        <Battery className="w-3 h-3" />
                      </div>
                    </div>

                    {/* Dynamic Inner Screen per Scene */}
                    <div className="flex-1 bg-[#f8fafc] p-3.5 flex flex-col justify-between overflow-y-auto">
                      
                      {/* SCENE 1: Intro / Standby */}
                      {currentScene.sceneKey === 'hero' && (
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="text-center my-2">
                            <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase">HORÁRIO DE BRASÍLIA</span>
                            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">08:30</div>
                            <div className="text-[10px] text-slate-500">Segunda-feira, 22 de Maio</div>
                          </div>

                          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm space-y-1 text-xs">
                            <span className="text-[9px] font-bold text-slate-400 block uppercase">SALA 101 - BLOCO B</span>
                            <span className="font-bold text-slate-800 block">Matemática Aplicada</span>
                            <span className="text-[10px] text-slate-500 block">3º Ano Ensino Médio - A</span>
                          </div>

                          <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded bg-[#0284c7]/10 text-[#0284c7] flex items-center justify-center font-bold text-xs">
                                01
                              </div>
                              <span className="text-xs font-bold text-slate-800">GeoGebra Ativo</span>
                            </div>
                            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">WHITELIST</span>
                          </div>

                          <div className="text-[10px] text-slate-500 text-center">
                            ● CONECTADO À REDE ESCOLAR
                          </div>
                        </div>
                      )}

                      {/* SCENE 2: The Chaos Problem */}
                      {currentScene.sceneKey === 'chaos' && (
                        <div className="flex-1 flex flex-col justify-between relative py-2">
                          <div className="text-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-1">
                              <AlertTriangle className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-slate-900 text-xs">Sobrecarga de Notificações</h4>
                          </div>

                          {/* Chaotic notification bubbles */}
                          <div className="space-y-2">
                            <div className="p-2 rounded-xl bg-purple-50 border border-purple-200 text-left text-xs shadow-sm">
                              <div className="font-bold text-purple-900 text-[11px]">Instagram</div>
                              <div className="text-[10px] text-purple-700">"Lucas curtiu seu reel agora"</div>
                            </div>
                            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-left text-xs shadow-sm">
                              <div className="font-bold text-emerald-900 text-[11px]">WhatsApp (42 msgs)</div>
                              <div className="text-[10px] text-emerald-700">"Grupo da Galera"</div>
                            </div>
                            <div className="p-2 rounded-xl bg-sky-50 border border-sky-200 text-left text-xs shadow-sm">
                              <div className="font-bold text-sky-900 text-[11px]">TikTok</div>
                              <div className="text-[10px] text-sky-700">Novo áudio viral em alta 🔥</div>
                            </div>
                          </div>

                          <div className="p-2 rounded-lg bg-red-50 text-red-700 text-[10px] font-bold text-center border border-red-200">
                            -68% de Retenção de Conteúdo em Aula
                          </div>
                        </div>
                      )}

                      {/* SCENE 3: NFC Scan */}
                      {currentScene.sceneKey === 'nfc' && (
                        <div className="flex-1 flex flex-col justify-between text-center py-4">
                          <div>
                            <div className="relative w-24 h-24 mx-auto flex items-center justify-center mb-4">
                              <div className="absolute inset-0 rounded-full border-2 border-[#0284c7]/40 animate-ping" />
                              <div className="w-20 h-20 rounded-full border border-[#0284c7] flex items-center justify-center bg-sky-50">
                                <Radio className="w-8 h-8 text-[#0284c7]" />
                              </div>
                            </div>
                            <h4 className="text-base font-bold text-slate-900 mb-1">Aproxime o Dispositivo</h4>
                            <p className="text-[11px] text-slate-500 px-2">Toque na tag NFC na carteira para ativar o OnFocus.</p>
                          </div>

                          <div className="bg-white p-3 rounded-xl border border-slate-200 text-left text-xs">
                            <span className="text-[9px] font-bold text-sky-600 block uppercase">CHAVE DE HARDWARE</span>
                            <span className="font-mono text-slate-700 text-[10px]">ECDSA P-256 Validated</span>
                          </div>
                        </div>
                      )}

                      {/* SCENE 4: Modo Foco Ativado (Launcher) */}
                      {currentScene.sceneKey === 'launcher' && (
                        <div className="flex-1 flex flex-col justify-between text-center">
                          <div>
                            <div className="w-12 h-12 rounded-full bg-sky-100 border border-sky-200 mx-auto flex items-center justify-center text-[#0284c7] mb-2 shadow-sm">
                              <Lock className="w-6 h-6" />
                            </div>
                            <h4 className="text-base font-bold text-slate-900">OnFocus Ativado</h4>
                            <p className="text-[10px] text-slate-500 mb-3">Apenas 4 aplicativos pedagógicos liberados</p>

                            <div className="space-y-1.5 text-left text-xs">
                              <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                                <span className="font-bold text-slate-800">GeoGebra</span>
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              </div>
                              <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                                <span className="font-bold text-slate-800">Dicionário PT</span>
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              </div>
                              <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                                <span className="font-bold text-slate-800">Navegador Escolar</span>
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              </div>
                            </div>
                          </div>

                          <div className="text-[10px] text-slate-400">
                            Outros aplicativos temporariamente restritos.
                          </div>
                        </div>
                      )}

                      {/* SCENE 5: GeoGebra em Execução */}
                      {currentScene.sceneKey === 'geogebra' && (
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="bg-[#0284c7] text-white p-2 rounded-lg text-xs mb-2 flex items-center justify-between">
                              <span className="font-bold text-[10px]">ONFOCUS SEGURANÇA ATIVA</span>
                              <Lock className="w-3 h-3" />
                            </div>

                            <div className="flex justify-between text-xs mb-1">
                              <span className="font-bold text-slate-900">GeoGebra</span>
                              <span className="text-[10px] text-slate-500">Geometria Analítica</span>
                            </div>

                            <div className="bg-white rounded-xl border border-slate-200 p-2.5 h-36 flex flex-col justify-between shadow-inner">
                              <div className="text-[9px] font-mono text-slate-600">
                                F(x) = sin(x) + cos(x)<br />
                                Circle(A, 5)
                              </div>
                              <div className="w-full h-16 flex items-center justify-center">
                                <svg className="w-full h-full" viewBox="0 0 160 60">
                                  <line x1="0" y1="30" x2="160" y2="30" stroke="#cbd5e1" strokeWidth="1" />
                                  <line x1="80" y1="0" x2="80" y2="60" stroke="#cbd5e1" strokeWidth="1" />
                                  <circle cx="65" cy="30" r="20" fill="none" stroke="#0284c7" strokeWidth="2" />
                                </svg>
                              </div>
                              <div className="text-[8px] font-mono text-slate-400">A: (2.45, 5.12)</div>
                            </div>
                          </div>

                          <div className="bg-emerald-50 p-1.5 rounded text-emerald-700 text-[10px] font-bold text-center border border-emerald-200">
                            App Pedagógico Ativo
                          </div>
                        </div>
                      )}

                      {/* SCENE 6: Acesso Restrito */}
                      {currentScene.sceneKey === 'restricted' && (
                        <div className="flex-1 flex flex-col justify-between text-center py-2">
                          <div>
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 mx-auto flex items-center justify-center relative mb-2">
                              <div className="w-6 h-6 rounded bg-gradient-to-tr from-purple-400 to-pink-500 opacity-40" />
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center">
                                <Lock className="w-3 h-3" />
                              </div>
                            </div>

                            <span className="text-[9px] font-bold text-red-600 uppercase block mb-1">ACESSO RESTRITO</span>
                            <h4 className="text-xs font-bold text-slate-900 mb-1">Aplicativo não permitido nesta aula</h4>
                            <p className="text-[10px] text-slate-500 px-1 mb-3">
                              Seu aparelho está em <strong>OnFocus</strong> para manter a concentração na disciplina.
                            </p>

                            <button className="w-full py-2 rounded-xl bg-[#0284c7] text-white font-bold text-xs">
                              &lt; Voltar ao Launcher
                            </button>
                          </div>

                          <div className="bg-white p-2 rounded-lg border border-slate-200 text-left text-[10px]">
                            <span className="font-semibold text-slate-700">Bloqueio Ativo: Sala 101</span>
                          </div>
                        </div>
                      )}

                      {/* SCENE 8: Desbloqueio Pós-Aula */}
                      {currentScene.sceneKey === 'unlocked' && (
                        <div className="flex-1 flex flex-col justify-between text-center py-4">
                          <div>
                            <div className="w-14 h-14 rounded-full bg-sky-50 border border-sky-200 mx-auto flex items-center justify-center text-[#0284c7] mb-3">
                              <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h4 className="text-base font-bold text-slate-900">Aula Finalizada</h4>
                            <p className="text-[11px] text-slate-500 px-2 mb-4">
                              O OnFocus foi encerrado com sucesso. Todas as funcionalidades foram restauradas.
                            </p>

                            <div className="bg-white p-3 rounded-xl border border-slate-200 text-left text-xs space-y-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase block">STATUS ATUAL</span>
                              <span className="font-bold text-slate-900">Dispositivo Desbloqueado</span>
                            </div>
                          </div>

                          <div className="text-[10px] text-slate-400">
                            Sessão de 50 minutos concluída.
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Bottom Nav Bar */}
                    <div className="w-full pt-1.5 pb-0.5 px-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Ajuda</span>
                      <span className="text-slate-600 font-mono">OnFocus Mobile V1.0</span>
                    </div>

                  </div>
                )}

              </motion.div>
            </AnimatePresence>

          </div>

        </div>
      </div>

      {/* Bottom Interactive Timeline Drag Scrubber & Nav Controls */}
      <footer className="relative z-30 px-6 lg:px-12 py-4 border-t border-white/10 backdrop-blur-md bg-black/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Step dots with titles */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
          {SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => setCurrentIdx(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 ${
                currentIdx === idx
                  ? 'bg-[#0284c7] text-white font-bold shadow-lg shadow-sky-900/50 scale-105'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              0{scene.id}
            </button>
          ))}
        </div>

        {/* Previous / Next Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrev}
            disabled={currentIdx === 0}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-xs font-mono text-slate-400 px-2">
            {currentIdx + 1} / {SCENES.length}
          </span>

          <button
            onClick={goToNext}
            disabled={currentIdx === SCENES.length - 1}
            className="p-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};
