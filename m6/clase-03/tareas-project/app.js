// Importamos Express para crear el servidor y definir rutas.
import express from "express";

// Importamos moment para trabajar con fechas de forma más cómoda.
import moment from "moment";

// Creamos la aplicacion de Express
// app será nuestro servidor/aplicación principal.
const app = express();

// Configurar entorno
// Definimos el puerto donde escuchará nuestro servidor.
const PORT = 3000;

// Middlewares
// Middleware nativo para parsear JSON
// Esto permite que Express pueda leer datos enviados en formato JSON desde el body.
// Es clave para rutas POST y PUT.
app.use(express.json());

// Middleware personalizado (loggin basico)
// Este middleware se ejecuta en cada petición antes de llegar a la ruta final.
app.use((req, res, next) => {
  // Generamos una fecha formateada para registrar cuándo llegó la petición.
  const fecha = moment().format("YYYY-MM-DD HH:mm:ss");

  // Mostramos en consola la fecha, el método HTTP y la URL solicitada.
  // Ejemplo: [2026-07-08 20:30:00] GET /tareas
  console.log(`[${fecha}] ${req.method} ${req.url}`);

  // next() permite que la petición continúe hacia el siguiente middleware o ruta.
  next();
});

// Middleware 2: Medicion de tiempo de respuesta (Muy util )
// Este middleware mide cuánto demora el servidor en responder una petición.
app.use((req, res, next) => {
  // Guardamos el tiempo inicial cuando entra la petición.
  const inicio = Date.now();

  // El evento "finish" se ejecuta cuando la respuesta ya fue enviada al cliente.
  res.on("finish", () => {
    // Calculamos la diferencia entre el tiempo final y el inicial.
    const duracion = Date.now() - inicio;

    // Mostramos cuánto demoró la respuesta.
    console.log(`Tiempo de respuesta: ${duracion}ms`);
  });

  // Dejamos pasar la petición.
  next();
});

// BBDD en memoria
// Este arreglo simula una base de datos temporal.
// Ojo: si apagamos el servidor, los cambios se pierden.
let tareas = [
  { id: 1, titulo: "Aprender Node", estado: "pendiente" },
  { id: 2, titulo: "Instalar Express", estado: "completada" },
  { id: 3, titulo: "Crear servidor", estado: "completada" },
  { id: 4, titulo: "Entender middleware", estado: "pendiente" },
  { id: 5, titulo: "Probar con Postman", estado: "pendiente" },
  { id: 6, titulo: "Leer sobre asincronía", estado: "pendiente" },
];

// Rutas
// Endpoint inicial de prueba
// Sirve para comprobar rápidamente que la API está funcionando.
app.get("/", (req, res) => {
  res.send("API de tareas funcionando correctamente");
});

// CRUD de tareas
// GET => obtener todas las tareas
// Esta ruta devuelve el arreglo completo de tareas en formato JSON.
app.get("/tareas", (req, res) => {
  res.json(tareas);
});

// POST => Crear una nueva tarea
// Esta ruta recibe datos desde el cliente y agrega una nueva tarea al arreglo.
app.post("/tareas", (req, res) => {
  // Extraemos la propiedad titulo desde req.body.
  // req.body contiene los datos enviados por el cliente.
  const { titulo } = req.body;

  // Validación básica (muy importante en backend)
  // Si no llega un título, detenemos el flujo y respondemos error 400.
  // 400 significa que el cliente envió una solicitud incorrecta.
  if (!titulo) {
    return res.status(400).json({ error: "El título es obligatorio" });
  }

  // Generar ID autoincremental
  // Tomamos el último ID y sumamos 1
  // Si el arreglo tiene tareas, tomamos el id de la última.
  // Si el arreglo está vacío, partimos desde 1.
  const nuevoId = tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1;

  // Creamos el objeto de la nueva tarea.
  const nuevaTarea = {
    id: nuevoId,
    titulo,
    estado: "pendiente", // estado inicial
  };

  // Agregamos la nueva tarea al arreglo.
  tareas.push(nuevaTarea);

  // Mostramos en consola la tarea creada para depuración.
  console.log("Tarea creada:", nuevaTarea);

  // 201 = recurso creado correctamente
  // Respondemos al cliente con la tarea recién creada.
  res.status(201).json(nuevaTarea);
});

// PUT => Actualizar una tarea existente.
// En este ejemplo, usamos PUT para marcar una tarea como completada.
app.put("/tareas/:id", (req, res) => {
  // req.params viene desde la URL
  // Ejemplo: /tareas/3
  // req.params.id sería "3", como string.
  const id = parseInt(req.params.id); // integer 1

  // Buscar tarea por ID
  // find devuelve la primera tarea que cumpla la condición.
  const tarea = tareas.find((t) => t.id === id);
  // si existe = 1
  //  si no existe = undefined

  // Si no encontramos la tarea, respondemos con error 404.
  // 404 significa "no encontrado".
  if (!tarea) {
    // true - false

    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  // actualizamos el estado
  // Como tarea es una referencia al objeto dentro del arreglo,
  // al cambiar tarea.estado también cambia dentro de tareas.
  tarea.estado = "Completada";

  // Mostramos en consola la tarea actualizada.
  console.log("Tarea completada", tarea);

  // Respondemos con la tarea modificada.
  res.json(tarea);
});

// GET usado como eliminación simple para aprendizaje.
// No es lo más correcto en REST, pero ayuda a probar desde el navegador.
app.get("/eliminar-tarea/:id", (req, res) => {
  // req.params viene desde la URL
  // Capturamos el id enviado en la ruta.
  const id = parseInt(req.params.id);

  // findIndex busca la posición de la tarea dentro del arreglo.
  // Si la encuentra, devuelve 0, 1, 2, etc.
  // Si no la encuentra, devuelve -1.
  const index = tareas.findIndex((t) => t.id === id); // si existe retorna -1

  // Si index es -1, significa que no existe una tarea con ese ID.
  if (index === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  //   eliminamos del array
  // splice(index, 1) elimina 1 elemento desde la posición encontrada.
  // Devuelve un arreglo con el elemento eliminado.
  const tareaEliminada = tareas.splice(index, 1);

  // Mostramos en consola la tarea eliminada.
  console.log("Tarea eliminada", tareaEliminada[0]);

  // Respondemos con un mensaje y la tarea que fue eliminada.
  res.json({
    mensaje: "Tarea eliminada correctamente",
    tarea: tareaEliminada[0],
  });
});


// DELETE → Eliminar tarea por ID
// Esta es la forma más correcta para una API REST.
app.delete('/tareas/:id', (req, res) => {
  // Capturamos el id desde la URL y lo convertimos a número.
  const id = parseInt(req.params.id);

  // Buscar índice de la tarea
  // findIndex nos permite saber en qué posición está la tarea dentro del arreglo.
  const index = tareas.findIndex(t => t.id === id);

  // Validación: si no existe
  // Si findIndex devuelve -1, quiere decir que no encontró la tarea.
  if (index === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  // Eliminamos del array
  // splice modifica el arreglo original y extrae la tarea eliminada.
  const tareaEliminada = tareas.splice(index, 1);

  // Mostramos en consola qué tarea fue eliminada.
  console.log("Tarea eliminada:", tareaEliminada[0]);

  // Respondemos al cliente confirmando la eliminación.
  res.json({
    mensaje: "Tarea eliminada correctamente",
    tarea: tareaEliminada[0]
  });
});



// Levantar el servidor
// app.listen inicia el servidor y lo deja escuchando peticiones.
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});