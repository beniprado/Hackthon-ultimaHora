"use client";

import React, { useState } from "react";
import { 
  Radio, 
  Send, 
  Layers, 
  Calculator, 
  Eye, 
  Unlock, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  X,
  Compass
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useApp } from "@/context/AppContext";
import { BroadcastCommandType } from "@/types";

interface FocusBroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSalaId?: string;
}

export const FocusBroadcastModal: React.FC<FocusBroadcastModalProps> = ({
  isOpen,
  onClose,
  defaultSalaId = "sala-101"
}) => {
  const { salas, activeBroadcast, broadcastCommand, clearBroadcast } = useApp();
  
  const [selectedSalaId, setSelectedSalaId] = useState<string>(defaultSalaId);
  const [customMessage, setCustomMessage] = useState<string>("");

  const handleTriggerBroadcast = (
    type: BroadcastCommandType,
    title: string,
    packageName?: string,
    appName?: string,
    defaultMsg?: string
  ) => {
    broadcastCommand({
      type,
      title,
      payload: {
        packageName,
        appName,
        message: customMessage.trim() || defaultMsg || "Siga as orientações do professor."
      },
      targetSalaId: selectedSalaId
    });
    setCustomMessage("");
    onClose();
  };

  const selectedSalaObj = salas.find(s => s.id === selectedSalaId) || salas[0];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Focus Broadcast — Comando em Tempo Real"
      subtitle={`Envie comandos pedagógicos imediatos aos smartphones dos alunos em ${selectedSalaObj.nome}`}
      maxWidth="lg"
    >
      <div className="space-y-5 text-slate-700 dark:text-zinc-300">
        
        {/* Active Broadcast Alert banner */}
        {activeBroadcast && (
          <div className="p-3.5 bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-800/80 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0e7c93] dark:bg-cyan-400 animate-ping" />
              <div>
                <p className="text-xs font-bold text-[#0e7c93] dark:text-cyan-200">
                  Broadcast Ativo: {activeBroadcast.title}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                  Transmitido às {activeBroadcast.timestamp} por {activeBroadcast.sentBy}
                </p>
              </div>
            </div>
            <button
              onClick={clearBroadcast}
              className="px-2.5 py-1 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/50 hover:bg-rose-200 dark:hover:bg-rose-900/60 border border-rose-300 dark:border-rose-800/60 rounded-lg transition-colors"
            >
              Encerrar
            </button>
          </div>
        )}

        {/* Room Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-1.5">
            Sala de Destino da Transmissão
          </label>
          <select
            value={selectedSalaId}
            onChange={(e) => setSelectedSalaId(e.target.value)}
            className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-xs text-slate-900 dark:text-zinc-200 font-medium focus:outline-none focus:border-cyan-500"
          >
            <option value="TODAS">Todas as Salas Ativas ({salas.length} salas)</option>
            {salas.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nome} — {s.bloco} ({s.dispositivosConectados} dispositivos online)
              </option>
            ))}
          </select>
        </div>

        {/* Custom Pedagogical Note */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-1.5">
            Instrução Pedagógica Adicional (Opcional)
          </label>
          <input
            type="text"
            placeholder="Ex: Abram a atividade 4 na página 52 do livro..."
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-xs text-slate-900 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Action Grid: High-Impact Pedagogical Actions */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2.5">
            Selecione o Comando para Disparar:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Action 1: Launch GeoGebra */}
            <button
              onClick={() => handleTriggerBroadcast(
                "LAUNCH_APP",
                "Iniciar GeoGebra Geometria",
                "org.geogebra.android",
                "GeoGebra",
                "Abram a atividade de Geometria Analítica na página 42."
              )}
              className="p-3.5 bg-white dark:bg-zinc-950/80 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 border border-[#cbd5e1] dark:border-zinc-800 hover:border-cyan-500/60 rounded-xl text-left transition-all group flex flex-col justify-between shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800/60 text-[#0e7c93] dark:text-cyan-400 group-hover:scale-110 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-[#0e7c93] dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800/60">
                  Whitelist
                </span>
              </div>
              <div className="mt-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-zinc-100 group-hover:text-[#0e7c93] dark:group-hover:text-cyan-300 transition-colors">
                  Iniciar GeoGebra
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                  Abre instantaneamente o ambiente gráfico nos smartphones.
                </p>
              </div>
            </button>

            {/* Action 2: Launch Calculator */}
            <button
              onClick={() => handleTriggerBroadcast(
                "LAUNCH_APP",
                "Abrir Calculadora Científica",
                "com.google.android.calculator",
                "Calculadora",
                "Usem a calculadora nos cálculos de física."
              )}
              className="p-3.5 bg-white dark:bg-zinc-950/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-[#cbd5e1] dark:border-zinc-800 hover:border-emerald-500/60 rounded-xl text-left transition-all group flex flex-col justify-between shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                  <Calculator className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/60">
                  Ferramenta
                </span>
              </div>
              <div className="mt-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-zinc-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  Abrir Calculadora
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                  Habilita modo de resolução de equações e cálculos.
                </p>
              </div>
            </button>

            {/* Action 3: Attention / Pause */}
            <button
              onClick={() => handleTriggerBroadcast(
                "CALL_ATTENTION",
                "Atenção ao Quadro",
                undefined,
                undefined,
                "Pausa nos smartphones: Olhem para a lousa para a explicação principal."
              )}
              className="p-3.5 bg-white dark:bg-zinc-950/80 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-[#cbd5e1] dark:border-zinc-800 hover:border-amber-500/60 rounded-xl text-left transition-all group flex flex-col justify-between shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800/60 text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform">
                  <Eye className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60">
                  Atenção
                </span>
              </div>
              <div className="mt-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-zinc-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                  Modo Atenção Geral
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                  Suspende temporariamente as telas para foco na aula expositiva.
                </p>
              </div>
            </button>

            {/* Action 4: Release Device */}
            <button
              onClick={() => handleTriggerBroadcast(
                "RELEASE_DEVICE",
                "Desbloqueio dos Dispositivos",
                undefined,
                undefined,
                "Aula finalizada. Dispositivos liberados para uso pessoal."
              )}
              className="p-3.5 bg-white dark:bg-zinc-950/80 hover:bg-slate-100 dark:hover:bg-zinc-900 border border-[#cbd5e1] dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-700 rounded-xl text-left transition-all group flex flex-col justify-between shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 group-hover:scale-110 transition-transform">
                  <Unlock className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-400 border border-slate-300 dark:border-zinc-700">
                  Desbloqueio
                </span>
              </div>
              <div className="mt-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-zinc-100 group-hover:text-slate-800 dark:group-hover:text-zinc-200 transition-colors">
                  Liberar Smartphones
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                  Desativa o Launcher Seguro e encerra a política de aula.
                </p>
              </div>
            </button>

          </div>
        </div>

        {/* Footer info */}
        <div className="pt-2 flex items-center justify-between border-t border-[#cbd5e1] dark:border-zinc-800/80 text-xs text-slate-500 dark:text-zinc-500">
          <span>Disparado via WebSocket / Canal criptográfico OnFocus</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-slate-200/60 dark:hover:bg-zinc-800 rounded-lg font-medium transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </Modal>
  );
};
