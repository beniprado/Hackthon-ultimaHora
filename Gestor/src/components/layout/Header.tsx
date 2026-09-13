"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Search, 
  Bell, 
  Menu, 
  ChevronDown, 
  Smartphone, 
  Shield, 
  UserCheck, 
  LogOut,
  AlertTriangle,
  CheckCircle,
  X
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { UserRole } from "@/types";

export const Header: React.FC<{ onToggleMobileMenu: () => void }> = ({ onToggleMobileMenu }) => {
  const pathname = usePathname();
  const { currentUser, setUserRole, alertas, dismissAlerta, setIsSimulatorModalOpen } = useApp();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const profileRef = useRef<HTMLDivElement>(null);
  const alertsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (alertsRef.current && !alertsRef.current.contains(event.target as Node)) {
        setIsAlertsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format breadcrumb
  const getBreadcrumbTitle = () => {
    if (pathname.includes("/dashboard")) return "Dashboard";
    if (pathname.includes("/turmas")) return "Turmas";
    if (pathname.includes("/aulas")) return "Aulas";
    if (pathname.includes("/salas")) return "Salas";
    if (pathname.includes("/aplicativos")) return "Aplicativos";
    if (pathname.includes("/relatorios")) return "Relatórios";
    if (pathname.includes("/configuracoes")) return "Configurações";
    if (pathname.includes("/simulador-aluno")) return "Simulador Mobile Aluno";
    return "Visão Geral";
  };

  const unreadAlerts = alertas.filter(a => !a.lido);

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile Menu & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
          aria-label="Abrir Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb matching PDF: Modo Aula / Página atual */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-400 font-medium">Modo Aula</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-semibold">{getBreadcrumbTitle()}</span>
        </div>
      </div>

      {/* Right: Search, Live Simulator Button, Notifications, User Profile */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Global Search Input */}
        <div className="relative hidden md:block w-64 lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar turmas, alunos ou apps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1683D8]/20 focus:border-[#1683D8] transition-all"
          />
        </div>

        {/* Mobile Device Simulator Trigger */}
        <button
          onClick={() => setIsSimulatorModalOpen(true)}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-[#1683D8] border border-blue-200 hover:bg-blue-100 transition-colors shadow-sm"
          title="Ver o aplicativo Android do aluno em tempo real"
        >
          <Smartphone className="w-4 h-4" />
          <span>Simulador Aluno (PDF)</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative" ref={alertsRef}>
          <button
            onClick={() => setIsAlertsOpen(!isAlertsOpen)}
            className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Notificações"
          >
            <Bell className="w-4 h-4" />
            {unreadAlerts.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {isAlertsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Alertas de Atividade</h4>
                  <p className="text-[11px] text-slate-400">{alertas.length} eventos monitorados</p>
                </div>
                <span className="text-[10px] font-semibold bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full">
                  Ao Vivo
                </span>
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {alertas.length === 0 ? (
                  <div className="text-center py-6 text-slate-400 text-xs">
                    <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
                    Nenhum alerta pendente no momento.
                  </div>
                ) : (
                  alertas.map((alerta) => (
                    <div
                      key={alerta.id}
                      className="p-3 bg-slate-50 border border-slate-100 rounded-lg hover:border-slate-200 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                          <span className="text-xs font-semibold text-slate-800">{alerta.tipo}</span>
                        </div>
                        <button
                          onClick={() => dismissAlerta(alerta.id)}
                          className="text-slate-400 hover:text-slate-600 p-0.5"
                          title="Resolver alerta"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{alerta.descricao}</p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50 text-[10px] text-slate-400 font-medium">
                        <span>{alerta.alunoNome} • {alerta.salaNome}</span>
                        <span>{alerta.timestamp}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Role Selector */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200"
          >
            <div className="w-8 h-8 rounded-full bg-[#1683D8] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              {currentUser.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-bold text-slate-800 leading-tight">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 font-medium capitalize">{currentUser.role.toLowerCase()}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                <span className="inline-block mt-1 text-[10px] font-semibold bg-blue-50 text-[#1683D8] px-2 py-0.5 rounded-full">
                  {currentUser.role}
                </span>
              </div>

              <div className="py-2">
                <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Simular Perfil de Acesso:
                </p>
                {(["ADMIN", "GESTOR", "PROFESSOR", "SUPORTE"] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setUserRole(role);
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-[#1683D8] rounded flex items-center justify-between transition-colors"
                  >
                    <span>{role}</span>
                    {currentUser.role === role && <UserCheck className="w-3.5 h-3.5 text-[#1683D8]" />}
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-1">
                <Link
                  href="/login"
                  className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sair do Sistema</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
