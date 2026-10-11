import { describe, expect, it } from "vitest";
import { createCartHistory } from "../src/p02-deshacer-carrito";
import type { Cart } from "../src/o06-carrito";
import { deepFreeze } from "./helpers";

describe("createCartHistory", () => {
    it("empieza con el carrito vacío", () => {
        expect(createCartHistory().current()).toEqual([]);
    });

    it("empieza con el carrito que recibe", () => {
        const cart: Cart = [{ coffeeId: 1, quantity: 2 }];
        expect(createCartHistory(cart).current()).toBe(cart);
    });

    it("añade y quita cafés", () => {
        const history = createCartHistory();
        history.add(1);
        history.add(1);
        history.add(4);
        history.remove(1);
        expect(history.current()).toEqual([
            { coffeeId: 1, quantity: 1 },
            { coffeeId: 4, quantity: 1 },
        ]);
    });

    it("deshace el último cambio", () => {
        const history = createCartHistory();
        history.add(1);
        history.add(4);
        history.undo();
        expect(history.current()).toEqual([{ coffeeId: 1, quantity: 1 }]);
    });

    it("deshace varios cambios seguidos", () => {
        const history = createCartHistory();
        history.add(1);
        history.add(4);
        history.undo();
        history.undo();
        expect(history.current()).toEqual([]);
    });

    it("no deshace más allá del carrito inicial", () => {
        const history = createCartHistory();
        history.undo();
        expect(history.current()).toEqual([]);
    });

    it("al deshacer recupera exactamente el carrito anterior", () => {
        const history = createCartHistory();
        history.add(1);
        const before = history.current();
        history.add(4);
        history.undo();
        expect(history.current()).toBe(before);
    });

    it("cada historial lleva su propia cuenta", () => {
        const first = createCartHistory();
        const second = createCartHistory();
        first.add(1);
        expect(second.current()).toEqual([]);
    });
});

describe("inmutabilidad", () => {
    it("funciona con un carrito inicial congelado", () => {
        const initial = deepFreeze<Cart>([{ coffeeId: 1, quantity: 1 }]);
        const history = createCartHistory(initial);
        history.add(1);
        history.add(4);
        history.undo();
        history.undo();
        expect(history.current()).toBe(initial);
        expect(initial).toEqual([{ coffeeId: 1, quantity: 1 }]);
    });
});
