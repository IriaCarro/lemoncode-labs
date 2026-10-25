import { useForm } from "@tanstack/react-form";
import type { CoffeeInput } from "../../core/coffees/model";
import { coffeeInputSchema, roastSchema } from "../../core/coffees/coffee.schema";

interface CoffeeFormComponentProps {
  initialValues: CoffeeInput;
  saving: boolean;
  error: string | null;
  onSave: (input: CoffeeInput) => Promise<void>;
}

function getErrorMessage(error: unknown): string {
  if (typeof error === "string") {
    return error;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "Este valor no es válido.";
}

export function CoffeeFormComponent({
  initialValues,
  saving,
  error,
  onSave,
}: CoffeeFormComponentProps) {
  const form = useForm({
    defaultValues: initialValues,
    validators: {
      onChange: coffeeInputSchema,
    },
    onSubmitInvalid: ({ formApi }) => {
      void formApi.validateAllFields("submit");
    },
    onSubmit: async ({ value }) => {
      await onSave(coffeeInputSchema.parse(value));
    },
  });

  function renderErrors(errors: unknown[]) {
    return errors.map((validationError, index) => (
      <p className="text-sm text-red-700" key={index} role="alert">
        {getErrorMessage(validationError)}
      </p>
    ));
  }

  return (
    <form
      className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      {error && <p role="alert">{error}</p>}
      <form.Field name="name" validators={{ onSubmit: coffeeInputSchema.shape.name }}>
        {(field) => (
          <div className="space-y-1">
            <label className="block font-medium" htmlFor={field.name}>Nombre</label>
            <input
              aria-invalid={field.state.meta.errors.length > 0}
              className="w-full"
              id={field.name}
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              value={field.state.value}
            />
            {renderErrors(field.state.meta.errors)}
          </div>
        )}
      </form.Field>
      <form.Field name="origin" validators={{ onSubmit: coffeeInputSchema.shape.origin }}>
        {(field) => (
          <div className="space-y-1">
            <label className="block font-medium" htmlFor={field.name}>Origen</label>
            <input
              aria-invalid={field.state.meta.errors.length > 0}
              className="w-full"
              id={field.name}
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              value={field.state.value}
            />
            {renderErrors(field.state.meta.errors)}
          </div>
        )}
      </form.Field>
      <form.Field name="roast" validators={{ onSubmit: roastSchema }}>
        {(field) => (
          <div className="space-y-1">
            <label className="block font-medium" htmlFor={field.name}>Tueste</label>
            <select
              aria-invalid={field.state.meta.errors.length > 0}
              className="w-full rounded border border-slate-400 bg-white p-2"
              id={field.name}
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(roastSchema.parse(event.target.value))}
              value={field.state.value}
            >
              <option value="light">Claro</option>
              <option value="medium">Medio</option>
              <option value="dark">Oscuro</option>
            </select>
            {renderErrors(field.state.meta.errors)}
          </div>
        )}
      </form.Field>
      <form.Field name="price" validators={{ onSubmit: coffeeInputSchema.shape.price }}>
        {(field) => (
          <div className="space-y-1">
            <label className="block font-medium" htmlFor={field.name}>Precio (€)</label>
            <input
              aria-invalid={field.state.meta.errors.length > 0}
              className="w-full"
              id={field.name}
              min="0.01"
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.valueAsNumber)}
              step="0.01"
              type="number"
              value={field.state.value || ""}
            />
            {renderErrors(field.state.meta.errors)}
          </div>
        )}
      </form.Field>
      <form.Field name="notes" validators={{ onSubmit: coffeeInputSchema.shape.notes }}>
        {(field) => (
          <div className="space-y-1">
            <label className="block font-medium" htmlFor={field.name}>Notas de cata</label>
            <textarea
              aria-invalid={field.state.meta.errors.length > 0}
              className="w-full rounded border border-slate-400 bg-white p-2"
              id={field.name}
              maxLength={120}
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              rows={3}
              value={field.state.value}
            />
            {renderErrors(field.state.meta.errors)}
          </div>
        )}
      </form.Field>
      <form.Subscribe selector={(state) => [state.isSubmitting] as const}>
        {([isSubmitting]) => (
          <button disabled={saving || isSubmitting} type="submit">
            {saving || isSubmitting ? "Guardando…" : "Guardar café"}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
