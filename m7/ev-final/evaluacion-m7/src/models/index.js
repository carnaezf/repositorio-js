/*
Un país tiene un registro de PIB
Un registro de PIB pertenece a un país
*/

import Pais from "./Pais.js";
import PaisPib from "./PaisPib.js";
import PaisDataWeb from "./PaisDataWeb.js";

Pais.hasOne(PaisPib, {
  foreignKey: "nombrePais",
  sourceKey: "nombre",
  as: "pib",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

PaisPib.belongsTo(Pais, {
  foreignKey: "nombrePais",
  targetKey: "nombre",
  as: "pais",
});

export {
  Pais,
  PaisPib,
  PaisDataWeb,
};