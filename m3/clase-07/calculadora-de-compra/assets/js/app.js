/*
    Ejercicio:
    Calculadora de total de compra.

    Problema:
    Una tienda necesita calcular cuánto debe pagar un cliente
    considerando precio, cantidad y descuento.

    Conceptos a practicar:
    - variables
    - prompt()
    - parseFloat()
    - operaciones aritméticas
    - condicionales
    - funciones
    - innerHTML
*/

/* ============================================================
   1. PENSAMIENTO MENTAL: ¿QUÉ DATOS NECESITO?
============================================================ */

/*
    Necesito pedir:
    - nombre del cliente
    - precio del producto
    - cantidad comprada
    - porcentaje de descuento
*/

// TODO: solicitar el nombre del cliente
let nombreCliente = prompt("Ingrese el nombre del cliente:");

// TODO: solicitar el precio del producto
let precioProducto = prompt("Ingrese el precio del producto:");

// TODO: solicitar la cantidad comprada
let cantidad = prompt("Ingrese la cantidad comprada:");

// TODO: solicitar el porcentaje de descuento
let porcentajeDescuento = prompt("Ingrese el porcentaje de descuento:");



/* ============================================================
   2. PENSAMIENTO MENTAL: ¿QUÉ DATOS DEBO CONVERTIR?
============================================================ */

/*
    prompt() siempre devuelve texto.

    Por eso, los datos numéricos deben convertirse antes
    de realizar cálculos.
*/

// TODO: convertir precio a número decimal
precioProducto = parseFloat(precioProducto);

// TODO: convertir cantidad a número decimal
cantidad = parseFloat(cantidad);

// TODO: convertir descuento a número decimal
porcentajeDescuento = parseFloat(porcentajeDescuento);



/* ============================================================
   3. PENSAMIENTO MENTAL: ¿QUÉ CÁLCULO DEBO REALIZAR?
============================================================ */

/*
    Fórmulas:

    subtotal = precio * cantidad

    montoDescuento = subtotal * porcentajeDescuento / 100

    total = subtotal - montoDescuento
*/

/*
    Esta función recibe:
    - precio
    - cantidad
    - descuento

    Y retorna el total final.
*/

function calcularTotal(precio, cantidadComprada, descuento) {
    let subtotal = precio * cantidadComprada;

    let montoDescuento = subtotal * descuento / 100;

    let total = subtotal - montoDescuento;

    return total;
}



/* ============================================================
   4. PENSAMIENTO MENTAL: ¿LOS DATOS SON VÁLIDOS?
============================================================ */

/*
    Antes de mostrar el resultado, debemos validar que los datos
    numéricos sean correctos.

    isNaN() permite saber si un valor NO es un número.
*/

// TODO: validar que los valores numéricos sean correctos
if (
    isNaN(precioProducto) ||
    isNaN(cantidad) ||
    isNaN(porcentajeDescuento)
) {
    alert("Error: debe ingresar valores numéricos válidos.");

    document.getElementById("resultado").innerHTML = `
        No fue posible calcular el total. Revise los datos ingresados.
    `;
} else {
    /*
        Si los datos son válidos, se puede llamar a la función.
    */

    let totalCompra = calcularTotal(precioProducto, cantidad, porcentajeDescuento);

    console.log("Cliente:", nombreCliente);
    console.log("Precio:", precioProducto);
    console.log("Cantidad:", cantidad);
    console.log("Descuento:", porcentajeDescuento);
    console.log("Total:", totalCompra);

    alert("El total a pagar es: $" + totalCompra);

    document.getElementById("resultado").innerHTML = `
        Cliente: ${nombreCliente} <br>
        Precio del producto: $${precioProducto} <br>
        Cantidad comprada: ${cantidad} <br>
        Descuento aplicado: ${porcentajeDescuento}% <br>
        Total a pagar: $${totalCompra}
    `;
}