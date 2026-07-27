import { Router } from "express";

import {
  listarPeliculas,
  registrarPelicula,
} from "../controllers/peliculas.controller.js";

const router = Router();

// GET /peliculas
router.get("/", listarPeliculas);

// POST /peliculas
router.post("/", registrarPelicula);

export default router;