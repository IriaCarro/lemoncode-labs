import { produce } from "immer";

interface Subscription {
  customer: { name: string; address: { city: string; zip: string } };
  plan: { name: "Básico" | "Popular" | "Pro"; bagsPerMonth: number };
  deliveries: string[];
}

const subscription: Subscription = {
  customer: { name: "Lucía", address: { city: "Málaga", zip: "29005" } },
  plan: { name: "Popular", bagsPerMonth: 2 },
  deliveries: ["2026-09-05", "2026-10-05"],
};

const movedSpread: Subscription = {
    ...subscription,
    customer: {
        ...subscription.customer,
        address: {
            ...subscription.customer.address,
            city: "Sevilla",
        },
    },
};

const movedImmer = produce(subscription, (draft)  => {
    draft.customer.address.city = "Sevilla";
});

const upgraded = produce(subscription, (draft) => {
    draft.plan.name = "Pro";
    draft.plan.bagsPerMonth = 3;
    draft.deliveries.push("2026-11-05");
});

console.log(movedSpread.customer.address.city);
console.log(movedImmer.customer.address.city);
console.log(subscription.customer.address.city);

console.log(movedImmer.customer === subscription.customer);
console.log(movedImmer.plan === subscription.plan);
console.log(upgraded.plan);
console.log(upgraded.deliveries);
console.log(subscription.plan);
console.log(subscription.deliveries);

console.log(produce(subscription, () => {}) === subscription);
console.log(Object.isFrozen(upgraded.plan));

// Immer es mucho más legible pero nos crea dependencia con esa librería
