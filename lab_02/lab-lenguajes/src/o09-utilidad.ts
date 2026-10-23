import { type Coffee, type Roast } from "./types";
import { coffees } from "./data";

type CoffeePreview = Pick<Coffee, "id" | "name" | "price">;

function toPreview(coffee: Coffee): CoffeePreview {
    return {
        id: coffee.id,
        name: coffee.name,
        price: coffee.price,
    };
}

type NewCoffee = Omit<Coffee, "id">;

function createCoffee(data: NewCoffee, list: Coffee[]): Coffee {
    const ids = list.map((coffee) => coffee.id);
    const nextId = Math.max(0, ...ids) + 1;
    
    return {
        ...data,
        id: nextId
    };
}

function updateCoffee(coffee: Coffee, changes: Partial<NewCoffee>): Coffee {
    return {
        ...coffee,
        ...changes
    }
}

function countByRoast(list: Coffee[]): Record<Roast, number> {
    return list.reduce(
        (counts, coffee) => ({
            ...counts,
            [coffee.roast]: counts[coffee.roast] + 1,
        }),
        { light: 0, medium: 0, dark: 0 },
    );
}

console.log(toPreview(coffees[0]));
// { id: 1, name: "Etiopía Yirgacheffe", price: 14.9 }
console.log(
  createCoffee(
    {
      name: "Ruanda Nyamasheke",
      origin: "Ruanda",
      notes: ["melocotón", "té verde"],
      roast: "light",
      price: 16.4,
      stock: 10,
    },
    coffees,
  ),
);
// { name: "Ruanda Nyamasheke", origin: "Ruanda", notes: ["melocotón", "té verde"], roast: "light", price: 16.4, stock: 10, id: 7 }
const cheaper = updateCoffee(coffees[1], { price: 11.9, stock: 10 });
console.log(cheaper.price, cheaper.stock);
// 11.9 10
console.log(coffees[1].price, coffees[1].stock);
// 12.9 3
console.log(countByRoast(coffees));
// { light: 2, medium: 2, dark: 2 }

export {
    type CoffeePreview,
    type NewCoffee,
    toPreview,
    createCoffee,
    updateCoffee,
    countByRoast
}