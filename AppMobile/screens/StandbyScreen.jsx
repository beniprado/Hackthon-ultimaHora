import React, { useEffect, useRef, useState } from "react";
import { Footer } from "../components/Footer";
import { QrCodeArt } from "../components/QrCodeArt";

export function StandbyScreen({ data, onQrScanned }) {
  const sala = data?.sala;
  const [scanning, setScanning] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleScan = () => {
    if (scanning) return;
    setScanning(true);
    // Simula o tempo de leitura do QR Code antes de liberar a próxima tela
    timer.current = setTimeout(() => {
      onQrScanned();
    }, 1600);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <div className="min-h-full w-full max-w-xs mx-auto flex flex-col items-center justify-center px-6 py-4">
          <div className="text-center">
            <div className="text-[11px] uppercase tracking-widest text-zinc-500 font-mono">
              HORÁRIO DE BRASÍLIA
            </div>
            <div className="text-4xl font-bold text-white mt-1 font-mono tabular-nums">
              {new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
            </div>
            <div className="text-xs text-zinc-400 mt-1 font-mono capitalize">
              {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
            </div>
          </div>

          {/* Leitor de QR Code */}
          <div className="relative w-40 h-40 mt-5 shrink-0" aria-hidden="true">
            <div className="absolute inset-0 rounded-[1.75rem] border-2 border-cyan-400/70 animate-qr-ring" />
            <div className="absolute inset-2 rounded-[1.4rem] bg-cyan-500/25 blur-xl" />
            <div className="relative w-full h-full rounded-[1.4rem] bg-white p-2.5 shadow-lg shadow-cyan-950/50">
              <div className="relative w-full h-full overflow-hidden rounded-lg">
                <QrCodeArt />
                <div className="absolute left-1 right-1 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_12px_3px_rgba(34,211,238,0.9)] animate-qr-scan-line" />
              </div>
              <span className="absolute -top-1.5 -left-1.5 w-7 h-7 rounded-tl-2xl border-t-4 border-l-4 border-cyan-500" />
              <span className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-tr-2xl border-t-4 border-r-4 border-cyan-500" />
              <span className="absolute -bottom-1.5 -left-1.5 w-7 h-7 rounded-bl-2xl border-b-4 border-l-4 border-cyan-500" />
              <span className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-br-2xl border-b-4 border-r-4 border-cyan-500" />
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-white text-base font-semibold">
              {scanning ? "Lendo QR Code…" : "Escaneie o QR Code"}
            </p>
            <p className="text-zinc-400 text-[13px] mt-1 leading-snug">
              {scanning
                ? `Validando acesso à ${sala?.nome || "Sala 101"}. Aguarde a confirmação.`
                : "Aponte a câmera para o QR Code fixado na entrada da sala para ativar o OnFocus."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleScan}
            disabled={scanning}
            className={`mt-4 w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-[15px] font-semibold text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:cursor-wait ${
              scanning ? "bg-cyan-500 animate-qr-reading" : "bg-[#0e7c93] hover:bg-[#0b6376] active:bg-[#084c5b]"
            }`}
          >
            {scanning ? (
              <>
                <span className="w-5 h-5 border-[3px] border-white/40 border-t-white rounded-full animate-spin" />
                Lendo QR Code…
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <path d="M14 14h3v3h-3zM21 14v.01M14 21v.01M18 18h3v3h-3z" />
                </svg>
                Acessar com QR Code
              </>
            )}
          </button>

          <div className="w-full mt-4">
            <div className="bg-white rounded-xl p-3.5 shadow-sm">
              <div className="flex items-start gap-2.5">
                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${scanning ? "bg-amber-500 animate-pulse" : "bg-cyan-500"}`} />
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-zinc-500 font-mono">
                    STATUS DO SISTEMA
                  </p>
                  <p className="text-[13px] text-zinc-700 mt-0.5 leading-snug">
                    {scanning
                      ? "Conexão segura com a sala em andamento. Não saia desta tela até a confirmação."
                      : "Aguardando leitura do QR Code da sala de aula. Não saia desta tela até a confirmação."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full shrink-0">
        <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono px-6 py-2 border-t border-zinc-800">
          <span>ID DA SALA: {sala?.nfcTagId || "SALA-101"}</span>
          <span>V 1.8.2-BETA</span>
        </div>
        <Footer />
      </div>
    </div>
  );
}
