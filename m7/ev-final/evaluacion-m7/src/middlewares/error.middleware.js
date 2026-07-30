const errorMiddleware = (
  error,
  req,
  res,
  next
) => {
  console.error(error);

  let statusCode = error.statusCode || 500;
  let mensaje =
    error.message || "Error interno del servidor.";

  if (error.name === "SequelizeValidationError") {
    statusCode = 400;
    mensaje = error.errors
      .map((detalle) => detalle.message)
      .join(" ");
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    statusCode = 409;
    mensaje = "El registro ya existe.";
  }

  if (error.name === "SequelizeForeignKeyConstraintError") {
    statusCode = 409;
    mensaje =
      "La operación no puede completarse debido a una relación existente.";
  }

  res.status(statusCode).json({
    ok: false,
    mensaje,
  });
};

export default errorMiddleware;