import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const PaisPib = sequelize.define(
  "PaisPib",
  {
    nombrePais: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      field: "nombre_pais",
    },

    pib2019: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      field: "pib_2019",
      validate: {
        min: 0,
      },
    },

    pib2020: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      field: "pib_2020",
      validate: {
        min: 0,
      },
    },
  },
  {
    tableName: "paises_pib",
    timestamps: false,
  }
);

export default PaisPib;