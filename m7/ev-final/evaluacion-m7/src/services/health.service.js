import sequelize from "../config/db.js";

const comprobarBaseDeDatos = async () => {
  await sequelize.authenticate();

  return {
    baseDeDatos: process.env.DB_NAME,
    estado: "conectada",
  };
};

export {
  comprobarBaseDeDatos,
};