import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Shield, Cpu, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({ isOpen, onClose }) => {
  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#070b14] rounded-3xl border border-white/[0.12] p-6 sm:p-10 flex flex-col justify-between overflow-y-auto shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(0,240,255,0.1)] text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-space text-white tracking-tight">ONFOCUS — PITCH DECK EXECUTIVO</h3>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Hackathon Última Hora 2026 • Sumário Estratégico</span>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Fechar Pitch Deck"
                className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] flex items-center justify-center text-slate-300 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Slides Content Grid */}
            <div className="space-y-4 my-6 text-sm">
              
              {/* Problem */}
              <div className="p-5 rounded-2xl editorial-card border border-white/[0.08]">
                <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold mb-2">
                  <Zap className="w-4 h-4" />
                  <span className="tracking-wider">01. O PROBLEMA REAL</span>
                </div>
                <p className="font-light text-xs text-slate-300 leading-relaxed font-sans">
                  O celular em sala de aula gera interrupções constantes a cada 3 minutos. As abordagens tradicionais falham: caixas recolhedoras físicas causam filas e riscos de quebra; softwares invasivos violam a privacidade do estudante.
                </p>
              </div>

              {/* Solution */}
              <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/25">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold mb-2">
                  <Shield className="w-4 h-4" />
                  <span className="tracking-wider">02. A SOLUÇÃO ONFOCUS</span>
                </div>
                <p className="font-light text-xs text-slate-200 leading-relaxed font-sans">
                  Transformação temporária e sem atrito do smartphone pessoal em uma ferramenta de estudo ativa via aproximação NFC (1 toque na carteira). O sistema ativa um Launcher Seguro com whitelist de aplicativos autorizados para aquela aula.
                </p>
              </div>

              {/* Architecture & Tech */}
              <div className="p-5 rounded-2xl editorial-card border border-white/[0.08]">
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold mb-3">
                  <Cpu className="w-4 h-4" />
                  <span className="tracking-wider">03. ARQUITETURA & TECNOLOGIA</span>
                </div>
                <ul className="space-y-2 text-xs font-light text-slate-300 font-sans">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white font-medium">Assinatura Criptográfica ECDSA P-256</strong>: Tags NFC blindadas contra clonagem.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white font-medium">Android Lock Task Mode / DPM</strong>: Kiosk Mode pedagógico nativo e seguro.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white font-medium">Gestor Web SaaS (Next.js 14 & WebSockets)</strong>: Painel com telemetria síncrona em tempo real para o docente.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white font-medium">100% LGPD Compliant</strong>: Sem monitoramento invasivo de arquivos ou histórico pessoal.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-white/[0.08] gap-4 text-xs font-mono text-slate-400">
              <span>Time OnFocus • Hackathon Última Hora 2026</span>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-cyan-400 text-black font-space font-bold hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] active:scale-95"
              >
                Fechar Resumo
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

