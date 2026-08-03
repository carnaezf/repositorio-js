import app from "./app.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";

// ==========================================
// CONFIGURACIÓN DE ENTORNO
// ==========================================
// Configuración de argumentos
const argv = yargs(hideBin(process.argv))
  .option("port", {
    alias: "p",
    type: "number",
    description: "Puerto del servidor",
    default: 3001,
  })
  .option("modo", {
    type: "string",
    description: "Modo de ejecución (ej: saludo)",
  })
  .option("nombre", {
    alias: "n",
    type: "string",
    description: "Nombre del usuario",
  })
  .help().argv;

const PORT = argv.port;


// Lógica opcional por modo
if (argv.modo === "saludo") {
  if (!argv.nombre) {
    console.log("Debes enviar un nombre con --nombre");
  } else {
    console.log(`Hola, ${argv.nombre}`);
  }
}

app.listen(PORT, () => {
  console.log(
    chalk.green(`Servidor iniciado en http://localhost:${PORT}`)
  );
});
