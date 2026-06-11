// =======================================================
// MÓDULO 3 - FUNDAMENTOS DE PROGRAMACIÓN EN JAVASCRIPT
// Repaso: funciones, return, operadores, condicionales y strings
// Ejecutar con: node app.js
// =======================================================


/**
 * Calcula el área de un rectángulo.
 * 
 * Esta documentación se conoce como JSDoc.
 * Sirve para explicar qué hace una función,
 * qué parámetros recibe y qué valor retorna.
 * 
 * @param {number} ancho - El ancho del rectángulo
 * @param {number} alto - El alto del rectángulo
 * @returns {number} El área del rectángulo
 */
function calcularArea(ancho, alto) {
  // La función recibe dos números y retorna su multiplicación.
  // Fórmula del área de un rectángulo: ancho * alto.
  return ancho * alto;
}

// Invocamos la función y mostramos el resultado en consola.
console.log("Área del rectángulo:", calcularArea(5, 4));


// -------------------------------------------------------
// 1. Función que retorna un valor
// -------------------------------------------------------

// Esta función recibe dos parámetros: a y b.
// Luego retorna la suma de ambos valores.
function sumar(a, b) {
  // return devuelve el resultado hacia el lugar donde se llamó la función.
  return a + b;
}

// Invocamos la función sumar con los valores 5 y 3.
// El resultado retornado, que es 8, se guarda en la variable resultado.
let resultado = sumar(5, 3);

// Mostramos en consola el valor guardado en resultado.
console.log("Resultado de la suma:", resultado);


// -------------------------------------------------------
// 2. Función que realiza una acción, pero no retorna valor
// -------------------------------------------------------

// Esta función recibe un mensaje y lo muestra en consola.
function mostrarMensaje(mensaje) {
  // console.log() realiza una acción: imprime información.
  console.log(mensaje);

  // Esta función no tiene return.
  // Por eso, cuando se guarde su resultado en una variable,
  // el valor será undefined.
}

// Ejecutamos la función.
// Esta línea imprime: Hola desde Node.js
let prueba = mostrarMensaje("Hola desde Node.js");

// Mostramos qué valor devolvió la función.
// Como mostrarMensaje() no tiene return, el resultado será undefined.
console.log("Valor retornado por mostrarMensaje:", prueba);


// -------------------------------------------------------
// 3. Operador aritmético combinado con asignación
// -------------------------------------------------------

// Creamos una variable con valor inicial 10.
let myVariable = 10;

// Esta línea toma el valor actual de myVariable y le suma 2.
// Es decir: 10 + 2 = 12.
myVariable = myVariable + 2;

// Forma abreviada equivalente:
// myVariable += 2;

console.log("Valor actualizado de myVariable:", myVariable);


// -------------------------------------------------------
// 4. Condicional con operador lógico OR
// -------------------------------------------------------

// El operador || significa "o".
// La condición será verdadera si al menos una de las partes es true.

if (false || true) {
  // Aunque la primera parte es false, la segunda es true.
  // Por eso el bloque if sí se ejecuta.
  console.log("Esto se evalúa");
} else {
  // Este bloque no se ejecuta porque la condición del if fue verdadera.
  console.log("Esto NO se evalúa");
}


// -------------------------------------------------------
// 5. Concatenación de cadenas
// -------------------------------------------------------

// Creamos una variable con un nombre.
let myName = "Cesar";

// Concatenar significa unir textos.
// En este caso unimos "Hola ", el valor de myName y el signo "!". 
let saludo = "Hola " + myName + "!";

console.log("Saludo original:", saludo);


// -------------------------------------------------------
// 6. Métodos de string
// -------------------------------------------------------

// Los strings son inmutables.
// Esto significa que los métodos no modifican el string original,
// sino que devuelven un nuevo string con el cambio aplicado.

// toLocaleUpperCase() devuelve una nueva versión del texto en mayúsculas.
let saludoMayusculas = saludo.toLocaleUpperCase();

// El saludo original sigue igual.
console.log("Saludo original después del método:", saludo);

// Aquí mostramos el nuevo string en mayúsculas.
console.log("Saludo en mayúsculas:", saludoMayusculas);


// -------------------------------------------------------
// 7. Método split()
// -------------------------------------------------------

// Creamos un string con varias palabras separadas por espacios.
let registro = "alto ancho rojo";

// split(" ") divide el string cada vez que encuentra un espacio.
// El resultado será un arreglo.
let caracteristicas = registro.split(" ");

console.log("String original:", registro);
console.log("Arreglo generado con split:", caracteristicas);

// Resultado esperado:
// [ 'alto', 'ancho', 'rojo' ]