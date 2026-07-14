// middleware/logger.js
import chalk from "chalk";

const logger = (req, res, next) => {
  const fecha = new Date().toLocaleString();
  // Método con color según tipo HTTP
  const metodoColor =
    req.method === "GET"
      ? chalk.green(req.method)
      : req.method === "POST"
        ? chalk.blue(req.method)
        : req.method === "PUT"
          ? chalk.yellow(req.method)
          : req.method === "DELETE"
            ? chalk.red(req.method)
            : chalk.white(req.method);

  // Logs mejorados
  console.log(chalk.gray(`[${fecha}]`));
  console.log(`Método: ${metodoColor}`);
  console.log(`Ruta: ${chalk.cyan(req.url)}`);

  // IMPORTANTE: si no llamamos next(), la request se queda detenida
  next();
};

export default logger;
