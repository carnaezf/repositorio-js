import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./src/config/db.js";
import testRoutes from "./src/routes/test.routes.js";
import healthRoutes from "./src/routes/health.routes.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";
import unknownEndpoint from "./src/middlewares/unknownEndpoint.js";

dotenv.config();

const app = express();

// Configuracion de entorno
const PORT = process.env.PORT || 3000;

// Middlewares base
app.use(cors());
app.use(express.json());

// Ruta base
app.use("/test", testRoutes);

app.use("/health", healthRoutes);

// 1: Listar productos
app.get("/productos", async (req, res, next) => {
  try {
    const resultado = await pool.query(`
    SELECT id, descripcion, cantidad
    FROM productos
    ORDER BY id
    `);

    res.status(200).json({
      cantidad: resultado.rowCount,
      productos: resultado.rows,
    });
  } catch (error) {
    next(error);
  }
});

// 2: Obtener Producto por ID
app.get("/productos/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    // Validacion
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "El id debe ser un número entero positivo",
      });
    }

    const consulta = `
        SELECT id, descripcion, cantidad
        FROM productos
        WHERE id = $1
      `;
    const valores = [id];

    const resultado = await pool.query(consulta, valores);

    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Transferir stock entre productos

// Ejemplo
// Producto 1 pierde 3 unidades
// Producto 2 recibe 3 unidades

// Ambas operaciones deben ejecutarse
app.post("/productos/transferir-stock", async (req, res, next) => {
  const { productoOrigenId, productoDestinoId, cantidad } = req.body;

  // Validacion sencilla antes de pedir conexion
  if (
    !Number.isInteger(productoOrigenId) ||
    !Number.isInteger(productoDestinoId) ||
    !Number.isInteger(cantidad) ||
    productoOrigenId <= 0 ||
    productoDestinoId <= 0 ||
    cantidad <= 0
  ) {
    return res.status(400).json({
      error: "Los ids y la cantidad deben ser enteros positivos",
    });
  }

  if (productoOrigenId === productoDestinoId) {
    return res.status(400).json({
      error: "El origen y el destino debe ser diferentes",
    });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1 descontar stock al producto de origen
    const origen = await client.query(
      `
        UPDATE productos
        SET cantidad = cantidad - $1
        WHERE id = $2
          AND cantidad >= $1
        RETURNING id, descripcion, cantidad
      `,
      [cantidad, productoOrigenId],
    );

    if (origen.rowCount === 0) {
      throw new Error("Producto de origen inexistente o stock insuficiente");
    }

    // 2 agregar stock al producto de destino
    const destino = await client.query(
      `
        UPDATE productos
        SET cantidad = cantidad + $1
        WHERE id = $2
        RETURNING id, descripcion, cantidad
      `,
      [cantidad, productoDestinoId],
    );

    if (origen.rowCount === 0) {
      throw new Error("Producto de destino no encontrado");
    }

    await client.query("COMMIT");

    res.status(200).json({
      mensaje: "Transferencia realizada correctamente",
      productoOrigen: origen.rows[0],
      productoDestino: destino.rows[0],
    })


    // 3 Enviar la respuesta
  } catch (error) {
    await client.query("ROLLBACK")
  } finally {
    client.release()
  }
});

// // Middleware 404
app.use(unknownEndpoint);

// Middleware global
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
