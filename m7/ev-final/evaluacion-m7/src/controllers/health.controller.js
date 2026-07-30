import {
  comprobarBaseDeDatos,
} from "../services/health.service.js";

const obtenerEstado = async (req, res, next) => {
  try {
    const resultado = await comprobarBaseDeDatos();

    res.status(200).json({
      ok: true,
      mensaje: "Conexión establecida correctamente.",
      data: resultado,
    });
  } catch (error) {
    next(error);
  }
};

export {
  obtenerEstado,
};