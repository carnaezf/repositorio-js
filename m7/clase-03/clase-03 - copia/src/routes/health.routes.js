import { Router } from "express";

import {
  healthCheck,
  healthDetails,
} from "../controllers/health.controller.js";

const router = Router();

router.get("/", healthCheck);
router.get("/details", healthDetails);


export default router;