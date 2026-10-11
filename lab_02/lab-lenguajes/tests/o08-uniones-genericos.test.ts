import { describe, expect, expectTypeOf, it } from "vitest";
import { coffees, customers } from "../src/data";
import {
    findById,
    normalizeId,
    statusLabel,
    statusMessage,
    type OrderStatus,
} from "../src/o08-uniones-genericos";
import type { Coffee, Customer } from "../src/types";
import { expectNoMutation } from "./helpers";

describe("statusLabel", () => {
    it("tiene una etiqueta para cada estado", () => {
        expect(Object.keys(statusLabel)).toEqual(["pending", "roasting", "shipped", "delivered"]);
    });

    it("es un Record con todos los estados como clave", () => {
        expectTypeOf(statusLabel).toEqualTypeOf<Record<OrderStatus, string>>();
    });
});

describe("statusMessage", () => {
    it("muestra el estado traducido", () => {
        expect(statusMessage("roasting")).toBe("Tu pedido está: Tostando");
        expect(statusMessage("delivered")).toBe("Tu pedido está: Entregado");
    });

    it("un estado que no existe no compila", () => {
        // @ts-expect-error "lost" no es un OrderStatus
        expect(statusMessage("lost")).toBe("Tu pedido está: undefined");
    });
});

describe("normalizeId", () => {
    it("convierte un texto en número", () => {
        expect(normalizeId("4")).toBe(4);
    });

    it("deja un número tal cual", () => {
        expect(normalizeId(4)).toBe(4);
    });
});

describe("findById", () => {
    it("encuentra un café", () => {
        expect(findById(coffees, 4)?.name).toBe("Brasil Cerrado");
    });

    it("encuentra un cliente", () => {
        expect(findById(customers, 3)?.email).toBe("ana@mail.com");
    });

    it("devuelve null si no existe", () => {
        expect(findById(coffees, 99)).toBeNull();
    });

    it("devuelve el tipo de la lista que recibe", () => {
        expectTypeOf(findById(coffees, 4)).toEqualTypeOf<Coffee | null>();
        expectTypeOf(findById(customers, 3)).toEqualTypeOf<Customer | null>();
    });

    it("sólo acepta listas de objetos con id numérico", () => {
        // @ts-expect-error a los elementos les falta id
        expect(findById([{ name: "Sin id" }], 1)).toBeNull();
    });
});

describe("inmutabilidad", () => {
    it("findById no muta la lista", () => {
        expectNoMutation(coffees, (list) => findById(list, 4));
        expectNoMutation(customers, (list) => findById(list, 3));
    });

    it("statusMessage no muta statusLabel", () => {
        expectNoMutation(statusLabel, () => statusMessage("shipped"));
    });
});
