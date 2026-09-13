import React from "react";

/** QR Code ilustrativo (padrão visual fixo, só p/ simulação da leitura). */
export function QrCodeArt() {
  const size = 25;
  const inFinder = (r, c) =>
    (r < 8 && c < 8) || (r < 8 && c >= size - 8) || (r >= size - 8 && c < 8);

  const modules = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (inFinder(r, c)) continue;
      if ((r * 31 + c * 17 + ((r * c) % 7)) % 3 === 0) modules.push(`${r}-${c}`);
    }
  }

  const finder = (ox, oy) => (
    <g key={`${ox}-${oy}`}>
      <rect x={ox} y={oy} width={7} height={7} fill="#09090B" />
      <rect x={ox + 1} y={oy + 1} width={5} height={5} fill="#ffffff" />
      <rect x={ox + 2} y={oy + 2} width={3} height={3} fill="#09090B" />
    </g>
  );

  return (
    <svg
      viewBox={`-1 -1 ${size + 2} ${size + 2}`}
      className="w-full h-full"
      role="img"
      aria-label="QR Code da sala de aula"
    >
      <rect x={-1} y={-1} width={size + 2} height={size + 2} fill="#ffffff" />
      {modules.map((key) => {
        const [r, c] = key.split("-").map(Number);
        return <rect key={key} x={c} y={r} width={1.02} height={1.02} fill="#09090B" />;
      })}
      {finder(0, 0)}
      {finder(size - 7, 0)}
      {finder(0, size - 7)}
    </svg>
  );
}
