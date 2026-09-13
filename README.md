# 🎓🔒 Modo Aula — Plataforma Integrada de Gestão & Foco Pedagógico Digital

> **Solução completa desenvolvida para o Hackathon Última Hora:** Transformação temporária e segura do smartphone do aluno em uma ferramenta pedagógica ativa via aproximação NFC, sem vigilância invasiva e com total conformidade à LGPD.

---

## 📑 Sumário

- [📌 Visão Geral da Solução](#-visão-geral-da-solução)
- [🏗️ Arquitetura do Sistema](#️-arquitetura-do-sistema)
- [🖥️ 1. Módulo Gestor (Web SaaS)](#️-1-módulo-gestor-web-saas)
  - [Funcionalidades Principais](#funcionalidades-principais-do-gestor)
  - [Telas e Módulos](#telas-e-módulos-da-plataforma-web)
  - [Tecnologias do Gestor](#tecnologias-do-gestor)
- [📱 2. Módulo App Mobile (Dispositivo do Aluno)](#-2-módulo-app-mobile-dispositivo-do-aluno)
  - [O Ciclo do Aluno em 6 Etapas](#o-ciclo-do-aluno-em-6-etapas)
  - [Segurança do Dispositivo & Kiosk Mode](#segurança-do-dispositivo--kiosk-mode)
  - [Tecnologias do App Mobile](#tecnologias-do-app-mobile)
- [🔄 Fluxo de Funcionamento Integrado](#-fluxo-de-funcionamento-integrado)
- [🛡️ Privacidade, Segurança & LGPD](#️-privacidade-segurança--lgpd)
- [📂 Estrutura do Repositório](#-estrutura-do-repositório)
- [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
- [👥 Hackathon & Equipe](#-hackathon--equipe)

---

## 📌 Visão Geral da Solução

O **Modo Aula** resolve o dilema entre o potencial pedagógico dos smartphones e as distrações digitais em sala de aula. Em vez de recolher os aparelhos ou adotar softwares invasivos de espionagem, a plataforma estabelece uma **política pedagógica temporária**:

1. **Aproximação NFC**: O aluno encosta o smartphone na Tag NFC da carteira/sala no início da aula.
2. **Whitelist Pedagógica**: O aparelho entra no *Launcher Protegido*, disponibilizando exclusivamente os aplicativos autorizados pelo professor para aquela disciplina (ex: GeoGebra, Calculadora, Dicionário).
3. **Foco Ativo**: Notificações, redes sociais e jogos são suspensos durante o período da aula.
4. **Desbloqueio Automático**: Ao término do horário ou por comando do docente, o smartphone retorna instantaneamente ao modo pessoal do aluno.

---

## 🏗️ Arquitetura do Sistema

```mermaid
graph TD
    subgraph "🏫 Ambiente Escolar"
        NFC[🏷️ Tag NFC da Sala / Carteira]
        Prof[👨‍🏫 Professor / Gestor]
        Aluno[📱 Smartphone do Aluno]
    end

    subgraph "🖥️ Gestor (Web SaaS)"
        Dash[Dashboard & Monitoramento em Tempo Real]
        Turmas[Gestão de Turmas & Aulas]
        Whitelist[Catálogo de Apps Permitidos]
        Relatorios[Relatórios de Frequência & Engajamento]
        Seguranca[Gestão de Chaves ECDSA & Logs LGPD]
    end

    subgraph "📱 App Mobile (Aluno)"
        Standby[1. Standby & Conexão de Rede]
        ScanNFC[2. Validação NFC Criptográfica]
        Launcher[3. Launcher Protegido]
        AppEducativo[4. App Pedagógico em Execução]
        Bloqueio[5. Alerta de Foco / App Restrito]
        Unlock[6. Desbloqueio Pós-Aula]
    end

    Prof -->|Configura Políticas & Acompanha| Dash
    NFC -.->|Leitura por Proximidade| Aluno
    Aluno --> Standby --> ScanNFC --> Launcher --> AppEducativo
    Launcher -->|Tentativa de Distração| Bloqueio
    Prof -->|Encerra Aula| Unlock
    Aluno <-->|WebSockets / REST API (Telemetry & Policy)| Dash
```

---

## 🖥️ 1. Módulo Gestor (Web SaaS)

Localizado no diretório [`/Gestor`](file:///Users/beniprado/Desktop/plataforma/Gestor), o **Gestor** é uma aplicação web moderna voltada para coordenadores pedagógicos, diretores e professores.

### Funcionalidades Principais do Gestor

- 📊 **Dashboard Dinâmico**:
  - Indicadores em tempo real (turmas ativas, alunos conectados, salas ocupadas, aulas do dia).
  - Gráfico de distribuição de uso de aplicativos educativos.
  - Painel de status rápido e atalhos operacionais.
- 👥 **Gerenciamento de Turmas & Alunos**:
  - Cadastro, listagem com paginação e busca por nome/disciplina/status.
  - Exportação de dados operacionais em formato CSV.
- 📅 **Controle de Aulas & Políticas**:
  - Agendamento de aulas com vinculação de sala, professor e horário.
  - Seleção granular de aplicativos permitidos por aula (*Whitelist*).
- 📦 **Biblioteca de Aplicativos**:
  - Catálogo de apps com validação de *Package Names* do Android (ex: `org.geogebra.android`).
  - Categorização pedagógica (Matemática, Ciências, Línguas, Produtividade).
  - Versionamento e controle de status (Ativo / Pendente / Inativo).
- 🏫 **Monitoramento de Salas & Dispositivos (Tempo Real)**:
  - Telemetria de bateria, status de conexão (Conectado, Ocioso, Bloqueado, Alerta) e aplicativo ativo por aluno.
  - Alertas automáticos para inatividade prolongada ou tentativas de abertura de apps não autorizados.
- 📈 **Relatórios & Analytics**:
  - Frequência diária de presença e taxa de adesão ao Modo Aula.
  - Ranking dos aplicativos mais utilizados e engajamento por disciplina.
- ⚙️ **Configurações, Segurança & LGPD**:
  - Gerenciamento de chaves criptográficas para Tags NFC (ECDSA P-256).
  - Logs de auditoria imutáveis com minimização de dados.
- 📱 **Simulador Integrado do Smartphone do Aluno**:
  - Espelhamento interativo em tempo real do comportamento do aplicativo mobile dentro do próprio dashboard web.

### Tecnologias do Gestor

| Tecnologia | Finalidade |
| :--- | :--- |
| **Next.js 14 (App Router)** | Framework React com SSR/SSG e API Routes |
| **React 18 & TypeScript** | Componentização modular com tipagem estática rigorosa |
| **Tailwind CSS** | Design system responsivo, moderno e customizado |
| **Lucide React** | Ícones vetoriais modernos e acessíveis |
| **Recharts** | Visualização de dados analíticos e gráficos interativos |
| **React Context API** | Gerenciamento de estado global reativo da aplicação |

---

## 📱 2. Módulo App Mobile (Dispositivo do Aluno)

Localizado no diretório [`/AppMobile`](file:///Users/beniprado/Desktop/plataforma/AppMobile) e espelhado interativamente no simulador do Gestor, o **App Mobile** é o cliente responsável pela aplicação das restrições e entrega da interface pedagógica.

### O Ciclo do Aluno em 6 Etapas

1. **Tela 1 — Standby & Conexão**:
   - O aluno abre o aplicativo na escola e verifica a conexão com a rede Wi-Fi institucional segura.
2. **Tela 2 — Scan NFC da Sala**:
   - Ao entrar na sala de aula, o aluno aproxima o smartphone da Tag NFC fixada na mesa ou no ambiente.
   - O app valida a assinatura digital da Tag (chave ECDSA) e registra a presença na aula ativa.
3. **Tela 3 — Launcher Protegido**:
   - O launcher padrão do Android é temporariamente substituído pelo *Launcher Seguro Modo Aula*.
   - Apenas os ícones dos aplicativos liberados para a aula atual ficam visíveis e acessíveis.
4. **Tela 4 — App Educacional em Execução**:
   - O aluno utiliza a ferramenta pedagógica designada (exemplo: **GeoGebra interativo**, calculadora, leitor de PDF).
5. **Tela 5 — Alerta Educativo de Foco**:
   - Caso o aluno tente alternar para um aplicativo não autorizado ou burlar a proteção, o sistema intercepta e exibe uma tela educativa de conscientização, emitindo alerta discreto no painel do professor.
6. **Tela 6 — Aula Finalizada / Desbloqueio**:
   - Ao término da aula (por horário ou encerramento pelo professor), o smartphone desativa o Modo Aula e retorna ao estado normal do sistema operacional.

### Segurança do Dispositivo & Kiosk Mode

- **Lock Task Mode / Kiosk Mode**: Fixação da interface pedagógica sem acesso à barra de navegação do sistema.
- **Accessibility Service / DPM (Device Policy Manager)**: Detecção de troca de janela em primeiro plano para garantir que apenas pacotes autorizados sejam executados.
- **Assinatura NFC Criptografada**: Impede o uso de tags falsas ou réplicas caseiras através de tokens de sessão temporários.

---

## 🔄 Fluxo de Funcionamento Integrado

```
[Início da Aula]
       │
       ▼
[Aluno aproxima do NFC] ───► [Validação Criptográfica]
                                      │
                                      ▼
                        [Sincroniza com o Painel do Gestor]
                                      │
       ┌──────────────────────────────┴──────────────────────────────┐
       ▼                                                             ▼
[Mobile: Ativa Launcher Seguro]                          [Gestor: Atualiza Telemetria]
 • Bloqueia apps não autorizados                          • Aluno marcado como Presente
 • Disponibiliza Whitelist (ex: GeoGebra)                 • Status de bateria & app ativo
       │                                                             │
       ▼                                                             ▼
[Durante a Aula]                                         [Monitoramento em Tempo Real]
 • Aluno estuda com app pedagógico                        • Notificações de inatividade
 • Tentativas de saída acionam Alerta de Foco             • Alertas visuais para o docente
       │                                                             │
       └──────────────────────────────┬──────────────────────────────┘
                                      ▼
                      [Término da Aula / Desconexão]
                                      │
                                      ▼
                    [Mobile restaura o sistema normal]
                    [Gestor consolida relatório pedagógico]
```

---

## 🛡️ Privacidade, Segurança & LGPD

O projeto foi concebido sob o princípio de **Privacy by Design**:

- ❌ **Sem monitoramento invasivo**: O sistema **não** captura mensagens, fotos, histórico de navegação pessoal nem conversas privadas.
- 🔍 **Detecção apenas de Primeiro Plano**: Apenas o identificador do pacote (*Package Name*) em execução durante o horário da aula é verificado para autorização.
- 🔐 **Logs Imutáveis & Auditoria**: Registro transparente de eventos de entrada e saída, permitindo auditoria escolar em conformidade com as diretrizes da LGPD (Lei Geral de Proteção de Dados).
- 🔑 **Criptografia ECDSA**: Comunicação assinada com chaves assimétricas para garantir a integridade dos dados transmitidos entre as Tags NFC, os dispositivos móveis e o servidor.

---

## 📂 Estrutura do Repositório

```bash
plataforma/
├── README.md                      # Documentação integrada do projeto (este arquivo)
├── Gestor/                        # Aplicação Web (Next.js 14 SaaS)
│   ├── package.json               # Dependências e scripts do Gestor
│   ├── tsconfig.json              # Configurações TypeScript
│   ├── tailwind.config.js         # Configurações de estilos Tailwind
│   ├── next.config.js             # Configurações do Next.js
│   ├── public/                    # Arquivos estáticos e ícones
│   └── src/
│       ├── app/                   # App Router (páginas da plataforma)
│       │   ├── page.tsx           # Redirecionamento / Rota raiz
│       │   ├── login/             # Autenticação de gestores/professores
│       │   ├── dashboard/         # Dashboard principal com métricas em tempo real
│       │   ├── turmas/            # Gestão e exportação de turmas
│       │   ├── aulas/             # Configuração de aulas e horários
│       │   ├── salas/             # Monitoramento de salas e dispositivos
│       │   ├── aplicativos/       # Catálogo e whitelist de pacotes
│       │   ├── relatorios/        # Relatórios de frequência e uso
│       │   ├── configuracoes/     # Configurações de segurança e LGPD
│       │   └── simulador-aluno/   # Página dedicada ao simulador mobile
│       ├── components/            # Componentes reutilizáveis
│       │   ├── layout/            # Sidebar, Header e Shell da aplicação
│       │   ├── simulator/         # Simulador completo do Smartphone do Aluno
│       │   └── ui/                # Componentes de interface (Cards, Modais, Tabelas)
│       ├── context/               # Estado global da aplicação (AppContext)
│       ├── types/                 # Definições de tipos TypeScript
│       └── lib/                   # Utilitários e helpers
└── AppMobile/                     # Módulo do Aplicativo Mobile do Aluno
    └── app.jsx                    # Componente / Entrypoint da aplicação mobile
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js**: Versão 18.17 ou superior
- **npm** ou **yarn** / **pnpm**

### 1. Clonando o Repositório
```bash
git clone git@github.com:beniprado/Hackthon-ultimaHora.git
cd Hackthon-ultimaHora
```

### 2. Executando o Módulo Gestor (Web SaaS + Simulador Mobile)
```bash
# Entre na pasta do Gestor
cd Gestor

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra seu navegador e acesse:
```
http://localhost:3000
```

> 💡 **Dica de Navegação:**
> - Acesse `/dashboard` para ver a visão geral pedagógica e de dispositivos.
> - Clique no botão **"Simulador do Aluno"** no cabeçalho ou navegue até `/simulador-aluno` para testar as 6 telas interativas do smartphone do aluno.
> - Acesse `/salas` para acompanhar a telemetria em tempo real dos dispositivos conectados.

---

## 👥 Hackathon & Equipe

Projeto concebido e desenvolvido com foco em inovação educacional, privacidade e impacto pedagógico para o **Hackathon Última Hora**.

---
*Transformando tecnologia em aliada da educação com respeito, segurança e foco.* 📚✨
