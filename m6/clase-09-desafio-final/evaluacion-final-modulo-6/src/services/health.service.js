import pool from "../config/db.js";

export const checkDB = async () => {
  // Consulta mínima → verifica disponibilidad
  await pool.query("SELECT 1");
};
