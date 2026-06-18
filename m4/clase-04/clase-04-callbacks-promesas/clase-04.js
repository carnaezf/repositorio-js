// ======================================================
// MÓDULO 4 - PROGRAMACIÓN AVANZADA EN JAVASCRIPT
// Lección: JavaScript Asíncrono
// ======================================================

// Pregunta inicial para la clase:
//
// ¿Qué pasaría si una aplicación se quedara congelada
// cada vez que espera datos desde una API, una base de datos
// o un archivo?
//
// La programación asíncrona ayuda a evitar eso.
// Permite iniciar una tarea que demora,
// continuar con otras instrucciones,
// y volver a trabajar con el resultado cuando esté listo.



// ======================================================
// JS 1 - CÓDIGO SÍNCRONO
// ======================================================

// El código síncrono se ejecuta línea por línea.
// Cada instrucción espera a que termine la anterior.

console.log("1. Inicio del programa");

console.log("2. Ejecutando una tarea simple");

console.log("3. Fin del programa");

// Resultado esperado:
// 1. Inicio del programa
// 2. Ejecutando una tarea simple
// 3. Fin del programa

// Idea clave:
// En código síncrono, JavaScript sigue el orden exacto
// en que escribimos las instrucciones.



// ======================================================
// JS 2 - PRIMER CONTACTO CON ASINCRONÍA
// ======================================================

// setTimeout permite ejecutar una función después de cierto tiempo.
// El tiempo se escribe en milisegundos.
// 1000 milisegundos = 1 segundo.

console.log("A. Antes del setTimeout");

setTimeout(function () {
    console.log("B. Esto aparece después de 2 segundos");
}, 2000);

console.log("C. Después del setTimeout");

// Resultado esperado:
// A. Antes del setTimeout
// C. Después del setTimeout
// B. Esto aparece después de 2 segundos

// Idea clave:
// JavaScript no se queda esperando el setTimeout.
// Lo deja programado para después y continúa ejecutando el resto.



// ======================================================
// JS 3 - ¿QUÉ ES UN CALLBACK?
// ======================================================

// Un callback es una función que se pasa como argumento
// a otra función, para ser ejecutada después.

// Primero creamos una función normal.
function mostrarMensaje() {
    console.log("Mensaje ejecutado desde un callback");
}

// Ahora pasamos esa función como argumento de setTimeout.
setTimeout(mostrarMensaje, 3000);

// Ojo:
// No escribimos mostrarMensaje()
// porque eso ejecutaría la función inmediatamente.
//
// Escribimos mostrarMensaje sin paréntesis
// porque estamos entregando la función para que se ejecute después.



// ======================================================
// JS 4 - CALLBACK CON PARÁMETROS
// ======================================================

// En este ejemplo simulamos una tarea que demora,
// como consultar datos de un usuario.

function buscarUsuario(nombre, callback) {
    console.log(`Buscando usuario ${nombre}...`);

    setTimeout(function () {
        // Después de 2 segundos simulamos que encontramos el usuario.
        const usuario = {
            nombre: nombre,
            rol: "Estudiante",
            activo: true,
        };

        // Ejecutamos el callback y le entregamos el resultado.
        callback(usuario);
    }, 2000);
}

// Esta función será usada como callback.
function mostrarUsuario(usuario) {
    console.log("Usuario encontrado:");
    console.log(`Nombre: ${usuario.nombre}`);
    console.log(`Rol: ${usuario.rol}`);
    console.log(`Activo: ${usuario.activo}`);
}

// Invocamos la función principal.
// Le pasamos un dato y también una función callback.
buscarUsuario("Ana", mostrarUsuario);

// Idea clave:
// El callback permite decir:
// "cuando termines la tarea, ejecuta esta otra función".

// No usamos mostrarUsuario() porque eso ejecutaría la función inmediatamente.
// Usamos mostrarUsuario sin paréntesis porque queremos pasar la función como referencia.
// Así buscarUsuario podrá ejecutarla después, cuando termine la tarea asíncrona.
// buscarUsuario("Ana", mostrarUsuario);



