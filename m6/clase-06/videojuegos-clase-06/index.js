import app from "./app.js"

// Configuración de entorno
const PORT = 3001;

// Levantar nuestro servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
