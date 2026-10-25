import { Link, Outlet } from "@tanstack/react-router";

export function AppLayout() {
  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4"
        >
          <Link className="font-semibold text-slate-900 no-underline" to="/coffees">
            Tueste
          </Link>
          <Link
            className="rounded border border-indigo-700 px-4 py-2 text-indigo-700 no-underline hover:bg-indigo-50"
            to="/coffees/new"
          >
            Añadir café
          </Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
