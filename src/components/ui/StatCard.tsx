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
    <div className={clsx("bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 tracking-wider uppercase">{title}</p>
          <p className="text-2xl lg:text-3xl font-bold text-slate-900 mt-2">{value}</p>
        </div>
        {Icon && (
          <div className="p-2.5 rounded-lg bg-blue-50 text-[#1683D8]">
            <Icon className="w-5 h-5 stroke-[2]" />
          </div>
        )}
      </div>
      
      {comparison && (
        <div className="mt-4 flex items-center gap-2">
          <span className={clsx(
            "text-[11px] font-semibold px-2 py-0.5 rounded-md",
            isPositive === true ? "bg-blue-50 text-[#1683D8]" :
            isPositive === false ? "bg-amber-50 text-amber-700" :
            "bg-slate-100 text-slate-600"
          )}>
            {comparison.split(" vs.")[0]}
          </span>
          <span className="text-[11px] text-slate-400">
            {comparison.includes("vs.") ? "vs." + comparison.split("vs.")[1] : ""}
          </span>
        </div>
      )}
    </div>
  );
};
