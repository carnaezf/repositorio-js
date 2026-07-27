import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // Modelo PeliculaGenero placeholder

const PeliculaGenero = sequelize.define(
  "PeliculaGenero",
  {
    peliculaId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "pelicula_id",
    },
    generoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "genero_id",
    },
    principal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "peliculas_generos",
    timestamps: false,
  },
);

export default PeliculaGenero;