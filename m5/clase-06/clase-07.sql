-- ============================================================
-- CLASE DE CIERRE - MÓDULO 5: BASES DE DATOS RELACIONALES
-- Base de datos: tienda_bootcamp
-- Objetivo:
-- Crear una base de datos simple, poblarla y validar consultas
-- antes de conectarla con Node.js.
-- ============================================================


-- ============================================================
-- 1. CREAR BASE DE DATOS
-- ============================================================

-- IMPORTANTE:
-- Este comando debe ejecutarse conectado a la base por defecto,
-- normalmente "postgres".
--
-- En psql, si queremos partir desde cero, primero eliminamos
-- la base de datos si ya existe.
--
-- OJO:
-- No podemos eliminar una base de datos si estamos conectados a ella.

DROP DATABASE IF EXISTS tienda_bootcamp;

-- Creamos una nueva base de datos llamada tienda_bootcamp.
-- Esta será nuestra base para practicar SQL y luego conectarla con Node.js.

CREATE DATABASE tienda_bootcamp;


-- ============================================================
-- CONECTARSE A LA BASE DE DATOS CREADA
-- ============================================================

-- En SQL Shell / psql usamos el comando \c para conectarnos
-- a otra base de datos.
--
-- Este NO es SQL estándar, es un comando propio de psql.

\c tienda_bootcamp;


-- ============================================================
-- 2. CREAR TABLAS
-- ============================================================

-- Antes de crear las tablas, eliminamos versiones anteriores
-- si existieran.
--
-- El orden importa:
-- Primero eliminamos las tablas que tienen llaves foráneas,
-- y luego las tablas principales.

DROP TABLE IF EXISTS detalle_pedidos;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS clientes;


-- ============================================================
-- TABLA: clientes
-- ============================================================

-- Esta tabla almacena los clientes registrados.
-- Cada cliente tendrá un identificador único llamado id_cliente.

CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,

    -- RFC funciona como un código único del cliente.
    -- UNIQUE evita que se repita.
    -- NOT NULL obliga a que siempre tenga valor.
    rfc VARCHAR(20) UNIQUE NOT NULL,

    -- Nombre del cliente.
    -- NOT NULL significa que este dato es obligatorio.
    nombre VARCHAR(100) NOT NULL,

    -- Teléfono de contacto.
    -- No lleva NOT NULL, por lo tanto puede quedar vacío.
    telefono VARCHAR(20)
);


-- Documentamos la tabla y sus columnas.
-- COMMENT ON no cambia la estructura ni los datos,
-- solo agrega documentación interna en PostgreSQL.

COMMENT ON TABLE clientes IS
'Contiene la información de los clientes registrados.';

COMMENT ON COLUMN clientes.id_cliente IS
'Identificador único interno del cliente.';

COMMENT ON COLUMN clientes.rfc IS
'Código único del cliente. No debe repetirse.';

COMMENT ON COLUMN clientes.nombre IS
'Nombre del cliente.';

COMMENT ON COLUMN clientes.telefono IS
'Teléfono de contacto del cliente. Puede quedar vacío.';


-- ============================================================
-- TABLA: productos
-- ============================================================

-- Esta tabla almacena los productos disponibles en la tienda.

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,

    -- Código interno o SKU del producto.
    -- Debe ser único para evitar productos duplicados.
    codigo VARCHAR(30) UNIQUE NOT NULL,

    -- Nombre visible del producto.
    nombre VARCHAR(100) NOT NULL,

    -- Precio del producto.
    -- NUMERIC(10,2) permite guardar valores monetarios con 2 decimales.
    -- CHECK evita precios negativos.
    precio NUMERIC(10, 2) NOT NULL CHECK (precio >= 0)
);

COMMENT ON TABLE productos IS
'Contiene los productos disponibles para la venta.';

COMMENT ON COLUMN productos.id_producto IS
'Identificador único interno del producto.';

COMMENT ON COLUMN productos.codigo IS
'Código único o SKU del producto.';

COMMENT ON COLUMN productos.nombre IS
'Nombre comercial del producto.';

COMMENT ON COLUMN productos.precio IS
'Precio actual del producto. No puede ser negativo.';


-- ============================================================
-- TABLA: pedidos
-- ============================================================

-- Esta tabla representa la cabecera de un pedido.
-- Es decir, guarda la información general del pedido:
-- quién lo hizo, cuándo, estado y total.

