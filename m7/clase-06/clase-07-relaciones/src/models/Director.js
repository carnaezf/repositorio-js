// Modelo Director placeholder
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Director = sequelize.define(
  "Director",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
  },
  {
    tableName: "directores",
    timestamps: false,
  },
);

export default Director

/*
Modelo Sequelize    tabla PostgreSQL
Director            directores
id                  id
nombre              nombre
*/