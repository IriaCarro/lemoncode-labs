import { coffees } from "./data";

const isRoast = (value: unknown): boolean =>
    value === "light" || value === "medium" || value === "dark";

const isStringArray = (value: unknown): boolean =>
    Array.isArray(value) && value.every((item) => typeof item === "string");

function isCoffee(data: unknown): boolean {
    if (typeof data !== "object" || data === null || Array.isArray(data)) {
        return false;
    }
    // Si falta alguna propiedad o tiene otro tipo, no es un café
    if (!("id" in data) || typeof data.id !== "number" ||
        !("name" in data) || typeof data.name !== "string" ||
        !("origin" in data) || typeof data.origin !== "string" ||
        !("notes" in data) || !isStringArray(data.notes) ||
        !("roast" in data) || !isRoast(data.roast) ||
        !("price" in data) || typeof data.price !== "number" ||
        !("stock" in data) || typeof data.stock !== "number" ||
        // discount es opcional: si está, tiene que ser un número
        ("discount" in data && data.discount !== undefined && typeof data.discount !== "number"))
    {
        return false;
    }

    return true;
}

const response = '{"id": 8, "name": "Perú Cajamarca", "price": 13.5}';
const data: unknown = JSON.parse(response);
console.log(`Es café: ${isCoffee(data)}`);
// → "Es café: false"

const fullResponse = JSON.stringify(coffees[0]);
console.log(`Es café: ${isCoffee(JSON.parse(fullResponse))}`);
// → "Es café: true"

export {
    isCoffee
}
