import { describe, expect, expectTypeOf, it } from "vitest";
import { coffees } from "../src/data";
import { coffeeCard, mainNote, sumAll, toPublicCoffee } from "../src/o03-destructuring";

describe("coffeeCard", () => {
    it("muestra nombre, origen y precio", () => {
        expect(coffeeCard(coffees[0])).toBe("Etiopía Yirgacheffe (Etiopía) · 14.90 €");
    });
});

describe("mainNote", () => {
    it("muestra la primera nota y cuántas más hay", () => {
        expect(mainNote(coffees[0])).toBe("floral y 2 más");
        expect(mainNote(coffees[1])).toBe("caramelo y 1 más");
    });
});

describe("toPublicCoffee", () => {
    it("quita el stock", () => {
        expect(toPublicCoffee(coffees[1])).not.toHaveProperty("stock");
    });

    it("mantiene el resto de propiedades", () => {
        const { stock, ...expected } = coffees[1];
        expect(stock).toBe(3);
        expect(toPublicCoffee(coffees[1])).toEqual(expected);
    });

    it("no modifica el café original", () => {
        toPublicCoffee(coffees[1]);
        expect(coffees[1].stock).toBe(3);
    });

    it("el tipo que devuelve no tiene stock", () => {
        const publicCoffee = toPublicCoffee(coffees[1]);
        expectTypeOf(publicCoffee).not.toHaveProperty("stock");
        expectTypeOf(publicCoffee).toHaveProperty("name");
    });
});

describe("sumAll", () => {
    it("suma todos los argumentos", () => {
        expect(sumAll(1, 2, 3)).toBe(6);
    });

    it("sólo acepta números", () => {
        expectTypeOf(sumAll).parameters.toEqualTypeOf<number[]>();
    });

    it("devuelve 0 sin argumentos", () => {
        expect(sumAll()).toBe(0);
    });

    it("acepta un array con spread", () => {
        expect(sumAll(...coffees.map((coffee) => coffee.stock))).toBe(48);
    });
});
