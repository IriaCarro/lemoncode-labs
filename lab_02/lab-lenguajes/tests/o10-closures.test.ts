import { describe, expect, expectTypeOf, it } from "vitest";
import {
    blackFriday,
    createDiscount,
    createOrderIdGenerator,
    members,
    type PriceRule,
} from "../src/o10-closures";
import { expectNoMutation } from "./helpers";

describe("createDiscount", () => {
    it("devuelve una PriceRule", () => {
        expectTypeOf(createDiscount).returns.toEqualTypeOf<PriceRule>();
        expectTypeOf(blackFriday).toEqualTypeOf<PriceRule>();
    });

    it("crea una función que aplica el descuento", () => {
        expect(createDiscount(0.5)(10)).toBe(5);
    });

    it("blackFriday descuenta un 20 %", () => {
        expect(blackFriday(10)).toBeCloseTo(8);
        expect([10, 20, 15].map(blackFriday)).toEqual([8, 16, 12]);
    });

    it("members descuenta un 10 %", () => {
        expect(members(10)).toBeCloseTo(9);
    });
});

describe("createOrderIdGenerator", () => {
    it("devuelve una función sin parámetros que devuelve texto", () => {
        expectTypeOf(createOrderIdGenerator("TUE")).toEqualTypeOf<() => string>();
    });

    // Usamos generadores nuevos: los del módulo ya se han llamado al importarlo
    it("genera ids consecutivos con el prefijo", () => {
        const next = createOrderIdGenerator("TUE");
        expect(next()).toBe("TUE-1");
        expect(next()).toBe("TUE-2");
        expect(next()).toBe("TUE-3");
    });

    it("cada generador lleva su propia cuenta", () => {
        const nextOrder = createOrderIdGenerator("TUE");
        const nextGift = createOrderIdGenerator("REGALO");
        expect(nextOrder()).toBe("TUE-1");
        expect(nextOrder()).toBe("TUE-2");
        expect(nextGift()).toBe("REGALO-1");
        expect(nextOrder()).toBe("TUE-3");
    });
});

describe("inmutabilidad", () => {
    it("aplicar un descuento con map no muta la lista de precios", () => {
        expectNoMutation([10, 20, 15], (prices) => prices.map(blackFriday));
    });

    it("el estado del generador no se ve desde fuera", () => {
        // count vive en el closure: no hay forma de leerlo ni de cambiarlo
        const next = createOrderIdGenerator("TUE");
        expect(Object.keys(next)).toEqual([]);
        expect(next()).toBe("TUE-1");
    });
});
