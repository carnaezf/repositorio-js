import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

// MODELO PRODUCTO

// Representa la patabla public.productos de PostgreSQL

// En Sequelize:
// modelo => tabla
// atributo => columna
// instancia => fila

const Producto = sequelize.define(
  "Producto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,

      validate: {
        min: 0,
      },
    },
  },
  {
    // Nombre exacto de la tabla existente
    tableName: "productos",
    timestamps: false,
  }
);

export default Producto;