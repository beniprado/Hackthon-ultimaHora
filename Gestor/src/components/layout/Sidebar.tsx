"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  School,
  Grid,
  BarChart3,
  Settings,
  Smartphone,
  ShieldCheck
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Turmas", href: "/turmas", icon: Users },
  { name: "Aulas", href: "/aulas", icon: BookOpen },
  { name: "Salas", href: "/salas", icon: School },
  { name: "Aplicativos", href: "/aplicativos", icon: Grid },
  { name: "Relatórios", href: "/relatorios", icon: BarChart3 },
  { name: "Configurações", href: "/configuracoes", icon: Settings },
];

export const Sidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const pathname = usePathname();
  const { setIsSimulatorModalOpen } = useApp();

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 h-full flex flex-col justify-between shrink-0 select-none">
      <div>
        {/* Logo Section matching PDF */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100 gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#1683D8] text-white flex items-center justify-center shadow-sm shadow-blue-500/20">
            <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">
            Modo Aula
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onCloseMobile}
                className={clsx(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all group",
                  isActive
                    ? "bg-blue-50 text-[#1683D8] font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <Icon
                  className={clsx(
                    "w-4 h-4 stroke-[2] transition-colors",
                    isActive ? "text-[#1683D8]" : "text-slate-400 group-hover:text-slate-600"
                  )}
                />
                <span>{item.name}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#1683D8]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Student Mobile Simulation Quick Trigger */}
        <div className="px-3 pt-2">
          <button
            onClick={() => {
              setIsSimulatorModalOpen(true);
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/70 text-[#1683D8] hover:bg-blue-100/50 transition-all shadow-sm"
          >
            <Smartphone className="w-4 h-4 stroke-[2] text-[#1683D8]" />
            <span className="font-semibold">Simulador Aluno</span>
            <span className="ml-auto text-[10px] uppercase font-bold bg-[#1683D8] text-white px-1.5 py-0.5 rounded">
              PDF
            </span>
          </button>
        </div>
      </div>

      {/* Footer info */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-2">
          <span>Versão 1.2.0</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Online
          </span>
        </div>
      </div>
    </aside>
  );
};
