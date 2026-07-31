# Cómo reutilizar la plantilla

Esta plantilla entrega una API base funcional con **Express, PostgreSQL y Sequelize**. Al comenzar un proyecto nuevo, siga este orden.

## 1. Configurar la base de datos

Modifique el nombre de la base en `.env`:

```env
DB_NAME=clinica_api
```

## 2. Reemplazar los scripts SQL

Adapte los archivos a las tablas del nuevo proyecto:

```text
database/
├── create_database.sql
└── init.sql
```

## 3. Crear los modelos del dominio

Ejemplo:

```text
src/models/
├── Usuario.js
├── Paciente.js
└── index.js
```

## 4. Definir las asociaciones

Centralice las relaciones en `src/models/index.js`:

```javascript
Usuario.hasOne(Paciente, {
  foreignKey: "usuarioId",
  as: "paciente",
});

Paciente.belongsTo(Usuario, {
  foreignKey: "usuarioId",
  as: "usuario",
});
```

## 5. Crear las capas del recurso

Para cada recurso, implemente:

```text
controller
service
route
```

Ejemplo:

```text
src/
├── controllers/paciente.controller.js
├── services/paciente.service.js
└── routes/paciente.routes.js
```

## 6. Registrar las rutas

Importe y registre la ruta en `index.js`:

```javascript
app.use(
  "/api/v1/pacientes",
  pacienteRoutes
);
```

## 7. Eliminar la prueba técnica

Cuando los modelos reales estén funcionando, puede eliminar:

```text
Tabla pruebas de database/init.sql
src/models/TestModel.js
src/controllers/test.controller.js
src/services/test.service.js
```

También puede conservar `/test` y eliminar solamente la ruta `/test/orm`.

## ¿Por qué existe una tabla de prueba?

La tabla técnica permite comprobar el flujo completo:

```text
Express funciona
        ↓
Los middlewares funcionan
        ↓
Las rutas funcionan
        ↓
Los errores son procesados
        ↓
PostgreSQL responde
        ↓
Sequelize se conecta
        ↓
Un modelo consulta correctamente
```

La comprobación `sequelize.authenticate()` valida solamente la conexión. La tabla `pruebas` también demuestra que un modelo Sequelize puede consultar PostgreSQL correctamente.

Después de esta verificación, reemplace el componente técnico por los modelos y recursos propios del proyecto sin modificar la infraestructura base.
