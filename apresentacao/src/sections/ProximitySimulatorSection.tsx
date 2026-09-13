import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ToggleRight, MapPin, Info } from 'lucide-react';

export const ProximitySimulatorSection: React.FC = () => {
  const [distanceVal, setDistanceVal] = useState(85);

  const isInside = distanceVal > 40;
  const meters = isInside
    ? (((100 - distanceVal) / 100) * 1.5).toFixed(1)
    : ((((100 - distanceVal) / 50) * 8)).toFixed(1);

  const toggleSim = () => {
    setDistanceVal(isInside ? 15 : 85);
  };

  return (
    <section id="proximidade" className="relative py-28 px-6 lg:px-16 bg-black overflow-hidden">
      
      {/* Ambient Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            05 / EXPERIÊNCIA INTERATIVA AO VIVO
          </span>
          <h2 className="text-4xl sm:text-6xl font-black font-space text-white tracking-tight">
            Kiosk Mode ativado por<br />
            <span className="gradient-text">proximidade física.</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 font-light">
            Interaja com o simulador: arraste o controle deslizante ou clique no botão para testar a entrada e saída da zona autorizada em tempo real.
          </p>
        </motion.div>

        {/* Interactive Simulator Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden">
          
          {/* Simulator Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                SIMULADOR DE CAMPO DE PROXIMIDADE NFC / GEOFENCE
              </span>
            </div>
            
            <button
              onClick={toggleSim}
              className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-cyan-400 text-black hover:bg-cyan-300 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-95"
            >
              <ToggleRight className="w-4 h-4" />
              <span>{isInside ? 'Simular Saída da Sala' : 'Simular Aproximação'}</span>
            </button>
          </div>

          {/* Radar & Zone Field */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Radar / NFC Zone Canvas Area */}
            <div className="lg:col-span-7 relative h-[360px] rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-col items-center justify-center p-6 overflow-hidden">
              
              {/* Concentric Proximity Rings */}
              <motion.div
                animate={{
                  scale: isInside ? [1, 1.05, 1] : 1,
                  borderColor: isInside ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-72 h-72 rounded-full border transition-colors duration-500"
              />
              <motion.div
                animate={{
                  scale: isInside ? [1, 1.08, 1] : 1,
                  borderColor: isInside ? 'rgba(0, 240, 255, 0.4)' : 'rgba(255, 255, 255, 0.05)',
                }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                className="absolute w-52 h-52 rounded-full border transition-colors duration-500"
              />
              <div
                className={`absolute w-32 h-32 rounded-full border transition-all duration-500 flex items-center justify-center ${
                  isInside
                    ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(0,240,255,0.4)]'
                    : 'border-white/10 bg-transparent'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-500 ${
                    isInside ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-zinc-600'
                  }`}
                >
                  <MapPin className="w-6 h-6" />
                </div>
              </div>

              {/* Proximity Slider */}
              <div className="absolute bottom-4 left-6 right-6 z-20">
                <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                  <span className="text-zinc-500">FORA DA ESCOLA (0m)</span>
                  <span className={`font-bold ${isInside ? 'text-cyan-400' : 'text-zinc-500'}`}>
                    DISTÂNCIA: {meters}m ({isInside ? 'ZONA ATIVA' : 'FORA'})
                  </span>
                  <span className="text-zinc-500">CARTEIRA 3B</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={distanceVal}
                  onChange={(e) => setDistanceVal(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

            </div>

            {/* Right: State Machine HUD Output */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              <div
                className={`p-6 rounded-2xl transition-all duration-500 ${
                  isInside
                    ? 'bg-cyan-950/30 border border-cyan-500/40'
                    : 'bg-zinc-900/60 border border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-bold">
                    STATUS DO SISTEMA
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      isInside ? 'bg-cyan-400 text-black' : 'bg-zinc-700 text-white'
                    }`}
                  >
                    {isInside ? 'ONFOCUS ACTIVATED' : 'FOCUS MODE DEACTIVATED'}
                  </span>
                </div>
                
                <h3 className="text-2xl font-black font-space text-white mb-2">
                  {isInside ? 'Ambiente Protegido' : 'Modo Pessoal Restaurado'}
                </h3>
                
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  {isInside
                    ? 'O dispositivo está dentro do raio autorizado. O launcher substituto está fixado na tela impedindo alternância para apps recreativos.'
                    : 'O aluno saiu da área autorizada. O smartphone restaura o wallpaper pessoal, apps normais e notificações sem intervenção manual.'}
                </p>

                {/* Status metrics */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10 text-[11px] font-mono">
                  <div>
                    <span className="text-zinc-500 block">KIOSK LOCK:</span>
                    <span className={`font-bold ${isInside ? 'text-emerald-400' : 'text-zinc-500'}`}>
                      {isInside ? 'ATIVO / DPM' : 'DESATIVADO'}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">NOTIFICAÇÕES:</span>
                    <span className={`font-bold ${isInside ? 'text-cyan-400' : 'text-zinc-400'}`}>
                      {isInside ? 'SUSPENSAS' : 'LIBERADAS'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Callout */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-zinc-400">
                <Info className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span>Assinatura NFC dinâmica de sessão única: impossibilita cópia ou clonagem de tags.</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
