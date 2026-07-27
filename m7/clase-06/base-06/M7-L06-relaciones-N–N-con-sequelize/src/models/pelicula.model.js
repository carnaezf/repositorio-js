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
      validate: {
        notEmpty: {
          msg: "El título no puede estar vacío.",
        },
        len: {
          args: [1, 150],
          msg: "El título puede tener como máximo 150 caracteres.",
        },
      },
    },

    anio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "El año debe ser un número entero.",
        },
        min: {
          args: [1888],
          msg: "El año no puede ser anterior a 1888.",
        },
        max: {
          args: [2100],
          msg: "El año no puede ser superior a 2100.",
        },
      },
    },
  },
  {
    tableName: "peliculas",
    timestamps: false,
  },
);

export default Pelicula;