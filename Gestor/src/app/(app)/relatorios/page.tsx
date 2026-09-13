"use client";

import React, { useState } from "react";
import { 
  Printer, 
  Download, 
  Share2, 
  Activity, 
  Clock, 
  Sparkles, 
  Users, 
  Filter
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Modal } from "@/components/ui/Modal";

export default function RelatoriosPage() {
  const { logs, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<"visao-geral" | "apps" | "logs">("visao-geral");
  const [periodFilter, setPeriodFilter] = useState("30");
  const [turmaFilter, setTurmaFilter] = useState("TODAS");
  const [disciplinaFilter, setDisciplinaFilter] = useState("TODAS");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Aluno,Turma,Aplicativo,TempoSessao,Status\n"
      + "Ana Beatriz Souza,1º A - Ensino Médio,GeoGebra,45 min,Ativo\n"
      + "Carlos Eduardo Lima,1º A - Ensino Médio,Calculadora,12 min,Concluído\n"
      + "Mariana Oliveira,2º B - Ensino Médio,Duolingo,30 min,Ativo\n"
      + "João Pedro Rocha,1º A - Ensino Médio,GeoGebra,42 min,Ativo\n"
      + "Fernanda Costa,3º C - Ensino Médio,Khan Academy,55 min,Concluído";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "relatorio_engajamento_modo_aula.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Relatório CSV exportado com sucesso!");
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Relatórios e Análises</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Acompanhe o engajamento digital e desempenho das turmas em tempo real.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 border border-[#cbd5e1] dark:border-zinc-700 rounded-lg shadow-sm transition-all"
          >
            <Printer className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
            <span>Imprimir</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 border border-[#cbd5e1] dark:border-zinc-700 rounded-lg shadow-sm transition-all"
          >
            <Download className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
            <span>Exportar CSV</span>
          </button>

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white dark:text-slate-950 bg-[#0e7c93] hover:bg-[#0b6376] dark:bg-cyan-500 dark:hover:bg-cyan-400 rounded-lg shadow-md shadow-[#0e7c93]/20 dark:shadow-cyan-500/20 transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartilhar</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#e0f7fb] dark:bg-[#132234] border border-[#cbd5e1] dark:border-[#1e293b] rounded-xl p-4 shadow-lg backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
            <span>Filtros:</span>
          </span>

          <select
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            className="py-1.5 px-3 bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-200 font-medium focus:outline-none focus:border-cyan-500"
          >
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Último trimestre</option>
          </select>

          <select
            value={turmaFilter}
            onChange={(e) => setTurmaFilter(e.target.value)}
            className="py-1.5 px-3 bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-200 font-medium focus:outline-none focus:border-cyan-500"
          >
            <option value="TODAS">Todas as Turmas</option>
            <option value="1A">1º A - Ensino Médio</option>
            <option value="1B">1º B - Ensino Médio</option>
            <option value="2A">2º A - Ensino Médio</option>
            <option value="3A">3º A - Ensino Médio</option>
          </select>

          <select
            value={disciplinaFilter}
            onChange={(e) => setDisciplinaFilter(e.target.value)}
            className="py-1.5 px-3 bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-200 font-medium focus:outline-none focus:border-cyan-500"
          >
            <option value="TODAS">Todas as Disciplinas</option>
            <option value="MAT">Matemática</option>
            <option value="POR">Português</option>
            <option value="FIS">Física</option>
            <option value="HIS">História</option>
          </select>
        </div>

        <button
          onClick={() => {
            setPeriodFilter("30");
            setTurmaFilter("TODAS");
            setDisciplinaFilter("TODAS");
            showToast("Filtros redefinidos");
          }}
          className="text-xs text-[#0e7c93] dark:text-cyan-400 hover:text-[#0b6376] dark:hover:text-cyan-300 font-semibold transition-colors"
        >
          Limpar Filtros
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#e0f7fb] dark:bg-[#132234] border border-[#cbd5e1] dark:border-[#1e293b] rounded-xl p-5 shadow-lg backdrop-blur-md">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-slate-600 dark:text-zinc-400 uppercase tracking-wider">Aulas Realizadas</span>
            <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800/60 text-[#0e7c93] dark:text-cyan-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-2">142</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">+12% em relação ao mês anterior</p>
        </div>

        <div className="bg-[#e0f7fb] dark:bg-[#132234] border border-[#cbd5e1] dark:border-[#1e293b] rounded-xl p-5 shadow-lg backdrop-blur-md">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-slate-600 dark:text-zinc-400 uppercase tracking-wider">Tempo de Uso Médio</span>
            <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-800/60 text-sky-600 dark:text-sky-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-2">38min</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">+5% por aluno/sessão</p>
        </div>

        <div className="bg-[#e0f7fb] dark:bg-[#132234] border border-[#cbd5e1] dark:border-[#1e293b] rounded-xl p-5 shadow-lg backdrop-blur-md">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-slate-600 dark:text-zinc-400 uppercase tracking-wider">App em Destaque</span>
            <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-950/80 border border-teal-300 dark:border-teal-800/60 text-teal-700 dark:text-teal-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-2">GeoGebra</p>
          <p className="text-[11px] text-slate-600 dark:text-zinc-400 font-medium mt-1">mais utilizado no período</p>
        </div>

        <div className="bg-[#e0f7fb] dark:bg-[#132234] border border-[#cbd5e1] dark:border-[#1e293b] rounded-xl p-5 shadow-lg backdrop-blur-md">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-slate-600 dark:text-zinc-400 uppercase tracking-wider">Participação</span>
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-2">94,2%</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">+2,4% média de alunos conectados</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#cbd5e1] dark:border-zinc-800 flex gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab("visao-geral")}
          className={"pb-3 transition-colors relative " + (activeTab === "visao-geral" ? "text-[#0e7c93] dark:text-cyan-400 font-bold" : "text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200")}
        >
          Visão Geral
          {activeTab === "visao-geral" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0e7c93] dark:bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("apps")}
          className={"pb-3 transition-colors relative " + (activeTab === "apps" ? "text-[#0e7c93] dark:text-cyan-400 font-bold" : "text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200")}
        >
          Atividade por App
          {activeTab === "apps" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0e7c93] dark:bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("logs")}
          className={"pb-3 transition-colors relative " + (activeTab === "logs" ? "text-[#0e7c93] dark:text-cyan-400 font-bold" : "text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200")}
        >
          Logs Detalhados
          {activeTab === "logs" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0e7c93] dark:bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
          )}
        </button>
      </div>

      {/* Tab: Visão Geral */}
      {activeTab === "visao-geral" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Frequência de Acesso Diário */}
            <div className="bg-[#e0f7fb] dark:bg-[#132234] border border-[#cbd5e1] dark:border-[#1e293b] rounded-xl p-5 shadow-lg backdrop-blur-md">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">Frequência de Acesso Diário</h3>
                <div className="flex items-center gap-3 text-[11px] font-medium text-slate-600 dark:text-zinc-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0e7c93] dark:bg-cyan-400" />
                    acessos
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-zinc-500" />
                    turmas
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-400 mb-6">Número de conexões ativas e turmas gerenciadas por dia.</p>

              {/* Styled SVG Area Chart */}
              <div className="h-56 w-full relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
                  <defs>
                    <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="500" y2="20" stroke="currentColor" className="text-slate-300 dark:text-zinc-800" strokeWidth="1" />
                  <line x1="0" y1="70" x2="500" y2="70" stroke="currentColor" className="text-slate-300 dark:text-zinc-800" strokeWidth="1" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="currentColor" className="text-slate-300 dark:text-zinc-800" strokeWidth="1" />
                  <line x1="0" y1="170" x2="500" y2="170" stroke="currentColor" className="text-slate-300 dark:text-zinc-800" strokeWidth="1" />

                  {/* Y-Axis Labels */}
                  <text x="5" y="25" fill="currentColor" className="text-slate-400 dark:text-zinc-500" fontSize="10" fontFamily="sans-serif">600</text>
                  <text x="5" y="75" fill="currentColor" className="text-slate-400 dark:text-zinc-500" fontSize="10" fontFamily="sans-serif">450</text>
                  <text x="5" y="125" fill="currentColor" className="text-slate-400 dark:text-zinc-500" fontSize="10" fontFamily="sans-serif">300</text>
                  <text x="5" y="175" fill="currentColor" className="text-slate-400 dark:text-zinc-500" fontSize="10" fontFamily="sans-serif">0</text>

                  {/* Curving Area & Line (Acessos) */}
                  <path
                    d="M 50 120 C 100 80, 150 90, 200 130 C 250 80, 300 60, 350 110 C 400 150, 450 165, 480 170 L 480 170 L 50 170 Z"
                    fill="url(#cyanGradient)"
                  />
                  <path
                    d="M 50 120 C 100 80, 150 90, 200 130 C 250 80, 300 60, 350 110 C 400 150, 450 165, 480 170"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Curving Line (Turmas) */}
                  <path
                    d="M 50 160 C 100 150, 150 155, 200 150 C 250 145, 300 140, 350 150 C 400 160, 450 165, 480 168"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />

                  {/* Highlight Dots */}
                  <circle cx="200" cy="130" r="4" fill="#22d3ee" stroke="#0a0f1e" strokeWidth="2" />
                  <circle cx="300" cy="60" r="4" fill="#22d3ee" stroke="#0a0f1e" strokeWidth="2" />
                </svg>

                {/* X-Axis Dates */}
                <div className="flex justify-between text-[10px] text-slate-500 dark:text-zinc-400 font-mono pt-2 px-6">
                  <span>01/05</span>
                  <span>02/05</span>
                  <span>03/05</span>
                  <span>04/05</span>
                  <span>05/05</span>
                  <span>06/05</span>
                  <span>07/05</span>
                </div>
              </div>
            </div>

            {/* Chart 2: Ranking de Aplicativos */}
            <div className="bg-[#e0f7fb] dark:bg-[#132234] border border-[#cbd5e1] dark:border-[#1e293b] rounded-xl p-5 shadow-lg backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">Ranking de Aplicativos</h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5 mb-5">Volume de uso e índice de engajamento por ferramenta.</p>

                <div className="space-y-3.5 text-xs">
                  {/* GeoGebra */}
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span className="text-slate-800 dark:text-zinc-200">GeoGebra</span>
                      <span className="text-[#0e7c93] dark:text-cyan-400 font-bold">88%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-[#0e7c93] dark:bg-cyan-400 h-full rounded-full w-[88%]" />
                    </div>
                  </div>

                  {/* Calculadora */}
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span className="text-slate-800 dark:text-zinc-200">Calculadora</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">74%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full w-[74%]" />
                    </div>
                  </div>

                  {/* Duolingo */}
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span className="text-slate-800 dark:text-zinc-200">Duolingo</span>
                      <span className="text-[#0e7c93] dark:text-cyan-400 font-bold">68%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-[#0e7c93] dark:bg-cyan-400 h-full rounded-full w-[68%]" />
                    </div>
                  </div>

                  {/* Wikipedia */}
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span className="text-slate-800 dark:text-zinc-200">Wikipedia</span>
                      <span className="text-slate-500 dark:text-zinc-400">45%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-slate-400 dark:bg-zinc-600 h-full rounded-full w-[45%]" />
                    </div>
                  </div>

                  {/* YouTube Edu */}
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span className="text-slate-800 dark:text-zinc-200">YouTube Edu</span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold">60%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full w-[60%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Table: Engajamento Recente por Aluno */}
          <div className="bg-[#e0f7fb] dark:bg-[#132234] border border-[#cbd5e1] dark:border-[#1e293b] rounded-xl shadow-lg overflow-hidden backdrop-blur-md">
            <div className="p-5 border-b border-[#cbd5e1] dark:border-[#1e293b] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">Engajamento Recente por Aluno</h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5">Resumo dos últimos logs capturados durante as aulas.</p>
              </div>
              <button onClick={() => setActiveTab("logs")} className="text-xs font-bold text-[#0e7c93] dark:text-cyan-400 hover:text-[#0b6376] dark:hover:text-cyan-300">
                Ver tudo &gt;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#cbd5e1] dark:border-[#1e293b] text-[11px] font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider bg-cyan-500/5 dark:bg-zinc-950/60">
                    <th className="py-3 px-5">Aluno</th>
                    <th className="py-3 px-5">Turma</th>
                    <th className="py-3 px-5">Aplicativo</th>
                    <th className="py-3 px-5">Tempo de Sessão</th>
                    <th className="py-3 px-5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#cbd5e1]/60 dark:divide-zinc-800/50 text-xs">
                  <tr className="hover:bg-cyan-100/40 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-zinc-100">Ana Beatriz Souza</td>
                    <td className="py-3.5 px-5 text-slate-600 dark:text-zinc-400">1º A - Ensino Médio</td>
                    <td className="py-3.5 px-5 text-slate-800 dark:text-zinc-200 font-medium">GeoGebra</td>
                    <td className="py-3.5 px-5 font-mono text-slate-600 dark:text-zinc-400">45 min</td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-100 dark:bg-cyan-950/80 text-[#0e7c93] dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800/60">
                        Ativo
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-cyan-100/40 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-zinc-100">Carlos Eduardo Lima</td>
                    <td className="py-3.5 px-5 text-slate-600 dark:text-zinc-400">1º A - Ensino Médio</td>
                    <td className="py-3.5 px-5 text-slate-800 dark:text-zinc-200 font-medium">Calculadora</td>
                    <td className="py-3.5 px-5 font-mono text-slate-600 dark:text-zinc-400">12 min</td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-400 border border-[#cbd5e1] dark:border-zinc-700">
                        Concluído
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-cyan-100/40 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-zinc-100">Mariana Oliveira</td>
                    <td className="py-3.5 px-5 text-slate-600 dark:text-zinc-400">2º B - Ensino Médio</td>
                    <td className="py-3.5 px-5 text-slate-800 dark:text-zinc-200 font-medium">Duolingo</td>
                    <td className="py-3.5 px-5 font-mono text-slate-600 dark:text-zinc-400">30 min</td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-100 dark:bg-cyan-950/80 text-[#0e7c93] dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800/60">
                        Ativo
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-cyan-100/40 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-zinc-100">João Pedro Rocha</td>
                    <td className="py-3.5 px-5 text-slate-600 dark:text-zinc-400">1º A - Ensino Médio</td>
                    <td className="py-3.5 px-5 text-slate-800 dark:text-zinc-200 font-medium">GeoGebra</td>
                    <td className="py-3.5 px-5 font-mono text-slate-600 dark:text-zinc-400">42 min</td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-100 dark:bg-cyan-950/80 text-[#0e7c93] dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800/60">
                        Ativo
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-cyan-100/40 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-zinc-100">Fernanda Costa</td>
                    <td className="py-3.5 px-5 text-slate-600 dark:text-zinc-400">3º C - Ensino Médio</td>
                    <td className="py-3.5 px-5 text-slate-800 dark:text-zinc-200 font-medium">Khan Academy</td>
                    <td className="py-3.5 px-5 font-mono text-slate-600 dark:text-zinc-400">55 min</td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-400 border border-[#cbd5e1] dark:border-zinc-700">
                        Concluído
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Tab: Atividade por App */}
      {activeTab === "apps" && (
        <div className="bg-[#e0f7fb] dark:bg-[#132234] border border-[#cbd5e1] dark:border-[#1e293b] rounded-xl p-6 space-y-4 backdrop-blur-md">
          <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">Distribuição Detalhada por Ferramenta</h3>
          <p className="text-xs text-slate-600 dark:text-zinc-400">Métricas consolidadas de tempo e frequência por categoria.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-cyan-100/60 dark:bg-cyan-950/30 border border-cyan-300 dark:border-cyan-800/50">
              <h4 className="font-bold text-xs text-slate-800 dark:text-zinc-200">Matemática (GeoGebra & Calc)</h4>
              <p className="text-2xl font-bold text-[#0e7c93] dark:text-cyan-400 mt-2">128 horas</p>
              <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-1">45% de todo o uso escolar nesta semana</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-100/60 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/50">
              <h4 className="font-bold text-xs text-slate-800 dark:text-zinc-200">Produtividade (Docs & PDF)</h4>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">84 horas</p>
              <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-1">30% de todo o uso escolar nesta semana</p>
            </div>
            <div className="p-4 rounded-xl bg-sky-100/60 dark:bg-sky-950/30 border border-sky-300 dark:border-sky-800/50">
              <h4 className="font-bold text-xs text-slate-800 dark:text-zinc-200">Línguas e Ciências</h4>
              <p className="text-2xl font-bold text-sky-600 dark:text-sky-400 mt-2">72 horas</p>
              <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-1">25% de todo o uso escolar nesta semana</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Logs Detalhados */}
      {activeTab === "logs" && (
        <div className="bg-[#e0f7fb] dark:bg-[#132234] border border-[#cbd5e1] dark:border-[#1e293b] rounded-xl shadow-lg overflow-hidden backdrop-blur-md">
          <div className="p-5 border-b border-[#cbd5e1] dark:border-[#1e293b] flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">Trilha de Auditoria e Eventos em Tempo Real</h3>
            <span className="text-xs font-semibold text-slate-600 dark:text-zinc-400">{logs.length} eventos registrados</span>
          </div>

          <div className="divide-y divide-[#cbd5e1]/60 dark:divide-zinc-800/50 text-xs">
            {logs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-cyan-100/40 dark:hover:bg-zinc-800/40 transition-colors flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-500 dark:text-zinc-500 text-[11px]">{log.timestamp}</span>
                    <span className="font-bold text-slate-800 dark:text-zinc-200">{log.tipo}</span>
                    {log.sala && (
                      <span className="text-[10px] bg-white dark:bg-zinc-800 border border-[#cbd5e1] dark:border-zinc-700 px-2 py-0.5 rounded text-slate-700 dark:text-zinc-300 font-semibold">
                        {log.sala}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 dark:text-zinc-400 mt-1">{log.descricao}</p>
                  {log.aluno && <p className="text-[11px] text-slate-500 dark:text-zinc-500 mt-0.5">Aluno: {log.aluno}</p>}
                </div>
                <StatusBadge status="Conectado" size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Notes */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 dark:text-zinc-500 gap-2 border-t border-[#cbd5e1] dark:border-zinc-800/60">
        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Dados atualizados em tempo real
        </span>
        <span className="italic">
          * Os relatórios são gerados com base na atividade monitorada via Modo Aula nas salas configuradas.
        </span>
      </div>

      {/* Share Modal */}
      <Modal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Compartilhar Relatório Acadêmico"
        subtitle="Envie o resumo executivo para coordenação pedagógica ou direção escolar."
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-800 dark:text-zinc-200 mb-1">E-mail do Destinatário</label>
            <input
              type="email"
              placeholder="diretoria@colegiomodelo.edu.br"
              className="w-full p-2.5 bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="px-4 py-2 text-slate-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 border border-[#cbd5e1] dark:border-zinc-700 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                showToast("Relatório enviado por e-mail com sucesso!");
                setIsShareModalOpen(false);
              }}
              className="px-4 py-2 bg-[#0e7c93] hover:bg-[#0b6376] dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold rounded-lg shadow-md shadow-[#0e7c93]/20 dark:shadow-cyan-500/20 transition-colors"
            >
              Enviar Relatório
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
