// Archivo de índice de modelos placeholder
import sequelize from "../config/db.js";
import Pelicula from "./Pelicula.js";
import Director from "./Director.js";
import Genero from "./Genero.js";
import PeliculaGenero from "./PeliculaGenero.js";

// Relacion de uno a muchos
// un director tienen muchas peliculas
// cada pelicula pertenece a un director

Director.hasMany(Pelicula, {
  foreignKey: "directorId",
  as: "peliculas",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

Pelicula.belongsTo(Director, {
  foreignKey: "directorId",
  as: "director",
});

// Relacion de muchos a muchos
// Una pelicula tiene muchos generos
// Un genero pertenece a muchas

Pelicula.belongsToMany(Genero, {
  through: PeliculaGenero,
  foreignKey: "peliculaId",
  otherKey: "generoId",
  as: "generos",
});

Genero.belongsToMany(Pelicula, {
  through: PeliculaGenero,
  foreignKey: "peliculaId",
  otherKey: "generoId",
  as: "peliculas"
});

export { sequelize, Director, Pelicula, Genero, PeliculaGenero };
