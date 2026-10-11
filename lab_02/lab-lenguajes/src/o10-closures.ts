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
console.log(members(10));
console.log([10, 20, 15].map(blackFriday));
// No hace falta poner parentesis tras black friday porque
// se está recorriendo elementos de un array y el valor ya es un Number

const nextOrderId = createOrderIdGenerator("TUE");
const nextGiftId = createOrderIdGenerator("REGALO");

console.log(nextOrderId());
console.log(nextOrderId());
console.log(nextGiftId());
console.log(nextOrderId());