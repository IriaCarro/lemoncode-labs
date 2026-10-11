import { describe, expect, expectTypeOf, it } from "vitest";
import { coffees, customers } from "../src/data";
import { finalPrice, getCity, getGrind, wantsNewsletter } from "../src/o04-opcionales";
import type { Customer, Grind } from "../src/types";

const [lucia, marcos, ana] = customers;

describe("getCity", () => {
    it("devuelve la ciudad si hay dirección", () => {
        expect(getCity(lucia)).toBe("Málaga");
    });

    it("devuelve Sin dirección si no la hay", () => {
        expect(getCity(marcos)).toBe("Sin dirección");
    });
});

describe("getGrind", () => {
    it("devuelve la molienda elegida", () => {
        expect(getGrind(lucia)).toBe("molido");
    });

    it("devuelve grano si no hay preferencia", () => {
        expect(getGrind(marcos)).toBe("grano");
        expect(getGrind(ana)).toBe("grano");
    });

    it("siempre devuelve un Grind, nunca undefined", () => {
        expectTypeOf(getGrind).returns.toEqualTypeOf<Grind>();
    });
});

describe("wantsNewsletter", () => {
    it("respeta un false explícito", () => {
        expect(wantsNewsletter(lucia)).toBe(false);
    });

    it("devuelve true si no hay preferencia", () => {
        expect(wantsNewsletter(marcos)).toBe(true);
        expect(wantsNewsletter(ana)).toBe(true);
    });

    it("respeta un true explícito", () => {
        const customer: Customer = { ...ana, preferences: { newsletter: true } };
        expect(wantsNewsletter(customer)).toBe(true);
    });
});

describe("finalPrice", () => {
    it("aplica el descuento", () => {
        expect(finalPrice(coffees[0])).toBeCloseTo(13.41);
        expect(finalPrice(coffees[4])).toBeCloseTo(11.22);
    });

    it("devuelve el precio tal cual sin descuento", () => {
        expect(finalPrice(coffees[1])).toBe(12.9);
    });

    it("devuelve el precio tal cual con descuento 0", () => {
        expect(finalPrice(coffees[2])).toBe(15.5);
    });
});
