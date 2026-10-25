import { useEffect, useState } from "react";
import { getCoffee, getCoffees } from "./api";
import type { Coffee } from "./model";

interface CoffeesState {
  coffees: Coffee[];
  loading: boolean;
  error: string | null;
}

export function useCoffees(): CoffeesState {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCoffees() {
      try {
        setCoffees(await getCoffees(controller.signal));
      } catch (cause) {
        if (!controller.signal.aborted) {
          setError(
            cause instanceof Error
              ? cause.message
              : "No se pudieron cargar los cafés.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadCoffees();
    return () => controller.abort();
  }, []);

  return { coffees, loading, error };
}

interface CoffeeState {
  coffee: Coffee | undefined;
  loading: boolean;
  error: string | null;
}

/**
 * El café de `id`. **Sin `id` no pide nada**: es lo que necesita el alta, que
 * comparte contenedor con la edición y no tiene ningún café que cargar.
 */
export function useCoffee(id?: string): CoffeeState {
  const [coffee, setCoffee] = useState<Coffee>();
  const [loading, setLoading] = useState(id !== undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === undefined) {
      setCoffee(undefined);
      setError(null);
      setLoading(false);
      return;
    }

    // En una constante porque `id` es un parámetro: TypeScript no conserva el
    // descarte del `undefined` dentro de la función de dentro.
    const coffeeId = id;
    const controller = new AbortController();

    async function loadCoffee() {
      setLoading(true);
      setError(null);
      setCoffee(undefined);

      try {
        setCoffee(await getCoffee(coffeeId, controller.signal));
      } catch (cause) {
        if (!controller.signal.aborted) {
          setError(
            cause instanceof Error
              ? cause.message
              : "No se pudo cargar el café.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadCoffee();
    return () => controller.abort();
  }, [id]);

  return { coffee, loading, error };
}
