import express from "express";

const PORT = 3000;

// Crear la aplicacion (nuestro servidor backend)
const app = express();

// Simular una base datos en memoria (array de objetos)
let notas = [
  {
    id: 1,
    content: "Node.js permite ejecutar JavaScript en el backend.",
    important: true,
  },
  {
    id: 2,
    content: "El backend maneja requests y responses.",
  },
];

// Rutas
// Ruta 1: Definimos un aruta GET en "/"
// cuando un usuario entra a http://localhost:3000/

app.get("/", (request, response) => {
  // Enviamos una respuesta HTML simple
  // send() se usa para envioar texto o HTML
  response.send("<h1>Hola a todos</h1>");
});

// Ruta 2: API (datos)
// Definimos una ruta GET en "/api/notes"
// Esta ruta devuelve datos en formato JSON
app.get("/api/notes", (request, response) => {
  response.json(notas);
});

// levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
