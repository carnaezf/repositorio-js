/* ============================================================
   MÓDULO 5 - FUNDAMENTOS DE BASES DE DATOS RELACIONALES
   CLASE 1: INTRODUCCIÓN PRÁCTICA A SQL CON POSTGRESQL

   Objetivo de la clase:
   - Comprender qué es una base de datos relacional.
   - Crear una estructura básica usando DDL.
   - Insertar, consultar, actualizar y eliminar datos usando DML.
   - Practicar SELECT, WHERE, ORDER BY, LIMIT, INSERT, UPDATE y DELETE.

   Problema real:
   Una pequeña tienda necesita guardar información de sus clientes
   y productos para luego construir una aplicación web con Node.js.

   Pregunta generadora:
   ¿Dónde guardaríamos los datos de usuarios, productos o pedidos
   si queremos que una aplicación web pueda consultarlos después?

   ============================================================ */


/* ============================================================
   1. LIMPIEZA INICIAL DEL ENTORNO DE PRÁCTICA
   ============================================================ */

/*
   En una clase práctica es común eliminar tablas anteriores
   para poder ejecutar el script desde cero.

   DROP TABLE elimina una tabla completa.
   IF EXISTS evita errores si la tabla aún no existe.

   IMPORTANTE:
   En un ambiente real de producción, nunca se debe borrar
   una tabla sin respaldo o autorización.
*/

DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS clientes;


/* ============================================================
   2. DDL - DATA DEFINITION LANGUAGE
   LENGUAJE DE DEFINICIÓN DE DATOS
   ============================================================ */

/*
   DDL se usa para definir la estructura de la base de datos.

   Algunos comandos DDL comunes:
   - CREATE: crea objetos como tablas.
   - ALTER: modifica la estructura de una tabla.
   - DROP: elimina objetos.
   - TRUNCATE: vacía una tabla.

   En esta primera clase usaremos principalmente CREATE TABLE.
*/


/* ============================================================
   3. CREACIÓN DE TABLA: CLIENTES
   ============================================================ */

/*
   Una tabla representa una entidad del problema.

   En este caso, la entidad es "clientes".

   Cada columna representa una característica del cliente:
   - id
   - nombre
   - email
   - ciudad
   - edad

   SERIAL:
   Genera un número automático incremental.
   Es útil para llaves primarias simples.

   PRIMARY KEY:
   Identifica de forma única cada registro.

   NOT NULL:
   Indica que el campo no puede quedar vacío.

   UNIQUE:
   Evita que se repita un valor, por ejemplo un email.

   CHECK:
   Permite validar una condición.
*/

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    ciudad VARCHAR(80),
    edad INTEGER CHECK (edad >= 0)
);


/* ============================================================
   4. CREACIÓN DE TABLA: PRODUCTOS
   ============================================================ */

/*
   Segunda entidad del problema: productos.

   En una tienda, los productos tienen:
   - nombre
   - categoría
   - precio
   - stock

   NUMERIC(10,2):
   Se usa para valores monetarios.
   Permite hasta 10 dígitos en total y 2 decimales.

   DEFAULT:
   Asigna un valor por defecto si no se envía uno.
*/

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(80) NOT NULL,
    precio NUMERIC(10,2) NOT NULL CHECK (precio >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0)
);


/* ============================================================
   PAUSA PEDAGÓGICA
   ============================================================ */

/*
   Antes de seguir:

   1. ¿Qué diferencia hay entre una tabla y una fila?
   2. ¿Por qué el email debería ser UNIQUE?
   3. ¿Qué error podría ocurrir si permitimos precios negativos?
   4. ¿Qué pasaría si todos los productos tuvieran el mismo id?

   La idea no es memorizar comandos, sino entender qué problema
   resuelve cada restricción.
*/


/* ============================================================
   5. DML - DATA MANIPULATION LANGUAGE
   LENGUAJE DE MANIPULACIÓN DE DATOS
   ============================================================ */

/*
   DML se usa para trabajar con los datos guardados dentro
   de las tablas.

   Algunos comandos DML comunes:
   - INSERT: agrega registros.
   - SELECT: consulta registros.
   - UPDATE: modifica registros existentes.
   - DELETE: elimina registros.

   DDL define la estructura.
   DML manipula la información.
*/


/* ============================================================
   6. INSERT - INGRESAR DATOS
   ============================================================ */

