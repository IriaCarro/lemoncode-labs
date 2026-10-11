import { type Coffee } from "./types";

// 1
// let shippingCost = 3.5;
// const totalWithShipping = (amount: number): number => amount + shippingCost;

// Impura: el resultado de la función depende de la variable externa shippingCost

// 1. Ejemplo de función pura

const totalWithShipping = (amount: number, shippingCost: number): number => {
    return amount + shippingCost
}; 


// 2
/*
const applyDiscount = (coffee: Coffee, rate: number): Coffee => {
  coffee.price = coffee.price * (1 - rate);
  return coffee;
};
*/

// Impura: Modifica el objeto de entrada

// 2. Ejemplo de función pura con operador Spread

const applyDiscount = (coffee: Coffee, rate: number): Coffee => ({
    ...coffee,
    price: coffee.price * (1 - rate),
});

// 3
/*
const namesInCapitals = (list: Coffee[]): string[] =>
  list.map((coffee) => coffee.name.toUpperCase());
*/
// Pura: Map crea un nuevo array

// 4
/*
const sortByPrice = (list: Coffee[]): Coffee[] =>
  list.sort((a, b) => a.price - b.price);
*/

// Impura: sort modificar el array de entrada

// 4. Ejemplo de función pura. ToSorted devuelve un nuevo array
// no modifica el argumento de la función

const sortByPrice = (list: Coffee[]): Coffee[] => {
    return list.toSorted((a, b) => a.price - b.price);
}

// 5
//const createOrderId = (): string => `ORD-${Date.now()}`;

// Impura: Depende de un elemento externo "fecha actual en ese momento"

// 5. Ejemplo de función pura. No usamos nada externo
// y el retorno depende del argumento fecha

const createOrderId = (now: Date): string => {
    return `ORD-${now}`;
}

// 6

const buildTags = (coffee: Coffee): string[] => {
  const tags: string[] = [];
  for (const note of coffee.notes) {
    tags.push(`#${note}`);
  }
  return tags;
};

// Pura: Devuelve un array nuevo sin modificar el objeto de entrada
// push no es usado por el objeto de entrada

export {
  applyDiscount,
  totalWithShipping,
  sortByPrice,
  createOrderId,
  buildTags
}