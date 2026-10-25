import { useState } from "react";
import { useCoffees } from "../../core/coffees/hooks";
import type { Coffee } from "../../core/coffees/model";
import { CatalogoComponent } from "./catalogo.component";

export function CatalogoContainer() {
  const { coffees, loading, error } = useCoffees();
  const [cart, setCart] = useState<Coffee[]>([]);
  const [search, setSearch] = useState("");

  const normalizedSearch = search.trim().toLocaleLowerCase("es");
  const filteredCoffees = coffees.filter((coffee) =>
    coffee.name.toLocaleLowerCase("es").includes(normalizedSearch),
  );
  const cartTotal = cart.reduce((total, coffee) => total + coffee.price, 0);

  function addToCart(coffee: Coffee) {
    setCart((previousCart) => [...previousCart, coffee]);
  }

  return (
    <CatalogoComponent
      cart={cart}
      cartTotal={cartTotal}
      coffees={coffees}
      error={error}
      filteredCoffees={filteredCoffees}
      loading={loading}
      onAddToCart={addToCart}
      onClearCart={() => setCart([])}
      onSearchChange={setSearch}
      search={search}
    />
  );
}
