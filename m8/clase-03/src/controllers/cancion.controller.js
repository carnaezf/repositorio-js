// src/controllers/cancion.controller.js
import path from "node:path";
import { unlink } from "node:fs/promises";

import {
  obtenerCanciones,
  crearCancion,
  buscarCancionPorId,
  borrarCancion,
} from "../services/cancion.service.js";

import {
  validarArchivoAudio,
  generarNombreArchivo,
} from "../utils/file.utils.js";

/*
|--------------------------------------------------------------------------
| DIRECTORIO DE ALMACENAMIENTO
|--------------------------------------------------------------------------
|
| process.cwd() representa la raíz desde donde se ejecuta Node.
|
*/

const DIRECTORIO_CANCIONES = path.join(
  process.cwd(),
  "storage",
  "canciones"
);

/*
|--------------------------------------------------------------------------
| GET /api/v1/canciones
|--------------------------------------------------------------------------
*/

export const listarCanciones = async (
  _req,
  res,
  next
) => {
  try {
    const canciones = await obtenerCanciones();

    return res.status(200).json({
      ok: true,
      total: canciones.length,
      data: canciones,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| POST /api/v1/canciones
|--------------------------------------------------------------------------
*/

export const subirCancion = async (
  req,
  res,
  next
) => {
  let rutaAbsoluta = null;

  try {
    /*
    |----------------------------------------------------------------------
    | PASO 1: VALIDAR CAMPOS DE TEXTO
    |----------------------------------------------------------------------
    */

    const { titulo, artista } = req.body;

    if (!titulo || !artista) {
      return res.status(400).json({
        ok: false,
        message:
          "Los campos titulo y artista son obligatorios",
      });
    }

    /*
    |----------------------------------------------------------------------
    | PASO 2: VALIDAR EXISTENCIA DEL ARCHIVO
    |----------------------------------------------------------------------
    */

    if (
      !req.files ||
      !req.files.archivo
    ) {
      return res.status(400).json({
        ok: false,
        message:
          "Debe adjuntar un archivo en el campo archivo",
      });
    }

    const archivo = req.files.archivo;

    /*
    |----------------------------------------------------------------------
    | PASO 3: VALIDAR EXTENSIÓN Y TIPO MIME
    |----------------------------------------------------------------------
    */

    const extension =
      validarArchivoAudio(archivo);

    /*
    |----------------------------------------------------------------------
    | PASO 4: GENERAR UN NOMBRE ÚNICO
    |----------------------------------------------------------------------
    */

    const nombreGenerado =
      generarNombreArchivo(extension);

    /*
    |----------------------------------------------------------------------
    | PASO 5: CONSTRUIR RUTA ABSOLUTA
    |----------------------------------------------------------------------
    |
    | Ruta utilizada por Node para guardar físicamente.
    |
    */

    rutaAbsoluta = path.join(
      DIRECTORIO_CANCIONES,
      nombreGenerado
    );

    /*
    |----------------------------------------------------------------------
    | PASO 6: CONSTRUIR RUTA RELATIVA
    |----------------------------------------------------------------------
    |
    | Esta será guardada en PostgreSQL.
    |
    */

    const rutaRelativa = path.join(
      "storage",
      "canciones",
      nombreGenerado
    );

    /*
    |----------------------------------------------------------------------
    | PASO 7: MOVER EL ARCHIVO
    |----------------------------------------------------------------------
    */

    await archivo.mv(rutaAbsoluta);

    /*
    |----------------------------------------------------------------------
    | PASO 8: GUARDAR METADATOS MEDIANTE SEQUELIZE
    |----------------------------------------------------------------------
    */

    const cancion = await crearCancion({
      titulo: titulo.trim(),
      artista: artista.trim(),
      archivo: rutaRelativa,
      nombreOriginal: archivo.name,
      tipoMime: archivo.mimetype,
      tamanio: archivo.size,
    });

    return res.status(201).json({
      ok: true,
      message:
        "Canción almacenada correctamente",
      data: cancion,
    });
  } catch (error) {
    /*
    |----------------------------------------------------------------------
    | LIMPIEZA COMPENSATORIA
    |----------------------------------------------------------------------
    |
    | Si el archivo alcanzó a guardarse, pero falló Sequelize,
    | intentamos eliminarlo para evitar archivos huérfanos.
    |
    */

    if (rutaAbsoluta) {
      try {
        await unlink(rutaAbsoluta);
      } catch {
        // No reemplazamos el error principal.
      }
    }

    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| DELETE /api/v1/canciones/:id
|--------------------------------------------------------------------------
*/

export const eliminarCancion = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;

    const cancion =
      await buscarCancionPorId(id);

    if (!cancion) {
      return res.status(404).json({
        ok: false,
        message: "Canción no encontrada",
      });
    }

    const rutaAbsoluta = path.join(
      process.cwd(),
      cancion.archivo
    );

    /*
    |----------------------------------------------------------------------
    | PASO 1: ELIMINAR ARCHIVO FÍSICO
    |----------------------------------------------------------------------
    */

    try {
      await unlink(rutaAbsoluta);
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    /*
    |----------------------------------------------------------------------
    | PASO 2: ELIMINAR REGISTRO
    |----------------------------------------------------------------------
    */

    await borrarCancion(cancion);

    return res.status(200).json({
      ok: true,
      message:
        "Canción eliminada correctamente",
    });
  } catch (error) {
    next(error);
  }
};
