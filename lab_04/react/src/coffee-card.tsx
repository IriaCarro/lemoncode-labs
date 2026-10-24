import type { Coffee } from "./model";

interface CoffeeCardProps {
  coffee: Coffee;
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2>{coffee.name}</h2>
      <p className="mt-2 text-slate-600">{coffee.origin}</p>
      <p className="mt-3 font-semibold">{coffee.price.toFixed(2)} €</p>
    </article>
  );
}