// Objeto "{}"

// Estructura de datos mutable.
let person = {
  name: "Cesar",
  age: 42,
  course: "FullStack JavaScript",
};

console.log(person); // Imprimiendo el objeto completo con todas sus propiedades

// Accediendo a las propiedades de un objeto
// Dot notation - Notacion de punto.
// Notacion de corchetes.

// 1. Notacion de punto
curso = person.course;
console.log(curso);

// 2. Notacion corchetes (Util si la propiedad tiene espacios)
console.log(person["name"]);

// Mutabilidad de los objetos
person.name = "Cesar Arnaez";
console.log(person["name"]);

console.log(person);

// Revisar el tipo original de la propiedad
console.log(typeof person);
console.log(typeof person.name);
console.log("Tipo de dato edad:", typeof person.age); // number

// Podemos reasignar eñ valor de una propiedad con otro tipo de dato
person.age = "42";
console.log(typeof person.age);
console.log("Tipo de dato edad:", typeof person.age); // number

// Eliminar propiedades
let eliminado = delete person.age;
console.log(person);

console.log(eliminado);

// Agregar nuevas propiedades
person.peso = 95;
console.log(person);

person.mail = "mail@mail.cl";

console.log(person);

// Reasignar propiedades con corchetes
person["peso"] = 90;
console.log(person);

// Funciones como metodos del objeto

let person2 = {
  name: "Pepito",
  age: 30,
  course: "FullStack Pyhton",

  run: function () {
    // Esta funcion es un metodo del objeto person2
    console.log("La persona corre");
  },
};

person2.run(); // Llamando al metodo

// Objetos anidados
let person3 = {
  name: "Pepito",
  age: 30,
  course: "FullStack Pyhton",
  run: function () {
    // Esta funcion es un metodo del objeto person2
    console.log("La persona corre");
  },
  hobbie: {
    // Abjeto anidado dentro de 'person3
    name: "Nadar",
    style: "libre",
    fun: function () {
      console.log("La persona se divierte");
    },
  },
  comidas: [
    { favotita1: "Empanadas" },
    { favortita2: "Terremoto" },
    { favorito3: "Completo" },
  ],
};

console.log(person3);
console.log(person3.name);
console.log(person3.hobbie.name);
person3.hobbie.fun(); //Llamado de metodo dentro del objeto
person3.run(); //Llamado de metodo dentro del objeto

function saludar() {
  console.log("Hola");
}

// console.log(saludar());

saludar();

// Comparaciones de objetos
// Los tipos primitivos (strings, numeros) se comparan por valor
//  Lo sobetos se compararn por referencia (es decir, por su ubicacion memoria)

let person4 = {
  name: "Cesar",
  age: 42,
  course: "FullStack JavaScript",
};

let person5 = {
  name: "Cesar",
  age: 42,
  course: "FullStack JavaScript",
};

console.log(person4);
console.log(person5);

console.log(person4 == person5);
console.log(person4 === person5);

// y si comparamos propiedades individuales?
console.log(person4.age === person5.age);
// console.log(42 === 42);

console.log(person5);

for (let key in person5) {
  console.log(person5[key]);
}

let claves = Object.keys(person5); // [ 'name', 'age', 'course' ]
console.log(claves);


for (let i = 0; i < claves.length; i++) {
  let clave = claves[i];
  console.log(person5[clave]);
}

// Ejercicios

// 1. Crea un objeto con 3 propiedades

// 2. Accede y muestra su valor

// 3. Agrega una nueva propiedad

// 4. Elimina una de las 3 primeras propiedades

// 5. Agrega una función e invócala

// 6. Itera las propiedades del objeto

// 7. Crea un objeto anidado

// 8. Accede y muestra el valor de las propiedades anidadas

// 9. Comprueba si los dos objetos creados son iguales

// 10. Comprueba si dos propiedades diferentes son iguales
