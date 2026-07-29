// Modelo Pelicula placeholder
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Pelicula = sequelize.define(
  "Pelicula",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    directorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "director_id",
    },
  },
  {
    tableName: "peliculas",
    timestamps: false,
  },
);

export default Pelicula
