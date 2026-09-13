/**
 * Cliente de API do aplicativo móvel OnFocus.
 * Conecta-se ao backend de gerenciamento da instituição escolar
 * com fallback autônomo offline caso o servidor local esteja inacessível.
 */

const FALLBACK_MOCK_DATA = {
  ok: true,
  timestamp: new Date().toISOString(),
  aula: {
    id: "aula-1",
    disciplina: "Matemática Aplicada",
    turmaNome: "1º A - Ensino Médio",
    professor: "Prof. Ricardo Silva",
    sala: "Sala 101 - Bloco B",
    horarioInicio: "08:30",
    horarioFim: "09:20",
    status: "Ao vivo",
    appsPermitidosIds: ["app-geogebra", "app-calc", "app-docs"],
  },
  sala: {
    id: "sala-101",
    nome: "Sala 101 - Bloco B",
    bloco: "Bloco B",
    nfcTagId: "SALA-101-CARTEIRA-04",
    nfcStatus: "Ativa",
    status: "Aula ativa",
  },
  turma: {
    id: "turma-1",
    nome: "1º A",
    ano: "1º Ano EM",
    disciplina: "Matemática",
    professor: "Ricardo Silva",
    horario: "08:30 - 09:20",
  },
  appsAutorizados: [
    {
      id: "app-geogebra",
      nome: "GeoGebra",
      subtexto: "Calculadora Gráfica e Geometria 3D",
      packageName: "org.geogebra.android",
      categoria: "Matemática",
      icone: "calculator",
    },
    {
      id: "app-calc",
      nome: "Calculadora Científica",
      subtexto: "Funções trigonométricas e operações",
      packageName: "com.android.calculator2",
      categoria: "Matemática",
      icone: "binary",
    },
    {
      id: "app-docs",
      nome: "Documentos da Aula",
      subtexto: "Editor e visualizador de resumos",
      packageName: "com.google.android.apps.docs.editors.docs",
      categoria: "Produtividade",
      icone: "file-text",
    },
    {
      id: "app-arquivos",
      nome: "Materiais Didáticos",
      subtexto: "Apostilas e PDFs da turma",
      packageName: "com.android.documentsui",
      categoria: "Geral",
      icone: "folder",
    },
  ],
  dispositivosConectados: 28,
  logsRecentes: [],
};

export async function fetchMobileState() {
  try {
    const res = await fetch("/api/mobile", { cache: "no-store" });
    if (res.ok) {
      return await res.json();
    }
    return FALLBACK_MOCK_DATA;
  } catch {
    // Fallback offline-first
    return FALLBACK_MOCK_DATA;
  }
}
