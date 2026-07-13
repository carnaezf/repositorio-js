import fs from "fs";

const ruta = "./data/videojuegos.json";

export const obtenerVideoJuegos = () => {
  const data = fs.readFileSync(ruta, "utf-8");
  return JSON.parse(data);
};

export const obtenerVideoJuegoPorID = (id) => {
  const videojuegos = obtenerVideoJuegos();
  return videojuegos.find((juego) => juego.id === id);
};

// DELETE por ID:
export const eliminarVideoJuegoPorId = (id) => {
  const videojuegos = obtenerVideoJuegos();

  const juegoAEliminar = videojuegos.find((juego) => juego.id === id);

  if (!juegoAEliminar) {
    return null;
  }

  const videojuegosActualizados = videojuegos.filter(
    (juego) => juego.id !== id,
  );

  fs.writeFileSync(ruta, JSON.stringify(videojuegosActualizados, null, 2));

  return juegoAEliminar;
};

// POST Videojuego
export const crearVideoJuego = (nuevoJuego) => {
  const videojuegos = obtenerVideoJuegos();

  // Generar nuevo ID automatico
  const nuevoId =
    videojuegos.length > 0 ? Math.max(...videojuegos.map((j) => j.id)) + 1 : 1;

  const juegoConId = {
    id: nuevoId,
    ...nuevoJuego,
  };

  videojuegos.push(juegoConId);

  fs.writeFileSync(ruta, JSON.stringify(videojuegos, null, 2));

  return juegoConId;
};
