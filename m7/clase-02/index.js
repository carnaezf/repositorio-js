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

app.get("/productos-seguro/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

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


// // Middleware 404
app.use(unknownEndpoint);

// Middleware global
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
