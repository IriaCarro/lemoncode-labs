import { createRootRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "../layouts/app-layout";

export const Route = createRootRoute({
  component: AppLayout,
  notFoundComponent: () => (
    <main>
      <h1>Página no encontrada</h1>
      <Link to="/coffees">Volver al catálogo</Link>
    </main>
  ),
});