CREATE TABLE pedidos (
    id_pedido SERIAL PRIMARY KEY,

    -- id_cliente conecta cada pedido con un cliente existente.
    -- NOT NULL indica que no puede existir un pedido sin cliente.
    id_cliente INTEGER NOT NULL,

    -- Si no indicamos fecha, PostgreSQL usará la fecha actual.
    fecha DATE DEFAULT CURRENT_DATE,

    -- Si no indicamos estado, el pedido queda como pendiente.
    estado VARCHAR(30) DEFAULT 'pendiente',

    -- El total parte en 0 y no puede ser negativo.
    total NUMERIC(10, 2) DEFAULT 0 CHECK (total >= 0),

    -- Aquí definimos la llave foránea.
    -- Esto protege la integridad referencial:
    -- no se puede crear un pedido para un cliente inexistente.
    CONSTRAINT fk_pedidos_clientes
        FOREIGN KEY (id_cliente)
        REFERENCES clientes (id_cliente)
);

COMMENT ON TABLE pedidos IS
'Contiene la cabecera de los pedidos realizados por clientes.';

COMMENT ON COLUMN pedidos.id_pedido IS
'Identificador único del pedido.';

COMMENT ON COLUMN pedidos.id_cliente IS
'Cliente que realizó el pedido. Es una llave foránea hacia clientes.';

COMMENT ON COLUMN pedidos.fecha IS
'Fecha en que se registró el pedido.';

COMMENT ON COLUMN pedidos.estado IS
'Estado actual del pedido, por ejemplo pendiente, pagado o cancelado.';

COMMENT ON COLUMN pedidos.total IS
'Monto total del pedido. No puede ser negativo.';


-- ============================================================
-- TABLA: detalle_pedidos
-- ============================================================

-- Esta tabla representa los productos incluidos en cada pedido.
--
-- ¿Por qué existe?
-- Porque un pedido puede tener muchos productos,
-- y un producto puede aparecer en muchos pedidos.
--
-- detalle_pedidos funciona como tabla intermedia
-- entre pedidos y productos.

CREATE TABLE detalle_pedidos (
    id_detalle SERIAL PRIMARY KEY,

    -- Relaciona este detalle con un pedido existente.
    id_pedido INTEGER NOT NULL,

    -- Relaciona este detalle con un producto existente.
    id_producto INTEGER NOT NULL,

    -- Cantidad comprada de ese producto.
    -- Debe ser mayor a cero.
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),

    -- Guardamos el precio del producto en el momento del pedido.
    -- Esto es útil porque el precio del producto podría cambiar después.
    precio_unitario NUMERIC(10, 2) NOT NULL CHECK (precio_unitario >= 0),

    CONSTRAINT fk_detalle_pedidos_pedidos
        FOREIGN KEY (id_pedido)
        REFERENCES pedidos (id_pedido),

    CONSTRAINT fk_detalle_pedidos_productos
        FOREIGN KEY (id_producto)
        REFERENCES productos (id_producto)
);

COMMENT ON TABLE detalle_pedidos IS
'Contiene los productos específicos incluidos en cada pedido.';

COMMENT ON COLUMN detalle_pedidos.id_detalle IS
'Identificador único de cada línea de detalle.';

COMMENT ON COLUMN detalle_pedidos.id_pedido IS
'Pedido al que pertenece esta línea de detalle.';

COMMENT ON COLUMN detalle_pedidos.id_producto IS
'Producto incluido en el pedido.';

COMMENT ON COLUMN detalle_pedidos.cantidad IS
'Cantidad comprada del producto. Debe ser mayor a cero.';

COMMENT ON COLUMN detalle_pedidos.precio_unitario IS
'Precio del producto al momento de registrar el pedido.';


-- ============================================================
-- 3. POBLAR LA BASE DE DATOS
-- ============================================================

-- Insertamos algunos clientes.
-- Son pocos datos para que el modelo sea fácil de leer en clase.

INSERT INTO clientes (rfc, nombre, telefono)
VALUES
('CLI001', 'Ana Pérez', '999111222'),
('CLI002', 'Carlos Soto', '988222333'),
('CLI003', 'María González', NULL);


-- Insertamos algunos productos.
-- Usamos precios simples para facilitar los cálculos.

INSERT INTO productos (codigo, nombre, precio)
VALUES
('PROD001', 'Mouse inalámbrico', 12000),
('PROD002', 'Teclado mecánico', 35000),
('PROD003', 'Monitor 24 pulgadas', 120000),
('PROD004', 'Audífonos USB', 25000);


-- Insertamos pedidos.
-- Cada pedido debe apuntar a un cliente existente.
--
-- Ana Pérez tiene id_cliente 1.
-- Carlos Soto tiene id_cliente 2.
-- María González tiene id_cliente 3.
--
-- Si intentáramos usar id_cliente 999, PostgreSQL lo rechazaría
-- por la llave foránea fk_pedidos_clientes.

