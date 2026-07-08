const API_URL = "http://localhost:3000";

const resultado = document.getElementById("resultado");

function mostrarDatos(data) {
    resultado.innerHTML = `
        <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
}

async function consultarAPI(ruta) {
    try {
        const respuesta = await fetch(`${API_URL}${ruta}`);
        const data = await respuesta.json();

        mostrarDatos(data);
    } catch (error) {
        resultado.innerHTML = `
            <strong>Error:</strong> No fue posible consumir la API.
        `;

        console.log(error);
    }
}

document.getElementById("btn-conductores").addEventListener("click", function () {
    consultarAPI("/conductores");
});

document.getElementById("btn-automoviles").addEventListener("click", function () {
    consultarAPI("/automoviles");
});

document.getElementById("btn-conductores-sin-auto").addEventListener("click", function () {
    const edad = prompt("Ingrese edad máxima:");

    consultarAPI(`/conductoressinauto?edad=${edad}`);
});

document.getElementById("btn-solitos").addEventListener("click", function () {
    consultarAPI("/solitos");
});

document.getElementById("btn-auto-patente").addEventListener("click", function () {
    const patente = prompt("Ingrese patente:");

    consultarAPI(`/auto?patente=${patente}`);
});

document.getElementById("btn-auto-inicio").addEventListener("click", function () {
    const letra = prompt("Ingrese letra o inicio de patente:");

    consultarAPI(`/auto?iniciopatente=${letra}`);
});