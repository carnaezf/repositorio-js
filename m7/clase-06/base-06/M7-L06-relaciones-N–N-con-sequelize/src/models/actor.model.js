import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Actor = sequelize.define(
  "Actor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nombre: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El nombre del actor no puede estar vacío.",
        },
        len: {
          args: [2, 120],
          msg: "El nombre debe tener entre 2 y 120 caracteres.",
        },
      },
    },

    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          msg: "La fecha de nacimiento no es válida.",
        },
      },
    },
  },
  {
    tableName: "actores",
    timestamps: false,
  },
);

export default Actor;// placeholder for actor model