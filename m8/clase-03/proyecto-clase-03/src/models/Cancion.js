import { DataTypes } from "sequelize";

import sequelize from "../config/db.js";

const Cancion = sequelize.define(
  "Cancion",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    titulo: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    artista: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },

    archivo: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    nombreOriginal: {
      type: DataTypes.STRING(255),
      allowNull: false,

      // JavaScript usa camelCase.
      // PostgreSQL usa snake_case.
      field: "nombre_original",
    },

    tipoMime: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "tipo_mime",
    },

    tamanio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "canciones",
    timestamps: false,
  }
);

export default Cancion;
