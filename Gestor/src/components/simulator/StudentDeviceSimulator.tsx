"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Wifi,
  Battery,
  Signal,
  Lock,
  Unlock,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  LogOut,
  Radio,
  CheckCircle2,
  AlertOctagon,
  ArrowLeft,
  ArrowRight,
  Compass,
  Calculator,
  FileText,
  Folder,
  Globe,
  BookOpen,
  MessageSquare,
  Sparkles,
  RefreshCw,
  Eye,
  Smartphone
} from "lucide-react";

export const StudentDeviceSimulator: React.FC = () => {
  const { simulatorState, setSimulatorState, aulas, triggerSimulatedAlert } = useApp();
  const [interactiveAngle, setInteractiveAngle] = useState(45);

  const activeAula = aulas.find(a => a.status === "Ao vivo") || aulas[0];

  const setScreen = (screen: 1 | 2 | 3 | 4 | 5 | 6) => {
    setSimulatorState(prev => ({ ...prev, currentScreen: screen }));
  };

  return (
    <div className="flex flex-col items-center">
      {/* Simulation Screen Selector Bar */}
      <div className="flex items-center flex-wrap gap-1.5 justify-center mb-4 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs">
        <span className="text-[11px] font-bold text-slate-500 px-2 uppercase">Telas do PDF:</span>
        <button
          onClick={() => setScreen(1)}
          className={"px-2.5 py-1 rounded-lg font-medium transition-all " + (simulatorState.currentScreen === 1 ? "bg-[#1683D8] text-white shadow-sm" : "hover:bg-slate-200 text-slate-700")}
        >
          1. Standby
        </button>
        <button
          onClick={() => setScreen(2)}
          className={"px-2.5 py-1 rounded-lg font-medium transition-all " + (simulatorState.currentScreen === 2 ? "bg-[#1683D8] text-white shadow-sm" : "hover:bg-slate-200 text-slate-700")}
        >
          2. Scan NFC
        </button>
        <button
          onClick={() => setScreen(3)}
          className={"px-2.5 py-1 rounded-lg font-medium transition-all " + (simulatorState.currentScreen === 3 ? "bg-[#1683D8] text-white shadow-sm" : "hover:bg-slate-200 text-slate-700")}
        >
          3. Launcher Ativo
        </button>
        <button
          onClick={() => setScreen(4)}
          className={"px-2.5 py-1 rounded-lg font-medium transition-all " + (simulatorState.currentScreen === 4 ? "bg-[#1683D8] text-white shadow-sm" : "hover:bg-slate-200 text-slate-700")}
        >
          4. GeoGebra App
        </button>
        <button
          onClick={() => setScreen(5)}
          className={"px-2.5 py-1 rounded-lg font-medium transition-all " + (simulatorState.currentScreen === 5 ? "bg-[#1683D8] text-white shadow-sm" : "hover:bg-slate-200 text-slate-700")}
        >
          5. App Bloqueado
        </button>
        <button
          onClick={() => setScreen(6)}
          className={"px-2.5 py-1 rounded-lg font-medium transition-all " + (simulatorState.currentScreen === 6 ? "bg-[#1683D8] text-white shadow-sm" : "hover:bg-slate-200 text-slate-700")}
        >
          6. Aula Finalizada
        </button>
      </div>

      {/* Android Smartphone Chassis */}
      <div className="w-[340px] h-[680px] bg-slate-950 rounded-[44px] p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border-4 border-slate-800 relative flex flex-col select-none overflow-hidden ring-1 ring-white/20">
        
        {/* Smartphone Notch & Speaker */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full flex items-center justify-center gap-2 z-40 border border-slate-800/80">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-1 ring-slate-800" />
          <div className="w-8 h-1 rounded-full bg-slate-800" />
        </div>

        {/* Smartphone Screen Content */}
        <div className="w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col text-slate-900 relative">
          
          {/* Top Android Status Bar */}
          <div className="h-10 pt-2 px-5 flex items-center justify-between text-[11px] font-semibold text-slate-600 border-b border-slate-100/60 bg-white/90 backdrop-blur-sm z-30">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#1683D8] text-white flex items-center justify-center text-[10px] font-bold">
                <Lock className="w-3 h-3" />
              </div>
              <span className="font-bold text-slate-800">Modo Aula</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3 text-[#1683D8]" />
              <span>{simulatorState.batteryLevel}%</span>
              <Battery className="w-3.5 h-3.5 fill-slate-500" />
            </div>
          </div>

          {/* SCREEN 1: STANDBY / INITIAL WHITELIST */}
          {simulatorState.currentScreen === 1 && (
            <div className="flex-1 flex flex-col justify-between p-4 overflow-y-auto animate-in fade-in duration-200">
              <div className="text-center pt-2">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center justify-center gap-1">
                  Horário de Brasília
                </span>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mt-1">08:30</h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Segunda-feira, 22 de Maio</p>
              </div>

              {/* Session Meta */}
              <div className="space-y-2 mt-4 text-left">
                <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">SALA</span>
                  <p className="text-xs font-bold text-slate-800">{activeAula.sala} - Bloco B</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">DISCIPLINA</span>
                  <p className="text-xs font-bold text-slate-800">{activeAula.disciplina} Aplicada</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">TURMA</span>
                  <p className="text-xs font-bold text-slate-800">3º Ano Ensino Médio - A</p>
                </div>
              </div>

              {/* Whitelist section */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400">APLICATIVOS AUTORIZADOS</span>
                  <span className="text-[9px] font-bold bg-blue-50 text-[#1683D8] px-2 py-0.5 rounded-full border border-blue-200">
                    WHITELIST ATIVA
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div onClick={() => setScreen(4)} className="flex items-center justify-between p-2 rounded-lg border border-slate-200/80 bg-white hover:border-[#1683D8] hover:bg-blue-50/30 cursor-pointer transition-all">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1683D8] flex items-center justify-center font-bold text-xs">
                        01
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">GeoGebra</p>
                        <p className="text-[10px] text-slate-400">Calculadora Gráfica e Geometria</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div onClick={() => setScreen(4)} className="flex items-center justify-between p-2 rounded-lg border border-slate-200/80 bg-white hover:border-[#1683D8] cursor-pointer transition-all">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Calculadora</p>
                        <p className="text-[10px] text-slate-400">Operações matemáticas básicas</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div onClick={() => setScreen(5)} className="flex items-center justify-between p-2 rounded-lg border border-slate-200/80 bg-white hover:border-[#1683D8] cursor-pointer transition-all">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Google Docs</p>
                        <p className="text-[10px] text-slate-400">Editor de textos e notas</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div onClick={() => setScreen(5)} className="flex items-center justify-between p-2 rounded-lg border border-slate-200/80 bg-white hover:border-[#1683D8] cursor-pointer transition-all">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                        <Folder className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Arquivos</p>
                        <p className="text-[10px] text-slate-400">Documentos da aula e PDFs</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Footer status */}
              <div className="pt-3 border-t border-slate-100 mt-2">
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-semibold text-slate-400 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1683D8] animate-ping" />
                  <span>CONECTADO À REDE ESCOLAR</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#1683D8] font-medium pt-1">
                  <button className="flex items-center gap-1 hover:underline text-slate-500">
                    <HelpCircle className="w-3.5 h-3.5" /> Ajuda
                  </button>
                  <button onClick={() => setScreen(6)} className="flex items-center gap-1 hover:underline text-[#1683D8]">
                    <LogOut className="w-3.5 h-3.5" /> Encerrar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 2: NFC PROXIMITY SCANNING */}
          {simulatorState.currentScreen === 2 && (
            <div className="flex-1 flex flex-col justify-between p-5 text-center animate-in fade-in duration-200">
              <div className="my-auto">
                <div className="w-28 h-28 mx-auto rounded-full bg-blue-50/80 border-2 border-[#1683D8] flex items-center justify-center relative mb-6">
                  <div className="absolute inset-0 rounded-full border border-blue-300 animate-ping opacity-75" />
                  <Radio className="w-12 h-12 text-[#1683D8] animate-pulse" />
                </div>

                <h2 className="text-xl font-extrabold text-slate-900">Aproxime o Dispositivo</h2>
                <p className="text-xs text-slate-500 mt-2 px-3 leading-relaxed">
                  Toque na tag NFC na entrada da sala para ativar o modo aula automaticamente.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mt-6 text-left">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#1683D8] uppercase tracking-wider mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#1683D8] animate-pulse" />
                    STATUS DO SISTEMA
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Aguardando conexão segura com o sensor da sala de aula. Não retire o celular até a confirmação.
                  </p>
                </div>

                <button
                  onClick={() => setScreen(3)}
                  className="mt-6 w-full py-2.5 bg-[#1683D8] text-white text-xs font-bold rounded-xl shadow-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Radio className="w-4 h-4" /> Simular Toque na Tag NFC
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase mb-3">
                  <span>ID DA SALA: SALA-302</span>
                  <span>V 1.0.2-BETA</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1683D8]" /> Modo Aula Protegido
                  </span>
                  <button onClick={() => setScreen(1)} className="text-[#1683D8] font-bold flex items-center gap-1">
                    <LogOut className="w-3.5 h-3.5" /> Encerrar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 3: ACTIVE MODO AULA LAUNCHER */}
          {simulatorState.currentScreen === 3 && (
            <div className="flex-1 flex flex-col justify-between p-4 text-center animate-in fade-in duration-200">
              <div>
                <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 border-2 border-[#1683D8] flex items-center justify-center relative mt-2 mb-3 shadow-inner">
                  <Lock className="w-8 h-8 text-[#1683D8]" />
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3" />
                  </span>
                </div>

                <h2 className="text-lg font-extrabold text-slate-900">Modo Aula Ativado</h2>
                <p className="text-[11px] text-slate-500 mt-1 px-4 leading-relaxed">
                  Apenas apps autorizados estão permitidos para garantir seu foco total no aprendizado.
                </p>

                {/* Session Active Box */}
                <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-2.5 mt-3 text-left">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#1683D8]">
                    <span className="w-2 h-2 rounded-full bg-[#1683D8] animate-pulse" />
                    Sessão Ativa: Sala 101 • Matemática Aplicada
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">Prof. Ricardo Silva</p>
                </div>

                {/* Allowed Apps List */}
                <div className="mt-4 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase text-slate-400">APLICATIVOS AUTORIZADOS</span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      4 APPS
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div 
                      onClick={() => setScreen(4)}
                      className="flex items-center justify-between p-2 rounded-xl border border-blue-200 bg-blue-50/20 hover:bg-blue-50 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-sm">
                          <Calculator className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">GeoGebra</p>
                          <p className="text-[10px] text-slate-400">Matemática</p>
                        </div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    </div>

                    <div 
                      onClick={() => setScreen(4)}
                      className="flex items-center justify-between p-2 rounded-xl border border-slate-200 bg-white hover:border-[#1683D8] cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Dicionário PT</p>
                          <p className="text-[10px] text-slate-400">Línguas</p>
                        </div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-slate-300" />
                    </div>

                    <div 
                      onClick={() => setScreen(4)}
                      className="flex items-center justify-between p-2 rounded-xl border border-slate-200 bg-white hover:border-[#1683D8] cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                          <Compass className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Navegador Escolar</p>
                          <p className="text-[10px] text-slate-400">Pesquisa</p>
                        </div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-slate-300" />
                    </div>

                    <div 
                      onClick={() => setScreen(4)}
                      className="flex items-center justify-between p-2 rounded-xl border border-slate-200 bg-white hover:border-[#1683D8] cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Chat Turma 3B</p>
                          <p className="text-[10px] text-slate-400">Comunicação</p>
                        </div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-slate-300" />
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <button
                    onClick={() => {
                      triggerSimulatedAlert("Tentativa de App Restrito", "Aluno Simulado (Android)");
                      setScreen(5);
                    }}
                    className="text-[11px] text-rose-600 hover:text-rose-700 font-semibold underline"
                  >
                    ⚠️ Testar tentativa de abrir app não autorizado (Instagram/Games)
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-center">
                <p className="text-[10px] text-slate-400 leading-tight mb-2">
                  Outros aplicativos serão bloqueados automaticamente até o fim da aula ou saída via NFC.
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <button className="flex items-center gap-1 hover:underline text-slate-500">
                    <HelpCircle className="w-3.5 h-3.5" /> Ajuda
                  </button>
                  <button onClick={() => setScreen(6)} className="text-[#1683D8] font-bold flex items-center gap-1">
                    <LogOut className="w-3.5 h-3.5" /> Encerrar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 4: OPEN WHITELISTED APP (GEOGEBRA INTERACTIVE) */}
          {simulatorState.currentScreen === 4 && (
            <div className="flex-1 flex flex-col justify-between bg-slate-50 animate-in fade-in duration-200 overflow-hidden">
              {/* Security Banner Header */}
              <div className="bg-slate-900 text-white px-3 py-1.5 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-blue-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="font-semibold uppercase tracking-wider text-[10px] text-slate-200">
                    SEGURANÇA ATIVA: App Autorizado
                  </span>
                </div>
                <Lock className="w-3 h-3 text-slate-400" />
              </div>

              {/* GeoGebra Top Toolbar */}
              <div className="bg-white border-b border-slate-200 px-3 py-2 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#1683D8] text-white flex items-center justify-center font-bold text-[10px]">
                    GG
                  </div>
                  <span className="font-extrabold text-xs text-slate-800">GeoGebra</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <span className="text-[10px] font-bold bg-slate-100 px-1.5 py-0.5 rounded">sin/cos</span>
                </div>
              </div>

              {/* Interactive Geometry Canvas */}
              <div className="flex-1 p-3 flex flex-col justify-between overflow-hidden">
                <div className="space-y-1.5 text-[11px] font-mono text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-blue-600 font-bold">F(x)</span>
                    <span>sin(x) + cos(x)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-purple-600 font-bold">C1</span>
                    <span>Circle(A, 5)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span className="text-emerald-600 font-bold">A</span>
                    <span>(2.45, 5.12)</span>
                  </div>
                </div>

                {/* Simulated Interactive Geometry Visual Box */}
                <div className="relative h-44 bg-white rounded-xl border border-slate-200 my-2 overflow-hidden flex items-center justify-center shadow-inner">
                  {/* Grid background */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1683D8_1px,transparent_1px)] [background-size:12px_12px]" />
                  
                  {/* Geometry Shape (Circle & Triangle) */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div 
                      className="w-24 h-24 rounded-full border-2 border-blue-500 bg-blue-500/10 flex items-center justify-center transition-transform"
                      style={{ transform: "rotate(" + interactiveAngle + "deg)" }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    </div>
                    <div className="w-16 h-24 border-2 border-slate-700 bg-slate-800/10 absolute -right-6 flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-slate-700" />
                    </div>
                  </div>

                  <button
                    onClick={() => setInteractiveAngle(prev => (prev + 45) % 360)}
                    className="absolute bottom-2 right-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow-sm"
                  >
                    <RefreshCw className="w-2.5 h-2.5" /> Girar
                  </button>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg text-[10px] font-bold text-emerald-700 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    AULA: GEOMETRIA ANALÍTICA
                  </span>
                  <button onClick={() => setScreen(3)} className="text-[#1683D8] hover:underline">
                    Launcher
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-white p-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <button onClick={() => setScreen(3)} className="flex items-center gap-1 text-[#1683D8] font-semibold">
                  <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Launcher
                </button>
                <button onClick={() => setScreen(6)} className="text-slate-400 hover:text-slate-700 flex items-center gap-1">
                  <LogOut className="w-3.5 h-3.5" /> Encerrar
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 5: RESTRICTED / BLOCKED APP NOTICE */}
          {simulatorState.currentScreen === 5 && (
            <div className="flex-1 flex flex-col justify-between p-5 text-center animate-in fade-in duration-200 bg-white">
              <div className="my-auto">
                <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center relative mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-300 opacity-60 flex items-center justify-center">
                    <InstagramIcon className="w-6 h-6 text-slate-500" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-md">
                    <Lock className="w-4 h-4" />
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                  <AlertOctagon className="w-3.5 h-3.5" /> Acesso Restrito
                </div>

                <h2 className="text-base font-extrabold text-slate-900 mt-2">
                  Este aplicativo não é permitido nesta aula.
                </h2>

                <p className="text-xs text-slate-500 mt-2 px-2 leading-relaxed">
                  O seu dispositivo está configurado para o <strong className="text-slate-800">Modo Aula</strong>. Durante este período, apenas ferramentas educacionais autorizadas podem ser acessadas.
                </p>

                <button
                  onClick={() => setScreen(3)}
                  className="mt-6 w-full py-2.5 bg-[#1683D8] text-white text-xs font-bold rounded-xl shadow-md hover:bg-blue-600 transition-all flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Voltar para o Launcher
                </button>

                <p className="text-[11px] text-slate-400 italic mt-3">
                  Seu progresso escolar é prioridade agora.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-left flex items-center gap-2.5">
                  <Lock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">STATUS DO SISTEMA</span>
                    <p className="text-xs font-bold text-slate-800">Bloqueio Ativo: Sala 302B</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-medium mt-3">
                  <button className="flex items-center gap-1 text-slate-400 hover:text-slate-600">
                    <HelpCircle className="w-3.5 h-3.5" /> Ajuda
                  </button>
                  <button onClick={() => setScreen(6)} className="text-[#1683D8] font-bold flex items-center gap-1">
                    <LogOut className="w-3.5 h-3.5" /> Encerrar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 6: CLASS FINISHED / RESTORATION */}
          {simulatorState.currentScreen === 6 && (
            <div className="flex-1 flex flex-col justify-between p-5 text-center animate-in fade-in duration-200 bg-white">
              <div className="my-auto">
                <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 border-2 border-[#1683D8] flex items-center justify-center relative mb-4">
                  <CheckCircle2 className="w-10 h-10 text-[#1683D8]" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-100 border border-slate-300 rounded-full flex items-center justify-center">
                    <Unlock className="w-3 h-3 text-slate-600" />
                  </div>
                </div>

                <h2 className="text-xl font-extrabold text-slate-900">Aula finalizada</h2>
                <p className="text-xs text-slate-500 mt-2 px-2 leading-relaxed">
                  O Modo Aula foi encerrado com sucesso. Todas as funcionalidades do seu aparelho foram restauradas.
                </p>

                <div className="space-y-2 mt-6 text-left">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">STATUS ATUAL</span>
                      <p className="text-xs font-bold text-slate-800">Dispositivo Desbloqueado</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-[#1683D8] flex-shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">ACESSO</span>
                      <p className="text-xs font-bold text-slate-800">Uso normal permitido</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setScreen(1)}
                  className="mt-6 w-full py-3 bg-[#1683D8] text-white text-xs font-bold rounded-xl shadow-md hover:bg-blue-600 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Retornar ao Início</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-slate-400 mt-3">
                  Sua sessão durou aproximadamente 50 minutos.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1683D8]" /> Modo Aula Protegido
                </span>
                <span className="text-slate-400">100% Seguro</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}
