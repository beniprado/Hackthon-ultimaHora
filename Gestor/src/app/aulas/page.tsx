"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Plus, 
  Search, 
  Play, 
  Settings, 
  Clock, 
  Users, 
  MapPin
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AulaStatus } from "@/types";

export default function AulasPage() {
  const { aulas, startAula, finishAula } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("TODOS");

  const filteredAulas = aulas.filter(a => {
    const matchesSearch = 
      a.disciplina.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.turmaNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.sala.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "TODOS" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">Gerenciamento de Aulas</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Visualize, configure e controle as sessões de aula e suas políticas pedagógicas.
          </p>
        </div>

        <Link
          href="/aulas/nova"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-violet-600 hover:bg-violet-500 rounded-lg shadow-md shadow-violet-600/20 border border-violet-500/30 transition-all self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ Nova Aula</span>
        </Link>
      </div>

      {/* Main Table */}
      <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-xl shadow-lg overflow-hidden backdrop-blur-md">
        <div className="p-5 border-b border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-zinc-100">Listagem de Aulas Programadas</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Sessões cadastradas com restrições de aplicativos</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Pesquisar por disciplina ou professor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-950/80 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-violet-500 rounded-lg"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1.5 px-3 text-xs bg-zinc-950/80 border border-zinc-800 rounded-lg text-zinc-200 font-medium focus:outline-none focus:border-violet-500"
            >
              <option value="TODOS">Todos os status</option>
              <option value="Ao vivo">Ao vivo</option>
              <option value="Agendada">Agendada</option>
              <option value="Finalizada">Finalizada</option>
              <option value="Alerta">Alerta</option>
              <option value="Ociosa">Ociosa</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/80 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider bg-zinc-950/60">
                <th className="py-3.5 px-5">Disciplina / Turma</th>
                <th className="py-3.5 px-5">Professor</th>
                <th className="py-3.5 px-5">Sala</th>
                <th className="py-3.5 px-5">Horário</th>
                <th className="py-3.5 px-5">Apps Liberados</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 text-xs">
              {filteredAulas.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-zinc-500">
                    Nenhuma aula encontrada para os critérios informados.
                  </td>
                </tr>
              ) : (
                filteredAulas.map((aula) => (
                  <tr key={aula.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-4 px-5">
                      <p className="font-bold text-zinc-100">{aula.disciplina}</p>
                      <p className="text-zinc-400 text-[11px]">{aula.turmaNome}</p>
                    </td>
                    <td className="py-4 px-5 text-zinc-300">
                      {aula.professor}
                    </td>
                    <td className="py-4 px-5 text-zinc-300 font-medium">
                      {aula.sala}
                    </td>
                    <td className="py-4 px-5 text-zinc-400 font-mono text-[11px]">
                      {aula.horarioInicio} - {aula.horarioFim}
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-violet-950/80 text-violet-300 font-bold text-[11px] border border-violet-800/60">
                        {aula.appsPermitidosIds.length} Apps
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <StatusBadge status={aula.status} />
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {aula.status === "Ao vivo" ? (
                          <button
                            onClick={() => finishAula(aula.id)}
                            className="px-2.5 py-1 text-[11px] font-bold text-rose-300 bg-rose-950/40 border border-rose-800/60 rounded-md hover:bg-rose-900/50 transition-colors"
                          >
                            Encerrar
                          </button>
                        ) : (
                          <button
                            onClick={() => startAula(aula.id)}
                            className="px-2.5 py-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/40 border border-emerald-800/60 rounded-md hover:bg-emerald-900/50 transition-colors flex items-center gap-1"
                          >
                            <Play className="w-3 h-3" /> Iniciar
                          </button>
                        )}

                        <Link
                          href={"/aulas/" + aula.id + "/configuracao"}
                          className="p-1.5 text-zinc-400 hover:text-violet-300 hover:bg-zinc-800 rounded-md transition-colors"
                          title="Configurar Políticas e Apps"
                        >
                          <Settings className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
