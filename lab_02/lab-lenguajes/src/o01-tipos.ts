// import { type Coffee } from './types';

/* let coffee : Coffee = {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    notes: ["floral", "citrus", "tea-like"],
    roast: "light",
    stock: 100,
    discount: 0.1
}; */

// Error message: Property 'price' is missing in type '{ id: number; name: string; origin: string; notes: string[]; roast: "light"; stock: number; discount: number; }' but required in type 'Coffee'.


/* let coffee : Coffee = {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    price: 15.99,
    notes: ["floral", "citrus", "tea-like"],
    roast: "extra",
    stock: 100,
    discount: 0.1
}; */

// Error message: Type '"extra"' is not assignable to type 'Roast'.

/* let coffees: Coffee[] = [
    {
        id: 1,
        name: "Ethiopian Yirgacheffe",
        origin: "Ethiopia",
        price: 15.99,
        notes: ["floral", "citrus", "tea-like"],
        roast: "light",
        stock: 100,
        discount: 0.1
    },
    {
        id: 2,
        name: "Colombian Supremo",
        origin: "Colombia",
        price: 12.99,
        notes: ["chocolate", "nutty", "caramel"],
        roast: "medium",
        stock: 200
    }
];

coffees[0].id = 3;
 */
//  Error message: Cannot assign to 'id' because it is a read-only property.