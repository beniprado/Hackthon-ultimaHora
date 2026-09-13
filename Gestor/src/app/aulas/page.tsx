"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Plus, 
  Search, 
  Play, 
  CheckCircle, 
  Settings, 
  Clock, 
  Users, 
  MapPin,
  MoreHorizontal
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AulaStatus } from "@/types";

export default function AulasPage() {
  const { aulas, startAula, finishAula, showToast } = useApp();
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gerenciamento de Aulas</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Visualize, configure e controle as sessões de aula e suas políticas pedagógicas.
          </p>
        </div>

        <Link
          href="/aulas/nova"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1683D8] hover:bg-blue-600 rounded-lg shadow-sm shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ Nova Aula</span>
        </Link>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-base font-bold text-slate-900">Listagem de Aulas Programadas</h2>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Pesquisar por disciplina ou professor..."
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
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3.5 px-5">Disciplina / Turma</th>
                <th className="py-3.5 px-5">Professor</th>
                <th className="py-3.5 px-5">Sala</th>
                <th className="py-3.5 px-5">Horário</th>
                <th className="py-3.5 px-5">Apps Liberados</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredAulas.map((aula) => (
                <tr key={aula.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-5">
                    <p className="font-bold text-slate-900">{aula.disciplina}</p>
                    <p className="text-slate-400 text-[11px]">{aula.turmaNome}</p>
                  </td>
                  <td className="py-4 px-5 text-slate-700">
                    {aula.professor}
                  </td>
                  <td className="py-4 px-5 text-slate-600 font-medium">
                    {aula.sala}
                  </td>
                  <td className="py-4 px-5 text-slate-500 font-mono text-[11px]">
                    {aula.horarioInicio} - {aula.horarioFim}
                  </td>
                  <td className="py-4 px-5">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1683D8] font-bold text-[11px] border border-blue-200">
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
                          className="px-2.5 py-1 text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-md hover:bg-rose-100 transition-colors"
                        >
                          Encerrar
                        </button>
                      ) : (
                        <button
                          onClick={() => startAula(aula.id)}
                          className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-100 transition-colors flex items-center gap-1"
                        >
                          <Play className="w-3 h-3" /> Iniciar
                        </button>
                      )}

                      <Link
                        href={"/aulas/" + aula.id + "/configuracao"}
                        className="p-1 text-slate-400 hover:text-[#1683D8] rounded-md hover:bg-slate-100"
                        title="Configurar Políticas e Apps"
                      >
                        <Settings className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
