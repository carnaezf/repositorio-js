import fs from "fs";
import path from "path";

const rutaMascotas = path.resolve("src/data/mascotas.json");

export const obtenerMascotas = () => {
  const data = fs.readFileSync(rutaMascotas, "utf-8");
  return JSON.parse(data);
};

export const guardarMascotas = (mascotas) => {
  fs.writeFileSync(rutaMascotas, JSON.stringify(mascotas, null, 2));
};

export const obtenerMascotaPorNombre = (nombre) => {
  const mascotas = obtenerMascotas();

  return mascotas.find(
    (mascota) => mascota.nombre.toLowerCase() === nombre.toLowerCase()
  );
};

export const obtenerMascotasPorRut = (rut) => {
  const mascotas = obtenerMascotas();

  return mascotas.filter((mascota) => mascota.rut === rut);
};

export const crearMascota = (nuevaMascota) => {
  const mascotas = obtenerMascotas();

  mascotas.push(nuevaMascota);

  guardarMascotas(mascotas);

  return nuevaMascota;
};

export const eliminarMascotaPorNombre = (nombre) => {
  const mascotas = obtenerMascotas();

  const mascotaEliminada = mascotas.find(
    (mascota) => mascota.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (!mascotaEliminada) {
    return null;
  }

  const mascotasActualizadas = mascotas.filter(
    (mascota) => mascota.nombre.toLowerCase() !== nombre.toLowerCase()
  );

  guardarMascotas(mascotasActualizadas);

  return mascotaEliminada;
};

export const eliminarMascotasPorRut = (rut) => {
  const mascotas = obtenerMascotas();

  const mascotasAsociadas = mascotas.filter((mascota) => mascota.rut === rut);

  if (mascotasAsociadas.length === 0) {
    return null;
  }

  const mascotasActualizadas = mascotas.filter((mascota) => mascota.rut !== rut);

  guardarMascotas(mascotasActualizadas);

  return mascotasAsociadas;
};