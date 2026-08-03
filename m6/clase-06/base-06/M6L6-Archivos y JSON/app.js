import express from "express";

// importar middlewares
import logger from "./middlewares/logger.js";
import timer from "./middlewares/timer.js";
import unknownEndpoint from "./middlewares/unknownEndpoint.js"

// rutas
import clientesRoutes from "./routes/clientes.routes.js";

// Creamos la aplicación Express
const app = express();

// ==========================================
// CONFIGURACIÓN DE ENTORNO
// ==========================================

const PORT = 3001;

// ==========================================
// MIDDLEWARES
// ==========================================

// Middleware nativo para parsear JSON
app.use(express.json());

// ==========================================
// MIDDLEWARE 1: Logging básico (usa next)
// ==========================================
app.use(logger);

// ==========================================
// MIDDLEWARE 2: Medición de tiempo (usa next)
// ==========================================
app.use(timer);

// ==========================================
// RUTAS
// ==========================================

// Endpoint inicial de prueba

app.get("/", (req, res) => {
  res.send("API BancoEstado funcionando correctamente");
});

// ==========================================
// Rutas Banco Estado
// ==========================================
app.use("/clientes", clientesRoutes);

// ==========================================
// MIDDLEWARE 404 (RUTA NO ENCONTRADA)
// ==========================================
app.use(unknownEndpoint);

// ==========================================
// LEVANTAR SERVIDOR
// ==========================================

export default app;