export type AppMobileStatus =
  | "standby"
  | "active"
  | "app"
  | "blocked"
  | "checkout"
  | "finished"
  | "home";

export interface MobileAula {
  id: string;
  disciplina: string;
  turmaNome: string;
  professor: string;
  sala: string;
  horarioInicio: string;
  horarioFim: string;
  status: string;
  appsPermitidosIds: string[];
}

export interface MobileSala {
  id: string;
  nome: string;
  bloco: string;
  nfcTagId: string;
  nfcStatus: string;
  status: string;
}

export interface MobileTurma {
  id: string;
  nome: string;
  ano: string;
  disciplina: string;
  professor: string;
  horario: string;
}

export interface MobileApp {
  id: string;
  nome: string;
  subtexto: string;
  subtitulo?: string;
  packageName: string;
  categoria: string;
  icone: string;
}

export interface MobileLog {
  id: string;
  timestamp: string;
  tipo: string;
  description: string;
  sala?: string;
  aluno?: string;
}

export interface MobileResponse {
  ok: boolean;
  timestamp: string;
  aula: MobileAula | null;
  sala: MobileSala | null;
  turma: MobileTurma | null;
  appsAutorizados: MobileApp[];
  dispositivosConectados: number;
  logsRecentes: MobileLog[];
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
  sessionExpirationTimestamp: number;
  allowedPackages: string[];
  schoolBssidHash: string;
  strictKioskMode: boolean;
}

export interface FocusInterceptionTelemetry {
  id: string;
  timestamp: string;
  salaNome: string;
  focusInterceptionCount: number;
  durationSeconds: number;
}
