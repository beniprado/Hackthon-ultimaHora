"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  Aplicativo, 
  Aula, 
  DispositivoAluno, 
  Sala, 
  Turma, 
  User, 
  LogEvento, 
  AlertaAtividade,
  UserRole,
  BroadcastCommand,
  DynamicQRCodePayload
} from "@/types";
import { 
  mockAplicativos, 
  mockAulas, 
  mockDispositivos, 
  mockSalas, 
  mockTurmas, 
  mockUsers, 
  mockAlertas, 
  mockLogs,
  mockActiveBroadcast,
  mockDynamicQRCode
} from "@/lib/mockData";

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  setUserRole: (role: UserRole) => void;
  
  turmas: Turma[];
  aulas: Aula[];
  aplicativos: Aplicativo[];
  salas: Sala[];
  dispositivos: DispositivoAluno[];
  alertas: AlertaAtividade[];
  logs: LogEvento[];

  // Focus Broadcast & Pedagogical Commands
  activeBroadcast: BroadcastCommand | null;
  broadcastCommand: (cmd: { type: BroadcastCommand["type"]; title: string; payload?: BroadcastCommand["payload"]; targetSalaId?: string }) => void;
  clearBroadcast: () => void;

  // Dynamic QR Code & Security
  generateDynamicQRCode: (salaId: string, aulaId?: string) => DynamicQRCodePayload;
  logFocusInterception: (salaNome?: string) => void;
  
  // Turmas actions
  addTurma: (turma: Omit<Turma, "id">) => void;
  updateTurma: (id: string, turma: Partial<Turma>) => void;
  deleteTurma: (id: string) => void;
  
  // Aulas actions
  addAula: (aula: Omit<Aula, "id">) => string;
  updateAula: (id: string, aula: Partial<Aula>) => void;
  startAula: (id: string) => void;
  finishAula: (id: string) => void;
  
  // Apps actions
  addAplicativo: (app: Omit<Aplicativo, "id">) => void;
  updateAplicativo: (id: string, app: Partial<Aplicativo>) => void;
  deleteAplicativo: (id: string) => void;
  toggleAppStatus: (id: string) => void;
  
  // Salas & NFC / QR
  updateSala: (id: string, sala: Partial<Sala>) => void;
  revokeNfcTag: (salaId: string) => void;
  activateNfcTag: (salaId: string) => void;
  
  // Devices & Alerts
  dismissAlerta: (id: string) => void;
  triggerSimulatedAlert: (tipo: "Bateria Crítica" | "Inatividade Detectada" | "Tentativa de App Restrito", alunoNome: string) => void;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
  const [turmas, setTurmas] = useState<Turma[]>(mockTurmas);
  const [aulas, setAulas] = useState<Aula[]>(mockAulas);
  const [aplicativos, setAplicativos] = useState<Aplicativo[]>(mockAplicativos);
  const [salas, setSalas] = useState<Sala[]>(mockSalas);
  const [dispositivos, setDispositivos] = useState<DispositivoAluno[]>(mockDispositivos);
  const [alertas, setAlertas] = useState<AlertaAtividade[]>(mockAlertas);
  const [logs, setLogs] = useState<LogEvento[]>(mockLogs);
  const [activeBroadcast, setActiveBroadcast] = useState<BroadcastCommand | null>(mockActiveBroadcast);
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addLog = (tipo: LogEvento["tipo"], descricao: string, sala?: string, aluno?: string) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    const newLog: LogEvento = {
      id: "log-" + Date.now(),
      timestamp: timeStr,
      tipo,
      descricao,
      sala: sala || "Sala 101",
      aluno
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const setUserRole = (role: UserRole) => {
    const found = mockUsers.find(u => u.role === role) || {
      id: "user-custom",
      name: "Usuário (" + role + ")",
      email: role.toLowerCase() + "@colegiomodelo.edu.br",
      role: role,
      institution: "Colégio Modelo"
    };
    setCurrentUser(found);
    showToast("Perfil alterado para: " + role);
  };

  // Turmas
  const addTurma = (data: Omit<Turma, "id">) => {
    const newTurma: Turma = { ...data, id: "turma-" + Date.now() };
    setTurmas(prev => [newTurma, ...prev]);
    showToast("Turma " + newTurma.nome + " cadastrada com sucesso!");
    addLog("POLICY_UPDATED", "Nova turma cadastrada: " + newTurma.nome);
  };

  const updateTurma = (id: string, data: Partial<Turma>) => {
    setTurmas(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
    showToast("Turma atualizada com sucesso!");
  };

  const deleteTurma = (id: string) => {
    setTurmas(prev => prev.filter(t => t.id !== id));
    showToast("Turma removida.");
  };

  // Aulas
  const addAula = (data: Omit<Aula, "id">): string => {
    const id = "aula-" + Date.now();
    const newAula: Aula = { ...data, id };
    setAulas(prev => [newAula, ...prev]);
    showToast("Aula configurada com sucesso!");
    addLog("POLICY_UPDATED", "Nova aula configurada para a turma " + newAula.turmaNome, newAula.sala);
    return id;
  };

  const updateAula = (id: string, data: Partial<Aula>) => {
    setAulas(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
    showToast("Configuração da aula salva!");
    addLog("POLICY_UPDATED", "Política de aula atualizada", data.sala);
  };

  const startAula = (id: string) => {
    setAulas(prev => prev.map(a => a.id === id ? { ...a, status: "Ao vivo" } : a));
    const aula = aulas.find(a => a.id === id);
    if (aula) {
      setSalas(prev => prev.map(s => s.id === aula.salaId ? { ...s, status: "Aula ativa", aulaAtualId: id } : s));
      addLog("CLASS_STARTED", "Modo Aula ativado para " + aula.disciplina + " (" + aula.turmaNome + ")", aula.sala);
      showToast("Aula de " + aula.disciplina + " iniciada! Modo Aula ativo.");
    }
  };

  const finishAula = (id: string) => {
    setAulas(prev => prev.map(a => a.id === id ? { ...a, status: "Finalizada" } : a));
    const aula = aulas.find(a => a.id === id);
    if (aula) {
      setSalas(prev => prev.map(s => s.id === aula.salaId ? { ...s, status: "Disponível", aulaAtualId: undefined } : s));
      addLog("CLASS_FINISHED", "Aula encerrada com sucesso. Restauração dos dispositivos acionada.", aula.sala);
      showToast("Aula encerrada. Dispositivos liberados para uso normal.");
    }
  };

  // Apps
  const addAplicativo = (data: Omit<Aplicativo, "id">) => {
    const newApp: Aplicativo = { ...data, id: "app-" + Date.now() };
    setAplicativos(prev => [newApp, ...prev]);
    showToast("Aplicativo " + newApp.nome + " adicionado ao catálogo!");
    addLog("POLICY_UPDATED", "Novo aplicativo cadastrado: " + newApp.nome + " (" + newApp.packageName + ")");
  };

  const updateAplicativo = (id: string, data: Partial<Aplicativo>) => {
    setAplicativos(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
    showToast("Aplicativo atualizado!");
  };

  const deleteAplicativo = (id: string) => {
    setAplicativos(prev => prev.filter(a => a.id !== id));
    showToast("Aplicativo removido do catálogo.");
  };

  const toggleAppStatus = (id: string) => {
    setAplicativos(prev => prev.map(a => {
      if (a.id === id) {
        const nextStatus = a.status === "Ativo" ? "Inativo" : "Ativo";
        return { ...a, status: nextStatus };
      }
      return a;
    }));
  };

  // Salas & NFC
  const updateSala = (id: string, data: Partial<Sala>) => {
    setSalas(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    showToast("Sala atualizada com sucesso!");
  };

  const revokeNfcTag = (salaId: string) => {
    setSalas(prev => prev.map(s => s.id === salaId ? { ...s, nfcStatus: "Revogada" } : s));
    const sala = salas.find(s => s.id === salaId);
    addLog("POLICY_REVOKED", "Tag NFC " + (sala?.nfcTagId || "") + " foi revogada por segurança.", sala?.nome);
    showToast("Tag NFC revogada.");
  };

  const activateNfcTag = (salaId: string) => {
    setSalas(prev => prev.map(s => s.id === salaId ? { ...s, nfcStatus: "Ativa" } : s));
    const sala = salas.find(s => s.id === salaId);
    addLog("NFC_VALIDATED", "Tag NFC " + (sala?.nfcTagId || "") + " reativada e sincronizada.", sala?.nome);
    showToast("Tag NFC ativada com sucesso!");
  };

  // Alertas
  const dismissAlerta = (id: string) => {
    setAlertas(prev => prev.filter(a => a.id !== id));
    showToast("Alerta marcado como resolvido.");
  };

  const triggerSimulatedAlert = (tipo: "Bateria Crítica" | "Inatividade Detectada" | "Tentativa de App Restrito", alunoNome: string) => {
    const newAlert: AlertaAtividade = {
      id: "alert-" + Date.now(),
      tipo,
      dispositivoId: "dev-sim",
      alunoNome,
      salaNome: "Sala 101",
      descricao: tipo === "Bateria Crítica" 
        ? "O dispositivo de " + alunoNome + " está com carga baixa crítica." 
        : tipo === "Inatividade Detectada"
        ? alunoNome + " está sem interações há mais de 5 minutos."
        : alunoNome + " tentou abrir um app não autorizado.",
      timestamp: "Agora mesmo",
      lido: false
    };
    setAlertas(prev => [newAlert, ...prev]);
    addLog(tipo === "Bateria Crítica" ? "BATTERY_LOW" : tipo === "Tentativa de App Restrito" ? "APP_BLOCKED" : "DEVICE_IDLE", newAlert.descricao, "Sala 101", alunoNome);
    showToast("Novo alerta emitido: " + tipo);
  };

  // Focus Broadcast & Pedagogical Commands
  const broadcastCommand = (cmd: { type: BroadcastCommand["type"]; title: string; payload?: BroadcastCommand["payload"]; targetSalaId?: string }) => {
    const newBroadcast: BroadcastCommand = {
      id: "bcast-" + Date.now(),
      type: cmd.type,
      title: cmd.title,
      payload: cmd.payload,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sentBy: currentUser.name,
      targetSalaId: cmd.targetSalaId || "sala-101"
    };
    setActiveBroadcast(newBroadcast);
    addLog("FOCUS_BROADCAST", "Comando de foco transmitido: " + cmd.title, cmd.targetSalaId ? "Sala " + cmd.targetSalaId : "Todas as Salas");
    showToast("Comando \"" + cmd.title + "\" transmitido com sucesso aos alunos!");

    // Real-time synchronization event for connected student mobile clients
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("onfocus-broadcast", { detail: newBroadcast }));
    }
  };

  const clearBroadcast = () => {
    setActiveBroadcast(null);
    showToast("Transmissão de foco encerrada.");
  };

  // Dynamic QR Code generation with anti-replay guarantees
  const generateDynamicQRCode = (salaId: string, aulaId?: string): DynamicQRCodePayload => {
    const randomBytes = Array.from({ length: 12 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0")).join("");
    const salaObj = salas.find(s => s.id === salaId) || salas[0];
    const newPayload: DynamicQRCodePayload = {
      version: "onfocus-v1",
      roomId: salaId,
      roomName: salaObj.nome,
      aulaId: aulaId || salaObj.aulaAtualId || "aula-1",
      schoolBssidHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      nonce: randomBytes,
      timestamp: Math.floor(Date.now() / 1000),
      ttlSeconds: 60,
      signature: "MEQCIDz81K9nUfWb7hL0v+3aX1pQ9Y4vjZ8m2L0k1Np3R4sTAiB6q8W9Z1X2y3T4U5V6w7X8y9Z0a1b2c3d4e5f6=="
    };
    addLog("QR_ROTATED", "QR Code dinâmico gerado para " + salaObj.nome + " (Nonce: " + randomBytes.substring(0, 8) + "...)", salaObj.nome);
    return newPayload;
  };

  // LGPD Privacy by Design: Minimized Telemetry
  const logFocusInterception = (salaNome?: string) => {
    addLog(
      "FOCUS_INTERCEPTION",
      "Intervenção pedagógica amigável acionada (dados minimizados em conformidade com LGPD)",
      salaNome || "Sala 101"
    );
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      setUserRole,
      turmas,
      aulas,
      aplicativos,
      salas,
      dispositivos,
      alertas,
      logs,
      activeBroadcast,
      broadcastCommand,
      clearBroadcast,
      generateDynamicQRCode,
      logFocusInterception,
      addTurma,
      updateTurma,
      deleteTurma,
      addAula,
      updateAula,
      startAula,
      finishAula,
      addAplicativo,
      updateAplicativo,
      deleteAplicativo,
      toggleAppStatus,
      updateSala,
      revokeNfcTag,
      activateNfcTag,
      dismissAlerta,
      triggerSimulatedAlert,
      toastMessage,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return ctx;
};
