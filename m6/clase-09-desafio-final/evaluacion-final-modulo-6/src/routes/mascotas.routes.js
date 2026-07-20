import { Router } from "express";

import {
  listarMascotas,
  buscarMascotaPorNombre,
  buscarMascotasPorRut,
  registrarMascota,
  borrarMascotaPorNombre,
  borrarMascotasPorRut,
} from "../controllers/mascotas.controller.js";

const router = Router();

// GET sin parámetros: retornar todas las mascotas
router.get("/", listarMascotas);

// GET con parámetro nombre
router.get("/nombre/:nombre", buscarMascotaPorNombre);

// GET con parámetro rut
router.get("/rut/:rut", buscarMascotasPorRut);

// POST: insertar mascota
router.post("/", registrarMascota);

// DELETE con parámetro nombre
router.delete("/nombre/:nombre", borrarMascotaPorNombre);

// DELETE con parámetro rut
router.delete("/rut/:rut", borrarMascotasPorRut);

export default router;