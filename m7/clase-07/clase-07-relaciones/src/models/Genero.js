import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Genero = sequelize.define(
  "Genero",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "generos",
    timestamps: false,
  },
);

export default Genero;