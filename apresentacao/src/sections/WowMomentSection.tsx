import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import confetti from 'canvas-confetti';

export const WowMomentSection: React.FC = () => {
  const triggerReward = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#38bdf8', '#818cf8', '#ffffff'],
    });
  };

  return (
    <section
      id="wow"
      className="relative min-h-[120vh] bg-black flex flex-col items-center justify-center text-center px-6 overflow-hidden py-32"
    >
      {/* Quantum Spotlight */}
      <div className="absolute w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center relative z-10">
        
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono uppercase tracking-[0.3em] text-slate-500 mb-8 block"
        >
          O PRINCÍPIO FUNDAMENTAL
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-7xl md:text-8xl font-black font-space tracking-tight text-slate-600 leading-tight mb-6"
        >
          "FOCO NÃO É BLOQUEAR."
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-4xl sm:text-7xl md:text-8xl font-black font-space tracking-tight text-white leading-tight mb-12"
        >
          "É CRIAR O <span className="gradient-title-hero">AMBIENTE CERTO</span>."
        </motion.h3>

        {/* Big Glowing ONFOCUS Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerReward}
          className="relative group cursor-pointer"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-[#0284c7] rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500" />
          <div className="relative px-10 py-5 rounded-2xl bg-black border border-cyan-400/40 flex items-center gap-4 shadow-2xl">
            <Target className="w-8 h-8 text-cyan-400 animate-spin" style={{ animationDuration: '14s' }} />
            <span className="text-3xl sm:text-4xl font-extrabold tracking-widest font-space text-white">
              ON<span className="text-cyan-400">FOCUS</span>
            </span>
          </div>
        </motion.div>

        <span className="text-[10px] font-mono text-slate-600 mt-4">
          (Clique no emblema para celebrar o momento)
        </span>

      </div>
    </section>
  );
};
