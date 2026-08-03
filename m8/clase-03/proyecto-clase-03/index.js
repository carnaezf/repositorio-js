import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadMiddleware from "./src/config/upload.js";

import { sequelize } from "./src/models/index.js";

import testRoutes from "./src/routes/test.routes.js";
import healthRoutes from "./src/routes/health.routes.js";
import cancionRoutes from "./src/routes/cancion.routes.js";

import logger from "./src/middlewares/logger.js";
import timer from "./src/middlewares/timer.js";
import unknownEndpoint from "./src/middlewares/unknownEndpoint.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

/*
|--------------------------------------------------------------------------
| MIDDLEWARES GENERALES
|--------------------------------------------------------------------------
|
| Se registran antes de las rutas para que puedan procesar todas las
| peticiones.
|
*/

app.use(cors());

app.use(logger);

app.use(timer);

app.use(express.json());

/*
|--------------------------------------------------------------------------
| ARCHIVOS MULTIPART
|--------------------------------------------------------------------------
|
| express.json() procesa cuerpos JSON.
| uploadMiddleware procesa multipart/form-data.
|
*/

app.use(uploadMiddleware);



/*
|--------------------------------------------------------------------------
| RUTA PRINCIPAL
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  return res.status(200).json({
    ok: true,
    message:
      "Plantilla API REST con Express, PostgreSQL y Sequelize",
    version: "v1",
    endpoints: {
      health: "/health",
      test: "/test",
      orm: "/test/orm",
    },
  });
});

/*
|--------------------------------------------------------------------------
| RUTAS TÉCNICAS
|--------------------------------------------------------------------------
*/

app.use("/test", testRoutes);

app.use("/health", healthRoutes);

/*
|--------------------------------------------------------------------------
| RUTAS DEL PROYECTO
|--------------------------------------------------------------------------
|
| Las rutas del dominio se agregarán en esta sección.
|
| Ejemplo:
|
| app.use("/api/v1/usuarios", usuarioRoutes);
| app.use("/api/v1/proyectos", proyectoRoutes);
|
*/

app.use(
  "/api/v1/canciones",
  cancionRoutes
);

/*
|--------------------------------------------------------------------------
| ENDPOINT NO ENCONTRADO
|--------------------------------------------------------------------------
*/

app.use(unknownEndpoint);

/*
|--------------------------------------------------------------------------
| MANEJADOR GLOBAL DE ERRORES
|--------------------------------------------------------------------------
*/

app.use(errorHandler);

/*
|--------------------------------------------------------------------------
| INICIAR SERVIDOR
|--------------------------------------------------------------------------
|
| Se verifica la conexión antes de comenzar a escuchar peticiones.
|
| No se utiliza sequelize.sync(), porque la definición de tablas dependerá
| de cada proyecto.
|
*/

const iniciarServidor = async () => {
  try {
    await sequelize.authenticate();

    console.log(
      "Conexión con PostgreSQL establecida correctamente"
    );

    app.listen(PORT, () => {
      console.log(
        `Servidor disponible en http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "No fue posible iniciar la aplicación:"
    );

    console.error(error.message);

    process.exit(1);
  }
};

iniciarServidor();
