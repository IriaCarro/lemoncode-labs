export type Roast = "light" | "medium" | "dark";

export interface Coffee {
  id: number;
  name: string;
  origin: string;
  roast: Roast;
  price: number;
  notes: string;
}

export type CoffeeInput = Omit<Coffee, "id">;

/** Los campos que el formulario edita: un café sin su id, que no se toca. */
export function toCoffeeInput({ id, ...input }: Coffee): CoffeeInput {
  return input;
}
