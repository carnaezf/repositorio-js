import fs from "fs";
import path from "path";

const ruta = path.resolve("data/clientes.json");

export const obtenerClientes = () => {
  const data = fs.readFileSync(ruta, "utf-8");
  return JSON.parse(data);
};

export const guardarClientes = (clientes) => {
  fs.writeFileSync(ruta, JSON.stringify(clientes, null, 2));
};

export const obtenerClientesConCuentaRut = () => {
  const clientes = obtenerClientes();

  return clientes.filter((cliente) => cliente.cuentaRut !== null);
};

export const crearClienteConCuentaRut = ({ rut, nombre, saldo = 0 }) => {
  const clientes = obtenerClientes();

  const clienteExiste = clientes.find((cliente) => cliente.rut === rut);

  if (clienteExiste) {
    return {
      error: true,
      status: 409,
      mensaje: "El cliente ya existe"
    };
  }

  const nuevoCliente = {
    rut,
    nombre,
    cuentaRut: {
      numero: `RUT-${rut}`,
      saldo
    },
    cuentasAhorro: []
  };

  clientes.push(nuevoCliente);
  guardarClientes(clientes);

  return {
    error: false,
    data: nuevoCliente
  };
};

export const crearClienteConCuentaAhorro = ({ rut, nombre, saldo = 0 }) => {
  const clientes = obtenerClientes();

  const clienteExiste = clientes.find((cliente) => cliente.rut === rut);

  if (clienteExiste) {
    return {
      error: true,
      status: 409,
      mensaje: "El cliente ya existe"
    };
  }

  const numeroCuenta = `AHO-${Date.now()}`;

  const nuevoCliente = {
    rut,
    nombre,
    cuentaRut: null,
    cuentasAhorro: [
      {
        numero: numeroCuenta,
        saldo
      }
    ]
  };

  clientes.push(nuevoCliente);
  guardarClientes(clientes);

  return {
    error: false,
    data: nuevoCliente
  };
};

export const agregarCuentaRut = (rut, saldo = 0) => {
  const clientes = obtenerClientes();

  const cliente = clientes.find((cliente) => cliente.rut === rut);

  if (!cliente) {
    return {
      error: true,
      status: 404,
      mensaje: "Cliente no encontrado"
    };
  }

  if (cliente.cuentaRut) {
    return {
      error: true,
      status: 409,
      mensaje: "El cliente ya tiene una cuenta RUT"
    };
  }

  cliente.cuentaRut = {
    numero: `RUT-${rut}`,
    saldo
  };

  guardarClientes(clientes);

  return {
    error: false,
    data: cliente
  };
};

export const agregarCuentaAhorro = (rut, saldo = 0) => {
  const clientes = obtenerClientes();

  const cliente = clientes.find((cliente) => cliente.rut === rut);

  if (!cliente) {
    return {
      error: true,
      status: 404,
      mensaje: "Cliente no encontrado"
    };
  }

  const nuevaCuenta = {
    numero: `AHO-${Date.now()}`,
    saldo
  };

  cliente.cuentasAhorro.push(nuevaCuenta);

  guardarClientes(clientes);

  return {
    error: false,
    data: cliente
  };
};

export const eliminarCliente = (rut) => {
  const clientes = obtenerClientes();

  const clienteEliminado = clientes.find((cliente) => cliente.rut === rut);

  if (!clienteEliminado) {
    return {
      error: true,
      status: 404,
      mensaje: "Cliente no encontrado"
    };
  }

  const clientesActualizados = clientes.filter((cliente) => cliente.rut !== rut);

  guardarClientes(clientesActualizados);

  return {
    error: false,
    data: clienteEliminado
  };
};

export const eliminarCuentaRut = (rut) => {
  const clientes = obtenerClientes();

  const cliente = clientes.find((cliente) => cliente.rut === rut);

  if (!cliente) {
    return {
      error: true,
      status: 404,
      mensaje: "Cliente no encontrado"
    };
  }

  if (!cliente.cuentaRut) {
    return {
      error: true,
      status: 404,
      mensaje: "El cliente no tiene cuenta RUT"
    };
  }

  if (cliente.cuentasAhorro.length === 0) {
    return {
      error: true,
      status: 409,
      mensaje: "No se puede eliminar la única cuenta del cliente"
    };
  }

  const cuentaEliminada = cliente.cuentaRut;
  cliente.cuentaRut = null;

  guardarClientes(clientes);

  return {
    error: false,
    data: cuentaEliminada
  };
};

export const eliminarCuentaAhorro = (rut, numeroCuenta) => {
  const clientes = obtenerClientes();

  const cliente = clientes.find((cliente) => cliente.rut === rut);

  if (!cliente) {
    return {
      error: true,
      status: 404,
      mensaje: "Cliente no encontrado"
    };
  }

  const cuentaEliminada = cliente.cuentasAhorro.find(
    (cuenta) => cuenta.numero === numeroCuenta
  );

  if (!cuentaEliminada) {
    return {
      error: true,
      status: 404,
      mensaje: "Cuenta de ahorro no encontrada"
    };
  }

  if (!cliente.cuentaRut && cliente.cuentasAhorro.length === 1) {
    return {
      error: true,
      status: 409,
      mensaje: "No se puede eliminar la única cuenta del cliente"
    };
  }

  cliente.cuentasAhorro = cliente.cuentasAhorro.filter(
    (cuenta) => cuenta.numero !== numeroCuenta
  );

  guardarClientes(clientes);

  return {
    error: false,
    data: cuentaEliminada
  };
};