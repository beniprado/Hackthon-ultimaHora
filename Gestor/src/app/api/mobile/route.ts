import { NextResponse } from "next/server";
import {
  mockAulas,
  mockAplicativos,
  mockSalas,
  mockTurmas,
  mockLogs,
  mockDispositivos,
} from "@/lib/mockData";

/**
 * Endpoint público da plataforma OnFocus para o App Mobile do aluno.
 * Rota: GET /api/mobile
 *
 * Retorna o estado atual da aula ativa, a sala correspondente e a whitelist
 * de aplicativos autorizados para que o launcher do celular possa aplicar a
 * política de bloqueio.
 */
export async function GET() {
  // Aula em andamento (simulada como a ativa do mockData)
  const aulaAtiva = mockAulas.find((a) => a.status === "Ao vivo");

  const sala = aulaAtiva ? mockSalas.find((s) => s.id === aulaAtiva.salaId) : undefined;
  const turma = aulaAtiva ? mockTurmas.find((t) => t.id === aulaAtiva.turmaId) : undefined;

  const appsAutorizados = aulaAtiva
    ? mockAplicativos.filter((app) => aulaAtiva.appsPermitidosIds.includes(app.id))
    : [];

  const dispositivosNaSala = aulaAtiva
    ? mockDispositivos.filter((d) => d.salaId === aulaAtiva.salaId)
    : [];

  const logsRecentes = mockLogs
    .filter((l) => (aulaAtiva ? l.sala === aulaAtiva.sala : true))
    .slice(0, 10)
    .map((l) => ({
      id: l.id,
      timestamp: l.timestamp,
      tipo: l.tipo,
      description: l.descricao,
      sala: l.sala,
      aluno: l.aluno,
    }));

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    aula: aulaAtiva
      ? {
          id: aulaAtiva.id,
          disciplina: aulaAtiva.disciplina,
          turmaNome: aulaAtiva.turmaNome,
          professor: aulaAtiva.professor,
          sala: aulaAtiva.sala,
          horarioInicio: aulaAtiva.horarioInicio,
          horarioFim: aulaAtiva.horarioFim,
          status: aulaAtiva.status,
          appsPermitidosIds: aulaAtiva.appsPermitidosIds,
        }
      : null,
    sala: sala
      ? {
          id: sala.id,
          nome: sala.nome,
          bloco: sala.bloco,
          nfcTagId: sala.nfcTagId,
          nfcStatus: sala.nfcStatus,
          status: sala.status,
        }
      : null,
    turma: turma
      ? {
          id: turma.id,
          nome: turma.nome,
          ano: turma.ano,
          disciplina: turma.disciplina,
          professor: turma.professor,
          horario: turma.horario,
        }
      : null,
    appsAutorizados: appsAutorizados.map((app) => ({
      id: app.id,
      nome: app.nome,
      subtitulo: app.subtitulo,
      subtexto: app.subtitulo,
      packageName: app.packageName,
      categoria: app.categoria,
      icone: app.icone,
    })),
    dispositivosConectados: dispositivosNaSala.length,
    logsRecentes,
  });
}