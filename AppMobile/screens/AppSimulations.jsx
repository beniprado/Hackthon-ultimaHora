import React, { useState } from "react";

/** Rótulo inferior padrão das simulações ("AULA: ..." com ponto verde). */
function SimFooter({ label }) {
  return (
    <div className="px-4 py-2.5 border-t border-zinc-200 shrink-0 bg-white">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
        <span className="text-[11px] font-mono uppercase tracking-wide text-zinc-500 truncate">
          {label}
        </span>
      </div>
    </div>
  );
}

/* ---------------- GeoGebra (geometria) ---------------- */

function GeogebraSim() {
  return (
    <>
      <div className="px-4 py-2.5 border-b border-zinc-200 bg-zinc-50 shrink-0">
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <span className="font-mono text-xs uppercase tracking-wide">F(X)</span>
          <span className="font-mono">sin(x) + cos(x)</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-600 mt-1">
          <span className="font-mono text-xs uppercase tracking-wide">C1</span>
          <span className="font-mono">Circle(A, 5)</span>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-zinc-100 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="300" fill="#E4E4E7" />
          <line x1="0" y1="150" x2="400" y2="150" stroke="#D4D4D8" strokeWidth="2" />
          <line x1="200" y1="0" x2="200" y2="300" stroke="#D4D4D8" strokeWidth="2" />
          <circle cx="160" cy="150" r="60" fill="none" stroke="#0e7c93" strokeWidth="3" />
          <rect x="240" y="110" width="90" height="80" fill="none" stroke="#3F3F46" strokeWidth="3" />
          <polygon points="285,170 300,145 315,170" fill="none" stroke="#3F3F46" strokeWidth="3" />
          <circle cx="160" cy="150" r="3" fill="#0e7c93" />
        </svg>
        <div className="absolute bottom-3 left-3 bg-white rounded-lg px-3 py-1.5 shadow-sm text-[13px] font-mono text-zinc-700">
          A: (2.45, 5.12)
        </div>
      </div>

      <SimFooter label="AULA: GEOMETRIA ANALÍTICA" />
    </>
  );
}

/* ---------------- Calculadora (funcional) ---------------- */

