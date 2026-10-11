import { coffees, customers } from "./data";

type OrderStatus = "pending" | "roasting" | "shipped" | "delivered";

const statusLabel: Record<OrderStatus, string> = {
  pending: "Pendiente",
  roasting: "Tostando",
  shipped: "Enviado",
  delivered: "Entregado"
};

const statusMessage = (status: OrderStatus): string => {
    return `Tu pedido está: ${statusLabel[status]}`;
}

const normalizeId = (id: string | number) : number => {
    if (typeof id === "number") {
        return id;
    }

    return Number(id);
}

const findById = <T extends { id: number }>(
    items: T[],
    id: number
): T | null => {
    return items.find((item) => item.id === id) ?? null;
};

console.log(statusMessage("roasting"));
console.log(normalizeId("4"));
console.log(normalizeId(4));
console.log(findById(coffees, normalizeId("4"))?.name ?? "No encontrado");
console.log(findById(customers, 3)?.email ?? "No encontrado");
console.log(findById(coffees, 99)?.name ?? "No encontrado");


// Al comentar la opción delivered en statusLabel el error es:
// Property 'delivered' is missing in type '{ pending: string; roasting: string; shipped: string; }' but required in type 'Record<OrderStatus, string>'.

// El findById devuelve un objeto opcional del tipo que le pasemosla lista
// En este caso para coffees devuelve un objeto Coffee
// y para customers devuelve un objeto Customer