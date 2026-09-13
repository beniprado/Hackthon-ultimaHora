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
  ShieldAlert, 
  MoreHorizontal, 
  ArrowLeft,
  CheckCircle2,
  Radio,
  Clock,
  Sparkles
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Modal } from "@/components/ui/Modal";

export default function SalaStatusPage({ params }: { params?: { id?: string } }) {
  const { salas, aulas, dispositivos, alertas, finishAula, showToast } = useApp();
  
  const salaId = params?.id || "sala-101";
  const sala = salas.find(s => s.id === salaId) || salas[0];
  const activeAula = aulas.find(a => a.salaId === sala.id && a.status === "Ao vivo") || aulas[0];

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("TODOS");
  const [selectedAlunoMenu, setSelectedAlunoMenu] = useState<string | null>(null);
  const [isEndClassModalOpen, setIsEndClassModalOpen] = useState(false);

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
      {/* Top Header matching PDF Page 11 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Link href="/salas" className="text-slate-400 hover:text-slate-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Status da {sala.nome}</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Aula Ativa
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Iniciada às {activeAula.horarioInicio} • Disciplina: <strong>{activeAula.disciplina}</strong> — {activeAula.professor}
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-all"
          >
            <RefreshCw className="w-4 h-4 text-slate-500" />
            <span>Atualizar Dados</span>
          </button>

          <button
            onClick={() => setIsEndClassModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#1683D8] hover:bg-blue-600 rounded-lg shadow-sm shadow-blue-500/20 transition-all"
          >
            <Power className="w-4 h-4 stroke-[2.5]" />
            <span>Encerrar Aula</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards matching PDF Page 11 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div>
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Dispositivos Conectados</span>
            <Wifi className="w-4 h-4 text-[#1683D8]" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">28/32</p>
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
            +2 novos agora
          </span>
        </div>

        <div>
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Alunos em Atividade</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">24</p>
          <span className="text-[10px] text-slate-400">85% em conformidade</span>
        </div>

        <div>
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Apps Restritos em Uso</span>
            <Lock className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">0</p>
          <span className="text-[10px] text-emerald-600 font-medium">Bloqueios automáticos 100%</span>
        </div>

        <div>
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Alertas de Sistema</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">{alertas.length}</p>
          <span className="text-[10px] text-rose-600 font-medium">Atenção requerida</span>
        </div>
      </div>

      {/* Real-time Monitoring Table matching PDF Page 11 */}
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
        
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Monitoramento em Tempo Real</h2>
            <p className="text-xs text-slate-400 mt-0.5">Listagem detalhada por aluno e status de conexão.</p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Pesquisar aluno ou app..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1683D8]/20 focus:border-[#1683D8]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1.5 px-3 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none"
            >
              <option value="TODOS">Todos os status</option>
              <option value="Conectado">Conectado</option>
              <option value="Ocioso">Ocioso</option>
              <option value="Bloqueado">Bloqueado</option>
              <option value="Desconectado">Desconectado</option>
            </select>
          </div>
        </div>

        {/* Desktop Table matching PDF Page 11 */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3.5 px-5">Aluno</th>
                <th className="py-3.5 px-5">Dispositivo</th>
                <th className="py-3.5 px-5">App Ativo</th>
                <th className="py-3.5 px-5">Bateria</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredDispositivos.map((dev) => (
                <tr key={dev.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-5 font-bold text-slate-900">
                    {dev.alunoNome}
                  </td>
                  <td className="py-4 px-5 text-slate-600">
                    <div className="flex items-center gap-2">
                      {dev.os === "Android" ? (
                        <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                      ) : dev.os === "iOS" ? (
                        <Tablet className="w-3.5 h-3.5 text-slate-400" />
                      ) : (
                        <Laptop className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span>{dev.modeloDispositivo}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-slate-700 font-medium">
                    {dev.appAtivo}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2 w-28">
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={"h-full rounded-full " + (
                            dev.bateriaPercentual <= 15 ? "bg-rose-500" :
                            dev.bateriaPercentual <= 45 ? "bg-amber-500" :
                            "bg-emerald-500"
                          )}
                          style={{ width: dev.bateriaPercentual + "%" }}
                        />
                      </div>
                      <span className="font-mono text-[11px] text-slate-500">{dev.bateriaPercentual}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <StatusBadge status={dev.status} />
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => setSelectedAlunoMenu(selectedAlunoMenu === dev.id ? null : dev.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
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
        <div className="md:hidden divide-y divide-slate-100 p-4 space-y-3">
          {filteredDispositivos.map((dev) => (
            <div key={dev.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{dev.alunoNome}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{dev.modeloDispositivo}</p>
                </div>
                <StatusBadge status={dev.status} size="sm" />
              </div>
              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                <span>App: <strong className="text-slate-800">{dev.appAtivo}</strong></span>
                <span className="font-mono font-semibold">🔋 {dev.bateriaPercentual}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination matching PDF Page 11 */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <p>Exibindo {filteredDispositivos.length} de {dispositivos.length} alunos presentes</p>
          <div className="flex items-center gap-1">
            <button className="w-6 h-6 rounded bg-[#1683D8] text-white font-bold text-xs flex items-center justify-center">
              1
            </button>
            <button className="w-6 h-6 rounded hover:bg-slate-100 text-slate-600 text-xs flex items-center justify-center">
              2
            </button>
            <button className="w-6 h-6 rounded hover:bg-slate-100 text-slate-600 text-xs flex items-center justify-center">
              3
            </button>
          </div>
        </div>

      </div>

      {/* Alertas de Atividade matching PDF Page 11 */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Alertas de Atividade</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-rose-900">Bateria Crítica</h4>
              <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                O dispositivo de Carla Mendes está com 12% de carga. Sugira o carregamento.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-900">Inatividade Detectada</h4>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                Diego Fernandes está sem interações há mais de 5 minutos.
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
        subtitle="Todos os dispositivos conectados receberão a sinalização de término e desbloqueio imediato."
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-slate-700 leading-relaxed">
            Ao confirmar o encerramento, o launcher Android nos smartphones dos alunos voltará para o uso comum e a Tag NFC da sala ficará liberada para o próximo professor.
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              onClick={() => setIsEndClassModalOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmEndAula}
              className="px-4 py-2 bg-[#1683D8] hover:bg-blue-600 text-white font-bold rounded-lg"
            >
              Confirmar e Encerrar Aula
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
