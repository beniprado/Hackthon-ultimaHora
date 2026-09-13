import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Cpu, Shield, Box, Unlock, Wifi, Battery, Nfc, ShieldAlert, Lock, Activity, Calculator, BookOpen, PenTool, Check } from 'lucide-react';

const STAGES = [
  {
    id: 1,
    tag: 'ETAPA 01 / 04',
    title: '"Ative o modo foco."',
    desc: 'Ao entrar na sala, o estudante aproxima o smartphone da Tag NFC da carteira. Em menos de 400ms, uma assinatura digital ECDSA criptográfica autentica a presença e sincroniza a política da disciplina.',
    badge: 'NFC Hardware Verification: SECURE',
    badgeIcon: Cpu,
    badgeColor: 'text-cyan-300',
  },
  {
    id: 2,
    tag: 'ETAPA 02 / 04',
    title: '"O ambiente é controlado."',
    desc: 'O Android entra em modo Kiosk seguro (Lock Task Mode). As notificações de redes sociais, jogos e mensageiros são suprimidas. A barra de sistema é bloqueada sem invasão aos arquivos pessoais.',
    badge: 'Android Device Policy Manager: ACTIVE',
    badgeIcon: Shield,
    badgeColor: 'text-indigo-300',
  },
  {
    id: 3,
    tag: 'ETAPA 03 / 04',
    title: '"Acesso apenas ao necessário."',
    desc: 'O estudante interage diretamente com ferramentas pedagógicas liberadas pelo docente para aquela aula específica — como o GeoGebra dinâmico, calculadoras científicas e materiais de apoio.',
    badge: 'Whitelist Pedagógica: 4 Apps Liberados',
    badgeIcon: Box,
    badgeColor: 'text-emerald-300',
  },
  {
    id: 4,
    tag: 'ETAPA 04 / 04',
    title: '"A escola mantém o controle."',
    desc: 'Telemetria em tempo real no painel do professor. Ao tocar o sinal de término da aula, o smartphone desativa instantaneamente o modo protegido e restaura a interface pessoal.',
    badge: 'Desbloqueio Automático ao Fim da Sessão',
    badgeIcon: Unlock,
    badgeColor: 'text-cyan-300',
  },
];

