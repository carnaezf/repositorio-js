import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./src/routes/test.routes.js";
import healthRoutes from "./src/routes/health.routes.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";
import unknownEndpoint from "./src/middlewares/unknownEndpoint.js";

import {
  Director,
  Pelicula,
  Genero,
  PeliculaGenero,
  Usuario,
  Perfil,
} from "./src/models/index.js";

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

    res.status(201).json(nuevoDirector);
  } catch (error) {
    next(error);
  }
});

app.post("/peliculas", async (req, res, next) => {
  try {
    const { titulo, anio, directorId } = req.body;

    if (!titulo || !anio || !directorId) {
      return res.status(400).json({
        message: "Titulo, anio y directorId son obligatorios",
      });
    }

    // Esto deberia es un SERVICE porque interactua
    // directamenbte con la BBDD

    const director = await Director.findByPk(directorId);

    if (!director) {
      return res.status(404).json({
        message: "El director indicado no existe",
      });
    }

    const nuevaPelicula = await Pelicula.create({
      titulo,
      anio,
      directorId,
    });

    res.status(201).json(nuevaPelicula);
  } catch (error) {
    next(error);
  }
});

app.get("/peliculas", async (req, res, next) => {
  try {
    const peliculas = await Pelicula.findAll({
      include: [
        {
          model: Director,
          as: "director",
          attributes: ["id", "nombre"],
        },
        {
          model: Genero,
          as: "generos",
          attributes: ["id", "nombre"],

          through: {
            attributes: ["principal"],
          },
        },
      ],
      order: [["id", "ASC"]],
    });

    res.status(200).json(peliculas);
  } catch (error) {
    next(error);
  }
});

app.delete("/directores/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Service
    const director = await Director.findByPk(id);

    if (!director) {
      return res.status(404).json({
        message: "Director no encontrado",
      });
    }
    await director.destroy();

    res.status(200).json({
      message:
        "Director eliminado, Sus peliculas tambien fueron eliminadas por cascada",
    });
  } catch (error) {
    next(error);
  }
});

// Relacion 1 : 1
// Usuarios y perfiles

app.get("/usuarios", async (req, res, next) => {
  try {
    const usuarios = await Usuario.findAll({
      include: {
        model: Perfil,
        as: "perfil",
      },
      order: [["id", "ASC"]],
    });

    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
});

app.post("/usuarios", async (req, res, next) => {
  try {
    const { nombre, email } = req.body;

    if (!nombre || !email) {
      return res
        .status(400)
        .json({ message: "email y nombre son obligatorios" });
    }

    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    next(error);
  }
});

app.post("/usuarios/:usuarioId/perfil", async (req, res, next) => {
  try {
    const { usuarioId } = req.params;
    const { biografia, avatarUrl } = req.body;

    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    const perfilExistente = await Perfil.findOne({
      where: {
        usuarioId,
      },
    });

    if (perfilExistente) {
      return res.status(400).json({
        message: "El usaurio ya tienen un perfil",
      });
    }

    const nuevoPerfil = await Perfil.create({
      biografia,
      avatarUrl,
      usuarioId,
    });

    res.status(201).json(nuevoPerfil);
  } catch (error) {
    next(error);
  }
});

// // Middleware 404
app.use(unknownEndpoint);

// Middleware global
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
