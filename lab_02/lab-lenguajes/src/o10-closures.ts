type PriceRule = (price: number) => number;

const createDiscount = (rate: number): PriceRule => (price) => price * (1 - rate);
const createOrderIdGenerator = (prefix: string) => (id :Number): string => `${prefix}-${id}`;

const blackFriday = createDiscount(0.2);
const members = createDiscount(0.1);

console.log(blackFriday(10));
console.log(members(10));
console.log([10, 20, 15].map(blackFriday));
// No hace falta poner parentesis tras black friday porque
// se está recorriendo elementos de un array y el valor ya es un Number

const nextOrderId = createOrderIdGenerator("TUE");
const nextGiftId = createOrderIdGenerator("REGALO");

console.log(nextOrderId(1));
console.log(nextOrderId(2));
console.log(nextGiftId(1));
console.log(nextOrderId(3));