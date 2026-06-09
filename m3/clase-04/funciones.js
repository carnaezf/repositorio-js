/*
    CLASE: Funciones en JavaScript

    Una función es un bloque de código reutilizable.
    Sirve para evitar repetir instrucciones y organizar mejor un programa.

    Estructura básica:

    function nombreFuncion(parametro) {
        // instrucciones
        return resultado;
    }
*/

/* ============================================================
   1. FUNCIÓN CON PARÁMETRO Y RETURN
============================================================ */

/*
    La función saludar recibe un dato llamado nombre.

    Parámetro:
    - nombre: representa el valor que llegará a la función.

    return:
    - devuelve un texto personalizado.
*/

function saludar(nombre) {
    return `Hola ${nombre}`;
}

// La misma función puede reutilizarse con distintos valores.
console.log(saludar("Jorge"));
console.log(saludar("Pedro"));
console.log(saludar("Andrea"));
console.log(saludar("Pamela"));
console.log(saludar("Juan"));

/*
    Idea clave:
    No fue necesario escribir cinco funciones distintas.
    Una sola función recibe diferentes nombres y entrega distintos saludos.
*/


/* ============================================================
   2. FUNCIÓN QUE SUMA DOS NÚMEROS
============================================================ */

/*
    Esta función recibe dos números:
    - a
    - b

    Luego calcula la suma y devuelve el resultado.
*/

function sumar(a, b) {
    let resultado = a + b;

    return resultado;
}

console.log(sumar(5, 3));   // 8
console.log(sumar(7, 10));  // 17

/*
    También podemos guardar el resultado de una función
    dentro de una variable.
*/

let resultadoSuma = sumar(10, 10);

console.log(resultadoSuma); // 20


/* ============================================================
   3. FUNCIÓN SIN PARÁMETROS Y SIN RETURN
============================================================ */

/*
    Esta función no recibe datos.
    Tampoco retorna un valor.

    Solo ejecuta una acción: mostrar un mensaje en consola.
*/

function mostrarSaludoClase() {
    console.log("Hola, bienvenidos a la clase de JS");
}

mostrarSaludoClase();


/* ============================================================
   4. FUNCIÓN PARA REUTILIZAR UNA ACCIÓN
============================================================ */

/*
    Esta función sirve para mostrar un separador visual.
    Es útil cuando queremos ordenar la salida en consola.
*/

function mostrarSeparador() {
    console.log("----------------------");
}

console.log("Inicio del programa");
mostrarSeparador();

console.log("Contenido del programa");
mostrarSeparador();

console.log("Fin del programa");


/* ============================================================
   5. FUNCIÓN QUE USA UN OBJETO DE JAVASCRIPT
============================================================ */

/*
    Date() permite obtener la fecha y hora actual.

    En este ejemplo, la función encapsula esa tarea.
*/

function mostrarFechaActual() {
    let fecha = new Date();

    console.log("Fecha actual:", fecha);
}

mostrarFechaActual();


/* ============================================================
   6. PARÁMETROS CON VALOR POR DEFECTO
============================================================ */

/*
    Una función puede tener parámetros con valores por defecto.

    En este caso:
    - a debe ser entregado al llamar la función.
    - b vale 3 si no se entrega otro valor.
*/

function sumarConValorPorDefecto(a, b = 3) {
    return a + b;
}

console.log(sumarConValorPorDefecto(4));    // 7
console.log(sumarConValorPorDefecto(4, 4)); // 8

/*
    Importante:
    Si se entrega el segundo valor, JavaScript usa ese valor.
    Si no se entrega, usa el valor por defecto.
*/


/* ============================================================
   7. VARIABLES GLOBALES Y VARIABLES LOCALES
============================================================ */

/*
    Una variable global se declara fuera de una función.
    Puede ser usada en distintas partes del programa.
*/

let numeroBase = 10;

/*
    Esta función usa:
    - a: parámetro recibido.
    - numeroBase: variable global.
*/

function multiplicarPorNumeroBase(a) {
    return a * numeroBase;
}

let resultadoMultiplicacion = multiplicarPorNumeroBase(3);

console.log(resultadoMultiplicacion); // 30

/*
    Aunque esto funciona, en proyectos reales conviene evitar
    depender demasiado de variables globales.

    Es más claro pasar los valores como parámetros.
*/

function multiplicar(a, b) {
    return a * b;
}

console.log(multiplicar(3, 10)); // 30


/* ============================================================
   8. VARIABLE LOCAL
============================================================ */

/*
    Una variable local se declara dentro de una función.
    Solo existe dentro de esa función.
*/

function ejemploVariableLocal() {
    let mensajeDentroDeFuncion = "Hola desde la función";

    console.log(mensajeDentroDeFuncion);
}

ejemploVariableLocal();

/*
    Esto produciría error porque la variable fue creada dentro
    de la función y no existe fuera de ella.

    console.log(mensajeDentroDeFuncion);
*/


/* ============================================================
   9. REUTILIZACIÓN DE FUNCIONES EN DIFERENTES PARTES
============================================================ */

/*
    Una función puede declararse una vez y usarse muchas veces
    en distintas partes del programa.
*/

function crearSaludo(nombre) {
    return `Hola ${nombre}`;
}

// Aquí podría existir más código del programa
console.log("Ejecutando parte 1 del programa");

console.log(crearSaludo("Pepito"));

// Aquí podría existir más código del programa
console.log("Ejecutando parte 2 del programa");

console.log(crearSaludo("Marlen"));


/* ============================================================
   10. FUNCIÓN DENTRO DE OTRA FUNCIÓN
============================================================ */

/*
    Una función puede contener otra función.

    Esto permite organizar una tarea interna que solo será usada
    dentro de la función principal.
*/

function puntuacion(nombre) {
    let punto1 = 2;
    let punto2 = 3;

    /*
        Esta función interna puede acceder a:
        - nombre
        - punto1
        - punto2

        porque todas esas variables pertenecen al entorno
        de la función puntuacion.
    */

    function imprimir() {
        return `${nombre} anotó ${punto1 + punto2} puntos`;
    }

    return imprimir();
}

console.log(puntuacion("Patricio"));

/*
    Esto produciría error, porque imprimir() existe solamente
    dentro de la función puntuacion.

    imprimir();
*/