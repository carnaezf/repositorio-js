// ======================================================
// MÓDULO 4 - PROGRAMACIÓN AVANZADA EN JAVASCRIPT
// Lección: Consumo de API con JavaScript
// ======================================================

// Pregunta inicial para la clase:
//
// ¿De dónde vienen los datos que vemos en una página web?
//
// Muchas veces no están escritos directamente en el HTML.
// Pueden venir desde un servidor, una base de datos o una API.
//
// Hoy veremos cómo JavaScript puede pedir datos externos
// y luego mostrarlos en el DOM.



// ======================================================
// JS 1 - ¿QUÉ ES UNA API?
// ======================================================

// Una API permite que dos aplicaciones se comuniquen.
//
// En este ejemplo:
// - Nuestra página web será el cliente.
// - randomuser.me será el servidor externo.
// - JavaScript pedirá usuarios.
// - La API responderá con datos en formato JSON.



// ======================================================
// JS 2 - URL DE LA API
// ======================================================

// Guardamos en una variable la dirección desde donde pediremos datos.
// Esta API devuelve usuarios aleatorios.

const url = "https://randomuser.me/api/?results=10";



// ======================================================
// JS 3 - SELECCIONAR EL ELEMENTO DEL DOM
// ======================================================

// En el HTML debe existir un elemento con id="authors".
// Ahí vamos a insertar los usuarios recibidos desde la API.
//
// Ejemplo HTML sugerido:
//
// <ul id="authors" class="list-group"></ul>

const listaUsuarios = document.getElementById("authors");



// ======================================================
// JS 4 - PRIMER FETCH
// ======================================================

// fetch() permite hacer una petición HTTP desde JavaScript.
// En palabras simples: pide datos a una URL.
//
// fetch(url) devuelve una promesa.
// Por eso usamos .then() y .catch().

fetch(url)
    .then(function (respuesta) {
        // Esta primera respuesta todavía no son los datos listos.
        // Es la respuesta HTTP del servidor.

        console.log("Respuesta original del servidor:");
        console.log(respuesta);

        // Convertimos la respuesta a formato JSON.
        // json() también devuelve una promesa.
        return respuesta.json();
    })
    .then(function (data) {
        // Aquí ya tenemos los datos convertidos a objeto JavaScript.

        console.log("Datos convertidos a JSON:");
        console.log(data);

        // La API randomuser entrega los usuarios dentro de data.results.
        const usuarios = data.results;

        console.log("Arreglo de usuarios:");
        console.log(usuarios);

        // Recorremos el arreglo para mostrar cada usuario en pantalla.
        usuarios.forEach(function (usuario) {
            // Creamos un elemento li para cada usuario.
            const li = document.createElement("li");

            // Agregamos clases Bootstrap para que se vea mejor.
            li.className = "list-group-item d-flex align-items-center gap-3";

            // Creamos una imagen.
            const img = document.createElement("img");

            // La API entrega una imagen del usuario.
            img.src = usuario.picture.thumbnail;

            // Agregamos texto alternativo para buenas prácticas.
            img.alt = "Foto de usuario";

            // Usamos clases Bootstrap para redondear la imagen.
            img.className = "rounded-circle";

            // Creamos un span para el nombre.
            const span = document.createElement("span");

            // Mostramos nombre y apellido.
            span.textContent = `${usuario.name.first} ${usuario.name.last}`;

            // Agregamos la imagen y el texto dentro del li.
            li.appendChild(img);
            li.appendChild(span);

            // Finalmente agregamos el li dentro del ul.
            listaUsuarios.appendChild(li);
        });
    })
    .catch(function (error) {
        // catch se ejecuta si ocurre un error en la petición.
        // Por ejemplo: sin internet, URL incorrecta o problema del servidor.

        console.log("Ocurrió un error al consumir la API:");
        console.log(error);

        listaUsuarios.innerHTML = `
            <li class="list-group-item text-danger">
                No se pudieron cargar los usuarios.
            </li>
        `;
    });



// ======================================================
// JS 5 - MISMO EJEMPLO CON ASYNC / AWAIT
// ======================================================

// async/await permite escribir código asíncrono
// de una forma más parecida al código secuencial.
//
// Esta versión hace lo mismo que el fetch anterior,
// pero con una sintaxis más ordenada.

async function cargarUsuarios() {
    try {
        // Limpiamos la lista antes de cargar nuevos datos.
        listaUsuarios.innerHTML = "";

        // Mostramos un mensaje temporal mientras llegan los datos.
        listaUsuarios.innerHTML = `
            <li class="list-group-item">
                Cargando usuarios...
            </li>
        `;

        // await espera a que fetch termine.
        const respuesta = await fetch(url);

        // Validamos si la respuesta HTTP fue correcta.
        if (!respuesta.ok) {
            throw new Error("La respuesta del servidor no fue exitosa.");
        }

        // Convertimos la respuesta a JSON.
        const data = await respuesta.json();

        // Extraemos el arreglo de usuarios.
        const usuarios = data.results;

        // Limpiamos el mensaje "Cargando usuarios..."
        listaUsuarios.innerHTML = "";

        // Recorremos los usuarios.
        usuarios.forEach(function (usuario) {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex align-items-center gap-3";

            const img = document.createElement("img");
            img.src = usuario.picture.thumbnail;
            img.alt = "Foto de usuario";
            img.className = "rounded-circle";

            const span = document.createElement("span");
            span.textContent = `${usuario.name.first} ${usuario.name.last}`;

            li.appendChild(img);
            li.appendChild(span);

            listaUsuarios.appendChild(li);
        });

    } catch (error) {
        // Capturamos errores de forma controlada.

        console.log("Error controlado:");
        console.log(error);

        listaUsuarios.innerHTML = `
            <li class="list-group-item text-danger">
                No se pudieron cargar los usuarios.
            </li>
        `;
    }
}



// ======================================================
// JS 6 - BOTÓN PARA CARGAR USUARIOS
// ======================================================

// Si en el HTML tenemos un botón:
//
// <button id="btn-cargar" class="btn btn-primary">
//     Cargar usuarios
// </button>
//
// Podemos cargar los datos cuando el usuario haga clic.

const btnCargar = document.getElementById("btn-cargar");

if (btnCargar) {
    btnCargar.addEventListener("click", function () {
        cargarUsuarios();
    });
}



// ======================================================
// JS 7 - REFERENCIA BREVE A XHR
// ======================================================

// Antes de fetch(), se usaba mucho XMLHttpRequest.
// XHR también permite pedir datos a un servidor,
// pero su sintaxis es más extensa y menos cómoda.
//
// Lo importante por ahora:
//
// XHR y fetch sirven para pedir datos externos.
// fetch es más moderno, más limpio y trabaja con promesas.



// ======================================================
// JS 8 - CIERRE PEDAGÓGICO
// ======================================================

// Flujo completo de consumo de API:
//
// 1. Definir la URL.
// 2. Hacer la petición con fetch().
// 3. Convertir la respuesta a JSON.
// 4. Procesar los datos recibidos.
// 5. Crear elementos HTML.
// 6. Insertarlos en el DOM.
// 7. Controlar errores con catch o try/catch.
//
// Idea fuerza:
//
// Consumir una API significa pedir datos a otro sistema
// y usarlos dentro de nuestra aplicación.