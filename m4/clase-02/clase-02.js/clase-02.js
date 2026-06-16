// ======================================================
// MÓDULO 4 - PROGRAMACIÓN AVANZADA EN JAVASCRIPT
// Lección 02 - Características de JavaScript ES6+
// ======================================================

// Pregunta inicial para la clase:
// ¿Qué problemas aparecen cuando nuestro código empieza a crecer?
// - Muchas variables sueltas
// - Funciones repetidas
// - Código difícil de leer
// - Datos desordenados
// ES6+ ayuda a escribir código más claro, moderno y mantenible.



// ======================================================
// 1. VAR, LET Y CONST
// ======================================================

// Antes de ES6 se usaba mucho var.
// Actualmente preferimos let y const.

var nombreAntiguo = "Ana"; // var funciona, pero tiene un alcance menos controlado.

let edad = 25; // let permite cambiar el valor después.
edad = 26;

const curso = "Full Stack JavaScript"; // const no permite reasignar el valor.

// curso = "Python"; // Esto daría error, porque curso fue declarado con const.

console.log("Edad:", edad);
console.log("Curso:", curso);

// Idea clave:
// Usamos const cuando el valor no será reasignado.
// Usamos let cuando el valor puede cambiar.
// Evitamos var en código moderno.



// ======================================================
// 2. TEMPLATE STRINGS / INTERPOLACIÓN
// ======================================================

const estudiante = "Camila";
const modulo = 4;

// Antes se concatenaba así:
// "La estudiante " + estudiante + " está en el módulo " + modulo

// Con ES6 usamos backticks ` ` y ${}
console.log(`La estudiante ${estudiante} está en el módulo ${modulo}.`);

// Idea clave:
// Los template strings hacen que los textos dinámicos sean más legibles.



// ======================================================
// 3. PARÁMETROS POR DEFECTO
// ======================================================

// Los parámetros por defecto permiten definir un valor inicial
// cuando no se entrega un argumento.

function saludar(nombre = "estudiante") {
  console.log(`Hola, ${nombre}. Bienvenido/a a la clase.`);
}

saludar("Felipe");
saludar(); // No enviamos nombre, por eso usa el valor por defecto.

// Idea clave:
// Esto evita errores cuando una función no recibe todos los datos esperados.



// ======================================================
// 4. FUNCIONES FLECHA
// ======================================================

// Forma tradicional
function sumar(a, b) {
  return a + b;
}

console.log(sumar(5, 3));

// Forma moderna con arrow function
const multiplicar = (a, b) => {
  return a * b;
};

console.log(multiplicar(4, 2));

// Cuando la función tiene una sola línea,
// podemos simplificar aún más.

const dividir = (a, b) => a / b;

console.log(dividir(10, 2));

// Idea clave:
// Las arrow functions permiten escribir funciones más compactas.
// Son muy usadas en callbacks, arreglos, eventos y consumo de APIs.



// ======================================================
// 5. DESTRUCTURING EN OBJETOS
// ======================================================

const usuario = {
  nombre: "Ana",
  correo: "ana@correo.com",
  activo: true,
};

// Forma tradicional:
// const nombreUsuario = usuario.nombre;
// const correoUsuario = usuario.correo;

// Forma ES6 con destructuring:
const { nombre, correo, activo } = usuario;

console.log(`Nombre: ${nombre}`);
console.log(`Correo: ${correo}`);
console.log(`Activo: ${activo}`);

// Idea clave:
// El destructuring permite extraer datos de un objeto de forma más limpia.



// ======================================================
// 6. DESTRUCTURING EN ARREGLOS
// ======================================================

const tecnologias = ["HTML", "CSS", "JavaScript"];

// Extraemos posiciones del arreglo
const [tecnologia1, tecnologia2, tecnologia3] = tecnologias;

console.log(tecnologia1);
console.log(tecnologia2);
console.log(tecnologia3);

// Idea clave:
// En arreglos, el destructuring depende del orden de los elementos.



// ======================================================
// 7. OPERADOR SPREAD
// ======================================================

// Spread significa "expandir".
// Nos permite copiar o combinar arreglos y objetos.

const frontend = ["HTML", "CSS"];
const javascript = ["JavaScript"];

const stackFrontend = [...frontend, ...javascript];

console.log(stackFrontend);

// También funciona con objetos:

const datosBasicos = {
  nombre: "Carlos",
  edad: 30,
};

const datosCompletos = {
  ...datosBasicos,
  curso: "Full Stack JavaScript",
  modulo: 4,
};

console.log(datosCompletos);

// Idea clave:
// Spread ayuda a crear nuevas estructuras sin modificar directamente las originales.



// ======================================================
// 8. OPERADOR REST
// ======================================================

