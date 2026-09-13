import React from "react";
import type { MobileResponse } from "@/types";
import { Footer } from "../Footer";
import { AppRow } from "../AppRow";

export function ActiveScreen({
  data,
  onOpenApp,
  onFinish,
}: {
  data: MobileResponse | null;
  onOpenApp: (id: string) => void;
  onFinish: () => void;
}) {
  const aula = data?.aula;
  const apps = data?.appsAutorizados || [];

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <div className="px-6 pt-5 pb-5 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-violet-50 flex items-center justify-center mb-3">
            <div className="relative w-14 h-14 rounded-full bg-white border-2 border-violet-600 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-white">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-xl font-bold text-zinc-900">OnFocus Ativado</h1>
          <p className="text-[13px] text-zinc-500 mt-1.5 max-w-xs mx-auto leading-snug">
            Apenas apps autorizados estão permitidos para garantir seu foco total no aprendizado.
          </p>

          <div className="mt-4 bg-zinc-50 rounded-xl p-3.5 text-left">
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-500 mt-1.5 shrink-0" />
              <p className="text-[13px] text-zinc-700 leading-snug">
                <span className="font-semibold">Sessão Ativa:</span> {aula?.sala || "Sala 104"} • {aula?.disciplina || "Matemática Avançada"} • {aula?.professor || "Prof. Roberto"}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-2 flex items-center justify-between">
          <h2 className="text-[11px] uppercase tracking-widest text-zinc-500 font-mono">APLICATIVOS AUTORIZADOS</h2>
          <span className="text-[11px] text-zinc-400 font-mono">{apps.length} APPS</span>
        </div>

        <div className="px-4 pb-4">
          {apps.map((app) => (
            <AppRow key={app.id} app={app} onClick={() => onOpenApp(app.id)} />
          ))}
          <p className="text-[11px] text-zinc-400 text-center mt-3 px-4 leading-snug">
            Outros aplicativos serão bloqueados automaticamente até o fim da aula ou nova leitura do QR Code.
          </p>
        </div>
      </div>

      <Footer onExit={onFinish} />
    </div>
  );
}
