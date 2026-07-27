import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const PeliculasActores = sequelize.define(
  "PeliculasActores",
  {
    pelicula_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    actor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "peliculas_actores",
    timestamps: false,
  },
);

export default PeliculasActores;