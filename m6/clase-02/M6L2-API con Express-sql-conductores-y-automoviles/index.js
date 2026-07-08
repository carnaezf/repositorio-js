import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db/connection.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ============================================================
   GET /conductores
   Lista todos los conductores
   ============================================================ */

app.get("/conductores", async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT *
            FROM conductores
            ORDER BY nombre;
        `);

        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener conductores",
            error: error.message
        });
    }
});


/* ============================================================
   GET /automoviles
   Lista todos los automóviles
   ============================================================ */

app.get("/automoviles", async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT *
            FROM automoviles
            ORDER BY patente;
        `);

        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener automóviles",
            error: error.message
        });
    }
});


/* ============================================================
   GET /conductoressinauto?edad=<numero>
   Conductores menores de cierta edad que no tienen automóvil
   ============================================================ */

app.get("/conductoressinauto", async (req, res) => {
    try {
        const edad = Number(req.query.edad);

        if (!edad) {
            return res.status(400).json({
                mensaje: "Debe enviar una edad válida. Ejemplo: /conductoressinauto?edad=40"
            });
        }

        const resultado = await pool.query(`
            SELECT c.*
            FROM conductores c
            LEFT JOIN automoviles a
                ON c.nombre = a.nombre_conductor
            WHERE c.edad < $1
              AND a.patente IS NULL
            ORDER BY c.edad;
        `, [edad]);

        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener conductores sin auto",
            error: error.message
        });
    }
});


/* ============================================================
   GET /solitos
   Conductores sin automóvil y automóviles sin conductor
   ============================================================ */

app.get("/solitos", async (req, res) => {
    try {
        const conductoresSinAuto = await pool.query(`
            SELECT c.*
            FROM conductores c
            LEFT JOIN automoviles a
                ON c.nombre = a.nombre_conductor
            WHERE a.patente IS NULL
            ORDER BY c.nombre;
        `);

        const automovilesSinConductor = await pool.query(`
            SELECT a.*
            FROM automoviles a
            LEFT JOIN conductores c
                ON a.nombre_conductor = c.nombre
            WHERE c.nombre IS NULL
            ORDER BY a.patente;
        `);

        res.status(200).json({
            conductores_sin_auto: conductoresSinAuto.rows,
            automoviles_sin_conductor: automovilesSinConductor.rows
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener datos sin relación",
            error: error.message
        });
    }
});


/* ============================================================
   GET /auto?patente=<string>
   GET /auto?iniciopatente=<letra>
   Busca automóvil con datos del conductor si existe
   ============================================================ */

app.get("/auto", async (req, res) => {
    try {
        const { patente, iniciopatente } = req.query;

        if (patente) {
            const resultado = await pool.query(`
                SELECT
                    a.marca,
                    a.patente,
                    a.nombre_conductor,
                    c.edad
                FROM automoviles a
                LEFT JOIN conductores c
                    ON a.nombre_conductor = c.nombre
                WHERE a.patente ILIKE $1;
            `, [patente]);

            if (resultado.rows.length === 0) {
                return res.status(404).json({
                    mensaje: "No se encontró un automóvil con esa patente"
                });
            }

            return res.status(200).json(resultado.rows[0]);
        }

        if (iniciopatente) {
            const resultado = await pool.query(`
                SELECT
                    a.marca,
                    a.patente,
                    a.nombre_conductor,
                    c.edad
                FROM automoviles a
                LEFT JOIN conductores c
                    ON a.nombre_conductor = c.nombre
                WHERE a.patente ILIKE $1
                ORDER BY a.patente;
            `, [`${iniciopatente}%`]);

            return res.status(200).json(resultado.rows);
        }

        res.status(400).json({
            mensaje: "Debe enviar patente o iniciopatente"
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al buscar automóvil",
            error: error.message
        });
    }
});


/* ============================================================
   RUTA NO ENCONTRADA
   ============================================================ */

app.use((req, res) => {
    res.status(404).json({
        mensaje: "Ruta no encontrada"
    });
});


/* ============================================================
   SERVIDOR
   ============================================================ */

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});