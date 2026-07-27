import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",

    // Muestra en la terminal el SQL generado por Sequelize.
    // Es útil durante el aprendizaje y la depuración.
    logging: console.log,
  },
);

export default sequelize;