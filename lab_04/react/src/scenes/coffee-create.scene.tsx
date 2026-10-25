import { useNavigate } from "@tanstack/react-router";
import { EdicionContainer } from "../pods/edicion";

export function CoffeeCreateScene() {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Añadir café</h1>
      <EdicionContainer
        onSaved={(coffee) =>
          navigate({
            to: "/coffees/$coffeeId",
            params: { coffeeId: String(coffee.id) },
          })
        }
      />
    </main>
  );
}
