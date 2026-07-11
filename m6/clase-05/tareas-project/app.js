// Importamos Express para crear el servidor y definir rutas.
import express from "express";

// Importamos moment para trabajar con fechas de forma más cómoda.
import moment from "moment";

// Importamos "fs" para leer y escribir en aerchivos
import fs, { existsSync } from "fs";

import fileUpload from "express-fileupload";

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

// Middleware para subida de archivos
app.use(fileUpload());

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

// Simular BBDD
const FILE_PATH = "./tareas.json";

// Carpeta donde guardaremos los archivos subidos
const UPLOADS_PATH = "./uploads";

if (!existsSync(UPLOADS_PATH)) {
  fs.mkdirSync(UPLOADS_PATH);
  console.log("Carpeta uploads creada correctamente");
}

let tareas = [];

// Simulacion de conexion a BBD
function conectarDB() {
  if (!fs.existsSync(FILE_PATH)) {
    console.error(
      "Error: conexión a la base de datos no establecida (archivo no encontrado)",
    );
    return false;
  }

  try {
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    tareas = JSON.parse(data);
    console.log("Conexión a la base de datos establecida");
    return true;
  } catch (error) {
    console.error("Error al leer la base de datos:", error);
    return false;
  }
}
// Ejecutar la conexion al iniciar el servidor
const dbConectada = conectarDB();

function guardarTareas() {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tareas, null, 2), (err) => {
    if (err) {
      console.log("Error al guardar:", err);
    } else {
      console.log("Datos guardados en DB");
    }
  });
}

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
  if (!dbConectada) {
    return res.status(500).json({ error: "Base de datos no disponible" });
  }
  res.json(tareas);
});

// POST => Crear una nueva tarea
// Esta ruta recibe datos desde el cliente y agrega una nueva tarea al arreglo.
app.post("/tareas", (req, res) => {
  if (!dbConectada) {
    return res.status(500).json({ error: "Base de datos no disponible" });
  }

  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({ error: "El título es obligatorio" });
  }

  // Generar ID autoincremental
  // Tomamos el último ID y sumamos 1
  const nuevoId = tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1;

  // Creamos el objeto de la nueva tarea.
  const nuevaTarea = {
    id: nuevoId,
    titulo,
    estado: "pendiente", // estado inicial
  };

  // Agregamos la nueva tarea al arreglo.
  tareas.push(nuevaTarea);
  guardarTareas();

  // Mostramos en consola la tarea creada para depuración.
  console.log("Tarea creada:", nuevaTarea);

  // 201 = recurso creado correctamente
  // Respondemos al cliente con la tarea recién creada.
  res.status(201).json(nuevaTarea);
});

// PUT => Actualizar una tarea existente.
app.put("/tareas/:id", (req, res) => {
  if (!dbConectada) {
    return res.status(500).json({ error: "Base de datos no disponible" });
  }

  const id = parseInt(req.params.id); // integer 1

  // Buscar tarea por ID
  const tarea = tareas.find((t) => t.id === id);

  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  tarea.estado = "Completada";

  // console.log("Tarea completada", tarea);
  guardarTareas();

  res.json(tarea);
});

// GET usado como eliminación simple para aprendizaje.
// No es lo más correcto en REST, pero ayuda a probar desde el navegador.
app.get("/eliminar-tarea/:id", (req, res) => {
  if (!dbConectada) {
    return res.status(500).json({ error: "Base de datos no disponible" });
  }

  const id = parseInt(req.params.id);

  const index = tareas.findIndex((t) => t.id === id); // si existe retorna -1

  if (index === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  const tareaEliminada = tareas.splice(index, 1);

  // console.log("Tarea eliminada", tareaEliminada[0]);
  guardarTareas();

  res.json({
    mensaje: "Tarea eliminada correctamente",
    tarea: tareaEliminada[0],
  });
});

// DELETE → Eliminar tarea por ID
// Esta es la forma más correcta para una API REST.
app.delete("/tareas/:id", (req, res) => {
  // Capturamos el id desde la URL y lo convertimos a número.
  const id = parseInt(req.params.id);

  // Buscar índice de la tarea
  // findIndex nos permite saber en qué posición está la tarea dentro del arreglo.
  const index = tareas.findIndex((t) => t.id === id);

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
    tarea: tareaEliminada[0],
  });
});

// POST → Subir un archivo al servidor
app.post("/subir-archivo", (req, res) => {
  // Validamos si llegó algún archivo
  if (!req.files || !req.files.archivo) {
    return res.status(400).json({
      error: "No se envió ningún archivo. Debes enviar un archivo con el nombre 'archivo'.",
    });
  }

  // Capturamos el archivo enviado desde el cliente
  const archivo = req.files.archivo;

  // Definimos la ruta donde se guardará el archivo
  const rutaDestino = `${UPLOADS_PATH}/${archivo.name}`;

  // Movemos el archivo desde la memoria temporal hacia la carpeta uploads
  archivo.mv(rutaDestino, (error) => {
    if (error) {
      return res.status(500).json({
        error: "Error al guardar el archivo",
      });
    }

    res.status(201).json({
      mensaje: "Archivo subido correctamente",
      nombre: archivo.name,
      tipo: archivo.mimetype,
      tamaño: archivo.size,
      ruta: rutaDestino,
    });
  });
});

// Levantar el servidor
// app.listen inicia el servidor y lo deja escuchando peticiones.
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
