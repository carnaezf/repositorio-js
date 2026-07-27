import {
  obtenerActores,
  crearActor,
} from "../services/actores.service.js";

/**
 * GET /actores
 */
export const listarActores = async (
  _req,
  res,
  next,
) => {
  try {
    const actores = await obtenerActores();

    res.status(200).json({
      ok: true,
      cantidad: actores.length,
      actores,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /actores
 */
export const registrarActor = async (
  req,
  res,
  next,
) => {
  try {
    const {
      nombre,
      fecha_nacimiento,
    } = req.body;

    if (!nombre || !fecha_nacimiento) {
      return res.status(400).json({
        ok: false,
        mensaje:
          "Los campos nombre y fecha_nacimiento son obligatorios.",
      });
    }

    if (typeof nombre !== "string") {
      return res.status(400).json({
        ok: false,
        mensaje: "El nombre debe ser un texto.",
      });
    }

    const actor = await crearActor({
      nombre,
      fecha_nacimiento,
    });

    res.status(201).json({
      ok: true,
      mensaje: "Actor creado correctamente.",
      actor,
    });
  } catch (error) {
    next(error);
  }
};