// Rest significa "el resto".
// Permite recibir una cantidad indefinida de argumentos como arreglo.

function sumarNotas(...notas) {
  // notas llega como un arreglo
  console.log("Notas recibidas:", notas);

  let total = 0;

  for (let nota of notas) {
    total = total + nota;
  }

  return total;
}

console.log(sumarNotas(5, 6, 7));
console.log(sumarNotas(4, 5, 6, 7, 3));

// Idea clave:
// Spread expande datos.
// Rest agrupa datos.



// ======================================================
// 9. CLASES EN ES6
// ======================================================

// ES6 incorpora una sintaxis más clara para trabajar con clases.
// Una clase es una plantilla para crear objetos.

class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  mostrarInfo() {
    console.log(`Producto: ${this.nombre}`);
    console.log(`Precio: $${this.precio}`);
    console.log(`Stock: ${this.stock}`);
  }

  vender(cantidad) {
    if (cantidad <= 0) {
      console.log("La cantidad debe ser mayor a cero.");
    } else if (cantidad > this.stock) {
      console.log("No hay stock suficiente.");
    } else {
      this.stock = this.stock - cantidad;
      console.log(`Venta realizada. Stock actual: ${this.stock}`);
    }
  }
}

const producto1 = new Producto("Café", 4500, 10);

producto1.mostrarInfo();
producto1.vender(3);
producto1.mostrarInfo();

// Idea clave:
// La clase organiza datos y comportamientos en una misma estructura.



// ======================================================
// 10. HERENCIA CON EXTENDS Y SUPER
// ======================================================

// La herencia permite crear una clase hija desde una clase padre.

class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  presentarse() {
    console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
  }
}

class Alumno extends Persona {
  constructor(nombre, edad, curso) {
    // super llama al constructor de la clase padre.
    super(nombre, edad);

    // La clase hija puede agregar sus propias propiedades.
    this.curso = curso;
  }

  mostrarCurso() {
    console.log(`${this.nombre} está cursando ${this.curso}.`);
  }
}

const alumno1 = new Alumno("Valentina", 22, "JavaScript Avanzado");

alumno1.presentarse(); // Método heredado desde Persona
alumno1.mostrarCurso(); // Método propio de Alumno

// Idea clave:
// La clase hija reutiliza lo común de la clase padre
// y agrega lo específico.



// ======================================================
// 11. PROPIEDADES PRIVADAS
// ======================================================

// En JavaScript moderno podemos usar # para declarar propiedades privadas.
// Una propiedad privada solo puede usarse dentro de la clase.

class Cuenta {
  #saldo;

  constructor(titular, saldoInicial) {
    this.titular = titular;
    this.#saldo = saldoInicial;
  }

  depositar(monto) {
    if (monto > 0) {
      this.#saldo = this.#saldo + monto;
      console.log(`Depósito realizado. Saldo actual: $${this.#saldo}`);
    } else {
      console.log("El monto debe ser mayor a cero.");
    }
  }

  mostrarSaldo() {
    console.log(`${this.titular} tiene $${this.#saldo}`);
  }
}

const cuenta1 = new Cuenta("Ana", 100000);

cuenta1.mostrarSaldo();
cuenta1.depositar(50000);

// console.log(cuenta1.#saldo);
// La línea anterior daría error, porque #saldo es privado.

// Idea clave:
// Las propiedades privadas ayudan a proteger datos internos de la clase.



// ======================================================
// 12. SET
// ======================================================

// Set permite guardar valores únicos.
// Si repetimos un valor, no se duplica.

const lenguajes = new Set();

lenguajes.add("JavaScript");
lenguajes.add("Python");
lenguajes.add("JavaScript"); // No se repite

console.log(lenguajes);

// Convertimos el Set en arreglo para verlo más familiar:
console.log([...lenguajes]);

// Idea clave:
// Set es útil cuando necesitamos evitar duplicados.



// ======================================================
// 13. MAP
// ======================================================

// Map permite guardar datos con clave y valor.
// A diferencia de un objeto común, sus claves pueden ser de distintos tipos.

const usuarios = new Map();

usuarios.set("ana@correo.com", "Ana");
usuarios.set("carlos@correo.com", "Carlos");

console.log(usuarios.get("ana@correo.com"));
console.log(usuarios.has("carlos@correo.com"));

// Recorremos el Map:
for (let [correo, nombreUsuario] of usuarios) {
  console.log(`${nombreUsuario} usa el correo ${correo}`);
}

// Idea clave:
// Map es útil cuando necesitamos asociar claves con valores.



// ======================================================
// 14. MÓDULOS
// ======================================================

// En aplicaciones reales no escribimos todo en un solo archivo.
// Podemos separar el código en módulos.

