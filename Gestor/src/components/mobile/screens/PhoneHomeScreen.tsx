import React, { useEffect, useState } from "react";

/* Ícones genéricos de sistema (só visuais, sem relação com o OnFocus). */

function SysIcon({ label, bg, children }: { label: string; bg: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-1 rounded-2xl py-1 transition-transform active:scale-90 focus:outline-none"
    >
      <span className={`w-12 h-12 rounded-[14px] ${bg} flex items-center justify-center text-white shadow-md`}>
        {children}
      </span>
      <span className="text-[10px] text-white font-medium drop-shadow">{label}</span>
    </button>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function PhoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
  );
}

function MessagesIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
  );
}

function CameraIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
  );
}

function PhotosIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="9" cy="9" r="2" /><path d="m21 15-5-5L5 21" /></svg>
  );
}

function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
  );
}

function BrowserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
  );
}

function MusicIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
  );
}

/**
 * Tela inicial do celular — demonstra que o aluno saiu TOTALMENTE do OnFocus:
 * papel de parede, relógio e ícones comuns, sem nenhum elemento do aplicativo
 * (sem TopBar, sem rodapé "OnFocus Protegido", sem travas).
 * O app segue apenas instalado: o ícone "OnFocus" reabre a leitura do QR Code.
 */
export function PhoneHomeScreen({ onOpenOnFocus }: { onOpenOnFocus: () => void }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-hidden relative bg-zinc-900">
      {/* Papel de parede */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-600 via-violet-500 to-orange-300" aria-hidden="true" />
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/20 blur-3xl" aria-hidden="true" />
      <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full bg-pink-300/40 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-24 -left-24 w-72 h-72 rounded-full bg-violet-900/40 blur-3xl" aria-hidden="true" />

      <div className="relative flex-1 min-h-0 flex flex-col px-5 pt-[max(0.6rem,env(safe-area-inset-top))]">
        {/* Barra de status do sistema */}
        <div className="flex items-center justify-between text-white shrink-0">
          <span className="text-[13px] font-semibold tabular-nums pl-2">{time}</span>
          <span className="flex items-center gap-1.5 pr-1" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2 17h4v4H2zM8 13h4v8H8zM14 9h4v12h-4zM20 5h4v16h-4z" opacity=".9" /></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12.55a11 11 0 0 1 14.08 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" /></svg>
            <span className="text-[11px] font-medium">85%</span>
            <svg width="22" height="16" viewBox="0 0 28 14" fill="none" stroke="currentColor"><rect x="1" y="1.5" width="22" height="11" rx="3" strokeWidth="1.5" /><rect x="3" y="3.5" width="15" height="7" rx="1.5" fill="currentColor" stroke="none" /><path d="M25.5 5v4" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </span>
        </div>

        {/* Relógio */}
        <div className="text-center mt-6 shrink-0">
          <p className="text-white font-extralight tabular-nums leading-none text-[64px] drop-shadow-lg">{time}</p>
          <p className="text-white/90 text-sm mt-1 capitalize drop-shadow">{date}</p>
        </div>

        <div className="flex-1 min-h-0" />

        {/* Grade de apps do sistema */}
        <div className="grid grid-cols-4 gap-y-3 shrink-0">
          <SysIcon label="Telefone" bg="bg-green-500"><PhoneIcon /></SysIcon>
          <SysIcon label="Mensagens" bg="bg-emerald-400"><MessagesIcon /></SysIcon>
          <SysIcon label="Câmera" bg="bg-zinc-500"><CameraIcon /></SysIcon>
          <SysIcon label="Fotos" bg="bg-sky-400"><PhotosIcon /></SysIcon>
          <SysIcon label="Relógio" bg="bg-zinc-800"><ClockIcon /></SysIcon>
          <SysIcon label="Navegador" bg="bg-violet-500"><BrowserIcon /></SysIcon>
          <SysIcon label="Música" bg="bg-rose-500"><MusicIcon /></SysIcon>
          <SysIcon label="Ajustes" bg="bg-zinc-400"><SettingsIcon /></SysIcon>
        </div>

        {/* App instalado: reabre a leitura do QR Code */}
        <div className="mt-3 shrink-0">
          <button
            type="button"
            onClick={onOpenOnFocus}
            className="w-full flex items-center gap-3 rounded-2xl bg-white/25 backdrop-blur-md px-3 py-2.5 text-left transition-transform active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <span className="w-12 h-12 rounded-[14px] bg-violet-600 flex items-center justify-center text-white shadow-md shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-white text-sm font-semibold drop-shadow">OnFocus</span>
              <span className="block text-white/80 text-[11px] drop-shadow">Toque para entrar na sala</span>
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".9"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        {/* Dock */}
        <div className="mt-3 mb-1.5 rounded-3xl bg-white/25 backdrop-blur-md px-4 py-2.5 grid grid-cols-4 shrink-0">
          <SysIcon label="" bg="bg-green-500"><PhoneIcon /></SysIcon>
          <SysIcon label="" bg="bg-violet-500"><BrowserIcon /></SysIcon>
          <SysIcon label="" bg="bg-emerald-400"><MessagesIcon /></SysIcon>
          <SysIcon label="" bg="bg-zinc-500"><CameraIcon /></SysIcon>
        </div>

        {/* Indicador home */}
        <div className="pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1 flex justify-center shrink-0" aria-hidden="true">
          <span className="w-32 h-1 rounded-full bg-white/90" />
        </div>
      </div>
    </div>
  );
}
