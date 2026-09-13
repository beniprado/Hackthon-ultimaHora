import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ToggleRight, MapPin, Info, ShieldCheck, Smartphone } from 'lucide-react';

export const ProximityRadarSection: React.FC = () => {
  const [distanceVal, setDistanceVal] = useState(85);

  const isInside = distanceVal > 40;
  const meters = isInside
    ? (((100 - distanceVal) / 100) * 1.5).toFixed(1)
    : ((((100 - distanceVal) / 50) * 8)).toFixed(1);

  const toggleSim = () => {
    setDistanceVal(isInside ? 15 : 85);
  };

  return (
    <section id="proximidade" className="py-28 px-6 lg:px-12 bg-black overflow-hidden relative">
      
      {/* Ambient Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            05 / PROXIMIDADE FÍSICA
          </span>
          <h2 className="text-4xl sm:text-6xl font-black font-space text-white tracking-tight">
            "Kiosk Mode ativado por<br />
            <span className="gradient-title">proximidade física."</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 font-light">
            O diferencial tecnológico do OnFocus: sem vigilância por GPS constante, a proteção é disparada por proximidade da carteira escolar.
          </p>
        </motion.div>

        {/* Interactive Simulator Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden shadow-2xl">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${isInside ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'}`} />
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                CAMPO DE PROXIMIDADE NFC / GEOFENCE
              </span>
            </div>
            
            <button
              onClick={toggleSim}
              className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-cyan-400 text-black hover:bg-cyan-300 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-95"
            >
              <ToggleRight className="w-4 h-4" />
              <span>{isInside ? 'Simular Saída da Carteira' : 'Simular Entrada na Carteira'}</span>
            </button>
          </div>

          {/* Radar & State View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Concentric Radar */}
            <div className="lg:col-span-7 relative h-[360px] rounded-2xl bg-slate-950 border border-white/10 flex flex-col items-center justify-center p-6 overflow-hidden">
              
              {/* Concentric Rings */}
              <motion.div
                animate={{
                  scale: isInside ? [1, 1.05, 1] : 1,
                  borderColor: isInside ? 'rgba(0, 240, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-72 h-72 rounded-full border transition-colors duration-500"
              />
              <motion.div
                animate={{
                  scale: isInside ? [1, 1.08, 1] : 1,
                  borderColor: isInside ? 'rgba(0, 240, 255, 0.45)' : 'rgba(255, 255, 255, 0.05)',
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
                    isInside ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-slate-600'
                  }`}
                >
                  <MapPin className="w-6 h-6" />
                </div>
              </div>

              {/* Slider */}
              <div className="absolute bottom-4 left-6 right-6 z-20">
                <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                  <span className="text-slate-500">FORA DA SALA (0m)</span>
                  <span className={`font-bold ${isInside ? 'text-cyan-400' : 'text-slate-500'}`}>
                    DISTÂNCIA: {meters}m ({isInside ? 'CARTEIRA 3B' : 'FORA'})
                  </span>
                  <span className="text-slate-500">CARTEIRA 3B</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={distanceVal}
                  onChange={(e) => setDistanceVal(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

            </div>

            {/* Right: State HUD Machine Output */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              <div
                className={`p-6 rounded-2xl transition-all duration-500 ${
                  isInside
                    ? 'bg-cyan-950/30 border border-cyan-500/50 shadow-[0_0_30px_rgba(0,240,255,0.15)]'
                    : 'bg-slate-900/60 border border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-bold">
                    STATUS DO DISPOSITIVO
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold ${
                      isInside ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,240,255,0.5)]' : 'bg-slate-700 text-white'
                    }`}
                  >
                    {isInside ? 'ONFOCUS ACTIVATED' : 'FOCUS MODE DEACTIVATED'}
                  </span>
                </div>
                
                <h3 className="text-2xl font-black font-space text-white mb-2">
                  {isInside ? 'Ambiente Controlado Ativo' : 'Modo Pessoal Restaurado'}
                </h3>
                
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {isInside
                    ? 'O smartphone está na área autorizada. O launcher seguro bloqueia distrações e disponibiliza exclusivamente a Whitelist pedagógica.'
                    : 'O aluno saiu da área autorizada. O smartphone restaura wallpaper, notificações normais e acesso irrestrito instantaneamente.'}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10 text-[11px] font-mono">
                  <div>
                    <span className="text-slate-500 block">KIOSK LOCK:</span>
                    <span className={`font-bold ${isInside ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {isInside ? 'ATIVO / DPM' : 'DESATIVADO'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">NOTIFICAÇÕES:</span>
                    <span className={`font-bold ${isInside ? 'text-cyan-400' : 'text-slate-400'}`}>
                      {isInside ? 'SUSPENSAS' : 'LIBERADAS'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info callout */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-slate-400">
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
