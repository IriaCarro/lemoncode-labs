import {type Coffee } from "./types";
import { coffees } from "./data";
import { stockStatus, formatPrice } from "./o02-funciones";
import { coffeeCard } from "./o03-destructuring";

export function availableCoffees(list: Coffee[]): Coffee[] {
    return list
        .filter(isAvailable);
}

export function isAvailable(coffee: Coffee): boolean {
    return stockStatus(coffee.stock) === "disponible";
}

export function catalogLabels(list: Coffee[]): string[] {
    return availableCoffees(list)
        .toSorted((a, b) => a.price - b.price)
        .map(coffeeCard);
}

export function stockValues(list: Coffee[]): number {
    return availableCoffees(list)
        .reduce((total, coffee) => {
            return total + (coffee.stock * coffee.price);
        }, 0);
}
export function coffeeById(id: number): Coffee | undefined {
    return coffees.find((coffee) => coffee.id === id);
}

export function hasNotes(coffee: Coffee): boolean {
    return coffee.notes !== undefined 
            && 
            coffee.notes !== null 
            &&  
            coffee.notes.length > 0;
}

console.log(availableCoffees(coffees).map((coffee) => {
    return coffee.name;
}));
console.log(catalogLabels(coffees));
console.log(formatPrice(stockValues(coffees)));
console.log(coffees.some(isAvailable));
console.log(coffees.every(hasNotes));
console.log(coffeeById(4)?.name || "No existe");
console.log(coffeeById(99)?.name || "No existe");
console.log(coffees.map((coffee) => coffee.name));
