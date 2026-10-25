import { createFileRoute } from "@tanstack/react-router";
import { CoffeeEditScene } from "../../../scenes/coffee-edit.scene";

export const Route = createFileRoute("/coffees/$coffeeId/edit")({
  component: CoffeeEditRoute,
});

function CoffeeEditRoute() {
  const { coffeeId } = Route.useParams();
  return <CoffeeEditScene coffeeId={coffeeId} />;
}
