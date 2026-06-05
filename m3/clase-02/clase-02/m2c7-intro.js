// =======================================================
// MÓDULO 3 - FUNDAMENTOS DE PROGRAMACIÓN EN JAVASCRIPT
// Tema: variables, tipos de datos, strings, arrays y objetos
// Ejecutar con: node app.js
// =======================================================


// -------------------------------------------------------
// 1. Declaración de variables
// -------------------------------------------------------

// Declarar una variable significa crear un espacio para guardar un dato.
// En este punto, las variables existen, pero aún no tienen un valor asignado.

var nombre;
let autos;


// -------------------------------------------------------
// 2. Inicialización de variables
// -------------------------------------------------------

// Inicializar una variable significa asignarle un valor por primera vez.

nombre = "Pedro";
autos = 3;

console.log("Nombre:", nombre);
console.log("Cantidad de autos:", autos);


// -------------------------------------------------------
// 3. Declaración e inicialización en una sola línea
// -------------------------------------------------------

let height = 1.77;

console.log("Altura:", height);


// -------------------------------------------------------
// 4. Propiedad length en strings
// -------------------------------------------------------

// La propiedad .length permite conocer la cantidad de caracteres de un string.

console.log("Cantidad de caracteres en nombre:", nombre.length);
console.log("Cantidad de caracteres en Pedro:", "Pedro".length);


// -------------------------------------------------------
// 5. Arreglos con distintos tipos de datos
// -------------------------------------------------------

// Un arreglo puede almacenar varios valores.
// En JavaScript, un arreglo puede contener distintos tipos de datos.

let persona = [nombre, height, true, null, {}];

console.log("Arreglo persona:", persona);


// También podemos reasignar la variable persona con un nuevo arreglo.

persona = ["Otro nombre", height, true, null, 5478];

console.log("Arreglo persona modificado:", persona);


// -------------------------------------------------------
// 6. Cadenas de texto y uso de comillas
// -------------------------------------------------------

// Se pueden usar comillas dobles para incluir comillas simples dentro del texto.

let cadena = "Esta es una 'cadena'";

console.log(cadena);


// También se pueden usar comillas simples para incluir comillas dobles dentro del texto.

cadena = 'Esta es una "cadena"';

console.log(cadena);


// Esta línea produciría error porque las comillas se cierran antes de tiempo.
// let cadenaError = 'Esta es una 'cadena'';


// -------------------------------------------------------
// 7. Números y operaciones especiales
// -------------------------------------------------------

// Declaración de variables numéricas.

let a;
let b;
let c;
let d;


// Inicialización de variables.

a = 15;
b = 20.6;


// División por cero.
// En JavaScript, esto produce Infinity.

c = 15 / 0;


// Operación inválida entre texto y número.
// En JavaScript, esto produce NaN: Not a Number.

d = "texto" / 4;


console.log("Valor de a:", a);
console.log("Valor de b:", b);
console.log("Resultado de 15 / 0:", c);
console.log("Resultado de 'texto' / 4:", d);


// -------------------------------------------------------
// 8. Objetos en JavaScript
// -------------------------------------------------------

// Un objeto permite representar una entidad con propiedades.
// En este caso, auto tiene modelo, color y patente.

let auto;

auto = {
  modelo: "BMW X3",
  color: "Negro",
  patente: []
};

console.log("Objeto auto:", auto);
console.log("Modelo del auto:", auto.modelo);
console.log("Color del auto:", auto.color);
console.log("Patente del auto:", auto.patente);


// -------------------------------------------------------
// 9. Comparación entre string, array y objeto
// -------------------------------------------------------

let myString = "string";

let miArray = [1, 2, 3];

let objeto = {
  modelo: "BMW X3",
  color: "Negro",
  patente: []
};


// En Node.js, si solo escribimos el nombre de la variable,
// no necesariamente veremos una salida clara.
// Por eso usamos console.log().

console.log("String:", myString);
console.log("Array:", miArray);
console.log("Objeto:", objeto);


// -------------------------------------------------------
// 10. Verificación de tipos de datos
// -------------------------------------------------------

// typeof permite revisar el tipo de dato de una variable.

console.log("Tipo de myString:", typeof myString);
console.log("Tipo de miArray:", typeof miArray);
console.log("Tipo de objeto:", typeof objeto);
console.log("¿miArray es un arreglo?", Array.isArray(miArray));