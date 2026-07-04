"use strict";

// importamos el modulo http usando ES modules
// http viene incluido en Node.js no necesitamos instalarlo con npm
import http from "http";

import fs from "fs";

// Creamos un servidor
// esta funcion se ejecuta cada vez que llega una peticion a un servidor
const server = http.createServer((req, res) => {
  // Leemos el archivo fichero.txt
  fs.readFile("fichero.txt", "utf-8", (error, datos) => {
    if (error) {
      res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      res.end("Error al leer el archivo");
      return;
    }

    console.log("Contenido del archivo");
    console.log(datos);

    res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });

    res.end(datos);
  });
});

//  El servidor queda escuchando el puerto 8000

server.listen(8000, () => {
  // mensaje para confirmar en terminal que el servidor esta activo
  console.log("Servidor escuchando en http://localhost:8000");
});
