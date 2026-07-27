import { Router } from "express";

import {
  listarActores,
  registrarActor,
} from "../controllers/actores.controller.js";

const router = Router();

// GET /actores
router.get("/", listarActores);

// POST /actores
router.post("/", registrarActor);

export default router;