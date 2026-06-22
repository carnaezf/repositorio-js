// ======================================================
// MÓDULO 4 - PROGRAMACIÓN AVANZADA EN JAVASCRIPT
// Mini clase: async / await
// ======================================================

// Pregunta inicial:
//
// ¿Qué pasa cuando JavaScript necesita esperar algo?
//
// Por ejemplo:
// - datos desde una API;
// - una respuesta del servidor;
// - una consulta a una base de datos;
// - una operación que demora.
//
// Si JavaScript se quedara detenido esperando,
// la aplicación podría sentirse lenta o bloqueada.
//
// Para trabajar mejor con tareas que demoran,
// usamos programación asíncrona.



// ======================================================
// JS 1 - EJEMPLO BASE CON PROMESA
// ======================================================

// Una promesa representa una tarea que puede terminar bien o mal.
// En este ejemplo simulamos una tarea que demora 2 segundos.

function obtenerMensaje() {
    
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("Datos recibidos correctamente");
        }, 2000);
    });
}

// Esta función NO entrega el resultado inmediatamente.
// Entrega una promesa.

console.log("Antes de llamar a la promesa");

obtenerMensaje().then(function (respuesta) {
    console.log(respuesta);
});

console.log("Después de llamar a la promesa");

// Resultado esperado:
//
// Antes de llamar a la promesa
// Después de llamar a la promesa
// Datos recibidos correctamente

// Idea clave:
// JavaScript no se queda esperando la promesa.
// Continúa ejecutando el resto del código.



// ======================================================
// JS 2 - ¿QUÉ ES ASYNC?
// ======================================================

// async se escribe antes de una función.
// Indica que esa función trabajará con código asíncrono.

// Una función async siempre devuelve una promesa,
// aunque dentro parezca una función normal.

async function saludarAsync() {
    return "Hola desde una función async";
}

saludarAsync().then(function (mensaje) {
    console.log(mensaje);
});

// Idea clave:
// async permite preparar una función para usar await.



// ======================================================
// JS 3 - ¿QUÉ ES AWAIT?
// ======================================================

// await significa "espera el resultado de esta promesa".
// Solo se puede usar dentro de una función async.

async function mostrarMensaje() {
    console.log("Buscando mensaje...");

    // await espera a que obtenerMensaje() se resuelva.
    const respuesta = await obtenerMensaje();

    // Esta línea se ejecuta después de recibir la respuesta.
    console.log(respuesta);
}

mostrarMensaje();

// Idea clave:
// await hace que el código se lea de forma más ordenada,
// como si fuera paso a paso.



// ======================================================
// JS 4 - COMPARACIÓN THEN VS ASYNC/AWAIT
// ======================================================

// Ambas formas hacen lo mismo.
// Primero veamos con then.

function obtenerUsuario() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            const usuario = {
                nombre: "Ana",
                curso: "JavaScript Avanzado",
                activo: true,
            };

            resolve(usuario);
        }, 2000);
    });
}

// Forma 1: usando then

obtenerUsuario().then(function (usuario) {
    console.log("Usuario usando then:");
    console.log(usuario);
});

// Forma 2: usando async / await

async function mostrarUsuario() {
    const usuario = await obtenerUsuario();

    console.log("Usuario usando async/await:");
    console.log(usuario);
}

mostrarUsuario();

// Idea clave:
// then y async/await trabajan con promesas.
// async/await no reemplaza las promesas;
// solo entrega una sintaxis más clara para usarlas.



// ======================================================
// JS 5 - ASYNC / AWAIT CON TRY CATCH
// ======================================================

// Cuando una promesa puede fallar,
// debemos manejar el error.

// Para eso usamos try/catch.

function obtenerProducto(id) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (id > 0) {
                const producto = {
                    id: id,
                    nombre: "Café",
                    precio: 4500,
                };

                resolve(producto);
            } else {
                reject("El id del producto no es válido");
            }
        }, 2000);
    });
}

async function mostrarProducto() {
    try {
        console.log("Buscando producto...");

        // Intentamos obtener el producto.
        const producto = await obtenerProducto(1);

        console.log("Producto encontrado:");
        console.log(producto);

    } catch (error) {
        // Si ocurre un error, se captura aquí.
        console.log("Ocurrió un error:");
        console.log(error);
    }
}

mostrarProducto();

