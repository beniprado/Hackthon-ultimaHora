import React from 'react';
import { motion } from 'framer-motion';
import { Workflow, MapPin, Radio, Shield, Activity, Unlock } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Chegada',
    desc: 'O aluno chega à escola e conecta-se à rede institucional segura.',
    icon: MapPin,
  },
  {
    num: '02',
    title: 'Identificação',
    desc: 'O dispositivo identifica que está no ambiente autorizado via Tag NFC da carteira.',
    icon: Radio,
  },
  {
    num: '03',
    title: 'Ativação Kiosk',
    desc: 'O OnFocus ativa automaticamente o ambiente controlado e substitui o launcher padrão.',
    icon: Shield,
    highlight: true,
  },
  {
    num: '04',
    title: 'Modo Foco',
    desc: 'O smartphone entra em modo de foco ativo com acesso restrito a ferramentas pedagógicas.',
    icon: Activity,
  },
  {
    num: '05',
    title: 'Desbloqueio',
    desc: 'Ao sair da área autorizada ou ao bater o sinal, o dispositivo retorna ao comportamento normal.',
    icon: Unlock,
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="como-funciona" className="py-28 px-6 lg:px-12 bg-gradient-to-b from-black via-slate-950 to-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center justify-center gap-2">
            <Workflow className="w-4 h-4" />
            04 / COMO FUNCIONA
          </span>
          <h2 className="text-4xl sm:text-6xl font-black font-space text-white tracking-tight">
            "Simples para o aluno.<br />
            <span className="gradient-title">Inteligente para a escola."</span>
          </h2>
          <p className="text-slate-400 text-base mt-4 font-light">
            Funcionamento estruturado em 5 etapas automáticas e transparentes.
          </p>
        </motion.div>

        {/* 5-Step Visual Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 rounded-2xl border relative flex flex-col justify-between transition-all group ${
                  step.highlight
                    ? 'border-cyan-500/40 bg-cyan-950/20 shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:border-cyan-400'
                    : 'glass-card hover:border-cyan-500/40'
                }`}
              >
                <div>
                  <div
                    className={`w-10 h-10 rounded-xl font-mono font-bold text-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                      step.highlight
                        ? 'bg-cyan-400 text-black'
                        : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                    }`}
                  >
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-white font-space mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">{step.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-2 text-[10px] font-mono text-cyan-400">
                  <Icon className="w-3.5 h-3.5" />
                  <span>Etapa {step.num}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
