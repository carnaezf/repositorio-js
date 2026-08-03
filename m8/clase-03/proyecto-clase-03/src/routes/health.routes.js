import { Router } from "express";

import {
  obtenerHealth,
} from "../controllers/health.controller.js";

const router = Router();

router.get("/", obtenerHealth);

export default router;
