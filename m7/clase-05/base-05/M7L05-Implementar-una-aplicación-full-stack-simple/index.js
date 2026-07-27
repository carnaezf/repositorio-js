import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import sequelize from "./src/config/db.js";

import testRoutes from "./src/routes/test.routes.js";
import healthRoutes from "./src/routes/health.routes.js";
import clientesRoutes from "./src/routes/clientes.routes.js";

import {
  errorHandler,
} from "./src/middlewares/error.middleware.js";

import unknownEndpoint from "./src/middlewares/unknownEndpoint.js";

// Importar el modelo garantiza que Sequelize
// conozca su definición antes de ejecutar sync().
import "./src/models/cliente.model.js";

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

// Permite recibir cuerpos JSON.
// Es necesario para leer req.body en POST /clientes.
app.use(express.json());

// Permite servir el frontend desde la carpeta public.
app.use(express.static("public"));

// =====================================================
// RUTAS EXISTENTES DE LA PLANTILLA
// =====================================================

app.use("/test", testRoutes);
app.use("/health", healthRoutes);

// =====================================================
// RUTAS DE CLIENTES
// =====================================================

// La definición de los endpoints se encuentra en:
// src/routes/clientes.routes.js
//
// La recepción de req y construcción de res se encuentra en:
// src/controllers/clientes.controller.js
//
// El acceso directo al modelo Sequelize se encuentra en:
// src/services/clientes.service.js
//
// La representación de la tabla clientes se encuentra en:
// src/models/cliente.model.js

app.use("/clientes", clientesRoutes);

// =====================================================
// MIDDLEWARE PARA RUTAS NO ENCONTRADAS
// Debe quedar después de todas las rutas.
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
    // Comprueba que las credenciales y PostgreSQL
    // se encuentren disponibles.
    await sequelize.authenticate();

    console.log(
      "Conexión con PostgreSQL establecida mediante Sequelize.",
    );

    // Crea la tabla clientes solamente si no existe.
    //
    // No utilizamos:
    // sync({ force: true })
    //
    // porque eliminaría y volvería a crear las tablas.
    await sequelize.sync();

    console.log(
      "Modelos sincronizados correctamente.",
    );

    app.listen(PORT, () => {
      console.log(
        `Servidor disponible en http://localhost:${PORT}`,
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