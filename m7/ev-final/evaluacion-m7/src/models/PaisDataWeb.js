import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const PaisDataWeb = sequelize.define(
  "PaisDataWeb",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nombrePais: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "nombre_pais",
    },

    accion: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        isIn: [[0, 1]],
      },
    },

    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "paises_data_web",
    timestamps: false,
  }
);

export default PaisDataWeb;