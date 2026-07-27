

A-PLANTILLA-API-V1.1/
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   └── index.html
├── requests/
│   └── rutas.rest
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── actores.controller.js
│   │   ├── asignaciones.controller.js
│   │   ├── health.controller.js
│   │   └── peliculas.controller.js
│   ├── middlewares/
│   │   ├── error.middleware.js
│   │   └── unknownEndpoint.js
│   ├── models/
│   │   ├── actor.model.js
│   │   ├── index.js
│   │   ├── pelicula.model.js
│   │   ├── peliculasActores.model.js
│   │   └── producto.model.js
│   ├── routes/
│   │   ├── actores.routes.js
│   │   ├── asignaciones.routes.js
│   │   ├── health.routes.js
│   │   ├── peliculas.routes.js
│   │   └── test.routes.js
│   ├── services/
│   │   ├── actores.service.js
│   │   ├── asignaciones.service.js
│   │   ├── health.service.js
│   │   └── peliculas.service.js
│   └── utils/
│       └── AppError.js
├── .env
├── .env.example
├── .gitignore
├── index.js
├── init.sql
├── package.json
└── package-lock.json

## Flujo de la aplicación

Frontend
   ↓ fetch()
Rutas Express
   ↓
Controladores
   ↓
Servicios
   ↓
Modelos Sequelize
   ↓
PostgreSQL

## Por ejemplo:

POST /asignar-actor
        ↓
asignaciones.routes.js
        ↓
asignaciones.controller.js
        ↓
asignaciones.service.js
        ↓
sequelize.transaction()
        ↓
peliculas_actores

