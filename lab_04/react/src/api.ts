import type { Coffee } from "./core/coffees/model";
import { savedCoffeesSchema } from "./coffee.schema";

const savedCoffeesKey = "coffee-catalog";

function readSavedCoffees(): Coffee[] {
  const storedCoffees = localStorage.getItem(savedCoffeesKey);

  if (storedCoffees === null) {
    return [];
  }

  let parsedCoffees: unknown;
  try {
    parsedCoffees = JSON.parse(storedCoffees);
  } catch {
    throw new Error("Los cafés guardados no tienen un formato JSON válido.");
  }

  const result = savedCoffeesSchema.safeParse(parsedCoffees);
  if (!result.success) {
    throw new Error("Los cafés guardados no tienen un formato válido.");
  }

  return result.data;
}

export async function getCoffees(signal: AbortSignal): Promise<Coffee[]> {
  const response = await fetch("/coffees.json", { signal });

  if (!response.ok) {
    throw new Error(`Error al cargar los cafés (HTTP ${response.status}).`);
  }

  const initialCoffees: Coffee[] = await response.json();
  return [...initialCoffees, ...readSavedCoffees()];
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

export async function saveCoffee(input: Omit<Coffee, "id">): Promise<Coffee> {
  const coffees = await getCoffees(new AbortController().signal);
  const coffee: Coffee = {
    ...input,
    id: Math.max(0, ...coffees.map((existingCoffee) => existingCoffee.id)) + 1,
  };

  localStorage.setItem(
    savedCoffeesKey,
    JSON.stringify([...readSavedCoffees(), coffee]),
  );

  return coffee;
}
