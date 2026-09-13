import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Wifi, Battery, Radio, HelpCircle, LogOut, CheckCircle2, 
  FileText, Folder, ChevronRight, AlertCircle, Sparkles, ArrowRight
} from 'lucide-react';

const SCREENS = [
  {
    id: 1,
    tab: '1. Standby / Início',
    title: 'Standby da Aula & Políticas',
    desc: 'Visão inicial antes da aula: o aluno verifica a disciplina, sala, professor e os aplicativos liberados na Whitelist da aula de hoje.',
    pdfRef: 'Página 1 do PDF',
  },
  {
    id: 2,
    tab: '2. Scan NFC',
    title: 'Aproximação da Tag NFC',
    desc: 'O aluno encosta o celular na Tag NFC fixada na carteira ou entrada da sala. O app valida a assinatura digital e inicia a proteção.',
    pdfRef: 'Página 2 do PDF',
  },
  {
    id: 3,
    tab: '3. Launcher Ativado',
    title: 'Modo Aula Ativado',
    desc: 'O smartphone assume o Launcher Seguro: as notificações e redes sociais são suprimidas e apenas os apps autorizados ficam disponíveis.',
    pdfRef: 'Página 3 do PDF',
  },
  {
    id: 4,
    tab: '4. App Pedagógico',
    title: 'GeoGebra em Execução Segura',
    desc: 'O estudante utiliza ferramentas avançadas de aprendizagem (como o GeoGebra dinâmico) com a barra de segurança ativa no topo.',
    pdfRef: 'Página 4 do PDF',
  },
  {
    id: 5,
    tab: '5. Alerta de Foco',
    title: 'Acesso Restrito Interceptado',
    desc: 'Caso o aluno tente abrir um aplicativo não autorizado (como redes sociais ou jogos), a tela educativa orienta o retorno imediato ao estudo.',
    pdfRef: 'Página 5 do PDF',
  },
  {
    id: 6,
    tab: '6. Aula Finalizada',
    title: 'Desbloqueio & Restauração',
    desc: 'Ao fim da aula ou comando do professor, o Modo Aula é encerrado e todas as funções e notificações do aparelho retornam ao normal.',
    pdfRef: 'Página 6 do PDF',
  },
];