INSERT INTO pedidos (id_cliente, estado, total)
VALUES
(1, 'pagado', 47000),
(2, 'pendiente', 120000),
(3, 'pagado', 72000);


-- Insertamos el detalle de los pedidos.
--
-- Aquí indicamos qué productos incluye cada pedido.
--
-- Pedido 1:
-- Ana compró 1 mouse y 1 teclado.
--
-- Pedido 2:
-- Carlos compró 1 monitor.
--
-- Pedido 3:
-- María compró 2 audífonos y 1 mouse.

INSERT INTO detalle_pedidos (id_pedido, id_producto, cantidad, precio_unitario)
VALUES
(1, 1, 1, 12000),
(1, 2, 1, 35000),
(2, 3, 1, 120000),
(3, 4, 2, 25000),
(3, 1, 1, 12000);


-- ============================================================
-- 4. CONSULTAS DE PRUEBA DESDE SQL SHELL / psql
-- ============================================================

-- Consulta 1:
-- Ver todos los clientes registrados.

SELECT * FROM clientes;


-- Consulta 2:
-- Ver todos los productos disponibles.

SELECT * FROM productos;


-- Consulta 3:
-- Ver todos los pedidos registrados.

SELECT * FROM pedidos;


-- Consulta 4:
-- Ver el detalle de cada pedido.

SELECT * FROM detalle_pedidos;


-- ============================================================
-- CONSULTA CON JOIN
-- ============================================================

-- Esta consulta es la más importante de la clase.
--
-- Nos permite ver cómo las tablas trabajan juntas.
--
-- Aquí usamos:
-- clientes
-- pedidos
-- detalle_pedidos
-- productos
--
-- Conceptos aplicados:
-- - PRIMARY KEY
-- - FOREIGN KEY
-- - JOIN
-- - relaciones 1:N
-- - modelo relacional funcionando

SELECT 
    pedidos.id_pedido,
    clientes.nombre AS cliente,
    productos.nombre AS producto,
    detalle_pedidos.cantidad,
    detalle_pedidos.precio_unitario,
    detalle_pedidos.cantidad * detalle_pedidos.precio_unitario AS subtotal,
    pedidos.estado,
    pedidos.fecha
FROM pedidos
JOIN clientes 
    ON pedidos.id_cliente = clientes.id_cliente
JOIN detalle_pedidos 
    ON pedidos.id_pedido = detalle_pedidos.id_pedido
JOIN productos 
    ON detalle_pedidos.id_producto = productos.id_producto
ORDER BY pedidos.id_pedido;


-- ============================================================
-- CONSULTA EXTRA: TOTAL POR PEDIDO
-- ============================================================

-- Esta consulta agrupa los productos por pedido
-- y calcula el total usando SUM.
--
-- Sirve para conectar JOIN + GROUP BY + funciones de agregación.

SELECT
    pedidos.id_pedido,
    clientes.nombre AS cliente,
    SUM(detalle_pedidos.cantidad * detalle_pedidos.precio_unitario) AS total_calculado
FROM pedidos
JOIN clientes
    ON pedidos.id_cliente = clientes.id_cliente
JOIN detalle_pedidos
    ON pedidos.id_pedido = detalle_pedidos.id_pedido
GROUP BY pedidos.id_pedido, clientes.nombre
ORDER BY pedidos.id_pedido;


-- ============================================================
-- CONSULTA EXTRA: DICCIONARIO DE DATOS SIMPLE
-- ============================================================

-- PostgreSQL guarda información interna sobre nuestras tablas.
-- Podemos consultar esa información para generar un diccionario
-- de datos básico.

SELECT
    c.table_name AS tabla,
    c.column_name AS campo,
    c.data_type AS tipo_dato,
    c.character_maximum_length AS largo,
    c.is_nullable AS acepta_null,
    c.column_default AS valor_por_defecto,
    pgd.description AS comentario
FROM information_schema.columns c
LEFT JOIN pg_catalog.pg_statio_all_tables st
    ON c.table_schema = st.schemaname
    AND c.table_name = st.relname
LEFT JOIN pg_catalog.pg_description pgd
    ON pgd.objoid = st.relid
    AND pgd.objsubid = c.ordinal_position
WHERE c.table_schema = 'public'
ORDER BY c.table_name, c.ordinal_position;


-- ============================================================
-- CIERRE PEDAGÓGICO
-- ============================================================

-- Hasta aquí tenemos:
--
-- 1. Una base de datos creada.
-- 2. Cuatro tablas relacionadas.
-- 3. Datos insertados.
-- 4. Consultas simples.
-- 5. Una consulta JOIN que une el modelo completo.
--
-- Próximo paso:
-- conectar esta base de datos desde Node.js usando JavaScript.
-- ============================================================