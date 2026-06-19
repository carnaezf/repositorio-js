/*
    Ejercicio Práctico:
    Consumo de API REST - Rick and Morty API

    Objetivo:
    - Consumir datos desde una API REST usando fetch().
    - Mostrar los primeros 10 personajes.
    - Agrupar personajes por especie.
    - Mostrar una ficha individual.
    - Evitar llamadas repetidas a la API usando memoria local.
*/

// URL del endpoint solicitado
const url = "https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10";

// Variable global para guardar los personajes en memoria
let personajes = [];

// Variable para saber si ya se llamó a la API
let datosCargados = false;

// Selección del contenedor donde se mostrará el resultado
const resultado = document.getElementById("resultado");

/* ============================================================
   1. FUNCIÓN PARA OBTENER PERSONAJES DESDE LA API
============================================================ */

function obtenerPersonajes() {
    if (datosCargados) {
        console.log("Datos cargados desde memoria local.");
        mostrarListaPersonajes(personajes);
        return;
    }

    resultado.innerHTML = "Cargando personajes desde la API...";

    fetch(url)
        .then(function (respuesta) {
            console.log("Respuesta recibida desde la API:");
            console.log(respuesta);

            return respuesta.json();
        })
        .then(function (data) {
            console.log("Datos convertidos a objeto JavaScript:");
            console.log(data);

            personajes = data;
            datosCargados = true;

            mostrarListaPersonajes(personajes);
        })
        .catch(function (error) {
            console.log("Error al consumir la API:");
            console.log(error);

            resultado.innerHTML = `
                <strong>Error:</strong> No fue posible obtener los personajes.
            `;
        });
}

/* ============================================================
   2. FUNCIÓN PARA MOSTRAR LISTA DE PERSONAJES
============================================================ */

function mostrarListaPersonajes(lista) {
    let html = `
        <h3 class="h5">Lista de personajes</h3>
        <ul class="list-group">
    `;

    lista.forEach(function (personaje) {
        html += `
            <li class="list-group-item">
                <strong>ID:</strong> ${personaje.id} -
                <strong>Nombre:</strong> ${personaje.name} -
                <strong>Especie:</strong> ${personaje.species}
            </li>
        `;
    });

    html += `
        </ul>
    `;

    resultado.innerHTML = html;
}

/* ============================================================
   3. FUNCIÓN PARA AGRUPAR PERSONAJES POR ESPECIE
============================================================ */

function agruparPorEspecie() {
    if (!datosCargados) {
        resultado.innerHTML = `
            Primero debe obtener la lista de personajes desde la API.
        `;
        return;
    }

    const grupos = personajes.reduce(function (acumulador, personaje) {
        const especie = personaje.species;

        if (!acumulador[especie]) {
            acumulador[especie] = [];
        }

        acumulador[especie].push(personaje);

        return acumulador;
    }, {});

    console.log("Personajes agrupados por especie:");
    console.log(grupos);

    let html = `
        <h3 class="h5">Personajes agrupados por especie</h3>
    `;

    const especiesOrdenadas = Object.keys(grupos).sort();

    especiesOrdenadas.forEach(function (especie) {
        html += `
            <h4 class="h6 mt-3">${especie}</h4>
            <ul class="list-group mb-3">
        `;

        grupos[especie].forEach(function (personaje) {
            html += `
                <li class="list-group-item">
                    ${personaje.name} 
                    <span class="text-muted">(ID: ${personaje.id})</span>
                </li>
            `;
        });

        html += `
            </ul>
        `;
    });

    resultado.innerHTML = html;
}

/* ============================================================
   4. FUNCIÓN PARA MOSTRAR FICHA INDIVIDUAL
============================================================ */

function mostrarFichaIndividual() {
    if (!datosCargados) {
        resultado.innerHTML = `
            Primero debe obtener la lista de personajes desde la API.
        `;
        return;
    }

    const personaje = personajes[0];

    resultado.innerHTML = `
        <h3 class="h5">Ficha de personaje</h3>

        <div class="card" style="width: 18rem;">
            <img src="${personaje.image}" class="card-img-top" alt="${personaje.name}">

            <div class="card-body">
                <h4 class="card-title">${personaje.name}</h4>

                <p class="card-text">
                    <strong>ID:</strong> ${personaje.id}<br>
                    <strong>Especie:</strong> ${personaje.species}<br>
                    <strong>Estado:</strong> ${personaje.status}<br>
                    <strong>Género:</strong> ${personaje.gender}
                </p>
            </div>
        </div>
    `;
}

/* ============================================================
   5. EVENTOS DE BOTONES
============================================================ */

document.getElementById("btn-listar").addEventListener("click", function () {
    obtenerPersonajes();
});

document.getElementById("btn-agrupar").addEventListener("click", function () {
    agruparPorEspecie();
});

document.getElementById("btn-ficha").addEventListener("click", function () {
    mostrarFichaIndividual();
});