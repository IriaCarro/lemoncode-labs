import { useState } from "react";
import { CoffeeCard } from "./coffee-card";
import type { Coffee } from "./model";

const coffees: Coffee[] = [
  {
    id: 1,
    name: "Etiopía Yirgacheffe",
    origin: "Etiopía",
    roast: "light",
    price: 14.9,
    notes: "Floral, bergamota y té negro.",
  },
  {
    id: 2,
    name: "Colombia Huila",
    origin: "Colombia",
    roast: "medium",
    price: 12.9,
    notes: "Caramelo y manzana roja.",
  },
  {
    id: 3,
    name: "Kenia AA",
    origin: "Kenia",
    roast: "light",
    price: 15.5,
    notes: "Frutos rojos y pomelo.",
  },
  {
    id: 4,
    name: "Costa Rica",
    origin: "Costa Rica",
    roast: "light",
    price: 15.5,
    notes: "Chocolate y naranja.",
  },
];

export default function App() {
  const [cart, setCart] = useState<Coffee[]>([]);
  const [search, setSearch] = useState("");

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
      <p>{coffees.length} cafés este mes</p>
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
    </main>
  );
}