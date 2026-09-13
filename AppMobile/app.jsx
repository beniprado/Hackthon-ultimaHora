import React, { useEffect, useState } from "react";
import { fetchMobileState } from "./services/mobileApi";
import { TopBar } from "./components/TopBar";
import { StandbyScreen } from "./screens/StandbyScreen";
import { ActiveScreen } from "./screens/ActiveScreen";
import { AppScreen } from "./screens/AppScreen";
import { BlockedScreen } from "./screens/BlockedScreen";
import { ExitScanScreen } from "./screens/ExitScanScreen";
import { FinishedScreen } from "./screens/FinishedScreen";
import { PhoneHomeScreen } from "./screens/PhoneHomeScreen";

/**
 * OnFocus Student Mobile Application - Root Container
 * Orchestrates the full student lifecycle state machine:
 * 'standby' -> 'active' -> 'app' | 'blocked' -> 'checkout' -> 'finished' -> 'home'
 */
export default function App() {
  const [status, setStatus] = useState("standby");
  const [checkedIn, setCheckedIn] = useState(false);
  const [data, setData] = useState(null);
  const [activeAppId, setActiveAppId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [broadcastAlert, setBroadcastAlert] = useState(null);

  const load = async () => {
    try {
      const res = await fetchMobileState();
      setData(res);
    } catch (e) {
      console.error("[OnFocus Mobile] Erro ao carregar estado da sessão:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 15000);
    return () => clearInterval(id);
  }, []);

  // Sincronização em tempo real com Focus Broadcast do professor
  useEffect(() => {
    const handleBroadcastData = (bcast) => {
      if (!bcast) return;
      setBroadcastAlert({
        type: bcast.type,
        title: bcast.title,
        message: bcast.payload?.message,
      });

      if (bcast.type === "LAUNCH_APP") {
        setCheckedIn(true);
        if (bcast.payload?.packageName === "org.geogebra.android" || bcast.title.includes("GeoGebra")) {
          setActiveAppId("app-geogebra");
          setStatus("app");
        } else if (bcast.payload?.packageName === "com.google.android.calculator" || bcast.title.includes("Calculadora")) {
          setActiveAppId("app-calc");
          setStatus("app");
        }
      } else if (bcast.type === "RELEASE_DEVICE") {
        setCheckedIn(false);
        setActiveAppId(null);
        setStatus("finished");
      }
    };

    const handleCustom = (e) => {
      handleBroadcastData(e.detail);
    };

    const handleStorage = (e) => {
      if (e.key === "onfocus-broadcast" && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          handleBroadcastData(parsed);
        } catch {}
      } else if (e.key === "onfocus-broadcast" && !e.newValue) {
        setBroadcastAlert(null);
      }
    };

    window.addEventListener("onfocus-broadcast", handleCustom);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("onfocus-broadcast", handleCustom);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Sincronização inteligente com telemetria do backend
  useEffect(() => {
    if (!data) return;
    // Se o aluno está na tela inicial nativa do celular, o polling não deve forçar saída
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

  const handleOpenApp = (appId) => {
    const allowed = data?.aula?.appsPermitidosIds?.includes(appId);
    setActiveAppId(appId);
    if (allowed) {
      setStatus("app");
    } else {
      setStatus("blocked");
    }
  };

  const handleBackToLauncher = () => {
    setStatus("active");
    setActiveAppId(null);
  };

  const handleFinish = () => {
    // Encerrar solicita validação de saída via QR Code antes de finalizar
    setActiveAppId(null);
    setStatus("checkout");
  };

  const handleExitValidated = () => {
    // Saída validada via QR: encerra a sessão com sucesso
    setCheckedIn(false);
    setActiveAppId(null);
    setStatus("finished");
  };

  const handleCancelExit = () => {
    // Retorna ao launcher da sessão ativa
    setActiveAppId(null);
    setStatus("active");
  };

  const handleReturnHome = () => {
    // Sai totalmente do app para a tela inicial do celular
    setCheckedIn(false);
    setActiveAppId(null);
    setStatus("home");
    load();
  };

  const handleOpenOnFocus = () => {
    // Reabre o aplicativo OnFocus a partir do ícone inicial
    setStatus("standby");
    load();
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full max-w-md mx-auto bg-[#0a0f1e] text-white flex items-center justify-center sm:border-x sm:border-[#1e293b]">
        <div className="text-center px-6">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-zinc-400 font-medium">Conectando à plataforma OnFocus…</p>
          <span className="text-xs text-zinc-500 font-mono mt-1 block">Verificando certificados de sala…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-[#0a0f1e] flex flex-col overflow-hidden sm:border-x sm:border-[#1e293b] shadow-2xl">
      {status !== "home" && <TopBar />}

      {/* Real-time Focus Broadcast Banner */}
      {broadcastAlert && status !== "home" && (
        <div className="bg-gradient-to-r from-[#0e7c93] to-cyan-600 text-white px-4 py-2 flex items-center justify-between text-xs animate-in slide-in-from-top duration-300 shadow-md shrink-0 border-b border-cyan-400/30">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-cyan-200 animate-ping shrink-0" />
            <div className="min-w-0">
              <span className="font-bold text-[10px] uppercase tracking-wider text-cyan-200 block">Comando do Professor</span>
              <p className="font-medium truncate text-xs">{broadcastAlert.title}</p>
              {broadcastAlert.message && (
                <p className="text-[11px] text-cyan-100/90 truncate">{broadcastAlert.message}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => setBroadcastAlert(null)}
            className="p-1 hover:bg-white/20 rounded-md text-white text-xs font-bold transition-colors ml-2"
            title="Dispensar"
          >
            ✕
          </button>
        </div>
      )}

      {/* Focus Alert Modal (Call Attention) */}
      {broadcastAlert && broadcastAlert.type === "CALL_ATTENTION" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#132234] border border-cyan-500/40 rounded-2xl p-6 max-w-xs w-full text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center mx-auto mb-4 text-cyan-400">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 font-mono">
              COMANDO PEDAGÓGICO
            </span>
            <h3 className="text-lg font-bold text-white mt-1">Atenção ao Quadro</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {broadcastAlert.message || "O professor solicitou uma pausa nos smartphones para acompanhar a explicação na lousa."}
            </p>
            <button
              onClick={() => setBroadcastAlert(null)}
              className="mt-5 w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-cyan-500/20 transition-all active:scale-95"
            >
              Entendido, Foco na Lousa
            </button>
          </div>
        </div>
      )}

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
          <PhoneHomeScreen onOpenOnFocus={handleOpenOnFocus} />
        )}
      </main>
    </div>
  );
}
