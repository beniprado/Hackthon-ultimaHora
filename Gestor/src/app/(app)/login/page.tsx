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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-8 shadow-2xl shadow-black/80 backdrop-blur-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-violet-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-violet-600/30 mb-3">
            <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-black text-zinc-100 tracking-tight">OnFocus Gestor</h1>
          <p className="text-xs text-zinc-400 mt-1">Plataforma de Gestão Pedagógica e Foco Digital Ativo</p>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-zinc-300 mb-1">E-mail Institucional</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-zinc-950/80 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-zinc-300 mb-1">Senha</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-zinc-950/80 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleLogin("GESTOR")}
            className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-lg shadow-md shadow-violet-600/20 border border-violet-500/30 transition-all flex items-center justify-center gap-2 mt-2 active:scale-95"
          >
            <span>Acessar Painel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Profile Switcher for MVP demonstration */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider text-center mb-3">
            Acesso Rápido para Demonstração do MVP:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleLogin("GESTOR")}
              className="p-2 bg-zinc-950/80 border border-zinc-800 rounded-lg text-xs font-bold text-zinc-300 hover:text-violet-300 hover:bg-zinc-800 hover:border-violet-500/40 transition-colors"
            >
              🎓 Gestor (Ricardo)
            </button>
            <button
              onClick={() => handleLogin("PROFESSOR")}
              className="p-2 bg-zinc-950/80 border border-zinc-800 rounded-lg text-xs font-bold text-zinc-300 hover:text-violet-300 hover:bg-zinc-800 hover:border-violet-500/40 transition-colors"
            >
              👩‍🏫 Professor (Ana)
            </button>
            <button
              onClick={() => handleLogin("ADMIN")}
              className="p-2 bg-zinc-950/80 border border-zinc-800 rounded-lg text-xs font-bold text-zinc-300 hover:text-violet-300 hover:bg-zinc-800 hover:border-violet-500/40 transition-colors"
            >
              ⚙️ Administrador
            </button>
            <button
              onClick={() => handleLogin("SUPORTE")}
              className="p-2 bg-zinc-950/80 border border-zinc-800 rounded-lg text-xs font-bold text-zinc-300 hover:text-violet-300 hover:bg-zinc-800 hover:border-violet-500/40 transition-colors"
            >
              🛠️ Suporte Técnico
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
