import {
  obtenerPeliculas,
  crearPelicula,
} from "../services/peliculas.service.js";

/**
 * GET /peliculas
 */
export const listarPeliculas = async (
  _req,
  res,
  next,
) => {
  try {
    const peliculas = await obtenerPeliculas();

    res.status(200).json({
      ok: true,
      cantidad: peliculas.length,
      peliculas,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /peliculas
 */
export const registrarPelicula = async (
  req,
  res,
  next,
) => {
  try {
    const {
      titulo,
      anio,
      actor_ids = [],
    } = req.body;

    if (!titulo || anio === undefined) {
      return res.status(400).json({
        ok: false,
        mensaje:
          "Los campos titulo y anio son obligatorios.",
      });
    }

    if (typeof titulo !== "string") {
      return res.status(400).json({
        ok: false,
        mensaje: "El título debe ser un texto.",
      });
    }

    const anioNumerico = Number(anio);

    if (!Number.isInteger(anioNumerico)) {
      return res.status(400).json({
        ok: false,
        mensaje: "El año debe ser un número entero.",
      });
    }

    if (!Array.isArray(actor_ids)) {
      return res.status(400).json({
        ok: false,
        mensaje: "actor_ids debe ser un arreglo.",
      });
    }

    const pelicula = await crearPelicula({
      titulo,
      anio: anioNumerico,
      actor_ids,
    });

    res.status(201).json({
      ok: true,
      mensaje: "Película creada correctamente.",
      pelicula,
    });
  } catch (error) {
    next(error);
  }
};