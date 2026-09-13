import { Aplicativo, Aula, DispositivoAluno, Sala, Turma, User, LogEvento, AlertaAtividade } from "@/types";

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Ricardo Silva",
    email: "ricardo.silva@colegiomodelo.edu.br",
    role: "GESTOR",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    institution: "Colégio Modelo"
  },
  {
    id: "user-2",
    name: "Ana Oliveira",
    email: "ana.oliveira@colegiomodelo.edu.br",
    role: "PROFESSOR",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    institution: "Colégio Modelo"
  },
  {
    id: "user-3",
    name: "Carlos Mendes",
    email: "carlos.mendes@colegiomodelo.edu.br",
    role: "PROFESSOR",
    institution: "Colégio Modelo"
  },
  {
    id: "user-4",
    name: "Helena Souza",
    email: "helena.souza@colegiomodelo.edu.br",
    role: "PROFESSOR",
    institution: "Colégio Modelo"
  },
  {
    id: "user-5",
    name: "Marcos Rocha",
    email: "marcos.rocha@colegiomodelo.edu.br",
    role: "ADMIN",
    institution: "Colégio Modelo"
  }
];

export const mockTurmas: Turma[] = [
  {
    id: "turma-1",
    nome: "1º A",
    ano: "1º Ano Ensino Médio",
    disciplina: "Matemática",
    professor: "Ricardo Silva",
    sala: "Sala 101",
    salaId: "sala-101",
    horario: "07:30 - 09:10",
    totalAlunos: 32,
    status: "Ativa"
  },
  {
    id: "turma-2",
    nome: "1º B",
    ano: "1º Ano Ensino Médio",
    disciplina: "Português",
    professor: "Ana Oliveira",
    sala: "Sala 102",
    salaId: "sala-102",
    horario: "07:30 - 09:10",
    totalAlunos: 28,
    status: "Ativa"
  },
  {
    id: "turma-3",
    nome: "2º A",
    ano: "2º Ano Ensino Médio",
    disciplina: "Física",
    professor: "Marcos Santos",
    sala: "Lab 01",
    salaId: "sala-lab01",
    horario: "09:30 - 11:10",
    totalAlunos: 30,
    status: "Agendada"
  },
  {
    id: "turma-4",
    nome: "2º C",
    ano: "2º Ano Ensino Médio",
    disciplina: "História",
    professor: "Clara Mendes",
    sala: "Sala 204",
    salaId: "sala-204",
    horario: "09:30 - 11:10",
    totalAlunos: 34,
    status: "Ativa"
  },
  {
    id: "turma-5",
    nome: "3º B",
    ano: "3º Ano Ensino Médio",
    disciplina: "Química",
    professor: "Roberto Lima",
    sala: "Lab 02",
    salaId: "sala-lab02",
    horario: "11:20 - 13:00",
    totalAlunos: 29,
    status: "Agendada"
  },
  {
    id: "turma-6",
    nome: "9º Ano C",
    ano: "9º Ano Fundamental",
    disciplina: "Geografia",
    professor: "Beatriz Costa",
    sala: "Sala 105",
    salaId: "sala-105",
    horario: "13:30 - 15:10",
    totalAlunos: 35,
    status: "Finalizada"
  },
  {
    id: "turma-7",
    nome: "3º A",
    ano: "3º Ano Ensino Médio",
    disciplina: "Matemática Aplicada",
    professor: "Ricardo Silva",
    sala: "Sala 101 - Bloco B",
    salaId: "sala-101",
    horario: "08:30 - 09:20",
    totalAlunos: 32,
    status: "Ativa"
  }
];

