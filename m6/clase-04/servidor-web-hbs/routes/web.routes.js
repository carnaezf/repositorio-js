import express from "express";

const router = express.Router();

// Datos simulados.
// Por ahora no usamos base de datos, solo datos en memoria.
const productos = [
  { id: 1, nombre: "Notebook", precio: 750000, importante: true },
  { id: 2, nombre: "Mouse", precio: 12000, importante: false },
  { id: 3, nombre: "Teclado", precio: 25000, importante: true },
];

// Ruta principal.
// Renderiza una vista llamada home.handlebars.
router.get("/", (req, res) => {
  res.render("home", {
    titulo: "Aplicación con Express y Handlebars",
    nombre: "César",
    mensaje: "Contenido enviado desde Node hacia una vista dinámica",
  });
});

// Ruta con parámetro.
// Ejemplo: /usuario/Ana
router.get("/usuario/:nombre", (req, res) => {
  const nombre = req.params.nombre;

  res.render("usuario", {
    titulo: "Página de usuario",
    nombre,
  });
});

// Ruta para mostrar productos.
router.get("/productos", (req, res) => {
  res.render("productos", {
    titulo: "Listado de productos",
    productos,
  });
});

// Ruta API simple para probar con REST Client.
router.get("/api/productos", (req, res) => {
  res.json(productos);
});

export default router;