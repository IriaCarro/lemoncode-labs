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
    const grouped = Object.groupBy(list, (c => c.roast))

    return Object.fromEntries(
        Object.entries(grouped).map(([roast, coffees]) => [
            roast,
            coffees?.length ?? 0
        ])
    ) as Record<Roast, number>;
}

console.log(toPreview(coffees[0]));
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
const cheaper = updateCoffee(coffees[1], { price: 11.9, stock: 10 });
console.log(cheaper.price, cheaper.stock);
console.log(coffees[1].price, coffees[1].stock);
console.log(countByRoast(coffees));
