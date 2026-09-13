import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronLeft, ChevronRight, ExternalLink, Shield, 
  BookOpen, Heart, Sparkles, Radio, Lock, CheckCircle2, 
  Users, Award, BarChart3, Layers, School, Settings,
  AlertTriangle, ArrowRight, Check
} from 'lucide-react';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SlideData {
  number: string;
  tag: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const SLIDES: SlideData[] = [
    // Slide 1: Capa
    {
      number: '01 / 10',
      tag: 'HACKTUDO 2026 · USO CONSCIENTE DE SMARTPHONES NA ESCOLA',
      title: 'OnFocus',
      subtitle: 'Seu foco começa aqui.',
      content: (
        <div className="space-y-6 text-center py-4">
          <p className="text-base sm:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Projeto para uso consciente do celular na escola: a liberação de aplicativos é definida aula a aula e ativada pela aproximação física do aparelho à sala.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 text-xs font-mono text-cyan-300">
            <span className="px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30">
              Equipe · Última Hora
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-slate-400">
              Pré-Pitching · 13/09/2026
            </span>
          </div>
        </div>
      ),
    },

    // Slide 2: O Problema & Pesquisa
    {
      number: '02 / 10',
      tag: '01 · O PROBLEMA',
      title: 'O que a pesquisa mostra sobre o celular em sala de aula',
      subtitle: 'O desafio da edição pede uma relação mais consciente entre tecnologia e educação. Antes de propor uma solução, olhamos para o que três estudos recentes mostram sobre o problema.',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <span className="text-[11px] font-mono font-bold text-rose-400 block mb-2">
                A distração é coletiva
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Um estudo da <strong>Rutgers University</strong> mostrou que, sem estrutura de uso, o celular em sala prejudica as notas até de quem não está usando o aparelho.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <span className="text-[11px] font-mono font-bold text-cyan-400 block mb-2">
                Proibição x liberação
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Pesquisa publicada na <strong>Information Systems Research</strong> mostrou que a liberação livre reduz o desempenho, mas esse desempenho aumenta quando o uso é guiado pelo professor.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <span className="text-[11px] font-mono font-bold text-amber-400 block mb-2">
                Falta incentivo para o professor
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Um levantamento sobre adoção de tecnologia em sala apontou a ausência de incentivo como uma das principais razões pelas quais professores não adotam novas ferramentas.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>O Onfocus parte desses três pontos:</strong> reduzir a distração coletiva, encontrar o meio-termo entre proibir e liberar, e dar visibilidade a quem ensina.
            </span>
          </div>
        </div>
      ),
    },

    // Slide 3: A Proposta
    {
      number: '03 / 10',
      tag: '02 · A PROPOSTA',
      title: 'Cada aula define o que o celular pode fazer',
      subtitle: 'Em vez de proibir ou liberar o aparelho inteiro, o Onfocus muda o que é controlado: não é o celular do aluno, é o contexto da aula em que ele está.',
      content: (
        <div className="space-y-3.5">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 flex items-center justify-center shrink-0">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white font-space mb-1">
                A aula é a unidade de controle, não o aparelho
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Ao entrar na sala, o celular passa a operar dentro das regras daquela aula, definidas pelo professor. A mesma aluna pode ter o <strong>GeoGebra liberado em Matemática</strong> e só o <strong>dicionário em Português</strong>.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-400/30 text-rose-400 flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white font-space mb-1">
                Reflexão em vez de punição
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Quando o aluno tenta abrir algo fora da lista da aula, a resposta é uma <strong>tela de reflexão sobre o uso</strong>, não um bloqueio silencioso ou uma punição agressiva.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-400 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white font-space mb-1">
                O uso pedagógico deixa de ser invisível
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Como a lista de aplicativos de cada aula é definida pelo próprio professor, o uso educativo do celular passa a aparecer para a escola, criando a base para reconhecer quem já usa a ferramenta a favor do aprendizado.
              </p>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 4: Como Funciona
    {
      number: '04 / 10',
      tag: '03 · COMO FUNCIONA',
      title: 'Da configuração da aula ao uso em sala',
      subtitle: 'Antes da aula, no Gestor: o professor escolhe quais aplicativos ficam liberados para aquela turma.',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-[#0c101d] border border-cyan-500/30 text-left relative overflow-hidden">
              <span className="text-2xl font-extrabold font-space text-cyan-400 block mb-1">01</span>
              <h5 className="font-bold text-sm text-white mb-1 font-space">Aproximar</h5>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                O aluno encosta o celular na tag NFC da sala, no início da aula.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c101d] border border-cyan-500/30 text-left relative overflow-hidden">
              <span className="text-2xl font-extrabold font-space text-cyan-400 block mb-1">02</span>
              <h5 className="font-bold text-sm text-white mb-1 font-space">Validar</h5>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Uma assinatura digital confirma que é a sala certa e carrega a lista de apps daquela aula.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c101d] border border-cyan-500/30 text-left relative overflow-hidden">
              <span className="text-2xl font-extrabold font-space text-cyan-400 block mb-1">03</span>
              <h5 className="font-bold text-sm text-white mb-1 font-space">Focar</h5>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Na tela do aluno, aparecem apenas os aplicativos liberados para aquela aula.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c101d] border border-emerald-500/30 text-left relative overflow-hidden">
              <span className="text-2xl font-extrabold font-space text-emerald-400 block mb-1">04</span>
              <h5 className="font-bold text-sm text-white mb-1 font-space">Liberar</h5>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Ao fim do horário, o controle total do aparelho volta automaticamente ao aluno.
              </p>
            </div>
          </div>

          <div className="text-center">
            <span className="text-[11px] font-mono text-slate-400">
              Ciclo pedagógico 100% automatizado, sem necessidade de recolhimento físico ou vigilância ostensiva.
            </span>
          </div>
        </div>
      ),
    },

    // Slide 5: Demonstração Gestor
    {
      number: '05 / 10',
      tag: '04 · DEMONSTRAÇÃO',
      title: 'O Gestor: painel de gestão já implementado',
      subtitle: 'O Gestor existe como uma aplicação web construída em Next.js, com sete módulos navegáveis e deploy ativo, disponível para consulta durante esta apresentação.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { name: 'Dashboard', icon: BarChart3 },
              { name: 'Turmas', icon: Users },
              { name: 'Aulas', icon: BookOpen },
              { name: 'Salas', icon: School },
              { name: 'Aplicativos', icon: Layers },
              { name: 'Relatórios', icon: Award },
              { name: 'Configurações', icon: Settings },
            ].map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-2">
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-medium text-white">{mod.name}</span>
                </div>
              );
            })}
          </div>

          <div className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-center flex flex-col items-center justify-center">
            <span className="text-5xl font-extrabold font-space text-cyan-400 block mb-1">7</span>
            <span className="text-xs font-bold text-white font-space mb-1">Módulos implementados e navegáveis</span>
            <p className="text-[11px] text-slate-300 font-light mb-3">Ambiente de demonstração, com métricas simuladas em tempo real.</p>
            <a
              href="https://hackthon-ultima-hora.vercel.app/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold font-space bg-cyan-400 text-black hover:bg-cyan-300 transition-all shadow-md"
            >
              <span>Abrir Gestor Web</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      ),
    },

    // Slide 6: Os 3 Pilares
    {
      number: '06 / 10',
      tag: '05 · OS 3 PILARES',
      title: 'Cada pilar do desafio, em ação no produto',
      subtitle: 'Uma abordagem holística integrando tecnologia de ponta, metodologia pedagógica e acolhimento em saúde mental.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-cyan-500/30 space-y-2.5">
            <div className="flex items-center gap-2 text-cyan-400 font-space font-bold text-sm">
              <Shield className="w-4 h-4" />
              <span>Tecnologia</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 font-light">
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Cada sala tem uma tag NFC com assinatura digital própria, renovada a cada 24 horas para dificultar fraudes.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>O Android entra em modo Kiosk, exibindo na tela do aluno só os aplicativos liberados para aquela aula.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>O uso pedagógico feito por cada professor passa a ficar visível para a coordenação da escola.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-indigo-500/30 space-y-2.5">
            <div className="flex items-center gap-2 text-indigo-400 font-space font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>Metodologia</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 font-light">
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>O professor escolhe, aula a aula, quais aplicativos da turma ficam disponíveis naquele momento.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>O catálogo de aplicativos é organizado por categoria pedagógica e passa por validação antes de entrar no sistema.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>O uso pedagógico feito por cada professor passa a ficar visível para a coordenação da escola.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-rose-500/30 space-y-2.5">
            <div className="flex items-center gap-2 text-rose-400 font-space font-bold text-sm">
              <Heart className="w-4 h-4" />
              <span>Saúde mental</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 font-light">
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>Quando o aluno tenta abrir algo fora da lista da aula, a resposta é uma tela de reflexão, não um bloqueio.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>O aplicativo nunca acessa câmera, microfone, mensagens ou qualquer outro dado pessoal do aluno.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>Mecanismos de reconhecimento, como um selo de foco, buscam aumentar o engajamento genuíno do aluno.</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    // Slide 7: Saúde Mental
    {
      number: '07 / 10',
      tag: '06 · SAÚDE MENTAL',
      title: 'Combater o tédio, não só o tempo de tela',
      subtitle: 'Restringir o celular, sozinho, não garante bem-estar: um estudo publicado no Lancet Regional Health não encontrou relação entre políticas restritivas de celular na escola e melhora no bem-estar mental dos adolescentes. Por isso o Onfocus mira em duas causas mais específicas, já estudadas: o tédio em sala de aula e o uso do celular sem estrutura.',
      content: (
        <div className="space-y-3.5">
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30">
            <span className="text-xs font-mono font-bold text-rose-400 block mb-1">
              Referência Científica: The Lancet Regional Health
            </span>
            <p className="text-xs text-slate-200 font-light leading-relaxed">
              Políticas meramente proibitivas ou punitivas geram ansiedade e FOMO (Fear of Missing Out). O verdadeiro antídoto contra a dispersão digital é a oferta de ferramentas interativas ativas e significativas durante a exploração do conteúdo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <span className="text-xs font-bold text-white font-space block mb-1">O tédio tem custo real</span>
              <p className="text-[11px] text-slate-300 font-light">
                A dispersão ocorre primariamente pela falta de estímulo interativo, e não apenas pelo impulso eletrônico.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <span className="text-xs font-bold text-white font-space block mb-1">Proibição x Liberação</span>
              <p className="text-[11px] text-slate-300 font-light">
                O uso estruturado e guiado pelo educador converte a tecnologia em alavanca de raciocínio.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <span className="text-xs font-bold text-white font-space block mb-1">Falta incentivo docente</span>
              <p className="text-[11px] text-slate-300 font-light">
                Reconhecer o protagonismo do professor elimina a sobrecarga de vigilância contínua.
              </p>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 8: Viabilidade Escolar
    {
      number: '08 / 10',
      tag: '07 · VIABILIDADE',
      title: 'O que facilita a adoção pela escola',
      subtitle: 'Além de funcionar tecnicamente, a proposta tem mecanismos que ajudam a própria escola a decidir por adotá-la.',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <span className="text-xs font-bold text-cyan-400 font-space block mb-1.5">
              Uma visão única para a direção
            </span>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              A coordenação acompanha, em um só painel, o uso pedagógico do celular em todas as turmas, sem depender de relatos soltos de cada professor.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <span className="text-xs font-bold text-indigo-400 font-space block mb-1.5">
              Professores e alunos, na mesma régua
            </span>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Como o uso de cada professor também fica visível, a adoção da proposta deixa de depender só da boa vontade individual.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <span className="text-xs font-bold text-emerald-400 font-space block mb-1.5">
              Mais proximidade com as famílias
            </span>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Os pais passam a ter mais visibilidade sobre o uso do celular do filho durante as aulas, o que facilita a conversa entre escola e família.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <span className="text-xs font-bold text-amber-400 font-space block mb-1.5">
              Metodologia com respaldo de pesquisa
            </span>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Estudos sobre ferramentas interativas de aprendizagem mostram ganhos de engajamento, o que dá à equipe pedagógica uma base concreta para apoiar a proposta.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 9: Próximos Passos
    {
      number: '09 / 10',
      tag: '08 · PRÓXIMOS PASSOS',
      title: 'Sabemos exatamente pra onde o Onfocus vai',
      subtitle: 'Planejamento escalável com foco em impacto contínuo na cultura escolar.',
      content: (
        <div className="space-y-3">
          {[
            {
              title: 'Painel de incentivo docente',
              desc: 'Acompanhar quanto cada professor configura aulas com aplicativos educacionais liberados, transformando a adoção de tecnologia em algo visível e reconhecido, e não apenas em boa vontade individual.',
              badge: 'Reconhecimento',
            },
            {
              title: 'Selo de foco (gamificação)',
              desc: 'Reconhecimento visual para o aluno que completa aulas sem alertas de distração. Estudos mostram efeito positivo desse tipo de mecanismo sobre o engajamento dos alunos.',
              badge: 'Engajamento',
            },
            {
              title: 'Autoconhecimento do próprio uso',
              desc: 'Um resumo do padrão de foco na semana, devolvido ao próprio aluno, não só à coordenação.',
              badge: 'Autorregulação',
            },
            {
              title: 'Piloto com tags físicas e expansão',
              desc: 'Launcher Android nativo, tags NFC em uma ou duas salas, e extensão gradual da whitelist para todas as disciplinas.',
              badge: 'Escalabilidade',
            },
          ].map((step, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-white font-space block mb-0.5">{step.title}</span>
                <p className="text-[11px] text-slate-300 font-light leading-relaxed">{step.desc}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 shrink-0">
                {step.badge}
              </span>
            </div>
          ))}
        </div>
      ),
    },

    // Slide 10: Encerramento
    {
      number: '10 / 10',
      tag: 'ONFOCUS · HACKTUDO 2026',
      title: 'Seu foco começa aqui.',
      subtitle: 'Tecnologia, metodologia e saúde mental integradas em uma mesma solução, já em desenvolvimento.',
      content: (
        <div className="space-y-6 text-center py-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <a
              href="https://hackthon-ultima-hora.vercel.app/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-400 transition-all group"
            >
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">01 / PRODUTO ATIVO</span>
              <h5 className="font-bold text-white text-sm font-space group-hover:text-cyan-300 flex items-center justify-between">
                <span>MVP (Gestor)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </h5>
              <span className="text-[11px] text-slate-400 block mt-1">hackthon-ultima-hora.vercel.app</span>
            </a>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider block mb-1">02 / EXPERIÊNCIA</span>
              <h5 className="font-bold text-white text-sm font-space">Site de Apresentação</h5>
              <span className="text-[11px] text-slate-400 block mt-1">Keynote interativo 3D</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">03 / PITCH</span>
              <h5 className="font-bold text-white text-sm font-space">Vídeo (2 min)</h5>
              <span className="text-[11px] text-slate-400 block mt-1">Demonstração executiva</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-white/[0.08] text-xs font-mono text-slate-400 gap-2">
            <span>Equipe · Última Hora</span>
            <span className="text-cyan-400">contato@hacktudo.com.br</span>
          </div>
        </div>
      ),
    },
  ];

  // Keyboard navigation inside modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => Math.min(SLIDES.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, SLIDES.length]);

  const slide = SLIDES[currentSlide];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 30, stiffness: 340 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[92vh] bg-[#070b14] rounded-3xl border border-white/[0.12] p-5 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_60px_rgba(0,240,255,0.08)] text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff]" />
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-semibold">
                    {slide.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Slide {slide.number} • Use as setas ← → do teclado
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  aria-label="Fechar Pitch Deck"
                  className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] flex items-center justify-center text-slate-300 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slide Body */}
            <div className="py-5 min-h-[360px] flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-space text-white tracking-tight mb-2">
                {slide.title}
              </h3>
              {slide.subtitle && (
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-5 max-w-3xl">
                  {slide.subtitle}
                </p>
              )}
              {slide.content}
            </div>

            {/* Footer Navigation Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.08] gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-[60%] py-1">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    title={`Slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx 
                        ? 'w-7 bg-cyan-400 shadow-[0_0_10px_#00f0ff]' 
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
                  disabled={currentSlide === 0}
                  className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-30 disabled:pointer-events-none border border-white/[0.1] flex items-center justify-center text-white transition-all"
                  aria-label="Slide anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => Math.min(SLIDES.length - 1, prev + 1))}
                  disabled={currentSlide === SLIDES.length - 1}
                  className="w-9 h-9 rounded-full bg-cyan-400 hover:bg-cyan-300 disabled:opacity-30 disabled:pointer-events-none text-black flex items-center justify-center font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                  aria-label="Próximo slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

