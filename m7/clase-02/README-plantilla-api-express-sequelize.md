# Plantilla API Express + PostgreSQL + Sequelize

Proyecto base para construir APIs con **Node.js**, **Express**, **PostgreSQL** y **Sequelize**, usando una estructura ordenada por capas.

Este proyecto sirve como plantilla inicial para futuras aplicaciones backend.

---

## Objetivo del proyecto

Implementar una API base que permita:

- Levantar un servidor con Express.
- Usar variables de entorno con `dotenv`.
- Conectar con PostgreSQL mediante Sequelize.
- Separar responsabilidades usando carpetas por capas.
- Probar rutas básicas.
- Verificar conexión a base de datos con un endpoint `/health`.
- Manejar rutas no encontradas.
- Manejar errores globales.

---

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- Sequelize
- dotenv
- cors
- REST Client

---

## Estructura del proyecto

```txt
A-PLANTILLA-API-V1.1/
├── requests/
│   └── rutas.rest
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── health.controller.js
│   ├── middlewares/
│   │   ├── error.middleware.js
│   │   └── unknownEndpoint.js
│   ├── routes/
│   │   ├── health.routes.js
│   │   └── test.routes.js
│   └── services/
│       └── health.service.js
├── .env
├── .gitignore
├── index.js
├── package.json
└── package-lock.json
```

---

## Responsabilidad de cada carpeta

### `index.js`

Archivo principal del proyecto.

Se encarga de:

- Crear la aplicación Express.
- Configurar middlewares base.
- Registrar rutas.
- Registrar middlewares de error.
- Levantar el servidor.

---

### `src/config/`

Contiene archivos de configuración.

Ejemplo:

```txt
db.js
```

Aquí se configura la conexión a PostgreSQL usando Sequelize.

---

### `src/routes/`

Contiene las rutas de la aplicación.

Ejemplo:

```txt
GET /test
GET /health
```

Las rutas definen qué endpoints existen.

---

### `src/controllers/`

Contiene los controladores.

Un controlador recibe la petición, llama a la capa de servicio y devuelve una respuesta al cliente.

---

### `src/services/`

Contiene la lógica interna de la aplicación.

En este proyecto, el service se encarga de verificar la conexión con la base de datos.

---

### `src/middlewares/`

Contiene middlewares personalizados.

En este proyecto tenemos:

```txt
unknownEndpoint.js   → maneja rutas no encontradas
error.middleware.js  → maneja errores globales
```

---

### `requests/`

Contiene archivos para probar la API con la extensión REST Client de Visual Studio Code.

---

## Instalación

Clonar o descargar el proyecto.

Luego instalar dependencias:

```bash
npm install
```

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000

DB_NAME=nombre_base_datos
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
```

Ejemplo:

```env
PORT=3000

DB_NAME=plantilla_api
DB_USER=postgres
DB_PASSWORD=123456
DB_HOST=localhost
DB_PORT=5432
```

---

## Scripts disponibles

En `package.json`:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

---

## Ejecutar en modo desarrollo

```bash
npm run dev
```

El servidor debería iniciar en:

```txt
http://localhost:3000
```

---

## Ejecutar en modo producción

```bash
npm start
```

---

## Endpoints disponibles

### Ruta de prueba

```http
GET /test
```

Respuesta esperada:

```txt
Ruta test funcionando
```

---

### Ruta de salud

```http
GET /health
```

Si la conexión a PostgreSQL funciona correctamente, responde:

```json
{
  "status": "ok",
  "db": "connected",
  "orm": "sequelize"
}
```

---

### Ruta no existente

```http
GET /clientes
```

Respuesta esperada:

```json
{
  "error": "Ruta no encontrada",
  "ruta": "/clientes",
  "metodo": "GET"
}
```

---

## Pruebas con REST Client

Archivo:

```txt
requests/rutas.rest
```

Ejemplo:

```http
@baseUrl = http://localhost:3000

### Ruta test
GET {{baseUrl}}/test

### Ruta health
GET {{baseUrl}}/health

### Ruta inexistente
GET {{baseUrl}}/clientes
```

---

## Flujo de la ruta `/health`

Cuando se ejecuta:

```http
GET /health
```

El flujo interno es:

```txt
1. La petición llega a index.js.
2. Express deriva la petición a health.routes.js.
3. La ruta ejecuta health.controller.js.
4. El controller llama a health.service.js.
5. El service usa sequelize.authenticate().
6. Sequelize intenta conectarse a PostgreSQL.
7. Si todo está correcto, responde status ok.
8. Si ocurre un error, se envía al middleware global de errores.
```

---

## Orden de ejecución importante

En `index.js`, el orden recomendado es:

```js
app.use(cors());
app.use(express.json());

app.use("/test", testRoutes);
app.use("/health", healthRoutes);

app.use(unknownEndpoint);
app.use(errorHandler);
```

Los middlewares de error deben ir al final.

---

## Idea principal de la arquitectura

Este proyecto usa una separación por capas:

```txt
routes      → define las URLs
controllers → recibe la petición y responde
services    → contiene la lógica interna
config      → configura recursos externos como la base de datos
middlewares → maneja errores y rutas no válidas
```

---

## Notas para la clase

Esta plantilla permite practicar buenas prácticas de organización en Express.

La idea central es:

> Un backend no solo debe funcionar; también debe estar ordenado y preparado para crecer.

A partir de esta base se pueden agregar nuevos recursos como:

- usuarios
- productos
- tareas
- videojuegos
- clientes
- pedidos

Siguiendo el mismo patrón:

```txt
routes
controllers
services
models
```