export const mockAplicativos: Aplicativo[] = [
  {
    id: "app-geogebra",
    nome: "GeoGebra",
    subtitulo: "Calculadora Gráfica e Geometria",
    packageName: "org.geogebra.android",
    versao: "5.0.760.0",
    ultimaAtualizacao: "12/05/2024",
    status: "Ativo",
    categoria: "Matemática",
    descricao: "Ferramenta dinâmica de matemática para geometria, álgebra, gráficos e cálculo.",
    icone: "calculator"
  },
  {
    id: "app-calc",
    nome: "Calculadora",
    subtitulo: "Operações matemáticas básicas e científicas",
    packageName: "com.hp.calculadora",
    versao: "1.2.4",
    ultimaAtualizacao: "20/04/2024",
    status: "Ativo",
    categoria: "Matemática",
    descricao: "Calculadora padrão científica rápida e sem anúncios para uso em sala de aula.",
    icone: "hash"
  },
  {
    id: "app-docs",
    nome: "Google Docs",
    subtitulo: "Editor de textos e notas colaborativo",
    packageName: "com.google.android.apps.docs",
    versao: "1.24.202.0",
    ultimaAtualizacao: "18/05/2024",
    status: "Ativo",
    categoria: "Produtividade",
    descricao: "Criação e edição de documentos e anotações escolares em tempo real.",
    icone: "file-text"
  },
  {
    id: "app-arquivos",
    nome: "Arquivos",
    subtitulo: "Documentos da aula e PDFs",
    packageName: "com.android.documentsui",
    versao: "14.0.0",
    ultimaAtualizacao: "01/05/2024",
    status: "Ativo",
    categoria: "Produtividade",
    descricao: "Gerenciador local restrito à pasta de materiais didáticos da instituição.",
    icone: "folder"
  },
  {
    id: "app-duolingo",
    nome: "Duolingo",
    subtitulo: "Plataforma de aprendizado de idiomas",
    packageName: "com.duolingo",
    versao: "5.102.3",
    ultimaAtualizacao: "02/06/2024",
    status: "Pendente",
    categoria: "Línguas",
    descricao: "Treinamento interativo de vocabulário e gramática em língua estrangeira.",
    icone: "languages"
  },
  {
    id: "app-khan",
    nome: "Khan Academy",
    subtitulo: "Exercícios e videoaulas personalizadas",
    packageName: "org.khanacademy.android",
    versao: "7.3.1",
    ultimaAtualizacao: "15/05/2024",
    status: "Ativo",
    categoria: "Geral",
    descricao: "Biblioteca de estudos livres com exercícios práticos e artigos educativos.",
    icone: "book-open"
  },
  {
    id: "app-tabela-periodica",
    nome: "Tabela Periódica",
    subtitulo: "Química e propriedades dos elementos",
    packageName: "mobi.periodic.table",
    versao: "2.1.0",
    ultimaAtualizacao: "10/03/2024",
    status: "Inativo",
    categoria: "Ciências",
    descricao: "Guia interativo dos elementos químicos com massas atômicas e distribuição.",
    icone: "flask-conical"
  },
  {
    id: "app-pdf",
    nome: "Leitor PDF",
    subtitulo: "Visualizador de Documentos e Apostilas",
    packageName: "com.adobe.reader",
    versao: "24.3.0",
    ultimaAtualizacao: "28/04/2024",
    status: "Ativo",
    categoria: "Produtividade",
    descricao: "Leitor limpo para visualização de apostilas e listas de exercícios fornecidas pelo professor.",
    icone: "file"
  },
  {
    id: "app-wikipedia",
    nome: "Wikipedia",
    subtitulo: "Enciclopédia Online Livre",
    packageName: "org.wikipedia",
    versao: "2.7.504",
    ultimaAtualizacao: "11/05/2024",
    status: "Ativo",
    categoria: "Geral",
    descricao: "Acesso a verbetes enciclopédicos educativos com proteção de navegação restrita.",
    icone: "globe"
  },
  {
    id: "app-phet",
    nome: "PhET Sims",
    subtitulo: "Simulações de Física e Química",
    packageName: "edu.colorado.phet",
    versao: "3.1.2",
    ultimaAtualizacao: "05/04/2024",
    status: "Ativo",
    categoria: "Ciências",
    descricao: "Laboratórios virtuais e simulações científicas interativas da Universidade do Colorado.",
    icone: "atom"
  },
  {
    id: "app-dicionario",
    nome: "Dicionário PT",
    subtitulo: "Língua Portuguesa e Sinônimos",
    packageName: "com.dicionario.pt",
    versao: "4.2.1",
    ultimaAtualizacao: "02/05/2024",
    status: "Ativo",
    categoria: "Línguas",
    descricao: "Consulta rápida de significados, conjugações e sinônimos sem acesso à internet externa.",
    icone: "book"
  },
  {
    id: "app-browser",
    nome: "Navegador Escolar",
    subtitulo: "Pesquisa segura com whitelist institucional",
    packageName: "br.gov.escola.browser",
    versao: "1.0.8",
    ultimaAtualizacao: "14/05/2024",
    status: "Ativo",
    categoria: "Geral",
    descricao: "Navegador seguro bloqueado apenas para domínios didáticos autorizados pela escola.",
    icone: "compass"
  },
  {
    id: "app-chat",
    nome: "Chat Turma 3B",
    subtitulo: "Comunicação interna mediada pelo professor",
    packageName: "br.gov.escola.chat",
    versao: "2.0.4",
    ultimaAtualizacao: "01/06/2024",
    status: "Ativo",
    categoria: "Comunicação",
    descricao: "Canal de dúvidas e envio de arquivos em tempo real durante a aula.",
    icone: "message-square"
  }
];

