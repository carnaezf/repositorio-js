import fileUpload from "express-fileupload";

/*
|--------------------------------------------------------------------------
| CONFIGURACIÓN DE SUBIDA DE ARCHIVOS
|--------------------------------------------------------------------------
|
| Este archivo centraliza la configuración de express-fileupload.
|
| limits.fileSize:
| Limita el tamaño máximo permitido.
|
| abortOnLimit:
| Detiene la operación si el archivo supera el límite.
|
| createParentPath:
| Crea automáticamente el directorio padre cuando sea necesario.
|
*/

const uploadMiddleware = fileUpload({
  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  abortOnLimit: true,

  createParentPath: true,

  safeFileNames: true,

  preserveExtension: true,
});

export default uploadMiddleware;
