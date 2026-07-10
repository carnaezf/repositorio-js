// Importar paquetes
import express from "express";

// Importar middlewares
import logger from "./middlewares/logger.js";
import timer from "./middlewares/timer.js";
import unknownEndpoint from "./middlewares/unknownEndpoint.js";

// rutas
import videoJuegosRoutes from "./routes/videojuegos.routes.js";

// Crear la aplicacion de Express
const app = express();

// Middlewares
// Middlewares nativo para parsear JSON
app.use(express.json());

// Middlewares personalizados
// Middleware 1: logging básico
app.use(logger);

// Middlewre 2: medición de tiempo
app.use(timer);

// Rutas
app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

// CRUD
app.use("/videojuegos", videoJuegosRoutes)

// Midleware 404 (Ruta no encontrada)
app.use(unknownEndpoint);

export default app;
