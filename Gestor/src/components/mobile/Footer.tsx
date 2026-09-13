import React from "react";

export function Footer({ onExit }: { onExit?: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white border-t border-slate-200 shrink-0">
      <div className="flex items-center gap-2 text-slate-500">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        <span className="text-sm">Modo Aula Protegido</span>
      </div>
      {onExit ? (
        <button
          type="button"
          onClick={onExit}
          className="flex items-center gap-1 text-blue-600 text-sm font-medium rounded-lg px-2 py-1.5 hover:bg-blue-50 active:bg-blue-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
          Encerrar
        </button>
      ) : (
        <span className="flex items-center gap-1 text-slate-300 text-sm font-medium select-none" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
          Encerrar
        </span>
      )}
    </div>
  );
}
