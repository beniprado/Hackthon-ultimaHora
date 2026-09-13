"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  School, 
  Radio, 
  Wifi, 
  Plus, 
  Search, 
  ShieldCheck, 
  MoreHorizontal, 
  CheckCircle2, 
  Key, 
  ExternalLink 
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Modal } from "@/components/ui/Modal";

export default function SalasPage() {
  const { salas, revokeNfcTag, activateNfcTag, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [isNfcKeyModalOpen, setIsNfcKeyModalOpen] = useState(false);
  const [selectedSalaForNfc, setSelectedSalaForNfc] = useState<string>("sala-101");

  const filteredSalas = salas.filter(s => 
    s.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.bloco.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.nfcTagId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gestão de Salas e Tags NFC</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gerencie as salas físicas, capacidades e as Tags NFC criptografadas instaladas nas portas.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedSalaForNfc("sala-101");
            setIsNfcKeyModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1683D8] hover:bg-blue-600 rounded-lg shadow-sm shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Radio className="w-4 h-4 stroke-[2.5]" />
          <span>Configurar Tag NFC</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSalas.map((sala) => (
          <div key={sala.id} className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1683D8] flex items-center justify-center font-bold">
                    <School className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{sala.nome}</h3>
                    <p className="text-[11px] text-slate-400">{sala.bloco} • {sala.andar}</p>
                  </div>
                </div>
                <StatusBadge status={sala.status} size="sm" />
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-lg space-y-1.5 text-xs text-slate-600 border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Tag NFC:</span>
                  <span className="font-mono font-bold text-slate-800">{sala.nfcTagId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Status da Tag:</span>
                  <StatusBadge status={sala.nfcStatus} size="sm" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Capacidade:</span>
                  <span className="font-medium">{sala.capacidade} alunos</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">{sala.ultimaSincronizacao || "Sincronizado"}</span>
              <Link
                href={"/salas/" + sala.id + "/status"}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#1683D8] hover:text-blue-700"
              >
                <span>Ver Monitoramento</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* NFC Configuration & Security Payload Modal */}
      <Modal
        isOpen={isNfcKeyModalOpen}
        onClose={() => setIsNfcKeyModalOpen(false)}
        title="Assinatura Criptográfica da Tag NFC"
        subtitle="Arquitetura de segurança para proteção contra clonagem de tags físicas."
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
            As tags NFC do Modo Aula utilizam tokens efêmeros assinados digitalmente. O smartphone do aluno valida o nonce e o timestamp antes de ativar a política de bloqueio.
          </p>

          <div className="bg-slate-900 text-emerald-400 p-3.5 rounded-xl font-mono text-[11px] space-y-1 overflow-x-auto border border-slate-800">
            <p className="text-slate-400">// Exemplo de Payload NFC Criptografado</p>
            <p>&#123;</p>
            <p>&nbsp;&nbsp;&quot;sala_id&quot;: &quot;sala-101&quot;,</p>
            <p>&nbsp;&nbsp;&quot;tag_id&quot;: &quot;SALA-101&quot;,</p>
            <p>&nbsp;&nbsp;&quot;timestamp&quot;: 1716366600,</p>
            <p>&nbsp;&nbsp;&quot;nonce&quot;: &quot;f9a2c8901b&quot;,</p>
            <p>&nbsp;&nbsp;&quot;signature&quot;: &quot;ECDSA_SHA256_9b83f...&quot;</p>
            <p>&#125;</p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => {
                revokeNfcTag(selectedSalaForNfc);
                setIsNfcKeyModalOpen(false);
              }}
              className="px-3.5 py-2 text-rose-600 hover:bg-rose-50 rounded-lg font-bold border border-rose-200"
            >
              Revogar Tag
            </button>
            <button
              onClick={() => {
                activateNfcTag(selectedSalaForNfc);
                setIsNfcKeyModalOpen(false);
              }}
              className="px-4 py-2 bg-[#1683D8] text-white font-bold rounded-lg"
            >
              Reemitir Chave & Ativar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
