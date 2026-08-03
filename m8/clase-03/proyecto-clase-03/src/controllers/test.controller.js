import {
  obtenerPruebas,
} from "../services/test.service.js";

const listarPruebas = async (req, res, next) => {
  try {
    const registros = await obtenerPruebas();

    return res.status(200).json({
      ok: true,
      message: "Sequelize funciona correctamente",
      data: registros,
    });
  } catch (error) {
    next(error);
  }
};

export {
  listarPruebas,
};
