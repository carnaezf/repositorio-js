function mostrarMensaje() {
  const mensaje = document.getElementById("mensaje");

  mensaje.textContent = "El archivo JS esta conectado!";
  console.log("Funcion ejecutada desde main.js");
}

// Cuando el documento esté listo, activamos jQuery
$(document).ready(function () {

    // Seleccionamos todos los enlaces del navbar que empiezan con #
    $(".navbar a").click(function (event) {

        // Evitamos el salto brusco normal del navegador
        event.preventDefault();

        // Guardamos el destino del enlace
        let destino = $(this).attr("href");

        // Animamos el scroll hacia la sección correspondiente
        $("html, body").animate({
            scrollTop: $(destino).offset().top
        }, 800);
    });

});