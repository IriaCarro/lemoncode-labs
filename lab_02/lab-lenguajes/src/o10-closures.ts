type PriceRule = (price: number) => number;

const createDiscount = (rate: number): PriceRule => (price) => price * (1 - rate);

const createOrderIdGenerator = (prefix: string): (() => string) => {
    let count = 0;
    return () => {
        count++;
        return `${prefix}-${count}`;
    }
}

const blackFriday = createDiscount(0.2);
const members = createDiscount(0.1);

console.log(blackFriday(10));
// 8
console.log(members(10));
// 9
console.log([10, 20, 15].map(blackFriday));
// [8, 16, 12]
// No hace falta poner parentesis tras black friday porque
// se está recorriendo elementos de un array y el valor ya es un Number

const nextOrderId = createOrderIdGenerator("TUE");
const nextGiftId = createOrderIdGenerator("REGALO");

console.log(nextOrderId());
// TUE-1
console.log(nextOrderId());
// TUE-2
console.log(nextGiftId());
// REGALO-1
console.log(nextOrderId());
// TUE-3

export {
    type PriceRule,
    createDiscount, 
    createOrderIdGenerator, 
    blackFriday, 
    members, 
    nextGiftId,
    nextOrderId
}

// Comentad: ¿por qué en `.map(blackFriday)` no ponemos 
// paréntesis después de `blackFriday`? ¿`blackFriday` es 
// pura? ¿Y `nextOrderId`?

// No ponemos parentesis porque el propio map llama a la función
// la enviamos como parametro sin valor

// Black friday es pura, NextOrderId no es pura depende de el valor de la variable count