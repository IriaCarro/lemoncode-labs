import type { ReactNode } from "react";
import { ErrorMessage } from "../../common/components/error-message";
import { LoadingMessage } from "../../common/components/loading-message";
import { useCoffee } from "../../core/coffees/hooks";
import { CoffeeDetailComponent } from "./coffee-detail.component";

interface CoffeeDetailContainerProps {
  coffeeId: string;
  onBack: () => void;
  editLink: ReactNode;
}

export function CoffeeDetailContainer({
  coffeeId,
  onBack,
  editLink,
}: CoffeeDetailContainerProps) {
  const { coffee, loading, error } = useCoffee(coffeeId);

  if (loading) {
    return <LoadingMessage>Cargando café…</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!coffee) {
    return <ErrorMessage>Café no encontrado</ErrorMessage>;
  }

  return (
    <CoffeeDetailComponent
      coffee={coffee}
      onBack={onBack}
      editLink={editLink}
    />
  );
}
