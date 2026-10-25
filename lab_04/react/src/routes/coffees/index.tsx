import { createFileRoute } from "@tanstack/react-router";
import { CatalogoScene } from "../../scenes/catalogo.scene";

export const Route = createFileRoute("/coffees/")({
  component: CatalogoScene,
});
