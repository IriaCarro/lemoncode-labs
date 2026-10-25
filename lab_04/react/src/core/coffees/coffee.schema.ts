import { z } from "zod";

export const roastSchema = z.enum(["light", "medium", "dark"]);

export const coffeeInputSchema = z.object({
  name: z.string().trim().min(2, "Escribe al menos dos caracteres."),
  origin: z.string().trim().min(2, "Escribe al menos dos caracteres."),
  roast: roastSchema,
  price: z.number().positive("El precio debe ser mayor que cero."),
  notes: z.string().max(120, "Las notas no pueden superar 120 caracteres."),
});

export const savedCoffeeSchema = coffeeInputSchema.extend({
  id: z.number().int().positive(),
});

export const savedCoffeesSchema = z.array(savedCoffeeSchema);
