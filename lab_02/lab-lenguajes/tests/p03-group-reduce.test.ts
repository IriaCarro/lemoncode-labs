import { describe, expect, expectTypeOf, it } from "vitest";
import { coffees } from "../src/data";
import { groupByRoast } from "../src/p03-group-reduce";
import type { Coffee, Roast } from "../src/types";
import { expectNoMutation } from "./helpers";

const names = (list: Coffee[]): string[] => list.map((coffee) => coffee.name);

describe("groupByRoast", () => {
    it("agrupa los cafés por tueste", () => {
        const grouped = groupByRoast(coffees);
        expect(names(grouped.light)).toEqual(["Etiopía Yirgacheffe", "Kenia AA"]);
        expect(names(grouped.medium)).toEqual(["Colombia Huila", "Guatemala Antigua"]);
        expect(names(grouped.dark)).toEqual(["Brasil Cerrado", "Sumatra Mandheling"]);
    });

    it("mantiene los mismos cafés, sin copiarlos", () => {
        expect(groupByRoast(coffees).light[0]).toBe(coffees[0]);
    });

    it("incluye los tres tuestes aunque alguno esté vacío", () => {
        expect(groupByRoast([coffees[0]])).toEqual({
            light: [coffees[0]],
            medium: [],
            dark: [],
        });
    });

    it("con la lista vacía devuelve los tres tuestes vacíos", () => {
        expect(groupByRoast([])).toEqual({ light: [], medium: [], dark: [] });
    });

    it("devuelve un Record con todos los tuestes", () => {
        expectTypeOf(groupByRoast).returns.toEqualTypeOf<Record<Roast, Coffee[]>>();
    });
});

describe("inmutabilidad", () => {
    it("no muta la lista", () => {
        expectNoMutation(coffees, (list) => groupByRoast(list));
    });

    it("cada llamada devuelve grupos nuevos", () => {
        const first = groupByRoast(coffees);
        const second = groupByRoast(coffees);
        expect(first).not.toBe(second);
        expect(first.light).not.toBe(second.light);
    });
});
