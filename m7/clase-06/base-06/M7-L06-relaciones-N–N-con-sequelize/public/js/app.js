const API = {
  peliculas: "/peliculas",
  actores: "/actores",
  asignar: "/asignar-actor",
};

const formularioActor =
  document.getElementById("form-actor");

const formularioPelicula =
  document.getElementById("form-pelicula");

const formularioAsignacion =
  document.getElementById("form-asignacion");

const listaPeliculas =
  document.getElementById("lista-peliculas");

const listaActores =
  document.getElementById("lista-actores");

const selectActoresPelicula =
  document.getElementById("pelicula-actores");

const selectAsignacionPelicula =
  document.getElementById(
    "asignacion-pelicula",
  );

const selectAsignacionActor =
  document.getElementById(
    "asignacion-actor",
  );

const mensaje =
  document.getElementById("mensaje");

/**
 * Muestra una alerta en pantalla.
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
 * Realiza una petición y procesa la respuesta JSON.
 */
const solicitar = async (
  url,
  opciones = {},
) => {
  const respuesta = await fetch(url, opciones);

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      datos.mensaje ||
        "No fue posible completar la operación.",
    );
  }

  return datos;
};

/**
 * Renderiza las películas y sus actores.
 */
const renderizarPeliculas = (peliculas) => {
  listaPeliculas.innerHTML = "";

  if (peliculas.length === 0) {
    listaPeliculas.textContent =
      "No existen películas registradas.";

    return;
  }

  peliculas.forEach((pelicula) => {
    const articulo =
      document.createElement("article");

    articulo.className =
      "border rounded p-3 mb-3";

    const titulo =
      document.createElement("h3");

    titulo.className = "h5";

    titulo.textContent =
      `${pelicula.titulo} (${pelicula.anio})`;

    const reparto =
      document.createElement("p");

    reparto.className =
      "text-secondary mb-0";

    if (pelicula.actores.length === 0) {
      reparto.textContent =
        "Sin actores asignados.";
    } else {
      reparto.textContent =
        pelicula.actores
          .map((actor) => actor.nombre)
          .join(", ");
    }

    articulo.append(titulo, reparto);
    listaPeliculas.append(articulo);
  });
};

/**
 * Renderiza los actores y sus películas.
 */
const renderizarActores = (actores) => {
  listaActores.innerHTML = "";

  if (actores.length === 0) {
    listaActores.textContent =
      "No existen actores registrados.";

    return;
  }

  actores.forEach((actor) => {
    const articulo =
      document.createElement("article");

    articulo.className =
      "border rounded p-3 mb-3";

    const nombre =
      document.createElement("h3");

    nombre.className = "h5";
    nombre.textContent = actor.nombre;

    const fecha =
      document.createElement("p");

    fecha.className = "mb-1";

    fecha.textContent =
      `Nacimiento: ${actor.fecha_nacimiento}`;

    const peliculas =
      document.createElement("p");

    peliculas.className =
      "text-secondary mb-0";

    if (actor.peliculas.length === 0) {
      peliculas.textContent =
        "Sin películas asignadas.";
    } else {
      peliculas.textContent =
        actor.peliculas
          .map((pelicula) => pelicula.titulo)
          .join(", ");
    }

    articulo.append(
      nombre,
      fecha,
      peliculas,
    );

    listaActores.append(articulo);
  });
};

/**
 * Actualiza los selectores de actores.
 */
const actualizarSelectoresActores = (
  actores,
) => {
  selectActoresPelicula.innerHTML = "";
  selectAsignacionActor.innerHTML = "";

  const opcionInicial =
    document.createElement("option");

  opcionInicial.value = "";
  opcionInicial.textContent =
    "Seleccione un actor";

  selectAsignacionActor.append(
    opcionInicial,
  );

  actores.forEach((actor) => {
    const opcionMultiple =
      document.createElement("option");

    opcionMultiple.value = actor.id;
    opcionMultiple.textContent =
      `${actor.id} - ${actor.nombre}`;

    selectActoresPelicula.append(
      opcionMultiple,
    );

    const opcionAsignacion =
      document.createElement("option");

    opcionAsignacion.value = actor.id;
    opcionAsignacion.textContent =
      `${actor.id} - ${actor.nombre}`;

    selectAsignacionActor.append(
      opcionAsignacion,
    );
  });
};