/*
   INSERT INTO permite agregar registros a una tabla.

   Buen hábito:
   Escribir explícitamente las columnas que se van a completar.
*/

INSERT INTO clientes (nombre, email, ciudad, edad)
VALUES
('Ana Pérez', 'ana@correo.com', 'Santiago', 28),
('Luis Soto', 'luis@correo.com', 'Valparaíso', 35),
('María López', 'maria@correo.com', 'Concepción', 22),
('Carlos Díaz', 'carlos@correo.com', 'Santiago', 41),
('Fernanda Rojas', 'fernanda@correo.com', 'La Serena', 30);


INSERT INTO productos (nombre, categoria, precio, stock)
VALUES
('Notebook Lenovo', 'Tecnología', 650000, 8),
('Mouse inalámbrico', 'Tecnología', 12000, 30),
('Silla ergonómica', 'Muebles', 89990, 12),
('Escritorio madera', 'Muebles', 129990, 5),
('Audífonos Bluetooth', 'Tecnología', 39990, 20),
('Lámpara LED', 'Hogar', 15990, 18);


/* ============================================================
   7. SELECT - CONSULTAR DATOS
   ============================================================ */

/*
   SELECT permite recuperar información desde una tabla.

   El asterisco (*) significa:
   "traer todas las columnas".

   En etapas iniciales sirve para explorar datos.
   En proyectos reales es mejor pedir solo las columnas necesarias.
*/

SELECT * FROM clientes;

SELECT * FROM productos;


/* ============================================================
   8. SELECT CON COLUMNAS ESPECÍFICAS
   ============================================================ */

/*
   En una aplicación real, muchas veces no necesitamos todos
   los campos.

   Por ejemplo:
   Para mostrar una lista de clientes, quizás solo necesitamos
   nombre, email y ciudad.
*/

SELECT nombre, email, ciudad
FROM clientes;


/*
   Para mostrar productos en una tienda online, podríamos necesitar:
   nombre, categoría, precio y stock.
*/

SELECT nombre, categoria, precio, stock
FROM productos;


/* ============================================================
   9. WHERE - FILTRAR REGISTROS
   ============================================================ */

/*
   WHERE permite filtrar registros según una condición.

   Problema:
   La tienda quiere saber qué clientes son de Santiago.
*/

SELECT *
FROM clientes
WHERE ciudad = 'Santiago';


/*
   Problema:
   La tienda quiere listar productos de la categoría Tecnología.
*/

SELECT *
FROM productos
WHERE categoria = 'Tecnología';


/*
   Problema:
   La tienda quiere saber qué productos cuestan más de $40.000.
*/

SELECT nombre, precio
FROM productos
WHERE precio > 40000;


/*
   Problema:
   La tienda quiere saber qué productos tienen bajo stock.
*/

SELECT nombre, stock
FROM productos
WHERE stock <= 10;


/* ============================================================
   10. OPERADORES DE COMPARACIÓN
   ============================================================ */

/*
   Algunos operadores frecuentes:

   =     igual
   <>    distinto
   >     mayor que
   <     menor que
   >=    mayor o igual
   <=    menor o igual
*/

SELECT *
FROM clientes
WHERE edad >= 30;

SELECT *
FROM productos
WHERE categoria <> 'Tecnología';


/* ============================================================
   11. AND / OR - COMBINAR CONDICIONES
   ============================================================ */

/*
   AND:
   Todas las condiciones deben cumplirse.

   Problema:
   Buscar productos de Tecnología con precio menor a $50.000.
*/

SELECT *
FROM productos
WHERE categoria = 'Tecnología'
AND precio < 50000;


/*
   OR:
   Basta con que una condición se cumpla.

   Problema:
   Buscar clientes que sean de Santiago o Valparaíso.
*/

SELECT *
FROM clientes
WHERE ciudad = 'Santiago'
OR ciudad = 'Valparaíso';


/* ============================================================
   12. ORDER BY - ORDENAR RESULTADOS
   ============================================================ */

/*
   ORDER BY permite ordenar los resultados.

   ASC:
   Ascendente, de menor a mayor.

   DESC:
   Descendente, de mayor a menor.
*/

SELECT *
FROM productos
ORDER BY precio ASC;


SELECT *
FROM productos
ORDER BY precio DESC;


SELECT *
FROM clientes
ORDER BY nombre ASC;
