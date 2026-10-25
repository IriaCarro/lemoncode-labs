import { useState } from "react";
import { ErrorMessage } from "../../common/components/error-message";
import { LoadingMessage } from "../../common/components/loading-message";
import { saveCoffee } from "../../core/coffees/api";
import { useCoffee } from "../../core/coffees/hooks";
import { toCoffeeInput } from "../../core/coffees/model";
import type { Coffee, CoffeeInput } from "../../core/coffees/model";
import { CoffeeFormComponent } from "./coffee-form.component";

interface EdicionContainerProps {
  /**
   * El café que se edita, tal como viene en la URL. Sin él se da de alta uno
   * nuevo: es el mismo contenedor y el mismo formulario para los dos casos.
   */
  coffeeId?: string;
  /**
   * Adónde ir después de guardar. El pod no lo sabe ni tiene que saberlo: lo
   * decide la escena, que es quien conoce las rutas.
   */
  onSaved: (coffee: Coffee) => void | Promise<void>;
}

const emptyCoffee: CoffeeInput = {
  name: "",
  origin: "",
  roast: "light",
  price: 0,
  notes: "",
};

export function EdicionContainer({ coffeeId, onSaved }: EdicionContainerProps) {
  const { coffee, loading, error: loadError } = useCoffee(coffeeId);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function handleSave(input: CoffeeInput) {
    setSaving(true);
    setSaveError(null);

    try {
      // Con café cargado se edita y se conserva su id; sin él, se da de alta.
      await onSaved(await saveCoffee(input, coffee?.id));
    } catch (cause) {
      setSaveError(
        cause instanceof Error ? cause.message : "No se pudo guardar el café.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <LoadingMessage>Cargando café…</LoadingMessage>;
  }

  if (loadError) {
    return <ErrorMessage>{loadError}</ErrorMessage>;
  }

  if (coffeeId !== undefined && coffee === undefined) {
    return <ErrorMessage>Café no encontrado</ErrorMessage>;
  }

  return (
    <CoffeeFormComponent
      error={saveError}
      initialValues={coffee ? toCoffeeInput(coffee) : emptyCoffee}
      onSave={handleSave}
      saving={saving}
    />
  );
}
