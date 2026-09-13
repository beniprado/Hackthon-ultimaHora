import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('onfocus_theme') || 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-[#f1f5f9] dark:bg-[#0a0f1e] text-slate-900 dark:text-white min-h-screen antialiased transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
