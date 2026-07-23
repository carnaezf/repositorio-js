import express from "express";
import sequelize from "./src/config/db.js";
import Producto from "./src/models/producto.models.js";
import cors from "cors";
import dotenv from "dotenv";
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

// 1 listar productos
// ruta = productos.routes.js
// controlador = productos.controller.js
// cosulta = productos.services.js

// SQL anterior:
// SELECT * FROM productos ORDER BY id;

// SEQUELIZE:
// Producto.findAll()

app.get("/productos", async (req, res, next) => {
  try {
    const productos = await Producto.findAll({
      order: [["id", "ASC"]],
    });

    res.status(200).json({
      cantidad: productos.length,
      productos,
    });
  } catch (error) {
    next(error);
  }
});

// 2 Obtener producto por ID
// findByPk significa buscar por Primary Key

app.get("/productos/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    // Futuro: esta validacion pretenece al controlador
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "El id debe ser un número entero positivo",
      });
    }

    // Futuro: esta consulta pertenece al servicio:
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.status(200).json(producto);
  } catch (error) {
    next(error);
  }
});

// Crear producto
// SQL anterior:
// INSERT INTO productos (descripcion, cantidad)
// VALUES ($1, $2)
// RETURNING *;

// Sequlize:
// Producto.create()

app.post("/productos", async (req, res, next) => {
  try {
    const { descripcion, cantidad } = req.body;

    // Futuro: validaciones en productos.controller.js.
    if (typeof descripcion !== "string" || descripcion.trim() === "") {
      return res.status(400).json({
        error: "La descripción es obligatoria",
      });
    }

    if (!Number.isInteger(cantidad) || cantidad < 0) {
      return res.status(400).json({
        error: "La cantidad debe ser un entero igual o mayor que cero",
      });
    }

    // Futuro: Producto.create() en productos.service.js.
    const producto = await Producto.create({
      descripcion: descripcion.trim(),
      cantidad,
    });


    res.status(201).json({
      mensaje: "Producto creado correctamente",
      cantidad,
    })
  } catch (error) {
    next(error)
  }
});

// Middleware 404
app.use(unknownEndpoint);

// Middleware global
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
