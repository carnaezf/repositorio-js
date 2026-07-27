import { Router } from "express";

import {
  listarClientes,
  registrarCliente,
} from "../controllers/clientes.controller.js";

const router = Router();

// GET /clientes
router.get("/", listarClientes);

// POST /clientes
router.post("/", registrarCliente);

export default router;