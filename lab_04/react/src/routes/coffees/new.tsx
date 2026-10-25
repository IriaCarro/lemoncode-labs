import { createFileRoute } from "@tanstack/react-router";
import { CoffeeCreateScene } from "../../scenes/coffee-create.scene";

export const Route = createFileRoute("/coffees/new")({
  component: CoffeeCreateScene,
});
