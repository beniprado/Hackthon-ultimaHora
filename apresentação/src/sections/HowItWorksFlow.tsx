import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Lock, BookOpen, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Aproximação NFC',
    desc: 'O aluno entra na sala de aula e encosta o smartphone na Tag NFC da carteira. Em 400ms a presença e a disciplina são validadas.',
    icon: Radio,
    highlight: false,
  },
  {
    num: '02',
    title: 'Ativação do Kiosk Mode',
    desc: 'O Android ativa o Launcher Seguro pedagógico. Redes sociais, jogos e notificações são temporariamente suspensos.',
    icon: Lock,
    highlight: true,
  },
  {
    num: '03',
    title: 'Uso Pedagógico Ativo',
    desc: 'O estudante acessa apenas os aplicativos autorizados pelo professor (GeoGebra, Calculadora, Dicionário, PDFs) durante a aula.',
    icon: BookOpen,
    highlight: false,
  },
  {
    num: '04',
    title: 'Desbloqueio Automático',
    desc: 'Ao término da aula ou encerramento pelo docente, o aparelho desativa o Modo Aula e retorna instantaneamente ao modo pessoal.',
    icon: CheckCircle2,
    highlight: false,
  },
];

export const HowItWorksFlow: React.FC = () => {
  return (
    <section id="funcionamento" className="py-24 px-6 lg:px-12 bg-slate-950/60 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-2 block">
            Fluxo de Operação
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Como funciona na <span className="text-sky-400">prática</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 font-light">
            Sem processos manuais demorados: a tecnologia opera de forma transparente para professores e alunos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-2xl border flex flex-col justify-between ${
                  step.highlight
                    ? 'bg-sky-950/30 border-sky-500/40 shadow-xl shadow-sky-950/40'
                    : 'glass-card'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-lg bg-[#0284c7]/20 border border-[#0284c7]/40 text-sky-400 font-bold text-xs flex items-center justify-center font-mono">
                      {step.num}
                    </span>
                    <Icon className="w-5 h-5 text-sky-400" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
