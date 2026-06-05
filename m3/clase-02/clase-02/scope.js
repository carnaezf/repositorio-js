// =======================================================
// MÓDULO 3 - FUNDAMENTOS DE PROGRAMACIÓN EN JAVASCRIPT
// Tema: sentencias condicionales if / else
// Ejecutar con: node app.js
// =======================================================


// -------------------------------------------------------
// 1. Estructura condicional if / else
// -------------------------------------------------------

// El flujo if / else permite que un programa tome decisiones.
// Si la condición se cumple, se ejecuta el bloque del if.
// Si la condición no se cumple, se ejecuta el bloque del else.

let edad = 12;

if (edad >= 18) {
  console.log("Puede ingresar");
} else {
  console.log("No puede ingresar");
}


// -------------------------------------------------------
// 2. Código fuera del bloque condicional
// -------------------------------------------------------

// Esta línea se ejecuta siempre, porque está fuera del if / else.
// No depende de si la condición anterior fue verdadera o falsa.

console.log("Esto está fuera de la estructura de control if / else");


// -------------------------------------------------------
// 3. Ejemplo aplicado: descuento en una compra
// -------------------------------------------------------

// Problema:
// Una tienda entrega descuento si el total de la compra
// es mayor o igual a $50.000.

let cliente = "Andrea";
let totalCompra = 5000;

if (totalCompra >= 50000) {
  console.log(`${cliente} recibe descuento`);
} else {
  console.log(`${cliente} no recibe descuento`);
}


// -------------------------------------------------------
// 4. Versión con cálculo de descuento
// -------------------------------------------------------

// En este ejemplo, si la compra supera los $50.000,
// se aplica un 10% de descuento.

let descuento = 0;

if (totalCompra >= 50000) {
  descuento = totalCompra * 0.1;
}

let totalFinal = totalCompra - descuento;

console.log(`Cliente: ${cliente}`);
console.log(`Total compra: $${totalCompra}`);
console.log(`Descuento aplicado: $${descuento}`);
console.log(`Total final: $${totalFinal}`);