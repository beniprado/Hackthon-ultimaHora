import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Radio, Lock, Activity, Users, CheckCircle2, ChevronRight, Calculator, FileText, Check } from 'lucide-react';

const PRODUCT_STEPS = [
  {
    id: 1,
    label: 'SCROLL 1',
    headline: '"Ative o modo foco."',
    desc: 'O aluno encosta o smartphone na Tag NFC da carteira. Em menos de 400ms, o OnFocus valida a presença e sincroniza a política pedagógica.',
    screen: 'nfc',
  },
  {
    id: 2,
    label: 'SCROLL 2',
    headline: '"O ambiente é controlado."',
    desc: 'O Android assume o Launcher Seguro (Kiosk Mode). As notificações de redes sociais e jogos são suspensas sem invasão de arquivos pessoais.',
    screen: 'kiosk',
  },
  {
    id: 3,
    label: 'SCROLL 3',
    headline: '"O aluno acessa apenas o necessário."',
    desc: 'O estudante utiliza ferramentas dinâmicas autorizadas pelo professor (como GeoGebra, Calculadora e PDFs) para resolver atividades.',
    screen: 'geogebra',
  },
  {
    id: 4,
    label: 'SCROLL 4',
    headline: '"A escola mantém o controle."',
    desc: 'Telemetria em tempo real no painel do docente. Ao término do período, o sistema libera automaticamente o uso pessoal do aparelho.',
    screen: 'telemetry',
  },
];

export const ProductStickySection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const current = PRODUCT_STEPS[activeStep - 1];

  return (
    <section id="produto" className="py-28 px-6 lg:px-12 bg-black min-h-screen flex items-center justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Narrative Story */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            03 / APRESENTAÇÃO DO PRODUTO
          </span>

          {/* Interactive Step Selector */}
          <div className="flex items-center gap-2 mb-6">
            {PRODUCT_STEPS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveStep(s.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeStep === s.id
                    ? 'bg-cyan-400 text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                0{s.id}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="min-h-[200px]"
            >
              <div className="text-xs font-mono text-cyan-400 font-bold mb-2">{current.label}</div>
              <h3 className="text-3xl sm:text-5xl font-black font-space text-white mb-4">
                {current.headline}
              </h3>
              <p className="text-slate-300 text-base leading-relaxed font-light mb-6">
                {current.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Dots */}
          <div className="flex items-center gap-3 mt-4">
            {PRODUCT_STEPS.map((s) => (
              <div
                key={s.id}
                onClick={() => setActiveStep(s.id)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeStep === s.id ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: 3D Smartphone Device Mockup with Real Interfaces */}
        <div className="lg:col-span-6 flex justify-center">
          <motion.div
            animate={{
              rotateY: activeStep === 1 ? -4 : activeStep === 2 ? 4 : activeStep === 3 ? -3 : 0,
              scale: activeStep === 4 ? 1.03 : 1,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="w-[300px] sm:w-[330px] h-[580px] bg-white rounded-[48px] p-3.5 border-[4px] border-slate-700 shadow-[0_30px_100px_rgba(0,0,0,0.9),0_0_50px_rgba(0,240,255,0.2)] relative flex flex-col justify-between overflow-hidden text-slate-800"
          >
            {/* Header */}
            <div className="w-full flex items-center justify-between px-3 py-1 border-b border-slate-100 text-[10px]">
              <div className="flex items-center gap-1">
                <div className="w-3.5 h-3.5 rounded bg-[#0284c7] flex items-center justify-center text-white">
                  <Lock className="w-2.5 h-2.5" />
                </div>
                <span className="font-bold text-slate-800">OnFocus</span>
              </div>
              <span className="text-slate-500 font-mono">08:30 • 85%</span>
            </div>

            {/* Dynamic Screen Contents */}
            <div className="flex-1 bg-[#f8fafc] p-3.5 flex flex-col justify-between overflow-y-auto">
              
              {/* Screen 1: Scan NFC */}
              {current.screen === 'nfc' && (
                <div className="flex-1 flex flex-col justify-between text-center py-4">
                  <div>
                    <div className="relative w-24 h-24 mx-auto flex items-center justify-center mb-4">
                      <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 animate-ping" />
                      <div className="w-20 h-20 rounded-full border border-cyan-500 flex items-center justify-center bg-cyan-50">
                        <Radio className="w-8 h-8 text-[#0284c7]" />
                      </div>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">Aproxime o Dispositivo</h4>
                    <p className="text-[11px] text-slate-500 px-2">Toque na tag NFC na entrada da sala para ativar o modo foco.</p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-left text-xs">
                    <span className="text-[9px] font-bold text-cyan-600 block uppercase">STATUS DO SISTEMA</span>
                    <span className="font-mono text-slate-700 text-[10px]">ECDSA: 0x8F92...B341</span>
                  </div>
                </div>
              )}

              {/* Screen 2: Kiosk Lock */}
              {current.screen === 'kiosk' && (
                <div className="flex-1 flex flex-col justify-between text-center">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-sky-100 border border-sky-200 mx-auto flex items-center justify-center text-[#0284c7] mb-2 shadow-sm">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">Modo Aula Ativado</h4>
                    <p className="text-[10px] text-slate-500 mb-3">4 aplicativos autorizados para Matemática</p>

                    <div className="space-y-1.5 text-left text-xs">
                      <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                        <span className="font-bold text-slate-800">GeoGebra</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                        <span className="font-bold text-slate-800">Calculadora</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                        <span className="font-bold text-slate-800">Google Docs</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400">
                    Notificações suspensas até o fim da aula.
                  </div>
                </div>
              )}

              {/* Screen 3: GeoGebra */}
              {current.screen === 'geogebra' && (
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="bg-[#0284c7] text-white p-2 rounded-lg text-xs mb-2 flex items-center justify-between">
                      <span className="font-bold text-[10px]">SEGURANÇA ATIVA</span>
                      <Lock className="w-3 h-3" />
                    </div>

                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-slate-900">GeoGebra</span>
                      <span className="text-[10px] text-slate-500">Geometria e Funções</span>
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

              {/* Screen 4: Telemetria & Aula Concluída */}
              {current.screen === 'telemetry' && (
                <div className="flex-1 flex flex-col justify-between text-center py-4">
                  <div>
                    <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 mx-auto flex items-center justify-center text-emerald-600 mb-3">
                      <Check className="w-8 h-8" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">Aula Finalizada</h4>
                    <p className="text-[11px] text-slate-500 px-2 mb-4">
                      O Modo Aula foi encerrado com sucesso. Todas as funcionalidades foram restauradas.
                    </p>

                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-left text-xs space-y-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block">DESEMPENHO DO FOCO</span>
                      <span className="font-bold text-slate-900 text-sm">98.4% de engajamento</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-emerald-600 font-bold">
                    Dispositivo Desbloqueado com Sucesso.
                  </div>
                </div>
              )}

            </div>

            <div className="w-24 h-1 bg-slate-300 rounded-full mx-auto" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};
