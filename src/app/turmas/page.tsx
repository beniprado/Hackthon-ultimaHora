"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  BookOpen, 
  Clock, 
  Trash2, 
  Edit3, 
  CheckCircle,
  Eye
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Modal } from "@/components/ui/Modal";
import { TurmaStatus } from "@/types";

export default function TurmasPage() {
  const { turmas, addTurma, deleteTurma, showToast } = useApp();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("TODOS");
  const [isNewTurmaModalOpen, setIsNewTurmaModalOpen] = useState(false);
  const [selectedTurmaActions, setSelectedTurmaActions] = useState<string | null>(null);

  // New Turma Form State
  const [nome, setNome] = useState("");
  const [disciplina, setDisciplina] = useState("Matemática");
  const [professor, setProfessor] = useState("Ricardo Silva");
  const [sala, setSala] = useState("Sala 101");
  const [horario, setHorario] = useState("07:30 - 09:10");
  const [totalAlunos, setTotalAlunos] = useState(30);
  const [status, setStatus] = useState<TurmaStatus>("Ativa");

  const filteredTurmas = turmas.filter(t => {
    const matchesSearch = 
      t.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.disciplina.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.sala.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "TODOS" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateTurma = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome) return;
    addTurma({
      nome,
      ano: nome.includes("9") ? "9º Ano" : nome.split(" ")[0] + " Ano",
      disciplina,
      professor,
      sala,
      horario,
      totalAlunos: Number(totalAlunos),
      status
    });
    setIsNewTurmaModalOpen(false);
    setNome("");
  };

  const handleExportCSV = () => {
    const rows = [
      "Turma,Disciplina,Professor,Sala,Horário,Status,TotalAlunos",
      ...filteredTurmas.map(t => `"${t.nome}","${t.disciplina}","${t.professor}","${t.sala}","${t.horario}","${t.status}",${t.totalAlunos}`)
    ];
    const csvContent = "data:text/csv;charset=utf-8," + rows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "turmas_modo_aula.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exportação CSV gerada com sucesso!");
  };

  return (
    <div className="space-y-6">
      {/* Header matching PDF Page 8 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gerenciamento de Turmas</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Visualize e gerencie todas as turmas cadastradas na instituição.
          </p>
        </div>

        <button
          onClick={() => setIsNewTurmaModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1683D8] hover:bg-blue-600 rounded-lg shadow-sm shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ Nova turma</span>
        </button>
      </div>

      {/* Top 4 Stat Cards matching PDF Page 8 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-blue-50 text-[#1683D8]">
            <Users className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">12</p>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Turmas Ativas</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600">
            <GraduationCap className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">342</p>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total de Alunos</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-sky-50 text-sky-600">
            <Calendar className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">08</p>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Aulas Hoje</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
            <MapPin className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">14</p>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Salas Disponíveis</p>
          </div>
        </div>
      </div>

      {/* Main Table Container matching PDF Page 8 */}
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
        
        {/* Table Top Controls */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Listagem de Turmas</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Pesquisar por turma, disciplina..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1683D8]/20 focus:border-[#1683D8]"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1.5 px-3 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-[#1683D8]"
            >
              <option value="TODOS">Todos os status</option>
              <option value="Ativa">Ativa</option>
              <option value="Agendada">Agendada</option>
              <option value="Finalizada">Finalizada</option>
            </select>

            {/* Export Button */}
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Exportar</span>
            </button>
          </div>
        </div>

        {/* Desktop Table matching PDF Page 8 */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3.5 px-5">Turma</th>
                <th className="py-3.5 px-5">Disciplina</th>
                <th className="py-3.5 px-5">Professor</th>
                <th className="py-3.5 px-5">Sala</th>
                <th className="py-3.5 px-5">Horário</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredTurmas.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Nenhuma turma encontrada para os critérios informados.
                  </td>
                </tr>
              ) : (
                filteredTurmas.map((turma) => (
                  <tr key={turma.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-5 font-bold text-slate-900">
                      {turma.nome}
                    </td>
                    <td className="py-4 px-5 text-slate-700 font-medium">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        <span>{turma.disciplina}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-slate-600">
                      {turma.professor}
                    </td>
                    <td className="py-4 px-5 text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{turma.sala}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-slate-500 font-mono text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{turma.horario}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <StatusBadge status={turma.status} />
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() => setSelectedTurmaActions(selectedTurmaActions === turma.id ? null : turma.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>

                        {selectedTurmaActions === turma.id && (
                          <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1 text-left">
                            <Link
                              href="/aulas/nova"
                              className="block px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                            >
                              Agendar Aula
                            </Link>
                            <button
                              onClick={() => {
                                deleteTurma(turma.id);
                                setSelectedTurmaActions(null);
                              }}
                              className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-1.5"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Excluir Turma</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Cards matching mobile requirements */}
        <div className="md:hidden divide-y divide-slate-100 p-4 space-y-3">
          {filteredTurmas.map((turma) => (
            <div key={turma.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/70">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{turma.nome}</h3>
                  <p className="text-xs text-slate-600 font-medium">{turma.disciplina} • {turma.professor}</p>
                </div>
                <StatusBadge status={turma.status} size="sm" />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2.5 border-t border-slate-200/60">
                <span>📍 {turma.sala}</span>
                <span className="font-mono">🕒 {turma.horario}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <Link
                  href="/aulas/nova"
                  className="flex-1 py-1.5 text-center text-xs font-semibold bg-white border border-slate-200 text-[#1683D8] rounded-lg"
                >
                  Agendar Aula
                </Link>
                <button
                  onClick={() => deleteTurma(turma.id)}
                  className="px-3 py-1.5 text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination matching PDF Page 8 */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>Exibindo {filteredTurmas.length} de {turmas.length} turmas cadastradas</p>
          <div className="flex items-center gap-1.5">
            <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50" disabled>
              Anterior
            </button>
            <button className="px-3 py-1.5 bg-[#1683D8] text-white font-bold rounded-lg">
              1
            </button>
            <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50" disabled>
              Próxima
            </button>
          </div>
        </div>

      </div>

      {/* New Turma Modal */}
      <Modal
        isOpen={isNewTurmaModalOpen}
        onClose={() => setIsNewTurmaModalOpen(false)}
        title="Cadastrar Nova Turma"
        subtitle="Preencha as informações para registrar a turma no Modo Aula."
      >
        <form onSubmit={handleCreateTurma} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nome da Turma</label>
            <input
              type="text"
              placeholder="Ex: 3º Ano Ensino Médio - A"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1683D8]/20 focus:border-[#1683D8]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Disciplina</label>
              <input
                type="text"
                placeholder="Ex: Matemática"
                value={disciplina}
                onChange={(e) => setDisciplina(e.target.value)}
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Professor Responsável</label>
              <input
                type="text"
                placeholder="Ex: Ricardo Silva"
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Sala Padrão</label>
              <input
                type="text"
                placeholder="Ex: Sala 101"
                value={sala}
                onChange={(e) => setSala(e.target.value)}
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Horário Típico</label>
              <input
                type="text"
                placeholder="Ex: 07:30 - 09:10"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Capacidade de Alunos</label>
              <input
                type="number"
                value={totalAlunos}
                onChange={(e) => setTotalAlunos(Number(e.target.value))}
                required
                min={1}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Status Inicial</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TurmaStatus)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
              >
                <option value="Ativa">Ativa</option>
                <option value="Agendada">Agendada</option>
                <option value="Finalizada">Finalizada</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsNewTurmaModalOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1683D8] hover:bg-blue-600 text-white font-bold rounded-lg shadow-sm"
            >
              Salvar Turma
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
