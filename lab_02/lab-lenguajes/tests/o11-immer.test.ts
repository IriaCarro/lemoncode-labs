import { produce } from "immer";
import { describe, expect, it } from "vitest";
import { movedImmer, movedSpread, subscription, upgraded } from "../src/o11-immer";
import { expectNoMutation } from "./helpers";

describe("mudanza a Sevilla", () => {
    it("spread e Immer dan el mismo resultado", () => {
        expect(movedSpread.customer.address.city).toBe("Sevilla");
        expect(movedImmer).toEqual(movedSpread);
    });

    it("no modifica la suscripción original", () => {
        expect(subscription.customer.address.city).toBe("Málaga");
    });

    it("crea un customer nuevo y reutiliza lo que no cambia", () => {
        expect(movedImmer.customer).not.toBe(subscription.customer);
        expect(movedImmer.plan).toBe(subscription.plan);
        expect(movedImmer.deliveries).toBe(subscription.deliveries);
    });
});

describe("cambio a plan Pro", () => {
    it("cambia el plan y añade la entrega", () => {
        expect(upgraded.plan).toEqual({ name: "Pro", bagsPerMonth: 3 });
        expect(upgraded.deliveries).toEqual(["2026-09-05", "2026-10-05", "2026-11-05"]);
    });

    it("no modifica la suscripción original", () => {
        expect(subscription.plan).toEqual({ name: "Popular", bagsPerMonth: 2 });
        expect(subscription.deliveries).toEqual(["2026-09-05", "2026-10-05"]);
    });

    it("reutiliza el customer, que no cambia", () => {
        expect(upgraded.customer).toBe(subscription.customer);
    });

    it("congela el resultado", () => {
        expect(Object.isFrozen(upgraded.plan)).toBe(true);
    });
});

describe("produce sin cambios", () => {
    it("devuelve el mismo objeto", () => {
        expect(produce(subscription, () => {})).toBe(subscription);
    });
});

describe("inmutabilidad", () => {
    it("lo que devuelve Immer está congelado a fondo", () => {
        expect(() => upgraded.deliveries.push("2026-12-05")).toThrow(TypeError);
        expect(() => (upgraded.plan.bagsPerMonth = 10)).toThrow(TypeError);
        expect(() => (movedImmer.customer.address.city = "Cádiz")).toThrow(TypeError);
    });

    it("lo que devuelve spread no está congelado", () => {
        expect(Object.isFrozen(movedSpread)).toBe(false);
    });

    it("spread comparte con el original lo que no copia", () => {
        // Mutar movedSpread.plan mutaría también subscription.plan
        expect(movedSpread.plan).toBe(subscription.plan);
        expect(movedSpread.deliveries).toBe(subscription.deliveries);
    });

    it("produce funciona con una base congelada sin mutarla", () => {
        expectNoMutation(subscription, (frozen) =>
            produce(frozen, (draft) => {
                draft.customer.address.city = "Sevilla";
                draft.deliveries.push("2026-11-05");
            }),
        );
    });
});
