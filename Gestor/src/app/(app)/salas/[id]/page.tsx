"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Wifi, 
  Users, 
  Lock, 
  AlertTriangle, 
  RefreshCw, 
  Power, 
  Search, 
  Battery, 
  Smartphone, 
  Laptop, 
  Tablet, 
  MoreHorizontal, 
  ArrowLeft, 
  Radio, 
  Clock, 
  QrCode 
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Modal } from "@/components/ui/Modal";
import { FocusBroadcastModal } from "@/components/pedagogical/FocusBroadcastModal";
import { QRCodeGeneratorModal } from "@/components/security/QRCodeGeneratorModal";

export default function SalaStatusPage({ params }: { params?: { id?: string } }) {
  const { salas, aulas, dispositivos, alertas, finishAula, showToast } = useApp();
  
  const salaId = params?.id || "sala-101";
  const sala = salas.find(s => s.id === salaId) || salas[0];
  const activeAula = aulas.find(a => a.salaId === sala.id && a.status === "Ao vivo") || aulas[0];

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("TODOS");
  const [selectedAlunoMenu, setSelectedAlunoMenu] = useState<string | null>(null);
  const [isEndClassModalOpen, setIsEndClassModalOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const filteredDispositivos = dispositivos.filter(d => {
    const matchesSearch = 
      d.alunoNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.modeloDispositivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.appAtivo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "TODOS" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRefresh = () => {
    showToast("Sincronização em tempo real atualizada com os 28 dispositivos!");
  };

  const handleConfirmEndAula = () => {
    finishAula(activeAula.id);
    setIsEndClassModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Link href="/salas" className="text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-100 tracking-tight">Status da {sala.nome}</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Aula Ativa
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            Iniciada às {activeAula.horarioInicio} • Disciplina: <strong className="text-slate-800 dark:text-zinc-200">{activeAula.disciplina}</strong> — {activeAula.professor}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          {/* Button: Gerar QR Code Dinâmico */}
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#0e7c93] dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-950/70 hover:bg-cyan-200 dark:hover:bg-cyan-900/80 border border-cyan-300 dark:border-cyan-800/80 rounded-lg shadow-sm transition-all active:scale-95"
          >
            <QrCode className="w-4 h-4 text-[#0e7c93] dark:text-cyan-400" />
            <span>QR Code da Sala</span>
          </button>

          {/* Button: Focus Broadcast */}
          <button
            onClick={() => setIsBroadcastModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white dark:text-slate-950 bg-[#0e7c93] hover:bg-[#0b6376] dark:bg-cyan-500 dark:hover:bg-cyan-400 rounded-lg shadow-md shadow-[#0e7c93]/20 dark:shadow-cyan-500/20 transition-all active:scale-95"
          >
            <Radio className="w-4 h-4" />
            <span>Transmitir Comando</span>
          </button>

          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg transition-all"
          >
            <RefreshCw className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
            <span>Atualizar</span>
          </button>

          <button
            onClick={() => setIsEndClassModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/50 hover:bg-rose-200 dark:hover:bg-rose-900/60 border border-rose-300 dark:border-rose-800/60 rounded-lg transition-all"
          >
            <Power className="w-4 h-4 stroke-[2.5]" />
            <span>Encerrar Aula</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#e0f7fb] dark:bg-[#132234] backdrop-blur-md p-5 rounded-xl border border-[#cbd5e1] dark:border-[#1e293b] shadow-lg">
        <div>
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider">Dispositivos Conectados</span>
            <Wifi className="w-4 h-4 text-[#0e7c93] dark:text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">28/32</p>
          <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800/40 px-1.5 py-0.5 rounded">
            +2 novos agora
          </span>
        </div>

        <div>
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider">Alunos em Atividade</span>
            <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">26</p>
          <span className="text-[10px] text-slate-600 dark:text-zinc-400">92% em conformidade com GeoGebra</span>
        </div>

        <div>
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider">Apps Restritos em Uso</span>
            <Lock className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">0</p>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Bloqueios automáticos 100%</span>
        </div>

        <div>
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider">Alertas de Sistema</span>
            <AlertTriangle className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">{alertas.length}</p>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">Atenção requerida</span>
        </div>
      </div>

      {/* Real-time Monitoring Table */}
      <div className="bg-[#e0f7fb] dark:bg-[#132234] backdrop-blur-md border border-[#cbd5e1] dark:border-[#1e293b] rounded-xl shadow-lg overflow-hidden">
        
        <div className="p-5 border-b border-[#cbd5e1] dark:border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">Telemetria de Dispositivos em Tempo Real</h2>
            <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5">Listagem detalhada de primeiro plano (Foreground Package Check — LGPD Safe).</p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Pesquisar aluno ou app..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-slate-900 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1.5 px-3 text-xs bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-300 font-medium focus:outline-none focus:border-cyan-500"
            >
              <option value="TODOS">Todos os status</option>
              <option value="Conectado">Conectado</option>
              <option value="Ocioso">Ocioso</option>
              <option value="Bloqueado">Bloqueado</option>
              <option value="Desconectado">Desconectado</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#cbd5e1] dark:border-zinc-800/80 text-[11px] font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider bg-cyan-500/5 dark:bg-zinc-950/60">
                <th className="py-3.5 px-5">Aluno</th>
                <th className="py-3.5 px-5">Dispositivo</th>
                <th className="py-3.5 px-5">App Ativo (Whitelist)</th>
                <th className="py-3.5 px-5">Bateria</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#cbd5e1]/60 dark:divide-zinc-800/60 text-xs">
              {filteredDispositivos.map((dev) => (
                <tr key={dev.id} className="hover:bg-cyan-100/40 dark:hover:bg-zinc-800/40 transition-colors">
                  <td className="py-4 px-5 font-bold text-slate-900 dark:text-zinc-100">
                    {dev.alunoNome}
                  </td>
                  <td className="py-4 px-5 text-slate-600 dark:text-zinc-400">
                    <div className="flex items-center gap-2">
                      {dev.os === "Android" ? (
                        <Smartphone className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
                      ) : dev.os === "iOS" ? (
                        <Tablet className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
                      ) : (
                        <Laptop className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
                      )}
                      <span>{dev.modeloDispositivo}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-[#0e7c93] dark:text-cyan-400 font-semibold">
                    {dev.appAtivo}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2 w-28">
                      <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={"h-full rounded-full " + (
                            dev.bateriaPercentual <= 15 ? "bg-rose-500" :
                            dev.bateriaPercentual <= 45 ? "bg-amber-500" :
                            "bg-emerald-500"
                          )}
                          style={{ width: dev.bateriaPercentual + "%" }}
                        />
                      </div>
                      <span className="font-mono text-[11px] text-slate-600 dark:text-zinc-400">{dev.bateriaPercentual}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <StatusBadge status={dev.status} />
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => setSelectedAlunoMenu(selectedAlunoMenu === dev.id ? null : dev.id)}
                      className="p-1.5 text-slate-400 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 hover:bg-cyan-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Cards */}
        <div className="md:hidden divide-y divide-[#cbd5e1]/60 dark:divide-zinc-800/60 p-4 space-y-3">
          {filteredDispositivos.map((dev) => (
            <div key={dev.id} className="p-3.5 bg-white/70 dark:bg-zinc-950/60 rounded-xl border border-[#cbd5e1] dark:border-zinc-800/80">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-zinc-100">{dev.alunoNome}</h3>
                  <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-0.5">{dev.modeloDispositivo}</p>
                </div>
                <StatusBadge status={dev.status} size="sm" />
              </div>
              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-700 dark:text-zinc-300 pt-2 border-t border-[#cbd5e1] dark:border-zinc-800/80">
                <span>App: <strong className="text-[#0e7c93] dark:text-cyan-300">{dev.appAtivo}</strong></span>
                <span className="font-mono font-semibold text-slate-600 dark:text-zinc-400">🔋 {dev.bateriaPercentual}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-[#cbd5e1] dark:border-zinc-800/80 flex items-center justify-between text-xs text-slate-600 dark:text-zinc-400 bg-cyan-500/5 dark:bg-zinc-950/40">
          <p>Exibindo {filteredDispositivos.length} de {dispositivos.length} alunos presentes</p>
          <div className="flex items-center gap-1">
            <button className="w-6 h-6 rounded bg-[#0e7c93] dark:bg-cyan-500 text-white dark:text-slate-950 font-bold text-xs flex items-center justify-center">
              1
            </button>
            <button className="w-6 h-6 rounded hover:bg-cyan-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 text-xs flex items-center justify-center">
              2
            </button>
          </div>
        </div>

      </div>

      {/* Alertas de Atividade */}
      <div className="bg-[#e0f7fb] dark:bg-[#132234] backdrop-blur-md border border-[#cbd5e1] dark:border-[#1e293b] rounded-xl p-5 shadow-lg">
        <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100 mb-4">Alertas de Atividade Recentes</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-300 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-rose-700 dark:text-rose-300">Bateria Crítica</h4>
              <p className="text-xs text-rose-800/80 dark:text-rose-200/80 mt-1 leading-relaxed">
                O dispositivo de Carla Mendes está com 12% de carga. Sugira o carregamento no posto da sala.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-700 dark:text-amber-300">Inatividade Detectada</h4>
              <p className="text-xs text-amber-800/80 dark:text-amber-200/80 mt-1 leading-relaxed">
                Diego Fernandes está sem interações com o GeoGebra há mais de 5 minutos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Confirm End Class */}
      <Modal
        isOpen={isEndClassModalOpen}
        onClose={() => setIsEndClassModalOpen(false)}
        title="Encerrar Aula em Andamento?"
        subtitle="Todos os smartphones receberão a sinalização de término e desbloqueio imediato."
      >
        <div className="space-y-4 text-xs text-slate-700 dark:text-zinc-300">
          <div className="p-3 bg-white dark:bg-zinc-950 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg leading-relaxed">
            Ao confirmar o encerramento, o launcher Android nos smartphones dos alunos voltará para o uso comum e a sala ficará liberada para o próximo professor.
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              onClick={() => setIsEndClassModalOpen(false)}
              className="px-4 py-2 text-slate-700 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmEndAula}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg transition-colors"
            >
              Confirmar e Encerrar Aula
            </button>
          </div>
        </div>
      </Modal>

      {/* Focus Broadcast Modal */}
      <FocusBroadcastModal
        isOpen={isBroadcastModalOpen}
        onClose={() => setIsBroadcastModalOpen(false)}
        defaultSalaId={sala.id}
      />

      {/* Dynamic QR Code Modal */}
      <QRCodeGeneratorModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        salaId={sala.id}
        aulaId={activeAula.id}
      />
    </div>
  );
}
