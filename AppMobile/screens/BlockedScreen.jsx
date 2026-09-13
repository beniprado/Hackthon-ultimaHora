import React from "react";
import { Footer } from "../components/Footer";

export function BlockedScreen({ data, appId, onBack }) {
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <div className="px-6 pt-6 pb-5 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-zinc-100 flex items-center justify-center mb-3 relative">
            <div className="w-20 h-20 rounded-full bg-zinc-50 flex items-center justify-center">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#A1A1AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          <p className="text-[11px] uppercase tracking-widest text-red-600 font-mono font-semibold">ACESSO RESTRITO</p>
          <h1 className="text-xl font-bold text-zinc-900 mt-1.5 leading-snug">Este aplicativo não é permitido nesta aula.</h1>
          <p className="text-[13px] text-zinc-500 mt-2 max-w-xs mx-auto leading-snug">
            O seu dispositivo está configurado para o <span className="font-semibold">OnFocus</span>. Durante este período, apenas ferramentas educacionais autorizadas podem ser acessadas.
          </p>

          <button
            type="button"
            onClick={onBack}
            className="mt-5 w-full max-w-xs mx-auto block bg-[#0e7c93] hover:bg-[#0b6376] active:bg-[#084c5b] text-white font-medium py-3 px-4 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <span className="flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Voltar para o Launcher
            </span>
          </button>

          <p className="text-xs text-zinc-400 mt-3">Seu progresso escolar é prioridade agora.</p>
        </div>

        <div className="px-6 pb-4">
          <div className="bg-zinc-50 rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-zinc-600 shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-zinc-500 font-mono">STATUS DO SISTEMA</p>
              <p className="text-sm font-semibold text-zinc-800">Bloqueio Ativo: {data?.sala?.nome || "Sala 302"}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
