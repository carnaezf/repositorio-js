import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const TestModel = sequelize.define(
  "TestModel",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    mensaje: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "pruebas",
    timestamps: true,
    underscored: true,
  }
);

export default TestModel;
