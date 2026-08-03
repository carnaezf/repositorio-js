// src/services/test.service.js
import { TestModel } from "../models/index.js";

const obtenerPruebas = async () => {
  const registros = await TestModel.findAll({
    order: [["id", "ASC"]],
  });

  return registros;
};

export {
  obtenerPruebas,
};
