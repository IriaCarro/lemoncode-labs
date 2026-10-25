import { Link, useNavigate } from "@tanstack/react-router";
import { CoffeeDetailContainer } from "../pods/catalogo";

interface CoffeeDetailSceneProps {
  coffeeId: string;
}

export function CoffeeDetailScene({ coffeeId }: CoffeeDetailSceneProps) {
  const navigate = useNavigate();

  return (
    <CoffeeDetailContainer
      coffeeId={coffeeId}
      onBack={() => void navigate({ to: "/coffees" })}
      editLink={
        <Link
          className="rounded bg-indigo-700 px-4 py-2 text-white no-underline hover:bg-indigo-800"
          params={{ coffeeId }}
          to="/coffees/$coffeeId/edit"
        >
          Editar café
        </Link>
      }
    />
  );
}
