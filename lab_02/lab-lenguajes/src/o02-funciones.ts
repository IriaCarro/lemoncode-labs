import { type Roast } from './types';
import { coffees } from './data';

function formatPrice(price: number, currency = "€"): string {
    return `${price.toFixed(2)} ${currency}`;
}

function stockStatus(stock: number): string {
    if (stock === 0) {
        return "Agotado";
    } else if (stock < 5) {
        return "Últimas unidades";
    } else {
        return "Disponible";
    }
}

function roastLabel(roast: Roast): string {
    switch (roast) {
        case "light":
            return "Tueste claro";
        case "medium":
            return "Tueste medio";
        case "dark":
            return "Tueste oscuro";
        default:
            throw new Error(`Roast type not recognized: ${roast}`);
    }
}


/* function roastLabel(roast: Roast): string {
    switch (roast) {
        case "light":
            return "Tueste claro";
    }
} */
// Error message: Function lacks ending return statement and return type does not include 'undefined'.
// Esto quiere decir que la función no devuelve un valor en todos los casos posibles, 
// lo que puede llevar a errores en tiempo de ejecución si se llama a la función con un valor de tueste no reconocido. 
// Para solucionar esto, se puede agregar un caso por defecto que lance un error o devuelva un valor predeterminado.

for (const coffee of coffees) {
    console.log(`Café: ${coffee.name}`);
    console.log(`Tueste: ${roastLabel(coffee.roast)}`);
    console.log(`Stock: ${stockStatus(coffee.stock)}`);
    console.log("--------------------");
}