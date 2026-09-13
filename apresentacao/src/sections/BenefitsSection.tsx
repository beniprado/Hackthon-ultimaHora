import React from 'react';
import { motion } from 'framer-motion';

const STATEMENTS = [
  {
    tag: '01 / SILÊNCIO COGNITIVO',
    quote: 'Menos distração.',
    desc: 'Eliminação total de notificações e interrupções em sala de aula sem discussões na porta.',
    border: 'border-cyan-400',
    color: 'text-cyan-400',
  },
  {
    tag: '02 / PROFUNDIDADE PEDAGÓGICA',
    quote: 'Mais concentração.',
    desc: 'Alunos entram em estado de fluxo contínuo durante exercícios práticos e explicações teóricas.',
    border: 'border-indigo-400',
    color: 'text-indigo-400',
  },
  {
    tag: '03 / EMPODERAMENTO',
    quote: 'Mais autonomia.',
    desc: 'O smartphone deixa de ser o inimigo e vira um computador de bordo científico do estudante.',
    border: 'border-emerald-400',
    color: 'text-emerald-400',
  },
  {
    tag: '04 / GESTÃO ESCOLAR',
    quote: 'Mais controle para a escola.',
    desc: 'Políticas centralizadas, relatórios de presença instantâneos e segurança jurídica total.',
    border: 'border-sky-300',
    color: 'text-sky-300',
  },
  {
    tag: '05 / BEM-ESTAR DIGITAL',
    quote: 'Uma experiência mais saudável.',
    desc: 'Uso consciente e produtivo da tecnologia dentro e fora da sala de aula.',
    border: 'border-cyan-300',
    color: 'text-cyan-300',
  },
];

export const BenefitsSection: React.FC = () => {
  return (
    <section id="beneficios" className="py-28 px-6 lg:px-12 bg-gradient-to-b from-black via-slate-950 to-black">
      <div className="max-w-5xl mx-auto space-y-28">
        
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 block">
            08 / IMPACTO REAL
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-space text-slate-400">
            O que acontece quando o foco é prioridade?
          </h2>
        </div>

        {STATEMENTS.map((b, idx) => (
          <motion.div
            key={b.tag}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className={`border-l-4 ${b.border} pl-6 sm:pl-12`}
          >
            <span className={`text-xs font-mono uppercase tracking-widest block mb-2 ${b.color}`}>
              {b.tag}
            </span>
            <h3 className="text-4xl sm:text-7xl lg:text-8xl font-black font-space text-white tracking-tight leading-none mb-4">
              {b.quote}
            </h3>
            <p className="text-slate-400 text-base sm:text-xl max-w-2xl font-light">
              {b.desc}
            </p>
          </motion.div>
        ))}

      </div>
    </section>
  );
};
