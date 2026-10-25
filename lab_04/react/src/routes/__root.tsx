import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: Outlet,
  notFoundComponent: () => (
    <main>
      <h1>Página no encontrada</h1>
      <Link to="/coffees">Volver al catálogo</Link>
    </main>
  ),
});
