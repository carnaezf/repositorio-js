import Cliente from "../models/cliente.model.js";

/**
 * Obtiene todos los clientes registrados.
 *
 * Esta función pertenece a la capa de servicios porque
 * interactúa directamente con el modelo Sequelize.
 */
export const obtenerClientes = async () => {
  const clientes = await Cliente.findAll({
    order: [["id", "ASC"]],
  });

  return clientes;
};

/**
 * Crea un nuevo cliente.
 *
 * @param {object} datosCliente
 * @param {string} datosCliente.nombre
 * @param {string} datosCliente.email
 */
export const crearCliente = async ({ nombre, email }) => {
  const clienteCreado = await Cliente.create({
    nombre: nombre.trim(),
    email: email.trim().toLowerCase(),
  });

  return clienteCreado;
};