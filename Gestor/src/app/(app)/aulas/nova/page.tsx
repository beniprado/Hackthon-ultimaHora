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
  Filter, 
  CheckCircle2, 
  Info, 
  Save, 
  ArrowLeft,
  Calculator,
  FileText,
  Folder,
  Globe,
  Languages,
  Atom,
  FlaskConical,
  ShieldCheck
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function AulaConfigPage({ params }: { params?: { id?: string } }) {
  const router = useRouter();
  const { turmas, salas, aplicativos, aulas, addAula, updateAula, showToast } = useApp();

  const existingAula = params?.id ? aulas.find(a => a.id === params.id) : null;

  // Form State matching PDF Page 9
  const [selectedTurmaId, setSelectedTurmaId] = useState(existingAula?.turmaId || "turma-1");
  const [selectedDisciplina, setSelectedDisciplina] = useState(existingAula?.disciplina || "Matemática Aplicada");
  const [selectedSala, setSelectedSala] = useState(existingAula?.sala || "Sala 101 - Bloco B");
  const [dataAula, setDataAula] = useState(existingAula?.data || "2024-05-22");
  const [horaAula, setHoraAula] = useState(existingAula?.horarioInicio || "08:30");
  const [horaFim, setHoraFim] = useState(existingAula?.horarioFim || "09:20");

  // Whitelist Apps (Default selection matching PDF page 9: GeoGebra + Google Docs)
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
      {/* Top Header matching PDF Page 9 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/aulas" className="text-slate-400 hover:text-slate-700">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Configuração da Aula</h1>
          </div>
          <p className="text-xs text-slate-500">
            Define os detalhes e as permissões de aplicativos para a próxima sessão.
          </p>
        </div>

        <button
          onClick={handleSaveConfig}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1683D8] hover:bg-blue-600 rounded-lg shadow-sm shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Salvar configuração</span>
        </button>
      </div>

      {/* 2-Column Grid matching PDF Page 9 */}
      <form onSubmit={handleSaveConfig} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Informações Gerais (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card: Informações Gerais */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Info className="w-4 h-4 text-[#1683D8]" />
              <h3 className="text-sm font-bold text-slate-900">Informações Gerais</h3>
            </div>
            <p className="text-xs text-slate-400 -mt-2">
              Preencha os dados básicos da aula programada.
            </p>

            {/* Turma Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Turma</span>
              </label>
              <select
                value={selectedTurmaId}
                onChange={(e) => setSelectedTurmaId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#1683D8]/20 focus:border-[#1683D8]"
              >
                {turmas.map(t => (
                  <option key={t.id} value={t.id}>{t.nome} — {t.ano}</option>
                ))}
              </select>
            </div>

            {/* Disciplina Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span>Disciplina</span>
              </label>
              <select
                value={selectedDisciplina}
                onChange={(e) => setSelectedDisciplina(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#1683D8]/20 focus:border-[#1683D8]"
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

            {/* Sala Select/Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Sala</span>
              </label>
              <input
                type="text"
                value={selectedSala}
                onChange={(e) => setSelectedSala(e.target.value)}
                placeholder="Ex: Sala 101 - Bloco B"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#1683D8]/20 focus:border-[#1683D8]"
              />
            </div>

            {/* Data & Hora Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Data</span>
                </label>
                <input
                  type="date"
                  value={dataAula}
                  onChange={(e) => setDataAula(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#1683D8]/20 focus:border-[#1683D8]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Hora de Início</span>
                </label>
                <input
                  type="time"
                  value={horaAula}
                  onChange={(e) => setHoraAula(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#1683D8]/20 focus:border-[#1683D8]"
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-400 pt-2 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Estes dados serão visíveis para os alunos no início da sessão.</span>
            </p>
          </div>

          {/* Card: Resumo da Configuração matching PDF Page 9 */}
          <div className="bg-blue-50/50 border border-blue-200/80 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2.5 text-[#1683D8] font-bold text-sm mb-2">
              <CheckCircle2 className="w-5 h-5 text-[#1683D8]" />
              <span>Resumo da Configuração</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              <strong className="text-[#1683D8]">{selectedApps.length} aplicativo(s) liberado(s)</strong> para uso.
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Turma: {selectedTurma?.nome || "1º A"} • {selectedDisciplina} ({selectedSala})
            </p>
            <div className="mt-3 pt-3 border-t border-blue-200/60 flex items-center gap-1.5 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Política criptografada vinculada à Tag NFC da sala.</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Aplicativos Permitidos (7 cols) matching PDF Page 9 */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          
          <div>
            {/* Header with counter "2 Selecionados" */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Aplicativos Permitidos</h3>
                <p className="text-xs text-slate-400 mt-0.5">Selecione quais apps os alunos poderão utilizar.</p>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                {selectedApps.length} Selecionados
              </span>
            </div>

            {/* Search and Filters */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Pesquisar aplicativos..."
                  value={appSearch}
                  onChange={(e) => setAppSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1683D8]/20 focus:border-[#1683D8]"
                />
              </div>

              <select
                value={appCategoryFilter}
                onChange={(e) => setAppCategoryFilter(e.target.value)}
                className="py-1.5 px-3 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none"
              >
                <option value="TODAS">Todas as categorias</option>
                <option value="Matemática">Matemática</option>
                <option value="Produtividade">Produtividade</option>
                <option value="Línguas">Línguas</option>
                <option value="Ciências">Ciências</option>
                <option value="Geral">Geral</option>
              </select>
            </div>

            {/* App Grid Checklist matching PDF Page 9 */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
              {filteredApps.map((app) => {
                const isSelected = selectedApps.includes(app.id);

                return (
                  <div
                    key={app.id}
                    onClick={() => toggleAppSelection(app.id)}
                    className={"p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none " + (
                      isSelected 
                        ? "border-[#1683D8] bg-blue-50/40 shadow-sm" 
                        : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50"
                    )}
                  >
                    <div className={"w-5 h-5 rounded mt-0.5 flex items-center justify-center border transition-colors " + (
                      isSelected 
                        ? "bg-[#1683D8] border-[#1683D8] text-white" 
                        : "border-slate-300 bg-white"
                    )}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-bold text-slate-900 truncate">{app.nome}</p>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-[#1683D8] bg-blue-100/60 px-1.5 py-0.2 rounded">
                            Ativo
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{app.subtitulo}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Footer matching PDF Page 9 */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
            <p className="text-slate-400 text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>O bloqueio de outros apps será automático.</span>
            </p>

            <div className="flex items-center gap-3 font-semibold">
              <button
                type="button"
                onClick={handleDeselectAll}
                className="text-slate-500 hover:text-slate-800"
              >
                Desmarcar todos
              </button>
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-[#1683D8] hover:text-blue-700"
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
