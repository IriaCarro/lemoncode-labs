import { useState } from "react";
import { coffees, type Coffee } from "./data";
import coffeePhoto from "./assets/initial-2.webp";
import { env } from "./env.constants";

export const App = () => {
  const [cart, setCart] = useState<Coffee[]>([]);

  return (
    <main>
      <h2>{env.shopName}</h2>
      {env.showOffers && <p>Envío gratis este mes</p>}
      <img src={coffeePhoto} alt="" />
      <ul>
        {coffees.map((coffee) => (
          <li key={coffee.id}>
            <h3>{coffee.name}</h3>
            <p>{coffee.price.toFixed(2)} €</p>
            <button onClick={() => setCart((prev) => [...prev, coffee])}>
              Añadir
            </button>
          </li>
        ))}
      </ul>
      <p>Bolsas en el carrito: {cart.length}</p>
      <small>API: {env.apiBase}</small>
    </main>
  );
};