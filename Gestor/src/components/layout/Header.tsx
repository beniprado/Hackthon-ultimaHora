"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Search, 
  Bell, 
  Menu, 
  ChevronDown, 
  Shield, 
  UserCheck, 
  LogOut, 
  AlertTriangle, 
  CheckCircle, 
  X,
  Radio 
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { UserRole } from "@/types";
import { FocusBroadcastModal } from "@/components/pedagogical/FocusBroadcastModal";

export const Header: React.FC<{ onToggleMobileMenu: () => void }> = ({ onToggleMobileMenu }) => {
  const pathname = usePathname();
  const { currentUser, setUserRole, alertas, dismissAlerta, activeBroadcast, clearBroadcast } = useApp();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
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
    return "Visão Geral";
  };

  const unreadAlerts = alertas.filter(a => !a.lido);

  return (
    <header className="h-16 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800/80 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Mobile Menu & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg"
          aria-label="Abrir Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb matching OnFocus identity */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-zinc-400 font-medium">OnFocus</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-100 font-semibold">{getBreadcrumbTitle()}</span>
        </div>

        {/* Active Focus Broadcast Indicator or Quick Broadcast Button */}
        {activeBroadcast ? (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/80 border border-violet-800/60 text-xs font-semibold text-violet-300 shadow-sm shadow-violet-900/40">
            <button
              onClick={() => setIsBroadcastModalOpen(true)}
              className="flex items-center gap-2 hover:text-violet-200 transition-colors"
              title="Clique para gerenciar o Broadcast de Foco"
            >
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
              <span>Broadcast: <strong>{activeBroadcast.title}</strong></span>
            </button>
            <button
              onClick={clearBroadcast}
              className="text-violet-400 hover:text-violet-200 ml-1"
              title="Encerrar broadcast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsBroadcastModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 text-xs font-semibold text-zinc-300 hover:text-violet-300 transition-all"
            title="Transmitir comando para os alunos"
          >
            <Radio className="w-3.5 h-3.5 text-violet-400" />
            <span>Transmitir Foco</span>
          </button>
        )}
      </div>

      {/* Focus Broadcast Modal */}
      <FocusBroadcastModal
        isOpen={isBroadcastModalOpen}
        onClose={() => setIsBroadcastModalOpen(false)}
      />

      {/* Right: Search, Notifications, User Profile */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Global Search Input */}
        <div className="relative hidden md:block w-64 lg:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar turmas, alunos ou apps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-zinc-950/60 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
          />
        </div>

        {/* Notifications Popover */}
        <div className="relative" ref={alertsRef}>
          <button
            onClick={() => setIsAlertsOpen(!isAlertsOpen)}
            className="relative p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 rounded-lg transition-colors"
            aria-label="Notificações"
          >
            <Bell className="w-4 h-4" />
            {unreadAlerts.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-zinc-900" />
            )}
          </button>

          {isAlertsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl shadow-black/80 z-50 p-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
                <div>
                  <h4 className="text-sm font-bold text-zinc-100">Alertas de Atividade</h4>
                  <p className="text-[11px] text-zinc-400">{alertas.length} eventos monitorados</p>
                </div>
                <span className="text-[10px] font-semibold bg-amber-950/60 text-amber-400 border border-amber-800/60 px-2 py-0.5 rounded-full">
                  Ao Vivo
                </span>
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {alertas.length === 0 ? (
                  <div className="text-center py-6 text-zinc-500 text-xs">
                    <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
                    Nenhum alerta pendente no momento.
                  </div>
                ) : (
                  alertas.map((alerta) => (
                    <div
                      key={alerta.id}
                      className="p-3 bg-zinc-950/60 border border-zinc-800/80 rounded-lg hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          <span className="text-xs font-semibold text-zinc-200">{alerta.tipo}</span>
                        </div>
                        <button
                          onClick={() => dismissAlerta(alerta.id)}
                          className="text-zinc-500 hover:text-zinc-300 p-0.5"
                          title="Resolver alerta"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{alerta.descricao}</p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-500 font-medium">
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
            className="flex items-center gap-3 p-1.5 hover:bg-zinc-800/80 rounded-lg transition-colors border border-transparent hover:border-zinc-800"
          >
            <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-violet-600/30">
              {currentUser.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-bold text-zinc-200 leading-tight">{currentUser.name}</p>
              <p className="text-[10px] text-zinc-500 font-medium capitalize">{currentUser.role.toLowerCase()}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500 hidden md:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl shadow-black/80 z-50 p-2 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-zinc-800">
                <p className="text-xs font-bold text-zinc-100">{currentUser.name}</p>
                <p className="text-[11px] text-zinc-400 truncate">{currentUser.email}</p>
                <span className="inline-block mt-1 text-[10px] font-semibold bg-violet-950 text-violet-300 border border-violet-800/60 px-2 py-0.5 rounded-full">
                  {currentUser.role}
                </span>
              </div>

              <div className="py-2">
                <p className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                  Simular Papel:
                </p>
                {(["ADMIN", "GESTOR", "PROFESSOR", "SUPORTE"] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setUserRole(role);
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-zinc-300 hover:bg-violet-950/60 hover:text-violet-300 rounded flex items-center justify-between transition-colors"
                  >
                    <span>{role}</span>
                    {currentUser.role === role && <UserCheck className="w-3.5 h-3.5 text-violet-400" />}
                  </button>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-1">
                <Link
                  href="/login"
                  className="w-full text-left px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-950/30 rounded flex items-center gap-2"
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
