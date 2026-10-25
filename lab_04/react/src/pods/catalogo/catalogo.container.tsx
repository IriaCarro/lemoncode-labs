import { useState } from "react";
import { useCoffees } from "../../core/coffees/hooks";
import { ErrorMessage } from "../../common/components/error-message";
import { LoadingMessage } from "../../common/components/loading-message";
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

  if (loading) {
    return <LoadingMessage>Cargando cafés…</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <CatalogoComponent
      cart={cart}
      cartTotal={cartTotal}
      coffees={coffees}
      filteredCoffees={filteredCoffees}
      onAddToCart={addToCart}
      onClearCart={() => setCart([])}
      onSearchChange={setSearch}
      search={search}
    />
  );
}
