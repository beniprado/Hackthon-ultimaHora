"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { CheckCircle2, X } from "lucide-react";

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl border border-slate-800 animate-in fade-in slide-in-from-bottom-5 duration-200 max-w-md">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
      <p className="text-sm font-medium leading-tight">{toastMessage}</p>
    </div>
  );
};
