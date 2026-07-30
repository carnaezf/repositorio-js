const timer = (req, res, next) => {
  const inicio = Date.now();

  res.on("finish", () => {
    const tiempo = Date.now() - inicio;

    console.log(
      `${req.method} ${req.originalUrl} - ${res.statusCode} - ${tiempo} ms`
    );
  });

  next();
};

export default timer;