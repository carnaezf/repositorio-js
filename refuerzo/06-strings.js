// Strings
// Tambien puedo usar operadores con cdenas de textos!


// Concatenacion de cadenas
let myName = "Cesar"

let saludo = "Hola " + myName + "!"

// console.log(saludo)

console.log(typeof saludo)

// longitud
// Introduccion a metodos

console.log(saludo.length)


// Acceso a caracteres
console.log(saludo[0])
console.log(saludo[-1])

// Metodos Comunes
console.log(saludo.toLocaleUpperCase())
console.log(saludo.toLocaleLowerCase())
console.log(saludo.indexOf("Cesar"))
console.log(saludo.indexOf("Hola"))
console.log(saludo.indexOf("Arnaez"))
console.log(saludo.includes("Cesar"))
console.log(saludo.includes("Hola"))
console.log(saludo.includes("Arnaez"))
console.log(saludo.slice(0, 7))
console.log(saludo.replace("Cesar", "Arnaez"))


// split → divide el string en partes usando un separador
let palabras = saludo.split(" ");          // ["Hola", "Cesar!"]
console.log(palabras);
console.log(palabras[1]);                  // "Cesar!"

// trim → elimina espacios al inicio y al final
let sucio = "   Hola Mundo   ";
console.log(sucio.trim());                 // "Hola Mundo"

// startsWith / endsWith → verifica cómo comienza o termina un string
console.log(saludo.startsWith("Hola"));    // true
console.log(saludo.endsWith("!"));         // true

// repeat → repite el string N veces
console.log("JS ".repeat(3));              // "JS JS JS "

// Template literals
let message = `Hola, este es 
mi curso de JS`

let email = 'prueba@prueba.cl'

console.log(`Hola, ${myName} y mi correo electonico es ${email}`);

// #################https://excalidraw.com/

// Recorreindo un array 
let fruta = "Banana";

for (let i = 0; i < fruta.length; i++) {

  console.log(`${i} ${fruta[i]}`);
}


// Ejercicios:
// 1. Concatena dos cadenas de texto
// 2. muestra la longitud de una cadena de texto
// 3. muestra el primer y carácter de un string
// let primera_letra = parte_1.slice(0,1)
// 4. Convierte a mayúsculas y minusculas un string
// 5. Crea una cadena de texto en varias lineas
// 6. Interpola el valor de una variable en un string
// 7. Reemplaza todos los espacios en blanco de un string por guiones
// 8. comprueba si una cadena de texto contiene una palabra concreta
// 9. Comprueba si dos strings son iguales
// 10. comprueba si 2 strings tienen la misma longitud.


