import { useEffect, useState } from "react";
import { getCoffees } from "./api";
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
