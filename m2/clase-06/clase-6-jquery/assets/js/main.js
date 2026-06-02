// assets/js/main.js

// ------------------------------------------------------
// 1. Función básica en JavaScript nativo
// ------------------------------------------------------
function saludar() {
  alert("¡Hola desde un módulo JS!");
  console.log("Saludo desde main.js");
}

// ------------------------------------------------------
// 2. Evento con JavaScript nativo
// Se ejecuta cuando el DOM ya está cargado
// ------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("miBoton");
  boton.addEventListener("click", () => {
    saludar();
  });
});

// ------------------------------------------------------
// 3. Inicio de jQuery
// document.ready asegura que el HTML ya está disponible
// ------------------------------------------------------
$(document).ready(function () {
  // Guardamos la referencia de la caja para reutilizarla
  let caja = $("#caja");

  // ------------------------------------------------------
  // 4. Manipulación de contenido con jQuery
  // ------------------------------------------------------
  caja.text("Nuevo Contenido para la caja");

  // ------------------------------------------------------
  // 5. Aplicación de estilos desde jQuery
  // ------------------------------------------------------
  caja.css({
    "background-color": "red",
    "color": "white",
    "width": "250px",
    "height": "250px",
    "cursor": "pointer",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "flex-direction": "column",
  });

  // ------------------------------------------------------
  // 6. Evento click sobre la caja
  // ------------------------------------------------------
  caja.click(function () {
    alert("Has dado click a la caja");
    console.log("Has dado click a la caja");

    // Agregar contenido dinámicamente con append()
    $(this).append("<p>Has dado click a la caja</p>");
  });

  // ------------------------------------------------------
  // 7. Eventos de mouse
  // ------------------------------------------------------
  caja.mouseenter(function () {
    $(this).css("background-color", "blue");
    console.log("Mouse dentro de la caja");
  });

  caja.mouseleave(function () {
    $(this).css("background-color", "red");
    console.log("Mouse salió de la caja");
  });

  // ------------------------------------------------------
  // 8. Efectos visuales con jQuery
  // ------------------------------------------------------
  $("#btnIncial").click(function () {
    // caja.hide();
    // caja.fadeOut();
    // caja.toggle();
    caja.fadeToggle();
  });

  // ------------------------------------------------------
  // 9. Modificación de texto desde un botón externo
  // ------------------------------------------------------
  $("#btnCambiarTexto").click(function () {
    caja.text("¡El texto ha sido cambiado con jQuery!");
    console.log("Texto cambiado con botón externo");
  });

  // ------------------------------------------------------
  // 10. Animaciones con jQuery
  // ------------------------------------------------------
  $("#btnAnimar").click(function () {
    caja.animate(
      {
        width: "350px",
        height: "350px",
        opacity: 0.8,
      },
      500
    );
  });

  // ------------------------------------------------------
  // 11. AJAX con jQuery
  // Ejemplo comentado: obtener una sola ave desde la API
  // ------------------------------------------------------
  // $.get("https://aves.ninjas.cl/api/birds/76-buteo-albigula", function (data) {
  //   // Agregamos el nombre
  //   caja.append("<p><strong>Nombre:</strong> " + data.name.spanish + "</p>");

  //   // Agregamos una imagen del ave
  //   caja.append(`<img src="${data.images.main}" width="250">`);

  //   console.log("Datos recibidos desde la API de Aves:", data);
  // });

  // ------------------------------------------------------
  // 12. AJAX con jQuery
  // Obtener todas las aves desde la API
  // ------------------------------------------------------
  let contenedorAves = $("#avesContainer");

  $.get("https://aves.ninjas.cl/api/birds", function (aves) {
    // Recorremos el arreglo de aves recibido desde la API
    aves.forEach(ave => {
      contenedorAves.append(`
        <div class="col-12 col-md-4">
          <div class="card h-100">
            <img src="${ave.images.main}" class="card-img-top" alt="${ave.name.spanish}">
            <div class="card-body">
              <h5 class="card-title">${ave.name.spanish}</h5>
              <p class="card-text">${ave.name.latin}</p>
            </div>
          </div>
        </div>
      `);
    });

    // Verificamos en consola la información recibida
    console.log("Aves cargadas:", aves);
  });
});