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
  ShieldCheck
} from "lucide-react";

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

  return (
    <aside className="w-64 bg-zinc-900/95 backdrop-blur-md border-r border-zinc-800/80 h-full flex flex-col justify-between shrink-0 select-none">
      <div>
        {/* Logo Section */}
        <div className="h-16 flex items-center px-6 border-b border-zinc-800/80 gap-3">
          <div className="w-9 h-9 rounded-lg bg-violet-600 text-white flex items-center justify-center shadow-md shadow-violet-600/30">
            <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-lg font-bold text-zinc-100 tracking-tight flex items-center gap-1.5">
              OnFocus
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded bg-violet-950 text-violet-300 border border-violet-800/60">
                PRO
              </span>
            </span>
            <p className="text-[10px] text-zinc-400 font-medium -mt-0.5">Foco & Gestão Pedagógica</p>
          </div>
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
                    ? "bg-violet-950/60 text-violet-300 font-semibold border border-violet-800/40 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
                )}
              >
                <Icon
                  className={clsx(
                    "w-4 h-4 stroke-[2] transition-colors",
                    isActive ? "text-violet-400" : "text-zinc-400 group-hover:text-zinc-200"
                  )}
                />
                <span>{item.name}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer info */}
      <div className="p-4 border-t border-zinc-800/80">
        <div className="flex items-center justify-between text-xs text-zinc-500 font-medium px-2">
          <span>v1.2.0 • ECDSA</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
            Online
          </span>
        </div>
      </div>
    </aside>
  );
};
