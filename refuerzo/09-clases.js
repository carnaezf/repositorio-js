// Objetos literales y clases

// 1 Objeto literal
// Un objeto literal se usa cuando necesitamos represntar un
// elemento especifico

// En este caso creamos UN usaurio

const usuario = {
  nombre: "Ana", // Esta es una propiedad
  edad: 28, // esta es otra
  activo: true, // propiedad booleana

  saludar() {
    console.log("Hola soy Ana");
  },
};

console.log(usuario);
usuario.saludar();

// 2 Problema del objeto literal

const usuarioA = {
  nombre: "Carlos", // Esta es una propiedad
  edad: 31, // esta es otra
  activo: true, // propiedad booleana

  saludar() {
    console.log("Hola soy Carlos");
  },
};

const usuarioB = {
  nombre: "Maria", // Esta es una propiedad
  edad: 25, // esta es otra
  activo: false, // propiedad booleana

  saludar() {
    console.log("Hola soy Maria");
  },
};

usuarioA.saludar();
usuarioB.saludar();

// Observacion
// La estructura se repite: nombre, edad, activo, saludas

// 3 Clase
class Usuario {
  constructor(nombre, edad, activo) {
    this.nombre = nombre; // this.nombre pretenece al objeto creado
    this.edad = edad; // this.edad guarda la edad recibida
    this.activo = activo; // this.activo guarda el estado de el usuario
  }

  saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  }

  mostrarEstado() {
    if (this.activo) {
      console.log(`${this.nombre} esta activo en el sistema`);
    } else {
      console.log(`${this.nombre} no esta activo en el sistema`);
    }
  }
}

// 4 Crear objetos desde una clase

const usuario1 = new Usuario("Ana", 28, true);
const usuario2 = new Usuario("Carlos", 31, true);
const usuario3 = new Usuario("Maria", 25, false);

console.log(usuario1);
console.log(usuario2);
console.log(usuario3);

usuario1.saludar();
usuario2.saludar();
usuario3.saludar();

usuario1.mostrarEstado();
usuario2.mostrarEstado();
usuario3.mostrarEstado();

// 5 Clases con mas comportamiento
// Una clase no solo gurada datos
// Tambien puede tener metodos que representan acciones

class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  mostrarInfo() {
    console.log(`Producto: ${this.nombre}`);
    console.log(`Precio: $${this.precio}`);
    console.log(`Stock disponible: ${this.stock}`);
  }

  vender(cantidad) {
    if (cantidad <= this.stock) {
      this.stock = this.stock - cantidad;
      console.log(`Venta realizada: ${cantidad} unidad(es) de ${this.nombre}`);
    } else {
      console.log(`No hay stock suficiente para vender ${cantidad} unidad(es)`);
    }
  }

  reponer(cantidad) {
    this.stock = this.stock + cantidad;
    console.log(`Se repusieron ${cantidad} unidad(es) de ${this.nombre}`);
  }
}

// Instancias de producto

console.log("### Instancias de producto ###");

const producto1 = new Producto("Cafe de especialidad", 4500, 10);
const producto2 = new Producto("Torta de chocolate", 12000, 3);

producto1.mostrarInfo();

console.log("### Instancias de producto 2 ###");
producto2.mostrarInfo();
producto2.vender(5);
producto2.reponer(4);
producto2.vender(5);
producto2.mostrarInfo();

// ======================================================
// 7. ABSTRACCIÓN
// ======================================================

// Abstraer significa quedarnos con las características
// importantes de algo para representarlo en código.

// En una tienda real, un producto tiene muchos datos:
// proveedor, fecha de ingreso, categoría, impuestos, imagen, etc.

// Pero para este ejercicio solo necesitamos:
// - nombre
// - precio
// - stock
// - vender()
// - reponer()

// Eso es una abstracción: representar solo lo necesario.

// Encapsulamiento
// Encapsular signiufica reunir datos y comportamiento
// dentro de una misma estructura

class CuentaBancaria {
  constructor(titular, saldo) {
    this.titular = titular;
    this.saldo = saldo;
  }

  // Depositar
  depositar(monto) {
    if (monto > 0) {
      this.saldo = this.saldo + monto;
      console.log(`Deposito exitos. Nuevo Saldo $${this.saldo}`);
    } else {
      console.log(`El monto debe der mayor a cero`);
    }
  }

  // Retirar
  retirar(monto) {
    if (monto > this.saldo) {
      console.log(`Saldo insufiente`);
      // monto = 1.000.000
      // saldo = 200.000
    } else {
      this.saldo = this.saldo - monto;
      console.log(`Retiro exitoso. Nuevo Saldo $${this.saldo}`);
    }
  }

  // Mostrar saldo
  mostrarSaldo() {
    console.log(`${this.titular} tiene un saldo de ${this.saldo}`);
  }
}

console.log("### Instancias de Cuenta Bancaria ###");
const cuenta1 = new CuentaBancaria("Ana", 100000);

cuenta1.mostrarSaldo();
cuenta1.depositar(50000);
cuenta1.retirar(30000);
cuenta1.retirar(200000);

// 10 polimorfismo
// Significa que distintos objetos pueden
// responder de manera diferente

// Clase padre
class Trabajador {
  constructor(nombre) {
    this.nombre = nombre;
  }

  trabajar() {
    console.log(`${this.nombre} esta trabajando`);
  }
}

// Clase hija 1
class Supervisor extends Trabajador {
  trabajar() {
    console.log(`${this.nombre} esta supervisando al equipo`);
  }
}

// clase hija 2
class Obero extends Trabajador {
  trabajar() {
    console.log(`${this.nombre} esta ejecutando tareas operativas`);
  }
}


const supervisor1 = new Supervisor("Laura")
const obrero = new Obero("Pedro")


supervisor1.trabajar()
obrero.trabajar()