export const mockSalas: Sala[] = [
  {
    id: "sala-101",
    nome: "Sala 101",
    bloco: "Bloco B",
    andar: "1º Andar",
    capacidade: 32,
    status: "Aula ativa",
    nfcTagId: "SALA-101",
    nfcStatus: "Ativa",
    nfcUltimaLeitura: "08:29:43",
    aulaAtualId: "aula-1",
    dispositivosConectados: 28,
    ultimaSincronizacao: "há 23 segundos"
  },
  {
    id: "sala-102",
    nome: "Sala 102",
    bloco: "Bloco B",
    andar: "1º Andar",
    capacidade: 30,
    status: "Aula ativa",
    nfcTagId: "SALA-102",
    nfcStatus: "Ativa",
    nfcUltimaLeitura: "08:31:10",
    aulaAtualId: "aula-2",
    dispositivosConectados: 24,
    ultimaSincronizacao: "há 1 minuto"
  },
  {
    id: "sala-lab01",
    nome: "Laboratório 01",
    bloco: "Bloco Ciências",
    andar: "Térreo",
    capacidade: 28,
    status: "Disponível",
    nfcTagId: "SALA-LAB01",
    nfcStatus: "Ativa",
    dispositivosConectados: 0,
    ultimaSincronizacao: "há 10 minutos"
  },
  {
    id: "sala-lab02",
    nome: "Laboratório 2",
    bloco: "Bloco Ciências",
    andar: "Térreo",
    capacidade: 30,
    status: "Aula ativa",
    nfcTagId: "SALA-LAB02",
    nfcStatus: "Ativa",
    nfcUltimaLeitura: "08:14:52",
    aulaAtualId: "aula-3",
    dispositivosConectados: 30,
    ultimaSincronizacao: "há 45 segundos"
  },
  {
    id: "sala-204",
    nome: "Sala 204",
    bloco: "Bloco A",
    andar: "2º Andar",
    capacidade: 35,
    status: "Aula ativa",
    nfcTagId: "SALA-204",
    nfcStatus: "Ativa",
    nfcUltimaLeitura: "08:59:15",
    aulaAtualId: "aula-4",
    dispositivosConectados: 22,
    ultimaSincronizacao: "há 30 segundos"
  },
  {
    id: "sala-105",
    nome: "Sala 105",
    bloco: "Bloco A",
    andar: "1º Andar",
    capacidade: 32,
    status: "Disponível",
    nfcTagId: "SALA-105",
    nfcStatus: "Ativa",
    dispositivosConectados: 0,
    ultimaSincronizacao: "há 15 minutos"
  },
  {
    id: "sala-302b",
    nome: "Sala 302B",
    bloco: "Bloco C",
    andar: "3º Andar",
    capacidade: 25,
    status: "Disponível",
    nfcTagId: "SALA-302",
    nfcStatus: "Ativa",
    dispositivosConectados: 0,
    ultimaSincronizacao: "há 2 horas"
  }
];

