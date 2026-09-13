"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Wifi, 
  School, 
  Calendar, 
  Plus, 
  CalendarDays, 
  ChevronRight, 
  MoreHorizontal, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Grid, 
  ArrowUpRight,
  TrendingUp,
  ShieldCheck
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Modal } from "@/components/ui/Modal";

export default function DashboardPage() {
  const { aulas, turmas, salas, finishAula } = useApp();
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedActionMenu, setSelectedActionMenu] = useState<string | null>(null);

  const activeAulas = aulas.filter(a => a.status === "Ao vivo" || a.status === "Alerta" || a.status === "Ociosa");

  return (
    <div className="space-y-6">
      {/* Top Header matching PDF Page 7 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Visão Geral</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Bem-vindo de volta ao painel de gestão do Modo Aula.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCalendarModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-all"
          >
            <CalendarDays className="w-4 h-4 text-slate-500" />
            <span>Calendário Acadêmico</span>
          </button>

          <Link
            href="/aulas/nova"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#1683D8] hover:bg-blue-600 rounded-lg shadow-sm shadow-blue-500/20 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Nova Aula</span>
          </Link>
        </div>
      </div>

      {/* Top 4 Stat Cards matching PDF Page 7 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Turmas Ativas"
          value="12"
          comparison="+2 vs. semana passada"
          isPositive={true}
          icon={Users}
        />
        <StatCard
          title="Alunos Conectados"
          value="248"
          comparison="+15% vs. semana passada"
          isPositive={true}
          icon={Wifi}
        />
        <StatCard
          title="Salas Disponíveis"
          value="04"
          comparison="-1 vs. semana passada"
          isPositive={false}
          icon={School}
        />
        <StatCard
          title="Aulas Hoje"
          value="36"
          comparison="ESTÁVEL vs. semana passada"
          isPositive={null}
          icon={Calendar}
        />
      </div>

      {/* Main Grid: Live Classes Table & Right Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Aulas em Andamento Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Aulas em Andamento</h2>
              <p className="text-xs text-slate-400 mt-0.5">Monitoramento em tempo real das sessões ativas.</p>
            </div>
            <Link
              href="/salas"
              className="text-xs font-semibold text-[#1683D8] hover:text-blue-700 flex items-center gap-1 group"
            >
              <span>Ver monitoramento</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                  <th className="py-3 px-5">Disciplina / Turma</th>
                  <th className="py-3 px-5">Sala</th>
                  <th className="py-3 px-5">Horário</th>
                  <th className="py-3 px-5">Alunos</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {activeAulas.map((aula) => (
                  <tr key={aula.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-5">
                      <p className="font-bold text-slate-900">{aula.disciplina}</p>
                      <p className="text-slate-400 text-[11px]">{aula.turmaNome} • {aula.professor}</p>
                    </td>
                    <td className="py-3.5 px-5 text-slate-600 font-medium">
                      {aula.sala}
                    </td>
                    <td className="py-3.5 px-5 text-slate-500 font-mono text-[11px]">
                      {aula.horarioInicio}
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{aula.alunosPresentes}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <StatusBadge status={aula.status} />
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() => setSelectedActionMenu(selectedActionMenu === aula.id ? null : aula.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>

                        {selectedActionMenu === aula.id && (
                          <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1 text-left">
                            <Link
                              href={"/salas/" + aula.salaId + "/status"}
                              className="block px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                            >
                              Ver Monitoramento
                            </Link>
                            <Link
                              href={"/aulas/" + aula.id + "/configuracao"}
                              className="block px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                            >
                              Configurar Apps
                            </Link>
                            <button
                              onClick={() => {
                                finishAula(aula.id);
                                setSelectedActionMenu(null);
                              }}
                              className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50"
                            >
                              Encerrar Aula
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards (converted from table) */}
          <div className="sm:hidden divide-y divide-slate-100 p-3">
            {activeAulas.map((aula) => (
              <div key={aula.id} className="p-3 bg-slate-50/50 rounded-lg mb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{aula.disciplina}</h3>
                    <p className="text-[11px] text-slate-400">{aula.turmaNome} • {aula.professor}</p>
                  </div>
                  <StatusBadge status={aula.status} size="sm" />
                </div>
                <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>{aula.sala} • {aula.horarioInicio}</span>
                  <span className="font-semibold text-slate-700">👥 {aula.alunosPresentes} alunos</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link
                    href={"/salas/" + aula.salaId + "/status"}
                    className="flex-1 py-1.5 text-center text-[11px] font-semibold bg-white border border-slate-200 rounded-md text-[#1683D8]"
                  >
                    Monitorar
                  </Link>
                  <button
                    onClick={() => finishAula(aula.id)}
                    className="px-3 py-1.5 text-center text-[11px] font-semibold bg-rose-50 border border-rose-200 rounded-md text-rose-600"
                  >
                    Encerrar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Uso de Apps & Atividade Recente */}
        <div className="space-y-6">
          
          {/* Card: Uso de Apps matching PDF dark blue widget */}
          <div className="bg-[#0B1E3B] text-white rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold tracking-tight">Uso de Apps</h3>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              O engajamento com apps educacionais cresceu 12% nesta manhã em comparação à média diária.
            </p>

            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-200">GeoGebra</span>
                  <span className="text-blue-400">82%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#1683D8] h-full rounded-full w-[82%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-200">Google Classroom</span>
                  <span className="text-blue-400">65%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-sky-400 h-full rounded-full w-[65%]" />
                </div>
              </div>
            </div>

            <Link
              href="/relatorios"
              className="mt-5 w-full block text-center py-2.5 px-3 text-xs font-bold bg-[#1683D8] hover:bg-blue-600 text-white rounded-lg transition-colors shadow-sm"
            >
              Ver Relatório Completo
            </Link>
          </div>

          {/* Card: Atividade Recente matching PDF */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Atividade Recente</h3>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-800">Chamada concluída: 1º A</p>
                  <p className="text-[11px] text-slate-400">Há 10 minutos • Matemática</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-800">Novo App Adicionado</p>
                  <p className="text-[11px] text-slate-400">Há 45 minutos • 'Duolingo' liberado</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-800">Alerta de Conexão</p>
                  <p className="text-[11px] text-slate-400">Há 1 hora • Lab 2: 5 tablets offline</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-800">Relatório Semanal</p>
                  <p className="text-[11px] text-slate-400">Hoje, 07:30 • Pronto para revisão</p>
                </div>
              </div>
            </div>

            <Link
              href="/configuracoes?tab=logs"
              className="mt-4 block text-center text-xs font-semibold text-slate-500 hover:text-slate-800 pt-3 border-t border-slate-100"
            >
              Ver histórico completo
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom 2 Cards matching PDF footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Próximas Aulas */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 flex items-start gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="p-2.5 rounded-lg bg-blue-50 text-[#1683D8] shrink-0">
            <Clock className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Próximas Aulas</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Você tem 3 aulas agendadas para o próximo período. Todas as salas estão preparadas.
            </p>
            <div className="mt-2.5 flex items-center gap-3 text-xs font-semibold text-[#1683D8]">
              <span className="bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">Biologia - 10:00</span>
              <span className="bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">Química - 10:45</span>
            </div>
          </div>
        </div>

        {/* Saúde do Sistema */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 flex items-start gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
            <Activity className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Saúde do Sistema</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Todos os 32 hubs de conexão e sensores NFC estão operando dentro dos parâmetros normais de latência.
            </p>
            <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>STATUS: NORMAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Calendar Modal */}
      <Modal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        title="Calendário Acadêmico 2026"
        subtitle="Grade de aulas e sincronização automática de horários"
        maxWidth="lg"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            As políticas de Modo Aula são ativadas automaticamente 5 minutos antes do início previsto e encerradas pontualmente ao término do bloco.
          </p>

          <div className="border border-slate-200 rounded-lg divide-y divide-slate-100">
            <div className="p-3 bg-slate-50 font-bold text-slate-700 flex justify-between">
              <span>Bloco Matutino</span>
              <span>07:30 — 12:50</span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <span>1º Período (Matemática / Física)</span>
              <span className="font-mono text-slate-500">07:30 - 09:10</span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <span>Intervalo Pedagógico</span>
              <span className="font-mono text-slate-400">09:10 - 09:30</span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <span>2º Período (História / Português)</span>
              <span className="font-mono text-slate-500">09:30 - 11:10</span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <span>3º Período (Química / Biologia)</span>
              <span className="font-mono text-slate-500">11:20 - 13:00</span>
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={() => setIsCalendarModalOpen(false)}
              className="px-4 py-2 bg-[#1683D8] text-white font-bold rounded-lg"
            >
              Fechar Calendário
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
