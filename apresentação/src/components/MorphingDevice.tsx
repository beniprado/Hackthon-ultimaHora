import React, { useState, useEffect } from 'react';
import { motion, useTransform } from 'framer-motion';
import { 
  Lock, Radio, CheckCircle2, Battery, Wifi, Compass, 
  BookOpen, Calculator, AlertTriangle, Award, Heart, 
  Sparkles, ChevronRight, ShieldCheck, BarChart3, Users, 
  School, Layers, Settings, ExternalLink, Activity, Search
} from 'lucide-react';
import { ScreenType } from './PhoneDevice';

interface MorphingDeviceProps {
  progress: any;
}

export const MorphingDevice: React.FC<MorphingDeviceProps> = ({ progress }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileScreen, setActiveMobileScreen] = useState<ScreenType>('standby');
  const [activeGestorTab, setActiveGestorTab] = useState<'dashboard' | 'salas' | 'apps'>('dashboard');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update mobile screen & gestor tab based on scroll progress
  useEffect(() => {
    return progress.onChange((v: number) => {
      // Mobile screen selection
      if (v < 0.18) {
        setActiveMobileScreen('standby');
      } else if (v < 0.28) {
        setActiveMobileScreen('nfc');
      } else if (v < 0.38) {
        setActiveMobileScreen('launcher');
      } else if (v < 0.62) {
        setActiveMobileScreen('geogebra');
      } else if (v < 0.74) {
        setActiveMobileScreen('restricted'); // Tela de Reflexao Consciente
      } else {
        setActiveMobileScreen('unlocked'); // Com Selo de Foco
      }

      // Gestor Tab selection in desktop view
      if (v >= 0.52 && v < 0.62) {
        setActiveGestorTab('apps');
      } else if (v >= 0.74 && v < 0.84) {
        setActiveGestorTab('salas');
      } else {
        setActiveGestorTab('dashboard');
      }
    });
  }, [progress]);

  /* =========================================================================
     MORPHING INTERPOLATION TIMELINE
     0.00 - 0.35: Smartphone (Aplicacao Mobile: Standby, NFC, Whitelist)
     0.35 - 0.43: TRANSFORMACAO FLUIDA (Celular expande e se transforma em Laptop!)
     0.43 - 0.61: Laptop / Computador (Aplicacao Desktop: Gestor Web SaaS Next.js)
     0.61 - 0.66: TRANSFORMACAO DE VOLTA (Laptop condensa para Celular)
     0.66 - 0.73: Smartphone (Aplicacao Mobile: Tela de Reflexao Consciente / Lancet)
     0.73 - 0.77: TRANSFORMACAO (Celular expande para Laptop)
     0.77 - 0.85: Laptop / Computador (Aplicacao Desktop: Viabilidade & Gestao Escolar)
     0.85 - 0.89: TRANSFORMACAO (Laptop condensa para Celular)
     0.89 - 1.00: Smartphone (Aplicacao Mobile: Desbloqueio + Selo de Foco Conquistado)
     ========================================================================= */

  // isLaptopFactor: 0 = 100% Smartphone, 1 = 100% Computador Desktop
  const isLaptopFactor = useTransform(
    progress,
    [0.0, 0.35, 0.43, 0.61, 0.66, 0.73, 0.77, 0.85, 0.89, 1.0],
    [0.0, 0.00, 1.00, 1.00, 0.00, 0.00, 1.00, 1.00, 0.00, 0.0]
  );

  // Desktop Dimensions
  const desktopWidth = useTransform(isLaptopFactor, [0, 1], [275, 590]);
  const desktopHeight = useTransform(isLaptopFactor, [0, 1], [550, 375]);

  // Mobile Dimensions (scaled to guarantee ZERO overflow or text collision)
  const mobileWidth = useTransform(isLaptopFactor, [0, 1], [215, 330]);
  const mobileHeight = useTransform(isLaptopFactor, [0, 1], [430, 225]);

  // Dynamic Corner Radius: Phone (44px) -> Laptop Screen (16px)
  const chassisBorderRadius = useTransform(isLaptopFactor, [0, 1], [44, 16]);

  // Laptop Base Deck Animation: slides in from bottom when morphing into laptop
  const laptopBaseOpacity = useTransform(isLaptopFactor, [0.4, 0.9], [0, 1]);
  const laptopBaseScaleX = useTransform(isLaptopFactor, [0.3, 1], [0.5, 1]);

  // Cross-fade between Mobile UI and Desktop UI
  const mobileUiOpacity = useTransform(isLaptopFactor, [0.15, 0.55], [1, 0]);
  const desktopUiOpacity = useTransform(isLaptopFactor, [0.45, 0.85], [0, 1]);

  // Subtle 3D Depth rotation
  const rotateY = useTransform(progress, [0.0, 0.5, 1.0], [1, -2, 0]);
  const rotateX = useTransform(progress, [0.0, 0.5, 1.0], [3, 0, 1]);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
      
      {/* Dynamic Ambient Glow Behind Device */}
      <motion.div 
        style={{
          width: isMobile ? mobileWidth : desktopWidth,
          height: isMobile ? mobileHeight : desktopHeight,
        }}
        className="absolute rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none transition-all duration-300"
      />

      {/* 3D Ground Contact Shadow */}
      <motion.div 
        style={{
          width: isMobile ? mobileWidth : desktopWidth,
          scaleX: 1.1,
        }}
        className="absolute -bottom-8 h-8 bg-black/80 blur-xl rounded-full pointer-events-none transition-all duration-300"
      />

      {/* =========================================================================
          MASTER DEVICE CHASSIS (Morphs smoothly between Phone and Laptop Screen)
          ========================================================================= */}
      <motion.div
        style={{
          width: isMobile ? mobileWidth : desktopWidth,
          height: isMobile ? mobileHeight : desktopHeight,
          borderRadius: chassisBorderRadius,
          rotateY,
          rotateX,
          transformPerspective: 1200,
        }}
        className="relative bg-[#070a14] p-2 border border-white/[0.18] shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(0,240,255,0.06),inset_0_0_0_1px_rgba(255,255,255,0.12)] flex flex-col justify-between overflow-hidden will-change-[width,height,border-radius]"
      >
        
        {/* Specular Edge Highlight */}
        <div className="absolute inset-0 rounded-[inherit] border border-white/[0.08] pointer-events-none z-40" />
        <div className="absolute -top-[100%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/[0.07] via-transparent to-transparent pointer-events-none z-40 rotate-12" />

        {/* =====================================================================
            TOP BAR 1: SMARTPHONE DYNAMIC ISLAND & STATUS BAR (Visible in Phone Mode)
            ===================================================================== */}
        <motion.div 
          style={{ opacity: mobileUiOpacity }}
          className="relative w-full flex items-center justify-between px-3.5 pt-1 pb-1 bg-[#090d1a] rounded-t-[36px] z-30 text-[9.5px] border-b border-white/[0.06] text-white shrink-0"
        >
          <span className="font-space font-bold text-[9.5px] text-white tracking-tight">08:30</span>

          {/* Dynamic Island Capsule */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-black rounded-full border border-white/10 shadow-inner">
            <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              activeMobileScreen === 'standby' ? 'bg-amber-400' :
              activeMobileScreen === 'nfc' ? 'bg-cyan-400 animate-ping' :
              activeMobileScreen === 'restricted' ? 'bg-amber-400' :
              'bg-emerald-400 animate-pulse'
            }`} />
            <span className="text-[8px] font-mono text-slate-300 font-medium tracking-tight">
              {activeMobileScreen === 'standby' && 'Sala 101'}
              {activeMobileScreen === 'nfc' && 'NFC • Lendo'}
              {activeMobileScreen === 'launcher' && 'OnFocus • Ativo'}
              {activeMobileScreen === 'geogebra' && 'GeoGebra'}
              {activeMobileScreen === 'restricted' && 'Pausa Foco'}
              {activeMobileScreen === 'unlocked' && 'Liberado'}
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-300 font-mono text-[8.5px]">
            <Wifi className="w-2.5 h-2.5 text-slate-400" />
            <div className="flex items-center gap-0.5">
              <span>98%</span>
              <Battery className="w-3 h-3 text-emerald-400" />
            </div>
          </div>
        </motion.div>

        {/* =====================================================================
            TOP BAR 2: LAPTOP BROWSER CHROME & URL BAR (Visible in Laptop Mode)
            ===================================================================== */}
        <motion.div
          style={{ opacity: desktopUiOpacity }}
          className="absolute top-0 left-0 right-0 h-8 sm:h-9 bg-[#0b0f1d] border-b border-white/[0.08] px-3 flex items-center justify-between z-30 rounded-t-[14px]"
        >
          {/* Mac window dots */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          {/* Browser Address Bar */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/40 border border-white/[0.08] text-[9.5px] sm:text-[10.5px] font-mono text-slate-300 max-w-[280px] sm:max-w-[340px] w-full justify-center">
            <Lock className="w-2.5 h-2.5 text-emerald-400" />
            <span className="text-slate-400 truncate">https://</span>
            <span className="text-cyan-300 font-semibold truncate">hackthon-ultima-hora.vercel.app</span>
            <span className="text-slate-500 truncate">/dashboard</span>
          </div>

          {/* Next.js Badge */}
          <div className="hidden sm:inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-semibold">
            <span>Next.js 14 SaaS</span>
          </div>
        </motion.div>

        {/* =====================================================================
            DISPLAY VIEWPORT (Contains both interfaces with cross-fade)
            ===================================================================== */}
        <div className="relative flex-1 bg-[#090d18] rounded-[inherit] overflow-hidden flex flex-col justify-between">
          
          {/* -----------------------------------------------------------------
              APPLICATION 1: MOBILE STUDENT APP (Active in Phone Mode)
              ----------------------------------------------------------------- */}
          <motion.div 
            style={{ opacity: mobileUiOpacity }}
            className="absolute inset-0 p-3 sm:p-3.5 flex flex-col justify-between text-white z-20 pointer-events-none"
          >
            {/* Screen 1: Standby / Classroom Unit */}
            {activeMobileScreen === 'standby' && (
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-center my-1.5">
                    <span className="text-[8.5px] text-cyan-400 font-bold uppercase tracking-[0.2em] font-mono">
                      UNIDADE: AULA (NÃO O APARELHO)
                    </span>
                    <div className="text-3xl font-extrabold text-white font-space mt-0.5">08:30</div>
                    <div className="text-[10px] text-slate-400">Segunda-feira • Sala 101</div>
                  </div>

                  <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/[0.08] mb-2 space-y-0.5">
                    <div className="flex items-center justify-between text-[8.5px] font-mono">
                      <span className="text-cyan-400 font-bold">MATEMÁTICA APLICADA</span>
                      <span className="text-emerald-400">Pronto p/ Aula</span>
                    </div>
                    <div className="text-xs font-bold text-white font-space">Prof. Ricardo Silva</div>
                    <div className="text-[9.5px] text-slate-400">A mesma aluna em Português terá só Dicionário</div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="bg-white/[0.03] p-2 rounded-lg border border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                          <Compass className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[11px] font-bold text-white font-space">GeoGebra Pro</span>
                      </div>
                      <span className="text-[9px] font-mono text-cyan-400">Autorizado</span>
                    </div>
                    
                    <div className="bg-white/[0.03] p-2 rounded-lg border border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                          <Calculator className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[11px] font-bold text-white font-space">Calculadora</span>
                      </div>
                      <span className="text-[9px] font-mono text-blue-400">Autorizado</span>
                    </div>
                  </div>
                </div>

                <div className="text-[8.5px] font-mono text-cyan-400 text-center pt-1.5 border-t border-white/[0.06] flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>AGUARDANDO APROXIMAÇÃO NFC</span>
                </div>
              </div>
            )}

            {/* Screen 2: NFC Proximity Radar */}
            {activeMobileScreen === 'nfc' && (
              <div className="flex-1 flex flex-col justify-between text-center py-2">
                <div>
                  <div className="relative w-24 h-24 mx-auto flex items-center justify-center my-3">
                    <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping" />
                    <div className="w-16 h-16 rounded-full border border-cyan-400/60 flex items-center justify-center bg-cyan-950/50 shadow-[0_0_25px_rgba(0,240,255,0.3)]">
                      <Radio className="w-7 h-7 text-cyan-300 animate-pulse" />
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-white font-space mb-0.5">Aproxime da Carteira</h4>
                  <p className="text-[10.5px] text-slate-300 px-2 leading-tight">
                    Validação em 400ms na tag física autenticada da mesa.
                  </p>
                </div>

                <div className="bg-white/[0.04] p-2 rounded-xl border border-cyan-500/30 text-left text-[10px]">
                  <span className="font-bold text-cyan-400 font-mono block">ASSINATURA DIGITAL ECDSA P-256</span>
                  <span className="text-slate-300 font-mono text-[9px]">Chave criptográfica renovada a cada 24h</span>
                </div>
              </div>
            )}

            {/* Screen 3: Whitelist Launcher */}
            {activeMobileScreen === 'launcher' && (
              <div className="flex-1 flex flex-col justify-between text-center">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 mx-auto flex items-center justify-center text-cyan-400 mb-1.5 mt-1">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-space">Modo Foco Ativado</h4>
                  <p className="text-[10px] text-slate-400 mb-2">Android Lock Task Mode • Sala 101</p>

                  <div className="space-y-1.5 text-left text-xs">
                    <div className="bg-white/[0.04] p-2 rounded-lg border border-white/[0.08] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Compass className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="font-bold text-white font-space text-[11px]">GeoGebra</span>
                      </div>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="bg-white/[0.04] p-2 rounded-lg border border-white/[0.08] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                        <span className="font-bold text-white font-space text-[11px]">Dicionário</span>
                      </div>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="bg-white/[0.04] p-2 rounded-lg border border-white/[0.08] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="font-bold text-white font-space text-[11px]">Calculadora</span>
                      </div>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  </div>
                </div>

                <div className="text-[9px] text-slate-400 font-mono py-1 border-t border-white/[0.06]">
                  Redes sociais e jogos suspensos durante a aula.
                </div>
              </div>
            )}

            {/* Screen 4: GeoGebra Pro */}
            {activeMobileScreen === 'geogebra' && (
              <div className="flex-1 flex flex-col justify-between text-white">
                <div>
                  <div className="bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 p-1.5 rounded-lg text-[9px] font-mono flex items-center justify-between mb-1.5">
                    <span className="font-bold">● MODO PEDAGÓGICO ATIVO</span>
                    <ShieldCheck className="w-3 h-3 text-cyan-400" />
                  </div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-bold text-white font-space">GeoGebra Pro</span>
                    <span className="text-[9px] text-cyan-400 font-mono">f(x) = sin(x) + cos(x)</span>
                  </div>

                  {/* Math Graph SVG */}
                  <div className="bg-slate-950 rounded-xl border border-white/[0.08] p-2 h-36 flex flex-col justify-between relative overflow-hidden">
                    <div className="text-[8.5px] font-mono text-cyan-300/80 z-10">Ponto: A = (π/2, 1.00)</div>
                    <svg className="w-full h-16" viewBox="0 0 160 50">
                      <line x1="0" y1="25" x2="160" y2="25" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />
                      <path d="M 10 25 Q 35 5, 60 25 T 110 25 T 150 25" fill="none" stroke="#00f0ff" strokeWidth="2" />
                      <circle cx="60" cy="25" r="3" fill="#ffffff" stroke="#00f0ff" strokeWidth="1.5" />
                    </svg>
                    <div className="text-[8.5px] font-mono text-emerald-400 flex justify-between">
                      <span>Cálculo Ativo</span>
                      <span>Modo Kiosk</span>
                    </div>
                  </div>
                </div>
                <div className="text-[8.5px] text-emerald-400 text-center font-mono py-1 border-t border-white/[0.06]">
                  App Didático Autorizado
                </div>
              </div>
            )}

            {/* Screen 5: Tela de Reflexão Consciente */}
            {activeMobileScreen === 'restricted' && (
              <div className="flex-1 flex flex-col justify-between text-center py-1.5">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 mx-auto flex items-center justify-center text-amber-400 mb-1.5">
                    <Heart className="w-5 h-5" />
                  </div>
                  <span className="text-[8.5px] font-bold text-amber-400 uppercase font-mono tracking-widest block mb-0.5">
                    REFLEXÃO EM VEZ DE PUNIÇÃO
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white font-space mb-1">Pausa Consciente</h4>
                  <p className="text-[10px] text-slate-300 px-1 leading-tight mb-2">
                    Você tentou abrir um app fora da lista. O OnFocus propõe reflexão sobre o uso, não bloqueio agressivo.
                  </p>
                  <div className="w-full py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-cyan-200 text-[10px] font-bold flex items-center justify-center gap-1">
                    <Compass className="w-3 h-3 text-cyan-400" />
                    <span>Retomar GeoGebra na Aula</span>
                  </div>
                </div>
                <div className="bg-white/[0.04] p-1.5 rounded-lg border border-white/[0.08] text-[8.5px] text-slate-400">
                  LGPD: Nenhum dado pessoal, câmera ou mensagem é monitorado.
                </div>
              </div>
            )}

            {/* Screen 6: Desbloqueio + Selo de Foco */}
            {activeMobileScreen === 'unlocked' && (
              <div className="flex-1 flex flex-col justify-between text-center py-2">
                <div>
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 mx-auto flex items-center justify-center text-emerald-400 mb-1.5">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white font-space">Aula Finalizada</h4>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[9px] font-mono text-emerald-300 mb-1.5">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Selo de Foco Conquistado!</span>
                  </div>
                  <p className="text-[10px] text-slate-300 px-1 leading-tight">
                    O controle total do aparelho volta automaticamente ao aluno ao fim do horário.
                  </p>
                </div>
                <div className="text-[9px] font-mono text-emerald-400 py-1 border-t border-white/[0.06]">
                  Aparelho 100% Liberado • Autonomia Restaurada
                </div>
              </div>
            )}
          </motion.div>

          {/* -----------------------------------------------------------------
              APPLICATION 2: DESKTOP GESTOR WEB SAAS (Active in Laptop Mode)
              ----------------------------------------------------------------- */}
          <motion.div 
            style={{ opacity: desktopUiOpacity }}
            className="absolute inset-0 pt-8 sm:pt-9 flex text-white z-20 pointer-events-auto"
          >
            {/* Desktop Left Mini-Sidebar matching Gestor Next.js 14 */}
            <div className="w-36 sm:w-44 bg-[#070b16] border-r border-white/[0.08] p-2.5 flex flex-col justify-between text-xs shrink-0">
              <div>
                {/* Gestor Logo */}
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className="w-5 h-5 rounded bg-cyan-400 text-black flex items-center justify-center font-bold text-[10px]">
                    OF
                  </div>
                  <span className="font-bold text-white text-[11px] font-space tracking-tight">OnFocus Gestor</span>
                </div>

                {/* 7 Modules Navigation */}
                <div className="space-y-1">
                  {[
                    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                    { id: 'turmas', label: 'Turmas (12)', icon: Users },
                    { id: 'aulas', label: 'Aulas Hoje (36)', icon: BookOpen },
                    { id: 'salas', label: 'Salas NFC', icon: School },
                    { id: 'apps', label: 'Whitelist Apps', icon: Layers },
                    { id: 'relatorios', label: 'Relatórios', icon: Award },
                    { id: 'config', label: 'Configurações', icon: Settings },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isActive = activeGestorTab === item.id || (item.id === 'dashboard' && activeGestorTab === 'dashboard');
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer text-[10px] font-medium transition-colors ${
                          isActive 
                            ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/30' 
                            : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                        }`}
                      >
                        <Icon className="w-3 h-3 shrink-0 text-cyan-400" />
                        <span className="truncate">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.08] text-[8.5px] font-mono text-slate-500">
                <span>Deploy Vercel • Ativo</span>
              </div>
            </div>

            {/* Desktop Main Workspace Area */}
            <div className="flex-1 bg-[#090e1d] p-3 sm:p-4 overflow-y-auto flex flex-col justify-between">
              
              {/* Header */}
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06]">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold font-space text-white flex items-center gap-2">
                      <span>Painel de Gestão Pedagógica</span>
                      <span className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
                        ● TELEMETRIA AO VIVO
                      </span>
                    </h4>
                    <span className="text-[9.5px] text-slate-400 font-sans">
                      Escola Estadual Central • Prof. Ricardo Silva
                    </span>
                  </div>

                  <a
                    href="https://hackthon-ultima-hora.vercel.app/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[9.5px] font-mono font-bold bg-cyan-400 text-black hover:bg-cyan-300 transition-all shadow-sm"
                  >
                    <span>Abrir Vercel</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                {/* 3 Key Metric Cards */}
                <div className="grid grid-cols-3 gap-2 mb-2.5">
                  <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-[8.5px] text-slate-400 font-mono block">Alunos em Foco</span>
                    <span className="text-base sm:text-lg font-bold text-cyan-300 font-space block">248</span>
                    <span className="text-[7.5px] text-emerald-400 font-mono">+15% essa semana</span>
                  </div>

                  <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-[8.5px] text-slate-400 font-mono block">Salas Ativas</span>
                    <span className="text-base sm:text-lg font-bold text-indigo-300 font-space block">12</span>
                    <span className="text-[7.5px] text-cyan-400 font-mono">Tags NFC 24h</span>
                  </div>

                  <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-[8.5px] text-slate-400 font-mono block">Índice de Atenção</span>
                    <span className="text-base sm:text-lg font-bold text-emerald-300 font-space block">98.4%</span>
                    <span className="text-[7.5px] text-emerald-400 font-mono">0 Interrupções</span>
                  </div>
                </div>

                {/* Live Classroom Status & Whitelist Card */}
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-cyan-500/25 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-white font-space">
                      Sala 101 • Matemática Aplicada (3º Ano EM)
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[8px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                      Tag #101-B Conectada
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[9px] text-slate-300 font-mono">
                    <span>Whitelist Configurada:</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/[0.06] text-white">GeoGebra Pro</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/[0.06] text-white">Calculadora</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/[0.06] text-white">Dicionário</span>
                  </div>

                  <div className="text-[8.5px] text-slate-400 font-sans">
                    Os dados pedagógicos ficam visíveis para a coordenação em tempo real, sem depender de relatórios manuais.
                  </div>
                </div>
              </div>

              {/* Desktop Footer note */}
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[8px] font-mono text-slate-500">
                <span>Plataforma OnFocus • Painel do Gestor</span>
                <span className="text-cyan-400/80">SaaS Multi-Turma</span>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Smartphone Bottom Home Bar (Fades out in Laptop Mode) */}
        <motion.div 
          style={{ opacity: mobileUiOpacity }}
          className="w-20 h-1 bg-white/25 rounded-full mx-auto my-1 z-30" 
        />

      </motion.div>

      {/* =========================================================================
          LAPTOP COMPUTER BASE / KEYBOARD DECK (Smoothly emerges during transformation)
          ========================================================================= */}
      <motion.div
        style={{
          opacity: laptopBaseOpacity,
          scaleX: laptopBaseScaleX,
          width: isMobile ? '350px' : '630px',
        }}
        className="absolute -bottom-3 sm:-bottom-4 h-3.5 sm:h-4.5 bg-gradient-to-b from-[#1c2234] to-[#0c101d] rounded-b-xl border-t border-slate-500/40 shadow-2xl flex items-center justify-center z-10 pointer-events-none transition-all duration-200"
      >
        {/* Laptop Display Thumb Opening Notch */}
        <div className="w-14 sm:w-16 h-1 sm:h-1.5 bg-black/60 rounded-full border border-white/10" />
      </motion.div>

    </div>
  );
};
