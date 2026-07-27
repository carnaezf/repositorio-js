const API_CLIENTES = "/clientes";

const formulario = document.getElementById(
  "form-cliente",
);

const botonAgregar = document.getElementById(
  "btn-agregar",
);

const botonListar = document.getElementById(
  "btn-listar",
);

const listaClientes = document.getElementById(
  "lista-clientes",
);

const totalClientes = document.getElementById(
  "total-clientes",
);

const estadoCarga = document.getElementById(
  "estado-carga",
);

const mensaje = document.getElementById("mensaje");

/**
 * Muestra un mensaje visual.
 *
 * @param {string} texto
 * @param {"success"|"danger"|"warning"|"info"} tipo
 */
const mostrarMensaje = (
  texto,
  tipo = "success",
) => {
  mensaje.textContent = texto;
  mensaje.className = `alert alert-${tipo}`;

  window.setTimeout(() => {
    mensaje.className = "alert d-none";
    mensaje.textContent = "";
  }, 4000);
};

/**
 * Dibuja los clientes en la interfaz.
 *
 * @param {Array} clientes
 */
const renderizarClientes = (clientes) => {
  listaClientes.innerHTML = "";

  totalClientes.textContent =
    `Total: ${clientes.length}`;

  if (clientes.length === 0) {
    estadoCarga.textContent =
      "No existen clientes registrados.";

    return;
  }

  estadoCarga.textContent = "";

  clientes.forEach((cliente) => {
    const elemento = document.createElement("li");

    elemento.className =
      "list-group-item d-flex flex-column flex-sm-row justify-content-between gap-2";

    const datos = document.createElement("div");

    const nombre = document.createElement("strong");
    nombre.textContent = cliente.nombre;

    const email = document.createElement("div");
    email.className = "text-secondary";
    email.textContent = cliente.email;

    const identificador = document.createElement("span");
    identificador.className =
      "badge text-bg-secondary align-self-start";

    identificador.textContent = `ID: ${cliente.id}`;

    datos.append(nombre, email);
    elemento.append(datos, identificador);
    listaClientes.append(elemento);
  });
};

/**
 * Consulta GET /clientes.
 */
const cargarClientes = async () => {
  botonListar.disabled = true;
  estadoCarga.textContent = "Consultando clientes...";

  try {
    const respuesta = await fetch(API_CLIENTES);

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(
        datos.mensaje ||
          "No fue posible obtener los clientes.",
      );
    }

    renderizarClientes(datos.clientes);
  } catch (error) {
    estadoCarga.textContent =
      "No fue posible cargar los clientes.";

    mostrarMensaje(error.message, "danger");
  } finally {
    botonListar.disabled = false;
  }
};

/**
 * Envía POST /clientes.
 */
const registrarCliente = async (evento) => {
  evento.preventDefault();

  const datosFormulario = new FormData(formulario);

  const nuevoCliente = {
    nombre: datosFormulario
      .get("nombre")
      .trim(),

    email: datosFormulario
      .get("email")
      .trim(),
  };

  botonAgregar.disabled = true;
  botonAgregar.textContent = "Guardando...";

  try {
    const respuesta = await fetch(API_CLIENTES, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(nuevoCliente),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(
        datos.mensaje ||
          "No fue posible registrar el cliente.",
      );
    }

    formulario.reset();

    mostrarMensaje(
      datos.mensaje ||
        "Cliente creado correctamente.",
      "success",
    );

    await cargarClientes();
  } catch (error) {
    mostrarMensaje(error.message, "danger");
  } finally {
    botonAgregar.disabled = false;
    botonAgregar.textContent = "Agregar cliente";
  }
};

botonListar.addEventListener(
  "click",
  cargarClientes,
);

formulario.addEventListener(
  "submit",
  registrarCliente,
);