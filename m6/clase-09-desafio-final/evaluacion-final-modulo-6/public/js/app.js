const API_URL = "http://localhost:3000/mascotas";

const listaMascotas = document.querySelector("#listaMascotas");
const mensaje = document.querySelector("#mensaje");

const formMascota = document.querySelector("#formMascota");
const inputNombre = document.querySelector("#nombre");
const inputRut = document.querySelector("#rut");

const btnCargar = document.querySelector("#btnCargar");
const btnBuscarRut = document.querySelector("#btnBuscarRut");
const inputRutBusqueda = document.querySelector("#rutBusqueda");

const mostrarMensaje = (texto, tipo = "success") => {
  mensaje.innerHTML = `
    <div class="alert alert-${tipo}">
      ${texto}
    </div>
  `;
};

const renderMascotas = (mascotas) => {
  listaMascotas.innerHTML = "";

  if (mascotas.length === 0) {
    listaMascotas.innerHTML = `
      <li class="list-group-item">No hay mascotas registradas</li>
    `;
    return;
  }

  mascotas.forEach((mascota) => {
    const li = document.createElement("li");

    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <span>
        <strong>${mascota.nombre}</strong> - Dueño: ${mascota.rut}
      </span>

      <button class="btn btn-sm btn-danger" data-nombre="${mascota.nombre}">
        Eliminar
      </button>
    `;

    listaMascotas.appendChild(li);
  });
};

const cargarMascotas = async () => {
  try {
    const response = await axios.get(API_URL);

    renderMascotas(response.data.data);
    mostrarMensaje("Mascotas cargadas correctamente");
  } catch (error) {
    mostrarMensaje("Error al cargar mascotas", "danger");
    console.error(error);
  }
};

const registrarMascota = async (event) => {
  event.preventDefault();

  const nombre = inputNombre.value.trim();
  const rut = inputRut.value.trim();

  if (!nombre || !rut) {
    mostrarMensaje("Debe ingresar nombre y RUT", "warning");
    return;
  }

  try {
    await axios.post(API_URL, {
      nombre,
      rut,
    });

    inputNombre.value = "";
    inputRut.value = "";

    mostrarMensaje("Mascota registrada correctamente");
    cargarMascotas();
  } catch (error) {
    mostrarMensaje("Error al registrar mascota", "danger");
    console.error(error);
  }
};

const buscarPorRut = async () => {
  const rut = inputRutBusqueda.value.trim();

  if (!rut) {
    mostrarMensaje("Debe ingresar un RUT para buscar", "warning");
    return;
  }

  try {
    const response = await axios.get(`${API_URL}/rut/${rut}`);

    renderMascotas(response.data.data);
    mostrarMensaje(`Mascotas encontradas para el RUT ${rut}`);
  } catch (error) {
    renderMascotas([]);
    mostrarMensaje("No se encontraron mascotas para ese RUT", "warning");
    console.error(error);
  }
};

const eliminarPorNombre = async (nombre) => {
  try {
    await axios.delete(`${API_URL}/nombre/${nombre}`);

    mostrarMensaje(`Mascota ${nombre} eliminada correctamente`);
    cargarMascotas();
  } catch (error) {
    mostrarMensaje("Error al eliminar mascota", "danger");
    console.error(error);
  }
};

btnCargar.addEventListener("click", cargarMascotas);
formMascota.addEventListener("submit", registrarMascota);
btnBuscarRut.addEventListener("click", buscarPorRut);

listaMascotas.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const nombre = event.target.dataset.nombre;
    eliminarPorNombre(nombre);
  }
});

cargarMascotas();