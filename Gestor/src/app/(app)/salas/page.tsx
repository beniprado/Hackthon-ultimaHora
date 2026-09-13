"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  School, 
  Search, 
  ExternalLink,
  QrCode 
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { QRCodeGeneratorModal } from "@/components/security/QRCodeGeneratorModal";

export default function SalasPage() {
  const { salas } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedSalaForQr, setSelectedSalaForQr] = useState<string>("sala-101");

  const filteredSalas = salas.filter(s => 
    s.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.bloco.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.nfcTagId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Gestão de Salas & QR Codes Dinâmicos</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Gerencie as salas físicas, carteiras dos alunos e a emissão de QR Codes assinados com ECDSA P-256.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedSalaForQr("sala-101");
            setIsQrModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white dark:text-slate-950 bg-[#0e7c93] hover:bg-[#0b6376] dark:bg-cyan-500 dark:hover:bg-cyan-400 rounded-lg shadow-md shadow-[#0e7c93]/20 dark:shadow-cyan-500/20 transition-all self-start sm:self-auto active:scale-95"
        >
          <QrCode className="w-4 h-4 stroke-[2.5]" />
          <span>Gerar QR Code Dinâmico</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar sala, bloco ou identificador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-zinc-950/80 border border-[#cbd5e1] dark:border-zinc-800 rounded-lg text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSalas.map((sala) => (
          <div key={sala.id} className="bg-[#e0f7fb] dark:bg-[#132234] backdrop-blur-md border border-[#cbd5e1] dark:border-[#1e293b] rounded-xl p-5 shadow-lg hover:border-cyan-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800/60 text-[#0e7c93] dark:text-cyan-400 flex items-center justify-center font-bold">
                    <School className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-zinc-100 text-sm">{sala.nome}</h3>
                    <p className="text-[11px] text-slate-600 dark:text-zinc-400">{sala.bloco} • {sala.andar}</p>
                  </div>
                </div>
                <StatusBadge status={sala.status} size="sm" />
              </div>

              <div className="mt-4 p-3 bg-cyan-50/60 dark:bg-zinc-950/60 rounded-lg space-y-1.5 text-xs text-slate-600 dark:text-zinc-400 border border-[#cbd5e1] dark:border-zinc-800/80">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-zinc-500">ID Carteira/Sala:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-zinc-200">{sala.nfcTagId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-zinc-500">Criptografia:</span>
                  <StatusBadge status="ECDSA Válida" size="sm" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-zinc-500">Capacidade:</span>
                  <span className="font-medium text-slate-800 dark:text-zinc-200">{sala.capacidade} alunos</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#cbd5e1] dark:border-zinc-800/80 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedSalaForQr(sala.id);
                  setIsQrModalOpen(true);
                }}
                className="text-[11px] font-semibold text-[#0e7c93] dark:text-cyan-400 hover:text-[#0b6376] dark:hover:text-cyan-300 flex items-center gap-1.5"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Ver QR Dinâmico</span>
              </button>

              <Link
                href={"/salas/" + sala.id + "/status"}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white"
              >
                <span>Telemetria</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic QR Code Modal */}
      <QRCodeGeneratorModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        salaId={selectedSalaForQr}
      />
    </div>
  );
}
