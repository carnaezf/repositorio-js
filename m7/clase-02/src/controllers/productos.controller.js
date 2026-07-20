import {
  obtenerProductos,
  obtenerProductosConStockBajo,
} from "../services/productos.service.js";

export const listarProductos = async (req, res, next) => {
  try {
    const productos = await obtenerProductos();

    res.status(200).json({
      cantidad: productos.length,
      productos,
    });
  } catch (error) {
    next(error);
  }
};

export const listarProductosConStockBajo = async (req, res, next) => {
  try {
    const productos = await obtenerProductosConStockBajo();

    res.status(200).json({
      cantidad: productos.length,
      productos,
    });
  } catch (error) {
    next(error);
  }
};
