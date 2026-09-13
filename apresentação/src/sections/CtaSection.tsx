import React from 'react';
import { motion } from 'framer-motion';
import { Target, ExternalLink, Play } from 'lucide-react';

interface CtaSectionProps {
  onOpenPitch: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenPitch }) => {
  return (
    <section
      id="cta"
      className="py-36 px-6 bg-black flex flex-col items-center justify-center text-center overflow-hidden relative"
    >
      {/* Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-cyan-600/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Logo Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_40px_rgba(0,240,255,0.4)]"
        >
          <Target className="w-8 h-8" />
        </motion.div>

        {/* Brand Name */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl sm:text-8xl md:text-9xl font-black font-space tracking-tighter text-white mb-4"
        >
          ONFOCUS
        </motion.h2>

        {/* Headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl text-slate-300 font-light max-w-xl mx-auto mb-10 font-space"
        >
          "Mais presença. Menos distração."
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-12"
        >
          <a
            href="https://hackthon-ultima-hora.vercel.app/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_35px_rgba(0,240,255,0.5)] transition-all flex items-center gap-2 active:scale-95"
          >
            <span>Conheça o OnFocus</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="#como-funciona"
            className="px-8 py-4 rounded-xl font-mono text-xs font-medium uppercase tracking-wider text-slate-300 glass-card border border-white/10 hover:border-cyan-500/40 hover:text-white transition-all flex items-center gap-2 active:scale-95"
          >
            <Play className="w-4 h-4 text-cyan-400" />
            <span>Veja como funciona</span>
          </a>
        </motion.div>

        {/* Message */}
        <div className="text-xs font-mono text-slate-500 max-w-md mx-auto">
          "Uma nova forma de transformar tecnologia em foco."<br />
          <span className="text-slate-600 mt-1 block">Projeto desenvolvido para o Hackathon Última Hora.</span>
        </div>

      </div>
    </section>
  );
};
