"use client";

import React, { useState, useEffect } from "react";
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
  ShieldCheck,
  Sun,
  Moon,
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
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("onfocus_theme") as "dark" | "light" | null;
    const initial = saved || "dark";
    setTheme(initial);
    if (initial === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("onfocus_theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <aside className="w-64 bg-[#e0f7fb]/90 dark:bg-[#132234]/95 backdrop-blur-md border-r border-[#cbd5e1] dark:border-[#1e293b] min-h-screen h-full flex flex-col justify-between shrink-0 select-none transition-colors duration-200">
      <div>
        {/* Logo Section */}
        <div className="h-16 flex items-center px-6 border-b border-[#cbd5e1] dark:border-[#1e293b] gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#0e7c93] dark:bg-cyan-500 text-white dark:text-slate-950 flex items-center justify-center shadow-md shadow-cyan-500/20">
            <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              OnFocus
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded bg-cyan-100 dark:bg-cyan-950 text-[#0e7c93] dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800/60">
                PRO
              </span>
            </span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium -mt-0.5">Foco & Gestão Pedagógica</p>
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
                    ? "bg-cyan-100/90 dark:bg-cyan-950/60 text-[#0e7c93] dark:text-cyan-300 font-semibold border border-cyan-300 dark:border-cyan-800/50 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-cyan-50/60 dark:hover:bg-slate-800/60"
                )}
              >
                <Icon
                  className={clsx(
                    "w-4 h-4 stroke-[2] transition-colors",
                    isActive ? "text-[#0e7c93] dark:text-cyan-400" : "text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200"
                  )}
                />
                <span>{item.name}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0e7c93] dark:bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Theme Switcher & Version/Status */}
      <div className="p-4 border-t border-[#cbd5e1] dark:border-[#1e293b] space-y-3">
        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Alternar para Modo Claro" : "Alternar para Modo Escuro"}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-[#cbd5e1] dark:border-[#1e293b] hover:border-cyan-500/40 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#0e7c93] dark:hover:text-cyan-300 transition-all shadow-sm group"
        >
          <span className="flex items-center gap-2">
            {mounted && theme === "dark" ? (
              <Moon className="w-4 h-4 text-cyan-400 transition-transform group-hover:-rotate-12" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500 transition-transform group-hover:rotate-45" />
            )}
            <span>{mounted && theme === "dark" ? "Modo Escuro" : "Modo Claro"}</span>
          </span>
          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {mounted && theme === "dark" ? "Ativo" : "Ativo"}
          </span>
        </button>

        {/* System Version & Online Status */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium px-1">
          <span>v1.2.0 • ECDSA</span>
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
            Online
          </span>
        </div>
      </div>
    </aside>
  );
};
