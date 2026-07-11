import express from "express";
import fs from "fs/promises";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const archivoPeliculas = "./data/peliculas.txt";
const archivoSeries = "./data/series.txt";

/* ============================================================
   FUNCIONES DE APOYO
   ============================================================ */

async function leerArchivo(tipo) {
    const archivo = tipo === "peliculas" ? archivoPeliculas : archivoSeries;

    const contenido = await fs.readFile(archivo, "utf-8");

    if (tipo === "peliculas") {
        return contenido
            .split("\n")
            .filter((linea) => linea.trim() !== "")
            .map((linea) => {
                const partes = linea.split(",");

                return {
                    nombre: partes[0].trim(),
                    director: partes[1].trim(),
                    anio: Number(partes[2].trim())
                };
            });
    }

    return contenido
        .split("\n")
        .filter((linea) => linea.trim() !== "")
        .map((linea) => {
            const partes = linea.split(",");

            return {
                nombre: partes[0].trim(),
                anio: Number(partes[1].trim()),
                temporadas: Number(partes[2].trim())
            };
        });
}

async function guardarArchivo(tipo, datos) {
    const archivo = tipo === "peliculas" ? archivoPeliculas : archivoSeries;

    let contenido = "";

    if (tipo === "peliculas") {
        contenido = datos
            .map((item) => `${item.nombre}, ${item.director}, ${item.anio}`)
            .join("\n");
    } else {
        contenido = datos
            .map((item) => `${item.nombre}, ${item.anio}, ${item.temporadas}`)
            .join("\n");
    }

    await fs.writeFile(archivo, contenido, "utf-8");
}

/* ============================================================
   GET /catalogo?tipo=peliculas
   GET /catalogo?tipo=series
   ============================================================ */

app.get("/catalogo", async (req, res) => {
    try {
        const tipo = req.query.tipo;

        if (tipo !== "peliculas" && tipo !== "series") {
            return res.status(400).json({
                mensaje: "Debe indicar tipo=peliculas o tipo=series"
            });
        }

        const datos = await leerArchivo(tipo);

        res.status(200).json(datos);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al leer el catálogo",
            error: error.message
        });
    }
});

/* ============================================================
   POST /catalogo?tipo=peliculas
   POST /catalogo?tipo=series
   ============================================================ */

app.post("/catalogo", async (req, res) => {
    try {
        const tipo = req.query.tipo;
        const nuevoRegistro = req.body;

        if (tipo !== "peliculas" && tipo !== "series") {
            return res.status(400).json({
                mensaje: "Debe indicar tipo=peliculas o tipo=series"
            });
        }

        const datos = await leerArchivo(tipo);

        datos.push(nuevoRegistro);

        await guardarArchivo(tipo, datos);

        res.status(201).json({
            mensaje: "Registro agregado correctamente",
            registro: nuevoRegistro
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al agregar registro",
            error: error.message
        });
    }
});

/* ============================================================
   DELETE /catalogo/:nombre?tipo=peliculas
   DELETE /catalogo/:nombre?tipo=series
   ============================================================ */

app.delete("/catalogo/:nombre", async (req, res) => {
    try {
        const tipo = req.query.tipo;
        const nombre = req.params.nombre.toLowerCase();

        if (tipo !== "peliculas" && tipo !== "series") {
            return res.status(400).json({
                mensaje: "Debe indicar tipo=peliculas o tipo=series"
            });
        }

        const datos = await leerArchivo(tipo);

        const datosFiltrados = datos.filter((item) => {
            return item.nombre.toLowerCase() !== nombre;
        });

        if (datos.length === datosFiltrados.length) {
            return res.status(404).json({
                mensaje: "No se encontró el registro solicitado"
            });
        }

        await guardarArchivo(tipo, datosFiltrados);

        res.status(200).json({
            mensaje: "Registro eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar registro",
            error: error.message
        });
    }
});

/* ============================================================
   MÉTODOS NO PERMITIDOS
   ============================================================ */

app.all("/catalogo", (req, res) => {
    res.status(405).json({
        mensaje: "Método no permitido"
    });
});

app.all("/catalogo/:nombre", (req, res) => {
    res.status(405).json({
        mensaje: "Método no permitido"
    });
});

/* ============================================================
   RUTA NO ENCONTRADA
   ============================================================ */

app.use((req, res) => {
    res.status(404).json({
        mensaje: "Ruta no encontrada"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});