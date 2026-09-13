"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Toast } from "@/components/ui/Toast";
import { StudentSimulatorModal } from "@/components/simulator/StudentSimulatorModal";
import Link from "next/link";
import { X } from "lucide-react";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900 antialiased selection:bg-[#1683D8]/20 selection:text-[#1683D8]">
      <div className="flex flex-1 h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block h-full">
          <Sidebar />
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div 
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)} 
            />
            <div className="relative w-72 bg-white h-full shadow-2xl z-10 flex flex-col">
              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full"
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

            {/* Global Page Footer matching PDF */}
            <footer className="max-w-7xl mx-auto w-full pt-8 pb-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
              <p>© 2026 Modo Aula — Gestão Escolar Inteligente e Foco Pedagógico</p>
              <div className="flex items-center gap-4">
                <Link href="/configuracoes?tab=termos" className="hover:text-slate-600 transition-colors">Termos de Uso</Link>
                <Link href="/configuracoes?tab=privacidade" className="hover:text-slate-600 transition-colors">Privacidade (LGPD)</Link>
                <Link href="/configuracoes?tab=suporte" className="hover:text-slate-600 transition-colors">Suporte</Link>
              </div>
            </footer>
          </main>
        </div>
      </div>

      <Toast />
      <StudentSimulatorModal />
    </div>
  );
};
