import { type Customer, type Grind, type Coffee } from "./types";
import { customers, coffees } from "./data";
import { formatPrice } from "./o02-funciones";

function getCity(customer: Customer): string {
    return customer.address?.city ?? "Sin dirección";
}

function getGrind(customer: Customer): Grind {
    return customer.preferences?.grind ?? "grano";
}

function wantsNewsletter(customer: Customer): boolean {
    return customer.preferences?.newsletter ?? true;
}
 
function finalPrice(coffee: Coffee): number {
    const discount = coffee.discount ?? 0;
    return coffee.price * (1 - discount);
}

for (const customer of customers) {
  console.log(
    `${customer.name} · ${getCity(customer)} · ${getGrind(customer)} · newsletter: ${wantsNewsletter(customer)}`,
  );
}

console.log(formatPrice(finalPrice(coffees[0])));
console.log(formatPrice(finalPrice(coffees[1])));
console.log(formatPrice(finalPrice(coffees[2])));
console.log(formatPrice(finalPrice(coffees[4])));


/* function wantsNewsletter(customer: Customer): boolean {
    return customer.preferences?.newsletter || true;
} */

// Esto devuelve true si newsletter es undefined, 
// pero también devuelve true si newsletter es false, 
// lo cual no es correcto.
// El operador || devuelve true si alguno de los valores es verdadero, 
// no es la funcionalidad que necesitamos

export {
    getCity,
    getGrind,
    wantsNewsletter,
    formatPrice,
    finalPrice
}