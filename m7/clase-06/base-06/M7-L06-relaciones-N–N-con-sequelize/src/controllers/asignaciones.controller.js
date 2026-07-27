import {
  asignarActorAPelicula,
} from "../services/asignaciones.service.js";

/**
 * POST /asignar-actor
 *
 * Recibe:
 * {
 *   "pelicula_id": 1,
 *   "actor_id": 2
 * }
 */
export const crearAsignacion = async (
  req,
  res,
  next,
) => {
  try {
    const {
      pelicula_id,
      actor_id,
    } = req.body;

    if (!pelicula_id || !actor_id) {
      return res.status(400).json({
        ok: false,
        mensaje:
          "pelicula_id y actor_id son obligatorios.",
      });
    }

    const peliculaId = Number(pelicula_id);
    const actorId = Number(actor_id);

    if (
      !Number.isInteger(peliculaId) ||
      !Number.isInteger(actorId)
    ) {
      return res.status(400).json({
        ok: false,
        mensaje:
          "pelicula_id y actor_id deben ser números enteros.",
      });
    }

    const resultado =
      await asignarActorAPelicula({
        pelicula_id: peliculaId,
        actor_id: actorId,
      });

    res.status(201).json({
      ok: true,
      mensaje:
        "Actor asignado correctamente a la película.",
      resultado,
    });
  } catch (error) {
    next(error);
  }
};