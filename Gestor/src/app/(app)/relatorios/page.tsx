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
  CheckCircle2, 
  TrendingUp, 
  BarChart3, 
  FileText, 
  Filter, 
  RotateCcw,
  Calculator,
  Compass,
  BookOpen,
  Globe,
  Youtube
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
      {/* Top Header matching PDF Page 12 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Relatórios e Análises</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Acompanhe o engajamento digital e desempenho das turmas em tempo real.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Imprimir</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-all"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Exportar CSV</span>
          </button>

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#1683D8] hover:bg-blue-600 rounded-lg shadow-sm shadow-blue-500/20 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartilhar</span>
          </button>
        </div>
      </div>

      {/* Filter Bar matching PDF Page 12 */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filtros:</span>
          </span>

          <select
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none"
          >
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Último trimestre</option>
          </select>

          <select
            value={turmaFilter}
            onChange={(e) => setTurmaFilter(e.target.value)}
            className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none"
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
            className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none"
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
          className="text-xs text-[#1683D8] hover:text-blue-700 font-semibold"
        >
          Limpar Filtros
        </button>
      </div>

      {/* 4 Stat Cards matching PDF Page 12 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Aulas Realizadas</span>
            <div className="p-2 rounded-lg bg-blue-50 text-[#1683D8]">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">142</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">+12% em relação ao mês anterior</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Tempo de Uso Médio</span>
            <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">38min</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">+5% por aluno/sessão</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">App em Destaque</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">GeoGebra</p>
          <p className="text-[11px] text-slate-400 font-medium mt-1">mais utilizado no período</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Participação</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">94,2%</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">+2,4% média de alunos conectados</p>
        </div>
      </div>

      {/* Tabs matching PDF Page 12 */}
      <div className="border-b border-slate-200 flex gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab("visao-geral")}
          className={"pb-3 transition-colors relative " + (activeTab === "visao-geral" ? "text-[#1683D8] font-bold" : "text-slate-500 hover:text-slate-800")}
        >
          Visão Geral
          {activeTab === "visao-geral" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1683D8]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("apps")}
          className={"pb-3 transition-colors relative " + (activeTab === "apps" ? "text-[#1683D8] font-bold" : "text-slate-500 hover:text-slate-800")}
        >
          Atividade por App
          {activeTab === "apps" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1683D8]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("logs")}
          className={"pb-3 transition-colors relative " + (activeTab === "logs" ? "text-[#1683D8] font-bold" : "text-slate-500 hover:text-slate-800")}
        >
          Logs Detalhados
          {activeTab === "logs" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1683D8]" />
          )}
        </button>
      </div>

      {/* Tab: Visão Geral (2 Visual Charts matching PDF Page 12) */}
      {activeTab === "visao-geral" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Frequência de Acesso Diário matching PDF Page 12 */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-slate-900">Frequência de Acesso Diário</h3>
                <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1683D8]" />
                    acessos
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    turmas
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-6">Número de conexões ativas e turmas gerenciadas por dia.</p>

              {/* Crisp SVG Line/Area Chart matching PDF */}
              <div className="h-56 w-full relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="70" x2="500" y2="70" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="170" x2="500" y2="170" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Y-Axis Labels */}
                  <text x="5" y="25" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">600</text>
                  <text x="5" y="75" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">450</text>
                  <text x="5" y="125" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">300</text>
                  <text x="5" y="175" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">0</text>

                  {/* Curving Area & Line (Acessos) */}
                  <path
                    d="M 50 120 C 100 80, 150 90, 200 130 C 250 80, 300 60, 350 110 C 400 150, 450 165, 480 170 L 480 170 L 50 170 Z"
                    fill="#1683D8"
                    fillOpacity="0.08"
                  />
                  <path
                    d="M 50 120 C 100 80, 150 90, 200 130 C 250 80, 300 60, 350 110 C 400 150, 450 165, 480 170"
                    fill="none"
                    stroke="#1683D8"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Curving Line (Turmas) */}
                  <path
                    d="M 50 160 C 100 150, 150 155, 200 150 C 250 145, 300 140, 350 150 C 400 160, 450 165, 480 168"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />

                  {/* Highlight Dots */}
                  <circle cx="200" cy="130" r="4" fill="#1683D8" stroke="#fff" strokeWidth="2" />
                  <circle cx="300" cy="60" r="4" fill="#1683D8" stroke="#fff" strokeWidth="2" />
                </svg>

                {/* X-Axis Dates */}
                <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-2 px-6">
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

            {/* Chart 2: Ranking de Aplicativos matching PDF Page 12 */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Ranking de Aplicativos</h3>
                <p className="text-xs text-slate-400 mt-0.5 mb-5">Volume de uso e índice de engajamento por ferramenta.</p>

                <div className="space-y-3.5 text-xs">
                  {/* GeoGebra */}
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span className="text-slate-800">GeoGebra</span>
                      <span className="text-[#1683D8]">88%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-[#1683D8] h-full rounded-full w-[88%]" />
                    </div>
                  </div>

                  {/* Calculadora */}
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span className="text-slate-800">Calculadora</span>
                      <span className="text-[#1683D8]">74%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-[#1683D8] h-full rounded-full w-[74%]" />
                    </div>
                  </div>

                  {/* Duolingo */}
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span className="text-slate-800">Duolingo</span>
                      <span className="text-[#1683D8]">68%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-[#1683D8] h-full rounded-full w-[68%]" />
                    </div>
                  </div>

                  {/* Wikipedia */}
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span className="text-slate-800">Wikipedia</span>
                      <span className="text-[#1683D8]">45%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-[#1683D8] h-full rounded-full w-[45%]" />
                    </div>
                  </div>

                  {/* YouTube Edu */}
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span className="text-slate-800">YouTube Edu</span>
                      <span className="text-[#1683D8]">60%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-[#1683D8] h-full rounded-full w-[60%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Table: Engajamento Recente por Aluno matching PDF Page 12 */}
          <div className="bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Engajamento Recente por Aluno</h3>
                <p className="text-xs text-slate-400 mt-0.5">Resumo dos últimos logs capturados durante as aulas.</p>
              </div>
              <button onClick={() => setActiveTab("logs")} className="text-xs font-bold text-[#1683D8] hover:underline">
                Ver tudo &gt;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                    <th className="py-3 px-5">Aluno</th>
                    <th className="py-3 px-5">Turma</th>
                    <th className="py-3 px-5">Aplicativo</th>
                    <th className="py-3 px-5">Tempo de Sessão</th>
                    <th className="py-3 px-5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  <tr className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-5 font-bold text-slate-900">Ana Beatriz Souza</td>
                    <td className="py-3.5 px-5 text-slate-600">1º A - Ensino Médio</td>
                    <td className="py-3.5 px-5 text-slate-800 font-medium">GeoGebra</td>
                    <td className="py-3.5 px-5 font-mono text-slate-500">45 min</td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-[#1683D8] border border-blue-200">
                        Ativo
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-5 font-bold text-slate-900">Carlos Eduardo Lima</td>
                    <td className="py-3.5 px-5 text-slate-600">1º A - Ensino Médio</td>
                    <td className="py-3.5 px-5 text-slate-800 font-medium">Calculadora</td>
                    <td className="py-3.5 px-5 font-mono text-slate-500">12 min</td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600">
                        Concluído
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-5 font-bold text-slate-900">Mariana Oliveira</td>
                    <td className="py-3.5 px-5 text-slate-600">2º B - Ensino Médio</td>
                    <td className="py-3.5 px-5 text-slate-800 font-medium">Duolingo</td>
                    <td className="py-3.5 px-5 font-mono text-slate-500">30 min</td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-[#1683D8] border border-blue-200">
                        Ativo
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-5 font-bold text-slate-900">João Pedro Rocha</td>
                    <td className="py-3.5 px-5 text-slate-600">1º A - Ensino Médio</td>
                    <td className="py-3.5 px-5 text-slate-800 font-medium">GeoGebra</td>
                    <td className="py-3.5 px-5 font-mono text-slate-500">42 min</td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-[#1683D8] border border-blue-200">
                        Ativo
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-5 font-bold text-slate-900">Fernanda Costa</td>
                    <td className="py-3.5 px-5 text-slate-600">3º C - Ensino Médio</td>
                    <td className="py-3.5 px-5 text-slate-800 font-medium">Khan Academy</td>
                    <td className="py-3.5 px-5 font-mono text-slate-500">55 min</td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600">
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
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Distribuição Detalhada por Ferramenta</h3>
          <p className="text-xs text-slate-500">Métricas consolidadas de tempo e frequência por categoria.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200">
              <h4 className="font-bold text-xs text-slate-900">Matemática (GeoGebra & Calc)</h4>
              <p className="text-2xl font-bold text-[#1683D8] mt-2">128 horas</p>
              <p className="text-[11px] text-slate-500 mt-1">45% de todo o uso escolar nesta semana</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200">
              <h4 className="font-bold text-xs text-slate-900">Produtividade (Docs & PDF)</h4>
              <p className="text-2xl font-bold text-emerald-700 mt-2">84 horas</p>
              <p className="text-[11px] text-slate-500 mt-1">30% de todo o uso escolar nesta semana</p>
            </div>
            <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200">
              <h4 className="font-bold text-xs text-slate-900">Línguas e Ciências</h4>
              <p className="text-2xl font-bold text-indigo-700 mt-2">72 horas</p>
              <p className="text-[11px] text-slate-500 mt-1">25% de todo o uso escolar nesta semana</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Logs Detalhados */}
      {activeTab === "logs" && (
        <div className="bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Trilha de Auditoria e Eventos em Tempo Real</h3>
            <span className="text-xs font-semibold text-slate-500">{logs.length} eventos registrados</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {logs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-slate-50/60 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-400 text-[11px]">{log.timestamp}</span>
                    <span className="font-bold text-slate-900">{log.tipo}</span>
                    {log.sala && (
                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-semibold">
                        {log.sala}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 mt-1">{log.descricao}</p>
                  {log.aluno && <p className="text-[11px] text-slate-400 mt-0.5">Aluno: {log.aluno}</p>}
                </div>
                <StatusBadge status="Conectado" size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Notes matching PDF Page 12 */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2 border-t border-slate-200/40">
        <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Dados atualizados em tempo real: 10:31:54
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
            <label className="block font-bold text-slate-700 mb-1">E-mail do Destinatário</label>
            <input
              type="email"
              placeholder="diretoria@colegiomodelo.edu.br"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                showToast("Relatório enviado por e-mail com sucesso!");
                setIsShareModalOpen(false);
              }}
              className="px-4 py-2 bg-[#1683D8] text-white font-bold rounded-lg"
            >
              Enviar Relatório
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
