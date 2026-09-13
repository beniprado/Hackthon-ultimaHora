import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Modo Aula — Aluno",
  description: "Launcher protegido do Modo Aula para celulares do aluno.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#0B1220",
};

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}