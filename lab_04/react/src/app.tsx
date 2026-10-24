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
  return (
    <main>
      <h1>Catálogo de café</h1>
      <p>{coffees.length} cafés este mes</p>
      <section
        aria-label="Catálogo de cafés"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {coffees.map((coffee) => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </section>
    </main>
  );
}