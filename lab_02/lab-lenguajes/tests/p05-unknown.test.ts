import { describe, expect, it } from "vitest";
import { coffees } from "../src/data";
import { isCoffee } from "../src/p05-unknown";

const coffee = coffees[0];

describe("isCoffee", () => {
    it("acepta un café completo", () => {
        expect(isCoffee(coffee)).toBe(true);
    });

    it("acepta un café sin discount, que es opcional", () => {
        expect(isCoffee(coffees[1])).toBe(true);
    });

    it("acepta un café que llega como JSON", () => {
        expect(isCoffee(JSON.parse(JSON.stringify(coffee)))).toBe(true);
    });

    it("rechaza el ejemplo de la kata, al que le faltan propiedades", () => {
        const data: unknown = JSON.parse('{"id": 8, "name": "Perú Cajamarca", "price": 13.5}');
        expect(isCoffee(data)).toBe(false);
    });

    it.each([
        ["null", null],
        ["undefined", undefined],
        ["un número", 42],
        ["un texto", "café"],
        ["un array", [coffee]],
        ["un objeto vacío", {}],
    ])("rechaza %s", (_, value) => {
        expect(isCoffee(value)).toBe(false);
    });

    it.each(["id", "name", "origin", "notes", "roast", "price", "stock"])(
        "rechaza un café sin %s",
        (key) => {
            const { [key as keyof typeof coffee]: _, ...rest } = coffee;
            expect(isCoffee(rest)).toBe(false);
        },
    );

    it.each([
        ["id como texto", { id: "1" }],
        ["name como número", { name: 1 }],
        ["notes que no es un array", { notes: "floral" }],
        ["notes con algo que no es texto", { notes: ["floral", 3] }],
        ["un tueste que no existe", { roast: "extra" }],
        ["price como texto", { price: "14.90" }],
        ["stock como null", { stock: null }],
        ["discount como texto", { discount: "10%" }],
    ])("rechaza un café con %s", (_, change) => {
        expect(isCoffee({ ...coffee, ...change })).toBe(false);
    });
});
