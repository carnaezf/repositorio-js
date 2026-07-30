import {
  obtenerPaises,
  crearPais,
  eliminarPais,
} from "../services/pais.service.js";

const listarPaises = async (req, res, next) => {
  try {
    const resultado = await obtenerPaises({
      limite: req.query.limite,
      cursor: req.query.cursor,
    });

    res.status(200).json({
      ok: true,
      mensaje: "Países obtenidos correctamente.",
      data: resultado.paises,
      paginacion: resultado.paginacion,
    });
  } catch (error) {
    next(error);
  }
};

const agregarPais = async (req, res, next) => {
  try {
    const {
      nombre,
      continente,
      poblacion,
      pib2019,
      pib2020,
    } = req.body;

    if (
      !nombre ||
      !continente ||
      poblacion === undefined ||
      pib2019 === undefined ||
      pib2020 === undefined
    ) {
      const error = new Error(
        "Nombre, continente, población, PIB 2019 y PIB 2020 son obligatorios."
      );

      error.statusCode = 400;
      throw error;
    }

    const poblacionNumero = Number(poblacion);
    const pib2019Numero = Number(pib2019);
    const pib2020Numero = Number(pib2020);

    if (
      !Number.isFinite(poblacionNumero) ||
      !Number.isFinite(pib2019Numero) ||
      !Number.isFinite(pib2020Numero)
    ) {
      const error = new Error(
        "Población y valores de PIB deben ser numéricos."
      );

      error.statusCode = 400;
      throw error;
    }

    if (
      poblacionNumero < 0 ||
      pib2019Numero < 0 ||
      pib2020Numero < 0
    ) {
      const error = new Error(
        "Población y valores de PIB no pueden ser negativos."
      );

      error.statusCode = 400;
      throw error;
    }

    const paisCreado = await crearPais({
      nombre: nombre.trim(),
      continente: continente.trim(),
      poblacion: poblacionNumero,
      pib2019: pib2019Numero,
      pib2020: pib2020Numero,
    });

    res.status(201).json({
      ok: true,
      mensaje: "País agregado correctamente.",
      data: paisCreado,
    });
  } catch (error) {
    next(error);
  }
};

const borrarPais = async (req, res, next) => {
  try {
    const nombre = req.params.nombre?.trim();

    if (!nombre) {
      const error = new Error(
        "Debe indicar el nombre del país."
      );

      error.statusCode = 400;
      throw error;
    }

    const resultado = await eliminarPais(nombre);

    res.status(200).json({
      ok: true,
      mensaje: `El país ${nombre} fue eliminado correctamente.`,
      data: resultado,
    });
  } catch (error) {
    next(error);
  }
};

export {
  listarPaises,
  agregarPais,
  borrarPais,
};