import { sequelize } from "../models/index.js";

const obtenerEstadoAplicacion = async () => {
  await sequelize.authenticate();

  return {
    api: "available",
    database: "connected",
    timestamp: new Date().toISOString(),
  };
};

export {
  obtenerEstadoAplicacion,
};
