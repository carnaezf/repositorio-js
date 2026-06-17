// ======================================================
// MÓDULO 4 - PROGRAMACIÓN AVANZADA EN JAVASCRIPT
// Lección 03 - Eventos y Manipulación del DOM
// ======================================================

// Pregunta inicial para la clase:
// Si HTML crea la estructura de una página,
// ¿cómo puede JavaScript cambiar esa estructura mientras el usuario interactúa?



// ======================================================
// JS 1: DOMContentLoaded
// ======================================================

// DOMContentLoaded se ejecuta cuando el HTML ya fue cargado por el navegador.
// Es útil para asegurarnos de que los elementos existen antes de seleccionarlos.
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM cargado correctamente.");

    // Desde aquí llamamos funciones de ejemplo para mantener el código ordenado.
    probarSelectores();
    configurarEventos();
});



// ======================================================
// JS 2: SELECCIONAR ELEMENTOS DEL DOM
// ======================================================

function probarSelectores() {
    // getElementById selecciona UN elemento por su id.
    const tituloPorId = document.getElementById("titulo-selector");
    console.log("Elemento seleccionado por ID:", tituloPorId);

    // getElementsByClassName selecciona varios elementos por clase.
    // Retorna una colección similar a un arreglo.
    const parrafosPorClase = document.getElementsByClassName("texto-selector");
    console.log("Elementos seleccionados por clase:", parrafosPorClase);

    // getElementsByName selecciona elementos por el atributo name.
    const elementosPorName = document.getElementsByName("parrafo-demo");
    console.log("Elementos seleccionados por name:", elementosPorName);

    // getElementsByTagName selecciona elementos por etiqueta HTML.
    const todosLosParrafos = document.getElementsByTagName("p");
    console.log("Todos los párrafos del documento:", todosLosParrafos);

    // querySelector usa sintaxis similar a CSS y retorna el primer elemento encontrado.
    const primerParrafoClase = document.querySelector(".texto-selector");
    console.log("Primer elemento con querySelector:", primerParrafoClase);

    // querySelectorAll usa sintaxis CSS y retorna todos los elementos que coinciden.
    const todosLosParrafosClase = document.querySelectorAll(".texto-selector");
    console.log("Todos los elementos con querySelectorAll:", todosLosParrafosClase);

    // Modificación simple para demostrar que el elemento seleccionado puede ser cambiado.
    tituloPorId.textContent = "Título modificado desde JavaScript";
}



// ======================================================
// JS 3: EVENTO ONCLICK
// ======================================================

// Esta función se llama desde el botón del HTML usando onclick.
// Es una forma válida y fácil para iniciar, aunque más adelante preferiremos addEventListener.
function cambiarTextoClick() {
    const titulo = document.getElementById("titulo-click");
    const parrafo = document.getElementById("parrafo-click");

    // textContent permite modificar el texto de un elemento.
    titulo.textContent = "Texto cambiado con onclick";

    // innerHTML permite insertar contenido HTML.
    // Se debe usar con cuidado si el contenido viene desde usuarios externos.
    parrafo.innerHTML = "Ahora este párrafo fue modificado usando <strong>JavaScript</strong>.";
}



// ======================================================
// JS 4: CONFIGURAR EVENTOS CON addEventListener
// ======================================================

function configurarEventos() {
    // addEventListener permite escuchar eventos sin escribir JS dentro del HTML.
    // Esta es una práctica más ordenada para proyectos reales.

    configurarEventoEstilos();
    configurarEventoAgregarTarea();
    configurarEventoBlur();
    configurarEventoKeydown();
    configurarEventoSubmit();
}



// ======================================================
// JS 5: MODIFICAR ESTILOS Y CLASES
// ======================================================

function configurarEventoEstilos() {
    const caja = document.getElementById("caja-estilos");
    const btnEstiloDirecto = document.getElementById("btn-estilo-directo");
    const btnClaseBootstrap = document.getElementById("btn-clase-bootstrap");

    btnEstiloDirecto.addEventListener("click", function () {
        // style permite modificar CSS directamente desde JavaScript.
        // Es útil para casos puntuales, pero puede ensuciar el código si se abusa.
        caja.style.borderWidth = "3px";
        caja.style.borderStyle = "dashed";
        caja.style.padding = "32px";
    });

    btnClaseBootstrap.addEventListener("click", function () {
        // classList permite agregar, quitar o alternar clases.
        // Esto suele ser más limpio que modificar muchos estilos en línea.
        caja.classList.toggle("caja-activa");
    });
}



