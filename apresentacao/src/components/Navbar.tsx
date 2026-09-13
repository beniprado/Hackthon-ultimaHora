import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onOpenPitch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPitch }) => {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-50 px-6 lg:px-12 py-3 flex items-center justify-between backdrop-blur-md bg-black/30 border-b border-white/[0.06]"
    >
      {/* Discreet Logo */}
      <div className="flex items-center gap-2">
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="w-2 h-2 rounded-full bg-cyan-400 opacity-80 group-hover:opacity-100 transition-opacity" />
          <span className="font-semibold text-sm tracking-widest text-zinc-200 font-space group-hover:text-white transition-colors">
            ONFOCUS
          </span>
        </a>
      </div>

      {/* Minimalist Center Navigation Links */}
      <nav className="hidden lg:flex items-center gap-8 text-xs font-normal text-zinc-400">
        <a href="#problema" className="hover:text-zinc-100 transition-colors">Problema</a>
        <a href="#descoberta" className="hover:text-zinc-100 transition-colors">A Descoberta</a>
        <a href="#produto" className="hover:text-zinc-100 transition-colors">O Produto</a>
        <a href="#proximidade" className="hover:text-zinc-100 transition-colors">Kiosk Mode</a>
        <a href="#tecnologia" className="hover:text-zinc-100 transition-colors">Tecnologia</a>
        <a href="#dashboard" className="hover:text-zinc-100 transition-colors">Gestor</a>
      </nav>

      {/* Subtle Right Actions */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenPitch}
          className="text-xs text-zinc-400 hover:text-zinc-100 px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors font-medium"
        >
          Pitch Deck
        </button>
        <a
          href="https://hackthon-ultima-hora.vercel.app/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-200 bg-white/10 hover:bg-white/15 border border-white/10 transition-all active:scale-95"
        >
          <span>Abrir Sistema</span>
          <ExternalLink className="w-3 h-3 text-zinc-400" />
        </a>
      </div>
    </motion.header>
  );
};
