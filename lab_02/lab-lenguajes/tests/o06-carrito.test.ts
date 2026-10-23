import { describe, expect, it } from "vitest";
import { coffees } from "../src/data";
import {
    addToCart,
    cartTotal,
    changeQuantity,
    findCartItem,
    removeFromCart,
    type Cart,
} from "../src/o06-carrito";

describe("findCartItem", () => {
    it("devuelve el elemento si el café está en el carrito", () => {
        const cart: Cart = [{ coffeeId: 1, quantity: 2 }];
        expect(findCartItem(cart, 1)).toBe(cart[0]);
    });

    it("devuelve undefined si el café no está en el carrito", () => {
        const cart: Cart = [{ coffeeId: 1, quantity: 2 }];
        expect(findCartItem(cart, 4)).toBeUndefined();
    });
});

describe("addToCart", () => {
    it("añade un café nuevo con cantidad 1", () => {
        const empty: Cart = [];
        expect(addToCart(empty, 1)).toEqual([{ coffeeId: 1, quantity: 1 }]);
    });

    it("suma 1 a la cantidad si el café ya está en el carrito", () => {
        const cart: Cart = [{ coffeeId: 1, quantity: 1 }];
        expect(addToCart(cart, 1)).toEqual([{ coffeeId: 1, quantity: 2 }]);
    });

    it("no modifica el carrito original", () => {
        const empty: Cart = [];
        addToCart(empty, 1);
        expect(empty).toEqual([]);
    });

    it("mantiene la referencia de los elementos que no cambian", () => {
        const cart: Cart = [
            { coffeeId: 1, quantity: 1 },
            { coffeeId: 4, quantity: 1 },
        ];
        const result = addToCart(cart, 1);
        expect(result).not.toBe(cart);
        expect(result[0]).not.toBe(cart[0]);
        expect(result[1]).toBe(cart[1]);
    });
});

describe("removeFromCart", () => {
    it("resta una unidad si la cantidad es mayor que 1", () => {
        const cart: Cart = [{ coffeeId: 1, quantity: 2 }];
        expect(removeFromCart(cart, 1)).toEqual([{ coffeeId: 1, quantity: 1 }]);
    });

    it("elimina el café si su cantidad es 1", () => {
        const cart: Cart = [
            { coffeeId: 1, quantity: 1 },
            { coffeeId: 4, quantity: 3 },
        ];
        expect(removeFromCart(cart, 1)).toEqual([{ coffeeId: 4, quantity: 3 }]);
    });

    it("devuelve el mismo carrito si el café no está", () => {
        const cart: Cart = [{ coffeeId: 1, quantity: 1 }];
        expect(removeFromCart(cart, 99)).toBe(cart);
    });

    it("no modifica el carrito original", () => {
        const cart: Cart = [{ coffeeId: 1, quantity: 2 }];
        removeFromCart(cart, 1);
        expect(cart).toEqual([{ coffeeId: 1, quantity: 2 }]);
    });
});

describe("changeQuantity", () => {
    it("cambia la cantidad del café indicado", () => {
        const cart: Cart = [
            { coffeeId: 1, quantity: 1 },
            { coffeeId: 4, quantity: 1 },
        ];
        expect(changeQuantity(cart, 4, 3)).toEqual([
            { coffeeId: 1, quantity: 1 },
            { coffeeId: 4, quantity: 3 },
        ]);
    });

    it("quita el café si la cantidad es 0 o menor", () => {
        const cart: Cart = [
            { coffeeId: 1, quantity: 1 },
            { coffeeId: 4, quantity: 1 },
        ];
        expect(changeQuantity(cart, 4, 0)).toEqual([{ coffeeId: 1, quantity: 1 }]);
        expect(changeQuantity(cart, 4, -2)).toEqual([{ coffeeId: 1, quantity: 1 }]);
    });

    it("no modifica el carrito original", () => {
        const cart: Cart = [{ coffeeId: 1, quantity: 1 }];
        changeQuantity(cart, 1, 5);
        expect(cart).toEqual([{ coffeeId: 1, quantity: 1 }]);
    });
});

describe("cartTotal", () => {
    it("suma el precio con descuento por cantidad de cada café", () => {
        const cart: Cart = [
            { coffeeId: 1, quantity: 2 },
            { coffeeId: 4, quantity: 3 },
        ];
        // 14.9 * (1 - 0.1) * 2 + 10.5 * 3 = 58.32
        expect(cartTotal(cart, coffees)).toBeCloseTo(58.32);
    });

    it("devuelve 0 con el carrito vacío", () => {
        expect(cartTotal([], coffees)).toBe(0);
    });

    it("ignora los cafés que no existen en el catálogo", () => {
        expect(cartTotal([{ coffeeId: 99, quantity: 1 }], coffees)).toBe(0);
    });
});
