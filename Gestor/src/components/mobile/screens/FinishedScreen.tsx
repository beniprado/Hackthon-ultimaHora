import React from "react";
import type { MobileResponse } from "@/types";
import { Footer } from "../Footer";

export function FinishedScreen({ data, onReturnHome }: { data: MobileResponse | null; onReturnHome: () => void }) {
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <div className="px-6 pt-6 pb-5 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-cyan-50 flex items-center justify-center mb-3 relative">
            <div className="w-20 h-20 rounded-full bg-white border-2 border-[#0e7c93] flex items-center justify-center">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#0e7c93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-[#0e7c93] flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0e7c93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
          </div>

          <h1 className="text-xl font-bold text-zinc-900">Aula finalizada</h1>
          <p className="text-[13px] text-zinc-500 mt-1.5 max-w-xs mx-auto leading-snug">
            O OnFocus foi encerrado com sucesso. Todas as funcionalidades do seu aparelho foram restauradas.
          </p>

          <div className="mt-4 bg-zinc-50 rounded-xl p-3.5 text-left space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-zinc-600 shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-zinc-500 font-mono">STATUS ATUAL</p>
                <p className="text-sm font-semibold text-zinc-800">Dispositivo Desbloqueado</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-zinc-600 shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-zinc-500 font-mono">ACESSO</p>
                <p className="text-sm font-semibold text-zinc-800">Uso normal permitido</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onReturnHome}
            className="mt-5 w-full max-w-xs mx-auto block bg-[#0e7c93] hover:bg-[#0b6376] active:bg-[#084c5b] text-white font-medium py-3 px-4 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <span className="flex items-center justify-center gap-2">
              Retornar ao Início
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </span>
          </button>

          <p className="text-xs text-zinc-400 mt-3">Sua sessão durou aproximadamente 50 minutos.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
