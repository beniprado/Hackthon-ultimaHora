"use client";

import React from "react";
import clsx from "clsx";

export type BadgeVariant = 
  | "AO VIVO" 
  | "Ao vivo" 
  | "Ativo" 
  | "Ativa" 
  | "Conectado" 
  | "Normal" 
  | "Sucesso"
  | "Ocioso" 
  | "OCIOSA" 
  | "Ociosa"
  | "Atenção" 
  | "Pendente" 
  | "ALERTA" 
  | "Alerta" 
  | "Bloqueado" 
  | "Agendada" 
  | "Finalizada" 
  | "Desconectado" 
  | "Inativo"
  | "Revogada"
  | "Aula ativa"
  | "Disponível"
  | "Offline";

interface StatusBadgeProps {
  status: string;
  className?: string;
  size?: "sm" | "md";
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  className,
  size = "md",
  showDot = false
}) => {
  const norm = status.trim().toUpperCase();

  let colorClasses = "bg-zinc-800/80 text-zinc-400 border-zinc-700";
  let dotColor = "bg-zinc-400";

  // Electric Purple / Violet - Platform identity, Whitelist & Cryptographic status
  if (["WHITELIST ATIVA", "ASSINADO", "ECDSA VÁLIDA", "CRIPTOGRAFADO", "SINCRONIZADO"].includes(norm)) {
    colorClasses = "bg-violet-950/60 text-violet-300 border-violet-800/60 font-semibold";
    dotColor = "bg-violet-400";
  }
  // Emerald - Active authorized apps in focus, connected, active class
  else if (["AO VIVO", "ATIVO", "ATIVA", "AULA ATIVA", "CONECTADO", "NORMAL", "SUCESSO", "DISPONÍVEL", "DISPONIVEL", "VÁLIDA", "VALIDA"].includes(norm)) {
    colorClasses = "bg-emerald-950/50 text-emerald-400 border-emerald-800/50 font-semibold";
    dotColor = "bg-emerald-400";
  }
  // Tangerine / Amber / Orange - Inactivity alerts, divergence, idle
  else if (["OCIOSO", "OCIOSA", "ATENÇÃO", "ATENCAO", "PENDENTE", "DIVERGÊNCIA", "DIVERGENCIA", "FOCO PARCIAL"].includes(norm)) {
    colorClasses = "bg-amber-950/50 text-amber-400 border-amber-800/50 font-medium";
    dotColor = "bg-amber-400";
  }
  // Orange / Rose - Critical Alerts, Blocked, Interceptions
  else if (["ALERTA", "BLOQUEADO", "ACESSO RESTRITO", "ERRO", "REVOGADA", "BATERIA CRÍTICA", "CRÍTICO"].includes(norm)) {
    colorClasses = "bg-orange-950/60 text-orange-300 border-orange-800/60 font-semibold";
    dotColor = "bg-orange-400";
  }
  // Zinc / Neutral - Scheduled / Finished / Offline
  else if (["AGENDADA", "AGENDADO", "FINALIZADA", "FINALIZADO", "DESCONECTADO", "INATIVO", "OFFLINE"].includes(norm)) {
    colorClasses = "bg-zinc-800/80 text-zinc-400 border-zinc-700";
    dotColor = "bg-zinc-500";
  }

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 border rounded-full font-medium tracking-wide uppercase transition-colors",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-xs",
        colorClasses,
        className
      )}
    >
      {showDot && <span className={clsx("w-1.5 h-1.5 rounded-full animate-pulse", dotColor)} />}
      {status}
    </span>
  );
};
