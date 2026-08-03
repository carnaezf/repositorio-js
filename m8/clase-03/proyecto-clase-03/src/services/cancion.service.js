// src/services/cancion.service.js
import { Cancion } from "../models/index.js";

/*
|--------------------------------------------------------------------------
| OBTENER CANCIONES
|--------------------------------------------------------------------------
*/

export const obtenerCanciones = async () => {
  return Cancion.findAll({
    order: [["id", "ASC"]],
  });
};

/*
|--------------------------------------------------------------------------
| CREAR REGISTRO
|--------------------------------------------------------------------------
*/

export const crearCancion = async ({
  titulo,
  artista,
  archivo,
  nombreOriginal,
  tipoMime,
  tamanio,
}) => {
  return Cancion.create({
    titulo,
    artista,
    archivo,
    nombreOriginal,
    tipoMime,
    tamanio,
  });
};

/*
|--------------------------------------------------------------------------
| BUSCAR POR ID
|--------------------------------------------------------------------------
*/

export const buscarCancionPorId = async (id) => {
  return Cancion.findByPk(id);
};

/*
|--------------------------------------------------------------------------
| ELIMINAR REGISTRO
|--------------------------------------------------------------------------
*/

export const borrarCancion = async (cancion) => {
  await cancion.destroy();
};
