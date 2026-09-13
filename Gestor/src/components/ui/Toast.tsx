"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { CheckCircle2, X } from "lucide-react";

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#e0f7fb] dark:bg-[#132234] text-slate-900 dark:text-white px-4 py-3 rounded-xl shadow-2xl shadow-slate-900/20 dark:shadow-black/80 border border-[#cbd5e1] dark:border-[#1e293b] backdrop-blur-md animate-in fade-in slide-in-from-bottom-5 duration-200 max-w-md">
      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
      <p className="text-sm font-medium leading-tight">{toastMessage}</p>
    </div>
  );
};
