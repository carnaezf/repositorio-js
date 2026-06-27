

-- CREACION DE TABLAS
-- Tabla clientes
-- Guarda los datos basicos de un cliente

-- DDL
CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    edad INTEGER NOT NULL
);

-- Tabla productos
-- Guardar los productos disponibles en una tienda
CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    precio INTEGER NOT NULL,
    stock INTEGER NOT NULL
);
-- Tabla pedidos
-- Representar una compra realizada por un cliente
CREATE TABLE pedidos (
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INTEGER NOT NULL,
    fecha DATE NOT NULL,
    total INTEGER NOT NULL,

    CONSTRAINT fk_pedidos_clientes
        FOREIGN KEY (id_cliente)
        REFERENCES clientes(id_cliente)
);

-- Tabla detalle_pedidos
-- Representar que productos fueron compprados en cada pedido
CREATE TABLE detalle_pedidos (
    id_detalle SERIAL PRIMARY KEY,
    id_pedido INTEGER NOT NULL,
    id_producto INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,

    CONSTRAINT fk_detalle_pedidos
        FOREIGN KEY (id_pedido)
        REFERENCES pedidos(id_pedido),

    CONSTRAINT fk_detalle_productos
        FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto)
);

-- Insertar clientes
INSERT INTO clientes (nombre, ciudad, edad) VALUES
('Laura Gómez', 'Santiago', 28),
('Carlos Pérez', 'Valparaíso', 35),
('María Torres', 'Concepción', 22),
('Ana Morales', 'Santiago', 31),
('Pedro Sánchez', 'Temuco', 40);

-- Insertar productos
INSERT INTO productos (nombre, categoria, precio, stock) VALUES
('Teclado Mecánico', 'Computación', 45000, 10),
('Mouse Gamer', 'Computación', 25000, 15),
('Monitor 24 pulgadas', 'Computación', 130000, 5),
('Silla Ergonómica', 'Muebles', 95000, 3),
('Audífonos Bluetooth', 'Audio', 30000, 20);

-- Insertar pedidos
INSERT INTO pedidos (id_cliente, fecha, total) VALUES
(1, '2026-06-01', 45000),
(2, '2026-06-02', 25000),
(3, '2026-06-03', 130000),
(4, '2026-06-04', 125000);

-- Insertar detalles de pedidos
INSERT INTO detalle_pedidos (id_pedido, id_producto, cantidad) VALUES
(1, 1, 1), -- Laura compró Teclado Mecánico
(2, 2, 1), -- Carlos compró Mouse Gamer
(3, 3, 1), -- María compró Monitor
(4, 4, 1), -- Ana compró Silla
(4, 5, 1); -- Ana también compró Audífonos


-- DML
-- Operadores de WHERE
-- Que clientes tienen mas de 30 años?

SELECT *
FROM clientes
WHERE edad > 30;


-- Que clientes viven en Stgo?
-- Santiago
SELECT *
FROM clientes
WHERE ciudad = 'Santiago';


-- Que clientes NO viven en Stgo?
SELECT *
FROM clientes
WHERE ciudad NOT LIKE 'Santiago';


SELECT *
FROM clientes
WHERE ciudad <> 'Santiago';


-- COUNT cuenta registros
-- Cuantos clientes existen?

SELECT COUNT(*) FROM clientes;

SELECT COUNT(*) AS total_clientes
FROM clientes;


-- AVG calcula el promedio
-- Cual es el promedio de edad de los clientes?
SELECT AVG(edad) AS promedio_edad
FROM clientes;


-- MAX Obtienen el valor maximo
-- Cual es el producto mas caro
SELECT MAX(precio) AS precio_mas_alto
FROM productos;


-- Subconsultas en SQL


-- SELECT * 
-- FROM productos
-- WHERE precio = 130000;


SELECT * 
FROM productos
WHERE precio = (
    SELECT MAX(precio)
    FROM productos
);


SELECT nombre, precio 
FROM productos
WHERE precio = (
    SELECT MAX(precio)
    FROM productos
);






-- MIN Obtienen el valor minimo
-- Cual es el producto mas baratop
SELECT MIN(precio) AS precio_mas_bajo
FROM productos;

-- SUM suma de valores
-- cual es el total vendido considerando la tabla pedidos



-- ROUND permite redondear valores numericos
-- Vamos aredondear el promedio de edad

SELECT ROUND(AVG(edad), 1) AS promedio_edad_redondeado
FROM clientes;

SELECT ROUND(AVG(edad), 2) AS promedio_edad_redondeado
FROM clientes;

SELECT ROUND(AVG(edad), 3) AS promedio_edad_redondeado
FROM clientes;


-- ORDER BY
-- Clientes ordenados alfabeticamente
SELECT *
FROM clientes
ORDER By nombre ASC;


-- Productos ordenados desde el mas caro al mas barato
SELECT * FROM productos 
ORDER BY precio DESC;

-- INNER JOIN
-- INNER JOIN devuelve las filas que tienen coincidencias en ambas tablas

-- clientes es una tabla
-- pedidos es otra tabla

SELECT * 
FROM clientes c
INNER JOIN pedidos p
ON c.id_cliente = p.id_cliente;




-- Left join
-- Queremos ver a todos lo clientes
-- incluso los que no tienen pedidos

-- Pedro Sanchez aparecera con NULL


SELECT 
    c.nombre,
    c.ciudad,
    p.id_pedido,
    p.fecha,
    p.total
FROM clientes c
LEFT JOIN pedidos p
ON c.id_cliente = p.id_cliente;

-- Forma usando varias tablas en FROM + WHERE + AND

SELECT
    c.nombre AS cliente,
    p.id_pedido,
    p.fecha,
    p.total
FROM clientes c, pedidos p
WHERE c.nombre = 'Laura Gómez'
AND p.id_cliente = c.id_cliente;


-- Forma recomendada usando INNER JOIN

SELECT
    c.nombre AS cliente,
    p.id_pedido,
    p.fecha,
    p.total
FROM clientes c
INNER JOIN pedidos p
ON p.id_cliente = c.id_cliente;


SELECT
    c.nombre AS cliente,
    p.id_pedido,
    p.fecha,
    p.total
FROM clientes c
INNER JOIN pedidos p
ON p.id_cliente = c.id_cliente
WHERE c.nombre = 'Laura Gómez'



