const API_URL = "/api/v1/paises";

const tablaPaises = document.querySelector(
  "#tabla-paises"
);

const selectorLimite = document.querySelector(
  "#limite"
);

const botonSiguiente = document.querySelector(
  "#btn-siguiente"
);

const botonReiniciar = document.querySelector(
  "#btn-reiniciar"
);

const formularioAgregar = document.querySelector(
  "#form-agregar"
);

const formularioEliminar = document.querySelector(
  "#form-eliminar"
);

const contenedorMensaje = document.querySelector(
  "#mensaje"
);

let cursorActual = null;
let siguienteCursor = null;

const mostrarMensaje = (
  mensaje,
  tipo = "success"
) => {
  contenedorMensaje.textContent = mensaje;
  contenedorMensaje.className = `alert alert-${tipo}`;
};

const ocultarMensaje = () => {
  contenedorMensaje.textContent = "";
  contenedorMensaje.className = "alert d-none";
};

const formatearNumero = (valor) => {
  return new Intl.NumberFormat("es-CL").format(
    Number(valor)
  );
};

const procesarRespuesta = async (respuesta) => {
  const contenido = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      contenido.mensaje ||
      "No fue posible completar la solicitud."
    );
  }

  return contenido;
};

const renderizarPaises = (paises) => {
  tablaPaises.innerHTML = "";

  if (paises.length === 0) {
    tablaPaises.innerHTML = `
      <tr>
        <td colspan="5" class="text-center">
          No existen países para mostrar.
        </td>
      </tr>
    `;

    return;
  }

  paises.forEach((pais) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${pais.nombre}</td>
      <td>${pais.continente}</td>
      <td>${formatearNumero(pais.poblacion)}</td>
      <td>${formatearNumero(pais.pib.pib2019)}</td>
      <td>${formatearNumero(pais.pib.pib2020)}</td>
    `;

    tablaPaises.appendChild(fila);
  });
};

const cargarPaises = async () => {
  ocultarMensaje();

  try {
    const limite = selectorLimite.value;

    const parametros = new URLSearchParams({
      limite,
    });

    if (cursorActual) {
      parametros.set("cursor", cursorActual);
    }

    const respuesta = await fetch(
      `${API_URL}?${parametros.toString()}`
    );

    const contenido = await procesarRespuesta(
      respuesta
    );

    renderizarPaises(contenido.data);

    siguienteCursor =
      contenido.paginacion.siguienteCursor;

    botonSiguiente.disabled =
      !contenido.paginacion.haySiguiente;
  } catch (error) {
    mostrarMensaje(error.message, "danger");
  }
};

const reiniciarLista = async () => {
  cursorActual = null;
  siguienteCursor = null;

  await cargarPaises();
};

botonSiguiente.addEventListener(
  "click",
  async () => {
    if (!siguienteCursor) {
      return;
    }

    cursorActual = siguienteCursor;

    await cargarPaises();
  }
);

botonReiniciar.addEventListener(
  "click",
  reiniciarLista
);

selectorLimite.addEventListener(
  "change",
  reiniciarLista
);

formularioAgregar.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();
    ocultarMensaje();

    const datosFormulario = new FormData(
      formularioAgregar
    );

    const pais = {
      nombre: datosFormulario.get("nombre"),
      continente: datosFormulario.get("continente"),
      poblacion: Number(
        datosFormulario.get("poblacion")
      ),
      pib2019: Number(
        datosFormulario.get("pib2019")
      ),
      pib2020: Number(
        datosFormulario.get("pib2020")
      ),
    };

    try {
      const respuesta = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(pais),
      });

      const contenido = await procesarRespuesta(
        respuesta
      );

      mostrarMensaje(
        contenido.mensaje,
        "success"
      );

      formularioAgregar.reset();

      await reiniciarLista();
    } catch (error) {
      mostrarMensaje(error.message, "danger");
    }
  }
);

formularioEliminar.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();
    ocultarMensaje();

    const datosFormulario = new FormData(
      formularioEliminar
    );

    const nombre = datosFormulario
      .get("nombre")
      .trim();

    const confirmacion = window.confirm(
      `¿Desea eliminar el país ${nombre}?`
    );

    if (!confirmacion) {
      return;
    }

    try {
      const respuesta = await fetch(
        `${API_URL}/${encodeURIComponent(nombre)}`,
        {
          method: "DELETE",
        }
      );

      const contenido = await procesarRespuesta(
        respuesta
      );

      mostrarMensaje(
        contenido.mensaje,
        "success"
      );

      formularioEliminar.reset();

      await reiniciarLista();
    } catch (error) {
      mostrarMensaje(error.message, "danger");
    }
  }
);

cargarPaises();