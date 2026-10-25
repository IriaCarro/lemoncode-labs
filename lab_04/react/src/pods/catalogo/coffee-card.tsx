import { Link } from "@tanstack/react-router";
import type { Coffee } from "../../core/coffees/model";

interface CoffeeCardProps {
  coffee: Coffee;
  onAdd: (coffee: Coffee) => void;
}

export function CoffeeCard({ coffee, onAdd }: CoffeeCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2>
        <Link params={{ coffeeId: String(coffee.id) }} to="/coffees/$coffeeId">
          {coffee.name}
        </Link>
      </h2>
      <p className="mt-2 text-slate-600">{coffee.origin}</p>
      <p className="mt-3 font-semibold">{coffee.price.toFixed(2)} €</p>
      <button className="mt-4" onClick={() => onAdd(coffee)} type="button">
        Añadir al carrito
      </button>
    </article>
  );
}
