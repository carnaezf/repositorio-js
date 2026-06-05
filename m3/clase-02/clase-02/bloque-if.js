// Bloque IF

// El flujo if/else permite que progrma tome decisiones

// let edad = 20
let edad = 12;

if (edad >= 18) {
  console.log("Puede ingresar");
} else {
  console.log("No puede ingresar");
}

//  Luego se ejecuta lo siguiente
console.log("Esto esta fuera de la estructura de control IF");

// Si supera los 50.000 descuento
let cliente = "Andrea";
let totalCompra = 5000;

if (totalCompra >= 50000) {
  console.log(`${cliente} recibe descuento`);
} else {
  console.log(`${cliente} recibe No descuento`);
}
