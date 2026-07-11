const resultado = document.getElementById("resultado");
const selectOrden = document.getElementById("orden");

let tipoActual = "";
let datosActuales = [];

async function obtenerCatalogo(tipo) {
    const respuesta = await fetch(`/catalogo?tipo=${tipo}`);
    const datos = await respuesta.json();

    tipoActual = tipo;
    datosActuales = datos;

    mostrarDatos(datosActuales);
}

function mostrarDatos(datos) {
    if (datos.length === 0) {
        resultado.innerHTML = "No hay registros para mostrar.";
        return;
    }

    let html = "";

    datos.forEach((item) => {
        if (tipoActual === "peliculas") {
            html += `
                <div class="card-item">
                    <h3 class="h5">${item.nombre}</h3>
                    <p><strong>Director:</strong> ${item.director}</p>
                    <p><strong>Año:</strong> ${item.anio}</p>
                </div>
            `;
        }

        if (tipoActual === "series") {
            html += `
                <div class="card-item">
                    <h3 class="h5">${item.nombre}</h3>
                    <p><strong>Año:</strong> ${item.anio}</p>
                    <p><strong>Temporadas:</strong> ${item.temporadas}</p>
                </div>
            `;
        }
    });

    resultado.innerHTML = html;
}

function ordenarDatos(campo) {
    if (!campo || datosActuales.length === 0) {
        return;
    }

    const copia = [...datosActuales];

    copia.sort((a, b) => {
        if (typeof a[campo] === "string") {
            return a[campo].localeCompare(b[campo]);
        }

        return a[campo] - b[campo];
    });

    mostrarDatos(copia);
}

async function agregarPelicula(evento) {
    evento.preventDefault();

    const nuevaPelicula = {
        nombre: document.getElementById("pelicula-nombre").value,
        director: document.getElementById("pelicula-director").value,
        anio: Number(document.getElementById("pelicula-anio").value)
    };

    await fetch("/catalogo?tipo=peliculas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaPelicula)
    });

    document.getElementById("form-pelicula").reset();

    obtenerCatalogo("peliculas");
}

async function agregarSerie(evento) {
    evento.preventDefault();

    const nuevaSerie = {
        nombre: document.getElementById("serie-nombre").value,
        anio: Number(document.getElementById("serie-anio").value),
        temporadas: Number(document.getElementById("serie-temporadas").value)
    };

    await fetch("/catalogo?tipo=series", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaSerie)
    });

    document.getElementById("form-serie").reset();

    obtenerCatalogo("series");
}

document.getElementById("btn-peliculas").addEventListener("click", () => {
    obtenerCatalogo("peliculas");
});

document.getElementById("btn-series").addEventListener("click", () => {
    obtenerCatalogo("series");
});

selectOrden.addEventListener("change", () => {
    ordenarDatos(selectOrden.value);
});

document.getElementById("form-pelicula").addEventListener("submit", agregarPelicula);

document.getElementById("form-serie").addEventListener("submit", agregarSerie);