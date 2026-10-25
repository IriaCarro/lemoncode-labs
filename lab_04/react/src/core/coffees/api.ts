import type { Coffee } from "./model";

export async function getCoffees(signal: AbortSignal): Promise<Coffee[]> {
  const response = await fetch("/coffees.json", { signal });

  if (!response.ok) {
    throw new Error(`Error al cargar los cafés (HTTP ${response.status}).`);
  }

  return response.json();
}
