import { useEffect, useState } from "react";
import { CoffeeCard } from "./coffee-card";
import type { Coffee } from "./model";

export default function App() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Coffee[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadCoffees() {
      try {
        const response = await fetch("/coffees.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Error al cargar los cafés (HTTP ${response.status}).`);
        }

        const data: Coffee[] = await response.json();
        setCoffees(data);
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

  const normalizedSearch = search.trim().toLocaleLowerCase("es");
  const filteredCoffees = coffees.filter((coffee) => {
    return coffee.name.toLocaleLowerCase("es")
    .includes(normalizedSearch);
  });

  const cartTotal = cart.reduce(
    (total, coffee) => total + coffee.price,
    0,
  );

  function addToCart(coffee: Coffee) {
    setCart((previousCart) => {
      return [...previousCart, coffee]
    });
  }

  return (
    <main>
      <h1>Catálogo de café</h1>
      {loading && <p role="status">Cargando cafés…</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && <p>{coffees.length} cafés este mes</p>}
      <section aria-label="Carrito" className="space-y-3 rounded-lg bg-white p-4">
        <p>
          {cart.length} {cart.length === 1 ? "bolsa" : "bolsas"} · total{" "}
          {cartTotal.toFixed(2)} €
        </p>
        <button
          disabled={cart.length === 0}
          onClick={() => setCart([])}
          type="button"
        >
          Vaciar
        </button>
      </section>
      {!loading && !error && (
        <section aria-label="Catálogo de cafés" className="space-y-4">
          <label className="block" htmlFor="coffee-search">
            Buscar por nombre
          </label>
          <input
            className="w-full"
            id="coffee-search"
            onChange={(event) => setSearch(event.target.value)}
            type="search"
            value={search}
          />
          {filteredCoffees.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filteredCoffees.map((coffee) => (
                <CoffeeCard
                  key={coffee.id}
                  coffee={coffee}
                  onAdd={addToCart}
                />
              ))}
            </div>
          ) : (
            <p role="status">Sin resultados</p>
          )}
        </section>
      )}
    </main>
  );
}