// Idea clave:
// try contiene el código que queremos intentar ejecutar.
// catch captura el error si algo falla.



// ======================================================
// JS 6 - PROBAR UN ERROR CONTROLADO
// ======================================================

async function probarProductoInvalido() {
    try {
        console.log("Buscando producto inválido...");

        // Enviamos un id incorrecto para provocar el error.
        const producto = await obtenerProducto(0);

        console.log(producto);

    } catch (error) {
        console.log("Error controlado correctamente:");
        console.log(error);
    }
}

probarProductoInvalido();

// Idea clave:
// El error no rompe todo el programa,
// porque lo estamos manejando con catch.



// ======================================================
// JS 7 - EJEMPLO CON FETCH
// ======================================================

// fetch devuelve una promesa.
// Por eso se puede usar con async / await.

// Este ejemplo consume una API pública.

async function cargarUsuarios() {
    try {
        console.log("Solicitando usuarios a la API...");

        // Paso 1: hacemos la petición HTTP.
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");

        // Paso 2: validamos si la respuesta fue correcta.
        if (!respuesta.ok) {
            throw new Error("La respuesta del servidor no fue exitosa");
        }

        // Paso 3: convertimos la respuesta a JSON.
        const usuarios = await respuesta.json();

        // Paso 4: usamos los datos.
        console.log("Usuarios recibidos:");

        usuarios.forEach(function (usuario) {
            console.log(`${usuario.name} - ${usuario.email}`);
        });

    } catch (error) {
        console.log("No se pudieron cargar los usuarios:");
        console.log(error);
    }
}

cargarUsuarios();

// Idea clave:
// Este flujo es muy común en aplicaciones reales:
//
// 1. Pedir datos con fetch.
// 2. Esperar la respuesta.
// 3. Convertir a JSON.
// 4. Procesar la información.
// 5. Controlar errores.



// ======================================================
// JS 8 - EJEMPLO CON API Y CLASE
// ======================================================

// Ahora conectamos async/await con Programación Orientada a Objetos.
// La clase será responsable de cargar y administrar los datos.

class GestorUsuarios {
    constructor() {
        // Partimos con un arreglo vacío.
        this.usuarios = [];
    }

    async cargarUsuarios() {
        try {
            console.log("Cargando usuarios desde la clase...");

            const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await respuesta.json();

            // Guardamos los datos dentro de la clase.
            this.usuarios = data;

            console.log("Usuarios guardados en la clase:");
            console.log(this.usuarios);

        } catch (error) {
            console.log("Error al cargar usuarios:");
            console.log(error);
        }
    }

    listarNombres() {
        console.log("Listado de nombres:");

        this.usuarios.forEach(function (usuario) {
            console.log(usuario.name);
        });
    }
}

// Creamos una instancia de la clase.
const gestor = new GestorUsuarios();

// Como cargarUsuarios es async,
// esperamos a que cargue antes de listar.

async function iniciarPrograma() {
    await gestor.cargarUsuarios();

    // Esta línea se ejecuta cuando los usuarios ya fueron cargados.
    gestor.listarNombres();
}

iniciarPrograma();

// Idea clave:
// Si un método carga datos de una API,
// probablemente debe ser async.
// Y si otra parte del programa depende de esos datos,
// debe esperar con await.



// ======================================================
// JS 9 - ERROR COMÚN
// ======================================================

// Error común:
//
// const usuarios = gestor.cargarUsuarios();
// console.log(usuarios);
//
// Eso no entrega directamente los usuarios,
// porque cargarUsuarios trabaja de forma asíncrona.
//
// Si necesitamos esperar el resultado,
// usamos await dentro de una función async.



// ======================================================
// CIERRE PEDAGÓGICO
// ======================================================

// Resumen:
//
// async:
// - Se usa para declarar una función asíncrona.
// - Permite usar await dentro de esa función.
// - Siempre devuelve una promesa.
//
// await:
// - Espera el resultado de una promesa.
// - Solo puede usarse dentro de funciones async.
// - Hace que el código asíncrono sea más fácil de leer.
//
// try/catch:
// - Permite manejar errores.
// - Evita que el programa se rompa sin control.
//
// Idea fuerza:
//
// async/await no elimina la asincronía.
// Nos ayuda a escribirla de una forma más ordenada,
// especialmente cuando trabajamos con APIs.