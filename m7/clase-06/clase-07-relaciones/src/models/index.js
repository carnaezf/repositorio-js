// Archivo de índice de modelos placeholder
import sequelize from "../config/db.js";
import Pelicula from "./Pelicula.js";
import Director from "./Director.js";

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



export {
  sequelize,
  Director,
  Pelicula
}