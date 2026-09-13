"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Check, 
  Search, 
  Info, 
  Save, 
  ArrowLeft,
  ShieldCheck
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function AulaConfigPage({ params }: { params?: { id?: string } }) {
  const router = useRouter();
  const { turmas, aplicativos, aulas, updateAula, addAula } = useApp();

  const existingAula = params?.id ? aulas.find(a => a.id === params.id) : null;

  // Form State
  const [selectedTurmaId, setSelectedTurmaId] = useState(existingAula?.turmaId || "turma-1");
  const [selectedDisciplina, setSelectedDisciplina] = useState(existingAula?.disciplina || "Matemática Aplicada");
  const [selectedSala, setSelectedSala] = useState(existingAula?.sala || "Sala 101 - Bloco B");
  const [dataAula, setDataAula] = useState(existingAula?.data || "2026-09-15");
  const [horaAula, setHoraAula] = useState(existingAula?.horarioInicio || "08:30");
  const [horaFim, setHoraFim] = useState(existingAula?.horarioFim || "09:20");

  // Whitelist Apps
  const [selectedApps, setSelectedApps] = useState<string[]>(
    existingAula?.appsPermitidosIds || ["app-geogebra", "app-docs"]
  );

  const [appSearch, setAppSearch] = useState("");
  const [appCategoryFilter, setAppCategoryFilter] = useState("TODAS");

  const selectedTurma = turmas.find(t => t.id === selectedTurmaId);

  const toggleAppSelection = (appId: string) => {
    setSelectedApps(prev => 
      prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]
    );
  };

  const handleSelectAll = () => {
    setSelectedApps(aplicativos.filter(a => a.status === "Ativo").map(a => a.id));
  };

  const handleDeselectAll = () => {
    setSelectedApps([]);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (existingAula) {
      updateAula(existingAula.id, {
        disciplina: selectedDisciplina,
        turmaId: selectedTurmaId,
        turmaNome: selectedTurma?.nome || "3º Ano",
        sala: selectedSala,
        data: dataAula,
        horarioInicio: horaAula,
        horarioFim: horaFim,
        appsPermitidosIds: selectedApps
      });
    } else {
      addAula({
        disciplina: selectedDisciplina,
        turmaId: selectedTurmaId,
        turmaNome: selectedTurma?.nome || "3º Ano",
        professor: selectedTurma?.professor || "Prof. Ricardo Silva",
        sala: selectedSala,
        salaId: "sala-101",
        data: dataAula,
        horarioInicio: horaAula,
        horarioFim: horaFim,
        alunosPresentes: 28,
        alunosTotal: selectedTurma?.totalAlunos || 32,
        status: "Agendada",
        appsPermitidosIds: selectedApps
      });
    }
    router.push("/aulas");
  };

  const filteredApps = aplicativos.filter(app => {
    const matchesSearch = 
      app.nome.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.subtitulo.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.packageName.toLowerCase().includes(appSearch.toLowerCase());
    const matchesCategory = appCategoryFilter === "TODAS" || app.categoria === appCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/aulas" className="text-zinc-400 hover:text-zinc-100 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">Configuração da Aula</h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400">
            Define os detalhes e as permissões de aplicativos para a próxima sessão.
          </p>
        </div>

        <button
          onClick={handleSaveConfig}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-violet-600 hover:bg-violet-500 rounded-lg shadow-md shadow-violet-600/20 border border-violet-500/30 transition-all self-start sm:self-auto active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>Salvar configuração</span>
        </button>
      </div>

      {/* 2-Column Grid */}
      <form onSubmit={handleSaveConfig} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Informações Gerais (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card: Informações Gerais */}
          <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-xl p-5 shadow-lg backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-800/80">
              <Info className="w-4 h-4 text-violet-400" />
              <h3 className="text-sm font-bold text-zinc-100">Informações Gerais</h3>
            </div>
            <p className="text-xs text-zinc-400 -mt-2">
              Preencha os dados básicos da aula programada.
            </p>

            {/* Turma Select */}
            <div>
              <label className="block text-xs font-bold text-zinc-200 mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-zinc-400" />
                <span>Turma</span>
              </label>
              <select
                value={selectedTurmaId}
                onChange={(e) => setSelectedTurmaId(e.target.value)}
                className="w-full p-2.5 bg-zinc-950/80 border border-zinc-800 rounded-lg text-xs text-zinc-100 font-medium focus:outline-none focus:border-violet-500"
              >
                {turmas.map(t => (
                  <option key={t.id} value={t.id}>{t.nome} — {t.ano}</option>
                ))}
              </select>
            </div>

            {/* Disciplina Select */}
            <div>
              <label className="block text-xs font-bold text-zinc-200 mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                <span>Disciplina</span>
              </label>
              <select
                value={selectedDisciplina}
                onChange={(e) => setSelectedDisciplina(e.target.value)}
                className="w-full p-2.5 bg-zinc-950/80 border border-zinc-800 rounded-lg text-xs text-zinc-100 font-medium focus:outline-none focus:border-violet-500"
              >
                <option value="Matemática">Matemática</option>
                <option value="Matemática Aplicada">Matemática Aplicada</option>
                <option value="Português">Português</option>
                <option value="Física">Física</option>
                <option value="História">História</option>
                <option value="Química">Química</option>
                <option value="Geografia">Geografia</option>
                <option value="Biologia">Biologia</option>
              </select>
            </div>

            {/* Sala Input */}
            <div>
              <label className="block text-xs font-bold text-zinc-200 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>Sala</span>
              </label>
              <input
                type="text"
                value={selectedSala}
                onChange={(e) => setSelectedSala(e.target.value)}
                placeholder="Ex: Sala 101 - Bloco B"
                className="w-full p-2.5 bg-zinc-950/80 border border-zinc-800 rounded-lg text-xs text-zinc-100 font-medium focus:outline-none focus:border-violet-500"
              />
            </div>

            {/* Data & Hora Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-200 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Data</span>
                </label>
                <input
                  type="date"
                  value={dataAula}
                  onChange={(e) => setDataAula(e.target.value)}
                  className="w-full p-2.5 bg-zinc-950/80 border border-zinc-800 rounded-lg text-xs text-zinc-100 font-mono focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-200 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Hora de Início</span>
                </label>
                <input
                  type="time"
                  value={horaAula}
                  onChange={(e) => setHoraAula(e.target.value)}
                  className="w-full p-2.5 bg-zinc-950/80 border border-zinc-800 rounded-lg text-xs text-zinc-100 font-mono focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 pt-2 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 flex-shrink-0 text-violet-400" />
              <span>Estes dados serão transmitidos de forma segura para os dispositivos conectados.</span>
            </p>
          </div>

          {/* Card: Resumo da Configuração */}
          <div className="bg-violet-950/40 border border-violet-800/60 rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-2.5 text-violet-400 font-bold text-sm mb-2">
              <ShieldCheck className="w-5 h-5 text-violet-400" />
              <span>Resumo da Configuração</span>
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed font-medium">
              <strong className="text-violet-400">{selectedApps.length} aplicativo(s) liberado(s)</strong> para uso pedagógico.
            </p>
            <p className="text-[11px] text-zinc-400 mt-1">
              Turma: {selectedTurma?.nome || "1º A"} • {selectedDisciplina} ({selectedSala})
            </p>
            <div className="mt-3 pt-3 border-t border-violet-800/40 flex items-center gap-1.5 text-[10px] text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Política vinculada à sessão de aula segura OnFocus.</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Aplicativos Permitidos (7 cols) */}
        <div className="lg:col-span-7 bg-zinc-900/90 border border-zinc-800/80 rounded-xl p-5 shadow-lg backdrop-blur-md flex flex-col justify-between">
          
          <div>
            {/* Header with counter */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
              <div>
                <h3 className="text-sm font-bold text-zinc-100">Aplicativos Permitidos</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Selecione quais apps os alunos poderão utilizar.</p>
              </div>
              <span className="text-xs font-bold text-violet-300 bg-violet-950 border border-violet-800/60 px-2.5 py-1 rounded-full">
                {selectedApps.length} Selecionados
              </span>
            </div>

            {/* Search and Filters */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Pesquisar aplicativos..."
                  value={appSearch}
                  onChange={(e) => setAppSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-950/80 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-violet-500 rounded-lg"
                />
              </div>

              <select
                value={appCategoryFilter}
                onChange={(e) => setAppCategoryFilter(e.target.value)}
                className="py-1.5 px-3 text-xs bg-zinc-950/80 border border-zinc-800 rounded-lg text-zinc-200 font-medium focus:outline-none focus:border-violet-500"
              >
                <option value="TODAS">Todas as categorias</option>
                <option value="Matemática">Matemática</option>
                <option value="Produtividade">Produtividade</option>
                <option value="Línguas">Línguas</option>
                <option value="Ciências">Ciências</option>
                <option value="Geral">Geral</option>
              </select>
            </div>

            {/* App Grid Checklist */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
              {filteredApps.map((app) => {
                const isSelected = selectedApps.includes(app.id);

                return (
                  <div
                    key={app.id}
                    onClick={() => toggleAppSelection(app.id)}
                    className={"p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none " + (
                      isSelected 
                        ? "border-violet-500/80 bg-violet-950/40 shadow-sm" 
                        : "border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 hover:bg-zinc-800/40"
                    )}
                  >
                    <div className={"w-5 h-5 rounded mt-0.5 flex items-center justify-center border transition-colors " + (
                      isSelected 
                        ? "bg-violet-600 border-violet-500 text-white" 
                        : "border-zinc-700 bg-zinc-900"
                    )}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-bold text-zinc-100 truncate">{app.nome}</p>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-violet-300 bg-violet-950 px-1.5 py-0.2 rounded border border-violet-800/60">
                            Ativo
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate mt-0.5">{app.subtitulo}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
            <p className="text-zinc-400 text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              <span>O bloqueio de apps externos à whitelist será automático.</span>
            </p>

            <div className="flex items-center gap-3 font-semibold">
              <button
                type="button"
                onClick={handleDeselectAll}
                className="text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Desmarcar todos
              </button>
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                Selecionar todos
              </button>
            </div>
          </div>

        </div>

      </form>
    </div>
  );
}
