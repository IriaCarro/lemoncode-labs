import type { Coffee } from "./core/coffees/model";

export async function getCoffees(signal: AbortSignal): Promise<Coffee[]> {
  const response = await fetch("/coffees.json", { signal });

  if (!response.ok) {
    throw new Error(`Error al cargar los cafés (HTTP ${response.status}).`);
  }

  return response.json();
}

export async function getCoffee(
  id: string,
  signal: AbortSignal,
): Promise<Coffee | undefined> {
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId < 1) {
    return undefined;
  }

  const coffees = await getCoffees(signal);
  return coffees.find((coffee) => coffee.id === numericId);
}
