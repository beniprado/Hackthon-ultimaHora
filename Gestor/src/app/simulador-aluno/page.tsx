"use client";

import React from "react";
import { StudentDeviceSimulator } from "@/components/simulator/StudentDeviceSimulator";
import { ShieldCheck, Info } from "lucide-react";

export default function SimuladorAlunoPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Simulador do Smartphone do Aluno (Android)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Interaja com as 6 telas mobile projetadas no PDF de referência para a experiência do aluno.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col items-center">
        <StudentDeviceSimulator />
      </div>
    </div>
  );
}
