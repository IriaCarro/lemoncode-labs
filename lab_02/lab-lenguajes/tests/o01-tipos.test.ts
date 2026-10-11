import { describe, expect, expectTypeOf, it } from "vitest";
import { coffees, customers } from "../src/data";
import type { Address, Coffee, Customer, Grind, Roast } from "../src/types";

// Estos tests los comprueba `npx tsc`: si un tipo cambia, deja de compilar

describe("tipos del catálogo", () => {
    it("Roast sólo admite los tres tuestes", () => {
        expectTypeOf<Roast>().toEqualTypeOf<"light" | "medium" | "dark">();
    });

    it("Grind sólo admite grano o molido", () => {
        expectTypeOf<Grind>().toEqualTypeOf<"grano" | "molido">();
    });

    it("discount es opcional", () => {
        expectTypeOf<Coffee["discount"]>().toEqualTypeOf<number | undefined>();
    });

    it("address y preferences son opcionales", () => {
        expectTypeOf<Customer["address"]>().toEqualTypeOf<Address | undefined>();
        expectTypeOf<Customer["preferences"]>().toEqualTypeOf<
            { grind?: Grind; newsletter?: boolean } | undefined
        >();
    });

    it("un café sin precio no es un Coffee", () => {
        const { price, ...withoutPrice } = coffees[0];
        expect(price).toBe(14.9);
        expectTypeOf(withoutPrice).not.toExtend<Coffee>();
    });

    it("un tueste que no existe no es un Roast", () => {
        expectTypeOf({ ...coffees[0], roast: "extra" as const }).not.toExtend<Coffee>();
    });

    it("id es de sólo lectura (sólo lo impide TypeScript, no JavaScript)", () => {
        const coffee: Coffee = { ...coffees[0] };
        const customer: Customer = { ...customers[0] };
        // @ts-expect-error id es readonly
        coffee.id = 99;
        // @ts-expect-error id es readonly
        customer.id = 99;
        expect(coffee.id).toBe(99);
    });
});
