// ======================================================
// MÓDULO 4 - PROGRAMACIÓN AVANZADA EN JAVASCRIPT
// Ejercicio final guiado: Clase + Fetch + API + Eventos
// ======================================================

// API que usaremos en este ejercicio.
// Esta API retorna personajes dentro de la propiedad "results".
const URL_API = "https://rickandmortyapi.com/api/character";



// ======================================================
// PASO 2 - CREAR LA CLASE GESTORPERSONAJES
// ======================================================

// Una clase nos permite organizar datos y comportamientos.
// En este caso, la clase será responsable de:
// - cargar personajes desde la API;
// - guardar esos personajes;
// - consultar información;
// - ordenar y listar datos.

class GestorPersonajes {

    constructor() {
        // Esta propiedad guardará los personajes que lleguen desde la API.
        // Parte como arreglo vacío porque al inicio todavía no tenemos datos.
        this.personajes = [];

        // Llamamos al método que carga los personajes.
        // Como fetch es asíncrono, los datos no llegan inmediatamente.
        this.cargarPersonajes();
    }



    // ======================================================
    // PASO 3 - CARGAR PERSONAJES USANDO FETCH
    // ======================================================

    async cargarPersonajes() {
        try {
            console.log("Cargando personajes desde la API...");

            // fetch hace la petición al servidor.
            const respuesta = await fetch(URL_API);

            // Validamos que la respuesta HTTP sea correcta.
            if (!respuesta.ok) {
                throw new Error("No se pudo obtener la información desde la API.");
            }

            // Convertimos la respuesta a JSON.
            const data = await respuesta.json();

            // Guardamos los personajes dentro de la propiedad de la clase.
            this.personajes = data.results;

            // ======================================================
            // PASO 4 - VERIFICAR DATA POR CONSOLA
            // ======================================================

            console.log("Personajes cargados correctamente:");
            console.log(this.personajes);

        } catch (error) {
            console.log("Error al cargar personajes:");
            console.log(error);
        }
    }



    // ======================================================
    // MÉTODO DE APOYO - BUSCAR PERSONAJE POR NOMBRE
    // ======================================================

    buscarPorNombre(nombreBuscado) {
        // find busca el primer elemento que cumpla la condición.
        // Convertimos ambos textos a minúsculas para evitar problemas
        // si el usuario escribe con mayúsculas o minúsculas diferentes.

        const personajeEncontrado = this.personajes.find(function (personaje) {
            return personaje.name.toLowerCase() === nombreBuscado.toLowerCase();
        });

        return personajeEncontrado;
    }



    // ======================================================
    // PASO 5.1 - LISTAR NOMBRES DE TODOS LOS PERSONAJES
    // ======================================================

    listarNombres() {
        console.log("Listado de nombres:");

        this.personajes.forEach(function (personaje) {
            console.log(personaje.name);
        });
    }



    // ======================================================
    // PASO 5.2 - BUSCAR INFORMACIÓN BÁSICA
    // ======================================================

    buscarInformacionBasica() {
        const nombre = prompt("Ingrese el nombre del personaje:");

        const personaje = this.buscarPorNombre(nombre);

        if (!personaje) {
            console.log("No se encontró el personaje.");
            return;
        }

        console.log("Información básica:");
        console.log(`Nombre: ${personaje.name}`);
        console.log(`Especie: ${personaje.species}`);
        console.log(`Estado: ${personaje.status}`);
    }



    // ======================================================
    // PASO 5.3 - BUSCAR ORIGEN DEL PERSONAJE
    // ======================================================

    buscarOrigen() {
        const nombre = prompt("Ingrese el nombre del personaje:");

        const personaje = this.buscarPorNombre(nombre);

        if (!personaje) {
            console.log("No se encontró el personaje.");
            return;
        }

        console.log("Origen del personaje:");
        console.log(`Nombre: ${personaje.origin.name}`);
        console.log(`URL: ${personaje.origin.url}`);
    }



