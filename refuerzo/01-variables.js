// -------------------------------
// Ejemplo: var, let y const en JavaScript
// -------------------------------

// var: se puede redeclarar y reasignar
var helloWorld = 'Hola Mundo';
console.log(helloWorld);

helloWorld = 'Hola de nuevo, Mundo';
console.log(helloWorld);

// let: se puede reasignar, pero no redeclarar en el mismo bloque
let helloWorld2 = 'Hola Mundo 2';
console.log(helloWorld2);

helloWorld2 = 'Hola de nuevo, Mundo 2';
console.log(helloWorld2);

// const: no se puede reasignar ni redeclarar
const helloWorld3 = 'Hola Mundo 3';
console.log(helloWorld3);

// Esto generaría un error (TypeError)
// helloWorld3 = 'Hola Mundo 45';
// console.log(helloWorld3);

// Sin embargo, si const hace referencia a un objeto o arreglo,
// sus elementos internos sí pueden cambiar:
const numeros = [1, 2, 3];
numeros.push(4);
console.log(numeros); // [1, 2, 3, 4]

// Recomendación:
// Usa preferentemente `let` y `const` en lugar de `var`,
// ya que ayudan a evitar errores relacionados con el alcance (scope) y el hoisting.