function CalculadoraSim() {
  const [display, setDisplay] = useState("0");
  const [expr, setExpr] = useState("");
  const [acc, setAcc] = useState(null);
  const [op, setOp] = useState(null);
  const [fresh, setFresh] = useState(true);

  const fmt = (n) => {
    if (Number.isNaN(n) || !Number.isFinite(n)) return "Erro";
    return String(Math.round(n * 1e10) / 1e10);
  };

  const compute = (a, b, o) => {
    switch (o) {
      case "+": return a + b;
      case "−": return a - b;
      case "×": return a * b;
      case "÷": return b === 0 ? NaN : a / b;
      default: return b;
    }
  };

  const inputDigit = (d) => {
    if (!fresh && d === "." && display.includes(".")) return;
    if (fresh) {
      setDisplay(d === "." ? "0." : d);
      setFresh(false);
    } else {
      setDisplay(display === "0" && d !== "." ? d : display + d);
    }
  };

  const inputOperator = (o) => {
    const cur = parseFloat(display);
    if (acc !== null && op && !fresh) {
      const r = compute(acc, cur, op);
      setAcc(r);
      setDisplay(fmt(r));
      setExpr(`${fmt(r)} ${o}`);
    } else {
      setAcc(Number.isNaN(cur) ? 0 : cur);
      setExpr(`${fmt(Number.isNaN(cur) ? 0 : cur)} ${o}`);
    }
    setOp(o);
    setFresh(true);
  };

  const equals = () => {
    if (acc === null || !op) return;
    const cur = parseFloat(display);
    const r = compute(acc, Number.isNaN(cur) ? 0 : cur, op);
    setExpr(`${fmt(acc)} ${op} ${fmt(Number.isNaN(cur) ? 0 : cur)} =`);
    setDisplay(fmt(r));
    setAcc(null);
    setOp(null);
    setFresh(true);
  };

  const clear = () => {
    setDisplay("0");
    setExpr("");
    setAcc(null);
    setOp(null);
    setFresh(true);
  };

  const keyCls =
    "py-2.5 text-lg font-medium rounded-none transition-colors focus:outline-none ";
  const numCls = keyCls + "bg-white text-zinc-800 hover:bg-zinc-100 active:bg-zinc-200";
  const opCls = (active) =>
    keyCls + (active ? "bg-[#0e7c93] text-white" : "bg-zinc-50 text-[#0e7c93] hover:bg-zinc-100 active:bg-zinc-200");

  const Key = ({ label, onPress, className, span }) => (
    <button
      type="button"
      onClick={onPress}
      className={`${className} ${span ? "col-span-2" : ""}`}
      aria-label={label}
    >
      {label}
    </button>
  );

  return (
    <>
      <div className="bg-zinc-900 text-white px-4 pt-3 pb-3 shrink-0">
        <p className="text-right text-xs font-mono text-zinc-400 h-4 truncate">{expr || "\u00A0"}</p>
        <p className="text-right text-4xl font-mono font-semibold truncate tabular-nums">{display}</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar bg-zinc-200">
        <div className="grid grid-cols-4 gap-px min-h-full">
          <Key label="C" onPress={clear} className={opCls(false)} />
          <Key label="±" onPress={() => { if (display !== "0" && display !== "Erro") { setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display); setFresh(false); } }} className={opCls(false)} />
          <Key label="%" onPress={() => { const v = parseFloat(display); if (!Number.isNaN(v)) { setDisplay(fmt(v / 100)); setFresh(true); } }} className={opCls(false)} />
          <Key label="÷" onPress={() => inputOperator("÷")} className={opCls(op === "÷")} />
          <Key label="7" onPress={() => inputDigit("7")} className={numCls} />
          <Key label="8" onPress={() => inputDigit("8")} className={numCls} />
          <Key label="9" onPress={() => inputDigit("9")} className={numCls} />
          <Key label="×" onPress={() => inputOperator("×")} className={opCls(op === "×")} />
          <Key label="4" onPress={() => inputDigit("4")} className={numCls} />
          <Key label="5" onPress={() => inputDigit("5")} className={numCls} />
          <Key label="6" onPress={() => inputDigit("6")} className={numCls} />
          <Key label="−" onPress={() => inputOperator("−")} className={opCls(op === "−")} />
          <Key label="1" onPress={() => inputDigit("1")} className={numCls} />
          <Key label="2" onPress={() => inputDigit("2")} className={numCls} />
          <Key label="3" onPress={() => inputDigit("3")} className={numCls} />
          <Key label="+" onPress={() => inputOperator("+")} className={opCls(op === "+")} />
          <Key label="0" onPress={() => inputDigit("0")} className={numCls} span />
          <Key label="." onPress={() => inputDigit(".")} className={numCls} />
          <Key label="=" onPress={equals} className={keyCls + "bg-[#0e7c93] text-white hover:bg-[#0b6376] active:bg-[#084c5b]"} />
        </div>
      </div>

      <SimFooter label="AULA: OPERAÇÕES MATEMÁTICAS" />
    </>
  );
}

/* ---------------- Google Docs (editor) ---------------- */

