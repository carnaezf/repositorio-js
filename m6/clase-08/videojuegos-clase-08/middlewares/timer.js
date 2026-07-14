const timer = (req, res, next) => {
  const inicio = Date.now();

  // Este evento se ejecuta cuando la respuesta termina
  res.on("finish", () => {
    const duracion = Date.now() - inicio;
    console.log(`Tiempo total: ${duracion} ms`);
    console.log("-----------------------------\n");
  });

  // seguimos el flujo normal
  next();
};

export default timer;