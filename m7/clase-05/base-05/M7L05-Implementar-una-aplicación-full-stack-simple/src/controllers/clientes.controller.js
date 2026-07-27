import {
  obtenerClientes,
  crearCliente,
} from "../services/clientes.service.js";

/**
 * GET /clientes
 *
 * Obtiene y devuelve todos los clientes.
 */
export const listarClientes = async (_req, res, next) => {
  try {
    const clientes = await obtenerClientes();

    res.status(200).json({
      ok: true,
      cantidad: clientes.length,
      clientes,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /clientes
 *
 * Recibe nombre y email desde req.body.
 */
export const registrarCliente = async (req, res, next) => {
  try {
    const { nombre, email } = req.body;

    // Validación básica de entrada.
    // Las validaciones específicas del modelo también
    // serán ejecutadas por Sequelize.
    if (!nombre || !email) {
      return res.status(400).json({
        ok: false,
        mensaje: "Los campos nombre y email son obligatorios.",
      });
    }

    if (
      typeof nombre !== "string" ||
      typeof email !== "string"
    ) {
      return res.status(400).json({
        ok: false,
        mensaje: "Nombre y email deben ser textos.",
      });
    }

    const clienteCreado = await crearCliente({
      nombre,
      email,
    });

    res.status(201).json({
      ok: true,
      mensaje: "Cliente creado correctamente.",
      cliente: clienteCreado,
    });
  } catch (error) {
    next(error);
  }
};