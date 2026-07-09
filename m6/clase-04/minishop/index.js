import express from "express";
import { engine } from "express-handlebars";
import webRoutes from "./routes/web.routes.js";

const app = express();
const PORT = 3000;

app.engine(
    "handlebars",
    engine({
        defaultLayout: "main",
        layoutsDir: "views/layouts",
        partialsDir: "views/partials",
        helpers: {
            mayusculas: function (texto) {
                return texto.toUpperCase();
            }
        }
    })
);

app.set("view engine", "handlebars");
app.set("views", "views");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use("/", webRoutes);

app.use((req, res) => {
    res.status(404).send("Página no encontrada");
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});