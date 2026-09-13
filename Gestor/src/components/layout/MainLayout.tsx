"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Toast } from "@/components/ui/Toast";
import Link from "next/link";
import { X } from "lucide-react";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col font-sans text-zinc-100 antialiased selection:bg-violet-600/30 selection:text-violet-300">
      <div className="flex flex-1 h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block h-full">
          <Sidebar />
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)} 
            />
            <div className="relative w-72 bg-zinc-900 border-r border-zinc-800 h-full shadow-2xl z-10 flex flex-col">
              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-zinc-400 hover:text-zinc-100 bg-zinc-800 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Sidebar onCloseMobile={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <Header onToggleMobileMenu={() => setIsMobileMenuOpen(true)} />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>

            {/* Global Page Footer */}
            <footer className="max-w-7xl mx-auto w-full pt-8 pb-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3">
              <p>© 2026 OnFocus — Gestão Escolar & Foco Pedagógico Ativo</p>
              <div className="flex items-center gap-4">
                <Link href="/configuracoes?tab=termos" className="hover:text-zinc-300 transition-colors">Termos de Uso</Link>
                <Link href="/configuracoes?tab=privacidade" className="hover:text-zinc-300 transition-colors">Privacidade (LGPD)</Link>
                <Link href="/configuracoes?tab=suporte" className="hover:text-zinc-300 transition-colors">Suporte</Link>
              </div>
            </footer>
          </main>
        </div>
      </div>

      <Toast />
    </div>
  );
};
