/*
    Ejercicio:
    Funciones Callback en JavaScript

    Objetivo:
    Practicar el uso de funciones callback para:
    - validar datos ingresados por el usuario
    - ejecutar cálculos
    - esperar algunos segundos antes de mostrar un resultado
*/

/* ============================================================
   1. FUNCIÓN VALIDAR NÚMERO
============================================================ */

/*
    Esta función recibe un callback.

    Primero solicita un dato al usuario mediante prompt().
    Luego valida si el dato ingresado corresponde a un número.
    Finalmente ejecuta el callback y le entrega el resultado.
*/

function validar_numero(callback) {
    let dato = prompt("Ingrese un número:");

    let numero = parseFloat(dato);

    if (!isNaN(numero)) {
        callback(true, numero);
    } else {
        callback(false, dato);
    }
}

/*
    Callback para mostrar el resultado de la validación.
*/

function mostrar_validacion(esValido, valor) {
    if (esValido) {
        console.log("Número válido:", valor);

        document.getElementById("resultado").innerHTML = `
            <strong>Validación correcta:</strong><br>
            Usted ingresó el número ${valor}.
        `;
    } else {
        console.log("Dato inválido:", valor);

        document.getElementById("resultado").innerHTML = `
            <strong>Error:</strong><br>
            Usted ingresó caracteres incorrectos.
        `;
    }
}



/* ============================================================
   2. SUMATORIA DE NÚMEROS IMPARES CON CALLBACK
============================================================ */

/*
    Esta función recibe:
    - numero: límite superior de la sumatoria
    - callback: función que se ejecutará después de 5 segundos

    Debe sumar los números impares entre 1 y numero.
*/

function calcular_y_avisar_despues(numero, callback) {
    let sumatoria = 0;

    for (let i = 1; i <= numero; i++) {
        if (i % 2 !== 0) {
            sumatoria = sumatoria + i;
        }
    }

    console.log("Sumatoria de impares calculada:", sumatoria);
    console.log("Esperando 5 segundos...");

    document.getElementById("resultado").innerHTML = `
        Calculando sumatoria de impares entre 1 y ${numero}...<br>
        Espere 5 segundos.
    `;

    setTimeout(function () {
        callback(sumatoria);
    }, 5000);
}

/*
    Callback que muestra la sumatoria luego de los 5 segundos.
*/

function mostrar_sumatoria_impares(resultado) {
    console.log("El valor de la sumatoria es:", resultado);

    document.getElementById("resultado").innerHTML = `
        El valor de la sumatoria es <strong>${resultado}</strong>.<br>
        Este resultado se obtuvo hace 5 segundos.
    `;
}



/* ============================================================
   3. SUMATORIAS SUCESIVAS CON CALLBACK Y CALLBACK_ERROR
============================================================ */

/*
    Esta función recibe:
    - numero
    - callback
    - callback_error

    Debe calcular sumatorias sucesivas.

    Ejemplo con numero = 5:

    1
    1 + 2
    1 + 2 + 3
    1 + 2 + 3 + 4
    1 + 2 + 3 + 4 + 5

    Resultado total:
    1 + 3 + 6 + 10 + 15 = 35
*/

function calcular_y_avisar_dependiendo(numero, callback, callback_error) {
    let resultado = 0;

    for (let i = 1; i <= numero; i++) {
        let sumaParcial = 0;

        for (let j = 1; j <= i; j++) {
            sumaParcial = sumaParcial + j;
        }

        resultado = resultado + sumaParcial;

        console.log("Suma parcial hasta", i, "=", sumaParcial);
    }

    console.log("Resultado total:", resultado);

    if (resultado < 1000) {
        callback(numero, resultado);
    } else {
        callback_error(numero, resultado);
    }
}

/*
    Callback de éxito.
*/

function mostrar_sumatoria_sucesiva(numero, resultado) {
    document.getElementById("resultado").innerHTML = `
        Las sumatorias sucesivas de <strong>${numero}</strong> es 
        <strong>${resultado}</strong>.
    `;
}

/*
    Callback de error.
*/

function mostrar_error_sumatoria(numero, resultado) {
    document.getElementById("resultado").innerHTML = `
        El número <strong>${numero}</strong> sobrepasa el objetivo de la función.<br>
        Resultado obtenido: <strong>${resultado}</strong>.
    `;
}



/* ============================================================
   4. CONEXIÓN CON LOS BOTONES DEL HTML
============================================================ */

/*
    Botón 1:
    Ejecuta la función validar_numero().
*/

document.getElementById("btn-validar").addEventListener("click", function () {
    validar_numero(mostrar_validacion);
});

/*
    Botón 2:
    Solicita un número y calcula la sumatoria de impares.
*/

document.getElementById("btn-impares").addEventListener("click", function () {
    let dato = prompt("Ingrese un número para calcular la sumatoria de impares:");

    let numero = parseInt(dato);

    if (isNaN(numero)) {
        document.getElementById("resultado").innerHTML = `
            Debe ingresar un número válido.
        `;
    } else {
        calcular_y_avisar_despues(numero, mostrar_sumatoria_impares);
    }
});

/*
    Botón 3:
    Solicita un número y calcula las sumatorias sucesivas.
*/

document.getElementById("btn-sucesivas").addEventListener("click", function () {
    let dato = prompt("Ingrese un número para calcular las sumatorias sucesivas:");

    let numero = parseInt(dato);

    if (isNaN(numero)) {
        document.getElementById("resultado").innerHTML = `
            Debe ingresar un número válido.
        `;
    } else {
        calcular_y_avisar_dependiendo(
            numero,
            mostrar_sumatoria_sucesiva,
            mostrar_error_sumatoria
        );
    }
});