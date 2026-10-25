import { createFileRoute } from "@tanstack/react-router";
import { CatalogoContainer } from "../../pods/catalogo";

export const Route = createFileRoute("/coffees/")({
  component: CatalogoContainer,
});
