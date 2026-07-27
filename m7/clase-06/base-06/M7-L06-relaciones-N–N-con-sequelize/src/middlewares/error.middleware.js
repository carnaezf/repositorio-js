import {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  ConnectionError,
  DatabaseError,
} from "sequelize";

import AppError from "../utils/AppError.js";

export const errorHandler = (
  error,
  _req,
  res,
  _next,
) => {
  console.error("Error global:", error);

  // Error controlado desde nuestros servicios.
  if (error instanceof AppError) {
    return res.status(error.status).json({
      ok: false,
      mensaje: error.message,
    });
  }

  // Violación de llave primaria o restricción UNIQUE.
  if (error instanceof UniqueConstraintError) {
    return res.status(409).json({
      ok: false,
      mensaje:
        "El registro o la relación ya existe.",
    });
  }

  // Error de validación de un modelo.
  if (error instanceof ValidationError) {
    return res.status(400).json({
      ok: false,
      mensaje:
        error.errors?.[0]?.message ||
        "Los datos ingresados no son válidos.",

      errores: error.errors.map((item) => ({
        campo: item.path,
        mensaje: item.message,
      })),
    });
  }

  // Error asociado con una llave foránea.
  if (
    error instanceof ForeignKeyConstraintError
  ) {
    return res.status(400).json({
      ok: false,
      mensaje:
        "No fue posible realizar la operación por una relación inexistente.",
    });
  }

  // PostgreSQL no se encuentra disponible.
  if (error instanceof ConnectionError) {
    return res.status(503).json({
      ok: false,
      mensaje:
        "No fue posible conectar con la base de datos.",
    });
  }

  if (error instanceof DatabaseError) {
    return res.status(500).json({
      ok: false,
      mensaje:
        "Se produjo un error al ejecutar la operación en PostgreSQL.",
    });
  }

  return res.status(500).json({
    ok: false,
    mensaje:
      error.message ||
      "Se produjo un error interno en el servidor.",
  });
};