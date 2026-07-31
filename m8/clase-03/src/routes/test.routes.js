import { Router } from "express";

import {
  listarPruebas,
} from "../controllers/test.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| PRUEBA SIMPLE DE EXPRESS
|--------------------------------------------------------------------------
*/

router.get("/", (req, res) => {
  return res.status(200).json({
    ok: true,
    message: "Ruta de prueba funcionando",
  });
});

/*
|--------------------------------------------------------------------------
| PRUEBA DE SEQUELIZE
|--------------------------------------------------------------------------
*/

router.get("/orm", listarPruebas);

/*
|--------------------------------------------------------------------------
| PRUEBA DEL MIDDLEWARE GLOBAL DE ERRORES
|--------------------------------------------------------------------------
*/

router.get("/error", (req, res, next) => {
  const error = new Error(
    "Error generado intencionalmente"
  );

  next(error);
});

export default router;