export const ProductSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(1);

  const current = STAGES[activeStage - 1];
  const BadgeIcon = current.badgeIcon;

  return (
    <section id="produto" className="relative py-28 px-6 lg:px-16 bg-black min-h-screen flex items-center justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Dynamic Storytelling Step Details */}
        <div className="lg:col-span-6 flex flex-col justify-center relative z-20">
          
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            03 / A EXPERIÊNCIA DO ALUNO
          </span>

          {/* Interactive Step Selector Tabs */}
          <div className="flex items-center gap-2 mb-6">
            {STAGES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveStage(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeStage === s.id
                    ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                0{s.id}
              </button>
            ))}
          </div>

          {/* Animated Stage Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="min-h-[220px]"
            >
              <div className="text-xs font-mono text-cyan-400 font-bold mb-2">{current.tag}</div>
              <h3 className="text-3xl sm:text-5xl font-black font-space text-white mb-4">
                {current.title}
              </h3>
              <p className="text-zinc-400 text-base leading-relaxed font-light mb-6">
                {current.desc}
              </p>
              <div className={`flex items-center gap-2 text-xs font-mono ${current.badgeColor}`}>
                <BadgeIcon className="w-4 h-4" />
                <span>{current.badge}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Visual Progress Dots */}
          <div className="flex items-center gap-3 mt-8">
            {STAGES.map((s) => (
              <div
                key={s.id}
                onClick={() => setActiveStage(s.id)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeStage === s.id ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

        </div>

        {/* Right Column: Interactive 3D Smartphone Mockup */}
        <div className="lg:col-span-6 flex items-center justify-center relative">
          
          {/* Quantum Glow Aura */}
          <div className="absolute w-[420px] h-[420px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />

          {/* Premium Titanium Phone Device Frame */}
          <motion.div
            animate={{
              rotateY: activeStage === 1 ? -4 : activeStage === 2 ? 4 : activeStage === 3 ? -3 : 0,
              rotateZ: activeStage === 1 ? 1 : activeStage === 2 ? -1 : 0,
              scale: activeStage === 4 ? 1.03 : 1,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="relative w-[300px] sm:w-[320px] h-[580px] bg-gradient-to-b from-zinc-800 via-zinc-900 to-black rounded-[48px] p-3.5 border-[4px] border-zinc-700 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(0,240,255,0.2)]"
          >
            {/* Titanium Bezel Edge Reflections */}
            <div className="absolute inset-0 rounded-[44px] border border-white/10 pointer-events-none" />

            {/* Dynamic Island Header */}
            <div className="relative w-full flex items-center justify-between px-6 pt-1 pb-2 z-30">
              <span className="text-[10px] font-mono text-white/80 font-bold">10:42</span>
              <div className="w-20 h-4 bg-black rounded-full flex items-center justify-center gap-1.5 px-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[8px] font-mono text-cyan-300 tracking-wider">ONFOCUS</span>
              </div>
              <div className="flex items-center gap-1 text-white/80 text-[10px]">
                <Wifi className="w-3 h-3 text-cyan-400" />
                <Battery className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Phone Screen Viewport */}
            <div className="relative w-full h-[505px] bg-[#0c0e17] rounded-[36px] overflow-hidden p-4 flex flex-col justify-between border border-white/5 shadow-inner">
              
              <AnimatePresence mode="wait">
                {activeStage === 1 && (
                  <motion.div
                    key="stage-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 p-5 flex flex-col items-center justify-between text-center"
                  >
                    <div className="pt-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                        Standby do Aluno
                      </span>
                      <h4 className="text-lg font-bold text-white mt-3 font-space">Aproxime da Tag</h4>
                      <p className="text-[11px] text-zinc-400 mt-1">Sala 3B • Matemática Avançada</p>
                    </div>

                    {/* NFC Wave Pulse */}
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <div className="absolute w-28 h-28 rounded-full border border-cyan-400/30 animate-ping" />
                      <div className="absolute w-20 h-20 rounded-full border border-cyan-400/50" />
                      <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.5)]">
                        <Nfc className="w-7 h-7" />
                      </div>
                    </div>

                    <div className="w-full bg-white/5 p-3 rounded-xl border border-white/10 text-left">
                      <div className="text-[10px] font-mono text-zinc-400">CHAVE CRIPTOGRÁFICA</div>
                      <div className="text-[11px] font-mono text-cyan-300 truncate">ECDSA: 0x8F92...B341</div>
                    </div>
                  </motion.div>
                )}

                {activeStage === 2 && (
                  <motion.div
                    key="stage-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 p-5 flex flex-col items-center justify-between text-center"
                  >
                    <div className="pt-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                        Launcher Protegido
                      </span>
                      <h4 className="text-lg font-bold text-white mt-3 font-space">Modo Kiosk Ativo</h4>
                      <p className="text-[11px] text-zinc-400 mt-1">Redes sociais suspensas</p>
                    </div>

                    <div className="w-full space-y-2">
                      <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-white">
                          <ShieldAlert className="w-4 h-4 text-indigo-400" />
                          <span>Bloqueio de Notificações</span>
                        </div>
                        <span className="text-[10px] font-mono text-indigo-300 font-bold">100%</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-white">
                          <Lock className="w-4 h-4 text-indigo-400" />
                          <span>Barra de Navegação</span>
                        </div>
                        <span className="text-[10px] font-mono text-indigo-300 font-bold">LOCK</span>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-zinc-400">
                      Sessão criptografada vinculada ao Prof. Silva
                    </div>
                  </motion.div>
                )}

                {activeStage === 3 && (
                  <motion.div
                    key="stage-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 p-5 flex flex-col items-center justify-between text-center"
                  >
                    <div className="pt-2 w-full text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-cyan-400">APPS AUTORIZADOS</span>
                        <span className="text-[10px] font-mono text-emerald-400">WHITELIST</span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1 font-space">Matemática: Funções</h4>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-2.5 my-auto">
                      <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-cyan-400 text-black flex items-center justify-center font-bold text-sm">
                          <Activity className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-bold text-white">GeoGebra</span>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-bold text-sm">
                          <Calculator className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-bold text-white">Calculadora</span>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center font-bold text-sm">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-bold text-white">Apostila PDF</span>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center font-bold text-sm">
                          <PenTool className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-bold text-white">Notas Aula</span>
                      </div>
                    </div>

                    <div className="w-full py-2 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-[10px] font-mono text-cyan-300">
                      4 de 4 Apps Liberados para a Turma
                    </div>
                  </motion.div>
                )}

                {activeStage === 4 && (
                  <motion.div
                    key="stage-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 p-5 flex flex-col items-center justify-between text-center"
                  >
                    <div className="pt-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 mx-auto flex items-center justify-center text-emerald-400 mb-2">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-white font-space">Aula Concluída!</h4>
                      <p className="text-[11px] text-zinc-400 mt-1">Sessão finalizada às 11:30</p>
                    </div>

                    <div className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                      <span className="text-xs font-mono text-zinc-400">DESEMPENHO DO FOCO</span>
                      <div className="text-3xl font-black text-cyan-400 font-space mt-1">98.4%</div>
                      <div className="text-[10px] text-zinc-400 mt-1">50 min em ferramentas pedagógicas</div>
                    </div>

                    <div className="text-[10px] font-mono text-emerald-400">
                      Aparelho liberado com sucesso.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Home Bar Indicator */}
            <div className="w-28 h-1 bg-white/20 rounded-full mx-auto mt-2" />
          </motion.div>

        </div>

      </div>
    </section>
  );
};
