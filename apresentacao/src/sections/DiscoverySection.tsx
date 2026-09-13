import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, Shield, Activity, Lock, ArrowRight } from 'lucide-react';

export const DiscoverySection: React.FC = () => {
  const [isOnFocusMode, setIsOnFocusMode] = useState(true);

  return (
    <section id="descoberta" className="py-28 px-6 lg:px-12 bg-gradient-to-b from-black via-slate-950 to-black">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            02 / A MUDANÇA DE PARADIGMA
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-space tracking-tight text-white leading-tight">
            "Transformamos o smartphone em uma{' '}
            <span className="gradient-title">ferramenta de foco.</span>"
          </h2>
        </motion.div>

        {/* Morphing Smartphone Showcase */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left: Mode Description */}
          <div className="md:col-span-6 flex flex-col justify-center text-left">
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setIsOnFocusMode(false)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  !isOnFocusMode
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40 font-bold'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                1. ANTES: Distração
              </button>
              <button
                onClick={() => setIsOnFocusMode(true)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  isOnFocusMode
                    ? 'bg-cyan-400 text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                2. DEPOIS: Modo OnFocus
              </button>
            </div>

            <AnimatePresence mode="wait">
              {isOnFocusMode ? (
                <motion.div
                  key="onfocus-desc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold font-space text-white">Ambiente Controlado & Seguro</h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    O dispositivo exibe apenas os aplicativos pedagógicos autorizados para a disciplina. Notificações pessoais são pausadas sem invadir mensagens ou fotos.
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs font-mono text-cyan-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Engajamento e produtividade imediata</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="distraction-desc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold font-space text-red-400">Ambiente Sem Controle</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-light">
                    Notificações de redes sociais, jogos com recarga de energia e mensagens em grupo disputam a atenção do aluno a cada 3 minutos.
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs font-mono text-red-400">
                    <span>-68% de retenção durante a explicação do professor</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Center Phone Mockup Morph */}
          <div className="md:col-span-6 flex justify-center">
            <motion.div
              animate={{
                scale: isOnFocusMode ? 1.03 : 0.98,
                borderColor: isOnFocusMode ? '#00f0ff' : '#dc2626',
                boxShadow: isOnFocusMode ? '0 0 50px rgba(0,240,255,0.25)' : '0 0 30px rgba(220,38,38,0.2)',
              }}
              transition={{ duration: 0.5 }}
              className="w-[280px] h-[520px] bg-white rounded-[44px] p-3 border-[4px] shadow-2xl relative flex flex-col justify-between overflow-hidden text-slate-800"
            >
              {/* Phone Header */}
              <div className="w-full flex items-center justify-between px-3 py-1 border-b border-slate-100 text-[10px]">
                <div className="flex items-center gap-1">
                  <div className={`w-3.5 h-3.5 rounded flex items-center justify-center text-white ${isOnFocusMode ? 'bg-[#0284c7]' : 'bg-red-500'}`}>
                    <Lock className="w-2.5 h-2.5" />
                  </div>
                  <span className="font-bold text-slate-800">OnFocus</span>
                </div>
                <span className="text-slate-500">85%</span>
              </div>

              {/* Dynamic Screen */}
              <div className="flex-1 bg-[#f8fafc] p-3 flex flex-col justify-between">
                {isOnFocusMode ? (
                  <div>
                    <div className="text-center my-2">
                      <span className="text-[9px] text-slate-400 font-bold uppercase">SALA 101 • MATEMÁTICA</span>
                      <div className="text-2xl font-extrabold text-slate-900">08:30</div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="p-2 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                        <span className="font-bold text-slate-800">GeoGebra</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                        <span className="font-bold text-slate-800">Calculadora</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                        <span className="font-bold text-slate-800">Google Docs</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 py-4">
                    <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-left text-xs">
                      <div className="font-bold text-purple-900">Instagram</div>
                      <div className="text-[10px] text-purple-700">3 novas menções nos stories</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-left text-xs">
                      <div className="font-bold text-emerald-900">WhatsApp</div>
                      <div className="text-[10px] text-emerald-700">18 novas mensagens de áudio</div>
                    </div>
                  </div>
                )}

                <div className="p-2 rounded-lg bg-slate-100 text-slate-600 text-[10px] text-center font-mono">
                  {isOnFocusMode ? '● WHITELIST PEDAGÓGICA ATIVA' : '● DISTRAÇÃO CONTÍNUA'}
                </div>
              </div>

              <div className="w-20 h-1 bg-slate-300 rounded-full mx-auto" />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
