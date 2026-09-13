"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, Lock, Mail } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { UserRole } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const { setUserRole, showToast } = useApp();
  const [email, setEmail] = useState("ricardo.silva@colegiomodelo.edu.br");
  const [password, setPassword] = useState("••••••••");

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    showToast("Login realizado como " + role + "!");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#0a0f1e] text-slate-900 dark:text-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#e0f7fb] dark:bg-[#132234] border border-[#cbd5e1] dark:border-[#1e293b] rounded-2xl p-8 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#0e7c93] dark:bg-cyan-500 text-white dark:text-slate-950 mx-auto flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-3">
            <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-zinc-100 tracking-tight">OnFocus Gestor</h1>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">Plataforma de Gestão Pedagógica e Foco Digital Ativo</p>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-800 dark:text-zinc-300 mb-1">E-mail Institucional</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-slate-900 dark:text-zinc-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 dark:text-zinc-300 mb-1">Senha</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-slate-900 dark:text-zinc-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleLogin("GESTOR")}
            className="w-full py-2.5 bg-[#0e7c93] hover:bg-[#0b6376] dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold rounded-lg shadow-md shadow-[#0e7c93]/20 dark:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 mt-2 active:scale-95"
          >
            <span>Acessar Painel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Profile Switcher for MVP demonstration */}
        <div className="mt-8 pt-6 border-t border-[#cbd5e1] dark:border-zinc-800/80">
          <p className="text-[11px] font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-wider text-center mb-3">
            Acesso Rápido para Demonstração do MVP:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleLogin("GESTOR")}
              className="p-2 bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-xs font-bold text-slate-700 dark:text-zinc-300 hover:text-[#0e7c93] dark:hover:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-zinc-800 hover:border-cyan-500/40 transition-colors"
            >
              🎓 Gestor (Ricardo)
            </button>
            <button
              onClick={() => handleLogin("PROFESSOR")}
              className="p-2 bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-xs font-bold text-slate-700 dark:text-zinc-300 hover:text-[#0e7c93] dark:hover:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-zinc-800 hover:border-cyan-500/40 transition-colors"
            >
              👩‍🏫 Professor (Ana)
            </button>
            <button
              onClick={() => handleLogin("ADMIN")}
              className="p-2 bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-xs font-bold text-slate-700 dark:text-zinc-300 hover:text-[#0e7c93] dark:hover:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-zinc-800 hover:border-cyan-500/40 transition-colors"
            >
              ⚙️ Administrador
            </button>
            <button
              onClick={() => handleLogin("SUPORTE")}
              className="p-2 bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-xs font-bold text-slate-700 dark:text-zinc-300 hover:text-[#0e7c93] dark:hover:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-zinc-800 hover:border-cyan-500/40 transition-colors"
            >
              🛠️ Suporte Técnico
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
