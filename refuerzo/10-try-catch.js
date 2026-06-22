// ======================================================
// MÓDULO 4 - PROGRAMACIÓN AVANZADA EN JAVASCRIPT
// Micro clase: try / catch
// ======================================================

// Pregunta inicial:
//
// ¿Qué pasa si una parte del programa falla?
//
// Por ejemplo:
// - el usuario ingresa un dato incorrecto;
// - una API no responde;
// - intentamos usar una variable que no existe;
// - intentamos convertir datos inválidos.
//
// Si no controlamos el error, el programa puede detenerse.
// Para manejar errores usamos try / catch.



// ======================================================
// JS 1 - ERROR SIN CONTROL
// ======================================================

// Este código genera un error porque "persona" no existe.

// console.log(persona.nombre);

// Si descomentamos esa línea, JavaScript mostrará un error
// y puede detener la ejecución del programa.

// Idea clave:
// Un error sin controlar puede romper el flujo del programa.



// ======================================================
// JS 2 - PRIMER TRY / CATCH
// ======================================================

// try significa: "intenta ejecutar este código".
// catch significa: "si ocurre un error, captúralo aquí".

try {
    console.log(persona.nombre);
} catch (error) {
    console.log("Ocurrió un error, pero fue controlado.");
    console.log(error);
}

// Idea clave:
// El programa no se rompe completamente,
// porque el error fue capturado por catch.



// ======================================================
// JS 3 - PROGRAMA CONTINÚA DESPUÉS DEL ERROR
// ======================================================

try {
    console.log("Intentando ejecutar una operación...");
    console.log(persona.nombre);
} catch (error) {
    console.log("No se pudo ejecutar la operación.");
}

console.log("El programa sigue funcionando.");

// Idea clave:
// try/catch permite manejar el error
// y continuar con otras instrucciones.



// ======================================================
// JS 4 - CAPTURAR INFORMACIÓN DEL ERROR
// ======================================================

try {
    let resultado = 10 / 2;
    console.log(resultado);

    // Forzamos un error usando una variable no declarada.
    console.log(datoInexistente);

} catch (error) {
    console.log("Nombre del error:");
    console.log(error.name);

    console.log("Mensaje del error:");
    console.log(error.message);
}

// Idea clave:
// El objeto error trae información útil para depurar.



// ======================================================
// JS 5 - LANZAR NUESTRO PROPIO ERROR CON THROW
// ======================================================

// throw permite crear un error de forma manual.
// Lo usamos cuando detectamos una condición inválida.

function dividir(a, b) {
    if (b === 0) {
        throw new Error("No se puede dividir por cero");
    }

    return a / b;
}

try {
    const resultado = dividir(10, 0);
    console.log(resultado);
} catch (error) {
    console.log("Error controlado:");
    console.log(error.message);
}

// Idea clave:
// throw permite avisar que algo no debería continuar.



// ======================================================
// JS 6 - VALIDACIÓN SIMPLE DE DATOS
// ======================================================

function registrarUsuario(nombre) {
    if (!nombre) {
        throw new Error("El nombre es obligatorio");
    }

    console.log(`Usuario ${nombre} registrado correctamente`);
}

try {
    registrarUsuario("");
} catch (error) {
    console.log("No se pudo registrar el usuario:");
    console.log(error.message);
}

// Idea clave:
// try/catch también sirve para validar reglas del programa.



// ======================================================
// JS 7 - TRY / CATCH CON ASYNC / AWAIT
// ======================================================

// En código asíncrono moderno,
// try/catch se usa mucho con async/await.

async function cargarUsuarios() {
    try {
        console.log("Solicitando usuarios...");

        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!respuesta.ok) {
            throw new Error("Error al consultar la API");
        }

        const usuarios = await respuesta.json();

        console.log("Usuarios cargados:");
        console.log(usuarios);

    } catch (error) {
        console.log("No se pudieron cargar los usuarios:");
        console.log(error.message);
    }
}

cargarUsuarios();

// Idea clave:
// try/catch permite manejar errores cuando usamos await.



// ======================================================
// JS 8 - ERROR COMÚN
// ======================================================

// try/catch NO corrige el error automáticamente.
// Solo permite capturarlo y decidir qué hacer.

// Mal entendido común:
//
// "Si uso try/catch, el programa se arregla solo."
//
// No.
// try/catch permite responder al error:
// - mostrar un mensaje;
// - registrar el error;
// - evitar que el programa se detenga;
// - ejecutar una alternativa.



// ======================================================
// CIERRE PEDAGÓGICO
// ======================================================

// Resumen:
//
// try:
// - contiene el código que queremos intentar ejecutar.
//
// catch:
// - captura el error si algo falla dentro del try.
//
// error:
// - es el objeto que contiene información del problema.
//
// throw:
// - permite lanzar un error manualmente.
//
// Idea fuerza:
//
// try/catch no evita que existan errores.
// Nos permite manejarlos de forma controlada.