    // ======================================================
    // PASO 5.4 - BUSCAR INFORMACIÓN AVANZADA
    // ======================================================

    buscarInformacionAvanzada() {
        const nombre = prompt("Ingrese el nombre del personaje:");

        const personaje = this.buscarPorNombre(nombre);

        if (!personaje) {
            console.log("No se encontró el personaje.");
            return;
        }

        console.log("Información avanzada:");
        console.log(`Género: ${personaje.gender}`);
        console.log(`Ubicación actual: ${personaje.location.name}`);
        console.log(`Cantidad de episodios: ${personaje.episode.length}`);
    }



    // ======================================================
    // PASO 5.5 - LISTAR PERSONAJES JUNTO A SU ESPECIE
    // ======================================================

    listarPersonajesYEspecies() {
        console.log("Personajes y especies:");

        this.personajes.forEach(function (personaje) {
            console.log(`${personaje.name} - ${personaje.species}`);
        });
    }



    // ======================================================
    // PASO 5.6 - LISTAR NOMBRES ORDENADOS ALFABÉTICAMENTE
    // ======================================================

    listarNombresOrdenados() {
        // map crea un nuevo arreglo solo con los nombres.
        const nombres = this.personajes.map(function (personaje) {
            return personaje.name;
        });

        // sort ordena alfabéticamente.
        nombres.sort();

        console.log("Nombres ordenados alfabéticamente:");

        nombres.forEach(function (nombre) {
            console.log(nombre);
        });
    }
}



// ======================================================
// PASO 6 - CREAR INSTANCIA DE LA CLASE
// ======================================================

// Aquí creamos un objeto a partir de la clase.
// Desde este momento se ejecuta el constructor,
// y el constructor llama a cargarPersonajes().

const gestor = new GestorPersonajes();



// ======================================================
// PASO 6 - CONECTAR BOTONES CON addEventListener
// ======================================================

// Seleccionamos cada botón del HTML.
const btnListarNombres = document.getElementById("btn-listar-nombres");
const btnInfoBasica = document.getElementById("btn-info-basica");
const btnOrigen = document.getElementById("btn-origen");
const btnInfoAvanzada = document.getElementById("btn-info-avanzada");
const btnListarEspecies = document.getElementById("btn-listar-especies");
const btnOrdenarNombres = document.getElementById("btn-ordenar-nombres");



// Cada botón llama a un método de la clase.
// Usamos funciones anónimas para controlar cuándo se ejecuta cada método.

btnListarNombres.addEventListener("click", function () {
    gestor.listarNombres();
});

btnInfoBasica.addEventListener("click", function () {
    gestor.buscarInformacionBasica();
});

btnOrigen.addEventListener("click", function () {
    gestor.buscarOrigen();
});

btnInfoAvanzada.addEventListener("click", function () {
    gestor.buscarInformacionAvanzada();
});

btnListarEspecies.addEventListener("click", function () {
    gestor.listarPersonajesYEspecies();
});

btnOrdenarNombres.addEventListener("click", function () {
    gestor.listarNombresOrdenados();
});



// ======================================================
// PASO 7 - PRUEBAS SUGERIDAS
// ======================================================

// Casos correctos para probar en prompt:
//
// Rick Sanchez
// Morty Smith
// Summer Smith
// Beth Smith
// Jerry Smith
//
// Casos incorrectos:
//
// Ana
// Pikachu
// Batman
//
// Si el personaje no existe, el programa debe mostrar:
// "No se encontró el personaje."



// ======================================================
// CIERRE PEDAGÓGICO
// ======================================================

// En este ejercicio practicamos:
//
// 1. Crear una clase.
// 2. Usar constructor.
// 3. Guardar datos en this.personajes.
// 4. Consumir una API con fetch.
// 5. Convertir respuesta a JSON.
// 6. Crear métodos de consulta.
// 7. Usar prompt para pedir datos.
// 8. Recorrer arreglos con forEach.
// 9. Buscar datos con find.
// 10. Ordenar datos con sort.
// 11. Conectar botones con addEventListener.