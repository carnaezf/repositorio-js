import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./src/routes/test.routes.js";
import healthRoutes from "./src/routes/health.routes.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";
import unknownEndpoint from "./src/middlewares/unknownEndpoint.js";

import { Director, Pelicula } from "./src/models/index.js";

dotenv.config();

const app = express();

// Configuracion de entorno
const PORT = process.env.PORT || 3000;

// Middlewares base
app.use(cors());
app.use(express.json());

// Ruta base
app.use("/test", testRoutes);

app.use("/health", healthRoutes);

// Ruta de inicio
app.get("/", (req, res) => {
  res.status(200).json({
    message: "APIS de peliculas con Sequelize",
  });
});

// Relaciones
// Relacion 1: N
// Directores y Peliculas

// posterior la ruta debe ir en src/roures/directores.routes.ks
app.get("/directores", async (req, res, next) => {
  try {
    // esta consulta y construccion de respuesta
    // deberia ejecutarse desde un controlladors

    const directores = await Director.findAll({
      include: {
        model: Pelicula,
        as: "peliculas",
      },
      order: [["id", "ASC"]],
    });

    res.status(200).json(directores);
  } catch (error) {
    next(error);
  }
});

app.post("/directores", async (req, res, next) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      res.status(400).json({
        message: "El nombre del director es obligatorio",
      });
    }

    const nuevoDirector = await Director.create({
      nombre,
    });

    res.status(201).json(nuevoDirector)
  } catch (error) {
    next(error)
  }
});

// // Middleware 404
app.use(unknownEndpoint);

// Middleware global
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
