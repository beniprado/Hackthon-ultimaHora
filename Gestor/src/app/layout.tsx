import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { MainLayout } from "@/components/layout/MainLayout";

export const metadata: Metadata = {
  title: "OnFocus — Plataforma de Foco Pedagógico Digital & Gestão Escolar",
  description: "Transformação temporária e segura do smartphone do aluno em ferramenta pedagógica ativa via QR Code assinado, sem vigilância invasiva e em conformidade com a LGPD.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen antialiased">
        <AppProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </AppProvider>
      </body>
    </html>
  );
}
