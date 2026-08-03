const timer = (req, res, next) => {
  const inicio = Date.now();

  // Este evento se ejecuta cuando la respuesta finaliza.
  res.on("finish", () => {
    const duracion = Date.now() - inicio;

    console.log(`Estado: ${res.statusCode}`);
    console.log(`Tiempo total: ${duracion} ms`);
    console.log("-----------------------------\n");
  });

  // Continuamos con el flujo normal.
  next();
};

export default timer;

