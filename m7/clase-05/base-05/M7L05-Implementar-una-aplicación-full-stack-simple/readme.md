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
│   │   ├── clientes.controller.js
│   │   └── health.controller.js
│   ├── middlewares/
│   │   ├── error.middleware.js
│   │   └── unknownEndpoint.js
│   ├── models/
│   │   ├── cliente.model.js
│   │   └── producto.model.js
│   ├── routes/
│   │   ├── clientes.routes.js
│   │   ├── health.routes.js
│   │   └── test.routes.js
│   └── services/
│       ├── clientes.service.js
│       └── health.service.js
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
Ruta de Express
   ↓
Controlador
   ↓
Servicio
   ↓
Modelo Sequelize
   ↓
PostgreSQL


## Ejemplo para obtener clientes:
GET /clientes
     ↓
clientes.routes.js
     ↓
clientes.controller.js
     ↓
clientes.service.js
     ↓
Cliente.findAll()
     ↓
PostgreSQL