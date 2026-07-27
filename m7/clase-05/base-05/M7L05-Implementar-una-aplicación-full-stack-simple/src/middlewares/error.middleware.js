import {
  ValidationError,
  UniqueConstraintError,
  DatabaseError,
  ConnectionError,
} from "sequelize";

export const errorHandler = (
  error,
  _req,
  res,
  _next,
) => {
  console.error("Error global:", error);

  // Error por valor único repetido.
  // Ejemplo: registrar dos clientes con el mismo email.
  if (error instanceof UniqueConstraintError) {
    return res.status(409).json({
      ok: false,
      mensaje:
        error.errors?.[0]?.message ||
        "Ya existe un registro con esos datos.",
    });
  }

  // Error de validación del modelo.
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

  // Error de conexión con PostgreSQL.
  if (error instanceof ConnectionError) {
    return res.status(503).json({
      ok: false,
      mensaje:
        "No fue posible conectar con la base de datos.",
    });
  }

  // Otros errores enviados por PostgreSQL.
  if (error instanceof DatabaseError) {
    return res.status(500).json({
      ok: false,
      mensaje:
        "Se produjo un error al ejecutar la operación en la base de datos.",
    });
  }

  return res.status(error.status || 500).json({
    ok: false,
    mensaje:
      error.message ||
      "Se produjo un error interno en el servidor.",
  });
};