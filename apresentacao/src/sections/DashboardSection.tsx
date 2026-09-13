import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Users, ExternalLink, Activity, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

const STUDENTS = [
  { id: 1, name: 'Gabriel S.', device: 'Pixel 7', app: 'GeoGebra', bat: '84%', status: '100% FOCO', statusColor: 'text-emerald-400' },
  { id: 2, name: 'Beatriz M.', device: 'Galaxy S23', app: 'Calculadora', bat: '92%', status: '100% FOCO', statusColor: 'text-emerald-400' },
  { id: 3, name: 'Lucas R.', device: 'Moto G84', app: 'Tentativa Bloqueada', bat: '68%', status: 'INTERCEPTADO', statusColor: 'text-red-400', alert: true },
  { id: 4, name: 'Carolina P.', device: 'iPhone 14', app: 'Google Docs', bat: '79%', status: '100% FOCO', statusColor: 'text-emerald-400' },
];

export const DashboardSection: React.FC = () => {
  return (
    <section id="dashboard" className="py-28 px-6 lg:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center justify-center gap-2">
            <Monitor className="w-4 h-4" />
            07 / VISÃO DA ESCOLA
          </span>
          <h2 className="text-4xl sm:text-6xl font-black font-space text-white tracking-tight">
            Controle transparente.<br />
            <span className="gradient-title">Em tempo real.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 font-light">
            O OnFocus oferece um painel SaaS completo para professores, coordenadores e diretores.
          </p>
        </motion.div>

        {/* Big Dashboard Mockup Browser Frame */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs font-mono text-slate-400">https://hackthon-ultima-hora.vercel.app/dashboard</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SESSÃO ATIVA: SALA 101 • MATEMÁTICA
              </span>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Dispositivos Conectados</span>
              <div className="text-2xl sm:text-3xl font-black text-white font-space mt-1">28 / 32</div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">94.1% de presença</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Índice de Foco</span>
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-space mt-1">98.4%</div>
              <span className="text-[10px] font-mono text-cyan-300">Tempo em apps educativos</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-mono text-slate-400 uppercase">App Mais Utilizado</span>
              <div className="text-xl sm:text-2xl font-bold text-white font-space mt-1 truncate">GeoGebra</div>
              <span className="text-[10px] font-mono text-slate-400">82% da turma ativa</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Alertas de Distração</span>
              <div className="text-2xl sm:text-3xl font-black text-red-400 font-space mt-1">01</div>
              <span className="text-[10px] font-mono text-red-400 font-bold">Tentativa interceptada</span>
            </div>
          </div>

          {/* Students Telemetry Table */}
          <div className="rounded-2xl bg-slate-950/80 border border-white/10 p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white font-space flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Telemetria em Tempo Real dos Dispositivos da Turma</span>
              </h4>
              <span className="text-[10px] font-mono text-slate-500">Atualização WebSockets contínua</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {STUDENTS.map((st) => (
                <div
                  key={st.id}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                    st.alert
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-white/5 border-white/5 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${st.alert ? 'bg-red-400 animate-ping' : 'bg-emerald-400'}`} />
                    <span className="text-white font-medium font-sans">{st.name}</span>
                    <span className="text-slate-500 text-[10px]">{st.device}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${st.alert ? 'text-red-400 bg-red-500/20' : 'text-cyan-400 bg-cyan-500/10'}`}>
                      {st.app}
                    </span>
                    <span className="text-slate-400 hidden sm:inline">Bat: {st.bat}</span>
                    <span className={`font-bold ${st.statusColor}`}>{st.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