function DocsSim() {
  return (
    <>
      <div className="flex items-center gap-1 px-3 py-2 border-b border-zinc-200 bg-white shrink-0 text-zinc-600">
        {["B", "I", "U"].map((f) => (
          <span key={f} className={`w-8 h-8 flex items-center justify-center rounded-lg text-[15px] ${f === "B" ? "bg-zinc-100 font-bold text-zinc-800" : f === "I" ? "italic" : "underline"}`}>
            {f}
          </span>
        ))}
        <span className="w-px h-5 bg-zinc-200 mx-1" />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h10" /></svg>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></svg>
        <span className="ml-auto text-[11px] font-mono text-zinc-400">SALVO 08:42</span>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar bg-zinc-100 p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 min-h-full">
          <p className="font-bold text-zinc-900 text-[15px] leading-snug">Resumo — Equação do 2º grau</p>
          <p className="text-[11px] text-zinc-400 mt-0.5">Turma 1º A • Prof. Ricardo Silva</p>
          <div className="mt-3 space-y-2 text-[13px] text-zinc-700 leading-relaxed">
            <p>
              A fórmula de Bhaskara resolve equações do tipo{" "}
              <span className="font-mono bg-zinc-100 px-1 rounded">ax² + bx + c = 0</span>:
            </p>
            <p className="font-mono text-center bg-cyan-50 text-cyan-900 rounded-lg py-2">
              x = (−b ± √Δ) / 2a
            </p>
            <p>
              • Se <span className="font-mono">Δ &gt; 0</span>, há duas raízes reais diferentes.
            </p>
            <p>
              • Se <span className="font-mono">Δ = 0</span>, há uma raiz real dupla.
              <span className="inline-block w-[7px] h-4 bg-[#0e7c93] ml-1 align-middle animate-pulse" />
            </p>
          </div>
        </div>
      </div>

      <SimFooter label="DOCUMENTO DA AULA" />
    </>
  );
}

/* ---------------- Arquivos (pastas e PDFs) ---------------- */

const FILES = [
  { name: "Materiais de Matemática", meta: "12 itens", folder: true },
  { name: "Apostila — Cap. 4.pdf", meta: "PDF • 2,4 MB", folder: false },
  { name: "Lista de exercícios 07.pdf", meta: "PDF • 312 KB", folder: false },
  { name: "Gráficos da aula.png", meta: "Imagem • 1,1 MB", folder: false },
  { name: "Resumo — Bhaskara.docx", meta: "Documento • 88 KB", folder: false },
];

function ArquivosSim() {
  return (
    <>
      <div className="px-4 py-2.5 border-b border-zinc-200 bg-white shrink-0">
        <div className="flex items-center gap-2 bg-zinc-100 rounded-xl px-3 py-2 text-zinc-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
          <span className="text-[13px]">Buscar nos materiais…</span>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar bg-white px-2 py-1">
        {FILES.map((f) => (
          <div key={f.name} className="flex items-center gap-3 px-2 py-2.5 rounded-xl">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${f.folder ? "bg-cyan-50 text-[#0e7c93]" : "bg-zinc-100 text-zinc-600"}`}>
              {f.folder ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-800 truncate">{f.name}</p>
              <p className="text-[11px] text-zinc-400">{f.meta}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </div>
        ))}
      </div>

      <SimFooter label="PASTA: MATERIAIS DIDÁTICOS" />
    </>
  );
}

/* ---------------- Genérico (qualquer outro app) ---------------- */

function GenericSim({ appName, subtexto }) {
  return (
    <>
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar bg-zinc-50 flex flex-col items-center justify-center px-8 py-6 text-center">
        <div className="w-20 h-20 rounded-3xl bg-[#0e7c93] text-white flex items-center justify-center text-3xl font-bold shadow-lg shadow-cyan-200">
          {(appName || "A").charAt(0).toUpperCase()}
        </div>
        <p className="mt-4 font-bold text-zinc-900 text-lg">{appName || "Aplicativo"}</p>
        <p className="text-[13px] text-zinc-500 mt-1">{subtexto || "Aplicativo autorizado"}</p>
        <div className="mt-4 flex items-center gap-2 bg-white border border-zinc-200 rounded-full px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-[11px] font-mono uppercase tracking-wide text-zinc-500">Prévia simulada ativa</span>
        </div>
      </div>

      <SimFooter label="APP AUTORIZADO NA AULA" />
    </>
  );
}

/* ---------------- Seletor ---------------- */

export function AppSimulation({
  appId,
  appName,
  subtexto,
}) {
  switch (appId) {
    case "app-geogebra":
      return <GeogebraSim />;
    case "app-calc":
      return <CalculadoraSim />;
    case "app-docs":
      return <DocsSim />;
    case "app-arquivos":
      return <ArquivosSim />;
    default:
      return <GenericSim appName={appName} subtexto={subtexto} />;
  }
}
