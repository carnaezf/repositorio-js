// =======================================================
// MÓDULO 3 - FUNDAMENTOS DE PROGRAMACIÓN EN JAVASCRIPT
// Tema: Objetos en JavaScript
// Ejecutar con: node app.js
// =======================================================


// -------------------------------------------------------
// 1. Antes de objetos: variables separadas
// -------------------------------------------------------

// Hasta ahora hemos guardado datos en variables independientes.
// Esto funciona, pero cuando los datos pertenecen a una misma entidad,
// puede ser más ordenado agruparlos en un objeto.

// let nombre = "Camila";
// let edad = 25;
// let ciudad = "Santiago";


// -------------------------------------------------------
// 2. Creación de un objeto
// -------------------------------------------------------

// Un objeto permite agrupar información relacionada.
// En este caso, el objeto usuario representa a una persona.

let usuario = {
  nombre: "Camila",
  edad: 25,
  ciudad: "Santiago",
};

console.log("Objeto usuario:");
console.log(usuario);


// -------------------------------------------------------
// 3. Conceptos relacionados
// -------------------------------------------------------

// JSON significa JavaScript Object Notation.
// Es un formato de texto inspirado en los objetos de JavaScript.

// DOM significa Document Object Model.
// Es la representación del HTML como objetos que JavaScript puede manipular.

// String: es inmutable, sus métodos devuelven un nuevo string.
// Array: es mutable, puede cambiar su contenido.
// Object: es mutable y dinámico, puede cambiar sus propiedades.


// -------------------------------------------------------
// 4. Objeto producto
// -------------------------------------------------------

// Un objeto puede almacenar distintos tipos de datos:
// strings, numbers, arrays, otros objetos, funciones, etc.

let producto = {
  nombre: "Mouse",
  precio: 1200,
  stock: 15,
  caracteristicas: {},
  categorias: [],
};

console.log("Objeto producto:");
console.log(producto);


// -------------------------------------------------------
// 5. Acceso a propiedades con notación punto
// -------------------------------------------------------

// La notación punto permite acceder directamente a una propiedad.
// Estructura: objeto.propiedad

console.log("Nombre del producto:", producto.nombre);
console.log("Precio del producto:", producto.precio);
console.log("Stock del producto:", producto.stock);


// -------------------------------------------------------
// 6. Acceso a propiedades con notación corchete
// -------------------------------------------------------

// La notación corchete permite acceder a una propiedad usando un string.
// Estructura: objeto["propiedad"]

console.log("Nombre usando corchetes:", producto["nombre"]);


// -------------------------------------------------------
// 7. Propiedades con espacios o caracteres especiales
// -------------------------------------------------------

// Si una propiedad tiene espacios o guiones, debe escribirse entre comillas.
// En estos casos, se recomienda acceder usando notación corchete.

let contacto = {
  "nombre completo": "Juan González",

  "correo-electronico": function () {
    console.log("Hola Mundo");
  },
};

// Esto produciría error porque la propiedad tiene un espacio:
// console.log(contacto.nombre completo);

// Forma correcta:
console.log("Nombre completo:", contacto["nombre completo"]);

// También se puede ejecutar un método usando corchetes:
contacto["correo-electronico"]();


// -------------------------------------------------------
// 8. Métodos dentro de un objeto
// -------------------------------------------------------

// Un método es una función almacenada dentro de un objeto.

let objeto2 = {
  propiedad1: "Prueba",

  propiedad2: function () {
    console.log("Hola Mundo desde un método");
  },
};

console.log("Valor de propiedad1:", objeto2.propiedad1);

// Para ejecutar un método, se usan paréntesis.
objeto2.propiedad2();


// -------------------------------------------------------
// 9. Los objetos son dinámicos
// -------------------------------------------------------

// En JavaScript, podemos agregar nuevas propiedades después
// de haber creado el objeto.

console.log("Usuario antes de agregar curso:");
console.log(usuario);

usuario.curso = "JavaScript";

console.log("Usuario después de agregar curso:");
console.log(usuario);


// También podemos modificar propiedades existentes.

usuario.ciudad = "Coquimbo";

console.log("Usuario después de modificar ciudad:");
console.log(usuario);


// También se puede modificar usando notación corchete.

usuario["edad"] = 27;

console.log("Usuario después de modificar edad:");
console.log(usuario);


// -------------------------------------------------------
// 10. Uso de una variable para buscar una propiedad
// -------------------------------------------------------

// La notación corchete permite acceder a una propiedad
// cuyo nombre está guardado en una variable.

let propiedadBuscada = "ciudad";

console.log("Propiedad buscada:", usuario[propiedadBuscada]);


// -------------------------------------------------------
// 11. Object.create()
// -------------------------------------------------------

// Object.create() permite crear un nuevo objeto basado en otro.
// El nuevo objeto puede usar métodos del objeto base.

let persona = {
  saludar() {
    console.log("Hola");
  },
};

console.log("Objeto persona:");
console.log(persona);

// estudiante se crea usando persona como base.
let estudiante = Object.create(persona);

