import { useRef } from "react";
import { CoffeeCard } from "./coffee-card";
import type { Coffee } from "../../core/coffees/model";

interface CatalogoComponentProps {
  coffees: Coffee[];
  filteredCoffees: Coffee[];
  loading: boolean;
  error: string | null;
  search: string;
  cart: Coffee[];
  cartTotal: number;
  onSearchChange: (search: string) => void;
  onAddToCart: (coffee: Coffee) => void;
  onClearCart: () => void;
}

export function CatalogoComponent({
  coffees,
  filteredCoffees,
  loading,
  error,
  search,
  cart,
  cartTotal,
  onSearchChange,
  onAddToCart,
  onClearCart,
}: CatalogoComponentProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <main>
      <div className="flex items-center gap-3">
        <h1>Catálogo de café</h1>
        <button
          disabled={loading || error !== null}
          onClick={() => searchInputRef.current?.focus()}
          type="button"
        >
          Buscar
        </button>
      </div>
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
          onClick={onClearCart}
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
            onChange={(event) => onSearchChange(event.target.value)}
            ref={searchInputRef}
            type="search"
            value={search}
          />
          {filteredCoffees.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filteredCoffees.map((coffee) => (
                <CoffeeCard
                  key={coffee.id}
                  coffee={coffee}
                  onAdd={onAddToCart}
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
