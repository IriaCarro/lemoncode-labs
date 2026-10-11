import { describe, expect, it } from "vitest";
import { coffees } from "../src/data";
import {
    availableCoffees,
    catalogLabels,
    coffeeById,
    hasNotes,
    stockValue,
} from "../src/o05-arrays";

describe("availableCoffees", () => {
    it("devuelve sólo los cafés con stock", () => {
        const names = availableCoffees(coffees).map((coffee) => coffee.name);
        expect(names).toEqual([
            "Etiopía Yirgacheffe",
            "Colombia Huila",
            "Brasil Cerrado",
            "Guatemala Antigua",
        ]);
    });

    it("no modifica la lista original", () => {
        availableCoffees(coffees);
        expect(coffees).toHaveLength(6);
    });
});

describe("catalogLabels", () => {
    it("devuelve las tarjetas de los disponibles ordenadas por precio", () => {
        expect(catalogLabels(coffees)).toEqual([
            "Brasil Cerrado (Brasil) · 10.50 €",
            "Colombia Huila (Colombia) · 12.90 €",
            "Guatemala Antigua (Guatemala) · 13.20 €",
            "Etiopía Yirgacheffe (Etiopía) · 14.90 €",
        ]);
    });

    it("no cambia el orden de la lista original", () => {
        const ids = coffees.map((coffee) => coffee.id);
        catalogLabels(coffees);
        expect(coffees.map((coffee) => coffee.id)).toEqual(ids);
    });
});

describe("stockValue", () => {
    it("suma stock por precio de todo el almacén", () => {
        expect(stockValue(coffees)).toBeCloseTo(585.6);
    });

    it("devuelve 0 con la lista vacía", () => {
        expect(stockValue([])).toBe(0);
    });
});

describe("coffeeById", () => {
    it("encuentra el café por id", () => {
        expect(coffeeById(4)?.name).toBe("Brasil Cerrado");
    });

    it("devuelve undefined si no existe", () => {
        expect(coffeeById(99)).toBeUndefined();
    });
});

describe("hasNotes", () => {
    it("devuelve true si el café tiene notas", () => {
        expect(hasNotes(coffees[0])).toBe(true);
    });

    it("devuelve false si la lista de notas está vacía", () => {
        expect(hasNotes({ ...coffees[0], notes: [] })).toBe(false);
    });
});
