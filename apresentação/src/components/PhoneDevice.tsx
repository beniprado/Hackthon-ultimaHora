import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Radio, CheckCircle2, Battery, AlertTriangle, 
  Activity, ChevronRight, FileText, Smartphone, ShieldCheck,
  BookOpen, Calculator, Compass, Sparkles, Wifi
} from 'lucide-react';

export type ScreenType = 
  | 'standby'     // Tela 1: 08:30 Brasília, Sala 101, Whitelist
  | 'nfc'         // Tela 2: Radar de aproximação NFC
  | 'launcher'    // Tela 3: Modo Aula Ativado com 4 apps
  | 'geogebra'    // Tela 4: GeoGebra em execução com gráfico
  | 'restricted'  // Tela 5: Acesso Restrito ao Instagram
  | 'unlocked';   // Tela 6: Aula finalizada, desbloqueado

interface PhoneDeviceProps {
  currentScreen: ScreenType;
}

export const PhoneDevice: React.FC<PhoneDeviceProps> = ({ currentScreen }) => {
  return (
    <div className="relative group flex items-center justify-center">
      
      {/* Dynamic 3D Physical Contact Ground Shadow */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-black/90 blur-xl rounded-full pointer-events-none transition-all duration-300" />
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[60%] h-6 bg-cyan-500/15 blur-lg rounded-full pointer-events-none" />

      {/* Titanium / Glass Phone Chassis (Controlled Dimensions: max-h-[66vh] to guarantee 100% visibility) */}
      <div className="relative w-[265px] sm:w-[285px] lg:w-[295px] h-[525px] sm:h-[555px] lg:h-[575px] max-h-[66vh] bg-[#070a12] rounded-[48px] p-[8px] sm:p-[9px] border border-white/[0.18] shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(0,240,255,0.06),inset_0_0_0_1px_rgba(255,255,255,0.1)] flex flex-col justify-between overflow-hidden select-none">
        
        {/* Chamfered Metallic Edge & Glass Glare Reflection Layer */}
        <div className="absolute inset-0 rounded-[46px] border border-white/[0.08] pointer-events-none z-30" />
        <div className="absolute -top-[120%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none z-30 rotate-12" />
        
        {/* Antenna bands */}
        <div className="absolute top-16 left-0 w-[2px] h-3 bg-white/20 z-30" />
        <div className="absolute top-16 right-0 w-[2px] h-3 bg-white/20 z-30" />
        <div className="absolute bottom-16 left-0 w-[2px] h-3 bg-white/20 z-30" />
        <div className="absolute bottom-16 right-0 w-[2px] h-3 bg-white/20 z-30" />

        {/* Top Edge Specular Highlight */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-30" />

        {/* Dynamic Island & System Status Header */}
        <div className="relative w-full flex items-center justify-between px-4 pt-1.5 pb-1 bg-[#0a0e1a] rounded-t-[38px] z-20 text-[10px] border-b border-white/[0.06] text-white shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="font-space font-bold text-[10px] text-white tracking-tight">08:30</span>
          </div>

          {/* Dynamic Island Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-black rounded-full border border-white/10 shadow-inner">
            <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              currentScreen === 'standby' ? 'bg-amber-400' :
              currentScreen === 'nfc' ? 'bg-cyan-400 animate-ping' :
              currentScreen === 'restricted' ? 'bg-rose-400' :
              'bg-emerald-400 animate-pulse'
            }`} />
            <span className="text-[8.5px] font-mono text-slate-300 font-medium tracking-tight">
              {currentScreen === 'standby' && 'Sala 101'}
              {currentScreen === 'nfc' && 'NFC • Lendo'}
              {currentScreen === 'launcher' && 'OnFocus • Ativo'}
              {currentScreen === 'geogebra' && 'GeoGebra'}
              {currentScreen === 'restricted' && 'Bloqueio'}
              {currentScreen === 'unlocked' && 'Liberado'}
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-300 font-mono text-[8.5px]">
            <Wifi className="w-2.5 h-2.5 text-slate-400" />
            <div className="flex items-center gap-0.5">
              <span>98%</span>
              <Battery className="w-3 h-3 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Screen Viewport with Rich High-Contrast Display */}
        <div className="relative flex-1 bg-[#0b0f19] rounded-b-[38px] p-3 sm:p-3.5 flex flex-col justify-between overflow-hidden shadow-inner border border-white/[0.04]">
          
          <AnimatePresence mode="wait">
            
            {/* SCREEN 1: Standby & Whitelist */}
            {currentScreen === 'standby' && (
              <motion.div
                key="screen-standby"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col justify-between text-white"
              >
                <div>
                  {/* Clock & Date Header */}
                  <div className="text-center my-2">
                    <span className="text-[9px] text-cyan-400/90 font-bold uppercase tracking-[0.2em] font-mono">
                      HORÁRIO DE BRASÍLIA
                    </span>
                    <div className="text-4xl font-extrabold text-white tracking-tight font-space mt-0.5">
                      08:30
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      Segunda-feira, 22 de Maio
                    </div>
                  </div>

                  {/* Class Meta Box */}
                  <div className="bg-white/[0.04] p-3 rounded-2xl border border-white/[0.08] shadow-lg space-y-1 text-xs mb-3 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-wider font-mono">
                        SALA 101 • BLOCO B
                      </span>
                      <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        Em Espera
                      </span>
                    </div>
                    <span className="font-bold text-white text-sm block font-space">
                      Matemática Aplicada
                    </span>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      Prof. Ricardo Silva • 3º Ano EM
                    </span>
                  </div>

                  {/* Whitelist Apps Preview */}
                  <div className="space-y-1.5">
                    <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/[0.06] flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 flex items-center justify-center font-bold text-xs">
                          <Compass className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-[11px] font-space">GeoGebra Pro</div>
                          <div className="text-[9px] text-slate-400 font-mono">Geometria e Gráficos</div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </div>

                    <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/[0.06] flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-400 flex items-center justify-center font-bold text-xs">
                          <Calculator className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-[11px] font-space">Calculadora</div>
                          <div className="text-[9px] text-slate-400 font-mono">Operações Analíticas</div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                  </div>
                </div>

                <div className="text-[9px] font-mono text-slate-400 text-center pt-2 border-t border-white/[0.06] flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>AGUARDANDO APROXIMAÇÃO NFC</span>
                </div>
              </motion.div>
            )}

            {/* SCREEN 2: NFC Scan */}
            {currentScreen === 'nfc' && (
              <motion.div
                key="screen-nfc"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col justify-between text-center py-3 text-white"
              >
                <div>
                  {/* Concentric NFC Radar Wave */}
                  <div className="relative w-28 h-28 mx-auto flex items-center justify-center mb-4 mt-2">
                    <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping" />
                    <div className="absolute inset-2 rounded-full border border-cyan-500/40 animate-pulse" />
                    <div className="w-20 h-20 rounded-full border border-cyan-400/60 flex items-center justify-center bg-cyan-950/40 shadow-[0_0_30px_rgba(0,240,255,0.25)]">
                      <Radio className="w-8 h-8 text-cyan-300 animate-pulse" />
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-bold text-white font-space mb-1">Aproxime da Carteira</h4>
                  <p className="text-xs text-slate-400 px-3 leading-relaxed">
                    Mantenha o aparelho sobre a tag da mesa para autenticação criptográfica.
                  </p>
                </div>

                <div className="bg-white/[0.04] p-3 rounded-2xl border border-cyan-500/20 text-left text-xs shadow-md">
                  <span className="text-[9px] font-bold text-cyan-400 block uppercase tracking-wider mb-0.5 font-mono">
                    ASSINATURA CRIPTOGRÁFICA
                  </span>
                  <span className="font-mono text-slate-300 text-[11px] block">
                    ECDSA P-256 • Tag #101-B
                  </span>
                </div>
              </motion.div>
            )}

            {/* SCREEN 3: Launcher Ativado */}
            {currentScreen === 'launcher' && (
              <motion.div
                key="screen-launcher"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col justify-between text-center text-white"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 mx-auto flex items-center justify-center text-cyan-400 mb-2 mt-1 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white font-space mb-0.5">Modo Foco Ativado</h4>
                  <p className="text-[11px] text-slate-400 mb-3 px-2">
                    Whitelist pedagógica da Sala 101
                  </p>

                  <div className="space-y-1.5 text-left text-xs">
                    <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/[0.08] flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-2">
                        <Compass className="w-4 h-4 text-cyan-400" />
                        <span className="font-bold text-white font-space text-[12px]">GeoGebra</span>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    
                    <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/[0.08] flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <span className="font-bold text-white font-space text-[12px]">Dicionário Escolar</span>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>

                    <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/[0.08] flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-indigo-400" />
                        <span className="font-bold text-white font-space text-[12px]">Calculadora Pro</span>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-mono py-1 border-t border-white/[0.06]">
                  Redes sociais e jogos suspensos.
                </div>
              </motion.div>
            )}

            {/* SCREEN 4: GeoGebra em Execução */}
            {currentScreen === 'geogebra' && (
              <motion.div
                key="screen-geogebra"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col justify-between text-white"
              >
                <div>
                  <div className="bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 p-2 rounded-xl text-xs mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-semibold text-[10px] font-mono uppercase tracking-wider">MODO PEDAGÓGICO</span>
                    </div>
                    <Lock className="w-3 h-3 text-cyan-400" />
                  </div>

                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-bold text-white text-sm font-space">GeoGebra Pro</span>
                    <span className="text-[10px] text-cyan-400 font-mono">f(x) = sin(x) + cos(x)</span>
                  </div>

                  {/* High Resolution Dynamic Graph SVG */}
                  <div className="bg-slate-950 rounded-2xl border border-white/[0.08] p-3 h-40 flex flex-col justify-between shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />
                    
                    <div className="text-[10px] font-mono text-cyan-300/80 z-10">
                      f(x) = sin(x) • cos(0.5x)<br />
                      Ponto Notável: A = (π/2, 1.00)
                    </div>

                    <div className="w-full h-20 flex items-center justify-center z-10">
                      <svg className="w-full h-full" viewBox="0 0 160 60">
                        {/* Cartesian Grid */}
                        <line x1="0" y1="30" x2="160" y2="30" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />
                        <line x1="80" y1="0" x2="80" y2="60" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />
                        
                        {/* Trigonometric Sine Wave */}
                        <path 
                          d="M 10 30 Q 30 5, 50 30 T 90 30 T 130 30 T 155 30" 
                          fill="none" 
                          stroke="#00f0ff" 
                          strokeWidth="2.5" 
                        />
                        {/* Geometric Tangent Construction */}
                        <circle cx="50" cy="30" r="3" fill="#ffffff" stroke="#00f0ff" strokeWidth="1.5" />
                        <line x1="25" y1="50" x2="75" y2="10" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,3" />
                      </svg>
                    </div>

                    <div className="text-[9px] font-mono text-slate-400 z-10 flex justify-between">
                      <span>x: [-2π, 2π]</span>
                      <span className="text-emerald-400 font-semibold">Cálculo Ativo</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-950/40 p-2 rounded-xl text-emerald-400 text-[10px] font-bold text-center border border-emerald-500/20 font-mono">
                  ● APP PEDAGÓGICO AUTORIZADO
                </div>
              </motion.div>
            )}

            {/* SCREEN 5: Acesso Restrito */}
            {currentScreen === 'restricted' && (
              <motion.div
                key="screen-restricted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col justify-between text-center py-2 text-white"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 mx-auto flex items-center justify-center relative mb-2 shadow-[0_0_20px_rgba(244,63,94,0.25)]">
                    <AlertTriangle className="w-6 h-6 text-rose-400" />
                  </div>

                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest block mb-1 font-mono">
                    ACESSO RESTRITO
                  </span>
                  <h4 className="text-sm font-bold text-white font-space mb-1">
                    Aplicativo em pausa durante a aula
                  </h4>
                  <p className="text-xs text-slate-400 px-2 mb-3 leading-relaxed">
                    O OnFocus mantém seu foco protegido na explicação do professor.
                  </p>

                  <div className="w-full py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] text-white font-space font-bold text-xs transition-colors">
                    &lt; Voltar ao Launcher Seguro
                  </div>
                </div>

                <div className="bg-white/[0.03] p-2 rounded-xl border border-white/[0.06] text-left text-xs">
                  <span className="text-[9px] font-bold text-slate-400 block font-mono">POLÍTICA PEDAGÓGICA</span>
                  <span className="font-semibold text-slate-200 text-[11px]">Sala 101 • Bloqueio Inteligente</span>
                </div>
              </motion.div>
            )}

            {/* SCREEN 6: Desbloqueio Pós-Aula */}
            {currentScreen === 'unlocked' && (
              <motion.div
                key="screen-unlocked"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col justify-between text-center py-3 text-white"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 mx-auto flex items-center justify-center text-emerald-400 mb-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-space mb-1">Aula Finalizada</h4>
                  <p className="text-xs text-slate-300 px-2 mb-3 leading-relaxed">
                    Sessão pedagógica concluída. Todas as funções do seu smartphone foram liberadas.
                  </p>

                  <div className="bg-white/[0.04] p-3 rounded-2xl border border-white/[0.08] text-left text-xs space-y-1 shadow-sm">
                    <span className="text-[9px] font-bold text-emerald-400 uppercase block font-mono">STATUS DO DISPOSITIVO</span>
                    <span className="font-bold text-white text-sm font-space">Dispositivo Desbloqueado</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-mono">
                  Sessão de 50 minutos concluída com sucesso.
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* Home Indicator Bar */}
        <div className="w-24 h-1 bg-white/30 rounded-full mx-auto my-1.5" />
      </div>
    </div>
  );
};