// ======================================================
// JS 5 - CALLBACK COMO FUNCIÓN ANÓNIMA
// ======================================================

// También podemos escribir el callback directamente
// dentro de la llamada de la función.

buscarUsuario("Carlos", function (usuario) {
    console.log(`Resultado recibido para ${usuario.nombre}`);
});

// Esto es muy común en JavaScript,
// especialmente en eventos, arreglos y operaciones asíncronas.



// ======================================================
// JS 6 - CALLBACK EN MÉTODOS DE ARREGLOS
// ======================================================

// Muchas funciones nativas de JavaScript usan callbacks.
// Por ejemplo: map, filter, forEach.

const numeros = [1, 2, 3, 4];

// map recibe un callback.
// Ese callback se aplica a cada elemento del arreglo.
const numerosDuplicados = numeros.map(function (numero) {
    return numero * 2;
});

console.log(numerosDuplicados);

// Idea clave:
// Un callback no siempre es asíncrono.
// A veces simplemente es una función que otra función utiliza.



// ======================================================
// JS 7 - PROBLEMA DE LOS CALLBACKS
// ======================================================

// Los callbacks son útiles,
// pero cuando tenemos muchas tareas encadenadas,
// el código puede volverse difícil de leer.

// Ejemplo conceptual:
//
// buscarUsuario(function () {
//     buscarCursos(function () {
//         buscarNotas(function () {
//             mostrarResultado();
//         });
//     });
// });
//
// Esto se conoce como "callback hell"
// o pirámide de callbacks.

// Para mejorar esto aparecen las Promesas.



// ======================================================
// JS 8 - ¿QUÉ ES UNA PROMESA?
// ======================================================

// Una promesa representa una operación que todavía no termina,
// pero que en el futuro puede tener dos resultados:
//
// 1. Se resuelve correctamente.
// 2. Falla y se rechaza.
//
// Estados principales de una promesa:
// - pending: pendiente
// - fulfilled: cumplida
// - rejected: rechazada



// ======================================================
// JS 9 - CREAR UNA PROMESA SIMPLE
// ======================================================

const promesaSimple = new Promise(function (resolve, reject) {
    const tareaExitosa = true;

    setTimeout(function () {
        if (tareaExitosa) {
            resolve("La tarea terminó correctamente");
        } else {
            reject("La tarea falló");
        }
    }, 2000);
});

// then se ejecuta cuando la promesa se resuelve.
promesaSimple.then(function (respuesta) {
    console.log(respuesta);
});

// catch se ejecuta cuando la promesa se rechaza.
promesaSimple.catch(function (error) {
    console.log(error);
});

// Idea clave:
// resolve representa éxito.
// reject representa error.



// ======================================================
// JS 10 - THEN Y CATCH ENCADENADOS
// ======================================================

const consultarServidor = new Promise(function (resolve, reject) {
    const servidorDisponible = true;

    setTimeout(function () {
        if (servidorDisponible) {
            resolve("Datos recibidos desde el servidor");
        } else {
            reject("No se pudo conectar con el servidor");
        }
    }, 2000);
});

consultarServidor
    .then(function (respuesta) {
        console.log("Éxito:");
        console.log(respuesta);
    })
    .catch(function (error) {
        console.log("Error:");
        console.log(error);
    });

// Idea clave:
// Las promesas ordenan mejor el flujo:
// primero intento obtener datos,
// luego proceso la respuesta,
// y si falla, capturo el error.



// ======================================================
// JS 11 - PROMESA CON DATOS
// ======================================================

// Ahora simularemos la carga de productos.
// Este ejemplo se parece más a consumir una API.

function obtenerProductos() {
    return new Promise(function (resolve, reject) {
        const exito = true;

        setTimeout(function () {
            if (exito) {
                const productos = [
                    { id: 1, nombre: "Café", precio: 4500 },
                    { id: 2, nombre: "Té", precio: 3000 },
                    { id: 3, nombre: "Galletas", precio: 2500 },
                ];

                resolve(productos);
            } else {
                reject("No se pudieron obtener los productos");
            }
        }, 2000);
    });
}

