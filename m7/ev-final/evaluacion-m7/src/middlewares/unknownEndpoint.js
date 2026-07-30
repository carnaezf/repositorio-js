const unknownEndpoint = (req, res) => {
  return res.status(404).json({
    ok: false,
    error: {
      code: "ENDPOINT_NOT_FOUND",
      message: `No existe el endpoint ${req.method} ${req.originalUrl}`,
    },
  });
};

export default unknownEndpoint;
