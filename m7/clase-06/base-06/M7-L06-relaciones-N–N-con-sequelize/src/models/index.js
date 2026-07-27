import sequelize from "../config/db.js";

import Pelicula from "./pelicula.model.js";
import Actor from "./actor.model.js";
import PeliculasActores from "./peliculasActores.model.js";

// =====================================================
// RELACIÓN MUCHOS A MUCHOS
// =====================================================
//
// Una película puede tener muchos actores.
// Un actor puede participar en muchas películas.
//
// La relación se implementa mediante:
// peliculas_actores
// =====================================================

Pelicula.belongsToMany(Actor, {
  through: PeliculasActores,

  // Llave de Pelicula dentro de la tabla intermedia.
  foreignKey: "pelicula_id",

  // Llave de Actor dentro de la tabla intermedia.
  otherKey: "actor_id",

  as: "actores",

  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Actor.belongsToMany(Pelicula, {
  through: PeliculasActores,

  // Llave de Actor dentro de la tabla intermedia.
  foreignKey: "actor_id",

  // Llave de Pelicula dentro de la tabla intermedia.
  otherKey: "pelicula_id",

  as: "peliculas",

  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export {
  sequelize,
  Pelicula,
  Actor,
  PeliculasActores,
};