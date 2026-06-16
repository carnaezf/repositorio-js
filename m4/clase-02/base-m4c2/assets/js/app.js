/*
    Archivo principal.

    Aquí se crean los objetos y se conectan las clases
    con los elementos HTML.
*/

/* ============================================================
   1. INSTANCIAS DEL ESCENARIO TAXIS
============================================================ */

const taxi1 = new TaxiTradicional(
    "ABCD-11",
    "Juan Pérez",
    "A1",
    "Amarillo"
);

const taxi2 = new TaxiExpress(
    "EFGH-22",
    "María González",
    "B",
    "Express",
    "Sedán"
);

const taxi3 = new TaxiPremium(
    "IJKL-33",
    "Carlos Rojas",
    "B",
    "Premium",
    "SUV",
    ["Aire acondicionado", "Asientos cómodos", "Pago digital"]
);

const taxi4 = new TaxiCargo(
    "MNOP-44",
    "Ana Torres",
    "B",
    "800 kg"
);

console.log(taxi1);
console.log(taxi2);
console.log(taxi3);
console.log(taxi4);

document.getElementById("resultado-taxis").innerHTML = `
    <h3 class="h5">Escenario Taxis Urbanos</h3>

    <strong>Taxi tradicional</strong><br>
    ${taxi1.mostrarInfo()}

    <hr>

    <strong>Taxi Express</strong><br>
    ${taxi2.mostrarInfo()}

    <hr>

    <strong>Taxi Premium</strong><br>
    ${taxi3.mostrarInfo()}

    <hr>

    <strong>Taxi Cargo</strong><br>
    ${taxi4.mostrarInfo()}
`;



/* ============================================================
   2. INSTANCIAS DEL ESCENARIO SONY
============================================================ */

const televisor1 = new Televisor(
    "Sony Bravia",
    "XR-55X90L",
    899990,
    55,
    "4K"
);

const camara1 = new Camara(
    "Sony Alpha",
    "A6400",
    799990,
    "Mirrorless"
);

const audio1 = new Audio(
    "Audífonos Sony",
    "WH-1000XM5",
    349990,
    "Audífonos inalámbricos"
);

console.log(televisor1);
console.log(camara1);
console.log(audio1);

document.getElementById("resultado-sony").innerHTML = `
    <h3 class="h5">Escenario Catálogo Sony</h3>

    <strong>Televisor</strong><br>
    ${televisor1.mostrarInfo()}

    <hr>

    <strong>Cámara</strong><br>
    ${camara1.mostrarInfo()}

    <hr>

    <strong>Audio</strong><br>
    ${audio1.mostrarInfo()}
`;



/* ============================================================
   3. INSTANCIA DEL ESCENARIO SUMATORIA
============================================================ */

/*
    Generar número aleatorio entre 1 y 10.
*/

let base = Math.floor(Math.random() * 10) + 1;

/*
    Crear objeto de la clase Sumatoria.
*/

const suma1 = new Sumatoria(base);

/*
    Conectar el botón del HTML con el método sumar().
*/

document.getElementById("btn-sumar").addEventListener("click", function () {
    suma1.sumar();
});