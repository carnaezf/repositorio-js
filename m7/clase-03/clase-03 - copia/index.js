import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./src/routes/test.routes.js";
import healthRoutes from "./src/routes/health.routes.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";
import unknownEndpoint from "./src/middlewares/unknownEndpoint.js";
import productosRoutes from "./src/routes/productos.routes.js";
import pool from "./src/config/db.js";

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

app.use("/productos", productosRoutes);

/*
|--------------------------------------------------------------------------
| Ruta insegura: solo para demostración local
|--------------------------------------------------------------------------
*/

app.get("/productos-inseguro/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    // id === '3'

    const consulta = `
      SELECT id, descripcion, cantidad
      FROM productos
      WHERE id = ${id}
    `;

    console.log("Consulta insegura ejecutada:");
    console.log(consulta);

    const resultado = await pool.query(consulta);

    res.status(200).json({
      tipo: "consulta insegura",
      cantidad: resultado.rowCount,
      productos: resultado.rows,
    });
  } catch (error) {
    next(error);
  }
});

/*
|--------------------------------------------------------------------------
| Ruta segura: consulta parametrizada
|--------------------------------------------------------------------------
*/

app.get("/productos/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    // "1 OR 1=1" !== Number

    console.log("req.params.id: ", typeof req.params.id);
    console.log("id: ", typeof id);

    req.params.id;

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

    console.log("Consulta parametrizada:");
    console.log(consulta);
    console.log("Valores:", valores);

    const resultado = await pool.query(consulta, valores);

    // Result
    console.log("resultado.rows: ", resultado.rows);
    console.log("resultado.rowCount: ", resultado.rowCount);
    console.log("resultado.fields: ", resultado.fields);
    console.log("resultado.command: ", resultado.command);

    // Columnas:
    const columnas = resultado.fields.map((campo) => campo.name);

    console.log("resultado.fields: ", columnas);

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.status(200).json({
      tipo: "consulta parametrizada",
      producto: resultado.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

app.get("/productos-query-object/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    // "1 OR 1=1" !== Number

    // Validacion
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "El id debe ser un número entero positivo",
      });
    }

    const queryObject = {
      text: `
      SELECT id, descripcion, cantidad
      FROM productos
      WHERE id = $1
    `,

      values: [id],
    };

    console.log("Query Object: ", queryObject);

    const resultado = await pool.query(queryObject);

    // Columnas:
    const columnas = resultado.fields.map((campo) => campo.name);

    console.log("resultado.fields: ", columnas);

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.status(200).json({
      tipo: "query object",
      producto: resultado.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// Ruta row mode
app.get("/poductos-row-mode/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "El id debe ser un número entero positivo",
      });
    }

    const queryObject = {
      text: `
      SELECT id, descripcion, cantidad
      FROM productos
      WHERE id = $1
    `,

      values: [id],

      rowMode: "array",
    };

    const resultado = await pool.query(queryObject);

    // Columnas:
    const columnas = resultado.fields.map((campo) => campo.name);

    console.log("resultado.fields: ", columnas);

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.status(200).json({
      tipo: "row mode array",
      columnas,
      fila: resultado.rows[0],
    });
  } catch (error) {}
});

// Prepared statements
app.get("/productos-prepared/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "El id debe ser un número entero positivo",
      });
    }

    const preparedStatement = {
      name: "buscar-producto-por-id",
      text: `
      SELECT id, descripcion, cantidad
      FROM productos
      WHERE id = $1
    `,

      values: [id],
    };

    const resultado = await pool.query(preparedStatement);

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.status(200).json({
      tipo: "prepared statement",
      producto: resultado.rows[0]
    })
  } catch (error) {
    next(error);
  }
});

// // Middleware 404
app.use(unknownEndpoint);

// Middleware global
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
