import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Pais = sequelize.define(
  "Pais",
  {
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
    },

    continente: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    poblacion: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    tableName: "paises",
    timestamps: false,
  }
);

export default Pais;