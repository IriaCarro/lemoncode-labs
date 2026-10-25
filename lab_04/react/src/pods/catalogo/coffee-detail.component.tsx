import type { ReactNode } from "react";
import type { Coffee } from "../../core/coffees/model";

interface CoffeeDetailComponentProps {
  coffee: Coffee;
  onBack: () => void;
  editLink: ReactNode;
}

export function CoffeeDetailComponent({
  coffee,
  onBack,
  editLink,
}: CoffeeDetailComponentProps) {
  return (
    <main>
      <div className="flex flex-wrap gap-3">
        <button onClick={onBack} type="button">
          ← Volver al catálogo
        </button>
        {editLink}
      </div>
      <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h1>{coffee.name}</h1>
        <dl className="mt-4 space-y-2">
          <div>
            <dt className="font-semibold">Origen</dt>
            <dd>{coffee.origin}</dd>
          </div>
          <div>
            <dt className="font-semibold">Tueste</dt>
            <dd>{coffee.roast}</dd>
          </div>
          <div>
            <dt className="font-semibold">Precio</dt>
            <dd>{coffee.price.toFixed(2)} €</dd>
          </div>
          <div>
            <dt className="font-semibold">Notas de cata</dt>
            <dd>{coffee.notes}</dd>
          </div>
        </dl>
      </article>
    </main>
  );
}
