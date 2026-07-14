import express from "express";
import {
  obtenerVideoJuegos,
  obtenerVideoJuegoPorID,
  eliminarVideoJuegoPorId,
  crearVideoJuego,
  actualizarVideojuegoPorID,
} from "../services/videojuegos.services.js";

const router = express.Router();

// GET todos
router.get("/", (req, res) => {
  const juegos = obtenerVideoJuegos();

  res.status(200).json({
    mensaje: "Videojuegos obtenidos correctamente",
    total: juegos.length,
    data: juegos,
  });
});

// GET por ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    // hola
    return res.status(400).json({
      mensaje: "El ID debe ser un número valido",
    });
  }

  const juego = obtenerVideoJuegoPorID(id);

  if (!juego) {
    return res.status(404).json({
      mensaje: `No se encontró un videojuego con id ${id}`,
    });
  }

  res.status(200).json({
    mensaje: "Videojuego obtenido correctamente",
    data: juego,
  });
});

// DELETE por ID
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      mensaje: "El ID debe ser un número valido",
    });
  }

  const juegoEliminado = eliminarVideoJuegoPorId(id);

  if (!juegoEliminado) {
    return res.status(404).json({
      mensaje: `No se encontró un videojuego con id ${id}`,
    });
  }

  res.status(200).json({
    mensaje: "Videojuego eliminado correctamente",
    data: juegoEliminado,
  });
});

// Post Videojuego
router.post("/", (req, res) => {
  const { titulo, plataforma, precio, stock, disponible } = req.body;

  // Validacion basica
  if (!titulo || !plataforma || precio === undefined) {
    return res.status(400).json({
      mensaje: "Faltan campos obligatorios (titulo, plataforma, precio)",
    });
  }

  const nuevoJuego = {
    titulo,
    plataforma,
    precio,
    stock: stock ?? 0,
    disponible: disponible ?? true, // ?? Solo reemplaza cuando el valor es null o undefined
  };

  const juegoCreado = crearVideoJuego(nuevoJuego);

  res.status(201).json({
    mensaje: "Videojuego creado correctamente",
    data: juegoCreado,
  });
});

// PUT VIdeojuego
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const { titulo, plataforma, precio, stock, disponible } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({
      mensaje: "El ID debe ser un número valido",
    });
  }

  // Validacion basica
  if (!titulo || !plataforma || precio === undefined) {
    return res.status(400).json({
      mensaje: "Faltan campos obligatorios (titulo, plataforma, precio)",
    });
  }

  const datosActualizados = {
    titulo,
    plataforma,
    precio,
    stock: stock ?? 0,
    disponible: disponible ?? true, // ?? Solo reemplaza cuando el valor es null o undefined
  };

  const juegoActualizado = actualizarVideojuegoPorID(id, datosActualizados);

  if (!juegoActualizado) {
    return res.status(404).json({
      mensaje: `No se encontró un videojuego con id ${id}`,
    });
  }

  res.status(200).json({
    mensaje: "Videojuego actualizado correctamente",
    data: juegoActualizado
  })
});

export default router;
