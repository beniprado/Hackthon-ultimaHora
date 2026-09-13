import React from "react";

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  /** "dark" = sobre fundo escuro | "light" = sobre fundo claro */
  tone?: "dark" | "light";
  className?: string;
}

export function BackButton({ onClick, label = "Voltar", tone = "light", className = "" }: BackButtonProps) {
  const tones =
    tone === "dark"
      ? "text-zinc-300 hover:text-white hover:bg-white/10 active:bg-white/15"
      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 active:bg-zinc-200";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${tones} ${className}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>
      <span>{label}</span>
    </button>
  );
}
