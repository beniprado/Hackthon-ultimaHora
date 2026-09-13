import React from "react";
import type { MobileResponse } from "@/types";
import { Footer } from "../Footer";
import { BackButton } from "../BackButton";
import { AppSimulation } from "./AppSimulations";

export function AppScreen({ data, appId, onBack, onFinish }: { data: MobileResponse | null; appId: string; onBack: () => void; onFinish: () => void }) {
  const app = data?.appsAutorizados.find((a) => a.id === appId);

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white overflow-hidden">
      <div className="bg-zinc-900 text-white px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-[11px] uppercase tracking-wide font-mono">SEGURANÇA ATIVA</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="text-[11px]">App autorizado nesta aula</span>
        </div>
      </div>

      <div className="flex items-center gap-1 pl-1 pr-3 py-1.5 border-b border-zinc-200 shrink-0 bg-white">
        <BackButton onClick={onBack} label="Apps" />
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-violet-600 text-white flex items-center justify-center text-base font-bold shrink-0">
            {(app?.nome || "A").charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-zinc-900 text-[15px] truncate">{app?.nome || "Aplicativo"}</p>
            <p className="text-xs text-zinc-500 truncate">{app?.categoria || ""}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5 text-zinc-500 shrink-0">
          <button type="button" aria-label="Buscar" className="p-2 rounded-lg hover:bg-zinc-100 active:bg-zinc-200 transition-colors"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg></button>
          <button type="button" aria-label="Menu" className="p-2 rounded-lg hover:bg-zinc-100 active:bg-zinc-200 transition-colors"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h7" /></svg></button>
        </div>
      </div>

      <AppSimulation appId={appId} appName={app?.nome || "Aplicativo"} subtexto={app?.subtexto || ""} />

      <Footer onExit={onFinish} />
    </div>
  );
}
