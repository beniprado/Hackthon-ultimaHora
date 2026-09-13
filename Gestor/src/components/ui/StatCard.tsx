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
    <div className={clsx("bg-[#e0f7fb] dark:bg-[#132234] backdrop-blur-md border border-[#cbd5e1] dark:border-[#1e293b] rounded-xl p-5 shadow-lg shadow-slate-900/5 dark:shadow-black/20 hover:border-cyan-500/40 transition-all", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">{title}</p>
          <p className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mt-2 tracking-tight">{value}</p>
        </div>
        {Icon && (
          <div className="p-2.5 rounded-lg bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-800/40 text-[#0e7c93] dark:text-cyan-400 shadow-sm">
            <Icon className="w-5 h-5 stroke-[2]" />
          </div>
        )}
      </div>
      
      {comparison && (
        <div className="mt-4 flex items-center gap-2">
          <span className={clsx(
            "text-[11px] font-semibold px-2 py-0.5 rounded-md border",
            isPositive === true ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800/40" :
            isPositive === false ? "bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-400 border-amber-300 dark:border-amber-800/40" :
            "bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-400 border-slate-300 dark:border-slate-700"
          )}>
            {comparison.split(" vs.")[0]}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            {comparison.includes("vs.") ? "vs." + comparison.split("vs.")[1] : ""}
          </span>
        </div>
      )}
    </div>
  );
};
