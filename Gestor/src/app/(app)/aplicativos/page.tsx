"use client";

import React, { useState } from "react";
import { 
  Grid, 
  List, 
  Plus, 
  Upload, 
  Search, 
  Trash2, 
  MoreHorizontal
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Modal } from "@/components/ui/Modal";
import { AppCategory, AppStatus } from "@/types";

export default function AplicativosPage() {
  const { aplicativos, addAplicativo, toggleAppStatus, deleteAplicativo, showToast } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("TODOS");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportCsvModalOpen, setIsImportCsvModalOpen] = useState(false);
  const [selectedAppMenu, setSelectedAppMenu] = useState<string | null>(null);

  // Add App Form State
  const [nome, setNome] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [packageName, setPackageName] = useState("");
  const [versao, setVersao] = useState("1.0.0");
  const [categoria, setCategoria] = useState<AppCategory>("Matemática");
  const [status, setStatus] = useState<AppStatus>("Ativo");
  const [descricao, setDescricao] = useState("");

  const isPackageNameValid = (pkg: string) => {
    return /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/i.test(pkg);
  };

  const handleCreateApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !packageName) return;

    if (!isPackageNameValid(packageName)) {
      showToast("Package Name inválido! Exemplo correto: com.exemplo.app");
      return;
    }

    const today = new Date().toLocaleDateString("pt-BR");

    addAplicativo({
      nome,
      subtitulo: subtitulo || "Aplicativo pedagógico",
      packageName,
      versao,
      ultimaAtualizacao: today,
      status,
      categoria,
      descricao,
      icone: "calculator"
    });

    setIsAddModalOpen(false);
    setNome("");
    setSubtitulo("");
    setPackageName("");
  };

  const filteredApps = aplicativos.filter(app => {
    const matchesSearch = 
      app.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.subtitulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "TODOS" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Biblioteca de Aplicativos</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Gerencie o catálogo de aplicativos permitidos nas turmas e dispositivos.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => setIsImportCsvModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 border border-[#cbd5e1] dark:border-zinc-700 rounded-lg shadow-sm transition-all"
          >
            <Upload className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
            <span>Importar CSV</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white dark:text-slate-950 bg-[#0e7c93] hover:bg-[#0b6376] dark:bg-cyan-500 dark:hover:bg-cyan-400 rounded-lg shadow-md shadow-[#0e7c93]/20 dark:shadow-cyan-500/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Adicionar aplicativo</span>
          </button>
        </div>
      </div>

      {/* Main Catalog Card */}
      <div className="bg-[#e0f7fb] dark:bg-[#132234] border border-[#cbd5e1] dark:border-[#1e293b] rounded-xl shadow-lg overflow-hidden backdrop-blur-md">
        
        {/* Top Controls */}
        <div className="p-5 border-b border-[#cbd5e1] dark:border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nome ou package name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-cyan-500 rounded-lg"
            />
          </div>

          <div className="flex items-center gap-2.5">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1.5 px-3 text-xs bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-200 font-medium focus:outline-none focus:border-cyan-500"
            >
              <option value="TODOS">Todos os status</option>
              <option value="Ativo">Ativo</option>
              <option value="Pendente">Pendente</option>
              <option value="Inativo">Inativo</option>
            </select>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-white dark:bg-zinc-950/80 p-1 rounded-lg border border-[#cbd5e1] dark:border-zinc-800">
              <button
                onClick={() => setViewMode("list")}
                className={"p-1 rounded transition-colors " + (viewMode === "list" ? "bg-cyan-100 dark:bg-zinc-800 text-[#0e7c93] dark:text-cyan-400 shadow-sm" : "text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-300")}
                title="Visualização em Lista"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={"p-1 rounded transition-colors " + (viewMode === "grid" ? "bg-cyan-100 dark:bg-zinc-800 text-[#0e7c93] dark:text-cyan-400 shadow-sm" : "text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-300")}
                title="Visualização em Grade"
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* LIST VIEW */}
        {viewMode === "list" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#cbd5e1] dark:border-[#1e293b] text-[11px] font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider bg-cyan-500/5 dark:bg-zinc-950/60">
                  <th className="py-3.5 px-5">Nome do App</th>
                  <th className="py-3.5 px-5">Package Name</th>
                  <th className="py-3.5 px-5">Versão</th>
                  <th className="py-3.5 px-5">Última Atualização</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#cbd5e1]/60 dark:divide-zinc-800/50 text-xs">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-cyan-100/40 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800/60 text-[#0e7c93] dark:text-cyan-400 flex items-center justify-center font-bold text-xs">
                          {app.nome.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-zinc-100">{app.nome}</p>
                          <p className="text-slate-600 dark:text-zinc-400 text-[11px]">{app.subtitulo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5 font-mono text-[11px] text-slate-800 dark:text-zinc-300">
                      {app.packageName}
                    </td>
                    <td className="py-4 px-5 font-mono text-[11px] text-slate-600 dark:text-zinc-400">
                      {app.versao}
                    </td>
                    <td className="py-4 px-5 text-slate-600 dark:text-zinc-400 text-[11px]">
                      {app.ultimaAtualizacao}
                    </td>
                    <td className="py-4 px-5">
                      <button onClick={() => toggleAppStatus(app.id)} title="Clique para alterar status">
                        <StatusBadge status={app.status} />
                      </button>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() => setSelectedAppMenu(selectedAppMenu === app.id ? null : app.id)}
                          className="p-1.5 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-cyan-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>

                        {selectedAppMenu === app.id && (
                          <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-[#132234] border border-[#cbd5e1] dark:border-zinc-800 rounded-lg shadow-xl z-20 py-1 text-left">
                            <button
                              onClick={() => {
                                toggleAppStatus(app.id);
                                setSelectedAppMenu(null);
                              }}
                              className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-zinc-200 hover:bg-cyan-50 dark:hover:bg-zinc-800 transition-colors"
                            >
                              Alternar Status
                            </button>
                            <button
                              onClick={() => {
                                deleteAplicativo(app.id);
                                setSelectedAppMenu(null);
                              }}
                              className="w-full text-left px-3 py-1.5 text-xs text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-1.5 transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Remover</span>
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
        ) : (
          /* GRID VIEW */
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApps.map((app) => (
              <div key={app.id} className="p-4 rounded-xl border border-[#cbd5e1] dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 hover:border-cyan-500/60 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800/60 text-[#0e7c93] dark:text-cyan-400 flex items-center justify-center font-bold text-sm">
                      {app.nome.substring(0, 2).toUpperCase()}
                    </div>
                    <StatusBadge status={app.status} size="sm" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-zinc-100 text-sm mt-3">{app.nome}</h3>
                  <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-0.5 leading-relaxed">{app.subtitulo}</p>
                  <p className="font-mono text-[10px] text-slate-800 dark:text-zinc-300 mt-2 truncate bg-cyan-50/60 dark:bg-zinc-900 p-1.5 rounded border border-[#cbd5e1] dark:border-zinc-800">
                    {app.packageName}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#cbd5e1] dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-slate-600 dark:text-zinc-400 font-medium">
                  <span>v{app.versao}</span>
                  <span>{app.categoria}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="p-4 border-t border-[#cbd5e1] dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 dark:text-zinc-400 gap-3 bg-cyan-500/5 dark:bg-zinc-950/40">
          <p>Mostrando {filteredApps.length} de {aplicativos.length} aplicativos cadastrados</p>
          <div className="flex items-center gap-1.5">
            <button className="px-3 py-1.5 border border-[#cbd5e1] dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-400 dark:text-zinc-500 rounded-lg disabled:opacity-50" disabled>
              Anterior
            </button>
            <button className="px-3 py-1.5 bg-[#0e7c93] dark:bg-cyan-500 text-white dark:text-slate-950 font-bold rounded-lg shadow-sm">
              1
            </button>
            <button className="px-3 py-1.5 border border-[#cbd5e1] dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-400 dark:text-zinc-500 rounded-lg disabled:opacity-50" disabled>
              Próxima
            </button>
          </div>
        </div>

      </div>

      {/* Add App Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Adicionar Novo Aplicativo"
        subtitle="Cadastre o package name Android para inclusão na whitelist pedagógica."
      >
        <form onSubmit={handleCreateApp} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-800 dark:text-zinc-200 mb-1">Nome do Aplicativo</label>
            <input
              type="text"
              placeholder="Ex: GeoGebra 3D"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full p-2.5 bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 dark:text-zinc-200 mb-1">
              Package Name Android (Validação obrigatória)
            </label>
            <input
              type="text"
              placeholder="Ex: org.geogebra.android.math"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              required
              className="w-full p-2.5 font-mono bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
            <p className="text-[10px] text-slate-600 dark:text-zinc-400 mt-1">
              O identificador único utilizado pelo Android SDK e DevicePolicyManager.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 dark:text-zinc-200 mb-1">Subtítulo / Descrição Curta</label>
              <input
                type="text"
                placeholder="Ex: Calculadora Gráfica"
                value={subtitulo}
                onChange={(e) => setSubtitulo(e.target.value)}
                className="w-full p-2.5 bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 dark:text-zinc-200 mb-1">Versão</label>
              <input
                type="text"
                value={versao}
                onChange={(e) => setVersao(e.target.value)}
                className="w-full p-2.5 bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-slate-900 dark:text-zinc-100 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 dark:text-zinc-200 mb-1">Categoria Pedagógica</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value as AppCategory)}
                className="w-full p-2.5 bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-slate-900 dark:text-zinc-100 focus:outline-none focus:border-cyan-500"
              >
                <option value="Matemática">Matemática</option>
                <option value="Línguas">Línguas</option>
                <option value="Ciências">Ciências</option>
                <option value="Produtividade">Produtividade</option>
                <option value="Comunicação">Comunicação</option>
                <option value="Geral">Geral</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-800 dark:text-zinc-200 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as AppStatus)}
                className="w-full p-2.5 bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-slate-900 dark:text-zinc-100 focus:outline-none focus:border-cyan-500"
              >
                <option value="Ativo">Ativo</option>
                <option value="Pendente">Pendente</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-[#cbd5e1] dark:border-zinc-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-slate-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 border border-[#cbd5e1] dark:border-zinc-700 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0e7c93] hover:bg-[#0b6376] dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold rounded-lg shadow-md shadow-[#0e7c93]/20 dark:shadow-cyan-500/20 transition-colors"
            >
              Cadastrar Aplicativo
            </button>
          </div>
        </form>
      </Modal>

      {/* Import CSV Modal */}
      <Modal
        isOpen={isImportCsvModalOpen}
        onClose={() => setIsImportCsvModalOpen(false)}
        title="Importar Catálogo via CSV"
        subtitle="Carregue uma planilha com a lista de pacotes educacionais autorizados."
      >
        <div className="space-y-4 text-xs">
          <div className="border-2 border-dashed border-[#cbd5e1] dark:border-zinc-700 rounded-xl p-8 text-center bg-white/60 dark:bg-zinc-950/60 hover:bg-cyan-50/50 dark:hover:bg-zinc-900/60 hover:border-cyan-500 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-slate-400 dark:text-zinc-400 mx-auto mb-2" />
            <p className="font-bold text-slate-800 dark:text-zinc-200">Clique para selecionar ou arraste o arquivo CSV</p>
            <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-1">Formato: nome, package_name, versao, categoria</p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsImportCsvModalOpen(false)}
              className="px-4 py-2 text-slate-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 border border-[#cbd5e1] dark:border-zinc-700 rounded-lg font-medium transition-colors"
            >
              Fechar
            </button>
            <button
              onClick={() => {
                showToast("3 aplicativos importados do CSV com sucesso!");
                setIsImportCsvModalOpen(false);
              }}
              className="px-4 py-2 bg-[#0e7c93] hover:bg-[#0b6376] dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold rounded-lg shadow-md shadow-[#0e7c93]/20 dark:shadow-cyan-500/20 transition-colors"
            >
              Processar Importação
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