obtenerProductos()
    .then(function (productos) {
        console.log("Productos recibidos:");

        productos.forEach(function (producto) {
            console.log(`${producto.nombre} - $${producto.precio}`);
        });
    })
    .catch(function (error) {
        console.log(error);
    });

// Idea clave:
// Una promesa puede devolver textos, números,
// objetos, arreglos o cualquier dato que necesitemos procesar.



// ======================================================
// JS 12 - ASYNC / AWAIT
// ======================================================

// async/await es una forma más moderna y legible
// de trabajar con promesas.

// async indica que una función trabajará con asincronía.
// await espera el resultado de una promesa,
// pero solo dentro de una función async.

async function mostrarProductos() {
    const productos = await obtenerProductos();

    console.log("Productos usando async/await:");

    productos.forEach(function (producto) {
        console.log(`${producto.nombre} - $${producto.precio}`);
    });
}

mostrarProductos();

// Idea clave:
// async/await hace que el código asíncrono se lea
// más parecido a código normal o secuencial.



// ======================================================
// JS 13 - ASYNC / AWAIT CON TRY CATCH
// ======================================================

// En código real siempre debemos controlar errores.
// Para eso usamos try/catch.

function obtenerUsuarioPorId(id) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (id > 0) {
                resolve({
                    id: id,
                    nombre: "María",
                    rol: "Administradora",
                });
            } else {
                reject("El id del usuario no es válido");
            }
        }, 2000);
    });
}

async function mostrarUsuarioPorId() {
    try {
        console.log("Buscando usuario...");

        const usuario = await obtenerUsuarioPorId(1);

        console.log("Usuario encontrado:");
        console.log(usuario);
    } catch (error) {
        console.log("Ocurrió un error:");
        console.log(error);
    }
}

mostrarUsuarioPorId();

// Idea clave:
// try contiene el código que queremos intentar ejecutar.
// catch captura el error si la promesa falla.



// ======================================================
// JS 14 - EJEMPLO CON ERROR CONTROLADO
// ======================================================

async function probarError() {
    try {
        console.log("Probando búsqueda con id incorrecto...");

        const usuario = await obtenerUsuarioPorId(0);

        console.log(usuario);
    } catch (error) {
        console.log("Error controlado correctamente:");
        console.log(error);
    }
}

probarError();

// Idea clave:
// Los errores no deben romper la aplicación.
// Deben ser capturados y tratados de forma controlada.



// ======================================================
// JS 15 - COMPARACIÓN FINAL
// ======================================================

// Callback:
// - Es una función que se pasa a otra función.
// - Útil para eventos y tareas simples.
// - Puede volverse difícil de leer si se encadena mucho.

// Promesa:
// - Representa una tarea pendiente.
// - Puede resolverse o rechazarse.
// - Usa then y catch.

// Async / Await:
// - Es una forma moderna de trabajar con promesas.
// - Hace el código más legible.
// - Se combina muy bien con try/catch.



// ======================================================
// MINI RETO PARA LA CLASE
// ======================================================

// Desafío:
// Crear una función llamada cargarPerfilUsuario()
// que retorne una promesa.
//
// Si todo sale bien, debe resolver un objeto:
//
// {
//   nombre: "Ana",
//   curso: "JavaScript Avanzado"
// }
//
// Si algo falla, debe rechazar con el mensaje:
//
// "No se pudo cargar el perfil"
//
// Luego consumir esa promesa usando async/await
// y controlar el error con try/catch.



// ======================================================
// CIERRE PEDAGÓGICO
// ======================================================

// Frase final:
//
// JavaScript asíncrono nos permite trabajar con tareas que demoran,
// como temporizadores, APIs, archivos o bases de datos,
// sin congelar toda la aplicación.
//
// En desarrollo web real, esta idea es fundamental
// porque casi siempre estaremos esperando datos externos.