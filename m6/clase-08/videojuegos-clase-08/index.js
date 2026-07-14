import app from "./app.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// Configuracion de argumentos por consola
const argv = yargs(hideBin(process.argv))
.option("port", {
  alias: "p",
  type: "number",
  description: "Puerto donde se levantará el servidor",
  default: 3001,
})
.help()
.argv

// El puerto ahora vienen desde la terminal
// si no se envia un puerto, se usara 3001 por defecto
const PORT = argv.port;

// Levantar nuestro servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
