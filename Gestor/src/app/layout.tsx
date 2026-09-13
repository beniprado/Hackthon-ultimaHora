import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { MainLayout } from "@/components/layout/MainLayout";

export const metadata: Metadata = {
  title: "Modo Aula — Gestão Escolar Inteligente e Dispositivos Seguros",
  description: "Plataforma de gestão escolar que transforma temporariamente o smartphone do aluno em um dispositivo seguro para uso pedagógico durante as aulas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#F8FAFC] text-slate-900 min-h-screen">
        <AppProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </AppProvider>
      </body>
    </html>
  );
}
