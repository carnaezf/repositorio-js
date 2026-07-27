import {
  Actor,
  Pelicula,
} from "../models/index.js";

/**
 * Obtiene todos los actores junto con sus películas.
 */
export const obtenerActores = async () => {
  const actores = await Actor.findAll({
    include: {
      model: Pelicula,
      as: "peliculas",

      through: {
        attributes: [],
      },

      attributes: [
        "id",
        "titulo",
        "anio",
      ],
    },

    order: [["id", "ASC"]],
  });

  return actores;
};

/**
 * Crea un actor.
 */
export const crearActor = async ({
  nombre,
  fecha_nacimiento,
}) => {
  const actor = await Actor.create({
    nombre: nombre.trim(),
    fecha_nacimiento,
  });

  return actor;
};