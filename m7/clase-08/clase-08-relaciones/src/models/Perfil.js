import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Perfil = sequelize.define(
  "Perfil",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    biografia: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    avatarUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "avatar_url",
    },

    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: "usuario_id",
    },
  },
  {
    tableName: "perfiles",
    timestamps: false,
  },
);

export default Perfil;
