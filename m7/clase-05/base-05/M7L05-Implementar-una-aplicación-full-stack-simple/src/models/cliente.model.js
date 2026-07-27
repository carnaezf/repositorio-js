import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Cliente = sequelize.define(
  "Cliente",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El nombre no puede estar vacío.",
        },
        len: {
          args: [2, 100],
          msg: "El nombre debe tener entre 2 y 100 caracteres.",
        },
      },
    },

    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: {
        msg: "El correo electrónico ya se encuentra registrado.",
      },
      validate: {
        notEmpty: {
          msg: "El correo electrónico no puede estar vacío.",
        },
        isEmail: {
          msg: "Debe ingresar un correo electrónico válido.",
        },
      },
    },
  },
  {
    tableName: "clientes",
    timestamps: false,
  },
);

export default Cliente;