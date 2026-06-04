// OPERADORES EN JAVASCRIPT

// Ya conocemos los tipos de datos... ahora aprenderemos a trabajar con ellos.
// Para eso, usamos **operadores** que nos permiten realizar cálculos, comparar valores,
// asignar información, y tomar decisiones en nuestro código.

// Existen varios tipos de operadores, veamos los principales:


// OPERADORES ARITMÉTICOS
// Sirven para realizar operaciones matemáticas básicas:

console.log(5 + 5); // Resultado: 10

let a = 5;
let b = 10;

console.log(a + b);  // Suma
console.log(a - b);  // Resta
console.log(a * b);  // Multiplicación
console.log(a / b);  // División
console.log(a % b);  // Módulo (resto de una división)
console.log(a ** b); // Exponente (5 elevado a 10)

// También podemos incrementar o decrementar el valor de una variable:
a++; // Suma 1
console.log(a); // Resultado: 6

b--; // Resta 1
console.log(b); // Resultado: 9


// OPERADORES DE ASIGNACIÓN
// Usamos = para asignar valores a variables.

let myVariable = 2;
console.log(myVariable); // 2

// Podemos combinar operadores aritméticos con asignación:
myVariable += 2; // Suma 2 y reasigna el resultado
console.log(myVariable); // 4

// Otros ejemplos: -=, *=, /=, %=, **=


// OPERADORES DE COMPARACIÓN
// Nos permiten comparar valores y devuelven un booleano (true o false)

console.log(a > b);  // Mayor que
console.log(b > a);  // Mayor que
console.log(10 >= 10); // Mayor o igual
console.log(a <= b); // Menor o igual
console.log(a == b); // Igualdad por valor

// Diferencias entre == y ===
console.log(a == 6);      // true → compara solo valor
console.log(a == "6");    // true → convierte el string a número (coerción)
console.log(a === "6");   // false → compara valor y tipo
console.log(a === 6);     // true → valor y tipo coinciden

// Desigualdad
console.log(a != 6);       // false → son iguales en valor
console.log(a !== '6');    // true → valor igual pero tipo distinto

// Ejemplos con coerción de tipo (comportamientos que sorprenden)
console.log(0 == false);   // true
console.log(1 == false);   // false
console.log(0 == "");      // true
console.log(0 == " ");     // true
console.log(undefined == null);  // true
console.log(undefined === null); // false


// ¿Qué es "truthy" y "falsy"?
// En JavaScript, algunos valores se comportan como verdaderos o falsos en contextos booleanos.

// Falsy values (falsos):
// - false
// - 0
// - "" (cadena vacía)
// - null
// - undefined
// - NaN

// Todo lo demás se considera "truthy" (verdadero).


// OPERADORES LÓGICOS
// Se usan para combinar condiciones (muy útiles en estructuras como if)

// AND (&&): todas las condiciones deben ser verdaderas
console.log(5 < 10 && 15 < 20); // true
console.log(false && false);    // false
console.log(true && true);      // true

// OR (||): al menos una condición debe ser verdadera
console.log(5 > 10 || 15 > 20); // false
console.log(5 < 10 || 15 > 20); // true
console.log(false || true);     // true

// Combinación de ambos
console.log(true || true && false); // true (porque && tiene prioridad)

// NOT (!): niega el valor lógico
console.log(!true);  // false
console.log(!false); // true
console.log(!(true || false)); // false


// OPERADOR TERNARIO
// Es una forma abreviada de escribir una condición if/else

const isRaining = false;

isRaining
  ? console.log(" Está lloviendo")
  : console.log(" No está lloviendo");

// Se lee: "Si está lloviendo, mostrar mensaje A, si no, mostrar mensaje B"

