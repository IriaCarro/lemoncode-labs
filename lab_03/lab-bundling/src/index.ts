import "./styles/main.scss";
import coffeePhoto from "./assets/initial-2.webp";

console.log("Bienvenido a la web de cafe - rico");
console.log(coffeePhoto);

const img = document.createElement("img");
img.src = coffeePhoto;
img.alt = "";
document.body.appendChild(img);
