export type UserRole = "ADMIN" | "GESTOR" | "PROFESSOR" | "SUPORTE";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  institution: string;
}

export type TurmaStatus = "Ativa" | "Agendada" | "Finalizada" | "Inativa";

export interface Turma {
  id: string;
  nome: string; // Ex: "1º A", "3º Ano Ensino Médio - A"
  ano: string; // Ex: "1º Ano", "3º Ano"
  disciplina: string; // Ex: "Matemática", "Português"
  professor: string; // Ex: "Ricardo Silva"
  professorId?: string;
  sala: string; // Ex: "Sala 101", "Lab 01"
  salaId?: string;
  horario: string; // Ex: "07:30 - 09:10"
  totalAlunos: number; // Ex: 32
  status: TurmaStatus;
}

export type AulaStatus = "Agendada" | "Em preparação" | "Ao vivo" | "Finalizada" | "Cancelada" | "Alerta" | "Ociosa";

export interface Aula {
  id: string;
  disciplina: string; // Ex: "Matemática Aplicada"
  turmaNome: string; // Ex: "1º A"
  turmaId: string;
  professor: string; // Ex: "Prof. Ricardo Silva"
  sala: string; // Ex: "Sala 101"
  salaId: string;
  data: string; // YYYY-MM-DD
  horarioInicio: string; // "08:00"
  horarioFim: string; // "09:20"
  duracaoMinutos?: number;
  alunosPresentes: number;
  alunosTotal: number;
  status: AulaStatus;
  appsPermitidosIds: string[];
  observacoes?: string;
}

export type AppStatus = "Ativo" | "Pendente" | "Inativo";
export type AppCategory = "Matemática" | "Línguas" | "Ciências" | "Produtividade" | "Comunicação" | "Geral";

export interface Aplicativo {
  id: string;
  nome: string; // Ex: "GeoGebra"
  subtitulo: string; // Ex: "Calculadora Gráfica e Geometria"
  packageName: string; // Ex: "org.geogebra.android"
  versao: string; // Ex: "5.0.760.0"
  ultimaAtualizacao: string; // Ex: "12/05/2024"
  status: AppStatus;
  categoria: AppCategory;
  descricao?: string;
  icone: string; // Lucide icon identifier or name
}

export type SalaStatus = "Disponível" | "Aula ativa" | "Offline";

export interface Sala {
  id: string;
  nome: string; // Ex: "Sala 101"
  bloco: string; // Ex: "Bloco B"
  andar: string; // Ex: "1º Andar"
  capacidade: number; // Ex: 32
  status: SalaStatus;
  nfcTagId: string; // Ex: "SALA-101"
  nfcStatus: "Ativa" | "Revogada" | "Pendente";
  nfcUltimaLeitura?: string;
  aulaAtualId?: string;
  dispositivosConectados: number;
  ultimaSincronizacao?: string;
}

export type DeviceConnectionStatus = "Conectado" | "Ocioso" | "Bloqueado" | "Desconectado" | "Alerta";

export interface DispositivoAluno {
  id: string;
  alunoNome: string;
  matricula: string;
  turmaId: string;
  salaId: string;
  modeloDispositivo: string; // Ex: "Samsung Galaxy Tab S7", "iPad Air 4"
  os: "Android" | "iOS" | "Windows" | "Outro";
  appAtivo: string; // Ex: "GeoGebra", "Calculadora"
  appAtivoPackage?: string;
  bateriaPercentual: number; // Ex: 85
  status: DeviceConnectionStatus;
  isNfcValidated: boolean;
  modoAulaAtivo: boolean;
  ultimoPing: string;
  alertaMensagem?: string;
}

export interface AlertaAtividade {
  id: string;
  tipo: "Bateria Crítica" | "Inatividade Detectada" | "Tentativa de App Restrito" | "Desconexão";
  dispositivoId: string;
  alunoNome: string;
  salaNome: string;
  descricao: string;
  timestamp: string;
  lido: boolean;
}

export interface LogEvento {
  id: string;
  timestamp: string; // Ex: "08:30:02"
  tipo: 
    | "DEVICE_CONNECTED" 
    | "DEVICE_DISCONNECTED" 
    | "NFC_DETECTED" 
    | "NFC_VALIDATED" 
    | "CLASS_STARTED" 
    | "CLASS_FINISHED" 
    | "APP_ALLOWED" 
    | "APP_BLOCKED" 
    | "DEVICE_IDLE" 
    | "BATTERY_LOW" 
    | "POLICY_UPDATED" 
    | "POLICY_REVOKED"
    | "FOCUS_BROADCAST"
    | "FOCUS_INTERCEPTION"
    | "QR_ROTATED";
  descricao: string;
  sala?: string;
  aluno?: string;
  detalhes?: string;
}

export interface Policy {
  id: string;
  nome: string;
  turmaId: string;
  disciplina: string;
  salaId: string;
  horario: string;
  data: string;
  appsPermitidosIds: string[];
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  createdAt: string;
  updatedAt: string;
}

// -------------------------------------------------------------
// OnFocus Pedagogical & Security Enhancements
// -------------------------------------------------------------

export type BroadcastCommandType = 
  | "LAUNCH_APP" 
  | "LOCK_FOCUS" 
  | "RELEASE_DEVICE" 
  | "CALL_ATTENTION";

export interface BroadcastCommand {
  id: string;
  type: BroadcastCommandType;
  title: string;
  payload?: {
    packageName?: string;
    appName?: string;
    message?: string;
  };
  timestamp: string;
  sentBy: string;
  targetSalaId?: string;
}

export interface DynamicQRCodePayload {
  version: string; // "onfocus-v1"
  roomId: string;
  roomName: string;
  aulaId: string;
  schoolBssidHash: string; // SHA-256 of institutional BSSID
  nonce: string; // Cryptographic nonce (anti-replay)
  timestamp: number; // Epoch timestamp (seconds)
  ttlSeconds: number; // Token lifetime in seconds (e.g. 60)
  signature: string; // ECDSA_SHA256 digital signature
}

export interface OfflineSessionPolicy {
  sessionId: string;
  sessionExpirationTimestamp: number; // Unix timestamp in seconds
  allowedPackages: string[];
  schoolBssidHash: string;
  strictKioskMode: boolean;
}

export interface FocusInterceptionTelemetry {
  id: string;
  timestamp: string;
  salaNome: string;
  // LGPD Privacy by Design: strictly minimized data.
  // Never records private app package names, titles, or screen content.
  focusInterceptionCount: number;
  durationSeconds: number;
}

