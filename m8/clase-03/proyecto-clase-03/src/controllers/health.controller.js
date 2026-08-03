import {
  obtenerEstadoAplicacion,
} from "../services/health.service.js";

const obtenerHealth = async (req, res, next) => {
  try {
    const estado = await obtenerEstadoAplicacion();

    return res.status(200).json({
      ok: true,
      data: estado,
    });
  } catch (error) {
    next(error);
  }
};

export {
  obtenerHealth,
};
