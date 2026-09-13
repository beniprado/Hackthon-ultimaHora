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
  UserRole
} from "@/types";
import { 
  mockAplicativos, 
  mockAulas, 
  mockDispositivos, 
  mockSalas, 
  mockTurmas, 
  mockUsers, 
  mockAlertas, 
  mockLogs 
} from "@/lib/mockData";

export interface StudentSimulatorState {
  currentScreen: 1 | 2 | 3 | 4 | 5 | 6; // 1: Standby, 2: NFC Scan, 3: Active Launcher, 4: GeoGebra, 5: Restricted Block, 6: Finished
  isNfcTapped: boolean;
  activeAppId: string | null;
  batteryLevel: number;
  wifiConnected: boolean;
  selectedSalaId: string;
  selectedTurmaId: string;
}

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
  
  // Salas & NFC
  updateSala: (id: string, sala: Partial<Sala>) => void;
  revokeNfcTag: (salaId: string) => void;
  activateNfcTag: (salaId: string) => void;
  
  // Devices & Alerts
  dismissAlerta: (id: string) => void;
  triggerSimulatedAlert: (tipo: "Bateria Crítica" | "Inatividade Detectada" | "Tentativa de App Restrito", alunoNome: string) => void;
  
  // Simulator State
  simulatorState: StudentSimulatorState;
  setSimulatorState: React.Dispatch<React.SetStateAction<StudentSimulatorState>>;
  isSimulatorModalOpen: boolean;
  setIsSimulatorModalOpen: (open: boolean) => void;
  
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
  
  const [isSimulatorModalOpen, setIsSimulatorModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [simulatorState, setSimulatorState] = useState<StudentSimulatorState>({
    currentScreen: 3, // Defaults to Active Launcher for immediate demonstration
    isNfcTapped: true,
    activeAppId: "app-geogebra",
    batteryLevel: 85,
    wifiConnected: true,
    selectedSalaId: "sala-101",
    selectedTurmaId: "turma-1"
  });

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
      // If student simulator is currently active, transition to Screen 6
      setSimulatorState(prev => ({ ...prev, currentScreen: 6 }));
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
      simulatorState,
      setSimulatorState,
      isSimulatorModalOpen,
      setIsSimulatorModalOpen,
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
