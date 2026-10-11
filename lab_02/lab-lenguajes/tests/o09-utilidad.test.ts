import { describe, expect, expectTypeOf, it } from "vitest";
import { coffees } from "../src/data";
import {
    countByRoast,
    createCoffee,
    toPreview,
    updateCoffee,
    type CoffeePreview,
    type NewCoffee,
} from "../src/o09-utilidad";
import type { Roast } from "../src/types";
import { expectNoMutation } from "./helpers";

describe("tipos de utilidad", () => {
    it("CoffeePreview sólo tiene id, name y price", () => {
        expectTypeOf<keyof CoffeePreview>().toEqualTypeOf<"id" | "name" | "price">();
    });

    it("NewCoffee no tiene id", () => {
        expectTypeOf<NewCoffee>().not.toHaveProperty("id");
        expectTypeOf<NewCoffee>().toHaveProperty("name");
    });

    it("countByRoast devuelve un Record con todos los tuestes", () => {
        expectTypeOf(countByRoast).returns.toEqualTypeOf<Record<Roast, number>>();
    });
});

describe("toPreview", () => {
    it("se queda sólo con id, nombre y precio", () => {
        expect(toPreview(coffees[0])).toEqual({
            id: 1,
            name: "Etiopía Yirgacheffe",
            price: 14.9,
        });
    });
});

describe("createCoffee", () => {
    const data = {
        name: "Ruanda Nyamasheke",
        origin: "Ruanda",
        notes: ["melocotón", "té verde"],
        roast: "light" as const,
        price: 16.4,
        stock: 10,
    };

    it("le asigna el siguiente id", () => {
        expect(createCoffee(data, coffees)).toEqual({ ...data, id: 7 });
    });

    it("empieza en 1 con la lista vacía", () => {
        expect(createCoffee(data, []).id).toBe(1);
    });

    it("no añade el café a la lista", () => {
        createCoffee(data, coffees);
        expect(coffees).toHaveLength(6);
    });
});

describe("updateCoffee", () => {
    it("aplica los cambios", () => {
        const cheaper = updateCoffee(coffees[1], { price: 11.9, stock: 10 });
        expect(cheaper.price).toBe(11.9);
        expect(cheaper.stock).toBe(10);
        expect(cheaper.name).toBe("Colombia Huila");
    });

    it("no modifica el café original", () => {
        updateCoffee(coffees[1], { price: 11.9, stock: 10 });
        expect(coffees[1].price).toBe(12.9);
        expect(coffees[1].stock).toBe(3);
    });

    it("no deja cambiar el id", () => {
        // @ts-expect-error id no está en Partial<NewCoffee>
        expect(updateCoffee(coffees[1], { id: 99 }).id).toBe(99);
    });
});

describe("countByRoast", () => {
    it("cuenta los cafés de cada tueste", () => {
        expect(countByRoast(coffees)).toEqual({ light: 2, medium: 2, dark: 2 });
    });
});

describe("inmutabilidad", () => {
    const { id, ...newCoffee } = coffees[0];

    it("toPreview no muta el café", () => {
        expectNoMutation(coffees[0], (coffee) => toPreview(coffee));
    });

    it("createCoffee no muta los datos ni la lista", () => {
        expect(id).toBe(1);
        expectNoMutation(newCoffee, (data) => createCoffee(data, coffees));
        expectNoMutation(coffees, (list) => createCoffee(newCoffee, list));
    });

    it("createCoffee no comparte las notas con los datos de entrada", () => {
        const created = createCoffee(newCoffee, coffees);
        // Spread es una copia superficial: el array de notas es el mismo
        expect(created.notes).toBe(newCoffee.notes);
    });

    it("updateCoffee no muta el café ni los cambios", () => {
        expectNoMutation(coffees[1], (coffee) => updateCoffee(coffee, { price: 11.9 }));
        expectNoMutation({ price: 11.9, stock: 10 }, (changes) =>
            updateCoffee(coffees[1], changes),
        );
    });

    it("countByRoast no muta la lista", () => {
        expectNoMutation(coffees, (list) => countByRoast(list));
    });
});
