import { type Coffee } from "./types";
import { coffees } from "./data";
import { formatPrice } from "./o02-funciones";
import { finalPrice } from "./o04-opcionales";

export interface CartItem {
  coffeeId: number;
  quantity: number;
}

export type Cart = CartItem[];

export function findCartItem(cart: Cart, coffeeId: number): CartItem | undefined {
    return cart.find(item => item.coffeeId === coffeeId);
}

export function addToCart(cart: Cart, coffeeId: number): Cart {
    let existingItem = findCartItem(cart, coffeeId);
    if (!existingItem) {
        return [...cart, { coffeeId, quantity: 1 }];
    }

    return cart.map(item =>
        item.coffeeId === coffeeId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
    );
}

export function removeFromCart(cart: Cart, coffeeId: number): Cart {
    const existingItem = findCartItem(cart, coffeeId);
    if (!existingItem) {
        return cart;
    }
    if (existingItem.quantity > 1) {
        return changeQuantity(cart, coffeeId, existingItem.quantity - 1);
    }
    return cart.filter(item => item.coffeeId !== coffeeId);
}

export function changeQuantity(cart: Cart, coffeeId: number, quantity: number): Cart {
    if (quantity <= 0) {
        return cart.filter(item => item.coffeeId !== coffeeId);
    }

    return cart.map(item =>
        item.coffeeId === coffeeId ? { ...item, quantity } : item
    );
}

export function cartTotal(cart: Cart, coffees: Coffee[]): number {
    return cart.reduce((total, item) => {
        const coffee = coffees.find(c => c.id === item.coffeeId);
        if (coffee) {
            total += finalPrice(coffee) * item.quantity;
        }
        return total;
    }, 0);
}

const empty: Cart = [];
const cart1 = addToCart(empty, 1);
const cart2 = addToCart(cart1, 4);
const cart3 = addToCart(cart2, 1);
const cart4 = changeQuantity(cart3, 4, 3);
const cart5 = removeFromCart(cart4, 1);
const cart6 = changeQuantity(cart5, 4, 0);

console.log(cart3);
// [{ coffeeId: 1, quantity: 2 }, { coffeeId: 4, quantity: 1 }]
console.log(cart4);
// [{ coffeeId: 1, quantity: 2 }, { coffeeId: 4, quantity: 3 }]
console.log(cart5);
// [{ coffeeId: 1, quantity: 1 }, { coffeeId: 4, quantity: 3 }]
console.log(cart6);
// []
console.log(empty);
// []
console.log(cart1);
// [{ coffeeId: 1, quantity: 1 }]

console.log(cart3 === cart2);
// false
console.log(cart3[0] === cart2[0]);
// false
console.log(cart3[1] === cart2[1]);
// true
console.log(formatPrice(cartTotal(cart4, coffees)));
// "58.32 €"
console.log(formatPrice(cartTotal([{ coffeeId: 99, quantity: 1 }], coffees)));
// "0.00 €"