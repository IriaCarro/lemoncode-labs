import { describe, expect, it } from "vitest";
import { coffees } from "../src/data";
import {
    applyDiscount,
    buildTags,
    createOrderId,
    sortByPrice,
    totalWithShipping,
} from "../src/o07-pureza";
import type { Coffee } from "../src/types";
import { deepFreeze, expectNoMutation } from "./helpers";

describe("datos de prueba", () => {
    // Lo hace tests/setup.ts: si alguna función los muta, lanza un TypeError
    it("el catálogo está congelado", () => {
        expect(Object.isFrozen(coffees)).toBe(true);
        expect(Object.isFrozen(coffees[0])).toBe(true);
        expect(Object.isFrozen(coffees[0].notes)).toBe(true);
    });

    it("mutarlo lanza un error", () => {
        const coffee: Coffee = coffees[0];
        expect(() => coffees.sort()).toThrow(TypeError);
        expect(() => coffees.push(coffee)).toThrow(TypeError);
        expect(() => (coffee.price = 0)).toThrow(TypeError);
    });
});

describe("totalWithShipping", () => {
    it("suma el envío al importe", () => {
        expect(totalWithShipping(20, 3.5)).toBe(23.5);
    });

    it("con los mismos argumentos devuelve siempre lo mismo", () => {
        expect(totalWithShipping(20, 3.5)).toBe(totalWithShipping(20, 3.5));
    });
});

describe("applyDiscount", () => {
    it("aplica el descuento al precio", () => {
        expect(applyDiscount(coffees[0], 0.1).price).toBeCloseTo(13.41);
    });

    it("devuelve un café nuevo", () => {
        expect(applyDiscount(coffees[0], 0.1)).not.toBe(coffees[0]);
    });

    it("no modifica el café original", () => {
        const coffee = { ...coffees[0] };
        applyDiscount(coffee, 0.5);
        expect(coffee.price).toBe(14.9);
    });
});

describe("sortByPrice", () => {
    it("ordena de más barato a más caro", () => {
        const prices = sortByPrice(coffees).map((coffee) => coffee.price);
        expect(prices).toEqual([10.5, 12.9, 13.2, 13.9, 14.9, 15.5]);
    });

    it("devuelve un array nuevo", () => {
        expect(sortByPrice(coffees)).not.toBe(coffees);
    });

    it("no modifica el orden del array original", () => {
        const ids = coffees.map((coffee) => coffee.id);
        sortByPrice(coffees);
        expect(coffees.map((coffee) => coffee.id)).toEqual(ids);
    });
});

describe("createOrderId", () => {
    it("empieza por ORD-", () => {
        expect(createOrderId(new Date())).toMatch(/^ORD-/);
    });

    it("con la misma fecha devuelve el mismo id", () => {
        const date = new Date("2026-10-11T10:00:00Z");
        expect(createOrderId(date)).toBe(createOrderId(new Date(date)));
    });

    it("con fechas distintas devuelve ids distintos", () => {
        const first = createOrderId(new Date("2026-10-11T10:00:00Z"));
        const second = createOrderId(new Date("2026-10-12T10:00:00Z"));
        expect(first).not.toBe(second);
    });
});

describe("buildTags", () => {
    it("convierte cada nota en un hashtag", () => {
        expect(buildTags(coffees[1])).toEqual(["#caramelo", "#manzana roja"]);
    });

    it("no modifica las notas del café", () => {
        const coffee = { ...coffees[1], notes: [...coffees[1].notes] };
        buildTags(coffee);
        expect(coffee.notes).toEqual(["caramelo", "manzana roja"]);
    });
});

describe("inmutabilidad", () => {
    it("applyDiscount no muta el café", () => {
        expectNoMutation(coffees[0], (coffee) => applyDiscount(coffee, 0.5));
    });

    it("sortByPrice no muta la lista", () => {
        expectNoMutation(coffees, (list) => sortByPrice(list));
    });

    it("buildTags no muta el café ni sus notas", () => {
        expectNoMutation(coffees[1], (coffee) => buildTags(coffee));
    });

    // Las versiones impuras de la kata no pasarían estos tests
    it("la versión impura de applyDiscount lanza un error con datos congelados", () => {
        const impureApplyDiscount = (coffee: Coffee, rate: number): Coffee => {
            coffee.price = coffee.price * (1 - rate);
            return coffee;
        };
        const frozen = deepFreeze(structuredClone(coffees[0]));
        expect(() => impureApplyDiscount(frozen, 0.5)).toThrow(TypeError);
    });

    it("la versión impura de sortByPrice lanza un error con datos congelados", () => {
        const impureSortByPrice = (list: Coffee[]): Coffee[] =>
            list.sort((a, b) => a.price - b.price);
        const frozen = deepFreeze(structuredClone(coffees));
        expect(() => impureSortByPrice(frozen)).toThrow(TypeError);
    });
});
