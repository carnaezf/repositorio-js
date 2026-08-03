import { Router } from "express";

import {
  listarClientes,
  listarClientesCuentaRut,
  registrarClienteConCuentaRut,
  registrarClienteConCuentaAhorro,
  agregarRutACliente,
  agregarAhorroACliente,
  borrarCliente,
  borrarCuentaRut,
  borrarCuentaAhorro
} from "../controllers/clientes.controller.js";

const router = Router();

router.get("/", listarClientes);

router.get("/cuenta-rut", listarClientesCuentaRut);

router.post("/nuevo/cuenta-rut", registrarClienteConCuentaRut);

router.post("/nuevo/cuenta-ahorro", registrarClienteConCuentaAhorro);

router.post("/:rut/cuenta-rut", agregarRutACliente);

router.post("/:rut/cuenta-ahorro", agregarAhorroACliente);

router.delete("/:rut", borrarCliente);

router.delete("/:rut/cuenta-rut", borrarCuentaRut);

router.delete("/:rut/cuenta-ahorro/:numeroCuenta", borrarCuentaAhorro);

export default router;