export const MobileAppShowcase: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState(1);

  return (
    <section id="mobile" className="py-24 px-6 lg:px-12 bg-[#080b12]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-2 block">
            Módulo Mobile (Dispositivo do Estudante)
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            A experiência do aluno em <span className="text-sky-400">6 etapas</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 font-light">
            Interface limpa, moderna e sem distrações projetada para Android e iOS.
          </p>
        </div>

        {/* Interactive Screen Selector Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {SCREENS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveScreen(s.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeScreen === s.id
                  ? 'bg-[#0284c7] text-white font-bold shadow-lg shadow-sky-900/50'
                  : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-white/5'
              }`}
            >
              {s.tab}
            </button>
          ))}
        </div>

        {/* Main Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Explanatory Context */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider mb-2">
              {SCREENS[activeScreen - 1].pdfRef}
            </span>
            
            <h3 className="text-2xl sm:text-4xl font-bold text-white mb-4">
              {SCREENS[activeScreen - 1].title}
            </h3>
            
            <p className="text-slate-300 text-base leading-relaxed font-light mb-8">
              {SCREENS[activeScreen - 1].desc}
            </p>

            {/* Stage Quick Indicators */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl glass-card flex items-center justify-between">
                <span className="text-xs text-slate-400">Ambiente de Segurança:</span>
                <span className="text-xs font-bold text-sky-400">Kiosk Lock Task Mode</span>
              </div>
              <div className="p-4 rounded-xl glass-card flex items-center justify-between">
                <span className="text-xs text-slate-400">Validação de Presença:</span>
                <span className="text-xs font-bold text-emerald-400">Tag NFC Criptografada</span>
              </div>
              <div className="p-4 rounded-xl glass-card flex items-center justify-between">
                <span className="text-xs text-slate-400">Privacidade do Aluno:</span>
                <span className="text-xs font-bold text-slate-200">100% Protegida (LGPD)</span>
              </div>
            </div>
          </div>

          {/* Right: Pixel-Perfect Mobile Mockup matching the PDF */}
          <div className="lg:col-span-6 flex justify-center">
            
            {/* Phone Container */}
            <div className="w-[320px] sm:w-[350px] min-h-[640px] bg-white rounded-[44px] p-3 shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(2,132,199,0.15)] border-[6px] border-slate-800 relative flex flex-col justify-between overflow-hidden text-slate-800">
              
              {/* Phone Header Bar */}
              <div className="w-full flex items-center justify-between px-3 py-1.5 border-b border-slate-100 text-[11px] font-sans">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-[#0284c7] flex items-center justify-center text-white">
                    <Lock className="w-3 h-3" />
                  </div>
                  <span className="font-bold text-slate-800 text-xs">Modo Aula</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500 text-[10px]">
                  <span>85%</span>
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Dynamic Screen Contents matching Visily PDF exactly */}
              <div className="flex-1 bg-[#f8fafc] p-4 flex flex-col justify-between relative overflow-y-auto">
                <AnimatePresence mode="wait">
                  
                  {/* SCREEN 1: Standby & Whitelist */}
                  {activeScreen === 1 && (
                    <motion.div
                      key="screen-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col justify-between"
                    >
                      <div>
                        {/* Clock Header */}
                        <div className="text-center my-3">
                          <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
                            HORÁRIO DE BRASÍLIA
                          </span>
                          <div className="text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
                            08:30
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Segunda-feira, 22 de Maio
                          </div>
                        </div>

                        {/* Class Info Box */}
                        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 mb-4 shadow-sm space-y-2 text-xs">
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">SALA</span>
                            <span className="font-bold text-slate-800">Sala 101 - Bloco B</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">DISCIPLINA</span>
                            <span className="font-bold text-slate-800">Matemática Aplicada</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">TURMA</span>
                            <span className="font-semibold text-slate-700">3º Ano Ensino Médio - A</span>
                          </div>
                        </div>

                        {/* Whitelist section */}
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">APLICATIVOS AUTORIZADOS</span>
                          <span className="text-[9px] font-bold text-[#0284c7] bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                            WHITELIST ATIVA
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                                01
                              </div>
                              <div>
                                <div className="text-xs font-bold text-slate-800">GeoGebra</div>
                                <div className="text-[10px] text-slate-500">Calculadora Gráfica e Geometria</div>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>

                          <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                                <FileText className="w-4 h-4 text-slate-600" />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-slate-800">Calculadora</div>
                                <div className="text-[10px] text-slate-500">Operações matemáticas básicas</div>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                      </div>

                      {/* Footer Info */}
                      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-sky-500" />
                          <span>CONECTADO À REDE ESCOLAR</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* SCREEN 2: Aproxime o Dispositivo (NFC Scan) */}
                  {activeScreen === 2 && (
                    <motion.div
                      key="screen-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col justify-between text-center"
                    >
                      <div className="pt-6">
                        {/* Radar NFC Circle */}
                        <div className="relative w-28 h-28 mx-auto flex items-center justify-center mb-6">
                          <div className="absolute inset-0 rounded-full border-2 border-[#0284c7]/40 animate-ping" />
                          <div className="w-24 h-24 rounded-full border border-[#0284c7] flex items-center justify-center bg-sky-50">
                            <Radio className="w-10 h-10 text-[#0284c7]" />
                          </div>
                        </div>

                        <h4 className="text-lg font-bold text-slate-900 mb-1">
                          Aproxime o Dispositivo
                        </h4>
                        <p className="text-xs text-slate-500 px-4 mb-6">
                          Toque na tag NFC na entrada da sala para ativar o modo aula.
                        </p>

                        {/* Status Box */}
                        <div className="bg-white p-4 rounded-xl border border-slate-200 text-left shadow-sm">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#0284c7] uppercase mb-1">
                            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                            <span>STATUS DO SISTEMA</span>
                          </div>
                          <p className="text-xs text-slate-600">
                            Aguardando conexão segura com o sensor da sala de aula. Não retire o celular até a confirmação.
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>ID DA SALA: SALA-302</span>
                        <span>V 1.0.2-BETA</span>
                      </div>
                    </motion.div>
                  )}

                  {/* SCREEN 3: Modo Aula Ativado */}
                  {activeScreen === 3 && (
                    <motion.div
                      key="screen-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col justify-between text-center"
                    >
                      <div>
                        {/* Lock Icon Emblem */}
                        <div className="w-16 h-16 rounded-full bg-sky-100 border border-sky-200 mx-auto flex items-center justify-center text-[#0284c7] mb-3 mt-2 shadow-sm">
                          <Lock className="w-8 h-8" />
                        </div>

                        <h4 className="text-lg font-bold text-slate-900 mb-1">
                          Modo Aula Ativado
                        </h4>
                        <p className="text-xs text-slate-500 px-2 mb-4">
                          Apenas apps autorizados estão permitidos para garantir seu foco total no aprendizado.
                        </p>

                        {/* Active Session Pill */}
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-left mb-4 shadow-sm text-xs">
                          <div className="flex items-center gap-1.5 text-[#0284c7] font-semibold text-[11px]">
                            <span className="w-2 h-2 rounded-full bg-sky-500" />
                            <span>Sessão Ativa: Sala 104 • Matemática Avançada</span>
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5">Prof. Roberto</div>
                        </div>

                        {/* 4 Apps list */}
                        <div className="text-left mb-2 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">APLICATIVOS AUTORIZADOS</span>
                          <span className="text-[10px] font-bold text-slate-500">4 APPS</span>
                        </div>

                        <div className="space-y-1.5 text-left">
                          <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                            <div className="font-bold text-slate-800">GeoGebra</div>
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                            <div className="font-bold text-slate-800">Dicionário PT</div>
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                            <div className="font-bold text-slate-800">Navegador Escolar</div>
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          </div>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 mt-2">
                        Outros aplicativos serão bloqueados automaticamente.
                      </div>
                    </motion.div>
                  )}

                  {/* SCREEN 4: GeoGebra em Execução */}
                  {activeScreen === 4 && (
                    <motion.div
                      key="screen-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col justify-between"
                    >
                      <div>
                        {/* Security Banner */}
                        <div className="bg-[#0284c7] text-white p-2 rounded-lg text-left text-xs mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="font-semibold text-[11px]">Aplicativo autorizado nesta aula</span>
                          </div>
                          <Lock className="w-3.5 h-3.5" />
                        </div>

                        {/* GeoGebra Header */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-sm text-slate-900">GeoGebra</span>
                          <span className="text-[10px] text-slate-500">Geometria e Gráficos</span>
                        </div>

                        {/* Geometry Canvas Simulation */}
                        <div className="bg-white rounded-xl border border-slate-200 p-3 h-44 flex flex-col justify-between shadow-inner relative">
                          <div className="text-[10px] font-mono text-slate-600">
                            F(X) = sin(x) + cos(x)<br />
                            C1: Circle(A, 5)
                          </div>
                          
                          {/* SVG Geometric plot */}
                          <div className="relative w-full h-24 flex items-center justify-center">
                            <svg className="w-full h-full" viewBox="0 0 200 80">
                              <line x1="0" y1="40" x2="200" y2="40" stroke="#cbd5e1" strokeWidth="1" />
                              <line x1="100" y1="0" x2="100" y2="80" stroke="#cbd5e1" strokeWidth="1" />
                              <circle cx="80" cy="40" r="28" fill="none" stroke="#0284c7" strokeWidth="2" />
                              <polygon points="80,15 130,55 90,65" fill="none" stroke="#334155" strokeWidth="1.5" />
                            </svg>
                          </div>

                          <div className="text-[9px] font-mono text-slate-400">
                            A: (2.45, 5.12)
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">AULA: GEOMETRIA ANALÍTICA</span>
                        <span className="text-emerald-600 font-bold">EM EXECUÇÃO</span>
                      </div>
                    </motion.div>
                  )}

                  {/* SCREEN 5: Acesso Restrito */}
                  {activeScreen === 5 && (
                    <motion.div
                      key="screen-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col justify-between text-center"
                    >
                      <div className="pt-4">
                        {/* Blocked App Icon */}
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 mx-auto flex items-center justify-center relative mb-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-400 to-pink-500 opacity-30" />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center">
                            <Lock className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <span className="text-[10px] font-bold text-red-600 tracking-wider uppercase mb-1 block">
                          ACESSO RESTRITO
                        </span>
                        
                        <h4 className="text-base font-bold text-slate-900 mb-2">
                          Este aplicativo não é permitido nesta aula.
                        </h4>
                        
                        <p className="text-xs text-slate-500 px-2 mb-6">
                          O seu dispositivo está configurado para o <strong>Modo Aula</strong>. Durante este período, apenas ferramentas autorizadas podem ser acessadas.
                        </p>

                        <button
                          onClick={() => setActiveScreen(3)}
                          className="w-full py-2.5 rounded-xl bg-[#0284c7] text-white font-bold text-xs shadow-md shadow-sky-800/30 hover:bg-[#0369a1] transition-colors"
                        >
                          &lt; Voltar para o Launcher
                        </button>
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-left text-xs">
                        <span className="text-[9px] font-bold text-slate-400 uppercase block">STATUS DO SISTEMA</span>
                        <span className="font-semibold text-slate-700">Bloqueio Ativo: Sala 302B</span>
                      </div>
                    </motion.div>
                  )}

                  {/* SCREEN 6: Aula Finalizada */}
                  {activeScreen === 6 && (
                    <motion.div
                      key="screen-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col justify-between text-center"
                    >
                      <div className="pt-6">
                        {/* Check Circle */}
                        <div className="w-16 h-16 rounded-full bg-sky-50 border border-sky-200 mx-auto flex items-center justify-center text-[#0284c7] mb-4">
                          <CheckCircle2 className="w-9 h-9" />
                        </div>

                        <h4 className="text-lg font-bold text-slate-900 mb-1">
                          Aula finalizada
                        </h4>
                        
                        <p className="text-xs text-slate-500 px-3 mb-6">
                          O Modo Aula foi encerrado com sucesso. Todas as funcionalidades do seu aparelho foram restauradas.
                        </p>

                        {/* Status Card */}
                        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-left mb-6 space-y-2">
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase block">STATUS ATUAL</span>
                            <span className="font-bold text-slate-900 text-xs">Dispositivo Desbloqueado</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase block">ACESSO</span>
                            <span className="text-xs text-slate-600">Uso normal permitido</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setActiveScreen(1)}
                          className="w-full py-2.5 rounded-xl bg-[#0284c7] text-white font-bold text-xs hover:bg-[#0369a1] transition-colors"
                        >
                          Retornar ao Início &rarr;
                        </button>
                      </div>

                      <div className="text-[10px] text-slate-400">
                        Sessão durou aproximadamente 50 minutos.
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Bottom Nav Bar */}
              <div className="w-full pt-2 pb-1 px-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <button className="flex items-center gap-1 hover:text-slate-800">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Ajuda</span>
                </button>
                <button className="flex items-center gap-1 hover:text-red-600">
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Encerrar</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
