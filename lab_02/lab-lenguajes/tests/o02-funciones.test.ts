import { describe, expect, expectTypeOf, it } from "vitest";
import { formatPrice, roastLabel, stockStatus } from "../src/o02-funciones";
import type { Roast } from "../src/types";

describe("formatPrice", () => {
    it("formatea con dos decimales y euros por defecto", () => {
        expect(formatPrice(14.9)).toBe("14.90 €");
    });

    it("acepta otra moneda", () => {
        expect(formatPrice(10, "$")).toBe("10.00 $");
    });
});

describe("stockStatus", () => {
    it("devuelve Agotado con stock 0", () => {
        expect(stockStatus(0)).toBe("Agotado");
    });

    it("devuelve Últimas unidades con menos de 5", () => {
        expect(stockStatus(1)).toBe("Últimas unidades");
        expect(stockStatus(4)).toBe("Últimas unidades");
    });

    it("devuelve Disponible con 5 o más", () => {
        expect(stockStatus(5)).toBe("Disponible");
        expect(stockStatus(25)).toBe("Disponible");
    });
});

describe("roastLabel", () => {
    it("traduce cada tueste", () => {
        expect(roastLabel("light")).toBe("Tueste claro");
        expect(roastLabel("medium")).toBe("Tueste medio");
        expect(roastLabel("dark")).toBe("Tueste oscuro");
    });

    it("sólo acepta un Roast", () => {
        expectTypeOf(roastLabel).parameter(0).toEqualTypeOf<Roast>();
    });

    it("un tueste que no existe no compila y, si se cuela, lanza un error", () => {
        // @ts-expect-error "extra" no es un Roast
        expect(() => roastLabel("extra")).toThrow("Roast type not recognized: extra");
    });
});
