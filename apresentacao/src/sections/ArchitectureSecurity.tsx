import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, EyeOff, Key, Server, Smartphone, Lock } from 'lucide-react';

export const ArchitectureSecurity: React.FC = () => {
  return (
    <section id="arquitetura" className="py-24 px-6 lg:px-12 bg-[#080b12] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-2 block">
            Segurança, Arquitetura & LGPD
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tecnologia de ponta com <span className="text-sky-400">zero espionagem</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 font-light">
            O Modo Aula foi concebido desde o primeiro dia respeitando a privacidade e os direitos dos estudantes.
          </p>
        </div>

        {/* Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="p-6 rounded-2xl glass-card">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Chaves Criptográficas ECDSA</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Assinatura digital temporária via curvas elípticas P-256 gravadas nas Tags NFC. Impede que alunos clonem ou falsifiquem tags de presença.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Android Lock Task / DPM</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Utilização das APIs nativas do Android (Device Policy Manager) para fixação da interface educativa, garantindo estabilidade e segurança.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Privacidade Total (LGPD)</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Não monitoramos mensagens, histórico do navegador, fotos ou arquivos pessoais. A telemetria restringe-se ao status de conexão e app ativo na aula.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
