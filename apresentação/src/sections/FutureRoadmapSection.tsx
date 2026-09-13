import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Brain, Network, Watch } from 'lucide-react';

const ROADMAP_ITEMS = [
  {
    title: 'Inteligência Contextual',
    desc: 'Análise dinâmica de comportamento pedagógico para recomendação de materiais de apoio específicos.',
    icon: Brain,
    color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-400',
  },
  {
    title: 'Integração LMS Total',
    desc: 'Conexão nativa com Google Classroom, Moodle e sistemas de chamada automática escolar.',
    icon: Network,
    color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30 hover:border-indigo-400',
  },
  {
    title: 'Novos Dispositivos',
    desc: 'Expansão da plataforma para tablets institucionais, smartwatches e ambientes corporativos.',
    icon: Watch,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/40',
  },
];

export const FutureRoadmapSection: React.FC = () => {
  return (
    <section id="futuro" className="py-28 px-6 lg:px-12 bg-gradient-to-b from-black via-slate-950 to-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center justify-center gap-2">
            <Compass className="w-4 h-4" />
            09 / HORIZONTE
          </span>
          <h2 className="text-4xl sm:text-6xl font-black font-space text-white tracking-tight">
            "Isso é só o começo."
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 font-light">
            Evolução estratégica da solução OnFocus para os próximos passos educacionais.
          </p>
        </motion.div>

        {/* 3 Roadmap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROADMAP_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`glass-card p-8 rounded-3xl border transition-all ${item.color}`}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-white font-space mb-2">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
