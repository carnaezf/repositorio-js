// 1. Seleccionamos el botón desde el DOM
const btnTop = document.getElementById("btnTop");

// 2. Verificamos en consola si el botón fue encontrado
console.log(btnTop);

// 3. Agregamos un evento click al botón
btnTop.addEventListener("click", function () {
    
    // Actividad:
    // Completa este bloque para que la página vuelva arriba suavemente.

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});