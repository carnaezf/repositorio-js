import {
  obtenerMascotas,
  obtenerMascotaPorNombre,
  obtenerMascotasPorRut,
  crearMascota,
  eliminarMascotaPorNombre,
  eliminarMascotasPorRut,
} from "../services/mascotas.service.js";

export const listarMascotas = (req, res, next) => {
  try {
    const mascotas = obtenerMascotas();

    res.json({
      mensaje: "Listado de mascotas",
      data: mascotas,
    });
  } catch (error) {
    next(error);
  }
};

export const buscarMascotaPorNombre = (req, res, next) => {
  try {
    const { nombre } = req.params;

    const mascota = obtenerMascotaPorNombre(nombre);

    if (!mascota) {
      return res.status(404).json({
        mensaje: `No se encontró una mascota con nombre ${nombre}`,
      });
    }

    res.json({
      mensaje: "Mascota encontrada",
      data: mascota,
    });
  } catch (error) {
    next(error);
  }
};

export const buscarMascotasPorRut = (req, res, next) => {
  try {
    const { rut } = req.params;

    const mascotas = obtenerMascotasPorRut(rut);

    if (mascotas.length === 0) {
      return res.status(404).json({
        mensaje: `No se encontraron mascotas asociadas al RUT ${rut}`,
      });
    }

    res.json({
      mensaje: "Mascotas encontradas",
      data: mascotas,
    });
  } catch (error) {
    next(error);
  }
};

export const registrarMascota = (req, res, next) => {
  try {
    const { nombre, rut } = req.body;

    if (!nombre || !rut) {
      return res.status(400).json({
        mensaje: "Los campos nombre y rut son obligatorios",
      });
    }

    const nuevaMascota = {
      nombre,
      rut,
    };

    const mascotaCreada = crearMascota(nuevaMascota);

    res.status(201).json({
      mensaje: "Mascota registrada correctamente",
      data: mascotaCreada,
    });
  } catch (error) {
    next(error);
  }
};

export const borrarMascotaPorNombre = (req, res, next) => {
  try {
    const { nombre } = req.params;

    const mascotaEliminada = eliminarMascotaPorNombre(nombre);

    if (!mascotaEliminada) {
      return res.status(404).json({
        mensaje: `No se encontró una mascota con nombre ${nombre}`,
      });
    }

    res.json({
      mensaje: "Mascota eliminada correctamente",
      data: mascotaEliminada,
    });
  } catch (error) {
    next(error);
  }
};

export const borrarMascotasPorRut = (req, res, next) => {
  try {
    const { rut } = req.params;

    const mascotasEliminadas = eliminarMascotasPorRut(rut);

    if (!mascotasEliminadas) {
      return res.status(404).json({
        mensaje: `No se encontraron mascotas asociadas al RUT ${rut}`,
      });
    }

    res.json({
      mensaje: "Mascotas eliminadas correctamente",
      data: mascotasEliminadas,
    });
  } catch (error) {
    next(error);
  }
};