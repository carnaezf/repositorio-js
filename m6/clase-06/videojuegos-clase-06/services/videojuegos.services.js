import fs from "fs";

const ruta = "./data/videojuegos.json";

export const obtenerVideoJuegos = () => {
  const data = fs.readFileSync(ruta, "utf-8");
  return JSON.parse(data);
};
