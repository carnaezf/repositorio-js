import { Op } from "sequelize";
import sequelize from "../config/db.js";
import {
  Pais,
  PaisPib,
  PaisDataWeb,
} from "../models/index.js";

const LIMITES_PERMITIDOS = [5, 10, 20];

const normalizarLimite = (limite) => {
  const valor = Number(limite);

  if (!LIMITES_PERMITIDOS.includes(valor)) {
    return 5;
  }

  return valor;
};

const obtenerPaises = async ({
  limite = 5,
  cursor = null,
}) => {
  const limiteNormalizado = normalizarLimite(limite);

  /*
   * Se solicita un registro adicional.
   * Ese registro permite saber si existe otra página.
   */
  const cantidadConsulta = limiteNormalizado + 1;

  const where = {};

  /*
   * Cursor lógico:
   * obtener países cuyo nombre sea posterior
   * al último nombre recibido.
   */
  if (cursor) {
    where.nombre = {
      [Op.gt]: cursor,
    };
  }

  const registros = await Pais.findAll({
    where,

    include: [
      {
        model: PaisPib,
        as: "pib",
        attributes: [
          "pib2019",
          "pib2020",
        ],
        required: true,
      },
    ],

    order: [["nombre", "ASC"]],

    limit: cantidadConsulta,
  });

  const haySiguiente = registros.length > limiteNormalizado;

  const paises = haySiguiente
    ? registros.slice(0, limiteNormalizado)
    : registros;

  const ultimoPais = paises.at(-1);

  return {
    paises,
    paginacion: {
      limite: limiteNormalizado,
      haySiguiente,
      siguienteCursor:
        haySiguiente && ultimoPais
          ? ultimoPais.nombre
          : null,
    },
  };
};

const crearPais = async ({
  nombre,
  continente,
  poblacion,
  pib2019,
  pib2020,
}) => {
  const transaccion = await sequelize.transaction();

  try {
    const paisExistente = await Pais.findByPk(nombre, {
      transaction: transaccion,
    });

    if (paisExistente) {
      const error = new Error(
        `El país ${nombre} ya se encuentra registrado.`
      );

      error.statusCode = 409;
      throw error;
    }

    const pais = await Pais.create(
      {
        nombre,
        continente,
        poblacion,
      },
      {
        transaction: transaccion,
      }
    );

    const pib = await PaisPib.create(
      {
        nombrePais: nombre,
        pib2019,
        pib2020,
      },
      {
        transaction: transaccion,
      }
    );

    /*
     * Acción 1:
     * se registra la inserción del país.
     */
    await PaisDataWeb.create(
      {
        nombrePais: nombre,
        accion: 1,
      },
      {
        transaction: transaccion,
      }
    );

    await transaccion.commit();

    return {
      ...pais.toJSON(),
      pib: pib.toJSON(),
    };
  } catch (error) {
    await transaccion.rollback();
    throw error;
  }
};

const eliminarPais = async (nombre) => {
  const transaccion = await sequelize.transaction();

  try {
    const pais = await Pais.findByPk(nombre, {
      transaction: transaccion,
    });

    if (!pais) {
      const error = new Error(
        `No se encontró el país ${nombre}.`
      );

      error.statusCode = 404;
      throw error;
    }

    /*
     * Aunque ON DELETE CASCADE eliminaría el PIB,
     * lo hacemos explícitamente para demostrar
     * ambas operaciones solicitadas.
     */
    const cantidadPibEliminado = await PaisPib.destroy({
      where: {
        nombrePais: nombre,
      },
      transaction: transaccion,
    });

    const cantidadPaisesEliminados = await Pais.destroy({
      where: {
        nombre,
      },
      transaction: transaccion,
    });

    /*
     * Acción 0:
     * se registra la eliminación del país.
     */
    await PaisDataWeb.create(
      {
        nombrePais: nombre,
        accion: 0,
      },
      {
        transaction: transaccion,
      }
    );

    await transaccion.commit();

    return {
      nombre,
      paisesEliminados: cantidadPaisesEliminados,
      registrosPibEliminados: cantidadPibEliminado,
    };
  } catch (error) {
    await transaccion.rollback();
    throw error;
  }
};

export {
  obtenerPaises,
  crearPais,
  eliminarPais,
};