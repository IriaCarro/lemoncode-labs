import { coffees, customers } from "../src/data";
import { deepFreeze } from "./helpers";

// Con los datos congelados, cualquier función que intente mutarlos
// (push, sort, coffee.price = ...) lanza un TypeError y el test falla
deepFreeze(coffees);
deepFreeze(customers);
