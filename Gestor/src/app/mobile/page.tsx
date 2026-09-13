"use client";

import React, { useEffect, useState } from "react";
import { fetchMobileState } from "@/lib/mobileApi";
import type { MobileResponse } from "@/types";
import { StandbyScreen } from "@/components/mobile/screens/StandbyScreen";
import { ActiveScreen } from "@/components/mobile/screens/ActiveScreen";
import { AppScreen } from "@/components/mobile/screens/AppScreen";
import { BlockedScreen } from "@/components/mobile/screens/BlockedScreen";
import { ExitScanScreen } from "@/components/mobile/screens/ExitScanScreen";
import { PhoneHomeScreen } from "@/components/mobile/screens/PhoneHomeScreen";
import { FinishedScreen } from "@/components/mobile/screens/FinishedScreen";
import { TopBar } from "@/components/mobile/TopBar";

export type AppStatus = "standby" | "active" | "app" | "blocked" | "checkout" | "finished" | "home";

export default function App() {
  const [status, setStatus] = useState<AppStatus>("standby");
  const [checkedIn, setCheckedIn] = useState(false);
  const [data, setData] = useState<MobileResponse | null>(null);
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await fetchMobileState();
      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 15000);
    return () => clearInterval(id);
  }, []);

  // Atualiza estado com base em dados do backend.
  // A sala só é acessada depois da leitura do QR Code (standby -> active) —
  // e nenhuma atualização sozinha tira o aluno de checkout/finished/app/blocked,
  // então as telas de validação e de "Aula finalizada" nunca piscam nem voltam sozinhas.
  useEffect(() => {
    if (!data) return;
    // Tela inicial do celular: saiu totalmente do app; o polling
    // nunca deve tirar o aluno dela sozinho.
    if (status === "home") return;
    if (!data.aula) {
      setActiveAppId(null);
      setStatus(checkedIn ? "finished" : "standby");
      return;
    }
    if (data.aula.status === "Finalizada") {
      setActiveAppId(null);
      setStatus("finished");
      return;
    }
    if (checkedIn && status === "standby") {
      setStatus("active");
    }
  }, [data, checkedIn, status]);

  const handleQrScanned = () => {
    setCheckedIn(true);
    if (data?.aula && data.aula.status !== "Finalizada") {
      setStatus("active");
    }
  };

  const handleOpenApp = (appId: string) => {
    const allowed = data?.aula?.appsPermitidosIds.includes(appId);
    if (allowed) {
      setActiveAppId(appId);
      setStatus("app");
    } else {
      setActiveAppId(appId);
      setStatus("blocked");
    }
  };

  const handleBackToLauncher = () => {
    setStatus("active");
    setActiveAppId(null);
  };

  const handleFinish = () => {
    // "Encerrar" pede a validação de saída via QR Code antes de
    // encerrar a sessão de verdade (sem pular direto p/ "finished").
    setActiveAppId(null);
    setStatus("checkout");
  };

  const handleExitValidated = () => {
    // Saída validada no QR: encerra a sessão. Sem checkedIn o efeito
    // acima nunca consegue devolver a tela p/ "active" sozinho.
    setCheckedIn(false);
    setActiveAppId(null);
    setStatus("finished");
  };

  const handleCancelExit = () => {
    // Desistiu de sair: volta ao launcher do modo aula.
    setActiveAppId(null);
    setStatus("active");
  };

  const handleReturnHome = () => {
    // Saiu totalmente: vai p/ a tela inicial do celular (papel de
    // parede + relógio), sem nada do Modo Aula.
    setCheckedIn(false);
    setActiveAppId(null);
    setStatus("home");
    load();
  };

  const handleOpenModoAula = () => {
    // Reabre o app instalado: volta p/ a leitura do QR Code.
    setStatus("standby");
    load();
  };

  if (loading) {
    return (
      <div className="mobile-dvh w-full max-w-md mx-auto bg-[#0B1220] text-white flex items-center justify-center sm:border-x sm:border-slate-800">
        <div className="text-center px-6">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-400">Conectando à plataforma Modo Aula…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-dvh w-full max-w-md mx-auto bg-[#0B1220] flex flex-col overflow-hidden sm:border-x sm:border-slate-800">
      {status !== "home" && <TopBar />}

      <main className="flex-1 min-h-0 flex flex-col overflow-hidden">
        {status === "standby" && (
          <StandbyScreen data={data} onQrScanned={handleQrScanned} />
        )}
        {status === "active" && (
          <ActiveScreen
            data={data}
            onOpenApp={handleOpenApp}
            onFinish={handleFinish}
          />
        )}
        {status === "app" && activeAppId && data && (
          <AppScreen
            data={data}
            appId={activeAppId}
            onBack={handleBackToLauncher}
            onFinish={handleFinish}
          />
        )}
        {status === "blocked" && (
          <BlockedScreen data={data} appId={activeAppId} onBack={handleBackToLauncher} />
        )}
        {status === "checkout" && (
          <ExitScanScreen
            data={data}
            onExitValidated={handleExitValidated}
            onCancel={handleCancelExit}
          />
        )}
        {status === "finished" && (
          <FinishedScreen data={data} onReturnHome={handleReturnHome} />
        )}
        {status === "home" && (
          <PhoneHomeScreen onOpenModoAula={handleOpenModoAula} />
        )}
      </main>
    </div>
  );
}
