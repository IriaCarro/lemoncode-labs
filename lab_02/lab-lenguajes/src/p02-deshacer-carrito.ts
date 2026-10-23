import { addToCart, removeFromCart, type Cart } from "./o06-carrito";

interface CartHistory {
    add: (coffeeId: number) => void;
    remove: (coffeeId: number) => void;
    undo: () => void;
    current: () => Cart;
}

function createCartHistory(initial: Cart = []): CartHistory {
    let carts: Cart[] = [initial];

    const current = (): Cart => carts[carts.length - 1];

    const save = (cart: Cart): void => {
        carts = [...carts, cart];
    };

    return {
        add: (coffeeId) => save(addToCart(current(), coffeeId)),
        remove: (coffeeId) => save(removeFromCart(current(), coffeeId)),
        undo: () => {
            // El carrito inicial no se puede deshacer
            if (carts.length > 1) {
                carts = carts.slice(0, -1);
            }
        },
        current,
    };
}

const history = createCartHistory();
history.add(1);
history.add(4);
history.undo();
console.log(history.current());
// [{ coffeeId: 1, quantity: 1 }]

export {
    type CartHistory,
    createCartHistory
}
