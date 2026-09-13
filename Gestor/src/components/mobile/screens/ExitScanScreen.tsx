import React, { useEffect, useRef, useState } from "react";
import type { MobileResponse } from "@/types";
import { Footer } from "../Footer";
import { QrCodeArt } from "../QrCodeArt";

export function ExitScanScreen({
  data,
  onExitValidated,
  onCancel,
}: {
  data: MobileResponse | null;
  onExitValidated: () => void;
  onCancel: () => void;
}) {
  const sala = data?.sala;
  const [scanning, setScanning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleValidate = () => {
    if (scanning) return;
    setScanning(true);
    // Simula o tempo de leitura do QR Code antes de encerrar a sessão
    timer.current = setTimeout(() => {
      onExitValidated();
    }, 1600);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <div className="min-h-full w-full max-w-xs mx-auto flex flex-col items-center justify-center px-6 py-4">
          <p className="text-[11px] uppercase tracking-widest text-amber-400 font-mono font-semibold">
            ENCERRANDO SESSÃO
          </p>
          <h1 className="text-white text-xl font-bold mt-1">Confirme sua saída</h1>
          <p className="text-slate-400 text-[13px] mt-1.5 leading-snug text-center">
            {scanning
              ? `Validando saída da ${sala?.nome || "Sala 302"}. Aguarde a confirmação.`
              : "Escaneie o QR Code da sala para validar o encerramento do Modo Aula no seu dispositivo."}
          </p>

          {/* Leitor de QR Code */}
          <div className="relative w-32 h-32 mt-5 shrink-0" aria-hidden="true">
            <div className="absolute inset-0 rounded-[1.4rem] border-2 border-amber-400/70 animate-qr-ring" />
            <div className="absolute inset-2 rounded-[1.1rem] bg-amber-500/20 blur-xl" />
            <div className="relative w-full h-full rounded-[1.1rem] bg-white p-2 shadow-lg shadow-blue-950/50">
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <QrCodeArt />
                <div className="absolute left-1 right-1 h-0.5 bg-amber-500 rounded-full shadow-[0_0_12px_3px_rgba(245,158,11,0.9)] animate-qr-scan-line" />
              </div>
              <span className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-tl-xl border-t-4 border-l-4 border-amber-400" />
              <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-tr-xl border-t-4 border-r-4 border-amber-400" />
              <span className="absolute -bottom-1.5 -left-1.5 w-6 h-6 rounded-bl-xl border-b-4 border-l-4 border-amber-400" />
              <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-br-xl border-b-4 border-r-4 border-amber-400" />
            </div>
          </div>

          <button
            type="button"
            onClick={handleValidate}
            disabled={scanning}
            className={`mt-5 w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-[15px] font-semibold text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 disabled:cursor-wait ${
              scanning ? "bg-amber-500 animate-qr-reading" : "bg-amber-500 hover:bg-amber-400 active:bg-amber-600"
            }`}
          >
            {scanning ? (
              <>
                <span className="w-5 h-5 border-[3px] border-white/40 border-t-white rounded-full animate-spin" />
                Validando saída…
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <path d="M14 14h3v3h-3zM21 14v.01M14 21v.01M18 18h3v3h-3z" />
                </svg>
                Validar saída com QR Code
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={scanning}
            className="mt-2.5 text-[13px] font-medium text-slate-400 hover:text-white active:text-white rounded-lg px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 disabled:opacity-40"
          >
            Cancelar e voltar ao launcher
          </button>

          <div className="w-full mt-3">
            <div className="bg-white rounded-xl p-3.5 shadow-sm">
              <div className="flex items-start gap-2.5">
                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${scanning ? "bg-amber-500 animate-pulse" : "bg-blue-500"}`} />
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-slate-500 font-mono">
                    STATUS DO SISTEMA
                  </p>
                  <p className="text-[13px] text-slate-700 mt-0.5 leading-snug">
                    {scanning
                      ? "Validação de saída em andamento. Não saia desta tela até a confirmação."
                      : "Aguardando leitura do QR Code para registrar sua saída da aula."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full shrink-0">
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono px-6 py-2 border-t border-slate-800">
          <span>ID DA SALA: {sala?.nfcTagId || "SALA-302"}</span>
          <span>V 1.8.2-BETA</span>
        </div>
        <Footer />
      </div>
    </div>
  );
}