export const mockAulas: Aula[] = [
  {
    id: "aula-1",
    disciplina: "Matemática",
    turmaNome: "1º A",
    turmaId: "turma-1",
    professor: "Prof. Ricardo Silva",
    sala: "Sala 101",
    salaId: "sala-101",
    data: "2024-05-22",
    horarioInicio: "08:00",
    horarioFim: "09:20",
    alunosPresentes: 28,
    alunosTotal: 32,
    status: "Ao vivo",
    appsPermitidosIds: ["app-geogebra", "app-calc", "app-docs", "app-arquivos"]
  },
  {
    id: "aula-2",
    disciplina: "Português",
    turmaNome: "2º B",
    turmaId: "turma-2",
    professor: "Profa. Ana Oliveira",
    sala: "Sala 102",
    salaId: "sala-102",
    data: "2024-05-22",
    horarioInicio: "08:30",
    horarioFim: "09:50",
    alunosPresentes: 24,
    alunosTotal: 28,
    status: "Ao vivo",
    appsPermitidosIds: ["app-docs", "app-dicionario", "app-pdf"]
  },
  {
    id: "aula-3",
    disciplina: "História",
    turmaNome: "3º C",
    turmaId: "turma-4",
    professor: "Prof. Carlos Mendes",
    sala: "Laboratório 2",
    salaId: "sala-lab02",
    data: "2024-05-22",
    horarioInicio: "08:15",
    horarioFim: "09:45",
    alunosPresentes: 30,
    alunosTotal: 30,
    status: "Alerta",
    appsPermitidosIds: ["app-wikipedia", "app-docs", "app-browser"],
    observacoes: "Alerta de conectividade em 5 tablets da bancada sul."
  },
  {
    id: "aula-4",
    disciplina: "Física",
    turmaNome: "2º A",
    turmaId: "turma-3",
    professor: "Profa. Helena Souza",
    sala: "Sala 204",
    salaId: "sala-204",
    data: "2024-05-22",
    horarioInicio: "09:00",
    horarioFim: "10:30",
    alunosPresentes: 22,
    alunosTotal: 30,
    status: "Ao vivo",
    appsPermitidosIds: ["app-phet", "app-calc", "app-geogebra"]
  },
  {
    id: "aula-5",
    disciplina: "Geografia",
    turmaNome: "1º B",
    turmaId: "turma-2",
    professor: "Prof. Marcos Rocha",
    sala: "Sala 105",
    salaId: "sala-105",
    data: "2024-05-22",
    horarioInicio: "09:15",
    horarioFim: "10:45",
    alunosPresentes: 26,
    alunosTotal: 28,
    status: "Ociosa",
    appsPermitidosIds: ["app-wikipedia", "app-pdf"]
  }
];

export const mockDispositivos: DispositivoAluno[] = [
  {
    id: "dev-1",
    alunoNome: "Ana Beatriz Silveira",
    matricula: "MAT-2024-0101",
    turmaId: "turma-1",
    salaId: "sala-101",
    modeloDispositivo: "Samsung Galaxy Tab S7",
    os: "Android",
    appAtivo: "GeoGebra",
    appAtivoPackage: "org.geogebra.android",
    bateriaPercentual: 85,
    status: "Conectado",
    isNfcValidated: true,
    modoAulaAtivo: true,
    ultimoPing: "agora"
  },
  {
    id: "dev-2",
    alunoNome: "Bruno Cavalcante",
    matricula: "MAT-2024-0102",
    turmaId: "turma-1",
    salaId: "sala-101",
    modeloDispositivo: "iPad Air 4",
    os: "iOS",
    appAtivo: "Calculadora Científica",
    appAtivoPackage: "com.hp.calculadora",
    bateriaPercentual: 42,
    status: "Conectado",
    isNfcValidated: true,
    modoAulaAtivo: true,
    ultimoPing: "há 10s"
  },
  {
    id: "dev-3",
    alunoNome: "Carla Mendes",
    matricula: "MAT-2024-0103",
    turmaId: "turma-1",
    salaId: "sala-101",
    modeloDispositivo: "Motorola Edge 30",
    os: "Android",
    appAtivo: "Chrome (Pesquisa)",
    appAtivoPackage: "com.android.chrome",
    bateriaPercentual: 12,
    status: "Ocioso",
    isNfcValidated: true,
    modoAulaAtivo: true,
    ultimoPing: "há 2min",
    alertaMensagem: "O dispositivo de Carla Mendes está com 12% de carga. Sugira o carregamento."
  },
  {
    id: "dev-4",
    alunoNome: "Diego Fernandes",
    matricula: "MAT-2024-0104",
    turmaId: "turma-1",
    salaId: "sala-101",
    modeloDispositivo: "Lenovo ThinkPad X1",
    os: "Windows",
    appAtivo: "Microsoft Teams",
    appAtivoPackage: "com.microsoft.teams",
    bateriaPercentual: 100,
    status: "Bloqueado",
    isNfcValidated: true,
    modoAulaAtivo: false,
    ultimoPing: "há 5min",
    alertaMensagem: "Diego Fernandes está sem interações há mais de 5 minutos."
  },
  {
    id: "dev-5",
    alunoNome: "Eduarda Lima",
    matricula: "MAT-2024-0105",
    turmaId: "turma-1",
    salaId: "sala-101",
    modeloDispositivo: "iPhone 13",
    os: "iOS",
    appAtivo: "Desconhecido",
    bateriaPercentual: 0,
    status: "Desconectado",
    isNfcValidated: false,
    modoAulaAtivo: false,
    ultimoPing: "há 25min"
  },
  {
    id: "dev-6",
    alunoNome: "Felipe Rocha",
    matricula: "MAT-2024-0106",
    turmaId: "turma-1",
    salaId: "sala-101",
    modeloDispositivo: "Samsung Tab A8",
    os: "Android",
    appAtivo: "GeoGebra",
    appAtivoPackage: "org.geogebra.android",
    bateriaPercentual: 77,
    status: "Conectado",
    isNfcValidated: true,
    modoAulaAtivo: true,
    ultimoPing: "há 5s"
  },
  {
    id: "dev-7",
    alunoNome: "Gabriela Costa",
    matricula: "MAT-2024-0107",
    turmaId: "turma-1",
    salaId: "sala-101",
    modeloDispositivo: "iPad 9th Gen",
    os: "iOS",
    appAtivo: "Google Docs",
    appAtivoPackage: "com.google.android.apps.docs",
    bateriaPercentual: 91,
    status: "Conectado",
    isNfcValidated: true,
    modoAulaAtivo: true,
    ultimoPing: "há 1s"
  }
];

