import {
  obtenerClientes,
  obtenerClientesConCuentaRut,
  crearClienteConCuentaRut,
  crearClienteConCuentaAhorro,
  agregarCuentaRut,
  agregarCuentaAhorro,
  eliminarCliente,
  eliminarCuentaRut,
  eliminarCuentaAhorro
} from "../services/clientes.service.js";

export const listarClientes = (req, res, next) => {
  try {
    const clientes = obtenerClientes();

    res.json({
      mensaje: "Listado de clientes y cuentas",
      data: clientes
    });
  } catch (error) {
    next(error);
  }
};

export const listarClientesCuentaRut = (req, res, next) => {
  try {
    const clientes = obtenerClientesConCuentaRut();

    res.json({
      mensaje: "Clientes con cuenta RUT",
      data: clientes
    });
  } catch (error) {
    next(error);
  }
};

export const registrarClienteConCuentaRut = (req, res, next) => {
  try {
    const { rut, nombre, saldo } = req.body;

    if (!rut || !nombre) {
      return res.status(400).json({
        mensaje: "Los campos rut y nombre son obligatorios"
      });
    }

    const resultado = crearClienteConCuentaRut({ rut, nombre, saldo });

    if (resultado.error) {
      return res.status(resultado.status).json({
        mensaje: resultado.mensaje
      });
    }

    res.status(201).json({
      mensaje: "Cliente creado con cuenta RUT",
      data: resultado.data
    });
  } catch (error) {
    next(error);
  }
};

export const registrarClienteConCuentaAhorro = (req, res, next) => {
  try {
    const { rut, nombre, saldo } = req.body;

    if (!rut || !nombre) {
      return res.status(400).json({
        mensaje: "Los campos rut y nombre son obligatorios"
      });
    }

    const resultado = crearClienteConCuentaAhorro({ rut, nombre, saldo });

    if (resultado.error) {
      return res.status(resultado.status).json({
        mensaje: resultado.mensaje
      });
    }

    res.status(201).json({
      mensaje: "Cliente creado con cuenta de ahorro",
      data: resultado.data
    });
  } catch (error) {
    next(error);
  }
};

export const agregarRutACliente = (req, res, next) => {
  try {
    const { rut } = req.params;
    const { saldo } = req.body;

    const resultado = agregarCuentaRut(rut, saldo);

    if (resultado.error) {
      return res.status(resultado.status).json({
        mensaje: resultado.mensaje
      });
    }

    res.json({
      mensaje: "Cuenta RUT agregada correctamente",
      data: resultado.data
    });
  } catch (error) {
    next(error);
  }
};

export const agregarAhorroACliente = (req, res, next) => {
  try {
    const { rut } = req.params;
    const { saldo } = req.body;

    const resultado = agregarCuentaAhorro(rut, saldo);

    if (resultado.error) {
      return res.status(resultado.status).json({
        mensaje: resultado.mensaje
      });
    }

    res.json({
      mensaje: "Cuenta de ahorro agregada correctamente",
      data: resultado.data
    });
  } catch (error) {
    next(error);
  }
};

export const borrarCliente = (req, res, next) => {
  try {
    const { rut } = req.params;

    const resultado = eliminarCliente(rut);

    if (resultado.error) {
      return res.status(resultado.status).json({
        mensaje: resultado.mensaje
      });
    }

    res.json({
      mensaje: "Cliente eliminado con todas sus cuentas",
      data: resultado.data
    });
  } catch (error) {
    next(error);
  }
};

export const borrarCuentaRut = (req, res, next) => {
  try {
    const { rut } = req.params;

    const resultado = eliminarCuentaRut(rut);

    if (resultado.error) {
      return res.status(resultado.status).json({
        mensaje: resultado.mensaje
      });
    }

    res.json({
      mensaje: "Cuenta RUT eliminada correctamente",
      data: resultado.data
    });
  } catch (error) {
    next(error);
  }
};

export const borrarCuentaAhorro = (req, res, next) => {
  try {
    const { rut, numeroCuenta } = req.params;

    const resultado = eliminarCuentaAhorro(rut, numeroCuenta);

    if (resultado.error) {
      return res.status(resultado.status).json({
        mensaje: resultado.mensaje
      });
    }

    res.json({
      mensaje: "Cuenta de ahorro eliminada correctamente",
      data: resultado.data
    });
  } catch (error) {
    next(error);
  }
};