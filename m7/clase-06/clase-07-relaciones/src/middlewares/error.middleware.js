export const errorHandler = (err, req, res, next) => {
  console.error("Error capturado:", err.message);

  res.status(500).json({
    message: "Error interno del servidor",
    error: err.message,
  });
};