import type { MobileResponse } from "@/types";

export async function fetchMobileState(): Promise<MobileResponse> {
  const res = await fetch(`/api/mobile`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Falha ao buscar estado do OnFocus: " + res.status);
  }
  return res.json();
}