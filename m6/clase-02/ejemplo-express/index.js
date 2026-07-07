// Importamos Express y, además, la función json.
// express nos permite crear el servidor.
// json nos permite leer datos JSON enviados en el body de una petición POST, PUT o PATCH.
import express, { json } from "express";

// Instanciar express
// Aquí creamos nuestra aplicación Express.
// Desde este objeto app definiremos rutas como GET, POST y DELETE.
const app = express();

// Definimos el puerto donde se ejecutará nuestro servidor.
// En este caso, la aplicación estará disponible en http://localhost:3000
const PORT = 3000;

// Middeleware para Json
// Este middleware permite que Express entienda datos enviados en formato JSON.
// Sin esta línea, request.body podría llegar como undefined en una petición POST.
app.use(json());

// Arreglo en memoria.
// Este arreglo simula una base de datos temporal.
// Mientras el servidor esté encendido, los datos existen.
// Si apagamos y volvemos a levantar el servidor, vuelve al estado inicial.
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// Rutas

// Ruta principal.
// Cuando el usuario entra a http://localhost:3000/
// Express ejecuta esta función.
app.get("/", (request, response) => {
  // Este console.log se ve en la terminal donde corre Node,
  // no en la consola del navegador.
  console.log("Se renderiza string con encabezado h1");

  // response.send envía una respuesta al navegador.
  // En este caso enviamos un string con contenido HTML.
  response.send(`<h1>Hola Mundo</h1>
                <script>
                    console.log("Este mensaje se ve en la consola");
                </script>`);
});

// Ruta GET para obtener todas las notas.
// Cuando el cliente consulta /api/notes,
// respondemos el arreglo completo en formato JSON.
app.get("/api/notes", (request, response) => {
  // response.json convierte el arreglo notes en una respuesta JSON.
  response.json(notes);
});

// Ruta GET con parámetro dinámico.
// El :id representa un valor variable que llega por la URL.
// Ejemplo: /api/notes/2
app.get("/api/notes/:id", (request, response) => {
  // request.params.id = 2

  // Los parámetros de la URL llegan como string.
  // Por eso usamos Number para convertirlo a número.
  const id = Number(request.params.id);

  // Buscamos dentro del arreglo notes una nota cuyo id coincida
  // con el id recibido desde la URL.
  const note = notes.find((note) => note.id === id);

  // Si la nota existe, la devolvemos como JSON.
  if (note) {
    response.json(note);
  } else {
    // Si no existe, respondemos con estado 404.
    // 404 significa "recurso no encontrado".
    response
      .status(404)
      .json({ error: `No se a encontrado la nota con el Id: ${id}` });
  }
});

// Ruta DELETE para eliminar una nota por ID.
// Ejemplo: DELETE /api/notes/2
app.delete("/api/notes/:id", (request, response) => {
  // Capturamos el id que viene por la URL y lo convertimos a número.
  const id = Number(request.params.id);

  // filter crea un nuevo arreglo dejando fuera la nota que tenga el id indicado.
  // En simple: conservamos todas las notas cuyo id sea distinto al id recibido.
  notes = notes.filter((note) => note.id !== id);

  // Respondemos al cliente indicando que la eliminación fue procesada.
  response.status(200).send(`<h1>se eliminó ID ${id}</h1>`);
});

// Ruta POST para crear una nueva nota.
// El cliente debe enviar un JSON en el body de la petición.
// Ejemplo:
// {
//   "content": "Nueva nota",
//   "important": true
// }
app.post("/api/notes", (request, response) => {
  // Calculando el nuevo ID.

  // Esta línea busca el ID más alto que existe actualmente en el arreglo.
  // Si hay notas, obtiene todos los ids con map, calcula el máximo con Math.max,
  // y luego más abajo se le suma 1.
  // Si no hay notas, maxId parte en 0.
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

  // Mostramos en terminal el ID máximo actual.
  console.log(maxId);

  // Mostramos en terminal el contenido recibido en el body.
  // Esto funciona gracias al middleware app.use(json()).
  console.log("Contenido de Request Body", request.body);

  // Guardamos en una variable la nota recibida desde el cliente.
  const note = request.body;

  // Asignamos un nuevo id a la nota.
  // Si el ID máximo era 3, la nueva nota tendrá id 4.
  note.id = maxId + 1;

  // Mostramos el arreglo antes de agregar la nueva nota.
  console.log("Notes antes de concat note", notes);

  // concat crea un nuevo arreglo agregando la nueva nota.
  // Luego reasignamos notes con ese nuevo arreglo.
  notes = notes.concat(note);

  // Mostramos el arreglo después de agregar la nueva nota.
  console.log("Notes despues de concat note", notes);

  // Respondemos al cliente con la nota recién creada.
  response.json(note);
});

// Iniciar servidor
// app.listen deja el servidor escuchando peticiones en el puerto definido.
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
