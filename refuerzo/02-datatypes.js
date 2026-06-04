// TIPOS DE DATOS EN JAVASCRIPT

// En JavaScript existen distintos tipos de datos.
// Los más fundamentales se llaman **tipos de datos primitivos**,
// ya que representan un único valor y no son objetos.

// ¿Por qué son importantes?
// Porque con ellos construimos todo lo demás en el lenguaje: estructuras,
// condiciones, operaciones, etc.


// LOS 7 TIPOS DE DATOS PRIMITIVOS EN JAVASCRIPT:

// 1. STRING (cadenas de texto)
let myName = "Cesar Arnaez";      // Comillas dobles
let alias = 'CAF';                // Comillas simples
let email = `mimail@mail.cl`;     // Template literals (backticks)


// 2. NUMBER (números: enteros o decimales)
let age = 37;        // Número entero
let height = 1.77;   // Número decimal


// 3. BOOLEAN (valores lógicos: true o false)
let isStudent = false;
let isTeacher = true;

// Los booleans son la base para condiciones y estructuras de control:
// if, while, etc.


// 4. UNDEFINED
let undefinedValue;
console.log(undefinedValue); // Resultado: undefined

// Esto significa que la variable fue declarada, pero no tiene valor asignado.


// 5. NULL
let nullValue = null;

// A diferencia de undefined, aquí estamos asignando intencionalmente un "no valor".
// Es útil para inicializar variables que luego se completarán.


// 6. SYMBOL
let mySymbol = Symbol("unique");

// Symbol crea valores únicos que nunca son iguales a otro Symbol, aunque tengan la misma descripción.
// Es un tipo más avanzado, se usa en casos específicos como propiedades únicas en objetos.


// 7. BIGINT
let myBig = BigInt(5654556568565565656562233256); // Con constructor
let myBig2 = 5654556568565565656562233256n;       // Con notación "n" al final

// BigInt permite trabajar con números extremadamente grandes,
// más allá del límite de los números normales en JS.


// MOSTRAR EL TIPO DE DATO DE CADA VARIABLE
console.log(typeof myName);      // string
console.log(typeof age);         // number
console.log(typeof isStudent);   // boolean
console.log(typeof undefinedValue); // undefined
console.log(typeof nullValue);      // devuelve 'object' (un comportamiento histórico de JS)
console.log(typeof mySymbol);       // symbol
console.log(typeof myBig);          // bigint


