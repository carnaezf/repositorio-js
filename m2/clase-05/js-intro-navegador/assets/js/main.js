function mensajeExterno() {
    alert("Hola! Soy JS externo");
    console.log("Mensaje desde JS externo");
}

console.log("=== EJEMPLOS DE let, const, var Y HOISTING ===");

// ======================
// 1. EJEMPLO LET
// ======================
console.log("\n--- let ---");

let nombre = "Ana";
console.log("Valor inicial de nombre:", nombre);

nombre = "Carlos"; // reasignación permitida
console.log("Valor reasignado:", nombre);


// ======================
// 2. EJEMPLO CONST
// ======================
console.log("\n--- const ---");

const PI = 3.1416;
console.log("Valor de PI:", PI);

// PI = 3.15; // ❌ ERROR (si lo activas se rompe el script)


// ======================
// 3. EJEMPLO VAR
// ======================
console.log("\n--- var ---");


var fruta = "Manzana";
console.log("Valor inicial de fruta:", fruta);

fruta = "Pera"; // reasignación permitida
console.log("Valor reasignado:", fruta);

// ======================
// 4. EJEMPLO HOISTING (simple y sin try/catch)
// ======================
console.log("\n--- Hoisting ---");


{
    console.log("Valor de comida ANTES de declararla (var):", comida);
    // → undefined (la declaración se eleva)

    var comida = "Pizza";
    console.log("Valor de comida DESPUÉS de declararla (var):", comida);
}


// Ejemplo con let (NO ejecutar antes de declararla)
// Esta parte se deja comentada porque rompería el script:
/*
{
    console.log(bebida); 
    // ❌ ERROR: Cannot access 'bebida' before initialization
    let bebida = "Jugo";
}
*/

// Ejemplo correcto con let
{
    let bebida = "Jugo";
    console.log("Valor de bebida con let:", bebida);
}


console.log("=== RESUMEN DE OPERADORES EN JAVASCRIPT ===");


// OPERADORES

// ======================
// 1. OPERADORES ARITMÉTICOS
// ======================
console.log("\n--- Aritméticos ---");

let a = 5;
let b = 10;

console.log("Suma:", a + b);
console.log("Resta:", a - b);
console.log("Multiplicación:", a * b);
console.log("División:", a / b);
console.log("Módulo:", a % b);
console.log("Potencia:", a ** b);

a++; 
console.log("Incremento de a:", a);

b--;
console.log("Decremento de b:", b);



// ======================
// 2. OPERADORES DE ASIGNACIÓN
// ======================
console.log("\n--- Asignación ---");

let myVariable = 2;
console.log("Valor inicial:", myVariable);

myVariable += 2; // suma y reasigna
console.log("Después de += 2:", myVariable);



// ======================
// 3. OPERADORES DE COMPARACIÓN
// ======================
console.log("\n--- Comparación ---");

console.log("a > b:", a > b);
console.log("a < b:", a < b);
console.log("10 >= 10:", 10 >= 10);

console.log("a == 6 (valor):", a == 6);
console.log('a == "6" (valor):', a == "6");
console.log('a === "6" (valor y tipo):', a === "6");
console.log("a === 6:", a === 6);

console.log("a != 6:", a != 6);
console.log("a !== '6':", a !== "6");



// ======================
// 4. TRUTHY y FALSY (demostración)
// ======================
console.log("\n--- Truthy / Falsy ---");

console.log("0 == false:", 0 == false);
console.log('"" == false:', "" == false);
console.log("undefined == null:", undefined == null);
console.log("undefined === null:", undefined === null);



// ======================
// 5. OPERADORES LÓGICOS
// ======================
console.log("\n--- Lógicos ---");

// AND &&
console.log("true && false:", true && false);

// OR ||
console.log("true || false:", true || false);

// NOT !
console.log("!true:", !true);
console.log("!(true || false):", !(true || false));



// ======================
// 6. OPERADOR TERNARIO
// ======================
console.log("\n--- Operador ternario ---");

const isRaining = false;

const mensajeClima = isRaining 
  ? "Está lloviendo" 
  : "No está lloviendo";

console.log(mensajeClima);

