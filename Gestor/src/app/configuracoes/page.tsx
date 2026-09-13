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
  Database,
  QrCode
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
  const [institutionName, setInstitutionName] = useState("Colégio Modelo — OnFocus");
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
    downloadAnchor.setAttribute("download", "auditoria_onfocus_lgpd_logs.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Logs de auditoria LGPD exportados!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">Configurações & Governança</h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Parâmetros institucionais, políticas de foco Android, conformidade LGPD e gerenciamento criptográfico ECDSA.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Side Navigation Menu */}
        <div className="md:col-span-3 space-y-1 bg-zinc-900/90 backdrop-blur-md p-3 rounded-xl border border-zinc-800/80 shadow-xl shadow-black/20 h-fit">
          {[
            { id: "instituicao", label: "Instituição & Geral", icon: Building2 },
            { id: "usuarios", label: "Usuários & Perfis (RBAC)", icon: Users },
            { id: "politicas", label: "Políticas & Android", icon: Sliders },
            { id: "nfc", label: "QR Code & Criptografia ECDSA", icon: QrCode },
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
                    ? "bg-violet-950/70 text-violet-300 border border-violet-800/50" 
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
                )}
              >
                <Icon className={"w-4 h-4 " + (isSelected ? "text-violet-400" : "text-zinc-500")} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Content Panel */}
        <div className="md:col-span-9 bg-zinc-900/90 backdrop-blur-md border border-zinc-800/80 rounded-xl p-6 shadow-xl shadow-black/20">
          
          {/* TAB 1: Instituição */}
          {activeTab === "instituicao" && (
            <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
              <div className="border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-bold text-zinc-100">Dados da Instituição</h3>
                <p className="text-zinc-400 mt-0.5">Informações cadastrais exibidas no smartphone do aluno e relatórios.</p>
              </div>

              <div>
                <label className="block font-bold text-zinc-300 mb-1">Nome da Instituição Escolar</label>
                <input
                  type="text"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  className="w-full max-w-md p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Duração Padrão da Aula (minutos)</label>
                  <input
                    type="number"
                    value={defaultDuration}
                    onChange={(e) => setDefaultDuration(e.target.value)}
                    className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Tolerância de Inatividade (min)</label>
                  <input
                    type="number"
                    value={idleTimeout}
                    onChange={(e) => setIdleTimeout(e.target.value)}
                    className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-lg shadow-md shadow-violet-600/30 transition-colors"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Usuários & Perfis (RBAC) */}
          {activeTab === "usuarios" && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-bold text-zinc-100">Controle de Acesso Baseado em Papéis (RBAC)</h3>
                <p className="text-zinc-400 mt-0.5">Simule ou atribua permissões de acesso ao sistema OnFocus.</p>
              </div>

              <div className="space-y-3 max-w-lg">
                {[
                  { role: "ADMIN", desc: "Acesso irrestrito a configurações de criptografia, chaves ECDSA e parâmetros gerais." },
                  { role: "GESTOR", desc: "Gestão pedagógica, relatórios, turmas e controle de whitelists." },
                  { role: "PROFESSOR", desc: "Controle em tempo real da sala ativa, Focus Broadcast e encerramento de sessão." },
                  { role: "SUPORTE", desc: "Inspeção técnica de conectividade, BSSID e auditoria LGPD." }
                ].map((p) => (
                  <div key={p.role} className="p-3.5 bg-zinc-950/60 border border-zinc-800 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-bold text-zinc-200 block">{p.role}</span>
                      <p className="text-zinc-400 text-[11px] mt-0.5">{p.desc}</p>
                    </div>
                    <button
                      onClick={() => setUserRole(p.role as UserRole)}
                      className={"px-3 py-1.5 rounded-lg font-bold text-[11px] transition-colors " + (
                        currentUser.role === p.role 
                          ? "bg-violet-600 text-white" 
                          : "bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                      )}
                    >
                      {currentUser.role === p.role ? "Perfil Ativo" : "Simular"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Políticas & Android */}
          {activeTab === "politicas" && (
            <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
              <div className="border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-bold text-zinc-100">Comportamento do Motor de Políticas (Android)</h3>
                <p className="text-zinc-400 mt-0.5">Parâmetros de execução e resiliência offline nos smartphones dos alunos.</p>
              </div>

              <div className="space-y-4 max-w-lg">
                <div className="p-3.5 bg-zinc-950/60 border border-zinc-800 rounded-lg">
                  <span className="font-bold text-zinc-200 block mb-1">Continuidade Offline-First (Perda de Conexão)</span>
                  <p className="text-zinc-400 mb-2 leading-relaxed text-[11px]">
                    Se o smartphone do aluno perder o sinal Wi-Fi ou for colocado em Modo Avião, o app mantém a whitelist pedagógica ativa via timestamp de expiração local (<code className="text-violet-300 font-mono">session_expiration_timestamp</code>) armazenado no dispositivo.
                  </p>
                  <select
                    value={offlinePolicyBehavior}
                    onChange={(e) => setOfflinePolicyBehavior(e.target.value)}
                    className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded font-medium text-zinc-200"
                  >
                    <option value="MANTER_POLICY_LOCAL">Manter whitelist em cache local até expirar (Recomendado)</option>
                    <option value="BLOQUEIO_TOTAL">Bloqueio preventivo de segurança</option>
                  </select>
                </div>

                <div className="flex items-start gap-3 p-3.5 border border-zinc-800 bg-zinc-950/60 rounded-lg">
                  <input
                    type="checkbox"
                    id="strictKiosk"
                    checked={strictKioskMode}
                    onChange={(e) => setStrictKioskMode(e.target.checked)}
                    className="mt-1 w-4 h-4 text-violet-600 rounded bg-zinc-900 border-zinc-700"
                  />
                  <div>
                    <label htmlFor="strictKiosk" className="font-bold text-zinc-200 block">
                      Priorizar Launcher Protegido / Lock Task Mode quando suportado
                    </label>
                    <p className="text-zinc-400 text-[11px] mt-0.5">
                      Garante que botões de início e alternância de tarefas permaneçam restritos às ferramentas educacionais.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="px-4 py-2 bg-violet-600 text-white font-bold rounded-lg hover:bg-violet-500">
                  Salvar Políticas
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: QR Code & Criptografia */}
          {activeTab === "nfc" && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-bold text-zinc-100">Arquitetura de Segurança & Criptografia</h3>
                <p className="text-zinc-400 mt-0.5">Garantias contra clonagem de QR Code, replay-attacks e validação por presença física.</p>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Key className="w-4 h-4" /> Algoritmo Ativo: ECDSA P-256 (NIST Curve)
                  </span>
                  <StatusBadge status="ECDSA Válida" size="sm" />
                </div>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  Os QR Codes dinâmicos do OnFocus são efêmeros (TTL de 60 segundos) e assinados com a chave privada da instituição. O smartphone valida a assinatura com a chave pública embutida no app.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 font-mono text-[10px]">
                  <div className="p-2.5 bg-zinc-900/80 border border-zinc-800 rounded-lg">
                    <span className="font-sans font-bold text-violet-400 block">Nonce Anti-Replay</span>
                    <span className="text-zinc-300">Garante código único por rotação</span>
                  </div>
                  <div className="p-2.5 bg-zinc-900/80 border border-zinc-800 rounded-lg">
                    <span className="font-sans font-bold text-emerald-400 block">Hash BSSID Wi-Fi</span>
                    <span className="text-zinc-300">Valida presença sob a rede escolar</span>
                  </div>
                  <div className="p-2.5 bg-zinc-900/80 border border-zinc-800 rounded-lg">
                    <span className="font-sans font-bold text-amber-400 block">TTL 60 Segundos</span>
                    <span className="text-zinc-300">Janela de expiração curta</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Privacidade & LGPD */}
          {activeTab === "privacidade" && (
            <div className="space-y-4 text-xs leading-relaxed text-zinc-300">
              <div className="border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-bold text-zinc-100">Princípio de Minimização de Dados (LGPD Art. 6º)</h3>
                <p className="text-zinc-400 mt-0.5">O OnFocus prioriza o foco pedagógico sem vigilância invasiva.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-emerald-900/60 bg-emerald-950/20 space-y-2">
                  <h4 className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dados Monitorados (Autorizados)
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-emerald-200/80 text-[11px]">
                    <li>Dispositivo e turma vinculada à sessão</li>
                    <li>Nível percentual de bateria do aparelho</li>
                    <li>Nome do pacote em primeiro plano autorizado (ex: GeoGebra)</li>
                    <li>Contagem agregada de interceptações amigáveis de foco</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-rose-900/60 bg-rose-950/20 space-y-2">
                  <h4 className="font-bold text-rose-300 flex items-center gap-1.5">
                    <EyeOff className="w-4 h-4 text-rose-400" /> NÃO Monitorado (Privacidade Absoluta)
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-rose-200/80 text-[11px]">
                    <li>Fotos, galeria ou arquivos pessoais do aluno</li>
                    <li>Mensagens privadas, WhatsApp ou redes sociais</li>
                    <li>Câmera, microfone ou gravação/espelhamento de tela</li>
                    <li>Nomes de aplicativos pessoais que foram bloqueados</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Logs de Auditoria */}
          {activeTab === "logs" && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-zinc-100">Logs de Auditoria & Conformidade</h3>
                  <p className="text-zinc-400 mt-0.5">Registro auditável de eventos operacionais com dados minimizados.</p>
                </div>
                <button
                  onClick={handleExportAuditLogs}
                  className="px-3 py-1.5 bg-violet-600 text-white font-bold rounded-lg hover:bg-violet-500 flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" /> Exportar JSON
                </button>
              </div>

              <div className="border border-zinc-800 rounded-lg overflow-hidden max-h-96 overflow-y-auto bg-zinc-950">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-zinc-900 border-b border-zinc-800 font-semibold text-zinc-400">
                    <tr>
                      <th className="p-2.5">Horário</th>
                      <th className="p-2.5">Tipo</th>
                      <th className="p-2.5">Descrição</th>
                      <th className="p-2.5">Sala</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 font-mono text-[11px]">
                    {logs.map((l) => (
                      <tr key={l.id} className="hover:bg-zinc-900/60">
                        <td className="p-2.5 text-zinc-500">{l.timestamp}</td>
                        <td className="p-2.5 font-bold text-violet-300">{l.tipo}</td>
                        <td className="p-2.5 text-zinc-300 font-sans">{l.descricao}</td>
                        <td className="p-2.5 text-zinc-500">{l.sala || "—"}</td>
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
    <Suspense fallback={<div className="p-8 text-center text-xs text-zinc-500">Carregando configurações...</div>}>
      <ConfiguracoesContent />
    </Suspense>
  );
}
