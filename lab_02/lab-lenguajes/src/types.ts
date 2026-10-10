interface Coffee {
    readonly id: number;
    name: string;
    price: number;
    origin: string;
    notes: string[];
    roast: Roast;
    stock: number;
    discount?: number;
}

interface Customer {
    readonly id: number;
    name: string;
    email: string;
    address?: Address;
    preferences?: {
        grind?: Grind;
        newsletter?: boolean;
    };
}

interface Address {
    street: string;
    city: string;
    zip: string;
}

type Roast = "light" | "medium" | "dark";
type Grind = "grano" | "molido";

export { 
    type Coffee, 
    type Customer, 
    type Address, 
    type Roast, 
    type Grind 
};