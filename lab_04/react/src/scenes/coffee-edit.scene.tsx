import { useNavigate } from "@tanstack/react-router";
import { EdicionContainer } from "../pods/edicion";

interface CoffeeEditSceneProps {
  coffeeId: string;
}

export function CoffeeEditScene({ coffeeId }: CoffeeEditSceneProps) {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Editar café</h1>
      <EdicionContainer
        coffeeId={coffeeId}
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
