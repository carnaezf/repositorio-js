// src/routes/cancion.routes.js
import { Router } from "express";

import {
  listarCanciones,
  subirCancion,
  eliminarCancion,
} from "../controllers/cancion.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| GET /api/v1/canciones
|--------------------------------------------------------------------------
|
| Devuelve las canciones registradas en PostgreSQL.
|
*/

router.get("/", listarCanciones);

/*
|--------------------------------------------------------------------------
| POST /api/v1/canciones
|--------------------------------------------------------------------------
|
| Recibe titulo, artista y un archivo multipart/form-data.
|
*/

router.post("/", subirCancion);

/*
|--------------------------------------------------------------------------
| DELETE /api/v1/canciones/:id
|--------------------------------------------------------------------------
|
| Elimina el archivo físico y el registro de PostgreSQL.
|
*/

router.delete("/:id", eliminarCancion);

export default router;
