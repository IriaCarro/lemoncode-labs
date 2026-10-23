import {type Coffee } from "./types";
import { coffees } from "./data";
import { formatPrice } from "./o02-funciones";
import { coffeeCard } from "./o03-destructuring";

function availableCoffees(list: Coffee[]): Coffee[] {
    return list
        .filter(isAvailable);
}

function isAvailable(coffee: Coffee): boolean {
    return coffee.stock > 0;
}

function catalogLabels(list: Coffee[]): string[] {
    return availableCoffees(list)
        .toSorted((a, b) => a.price - b.price)
        .map(coffeeCard);
}

function stockValue(list: Coffee[]): number {
    return list
        .reduce((total, coffee) => {
            return total + (coffee.stock * coffee.price);
        }, 0);
}
function coffeeById(id: number): Coffee | undefined {
    return coffees.find((coffee) => coffee.id === id);
}

function hasNotes(coffee: Coffee): boolean {
    return coffee.notes !== undefined 
            && 
            coffee.notes !== null 
            &&  
            coffee.notes.length > 0;
}

console.log(availableCoffees(coffees).map((coffee) => {
    return coffee.name;
}));
// ["Etiopía Yirgacheffe", "Colombia Huila", "Brasil Cerrado", "Guatemala Antigua"]
console.log(catalogLabels(coffees));
// ["Brasil Cerrado (Brasil) · 10.50 €", "Colombia Huila (Colombia) · 12.90 €", "Guatemala Antigua (Guatemala) · 13.20 €", "Etiopía Yirgacheffe (Etiopía) · 14.90 €"]
console.log(formatPrice(stockValue(coffees)));
// 585.60 €
console.log(coffees.some(isAvailable));
// true
console.log(coffees.every(hasNotes));
// true
console.log(coffeeById(4)?.name ?? "No existe");
// Brasil Cerrado
console.log(coffeeById(99)?.name ?? "No existe");
// No existe
console.log(coffees.map((coffee) => coffee.name));
// ["Etiopía Yirgacheffe", "Colombia Huila", "Kenia AA", "Brasil Cerrado", "Guatemala Antigua", "Sumatra Mandheling"]

export {
    availableCoffees,
    catalogLabels,
    formatPrice,
    coffeeById,
    hasNotes,
    stockValue
}
