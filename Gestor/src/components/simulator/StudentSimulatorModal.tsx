"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { StudentDeviceSimulator } from "./StudentDeviceSimulator";
import { useApp } from "@/context/AppContext";

export const StudentSimulatorModal: React.FC = () => {
  const { isSimulatorModalOpen, setIsSimulatorModalOpen } = useApp();

  return (
    <Modal
      isOpen={isSimulatorModalOpen}
      onClose={() => setIsSimulatorModalOpen(false)}
      title="📱 Simulador do Smartphone do Aluno (Android)"
      subtitle="Visualização interativa das telas mobile da solução Modo Aula (Páginas 1 a 6 do PDF de referência)."
      maxWidth="lg"
    >
      <div className="py-1">
        <StudentDeviceSimulator />
      </div>
    </Modal>
  );
};
