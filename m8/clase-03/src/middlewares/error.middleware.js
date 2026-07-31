import {
  DatabaseError,
  ValidationError,
} from "sequelize";

export const errorHandler = (
  error,
  req,
  res,
  next
) => {
  console.error("Error capturado:");
  console.error(error);

  /*
  |--------------------------------------------------------------------------
  | ERROR DE VALIDACIÓN SEQUELIZE
  |--------------------------------------------------------------------------
  */

  if (error instanceof ValidationError) {
    return res.status(400).json({
      ok: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Los datos no son válidos",
        details: error.errors.map(
          (item) => item.message
        ),
      },
    });
  }

  /*
  |--------------------------------------------------------------------------
  | ERROR DE BASE DE DATOS
  |--------------------------------------------------------------------------
  */

  if (error instanceof DatabaseError) {
    return res.status(500).json({
      ok: false,
      error: {
        code: "DATABASE_ERROR",
        message:
          "Ocurrió un error al consultar la base de datos",
      },
    });
  }

  /*
  |--------------------------------------------------------------------------
  | ERROR GENERAL
  |--------------------------------------------------------------------------
  */

  return res.status(
    error.statusCode || 500
  ).json({
    ok: false,
    error: {
      code:
        error.code ||
        "INTERNAL_SERVER_ERROR",

      message:
        error.statusCode &&
        error.statusCode < 500
          ? error.message
          : "Ocurrió un error interno en el servidor",
    },
  });
};
