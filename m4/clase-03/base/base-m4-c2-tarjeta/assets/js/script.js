// Seleccionamos los elementos del HTML
const inputNombre = document.querySelector("#nombre");
const inputProfesion = document.querySelector("#profesion");
const inputCiudad = document.querySelector("#ciudad");
const btnGenerar = document.querySelector("#btnGenerar");
const resultado = document.querySelector("#resultado");

// Escuchamos el click del botón
btnGenerar.addEventListener("click", function () {
    // Capturamos los valores escritos por el usuario
    const nombre = inputNombre.value || "No informado";
    const profesion = inputProfesion.value || "No informado";
    const ciudad = inputCiudad.value || "No informado";

    // Mostramos la tarjeta en pantalla
    resultado.innerHTML = `
        <div class="card border-primary">
            <div class="card-body">
                <h2 class="h4 card-title">${nombre}</h2>
                <p class="card-text mb-1"><strong>Profesión:</strong> ${profesion}</p>
                <p class="card-text mb-0"><strong>Ciudad:</strong> ${ciudad}</p>
            </div>
        </div>
    `;
});