export const mockAlertas: AlertaAtividade[] = [
  {
    id: "alert-1",
    tipo: "Bateria Crítica",
    dispositivoId: "dev-3",
    alunoNome: "Carla Mendes",
    salaNome: "Sala 101",
    descricao: "O dispositivo de Carla Mendes está com 12% de carga. Sugira o carregamento.",
    timestamp: "Há 4 minutos",
    lido: false
  },
  {
    id: "alert-2",
    tipo: "Inatividade Detectada",
    dispositivoId: "dev-4",
    alunoNome: "Diego Fernandes",
    salaNome: "Sala 101",
    descricao: "Diego Fernandes está sem interações há mais de 5 minutos.",
    timestamp: "Há 8 minutos",
    lido: false
  }
];

export const mockLogs: LogEvento[] = [
  {
    id: "log-1",
    timestamp: "08:30:02",
    tipo: "NFC_DETECTED",
    sala: "Sala 101",
    aluno: "Ana Beatriz Silveira",
    descricao: "Tag NFC lida pelo dispositivo (Samsung Galaxy Tab S7)"
  },
  {
    id: "log-2",
    timestamp: "08:30:03",
    tipo: "NFC_VALIDATED",
    sala: "Sala 101",
    aluno: "Ana Beatriz Silveira",
    descricao: "Assinatura criptográfica da Tag SALA-101 validada com sucesso"
  },
  {
    id: "log-3",
    timestamp: "08:30:04",
    tipo: "POLICY_UPDATED",
    sala: "Sala 101",
    descricao: "Política de aula de Geometria recebida pelo dispositivo"
  },
  {
    id: "log-4",
    timestamp: "08:30:05",
    tipo: "CLASS_STARTED",
    sala: "Sala 101",
    aluno: "Ana Beatriz Silveira",
    descricao: "Modo Aula ativado: 4 aplicativos autorizados na whitelist"
  },
  {
    id: "log-5",
    timestamp: "08:31:12",
    tipo: "APP_ALLOWED",
    sala: "Sala 101",
    aluno: "Ana Beatriz Silveira",
    descricao: "Aluno iniciou o aplicativo autorizado: GeoGebra"
  },
  {
    id: "log-6",
    timestamp: "08:34:44",
    tipo: "APP_BLOCKED",
    sala: "Sala 101",
    aluno: "Diego Fernandes",
    descricao: "Tentativa de abrir aplicativo restrito bloqueada pelo launcher"
  }
];
