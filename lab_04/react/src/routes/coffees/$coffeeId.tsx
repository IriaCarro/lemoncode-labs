import { createFileRoute, Link } from "@tanstack/react-router";
import { useCoffee } from "../../core/coffees/hooks";

export const Route = createFileRoute("/coffees/$coffeeId")({
  component: CoffeeDetailPage,
});

function CoffeeDetailPage() {
  const { coffeeId } = Route.useParams();
  const { coffee, loading, error } = useCoffee(coffeeId);

  return (
    <main>
      <Link to="/coffees">← Volver al catálogo</Link>
      {loading && <p role="status">Cargando café…</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && !coffee && (
        <p role="alert">Café no encontrado</p>
      )}
      {coffee && !error && (
        <article className="mt-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
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
      )}
    </main>
  );
}
