// middleware/logger.js

const logger = (req, res, next) => {
  const fecha = new Date().toLocaleString();

  console.log(`[${fecha}]`);
  console.log(`Método: ${req.method}`);
  console.log(`Ruta: ${req.url}`);

  // IMPORTANTE: si no llamamos next(), la request se queda detenida
  next();
}

export default logger;




