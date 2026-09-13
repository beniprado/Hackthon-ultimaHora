"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Building2, 
  Users, 
  Shield, 
  Radio, 
  Bell, 
  Lock, 
  FileText, 
  Sliders, 
  Key, 
  CheckCircle2, 
  Save, 
  Download, 
  Smartphone,
  EyeOff,
  Database
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { UserRole } from "@/types";

function ConfiguracoesContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "instituicao";
  
  const { currentUser, setUserRole, logs, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Settings State
  const [institutionName, setInstitutionName] = useState("Colégio Modelo");
  const [defaultDuration, setDefaultDuration] = useState("50");
  const [idleTimeout, setIdleTimeout] = useState("5");
  const [offlinePolicyBehavior, setOfflinePolicyBehavior] = useState("MANTER_POLICY_LOCAL");
  const [strictKioskMode, setStrictKioskMode] = useState(true);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Configurações salvas com sucesso!");
  };

  const handleExportAuditLogs = () => {
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonStr);
    downloadAnchor.setAttribute("download", "auditoria_modo_aula_logs.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Logs de auditoria exportados!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Configurações do Sistema</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Gerencie os parâmetros globais da instituição, políticas de segurança, privacidade e chaves de NFC.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Side Navigation Menu */}
        <div className="md:col-span-3 space-y-1 bg-white p-3 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] h-fit">
          {[
            { id: "instituicao", label: "Instituição & Geral", icon: Building2 },
            { id: "usuarios", label: "Usuários & Perfis (RBAC)", icon: Users },
            { id: "politicas", label: "Políticas & Android", icon: Sliders },
            { id: "nfc", label: "Tags NFC & Criptografia", icon: Radio },
            { id: "privacidade", label: "Privacidade & LGPD", icon: EyeOff },
            { id: "logs", label: "Logs de Auditoria", icon: FileText }
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={"w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all text-left " + (
                  isSelected 
                    ? "bg-blue-50 text-[#1683D8]" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <Icon className={"w-4 h-4 " + (isSelected ? "text-[#1683D8]" : "text-slate-400")} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Content Panel */}
        <div className="md:col-span-9 bg-white border border-slate-200/80 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          
          {/* TAB 1: Instituição */}
          {activeTab === "instituicao" && (
            <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Dados da Instituição</h3>
                <p className="text-slate-400 mt-0.5">Informações cadastrais exibidas no aplicativo do aluno e relatórios.</p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome da Instituição Escolar</label>
                <input
                  type="text"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  className="w-full max-w-md p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1683D8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duração Padrão da Aula (minutos)</label>
                  <input
                    type="number"
                    value={defaultDuration}
                    onChange={(e) => setDefaultDuration(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tempo de Inatividade (minutos)</label>
                  <input
                    type="number"
                    value={idleTimeout}
                    onChange={(e) => setIdleTimeout(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1683D8] hover:bg-blue-600 text-white font-bold rounded-lg shadow-sm flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Salvar Alterações
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Usuários & Perfis */}
          {activeTab === "usuarios" && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Perfis e Controle de Acesso (RBAC)</h3>
                <p className="text-slate-400 mt-0.5">Definição dos níveis de permissão da plataforma Modo Aula.</p>
              </div>

              <div className="space-y-3">
                {[
                  { role: "ADMIN", desc: "Acesso total: configuração de políticas globais, exclusões e auditoria." },
                  { role: "GESTOR", desc: "Gestão de turmas, salas, grade de aulas, aplicativos e relatórios analíticos." },
                  { role: "PROFESSOR", desc: "Iniciar/encerrar suas aulas, customizar whitelist pedagógica e monitorar suas salas." },
                  { role: "SUPORTE", desc: "Diagnóstico de hardware, sincronização de Tags NFC e visualização de alertas técnicos." }
                ].map((p) => (
                  <div key={p.role} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-xs">{p.role}</span>
                      <p className="text-slate-500 text-[11px] mt-0.5">{p.desc}</p>
                    </div>
                    <button
                      onClick={() => setUserRole(p.role as UserRole)}
                      className={"px-3 py-1.5 rounded-lg font-bold text-[11px] transition-colors " + (
                        currentUser.role === p.role 
                          ? "bg-[#1683D8] text-white" 
                          : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                      )}
                    >
                      {currentUser.role === p.role ? "Perfil Ativo" : "Simular Papel"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Políticas & Android */}
          {activeTab === "politicas" && (
            <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Comportamento do Motor de Políticas (Android)</h3>
                <p className="text-slate-400 mt-0.5">Parâmetros de execução nos dispositivos móveis dos alunos.</p>
              </div>

              <div className="space-y-4 max-w-lg">
                <div className="p-3.5 bg-blue-50/50 border border-blue-200 rounded-lg">
                  <span className="font-bold text-slate-800 block mb-1">Comportamento Offline (Perda de Wi-Fi)</span>
                  <p className="text-slate-600 mb-2 leading-relaxed">
                    Se o smartphone perder conexão após receber a política, o aplicativo mantém a whitelist ativa em cache local (Room/SQLite) até o término do horário da aula.
                  </p>
                  <select
                    value={offlinePolicyBehavior}
                    onChange={(e) => setOfflinePolicyBehavior(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded font-medium"
                  >
                    <option value="MANTER_POLICY_LOCAL">Manter política ativa offline (Recomendado)</option>
                    <option value="BLOQUEIO_TOTAL">Bloqueio preventivo de segurança</option>
                  </select>
                </div>

                <div className="flex items-start gap-3 p-3.5 border border-slate-200 rounded-lg">
                  <input
                    type="checkbox"
                    id="strictKiosk"
                    checked={strictKioskMode}
                    onChange={(e) => setStrictKioskMode(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#1683D8] rounded"
                  />
                  <div>
                    <label htmlFor="strictKiosk" className="font-bold text-slate-800 block">
                      Priorizar LockTaskMode / Custom Launcher quando suportado
                    </label>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Garante que botões de início e multitarefa permaneçam restritos às ferramentas educacionais.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button type="submit" className="px-4 py-2 bg-[#1683D8] text-white font-bold rounded-lg">
                  Salvar Políticas
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: Tags NFC */}
          {activeTab === "nfc" && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Gerenciamento Criptográfico de Tags NFC</h3>
                <p className="text-slate-400 mt-0.5">Controle das chaves ECDSA das salas e prevenção contra duplicidade de tags.</p>
              </div>

              <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2 border border-slate-800">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Radio className="w-4 h-4" /> Algoritmo Ativo: ECDSA_SHA256 (NIST P-256)
                  </span>
                  <StatusBadge status="Ativo" size="sm" />
                </div>
                <p className="text-slate-300 text-[11px]">
                  Nenhum dado sensível ou senha é gravado em texto puro nas tags físicas. A rotação de chaves é realizada a cada 24 horas.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: Privacidade & LGPD */}
          {activeTab === "privacidade" && (
            <div className="space-y-4 text-xs leading-relaxed text-slate-700">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Princípio de Minimização de Dados (LGPD)</h3>
                <p className="text-slate-400 mt-0.5">O Modo Aula prioriza foco pedagógico sem vigilância invasiva.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
                  <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dados Monitorados (Permitidos)
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-emerald-800 text-[11px]">
                    <li>Dispositivo e turma vinculada</li>
                    <li>Nível percentual de bateria</li>
                    <li>Aplicativo educacional em execução ativa</li>
                    <li>Horário de início e fim da sessão</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2">
                  <h4 className="font-bold text-rose-900 flex items-center gap-1.5">
                    <EyeOff className="w-4 h-4 text-rose-600" /> NÃO Monitorado (Privacidade Total)
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-rose-800 text-[11px]">
                    <li>Fotos, galeria ou arquivos pessoais</li>
                    <li>Mensagens, WhatsApp ou redes sociais</li>
                    <li>Câmera, microfone ou gravação de tela</li>
                    <li>Histórico completo de navegação web externa</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Logs de Auditoria */}
          {activeTab === "logs" && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Logs de Auditoria e Conformidade</h3>
                  <p className="text-slate-400 mt-0.5">Registro imutável de todas as ações administrativas e eventos de aula.</p>
                </div>
                <button
                  onClick={handleExportAuditLogs}
                  className="px-3 py-1.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Exportar JSON
                </button>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-500">
                    <tr>
                      <th className="p-2.5">Horário</th>
                      <th className="p-2.5">Tipo</th>
                      <th className="p-2.5">Descrição</th>
                      <th className="p-2.5">Sala</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                    {logs.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-50">
                        <td className="p-2.5 text-slate-400">{l.timestamp}</td>
                        <td className="p-2.5 font-bold text-slate-800">{l.tipo}</td>
                        <td className="p-2.5 text-slate-600 font-sans">{l.descricao}</td>
                        <td className="p-2.5 text-slate-500">{l.sala || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function ConfiguracoesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Carregando configurações...</div>}>
      <ConfiguracoesContent />
    </Suspense>
  );
}
