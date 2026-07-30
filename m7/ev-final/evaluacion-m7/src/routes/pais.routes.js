import { Router } from "express";
import {
  listarPaises,
  agregarPais,
  borrarPais,
} from "../controllers/pais.controller.js";

const router = Router();

router.get("/", listarPaises);
router.post("/", agregarPais);
router.delete("/:nombre", borrarPais);

export default router;