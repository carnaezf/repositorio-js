import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import sequelize from "./src/config/db.js";
import "./src/models/index.js";

import healthRoutes from "./src/routes/health.routes.js";
import paisRoutes from "./src/routes/pais.routes.js";

import logger from "./src/middlewares/logger.js";
import timer from "./src/middlewares/timer.js";
import unknownEndpoint from "./src/middlewares/unknownEndpoint.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const nombreArchivo = fileURLToPath(import.meta.url);
const directorioActual = path.dirname(nombreArchivo);

const frontendPath = path.join(
  directorioActual,
  "frontend"
);

/*
|--------------------------------------------------------------------------
| MIDDLEWARES GENERALES
|--------------------------------------------------------------------------
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(timer);

/*
|--------------------------------------------------------------------------
| FRONTEND
|--------------------------------------------------------------------------
|
| No se utiliza una carpeta public.
| El contenido del frontend está en /frontend
| y se publica bajo la URL /app.
|
*/

app.use(
  "/app",
  express.static(frontendPath)
);

/*
|--------------------------------------------------------------------------
| RUTAS
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    mensaje: "API de países funcionando.",
    frontend: "/app",
    health: "/health",
    recursos: "/api/v1/paises",
  });
});

app.use("/health", healthRoutes);

app.use(
  "/api/v1/paises",
  paisRoutes
);

/*
|--------------------------------------------------------------------------
| MANEJO DE ERRORES
|--------------------------------------------------------------------------
*/

app.use(unknownEndpoint);
app.use(errorMiddleware);

/*
|--------------------------------------------------------------------------
| INICIAR SERVIDOR
|--------------------------------------------------------------------------
*/

const iniciarServidor = async () => {
  try {
    await sequelize.authenticate();

    console.log(
      "Conexión con Sequelize establecida correctamente."
    );

    /*
     * No usamos sequelize.sync().
     * Las tablas ya se crean mediante init.sql.
     */

    app.listen(PORT, () => {
      console.log(
        `Servidor disponible en http://localhost:${PORT}`
      );

      console.log(
        `Frontend disponible en http://localhost:${PORT}/app`
      );
    });
  } catch (error) {
    console.error(
      "No fue posible iniciar la aplicación:",
      error.message
    );

    process.exit(1);
  }
};

iniciarServidor();