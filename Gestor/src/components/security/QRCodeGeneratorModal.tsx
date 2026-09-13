"use client";

import React, { useState, useEffect } from "react";
import { 
  QrCode, 
  ShieldCheck, 
  RotateCw, 
  Copy, 
  Check, 
  Wifi, 
  Clock, 
  Key, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  Sparkles 
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useApp } from "@/context/AppContext";
import { DynamicQRCodePayload } from "@/types";

interface QRCodeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  salaId?: string;
  aulaId?: string;
}

export const QRCodeGeneratorModal: React.FC<QRCodeGeneratorModalProps> = ({
  isOpen,
  onClose,
  salaId = "sala-101",
  aulaId = "aula-1"
}) => {
  const { salas, aulas, generateDynamicQRCode, showToast } = useApp();
  
  const [payload, setPayload] = useState<DynamicQRCodePayload | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showCryptoDetails, setShowCryptoDetails] = useState<boolean>(true);

  const selectedSala = salas.find(s => s.id === salaId) || salas[0];
  const selectedAula = aulas.find(a => a.id === aulaId) || aulas[0];

  // Generate payload when opened or rotated
  const refreshQRCode = () => {
    const newPayload = generateDynamicQRCode(selectedSala.id, selectedAula.id);
    setPayload(newPayload);
    setTimeLeft(60);
  };

  useEffect(() => {
    if (isOpen) {
      refreshQRCode();
    }
  }, [isOpen, salaId, aulaId]);

  // Countdown timer for 60s TTL rotating window
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          refreshQRCode();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, selectedSala.id, selectedAula.id]);

  const handleCopyPayload = () => {
    if (!payload) return;
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setIsCopied(true);
    showToast("Payload JSON do QR Code copiado para a área de transferência!");
    setTimeout(() => setIsCopied(false), 2500);
  };

  if (!payload) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="QR Code Dinâmico da Sala (ECDSA P-256)"
      subtitle={`Sessão criptografada para ${selectedSala.nome} • Alunos escaneiam para entrar no Launcher Protegido`}
      maxWidth="xl"
    >
      <div className="space-y-5 text-slate-700 dark:text-zinc-300">
        
        {/* Main Card: QR Visual & Room Meta */}
        <div className="flex flex-col md:flex-row items-center gap-6 p-5 bg-white/80 dark:bg-slate-950/80 rounded-xl border border-[#cbd5e1] dark:border-[#1e293b]">
          
          {/* Stylized QR Code Visualizer */}
          <div className="relative shrink-0 p-4 bg-white rounded-xl shadow-2xl border-4 border-[#0e7c93]/40 dark:border-cyan-400/40 flex flex-col items-center justify-center">
            {/* SVG Stylized QR Code Matrix */}
            <svg
              viewBox="0 0 160 160"
              className="w-44 h-44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background */}
              <rect width="160" height="160" fill="white" />

              {/* Corner Position Detection Patterns */}
              {/* Top-Left */}
              <rect x="10" y="10" width="40" height="40" rx="4" fill="#09090b" />
              <rect x="18" y="18" width="24" height="24" rx="2" fill="white" />
              <rect x="24" y="24" width="12" height="12" rx="1" fill="#0e7c93" />

              {/* Top-Right */}
              <rect x="110" y="10" width="40" height="40" rx="4" fill="#09090b" />
              <rect x="118" y="18" width="24" height="24" rx="2" fill="white" />
              <rect x="124" y="24" width="12" height="12" rx="1" fill="#0e7c93" />

              {/* Bottom-Left */}
              <rect x="10" y="110" width="40" height="40" rx="4" fill="#09090b" />
              <rect x="18" y="118" width="24" height="24" rx="2" fill="white" />
              <rect x="24" y="124" width="12" height="12" rx="1" fill="#0e7c93" />

              {/* Matrix Data Bits */}
              <g fill="#18181b">
                <rect x="60" y="12" width="6" height="6" />
                <rect x="72" y="12" width="6" height="6" />
                <rect x="88" y="12" width="6" height="6" />
                <rect x="60" y="24" width="6" height="6" />
                <rect x="76" y="24" width="6" height="6" />
                <rect x="92" y="24" width="6" height="6" />
                <rect x="64" y="36" width="6" height="6" />
                <rect x="80" y="36" width="6" height="6" />
                <rect x="60" y="44" width="6" height="6" />
                <rect x="72" y="44" width="6" height="6" />
                <rect x="88" y="44" width="6" height="6" />

                <rect x="12" y="60" width="6" height="6" />
                <rect x="24" y="60" width="6" height="6" />
                <rect x="36" y="60" width="6" height="6" />
                <rect x="48" y="60" width="6" height="6" />
                <rect x="60" y="60" width="6" height="6" />
                <rect x="72" y="60" width="6" height="6" />
                <rect x="84" y="60" width="6" height="6" />
                <rect x="96" y="60" width="6" height="6" />
                <rect x="108" y="60" width="6" height="6" />
                <rect x="120" y="60" width="6" height="6" />
                <rect x="132" y="60" width="6" height="6" />
                <rect x="144" y="60" width="6" height="6" />

                <rect x="12" y="72" width="6" height="6" />
                <rect x="28" y="72" width="6" height="6" />
                <rect x="44" y="72" width="6" height="6" />
                <rect x="60" y="72" width="6" height="6" />
                <rect x="100" y="72" width="6" height="6" />
                <rect x="116" y="72" width="6" height="6" />
                <rect x="132" y="72" width="6" height="6" />

                <rect x="12" y="84" width="6" height="6" />
                <rect x="32" y="84" width="6" height="6" />
                <rect x="48" y="84" width="6" height="6" />
                <rect x="60" y="84" width="6" height="6" />
                <rect x="80" y="84" width="6" height="6" />
                <rect x="100" y="84" width="6" height="6" />
                <rect x="120" y="84" width="6" height="6" />
                <rect x="140" y="84" width="6" height="6" />

                <rect x="12" y="96" width="6" height="6" />
                <rect x="24" y="96" width="6" height="6" />
                <rect x="40" y="96" width="6" height="6" />
                <rect x="56" y="96" width="6" height="6" />
                <rect x="72" y="96" width="6" height="6" />
                <rect x="88" y="96" width="6" height="6" />
                <rect x="104" y="96" width="6" height="6" />
                <rect x="120" y="96" width="6" height="6" />
                <rect x="136" y="96" width="6" height="6" />

                <rect x="60" y="112" width="6" height="6" />
                <rect x="76" y="112" width="6" height="6" />
                <rect x="92" y="112" width="6" height="6" />
                <rect x="108" y="112" width="6" height="6" />
                <rect x="124" y="112" width="6" height="6" />
                <rect x="140" y="112" width="6" height="6" />

                <rect x="60" y="128" width="6" height="6" />
                <rect x="80" y="128" width="6" height="6" />
                <rect x="100" y="128" width="6" height="6" />
                <rect x="120" y="128" width="6" height="6" />
                <rect x="140" y="128" width="6" height="6" />

                <rect x="60" y="144" width="6" height="6" />
                <rect x="76" y="144" width="6" height="6" />
                <rect x="96" y="144" width="6" height="6" />
                <rect x="116" y="144" width="6" height="6" />
                <rect x="136" y="144" width="6" height="6" />
              </g>

              {/* Center Protected Badge */}
              <circle cx="80" cy="80" r="14" fill="#0e7c93" />
              <path
                d="M75 79L78.5 82.5L85 76"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="mt-2 text-[10px] font-mono font-bold text-zinc-900 tracking-wider">
              ONFOCUS • P-256
            </span>
          </div>

          {/* Info & Live TTL */}
          <div className="flex-1 space-y-3 w-full">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0e7c93] dark:text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0e7c93] dark:text-cyan-400" />
                Token Dinâmico Efêmero
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/80 text-[#0e7c93] dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800/60">
                TTL: {timeLeft}s
              </span>
            </div>

            <h4 className="text-base font-bold text-slate-900 dark:text-white">{selectedSala.nome}</h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              Aula: <strong className="text-slate-800 dark:text-zinc-200">{selectedAula.disciplina}</strong> ({selectedAula.turmaNome}) • Docente: <strong className="text-slate-800 dark:text-zinc-200">{selectedAula.professor}</strong>
            </p>

            {/* TTL Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
                <span>Janela de Rotação Automática</span>
                <span className={timeLeft <= 15 ? "text-amber-600 dark:text-amber-400 font-bold" : "text-slate-700 dark:text-zinc-300"}>
                  {timeLeft} segundos restantes
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    timeLeft <= 15 ? "bg-amber-500" : "bg-[#0e7c93] dark:bg-cyan-400"
                  }`}
                  style={{ width: `${(timeLeft / 60) * 100}%` }}
                />
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={refreshQRCode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 rounded-lg border border-[#cbd5e1] dark:border-zinc-700 transition-colors shadow-sm"
              >
                <RotateCw className="w-3.5 h-3.5 text-[#0e7c93] dark:text-cyan-400" />
                <span>Rotacionar Chave Agora</span>
              </button>

              <button
                onClick={handleCopyPayload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 rounded-lg border border-[#cbd5e1] dark:border-zinc-700 transition-colors shadow-sm"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />}
                <span>{isCopied ? "Copiado!" : "Copiar Payload JSON"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Cryptographic Safeguards Section */}
        <div className="rounded-xl border border-[#cbd5e1] dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 overflow-hidden">
          <button
            onClick={() => setShowCryptoDetails(!showCryptoDetails)}
            className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-zinc-200 hover:bg-slate-100/60 dark:hover:bg-zinc-900/60 transition-colors"
          >
            <div className="flex items-center gap-2 text-[#0e7c93] dark:text-cyan-400">
              <Lock className="w-4 h-4 text-[#0e7c93] dark:text-cyan-400" />
              <span>Garantias Criptográficas & Antifraude (Replay-Attack Protection)</span>
            </div>
            {showCryptoDetails ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>

          {showCryptoDetails && (
            <div className="p-4 border-t border-[#cbd5e1] dark:border-zinc-800/80 space-y-3 font-mono text-[11px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800">
                  <span className="text-[10px] font-sans font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-0.5">
                    1. Nonce Efêmero (Anti-Replay)
                  </span>
                  <p className="text-[#0e7c93] dark:text-cyan-300 font-bold truncate">{payload.nonce}</p>
                  <span className="text-[10px] font-sans text-slate-500 dark:text-zinc-500 block mt-0.5">
                    Impede o uso duplicado do mesmo frame de QR Code capturado.
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800">
                  <span className="text-[10px] font-sans font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-0.5">
                    2. Hash BSSID Institucional (Proximidade)
                  </span>
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold truncate">{payload.schoolBssidHash}</p>
                  <span className="text-[10px] font-sans text-slate-500 dark:text-zinc-500 block mt-0.5">
                    Garante presença física sob o ponto de acesso Wi-Fi da escola.
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800">
                  <span className="text-[10px] font-sans font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-0.5">
                    3. Timestamp + TTL (Expiração)
                  </span>
                  <p className="text-amber-600 dark:text-amber-300 font-bold">
                    {payload.timestamp} ({new Date(payload.timestamp * 1000).toLocaleTimeString()}) • TTL 60s
                  </p>
                  <span className="text-[10px] font-sans text-slate-500 dark:text-zinc-500 block mt-0.5">
                    Invalida o código após término da janela de 60 segundos.
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800">
                  <span className="text-[10px] font-sans font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-0.5">
                    4. Assinatura Digital ECDSA P-256
                  </span>
                  <p className="text-[#0e7c93] dark:text-cyan-300 font-bold truncate">{payload.signature}</p>
                  <span className="text-[10px] font-sans text-slate-500 dark:text-zinc-500 block mt-0.5">
                    Autenticidade matematicamente verificável pela chave pública da instituição.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Conforme às normas de segurança da informação e LGPD.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0e7c93] hover:bg-[#0b6376] dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-md shadow-cyan-500/20"
          >
            Concluir & Fixar QR
          </button>
        </div>

      </div>
    </Modal>
  );
};
