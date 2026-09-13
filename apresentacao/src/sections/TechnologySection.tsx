import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Smartphone, Lock, Server, School, ShieldCheck, EyeOff, Key, BatteryCharging } from 'lucide-react';

export const TechnologySection: React.FC = () => {
  return (
    <section id="tecnologia" className="py-28 px-6 lg:px-12 bg-gradient-to-b from-black via-slate-950 to-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center justify-center gap-2">
            <Cpu className="w-4 h-4" />
            06 / ENGENHARIA & TECNOLOGIA
          </span>
          <h2 className="text-4xl sm:text-6xl font-black font-space text-white tracking-tight">
            Engenharia robusta.<br />
            <span className="gradient-title">Zero vigilância invasiva.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 font-light">
            Arquitetura de baixa latência construída sob conformidade estrita com a LGPD e segurança de hardware.
          </p>
        </motion.div>

        {/* Animated Connected Diagram Layout: SMARTPHONE -> ONFOCUS -> BACKEND -> ESCOLA */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/10 mb-16 relative overflow-hidden">
          
          <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-8 flex items-center justify-between">
            <span>FLUXO DE DADOS & CRIPTOGRAFIA</span>
            <span className="text-cyan-400 font-bold">LATÊNCIA &lt; 50MS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {/* Step 1: Smartphone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-mono text-cyan-400 font-bold">01. DISPOSITIVO</div>
                <h4 className="text-base font-bold text-white font-space mt-1">Smartphone</h4>
                <p className="text-[11px] text-slate-400 mt-2 font-light">
                  Hardware do aluno com leitor NFC ativo e chip criptográfico.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-white/5 text-[10px] font-mono text-slate-500">
                Android / iOS
              </div>
            </motion.div>

            {/* Step 2: OnFocus Launcher */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/30 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                  <Lock className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-mono text-indigo-400 font-bold">02. LAUNCHER</div>
                <h4 className="text-base font-bold text-white font-space mt-1">OnFocus Kiosk</h4>
                <p className="text-[11px] text-slate-400 mt-2 font-light">
                  Lock Task Mode nativo ativado pela assinatura ECDSA P-256.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-white/5 text-[10px] font-mono text-slate-500">
                Device Policy Manager
              </div>
            </motion.div>

            {/* Step 3: Backend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                  <Server className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-mono text-emerald-400 font-bold">03. BACKEND</div>
                <h4 className="text-base font-bold text-white font-space mt-1">Next.js 14 API</h4>
                <p className="text-[11px] text-slate-400 mt-2 font-light">
                  WebSockets síncronos distribuindo a Whitelist em tempo real.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-white/5 text-[10px] font-mono text-slate-500">
                Node.js / WebSockets
              </div>
            </motion.div>

            {/* Step 4: Escola */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                  <School className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-mono text-amber-400 font-bold">04. ESCOLA</div>
                <h4 className="text-base font-bold text-white font-space mt-1">Gestor SaaS</h4>
                <p className="text-[11px] text-slate-400 mt-2 font-light">
                  Painel de telemetria da sala de aula com relatórios instantâneos.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-white/5 text-[10px] font-mono text-slate-500">
                TypeScript / Tailwind
              </div>
            </motion.div>

          </div>
        </div>

        {/* Security / LGPD Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-card">
            <div className="w-8 h-8 rounded-lg bg-cyan-400/10 text-cyan-400 flex items-center justify-center mb-3">
              <EyeOff className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white font-space mb-2">Zero Espionagem (LGPD)</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Não monitoramos mensagens, fotos ou histórico. O sistema apenas garante que apenas os aplicativos autorizados estejam em execução.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card">
            <div className="w-8 h-8 rounded-lg bg-indigo-400/10 text-indigo-400 flex items-center justify-center mb-3">
              <Key className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white font-space mb-2">Criptografia ECDSA P-256</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Assinatura digital temporária em cada tag NFC da carteira, impedindo que alunos usem tags falsas ou réplicas caseiras.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card">
            <div className="w-8 h-8 rounded-lg bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-3">
              <BatteryCharging className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white font-space mb-2">Eficiência Energética</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Consumo inferior a 2% de bateria por hora de aula sem processos ocultos consumindo dados móveis.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
