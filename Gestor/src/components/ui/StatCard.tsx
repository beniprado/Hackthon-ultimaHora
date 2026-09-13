"use client";

import React from "react";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  comparison?: string;
  isPositive?: boolean | null; // true: green/blue pill, false: red pill, null: neutral
  icon?: LucideIcon;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  comparison,
  isPositive,
  icon: Icon,
  className
}) => {
  return (
    <div className={clsx("bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 rounded-xl p-5 shadow-lg shadow-black/20 hover:border-violet-500/40 transition-all", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">{title}</p>
          <p className="text-2xl lg:text-3xl font-bold text-zinc-100 mt-2 tracking-tight">{value}</p>
        </div>
        {Icon && (
          <div className="p-2.5 rounded-lg bg-violet-950/60 border border-violet-800/40 text-violet-400 shadow-sm">
            <Icon className="w-5 h-5 stroke-[2]" />
          </div>
        )}
      </div>
      
      {comparison && (
        <div className="mt-4 flex items-center gap-2">
          <span className={clsx(
            "text-[11px] font-semibold px-2 py-0.5 rounded-md border",
            isPositive === true ? "bg-emerald-950/50 text-emerald-400 border-emerald-800/40" :
            isPositive === false ? "bg-amber-950/50 text-amber-400 border-amber-800/40" :
            "bg-zinc-800/80 text-zinc-400 border-zinc-700"
          )}>
            {comparison.split(" vs.")[0]}
          </span>
          <span className="text-[11px] text-zinc-500">
            {comparison.includes("vs.") ? "vs." + comparison.split("vs.")[1] : ""}
          </span>
        </div>
      )}
    </div>
  );
};
