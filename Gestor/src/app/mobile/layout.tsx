import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "OnFocus — Aluno",
  description: "Launcher protegido do OnFocus para celulares do aluno.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#09090B",
};

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}