// ======================================================
// JS 6: CREAR Y AGREGAR ELEMENTOS AL DOM
// ======================================================

function configurarEventoAgregarTarea() {
    const inputTarea = document.getElementById("input-tarea");
    const btnAgregar = document.getElementById("btn-agregar-tarea");
    const listaTareas = document.getElementById("lista-tareas");

    btnAgregar.addEventListener("click", function () {
        const textoTarea = inputTarea.value.trim();

        // Validamos que el usuario no agregue una tarea vacía.
        if (textoTarea === "") {
            alert("Debe escribir una tarea antes de agregarla.");
            return;
        }

        // createElement crea una etiqueta HTML desde JavaScript.
        const nuevaTarea = document.createElement("li");

        // Agregamos clases Bootstrap al nuevo elemento.
        nuevaTarea.className = "list-group-item d-flex justify-content-between align-items-center";

        // textContent agrega texto de forma segura.
        nuevaTarea.textContent = textoTarea;

        // Creamos un botón para eliminar la tarea.
        const botonEliminar = document.createElement("button");
        botonEliminar.className = "btn btn-sm btn-outline-danger";
        botonEliminar.textContent = "Eliminar";

        // Evento para eliminar el elemento creado.
        botonEliminar.addEventListener("click", function () {
            nuevaTarea.remove();
        });

        // appendChild agrega un elemento dentro de otro.
        nuevaTarea.appendChild(botonEliminar);
        listaTareas.appendChild(nuevaTarea);

        // Limpiamos el input para mejorar la experiencia.
        inputTarea.value = "";
        inputTarea.focus();
    });
}



// ======================================================
// JS 7: EVENTO ONBLUR
// ======================================================

function configurarEventoBlur() {
    const inputNombre = document.getElementById("input-nombre");
    const mensajeNombre = document.getElementById("mensaje-nombre");

    // blur ocurre cuando el usuario deja de enfocar el campo.
    inputNombre.addEventListener("blur", function () {
        const nombre = inputNombre.value.trim();

        if (nombre === "") {
            mensajeNombre.textContent = "El nombre no puede quedar vacío.";
            mensajeNombre.className = "form-text texto-error";
        } else {
            mensajeNombre.textContent = `Nombre ingresado correctamente: ${nombre}`;
            mensajeNombre.className = "form-text texto-exito";
        }
    });
}



// ======================================================
// JS 8: EVENTO ONKEYDOWN
// ======================================================

function configurarEventoKeydown() {
    const inputTecla = document.getElementById("input-tecla");
    const mensajeTecla = document.getElementById("mensaje-tecla");

    // keydown ocurre en el momento en que se presiona una tecla.
    inputTecla.addEventListener("keydown", function (event) {
        // El objeto event contiene información del evento ocurrido.
        mensajeTecla.textContent = `Tecla presionada: ${event.key}`;
    });
}



// ======================================================
// JS 9: EVENTO SUBMIT
// ======================================================

function configurarEventoSubmit() {
    const formulario = document.getElementById("form-contacto");
    const inputCorreo = document.getElementById("correo");
    const inputMensaje = document.getElementById("mensaje");
    const resultado = document.getElementById("resultado-formulario");

    formulario.addEventListener("submit", function (event) {
        // preventDefault evita que el formulario recargue la página.
        // Esto nos permite validar los datos primero con JavaScript.
        event.preventDefault();

        const correo = inputCorreo.value.trim();
        const mensaje = inputMensaje.value.trim();

        if (correo === "" || mensaje === "") {
            resultado.textContent = "Debe completar todos los campos antes de enviar.";
            resultado.className = "texto-error";
            return;
        }

        resultado.textContent = "Formulario enviado correctamente desde JavaScript.";
        resultado.className = "texto-exito";

        // reset limpia los campos del formulario.
        formulario.reset();
    });
}



// ======================================================
// JS 10: CIERRE PEDAGÓGICO
// ======================================================

// Ideas fuerza de la clase:
// 1. El DOM permite representar el HTML como objetos.
// 2. Para modificar algo, primero debemos seleccionarlo.
// 3. JavaScript puede cambiar texto, HTML, atributos, clases y estilos.
// 4. También puede crear elementos nuevos y agregarlos al documento.
// 5. Los eventos permiten reaccionar a acciones del usuario.
// 6. addEventListener es una forma ordenada de conectar eventos con funciones.
