import { Op } from "sequelize";

import {
  sequelize,
  Pelicula,
  Actor,
} from "../models/index.js";

import AppError from "../utils/AppError.js";

/**
 * Obtiene todas las películas junto con sus actores.
 */
export const obtenerPeliculas = async () => {
  const peliculas = await Pelicula.findAll({
    include: {
      model: Actor,
      as: "actores",

      // Oculta pelicula_id y actor_id de la respuesta.
      through: {
        attributes: [],
      },

      attributes: [
        "id",
        "nombre",
        "fecha_nacimiento",
      ],
    },

    order: [["id", "ASC"]],
  });

  return peliculas;
};

/**
 * Crea una película.
 *
 * Opcionalmente recibe un arreglo actor_ids:
 *
 * {
 *   "titulo": "Interstellar",
 *   "anio": 2014,
 *   "actor_ids": [1, 2]
 * }
 *
 * La creación de la película y sus asociaciones
 * se realiza dentro de una transacción.
 */
export const crearPelicula = async ({
  titulo,
  anio,
  actor_ids = [],
}) => {
  return sequelize.transaction(async (transaction) => {
    const pelicula = await Pelicula.create(
      {
        titulo: titulo.trim(),
        anio,
      },
      {
        transaction,
      },
    );

    if (actor_ids.length > 0) {
      const idsUnicos = [
        ...new Set(
          actor_ids.map((id) => Number(id)),
        ),
      ];

      const actores = await Actor.findAll({
        where: {
          id: {
            [Op.in]: idsUnicos,
          },
        },
        transaction,
      });

      if (actores.length !== idsUnicos.length) {
        throw new AppError(
          "Uno o más actores indicados no existen.",
          404,
        );
      }

      // Sequelize crea los registros correspondientes
      // en la tabla peliculas_actores.
      await pelicula.addActores(actores, {
        transaction,
      });
    }

    const peliculaCompleta =
      await Pelicula.findByPk(pelicula.id, {
        include: {
          model: Actor,
          as: "actores",
          through: {
            attributes: [],
          },
        },
        transaction,
      });

    return peliculaCompleta;
  });
};