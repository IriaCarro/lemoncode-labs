import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { saveCoffee } from "../../api";
import { CoffeeForm } from "../../pods/edicion";

export const Route = createFileRoute("/coffees/new")({
  component: NewCoffeePage,
});

function NewCoffeePage() {
  const navigate = useNavigate();

  async function handleSave(coffee: Parameters<typeof saveCoffee>[0]) {
    const savedCoffee = await saveCoffee(coffee);
    await navigate({
      to: "/coffees/$coffeeId",
      params: { coffeeId: String(savedCoffee.id) },
    });
  }

  return (
    <main>
      <Link to="/coffees">← Volver al catálogo</Link>
      <h1>Añadir café</h1>
      <CoffeeForm onSave={handleSave} />
    </main>
  );
}
