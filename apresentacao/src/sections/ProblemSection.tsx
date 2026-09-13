import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, MessageCircle, Bell, ZapOff, Clock, Target, CheckCircle2 } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const [isCleared, setIsCleared] = useState(false);

  return (
    <section id="problema" className="relative min-h-screen w-full bg-black py-28 px-6 flex flex-col items-center justify-center">
      
      {/* Background Red Ambient Atmosphere */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          isCleared ? 'opacity-0' : 'opacity-25'
        }`}
        style={{
          background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.3) 0%, rgba(0, 0, 0, 0) 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-20">
        
        <span className="text-xs font-mono uppercase tracking-widest text-red-400 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          01 / O PROBLEMA
        </span>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-space tracking-tight text-white mb-4">
          "Em um mundo cheio de distrações,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">
            manter a atenção nunca foi tão difícil."
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-400 font-light max-w-2xl mb-8">
          Notificações, redes sociais e mensagens disputam cada segundo do cérebro do estudante.
        </p>

        {/* Chaos Controller Toggle */}
        <div className="mb-10 z-30">
          <button
            onClick={() => setIsCleared(!isCleared)}
            className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold tracking-wider transition-all duration-300 flex items-center gap-2 shadow-xl ${
              isCleared
                ? 'bg-cyan-400 text-black shadow-[0_0_25px_rgba(0,240,255,0.5)]'
                : 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>{isCleared ? 'VER O CAOS ANTERIOR' : 'CLIQUE PARA DISSOLVER O CAOS'}</span>
          </button>
        </div>

        {/* Center Smartphone with floating chaotic popups */}
        <div className="relative w-full max-w-3xl h-[420px] flex items-center justify-center">

          {/* Floating Chaotic Element 1 (Instagram) */}
          <motion.div
            animate={
              isCleared
                ? { scale: 0.2, opacity: 0, y: 80, filter: 'blur(10px)' }
                : { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }
            }
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -top-4 -left-2 sm:left-12 px-4 py-3 rounded-2xl glass-card border-red-500/40 bg-red-950/40 shadow-2xl flex items-center gap-3 z-30 -rotate-6"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
              IG
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white">Instagram • Agora</div>
              <div className="text-[11px] text-slate-300 font-light">"Lucas curtiu seu reel"</div>
            </div>
          </motion.div>

          {/* Floating Chaotic Element 2 (WhatsApp) */}
          <motion.div
            animate={
              isCleared
                ? { scale: 0.2, opacity: 0, y: 80, filter: 'blur(10px)' }
                : { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }
            }
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-8 -right-2 sm:right-16 px-4 py-3 rounded-2xl glass-card border-emerald-500/40 bg-emerald-950/40 shadow-2xl flex items-center gap-3 z-30 rotate-6"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white">Grupo da Galera (42 msgs)</div>
              <div className="text-[11px] text-slate-300 font-light">"Bora jogar depois da aula?"</div>
            </div>
          </motion.div>

          {/* Floating Chaotic Element 3 (TikTok) */}
          <motion.div
            animate={
              isCleared
                ? { scale: 0.2, opacity: 0, y: 80, filter: 'blur(10px)' }
                : { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }
            }
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-6 left-6 sm:left-24 px-4 py-3 rounded-2xl glass-card border-sky-500/40 bg-sky-950/40 shadow-2xl flex items-center gap-3 z-30 rotate-3"
          >
            <div className="w-9 h-9 rounded-xl bg-black border border-white/20 flex items-center justify-center text-white font-bold text-xs">
              TT
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white">TikTok</div>
              <div className="text-[11px] text-slate-300 font-light">Novo áudio viral em alta 🔥</div>
            </div>
          </motion.div>

          {/* Floating Chaotic Element 4 (1842 Alerts) */}
          <motion.div
            animate={
              isCleared
                ? { scale: 0.2, opacity: 0, y: 80, filter: 'blur(10px)' }
                : { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }
            }
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-6 right-4 sm:right-20 px-4 py-3 rounded-2xl glass-card border-amber-500/40 bg-amber-950/40 shadow-2xl flex items-center gap-3 z-30 -rotate-3"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-black font-bold text-xs">
              <Bell className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white">1,842 Notificações</div>
              <div className="text-[11px] text-slate-300 font-light">Atenção fragmentada</div>
            </div>
          </motion.div>

          {/* Center Phone Chassis */}
          <motion.div
            animate={
              isCleared
                ? {
                    scale: 1.05,
                    boxShadow: '0 0 80px rgba(0, 240, 255, 0.4)',
                    borderColor: '#00f0ff',
                  }
                : {
                    scale: 1,
                    boxShadow: '0 0 60px rgba(239, 68, 68, 0.25)',
                    borderColor: '#475569',
                  }
            }
            transition={{ duration: 0.6 }}
            className="relative w-[260px] sm:w-[280px] h-[440px] rounded-[42px] p-3 bg-gradient-to-b from-slate-800 via-slate-900 to-black border-[3px] flex flex-col justify-between overflow-hidden z-20"
          >
            {/* Notch */}
            <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-700" />
            </div>

            {/* Screen content: Overload vs PURE FOCO */}
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4 relative">
              {!isCleared ? (
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center mb-3 animate-pulse mx-auto text-red-400">
                    <ZapOff className="w-7 h-7" />
                  </div>
                  <div className="text-xs font-bold text-white mb-1">SOBRECARGA DIGITAL</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Interrupções constantes a cada 3 minutos</div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/60 flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(0,240,255,0.5)] text-cyan-400">
                    <Target className="w-8 h-8" />
                  </div>
                  <span className="text-4xl font-black font-space tracking-widest text-cyan-400">FOCO.</span>
                  <span className="text-[10px] font-mono text-slate-400 mt-2 uppercase tracking-wider">
                    OnFocus Ativado
                  </span>
                </motion.div>
              )}
            </div>

            {/* Home Bar */}
            <div className="w-24 h-1 bg-white/30 rounded-full mx-auto mt-2" />
          </motion.div>

        </div>

        {/* Resolution Text */}
        <motion.div
          animate={isCleared ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          className="text-center mt-8 z-20"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">A Transformação</span>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-space mt-1">
            Eliminamos o ruído. Liberamos o potencial.
          </h3>
        </motion.div>

      </div>
    </section>
  );
};
