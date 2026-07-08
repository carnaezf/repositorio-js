import express from "express";
import { engine } from "express-handlebars";
import webRoutes from "./routes/web.routes.js";

const app = express();
const PORT = 3000;

// Middleware para leer JSON.
// Aunque hoy trabajamos más con vistas, lo dejamos listo para futuras rutas POST.
app.use(express.json());

// Servir contenido estático.
// Todo lo que esté dentro de public podrá ser usado por el navegador.
app.use(express.static("public"));

// Configuración de Handlebars.
// Aquí le decimos a Express qué motor de plantillas usaremos.
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    layoutsDir: "views/layouts",
    partialsDir: "views/partials",
    helpers: {
      mayuscula: (texto) => texto.toUpperCase(),
      esImportante: (valor) => {
        return valor ? "Sí" : "No";
      },
    },
  })
);

// Definimos la carpeta donde estarán las vistas.
app.set("views", "views");

// Definimos handlebars como motor de plantillas.
app.set("view engine", "handlebars");

// Usamos las rutas del archivo web.routes.js.
app.use("/", webRoutes);

// Middleware para rutas no encontradas.
app.use((req, res) => {
  res.status(404).send("<h1>404 - Página no encontrada</h1>");
});

// Levantar servidor.
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});