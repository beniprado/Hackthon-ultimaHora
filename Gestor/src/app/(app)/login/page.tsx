"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, Lock, Mail, Users } from "lucide-react";
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
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#1683D8] text-white mx-auto flex items-center justify-center shadow-lg shadow-blue-500/30 mb-3">
            <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Modo Aula</h1>
          <p className="text-xs text-slate-500 mt-1">Plataforma de Gestão Pedagógica e Foco Digital</p>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">E-mail Institucional</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1683D8]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Senha</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1683D8]"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleLogin("GESTOR")}
            className="w-full py-2.5 bg-[#1683D8] hover:bg-blue-600 text-white font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>Acessar Painel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Profile Switcher for MVP demonstration */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
            Acesso Rápido para Demonstração do MVP:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleLogin("GESTOR")}
              className="p-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              🎓 Gestor (Ricardo)
            </button>
            <button
              onClick={() => handleLogin("PROFESSOR")}
              className="p-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              👩‍🏫 Professor (Ana)
            </button>
            <button
              onClick={() => handleLogin("ADMIN")}
              className="p-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              ⚙️ Administrador
            </button>
            <button
              onClick={() => handleLogin("SUPORTE")}
              className="p-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              🛠️ Suporte Técnico
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
