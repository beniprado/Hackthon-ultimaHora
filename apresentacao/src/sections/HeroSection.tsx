import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Radio, ShieldCheck, Lock, Play } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Radial Depth Spotlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating Abstract Tech Badges */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-28 left-[8%] opacity-50 hidden md:block"
      >
        <div className="px-3.5 py-1.5 rounded-lg glass-card border border-cyan-500/30 text-[11px] font-mono text-cyan-300 flex items-center gap-2 shadow-lg">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>ECDSA P-256 ENCRYPTED</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-32 right-[10%] opacity-50 hidden md:block"
      >
        <div className="px-3.5 py-1.5 rounded-lg glass-card border border-sky-500/30 text-[11px] font-mono text-sky-300 flex items-center gap-2 shadow-lg">
          <Radio className="w-3.5 h-3.5 text-sky-400" />
          <span>NFC PHYSICAL PROXIMITY</span>
        </div>
      </motion.div>

      {/* Hero Core Typography */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-8 shadow-[0_0_20px_rgba(0,240,255,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-300">
            A Nova Era da Atenção em Sala de Aula
          </span>
        </motion.div>

        {/* Big Monolithic ONFOCUS Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl sm:text-9xl lg:text-[11rem] font-black tracking-tighter uppercase font-space leading-none mb-4 select-none"
        >
          <span className="gradient-title-hero">ONFOCUS</span>
        </motion.h1>

        {/* Signature Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-6 font-space"
        >
          "Seu foco começa aqui."
        </motion.h2>

        {/* Short Explanatory Pitch */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-12"
        >
          Transformamos o smartphone em uma ferramenta pedagógica ativa através de aproximação física NFC e Kiosk Mode temporário.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#problema"
            className="px-8 py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_35px_rgba(0,240,255,0.4)] transition-all flex items-center gap-3 active:scale-95"
          >
            <span>Iniciar Narrativa</span>
            <ArrowDown className="w-4 h-4" />
          </a>
          <a
            href="#proximidade"
            className="px-8 py-4 rounded-xl font-mono text-xs font-medium uppercase tracking-wider text-slate-300 glass-card hover:border-cyan-500/40 hover:text-white transition-all flex items-center gap-2 active:scale-95"
          >
            <Play className="w-4 h-4 text-cyan-400" />
            <span>Simulador de Proximidade</span>
          </a>
        </motion.div>

      </div>

      {/* Scroll Down Prompt */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500">Role para explorar</span>
        <div className="w-5 h-9 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
          <div className="w-1.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};