// Aunque estudiante no tiene escrito directamente el método saludar,
// puede usarlo porque lo toma desde persona.
estudiante.saludar();

// Agregamos una propiedad propia solo al objeto estudiante.
estudiante.nombre = "Pepito";

console.log("Objeto persona después de crear estudiante:");
console.log(persona);

console.log("Objeto estudiante:");
console.log(estudiante);

// Ambos pueden ejecutar saludar().
persona.saludar();
estudiante.saludar();


// -------------------------------------------------------
// 12. Objeto con método y uso de this
// -------------------------------------------------------

// this hace referencia al objeto que está ejecutando el método.
// En este caso, this.cargo apunta a trabajo.cargo.

const trabajo = {
  cargo: "Programador",
  tipo: "Por hora",
  jornada: "de lunes a viernes",

  detalles() {
    console.log(
      `El cargo de ${this.cargo} se trabaja ${this.tipo} y su jornada es ${this.jornada}.`
    );
  },
};

trabajo.detalles();


// -------------------------------------------------------
// 13. Object.keys()
// -------------------------------------------------------

// Object.keys() devuelve un arreglo con los nombres de las propiedades.

console.log("Object.keys(trabajo):");
console.log(Object.keys(trabajo));

let retornoKeys = Object.keys(trabajo);

console.log("Propiedades del objeto trabajo:");
console.log(retornoKeys);


// -------------------------------------------------------
// 14. Object.values()
// -------------------------------------------------------

// Object.values() devuelve un arreglo con los valores de las propiedades.

console.log("Object.values(trabajo):");
console.log(Object.values(trabajo));

let retornoValues = Object.values(trabajo);

console.log("Valores del objeto trabajo:");
console.log(retornoValues);


// -------------------------------------------------------
// 15. Object.entries()
// -------------------------------------------------------

// Object.entries() devuelve una matriz.
// Cada elemento contiene un par: [propiedad, valor].

console.log("Object.entries(trabajo):");
console.log(Object.entries(trabajo));

let retornoEntries = Object.entries(trabajo);

console.log("Entradas del objeto trabajo:");
console.log(retornoEntries);

// Accedemos a una posición específica de la matriz.
// retornoEntries[1] corresponde al segundo par.
// retornoEntries[1][1] corresponde al valor de ese par.

console.log("Valor de la segunda entrada:");
console.log(retornoEntries[1][1]);


// -------------------------------------------------------
// 16. Object.assign()
// -------------------------------------------------------

// Object.assign() permite combinar objetos.
// Importante: si usamos un objeto existente como primer argumento,
// ese objeto será modificado.

const datosPersonales = {
  nombre: "Philip",
  apellido: "Fry",
};

const datosLaborales = {
  empresa: "Delivery Boy",
  cargo: "Planet Express",
};

// Esta forma modifica datosPersonales porque es el primer argumento.
let persona2 = Object.assign(datosPersonales, datosLaborales);

console.log("Persona combinada con Object.assign:");
console.log(persona2);

console.log("datosPersonales también fue modificado:");
console.log(datosPersonales);


// Forma recomendada para no modificar los objetos originales:
// let persona2 = Object.assign({}, datosPersonales, datosLaborales);


// -------------------------------------------------------
// 17. Modificar un objeto antes de congelarlo
// -------------------------------------------------------

// Mientras el objeto no esté congelado, sus propiedades pueden cambiar.

datosPersonales.nombre = "Cap. Philip";

console.log("datosPersonales antes de Object.freeze:");
console.log(datosPersonales);


// -------------------------------------------------------
// 18. Object.freeze()
// -------------------------------------------------------

// Object.freeze() congela un objeto.
// Después de congelarlo, no se pueden modificar,
// agregar ni eliminar propiedades.

// Importante:
// Object.freeze() no crea una copia nueva.
// Congela el mismo objeto que recibe como argumento.

let persona3 = Object.freeze(datosPersonales);

// Este cambio no se aplicará porque el objeto está congelado.
persona3.nombre = "Nombre actualizado";

// Esta nueva propiedad tampoco se agregará.
persona3.edad = 30;

console.log("persona3 después de intentar modificarla:");
console.log(persona3);


// -------------------------------------------------------
// 19. Ejemplo básico de objeto mutable
// -------------------------------------------------------

// Este objeto todavía no está congelado.
// Por eso se puede modificar su precio y agregar stock.

let product = {
  nombre: "Teclado",
  precio: 1000,
};

console.log("Producto original:");
console.log(product);

// Modificar una propiedad existente.
product.precio = 15000;

// Agregar una nueva propiedad.
product.stock = 20;

console.log("Producto después de modificarlo:");
console.log(product);


// -------------------------------------------------------
// 20. Ejemplo con Object.freeze()
// -------------------------------------------------------

// Ahora crearemos otro producto y sí lo congelaremos.

let productoCongelado = {
  nombre: "Monitor",
  precio: 80000,
};

Object.freeze(productoCongelado);

// Estos cambios no se aplicarán.
productoCongelado.precio = 90000;
productoCongelado.stock = 5;

console.log("Producto congelado después de intentar modificarlo:");
console.log(productoCongelado);