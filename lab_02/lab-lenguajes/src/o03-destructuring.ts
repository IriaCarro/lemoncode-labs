import type { Coffee } from "./types.ts";
import { formatPrice } from "./o02-funciones.ts";
import { coffees } from "./data.ts";

function coffeeCard({ name, origin, price}: Coffee): string {
    return `${name} (${origin}) · ${formatPrice(price)}`;
}

function mainNote(coffee: Coffee): string {
    // Nos quedamos con la primera nota y 
    // el resto de notas las agrupamos en un array
    const [first, ...others] = coffee.notes;
    return `${first} y ${others.length} más`;
}

function toPublicCoffee({stock, ...publicCoffee }: Coffee): Omit<Coffee, "stock"> {
    return publicCoffee;
}

function sumAll(...amounts: number[]): number {
    // Ideal para sumas de cantidades, 
    // ya que reduce el array a un único valor
    return amounts.reduce((acc, amount) => acc + amount, 0);
}

console.log(coffeeCard(coffees[0]));
// Etiopía Yirgacheffe (Etiopía) · 14.90 €
console.log(mainNote(coffees[0]));
// floral y 2 más
console.log(mainNote(coffees[1]));
// caramelo y 1 más
console.log(toPublicCoffee(coffees[1]));
// { id: 2, name: "Colombia Huila", origin: "Colombia", notes: ["caramelo", "manzana roja"], roast: "medium", price: 12.9 }
console.log(coffees[1].stock);
// 3
console.log(sumAll(1, 2, 3));
// 6
console.log(sumAll());
// 0
// SPREAD operator: permite pasar un array como si 
// fueran argumentos individuales a una función.
console.log(sumAll(...coffees.map((coffee) => coffee.stock)));
// 48

export {
    coffeeCard,
    mainNote,
    toPublicCoffee,
    sumAll
}