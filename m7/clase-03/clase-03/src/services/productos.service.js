import pool from "../config/db.js";

export const obtenerProductos = async () => {
  const resultado = await pool.query(`
    SELECT id, descripcion, cantidad
    FROM productos
    ORDER BY id
  `);

  return resultado.rows;
};

export const obtenerProductosConStockBajo = async () => {
  const resultado = await pool.query(`
    SELECT id, descripcion, cantidad
    FROM productos
    WHERE cantidad <= 8
    ORDER BY cantidad ASC
  `);

  return resultado.rows;
};
