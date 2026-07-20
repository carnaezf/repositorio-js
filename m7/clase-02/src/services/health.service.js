import pool from "../config/db.js";

export const checkDB = async () => {
  const result = await pool.query("SELECT 1 AS connected");

  return result.rows[0];
};

export const getDatabaseDetails = async () => {
  const result = await pool.query(`
    SELECT
      current_database() AS name,
      NOW() AS server_time,
      version() AS version
  `);

  return result.rows[0];
};
