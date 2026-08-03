const logger = (req, res, next) => {
  const fecha = new Date().toLocaleString();

  console.log("\n-----------------------------");
  console.log(`[${fecha}]`);
  console.log(`Método: ${req.method}`);
  console.log(`Ruta: ${req.originalUrl}`);

  // Si no se ejecuta next(), la petición queda detenida.
  next();
};

export default logger;
