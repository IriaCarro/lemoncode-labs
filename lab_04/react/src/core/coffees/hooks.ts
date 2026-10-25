import { useEffect, useState } from "react";
import { getCoffee, getCoffees } from "../../api";
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

export function useCoffee(id: string): CoffeeState {
  const [coffee, setCoffee] = useState<Coffee>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCoffee() {
      setLoading(true);
      setError(null);
      setCoffee(undefined);

      try {
        setCoffee(await getCoffee(id, controller.signal));
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