// Ejemplo conceptual:
//
// archivo producto.js
// export class Producto { ... }
//
// archivo app.js
// import { Producto } from "./producto.js";
//
// Esto permite organizar mejor el proyecto.

// Idea clave:
// Los módulos ayudan a dividir una aplicación grande
// en archivos más pequeños y mantenibles.



// ======================================================
// 15. PROMESAS
// ======================================================

// Una promesa representa una operación que puede terminar bien o mal.
// Es muy usada cuando esperamos datos externos,
// por ejemplo desde una API o una base de datos.

const obtenerDatos = new Promise((resolve, reject) => {
  const exito = true;

  setTimeout(() => {
    if (exito) {
      resolve("Datos obtenidos correctamente.");
    } else {
      reject("Ocurrió un error al obtener los datos.");
    }
  }, 2000);
});

obtenerDatos
  .then((respuesta) => {
    console.log(respuesta);
  })
  .catch((error) => {
    console.log(error);
  });

// Idea clave:
// then maneja el caso exitoso.
// catch maneja el error.



// ======================================================
// 16. ASYNC / AWAIT
// ======================================================

// async/await permite trabajar con promesas
// usando una sintaxis más parecida al código secuencial.

function buscarUsuario() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        nombre: "María",
        rol: "Estudiante",
      });
    }, 1500);
  });
}

async function mostrarUsuario() {
  console.log("Buscando usuario...");

  const usuarioEncontrado = await buscarUsuario();

  console.log(`Usuario encontrado: ${usuarioEncontrado.nombre}`);
  console.log(`Rol: ${usuarioEncontrado.rol}`);
}

mostrarUsuario();

// Idea clave:
// await pausa la ejecución dentro de la función async
// hasta que la promesa se resuelva.



// ======================================================
// 17. TRY / CATCH CON ASYNC / AWAIT
// ======================================================

function consultarServidor() {
  return new Promise((resolve, reject) => {
    const servidorDisponible = false;

    setTimeout(() => {
      if (servidorDisponible) {
        resolve("Respuesta del servidor recibida.");
      } else {
        reject("El servidor no está disponible.");
      }
    }, 1500);
  });
}

async function ejecutarConsulta() {
  try {
    const respuesta = await consultarServidor();
    console.log(respuesta);
  } catch (error) {
    console.log("Error controlado:", error);
  }
}

ejecutarConsulta();

// Idea clave:
// try intenta ejecutar el código.
// catch captura el error si algo falla.
// Esto es fundamental para trabajar con APIs.



// ======================================================
// 18. MINI RETO FINAL
// ======================================================

// Desafío para estudiantes:
// Crear una clase Curso con:
// - nombre
// - duración
// - estudiantes
//
// Luego:
// - usar template strings para mostrar información
// - usar spread para agregar estudiantes sin modificar el arreglo original
// - usar un método para listar estudiantes
// - opcional: simular carga de datos con una promesa

class Curso {
  constructor(nombre, duracion, estudiantes = []) {
    this.nombre = nombre;
    this.duracion = duracion;
    this.estudiantes = estudiantes;
  }

  mostrarInfo() {
    console.log(`Curso: ${this.nombre}`);
    console.log(`Duración: ${this.duracion} horas`);
    console.log(`Cantidad de estudiantes: ${this.estudiantes.length}`);
  }

  agregarEstudiante(nombreEstudiante) {
    // Usamos spread para crear un nuevo arreglo
    // que incluye los estudiantes anteriores más el nuevo.
    this.estudiantes = [...this.estudiantes, nombreEstudiante];
  }

  listarEstudiantes() {
    console.log("Listado de estudiantes:");

    for (let estudiante of this.estudiantes) {
      console.log(`- ${estudiante}`);
    }
  }
}

const cursoJS = new Curso("Programación Avanzada JavaScript", 48);

cursoJS.agregarEstudiante("Ana");
cursoJS.agregarEstudiante("Carlos");
cursoJS.agregarEstudiante("María");

cursoJS.mostrarInfo();
cursoJS.listarEstudiantes();



// ======================================================
// CIERRE DE LA CLASE
// ======================================================

// ES6+ no cambia lo que JavaScript puede resolver,
// pero sí mejora la forma en que escribimos, organizamos
// y mantenemos nuestro código.

// Ideas fuerza:
// - let y const reemplazan el uso habitual de var.
// - Template strings mejoran la escritura de textos dinámicos.
// - Arrow functions simplifican funciones.
// - Destructuring permite extraer datos fácilmente.
// - Spread y rest ayudan a trabajar con arreglos y objetos.
// - Las clases permiten organizar objetos.
// - Las promesas y async/await permiten manejar asincronía.
// - Los módulos ayudan a dividir aplicaciones grandes.