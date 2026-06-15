/*
    Ejercicio Práctico:
    Clases y Objetos en JavaScript

    Objetivo:
    Definir clases con atributos y métodos,
    crear objetos a partir de ellas
    y mostrar sus datos en consola y en la página HTML.
*/

/* ============================================================
   1. CLASE ALUMNO
============================================================ */

/*
    La clase Alumno representa a un estudiante.

    Atributos:
    - nombre
    - edad
    - carrera
    - institucion

    Método:
    - mostrarInfo()
*/

class Alumno {
    constructor(nombre, edad, carrera, institucion) {
        this.nombre = nombre;
        this.edad = edad;
        this.carrera = carrera;
        this.institucion = institucion;
    }

    mostrarInfo() {
        return `
            Nombre: ${this.nombre} <br>
            Edad: ${this.edad} años <br>
            Carrera: ${this.carrera} <br>
            Institución: ${this.institucion}
        `;
    }
}

// Crear objeto a partir de la clase Alumno
const alumno1 = new Alumno(
    "Camila Torres",
    24,
    "Full Stack JavaScript",
    "Talento Digital"
);

// Mostrar en consola
console.log("Objeto Alumno:");
console.log(alumno1);
console.log(alumno1.mostrarInfo());



/* ============================================================
   2. CLASE BANDA MUSICAL
============================================================ */

/*
    La clase BandaMusical representa a una banda.

    Atributos:
    - nombre
    - genero
    - integrantes
    - discos

    Métodos:
    - mostrarInfo()
    - listarDiscos()
*/

class BandaMusical {
    constructor(nombre, genero, integrantes, discos) {
        this.nombre = nombre;
        this.genero = genero;
        this.integrantes = integrantes;
        this.discos = discos;
    }

    mostrarInfo() {
        return `
            Banda: ${this.nombre} <br>
            Género: ${this.genero} <br>
            Integrantes: ${this.integrantes}
        `;
    }

    listarDiscos() {
        return `
            Discos publicados: ${this.discos.join(", ")}
        `;
    }
}

// Crear objeto a partir de la clase BandaMusical
const banda1 = new BandaMusical(
    "Los Prisioneros",
    "Rock latino",
    3,
    ["La voz de los 80", "Pateando piedras", "Corazones"]
);

// Mostrar en consola
console.log("Objeto Banda Musical:");
console.log(banda1);
console.log(banda1.mostrarInfo());
console.log(banda1.listarDiscos());



/* ============================================================
   3. CLASE PERRO
============================================================ */

/*
    La clase Perro representa a un perro.

    Atributos:
    - nombre
    - raza
    - edad
    - color

    Métodos:
    - mostrarInfo()
    - ladrar()
*/

class Perro {
    constructor(nombre, raza, edad, color) {
        this.nombre = nombre;
        this.raza = raza;
        this.edad = edad;
        this.color = color;
    }

    mostrarInfo() {
        return `
            Nombre: ${this.nombre} <br>
            Raza: ${this.raza} <br>
            Edad: ${this.edad} años <br>
            Color: ${this.color}
        `;
    }

    ladrar() {
        return "¡Guau guau!";
    }
}

// Crear objeto a partir de la clase Perro
const perro1 = new Perro(
    "Lipigas",
    "Labrador",
    7,
    "Dorado"
);

// Mostrar en consola
console.log("Objeto Perro:");
console.log(perro1);
console.log(perro1.mostrarInfo());
console.log(perro1.ladrar());



/* ============================================================
   4. MOSTRAR RESULTADOS EN EL HTML
============================================================ */

/*
    Se utiliza getElementById para seleccionar el contenedor
    con id="resultado" y luego se inserta contenido usando innerHTML.
*/

document.getElementById("resultado").innerHTML = `
    <h3 class="h5">Alumno</h3>
    <p>${alumno1.mostrarInfo()}</p>

    <hr>

    <h3 class="h5">Banda Musical</h3>
    <p>${banda1.mostrarInfo()}</p>
    <p>${banda1.listarDiscos()}</p>

    <hr>

    <h3 class="h5">Perro</h3>
    <p>${perro1.mostrarInfo()}</p>
    <p>Sonido: ${perro1.ladrar()}</p>
`;