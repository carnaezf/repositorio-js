// Archivo de índice de modelos placeholder
import sequelize from "../config/db.js";
import Pelicula from "./Pelicula.js";
import Director from "./Director.js";
import Genero from "./Genero.js";
import Usuario from "./Usuario.js";
import Perfil from "./Perfil.js";
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
  as: "peliculas",
});

// Relacion de uno a uno
// Un usuario tienen un perfil
// Cada perfil pertenece a un usuario
Usuario.hasOne(Perfil, {
  foreignKey: "usuarioId",
  as: "perfil",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

Perfil.belongsTo(Usuario, {
  foreignKey: "usuarioId",
  as: "usuario",
});

export {
  sequelize,
  Director,
  Pelicula,
  Genero,
  PeliculaGenero,
  Usuario,
  Perfil,
};
