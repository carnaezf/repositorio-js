const unknownEndpoint = (req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: "Endpoint no encontrado.",
    metodo: req.method,
    ruta: req.originalUrl,
  });
};

export default unknownEndpoint;