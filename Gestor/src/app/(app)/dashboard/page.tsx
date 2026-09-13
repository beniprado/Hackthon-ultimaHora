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
  ShieldCheck,
  QrCode,
  Radio
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Modal } from "@/components/ui/Modal";
import { FocusBroadcastModal } from "@/components/pedagogical/FocusBroadcastModal";
import { QRCodeGeneratorModal } from "@/components/security/QRCodeGeneratorModal";

export default function DashboardPage() {
  const { aulas, turmas, salas, finishAula } = useApp();
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [selectedActionMenu, setSelectedActionMenu] = useState<string | null>(null);

  const activeAulas = aulas.filter(a => a.status === "Ao vivo" || a.status === "Alerta" || a.status === "Ociosa");

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Visão Geral</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Painel de controle OnFocus — Gestão pedagógica, foco ativo e telemetria segura.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Button 1: Gerar QR Code da Sala */}
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#0e7c93] dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-950/70 hover:bg-cyan-200 dark:hover:bg-cyan-900/80 border border-cyan-300 dark:border-cyan-800/80 rounded-lg shadow-md shadow-cyan-950/10 dark:shadow-cyan-950/40 transition-all active:scale-95"
            title="Exibir QR Code ECDSA da carteira/sala"
          >
            <QrCode className="w-4 h-4 text-[#0e7c93] dark:text-cyan-400" />
            <span>Gerar QR Code da Sala</span>
          </button>

          {/* Button 2: Transmitir para Alunos */}
          <button
            onClick={() => setIsBroadcastModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white dark:text-slate-950 bg-[#0e7c93] hover:bg-[#0b6376] dark:bg-cyan-500 dark:hover:bg-cyan-400 rounded-lg shadow-md shadow-cyan-500/20 transition-all active:scale-95"
            title="Disparar comandos em tempo real para os dispositivos"
          >
            <Radio className="w-4 h-4" />
            <span>Transmitir para Alunos</span>
          </button>

          {/* Button 3: Calendário */}
          <button
            onClick={() => setIsCalendarModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 border border-[#cbd5e1] dark:border-[#1e293b] rounded-lg shadow-sm transition-all"
          >
            <CalendarDays className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
            <span>Calendário</span>
          </button>

          {/* Link: Nova Aula */}
          <Link
            href="/aulas/nova"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-[#cbd5e1] dark:border-slate-700/80 rounded-lg transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Nova Aula</span>
          </Link>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
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
        <div className="lg:col-span-2 bg-[#e0f7fb] dark:bg-[#132234] backdrop-blur-md border border-[#cbd5e1] dark:border-[#1e293b] rounded-xl shadow-xl shadow-slate-900/5 dark:shadow-black/20 overflow-hidden">
          <div className="p-5 border-b border-[#cbd5e1] dark:border-[#1e293b] flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Aulas em Andamento</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Sessões ativas com política pedagógica OnFocus aplicada.</p>
            </div>
            <Link
              href="/salas"
              className="text-xs font-semibold text-[#0e7c93] dark:text-cyan-400 hover:text-[#0b6376] dark:hover:text-cyan-300 flex items-center gap-1 group"
            >
              <span>Ver monitoramento</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#cbd5e1] dark:border-[#1e293b] text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-white/60 dark:bg-slate-950/60">
                  <th className="py-3 px-5">Disciplina / Turma</th>
                  <th className="py-3 px-5">Sala</th>
                  <th className="py-3 px-5">Horário</th>
                  <th className="py-3 px-5">Alunos</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#cbd5e1]/60 dark:divide-slate-800/60 text-xs bg-white/30 dark:bg-slate-900/40">
                {activeAulas.map((aula) => (
                  <tr key={aula.id} className="hover:bg-cyan-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-5">
                      <p className="font-bold text-slate-900 dark:text-white">{aula.disciplina}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">{aula.turmaNome} • {aula.professor}</p>
                    </td>
                    <td className="py-3.5 px-5 text-slate-700 dark:text-slate-300 font-medium">
                      {aula.sala}
                    </td>
                    <td className="py-3.5 px-5 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      {aula.horarioInicio}
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                        <Users className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
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
                          className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>

                        {selectedActionMenu === aula.id && (
                          <div className="absolute right-0 mt-1 w-44 bg-[#e0f7fb] dark:bg-slate-900 border border-[#cbd5e1] dark:border-slate-800 rounded-lg shadow-2xl shadow-slate-900/20 dark:shadow-black/90 z-20 py-1 text-left">
                            <Link
                              href={"/salas/" + aula.salaId + "/status"}
                              className="block px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-cyan-100 dark:hover:bg-slate-800"
                            >
                              Ver Monitoramento
                            </Link>
                            <Link
                              href={"/aulas/" + aula.id + "/configuracao"}
                              className="block px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-cyan-100 dark:hover:bg-slate-800"
                            >
                              Configurar Apps
                            </Link>
                            <button
                              onClick={() => {
                                setIsBroadcastModalOpen(true);
                                setSelectedActionMenu(null);
                              }}
                              className="w-full text-left px-3 py-1.5 text-xs text-[#0e7c93] dark:text-cyan-400 hover:bg-cyan-100 dark:hover:bg-slate-800"
                            >
                              Transmitir Comando
                            </button>
                            <button
                              onClick={() => {
                                finishAula(aula.id);
                                setSelectedActionMenu(null);
                              }}
                              className="w-full text-left px-3 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/30"
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
          <div className="sm:hidden divide-y divide-[#cbd5e1]/60 dark:divide-slate-800/60 p-3">
            {activeAulas.map((aula) => (
              <div key={aula.id} className="p-3.5 bg-white/80 dark:bg-slate-950/60 rounded-xl mb-2 border border-[#cbd5e1] dark:border-slate-800/80">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">{aula.disciplina}</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{aula.turmaNome} • {aula.professor}</p>
                  </div>
                  <StatusBadge status={aula.status} size="sm" />
                </div>
                <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-[#cbd5e1] dark:border-slate-800/80">
                  <span>{aula.sala} • {aula.horarioInicio}</span>
                  <span className="font-semibold text-slate-800 dark:text-zinc-200">👥 {aula.alunosPresentes} alunos</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link
                    href={"/salas/" + aula.salaId + "/status"}
                    className="flex-1 py-1.5 text-center text-[11px] font-semibold bg-cyan-100 dark:bg-slate-800/80 border border-cyan-300 dark:border-slate-700 rounded-md text-[#0e7c93] dark:text-cyan-300"
                  >
                    Monitorar
                  </Link>
                  <button
                    onClick={() => finishAula(aula.id)}
                    className="px-3 py-1.5 text-center text-[11px] font-semibold bg-rose-100 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800/60 rounded-md text-rose-600 dark:text-rose-300"
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
          
          {/* Card: Uso de Apps */}
          <div className="bg-gradient-to-br from-cyan-100/70 via-[#e0f7fb] to-[#e0f7fb] dark:from-cyan-950/40 dark:via-[#132234] dark:to-[#132234] border border-cyan-300 dark:border-cyan-900/40 text-slate-900 dark:text-zinc-100 rounded-xl p-5 shadow-xl shadow-slate-900/5 dark:shadow-black/20 relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#0e7c93] dark:text-cyan-400" />
                <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">Uso de Ferramentas</h3>
              </div>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-[#0e7c93] dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800/60">
                Whitelist
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              O engajamento com apps educacionais cresceu 12% nesta manhã em comparação à média diária.
            </p>

            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800 dark:text-zinc-200">GeoGebra (Geometria Dinâmica)</span>
                  <span className="text-[#0e7c93] dark:text-cyan-400">82%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#0e7c93] dark:bg-cyan-400 h-full rounded-full w-[82%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800 dark:text-zinc-200">Calculadora Científica</span>
                  <span className="text-emerald-600 dark:text-emerald-400">65%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full w-[65%]" />
                </div>
              </div>
            </div>

            <Link
              href="/relatorios"
              className="mt-5 w-full block text-center py-2.5 px-3 text-xs font-bold bg-[#0e7c93] hover:bg-[#0b6376] dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 rounded-lg transition-colors shadow-md shadow-cyan-500/20"
            >
              Ver Relatório Completo
            </Link>
          </div>

          {/* Card: Atividade Recente */}
          <div className="bg-[#e0f7fb] dark:bg-[#132234] border border-[#cbd5e1] dark:border-[#1e293b] rounded-xl p-5 shadow-xl shadow-slate-900/5 dark:shadow-black/20 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Atividade Recente</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#0e7c93] dark:bg-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-zinc-200">Chamada concluída: 1º A</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Há 10 minutos • Matemática</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-zinc-200">Novo App Adicionado</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Há 45 minutos • 'GeoGebra' atualizado</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-zinc-200">Intervenção de Foco (LGPD)</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Há 1 hora • Redirecionado amigavelmente</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#0e7c93] dark:bg-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-zinc-200">Rotação de Token ECDSA</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Hoje, 08:36 • Novo nonce gerado</p>
                </div>
              </div>
            </div>

            <Link
              href="/configuracoes?tab=logs"
              className="mt-4 block text-center text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white pt-3 border-t border-[#cbd5e1] dark:border-[#1e293b]"
            >
              Ver histórico completo
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom 2 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Próximas Aulas */}
        <div className="bg-[#e0f7fb] dark:bg-[#132234] border border-[#cbd5e1] dark:border-[#1e293b] rounded-xl p-5 flex items-start gap-4 shadow-xl shadow-slate-900/5 dark:shadow-black/20 backdrop-blur-md">
          <div className="p-2.5 rounded-lg bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800/60 text-[#0e7c93] dark:text-cyan-400 shrink-0">
            <Clock className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Próximas Aulas</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Você tem 3 aulas agendadas para o próximo período. Todas as salas estão preparadas com políticas pré-carregadas.
            </p>
            <div className="mt-2.5 flex items-center gap-3 text-xs font-semibold">
              <span className="bg-white dark:bg-slate-950 px-2.5 py-1 rounded-md border border-[#cbd5e1] dark:border-slate-800 text-[#0e7c93] dark:text-cyan-300">Biologia - 10:00</span>
              <span className="bg-white dark:bg-slate-950 px-2.5 py-1 rounded-md border border-[#cbd5e1] dark:border-slate-800 text-[#0e7c93] dark:text-cyan-300">Química - 10:45</span>
            </div>
          </div>
        </div>

        {/* Saúde do Sistema */}
        <div className="bg-[#e0f7fb] dark:bg-[#132234] border border-[#cbd5e1] dark:border-[#1e293b] rounded-xl p-5 flex items-start gap-4 shadow-xl shadow-slate-900/5 dark:shadow-black/20 backdrop-blur-md">
          <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 shrink-0">
            <Activity className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Saúde da Rede & Hubs</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Todos os pontos de presença Wi-Fi escolar e validadores criptográficos ECDSA estão operando com latência &lt; 20ms.
            </p>
            <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
              <span>STATUS: ESTÁVEL & SEGURO</span>
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
        <div className="space-y-4 text-xs text-slate-700 dark:text-zinc-300">
          <p className="text-slate-500 dark:text-zinc-400">
            As políticas de Modo Aula são ativadas automaticamente 5 minutos antes do início previsto e encerradas pontualmente ao término do bloco.
          </p>

          <div className="border border-[#cbd5e1] dark:border-zinc-800 rounded-lg divide-y divide-[#cbd5e1]/80 dark:divide-zinc-800/80 bg-white/60 dark:bg-zinc-950/60">
            <div className="p-3 bg-slate-100 dark:bg-zinc-900 font-bold text-slate-900 dark:text-zinc-200 flex justify-between">
              <span>Bloco Matutino</span>
              <span className="text-[#0e7c93] dark:text-cyan-400">07:30 — 12:50</span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <span>1º Período (Matemática / Física)</span>
              <span className="font-mono text-slate-500 dark:text-zinc-400">07:30 - 09:10</span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <span>Intervalo Pedagógico</span>
              <span className="font-mono text-slate-400 dark:text-zinc-500">09:10 - 09:30</span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <span>2º Período (História / Português)</span>
              <span className="font-mono text-slate-500 dark:text-zinc-400">09:30 - 11:10</span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <span>3º Período (Química / Biologia)</span>
              <span className="font-mono text-slate-500 dark:text-zinc-400">11:20 - 13:00</span>
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={() => setIsCalendarModalOpen(false)}
              className="px-4 py-2 bg-[#0e7c93] hover:bg-[#0b6376] dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold rounded-lg transition-colors shadow-md shadow-cyan-500/20"
            >
              Fechar Calendário
            </button>
          </div>
        </div>
      </Modal>

      {/* Dynamic QR Code Modal */}
      <QRCodeGeneratorModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        salaId="sala-101"
        aulaId="aula-1"
      />

      {/* Focus Broadcast Modal */}
      <FocusBroadcastModal
        isOpen={isBroadcastModalOpen}
        onClose={() => setIsBroadcastModalOpen(false)}
        defaultSalaId="sala-101"
      />
    </div>
  );
}
