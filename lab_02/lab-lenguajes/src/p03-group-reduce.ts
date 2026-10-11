import { type Coffee, type Roast } from "./types";
import { coffees } from "./data";

function groupByRoast(list: Coffee[]): Record<Roast, Coffee[]> {
    const initial: Record<Roast, Coffee[]> = { light: [], medium: [], dark: [] };

    return list.reduce(
        (groups, coffee) => ({
            ...groups,
            [coffee.roast]: [...groups[coffee.roast], coffee],
        }),
        initial,
    );
}

const grouped = groupByRoast(coffees);
console.log(grouped.light.map((coffee) => coffee.name));
// → ["Etiopía Yirgacheffe", "Kenia AA"]
console.log(grouped.medium.map((coffee) => coffee.name));
// → ["Colombia Huila", "Guatemala Antigua"]
console.log(grouped.dark.map((coffee) => coffee.name));
// → ["Brasil Cerrado", "Sumatra Mandheling"]

export {
    groupByRoast
}
