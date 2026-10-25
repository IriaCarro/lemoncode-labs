import type { Coffee, CoffeeInput } from "./model";
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
  const savedCoffees = readSavedCoffees();
  const savedById = new Map(savedCoffees.map((coffee) => [coffee.id, coffee]));
  const initialIds = new Set(initialCoffees.map((coffee) => coffee.id));

  return [
    ...initialCoffees.map((coffee) => savedById.get(coffee.id) ?? coffee),
    ...savedCoffees.filter((coffee) => !initialIds.has(coffee.id)),
  ];
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

export async function saveCoffee(
  input: CoffeeInput,
  id?: number,
): Promise<Coffee> {
  const coffees = await getCoffees(new AbortController().signal);
  const existingCoffee = id === undefined
    ? undefined
    : coffees.find((coffee) => coffee.id === id);

  if (id !== undefined && existingCoffee === undefined) {
    throw new Error("Café no encontrado.");
  }

  const coffee: Coffee = {
    ...input,
    id: id ?? Math.max(0, ...coffees.map((existing) => existing.id)) + 1,
  };
  const savedCoffees = readSavedCoffees();
  const updatedSavedCoffees = [
    ...savedCoffees.filter((saved) => saved.id !== coffee.id),
    coffee,
  ];

  localStorage.setItem(savedCoffeesKey, JSON.stringify(updatedSavedCoffees));
  return coffee;
}
