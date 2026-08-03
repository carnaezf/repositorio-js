import path from "node:path";
import { randomUUID } from "node:crypto";

/*
|--------------------------------------------------------------------------
| EXTENSIONES PERMITIDAS
|--------------------------------------------------------------------------
*/

const EXTENSIONES_PERMITIDAS = [
  ".mp3",
  ".wav",
  ".ogg",
];

/*
|--------------------------------------------------------------------------
| TIPOS MIME PERMITIDOS
|--------------------------------------------------------------------------
*/

const MIME_PERMITIDOS = [
  "audio/mpeg",
  "audio/wav",
  "audio/x-wav",
  "audio/ogg",
];

/*
|--------------------------------------------------------------------------
| VALIDAR ARCHIVO DE AUDIO
|--------------------------------------------------------------------------
*/

export const validarArchivoAudio = (archivo) => {
  const extension = path
    .extname(archivo.name)
    .toLowerCase();

  if (!EXTENSIONES_PERMITIDAS.includes(extension)) {
    const error = new Error(
      "Extensión no permitida. Use mp3, wav u ogg"
    );

    error.statusCode = 422;

    throw error;
  }

  if (!MIME_PERMITIDOS.includes(archivo.mimetype)) {
    const error = new Error(
      "El tipo MIME del archivo no está permitido"
    );

    error.statusCode = 422;

    throw error;
  }

  return extension;
};

/*
|--------------------------------------------------------------------------
| GENERAR NOMBRE ÚNICO
|--------------------------------------------------------------------------
*/

export const generarNombreArchivo = (extension) => {
  return `${randomUUID()}${extension}`;
};
