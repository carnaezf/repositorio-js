import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import testRoutes from "./src/routes/test.routes.js";
import healthRoutes from "./src/routes/health.routes.js";
import peliculasRoutes from "./src/routes/peliculas.routes.js";
import actoresRoutes from "./src/routes/actores.routes.js";
import asignacionesRoutes from "./src/routes/asignaciones.routes.js";

import {
  errorHandler,
} from "./src/middlewares/error.middleware.js";

import unknownEndpoint from "./src/middlewares/unknownEndpoint.js";

// Al importar desde models/index.js se cargan:
// - Los modelos.
// - La tabla intermedia.
// - Las asociaciones.
import { sequelize } from "./src/models/index.js";

dotenv.config();

const app = express();

// =====================================================
// CONFIGURACIÓN DE ENTORNO
// =====================================================

const PORT = process.env.PORT || 3000;

// =====================================================
// MIDDLEWARES BASE
// =====================================================

app.use(cors());

// Permite leer cuerpos JSON mediante req.body.
app.use(express.json());

// Registra las peticiones en la terminal.
app.use(morgan("dev"));

// Permite servir el frontend desde public.
app.use(express.static("public"));

// =====================================================
// RUTAS EXISTENTES DE LA PLANTILLA
// =====================================================

app.use("/test", testRoutes);
app.use("/health", healthRoutes);

// =====================================================
// RUTAS DE LA ACTIVIDAD
// =====================================================

// Las rutas solamente definen los endpoints.
// Su implementación está en src/routes.
app.use("/peliculas", peliculasRoutes);
app.use("/actores", actoresRoutes);
app.use(
  "/asignar-actor",
  asignacionesRoutes,
);

// La recepción de req y construcción de res
// se encuentra en src/controllers.
//
// El acceso a datos y las transacciones
// se encuentran en src/services.
//
// Los modelos y asociaciones Sequelize
// se encuentran en src/models.

// =====================================================
// MIDDLEWARE 404
// Debe estar después de todas las rutas.
// =====================================================

app.use(unknownEndpoint);

// =====================================================
// MIDDLEWARE GLOBAL DE ERRORES
// Debe ser el último middleware.
// =====================================================

app.use(errorHandler);

// =====================================================
// INICIAR SERVIDOR
// =====================================================

const iniciarServidor = async () => {
  try {
    // Verifica las credenciales y la disponibilidad
    // de PostgreSQL.
    await sequelize.authenticate();

    console.log(
      "Conexión con Sequelize establecida correctamente.",
    );

    // Crea las tablas si todavía no existen.
    //
    // No utilizamos force: true porque eliminaría
    // las tablas y sus registros.
    await sequelize.sync();

    console.log(
      "Modelos sincronizados correctamente.",
    );

    app.listen(PORT, () => {
      console.log(
        `Servidor en http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error(
      "No fue posible iniciar la aplicación:",
      error.message,
    );

    process.exit(1);
  }
};

iniciarServidor();