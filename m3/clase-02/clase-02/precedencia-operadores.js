// =======================================================
// MÓDULO 3 - FUNDAMENTOS DE PROGRAMACIÓN EN JAVASCRIPT
// Tema: precedencia de operadores, concatenación y template strings
// Ejecutar con: node app.js
// =======================================================


// -------------------------------------------------------
// 1. Precedencia de operadores
// -------------------------------------------------------

// La precedencia de operadores define qué operación se resuelve primero.
// En JavaScript, la multiplicación tiene mayor prioridad que la suma.

let resultado = 10 + 5 * 2;

console.log("Resultado sin paréntesis:", resultado);

// Primero se resuelve:
// 5 * 2 = 10
// Luego:
// 10 + 10 = 20


// Los paréntesis permiten modificar el orden de ejecución.
// JavaScript siempre resuelve primero lo que está dentro de los paréntesis.

resultado = (10 + 5) * 2;

console.log("Resultado con paréntesis:", resultado);

// Primero se resuelve:
// 10 + 5 = 15
// Luego:
// 15 * 2 = 30


// -------------------------------------------------------
// 2. Concatenación de strings
// -------------------------------------------------------

// Concatenar significa unir textos o valores.
// Para concatenar en JavaScript podemos usar el operador +.

let nombre = "María";

let mensaje = "Hola" + " " + nombre;

console.log("Mensaje concatenado:", mensaje);


// -------------------------------------------------------
// 3. Concatenación de varias variables
// -------------------------------------------------------

// También podemos combinar texto con variables numéricas.
// En este caso, JavaScript une el texto con el valor de las variables.

let producto = "mouse";
let precio = 12000;

console.log("El producto " + producto + " cuesta $" + precio);


// -------------------------------------------------------
// 4. Template strings o template literals
// -------------------------------------------------------

// Los template strings permiten insertar variables dentro de un texto.
// Se escriben usando backticks: ` `
// Las variables se insertan usando ${variable}.

console.log(`El producto ${producto} cuesta $${precio}`);


// -------------------------------------------------------
// 5. Comparación breve
// -------------------------------------------------------

// Concatenación tradicional:
console.log("El producto " + producto + " cuesta $" + precio);

// Template string:
console.log(`El producto ${producto} cuesta $${precio}`);

// En código moderno, los template strings suelen ser más legibles,
// especialmente cuando el mensaje contiene varias variables.