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

  let colorClasses = "bg-slate-100 text-slate-700 border-slate-200";
  let dotColor = "bg-slate-400";

  // Blue / Primary - Active / Live
  if (["AO VIVO", "ATIVO", "ATIVA", "AULA ATIVA", "WHITELIST ATIVA"].includes(norm)) {
    colorClasses = "bg-blue-50 text-[#1683D8] border-blue-200 font-semibold";
    dotColor = "bg-[#1683D8]";
  }
  // Green - Connected / Normal / Success
  else if (["CONECTADO", "NORMAL", "SUCESSO", "DISPONÍVEL", "DISPONIVEL", "VÁLIDA", "VALIDA"].includes(norm)) {
    colorClasses = "bg-emerald-50 text-emerald-700 border-emerald-200";
    dotColor = "bg-emerald-500";
  }
  // Yellow/Amber - Idle / Attention / Pending
  else if (["OCIOSO", "OCIOSA", "ATENÇÃO", "ATENCAO", "PENDENTE"].includes(norm)) {
    colorClasses = "bg-amber-50 text-amber-700 border-amber-200";
    dotColor = "bg-amber-500";
  }
  // Red - Alert / Blocked / Error
  else if (["ALERTA", "BLOQUEADO", "ACESSO RESTRITO", "ERRO", "REVOGADA", "BATERIA CRÍTICA", "CRÍTICO"].includes(norm)) {
    colorClasses = "bg-rose-50 text-rose-700 border-rose-200 font-medium";
    dotColor = "bg-rose-500";
  }
  // Gray - Scheduled / Finished / Offline / Disconnected
  else if (["AGENDADA", "AGENDADO", "FINALIZADA", "FINALIZADO", "DESCONECTADO", "INATIVO", "OFFLINE"].includes(norm)) {
    colorClasses = "bg-gray-100 text-gray-600 border-gray-200";
    dotColor = "bg-gray-400";
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
