import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import pool from "./src/config/db.js";
import testRoutes from "./src/routes/test.routes.js";
import healthRoutes from "./src/routes/health.routes.js";
import mascotasRoutes from "./src/routes/mascotas.routes.js";

import { errorHandler } from "./src/middlewares/error.middleware.js";
import unknownEndpoint from "./src/middlewares/unknownEndpoint.js";



dotenv.config();

const app = express();

// Configuracion de entorno
const PORT = process.env.PORT || 3000;

// Middlewares base
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static("public"));


// Ruta base
app.use("/test", testRoutes);

app.use("/health", healthRoutes);

app.use("/mascotas", mascotasRoutes);


// // Middleware 404
app.use(unknownEndpoint);

// Middleware global
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
