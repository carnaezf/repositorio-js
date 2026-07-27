import {
  sequelize,
  Pelicula,
  Actor,
  PeliculasActores,
} from "../models/index.js";

import AppError from "../utils/AppError.js";

/**
 * Asigna un actor a una película dentro de una transacción.
 */
export const asignarActorAPelicula = async ({
  pelicula_id,
  actor_id,
}) => {
  return sequelize.transaction(async (transaction) => {
    // Ambas búsquedas forman parte de la misma transacción.
    const pelicula = await Pelicula.findByPk(
      pelicula_id,
      {
        transaction,
      },
    );

    if (!pelicula) {
      throw new AppError(
        "La película indicada no existe.",
        404,
      );
    }

    const actor = await Actor.findByPk(actor_id, {
      transaction,
    });

    if (!actor) {
      throw new AppError(
        "El actor indicado no existe.",
        404,
      );
    }

    // Verificamos si el vínculo ya existe.
    const asignacionExistente =
      await PeliculasActores.findOne({
        where: {
          pelicula_id,
          actor_id,
        },
        transaction,
      });

    if (asignacionExistente) {
      throw new AppError(
        "El actor ya está asignado a esta película.",
        409,
      );
    }

    // Se crea el vínculo en la tabla intermedia.
    const asignacion =
      await PeliculasActores.create(
        {
          pelicula_id,
          actor_id,
        },
        {
          transaction,
        },
      );

    // Este punto podría contener otras operaciones
    // que deban confirmarse junto con la asignación.
    //
    // Si alguna falla, Sequelize ejecutará ROLLBACK.

    return {
      asignacion,
      pelicula: {
        id: pelicula.id,
        titulo: pelicula.titulo,
      },
      actor: {
        id: actor.id,
        nombre: actor.nombre,
      },
    };
  });
};