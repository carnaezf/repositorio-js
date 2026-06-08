/*
    Ejercicio:
    Identificación del mayor y menor con ordenamiento burbuja.

    Desafío:
    El programa debe solicitar tres números al usuario,
    guardarlos en un arreglo, ordenarlos con burbuja
    y mostrar el menor y el mayor.
*/

// 1. Crear un arreglo vacío para guardar los números
let numeros = [];

// 2. Solicitar el primer número al usuario
let numero1 = prompt("Ingrese número 1:");

// 3. Convertir el valor ingresado a número decimal
numero1 = parseFloat(numero1);

// 4. Guardar el número dentro del arreglo
numeros.push(numero1);

// 5. Repetir el proceso para el segundo número
let numero2 = prompt("Ingrese número 2:");
numero2 = parseFloat(numero2);
numeros.push(numero2);

// 6. Repetir el proceso para el tercer número
let numero3 = prompt("Ingrese número 3:");
numero3 = parseFloat(numero3);
numeros.push(numero3);

// 7. Mostrar el arreglo original en consola
console.log("Arreglo ingresado:", numeros);

/*
    8. Ordenamiento burbuja

    La idea del algoritmo burbuja es comparar dos elementos consecutivos.
    Si el primero es mayor que el segundo, se intercambian.

    Ejemplo:
    [8, 3, 10]

    Compara 8 y 3:
    como 8 > 3, se intercambian:
    [3, 8, 10]
*/

// Variable para saber si hubo cambios durante una vuelta
let huboCambio;

// Ciclo do-while para repetir mientras existan intercambios
do {
    // Antes de cada vuelta asumimos que no habrá cambios
    huboCambio = false;

    // Recorrer el arreglo hasta el penúltimo elemento
    for (let i = 0; i < numeros.length - 1; i++) {

        // Comparar el elemento actual con el siguiente

        // Descomenta comentario multilinea
    
        if (numeros[i] > numeros[i + 1]) {

            
                // Completar:
                // Guardar temporalmente numeros[i]
                // Reemplazar numeros[i] por numeros[i + 1]
                // Reemplazar numeros[i + 1] por el valor temporal
           

            let temporal = numeros[i];

            // Completar intercambio
            numeros[i] = numeros[i + 1];
            numeros[i + 1] = temporal;

            // Indicar que sí hubo un cambio
            huboCambio = true;
        }



    }

} while (huboCambio);

// 9. Mostrar arreglo ordenado en consola
console.log("Arreglo ordenado:", numeros);

// 10. Obtener el menor y el mayor
let menor = numeros[0];
let mayor = numeros[numeros.length - 1];

// 11. Validar si todos los números son iguales
if (menor === mayor) {
    document.write(`
        <main style="font-family: Arial; padding: 32px;">
            <h1>Caso especial</h1>
            <p>Arreglo ingresado: [${numero1}, ${numero2}, ${numero3}]</p>
            <p>Arreglo ordenado (burbuja): [${numeros}]</p>
            <p>Los tres números son idénticos. No hay mayor/menor distintos.</p>
        </main>
    `);
} else {
    document.write(`
        <main style="font-family: Arial; padding: 32px;">
            <h1>Resultado del ejercicio</h1>
            <p>Arreglo ingresado: [${numero1}, ${numero2}, ${numero3}]</p>
            <p>Arreglo ordenado (burbuja): [${numeros}]</p>
            <p>Menor: ${menor} | Mayor: ${mayor}</p>
        </main>
    `);
}