import { Router } from "express";

import {
  crearAsignacion,
} from "../controllers/asignaciones.controller.js";

const router = Router();

// POST /asignar-actor
router.post("/", crearAsignacion);

export default router;