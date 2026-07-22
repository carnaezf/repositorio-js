import { Router } from "express";

import {
  listarProductos,
  listarProductosConStockBajo,
} from "../controllers/productos.controller.js";

const router = Router();

router.get("/", listarProductos);
router.get("/stock-bajo", listarProductosConStockBajo);

export default router;