/**
 * Actualiza el selector de películas.
 */
const actualizarSelectorPeliculas = (
  peliculas,
) => {
  selectAsignacionPelicula.innerHTML = "";

  const opcionInicial =
    document.createElement("option");

  opcionInicial.value = "";
  opcionInicial.textContent =
    "Seleccione una película";

  selectAsignacionPelicula.append(
    opcionInicial,
  );

  peliculas.forEach((pelicula) => {
    const opcion =
      document.createElement("option");

    opcion.value = pelicula.id;

    opcion.textContent =
      `${pelicula.id} - ${pelicula.titulo}`;

    selectAsignacionPelicula.append(opcion);
  });
};

/**
 * Consulta GET /peliculas.
 */
const cargarPeliculas = async () => {
  try {
    const datos = await solicitar(
      API.peliculas,
    );

    renderizarPeliculas(datos.peliculas);

    actualizarSelectorPeliculas(
      datos.peliculas,
    );
  } catch (error) {
    mostrarMensaje(error.message, "danger");
  }
};

/**
 * Consulta GET /actores.
 */
const cargarActores = async () => {
  try {
    const datos = await solicitar(
      API.actores,
    );

    renderizarActores(datos.actores);

    actualizarSelectoresActores(
      datos.actores,
    );
  } catch (error) {
    mostrarMensaje(error.message, "danger");
  }
};

/**
 * Recarga todos los datos.
 */
const cargarDatos = async () => {
  await Promise.all([
    cargarPeliculas(),
    cargarActores(),
  ]);
};

/**
 * Envía POST /actores.
 */
formularioActor.addEventListener(
  "submit",
  async (evento) => {
    evento.preventDefault();

    const formulario =
      new FormData(formularioActor);

    const body = {
      nombre: formulario
        .get("nombre")
        .trim(),

      fecha_nacimiento:
        formulario.get(
          "fecha_nacimiento",
        ),
    };

    try {
      const datos = await solicitar(
        API.actores,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(body),
        },
      );

      formularioActor.reset();

      mostrarMensaje(datos.mensaje);

      await cargarActores();
    } catch (error) {
      mostrarMensaje(
        error.message,
        "danger",
      );
    }
  },
);

/**
 * Envía POST /peliculas.
 */
formularioPelicula.addEventListener(
  "submit",
  async (evento) => {
    evento.preventDefault();

    const formulario =
      new FormData(formularioPelicula);

    const opcionesSeleccionadas = [
      ...selectActoresPelicula
        .selectedOptions,
    ];

    const actor_ids =
      opcionesSeleccionadas.map(
        (opcion) =>
          Number(opcion.value),
      );

    const body = {
      titulo: formulario
        .get("titulo")
        .trim(),

      anio: Number(
        formulario.get("anio"),
      ),

      actor_ids,
    };

    try {
      const datos = await solicitar(
        API.peliculas,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(body),
        },
      );

      formularioPelicula.reset();

      mostrarMensaje(datos.mensaje);

      await cargarDatos();
    } catch (error) {
      mostrarMensaje(
        error.message,
        "danger",
      );
    }
  },
);

/**
 * Envía POST /asignar-actor.
 */
formularioAsignacion.addEventListener(
  "submit",
  async (evento) => {
    evento.preventDefault();

    const formulario =
      new FormData(formularioAsignacion);

    const body = {
      pelicula_id: Number(
        formulario.get("pelicula_id"),
      ),

      actor_id: Number(
        formulario.get("actor_id"),
      ),
    };

    try {
      const datos = await solicitar(
        API.asignar,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(body),
        },
      );

      formularioAsignacion.reset();

      mostrarMensaje(datos.mensaje);

      await cargarDatos();
    } catch (error) {
      mostrarMensaje(
        error.message,
        "danger",
      );
    }
  },
);

document
  .getElementById("btn-peliculas")
  .addEventListener(
    "click",
    cargarPeliculas,
  );

document
  .getElementById("btn-actores")
  .addEventListener(
    "click",
    cargarActores,
  );

// Carga inicial de la aplicación.
cargarDatos();