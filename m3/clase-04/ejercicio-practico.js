function calcularTotal(monto, descuento) {
  let iva = monto * 0.19;

  let montoConIva = monto + iva;

  let montoDescuento = montoConIva * descuento / 100;

  let totalFinal = montoConIva - montoDescuento;

  return totalFinal;
}

let resultado = calcularTotal(10000, 10);

console.log(`El total final es: $${resultado}`);
