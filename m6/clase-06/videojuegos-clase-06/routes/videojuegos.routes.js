import express from "express";
import { obtenerVideoJuegos } from "../services/videojuegos.services.js";

const router = express.Router();

// GET todos
router.get("/", (req, res) => {
  const juegos = obtenerVideoJuegos();

  res.status(200).json({
    mensaje: "Videojuegos obtenidos correctamente",
    total: juegos.length,
    data: juegos,
  });
});

export default router;
