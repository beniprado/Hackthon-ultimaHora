# Modo Aula 🎓🔒

Plataforma de gestão escolar que transforma temporariamente o smartphone do aluno em um dispositivo seguro para uso pedagógico durante as aulas.

---

## 📌 Sobre o Projeto

O **Modo Aula** permite que uma instituição de ensino configure e aplique políticas pedagógicas de foco digital por meio de aproximação com Tags NFC em sala de aula, liberando apenas aplicativos educacionais autorizados (whitelist) e restringindo distrações sem recorrer à vigilância invasiva.

---

## 🚀 Funcionalidades Principais

1. **Painel Web (SaaS)**:
   - **Dashboard**: Visão geral de turmas ativas, alunos conectados, salas disponíveis, aulas hoje e gráficos de uso de aplicativos em tempo real.
   - **Gerenciamento de Turmas**: Listagem, paginação, filtros por disciplina/status e exportação em CSV.
   - **Configuração de Aulas**: Definição de horários, salas e catálogo de aplicativos autorizados (whitelist).
   - **Biblioteca de Aplicativos**: Catálogo com validação de Package Names do Android, controle de versões e categorias.
   - **Monitoramento em Tempo Real**: Status detalhado por sala e por dispositivo (bateria, aplicativo ativo, conexões, alertas de inatividade e bateria baixa).
   - **Relatórios & Analytics**: Frequência diária de acessos, ranking de aplicativos mais utilizados e engajamento individual.
   - **Configurações, Segurança & LGPD**: Gestão de chaves criptográficas para Tags NFC (ECDSA), logs imutáveis de auditoria e conformidade com minimização de dados.

2. **Simulador Mobile do Aluno (Android)**:
   - Interface interativa que espelha as telas do aluno:
     - Standby & Conexão à rede escolar
     - Leitura de Tag NFC por proximidade
     - Launcher Protegido do Modo Aula
     - App Educacional em execução (GeoGebra interativo)
     - Bloqueio Educativo com mensagem de foco
     - Desbloqueio automático pós-aula

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Ícones**: Lucide React
- **Gráficos**: Recharts / SVG interativo
- **Estado**: React Context com arquitetura reativa para WebSockets / REST API

---

## 💻 Como Rodar o Projeto

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse a aplicação no navegador em:
```
http://localhost:3000
```

---

## 📄 Licença

Projeto desenvolvido para o Hackathon.
