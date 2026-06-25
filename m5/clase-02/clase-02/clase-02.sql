/* ============================================================
   CLASE SQL - FUNCIONES, WHERE, JOIN Y CONSULTAS ANIDADAS
   Desarrollo de Aplicaciones Full Stack JavaScript
   ============================================================ */

/*
   Objetivo de la clase:

   Practicar consultas SQL usando:
   - Funciones SQL
   - Operadores en WHERE
   - INNER JOIN
   - LEFT JOIN
   - Consultas anidadas

   Contexto del problema:

   Una tienda necesita consultar información de sus clientes,
   productos y pedidos para responder preguntas reales del negocio.
*/



/* ============================================================
   1. CREAR BBDD
   ============================================================ */
CREATE DATABASE nueva_bbdd;

\c nueva_bbdd;


/* ============================================================
   2. CREACIÓN DE TABLAS
   ============================================================ */

/*
   Tabla clientes:
   Guarda los datos básicos de cada cliente.
*/

CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ciudad VARCHAR(50) NOT NULL,
    edad INTEGER NOT NULL
);


/*
   Tabla productos:
   Guarda los productos disponibles en la tienda.
*/

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    precio INTEGER NOT NULL,
    stock INTEGER NOT NULL
);


/*
   Tabla pedidos:
   Representa una compra realizada por un cliente.
*/

CREATE TABLE pedidos (
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INTEGER NOT NULL,
    fecha DATE NOT NULL,
    total INTEGER NOT NULL,

    CONSTRAINT fk_pedidos_clientes
        FOREIGN KEY (id_cliente)
        REFERENCES clientes(id_cliente)
);


/*
   Tabla detalle_pedidos:
   Representa qué productos fueron comprados en cada pedido.
*/

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



/* ============================================================
   3. INSERCIÓN DE DATOS
   ============================================================ */

/*
   Insertamos clientes.

   Pedro Sánchez quedará sin pedidos para demostrar LEFT JOIN.
*/

INSERT INTO clientes (nombre, ciudad, edad) VALUES
('Laura Gómez', 'Santiago', 28),
('Carlos Pérez', 'Valparaíso', 35),
('María Torres', 'Concepción', 22),
('Ana Morales', 'Santiago', 31),
('Pedro Sánchez', 'Temuco', 40);


/*
   Insertamos productos.
*/

INSERT INTO productos (nombre, categoria, precio, stock) VALUES
('Teclado Mecánico', 'Computación', 45000, 10),
('Mouse Gamer', 'Computación', 25000, 15),
('Monitor 24 pulgadas', 'Computación', 130000, 5),
('Silla Ergonómica', 'Muebles', 95000, 3),
('Audífonos Bluetooth', 'Audio', 30000, 20);


/*
   Insertamos pedidos.

   Notar que solo algunos clientes tienen pedidos.
*/

INSERT INTO pedidos (id_cliente, fecha, total) VALUES
(1, '2026-06-01', 45000),
(2, '2026-06-02', 25000),
(3, '2026-06-03', 130000),
(4, '2026-06-04', 125000);


/*
   Insertamos detalle de pedidos.
*/

INSERT INTO detalle_pedidos (id_pedido, id_producto, cantidad) VALUES
(1, 1, 1), -- Laura compró Teclado Mecánico
(2, 2, 1), -- Carlos compró Mouse Gamer
(3, 3, 1), -- María compró Monitor
(4, 4, 1), -- Ana compró Silla
(4, 5, 1); -- Ana también compró Audífonos



/* ============================================================
   4. CONSULTAS BÁSICAS
   ============================================================ */

/*
   Ver todos los clientes.
*/

SELECT *
FROM clientes;


/*
   Ver todos los productos.
*/

SELECT *
FROM productos;


/*
   Ver todos los pedidos.
*/

SELECT *
FROM pedidos;



/* ============================================================
   5. MÁS OPERADORES DE WHERE
   ============================================================ */

/*
   WHERE permite filtrar registros.

   Pregunta:
   ¿Qué clientes tienen más de 30 años?
*/

SELECT *
FROM clientes
WHERE edad > 30;


/*
   Clientes que viven en Santiago.
*/

SELECT *
FROM clientes
WHERE ciudad = 'Santiago';


/*
   Clientes que NO viven en Santiago.
*/

SELECT *
FROM clientes
WHERE ciudad <> 'Santiago';


/*
   Productos con precio mayor o igual a 30000.
*/

SELECT *
FROM productos
WHERE precio >= 30000;


/*
   Productos con precio entre 25000 y 100000.
*/

SELECT *
FROM productos
WHERE precio BETWEEN 25000 AND 100000;


/*
   Productos de ciertas categorías usando IN.

   IN permite comparar contra varias opciones.
*/

SELECT *
FROM productos
WHERE categoria IN ('Computación', 'Audio');


/*
   Buscar productos cuyo nombre contiene la palabra 'Gamer'.

   LIKE permite buscar patrones de texto.
   El símbolo % significa "cualquier texto antes o después".
*/

SELECT *
FROM productos
WHERE nombre LIKE '%Gamer%';


/*
   Clientes cuyo nombre comienza con la letra A.
*/

SELECT *
FROM clientes
WHERE nombre LIKE 'A%';


/*
   Combinar condiciones con AND.

   Productos de computación con precio mayor a 30000.
*/

SELECT *
FROM productos
WHERE categoria = 'Computación'
AND precio > 30000;


/*
   Combinar condiciones con OR.

   Clientes que viven en Santiago o Temuco.
*/

SELECT *
FROM clientes
WHERE ciudad = 'Santiago'
OR ciudad = 'Temuco';



/* ============================================================
   6. FUNCIONES SQL
   ============================================================ */

/*
   COUNT cuenta registros.

   Pregunta:
   ¿Cuántos clientes existen?
*/

SELECT COUNT(*) AS total_clientes
FROM clientes;


/*
   AVG calcula promedio.

   Pregunta:
   ¿Cuál es el promedio de edad de los clientes?
*/

SELECT AVG(edad) AS promedio_edad
FROM clientes;


/*
   MAX obtiene el valor máximo.

   Pregunta:
   ¿Cuál es el producto más caro?
*/

SELECT MAX(precio) AS precio_mas_alto
FROM productos;


/*
   MIN obtiene el valor mínimo.

   Pregunta:
   ¿Cuál es el producto más barato?
*/

SELECT MIN(precio) AS precio_mas_bajo
FROM productos;


/*
   SUM suma valores.

   Pregunta:
   ¿Cuál es el total vendido considerando la tabla pedidos?
*/

SELECT SUM(total) AS total_vendido
FROM pedidos;


/*
   UPPER convierte texto a mayúsculas.
*/

SELECT nombre, UPPER(nombre) AS nombre_mayuscula
FROM clientes;


/*
   LOWER convierte texto a minúsculas.
*/

SELECT nombre, LOWER(nombre) AS nombre_minuscula
FROM clientes;


/*
   LENGTH cuenta la cantidad de caracteres.
*/

SELECT nombre, LENGTH(nombre) AS cantidad_caracteres
FROM clientes;


/*
   ROUND permite redondear valores numéricos.

   En este caso redondeamos el promedio de edad.
*/

SELECT ROUND(AVG(edad), 2) AS promedio_edad_redondeado
FROM clientes;



/* ============================================================
   7. ORDER BY
   ============================================================ */

/*
   ORDER BY permite ordenar resultados.

   Clientes ordenados alfabéticamente.
*/

SELECT *
FROM clientes
ORDER BY nombre ASC;


/*
   Productos ordenados desde el más caro al más barato.
*/

SELECT *
FROM productos
ORDER BY precio DESC;



/* ============================================================
   8. INNER JOIN
   ============================================================ */

/*
   INNER JOIN devuelve solo las filas que tienen coincidencia
   en ambas tablas.

   En este caso:
   - clientes es una tabla;
   - pedidos es otra tabla;
   - se conectan mediante id_cliente.

   Resultado esperado:
   Muestra solo clientes que tienen pedidos.
   Pedro Sánchez no aparece porque no tiene pedidos.
*/

SELECT
    clientes.nombre AS cliente,
    clientes.ciudad,
    pedidos.id_pedido,
    pedidos.fecha,
    pedidos.total
FROM clientes
INNER JOIN pedidos
ON clientes.id_cliente = pedidos.id_cliente;


/*
   Misma consulta usando alias para escribir menos.

   c representa clientes.
   p representa pedidos.
*/

SELECT
    c.nombre AS cliente,
    c.ciudad,
    p.id_pedido,
    p.fecha,
    p.total
FROM clientes c
INNER JOIN pedidos p
ON c.id_cliente = p.id_cliente;



/* ============================================================
   9. LEFT JOIN
   ============================================================ */

/*
   LEFT JOIN devuelve todos los registros de la tabla izquierda,
   aunque no tengan coincidencia en la tabla derecha.

   En este caso:
   - queremos ver todos los clientes;
   - incluso los que no tienen pedidos.

   Pedro Sánchez aparecerá con NULL en los campos del pedido.
*/

SELECT
    c.nombre AS cliente,
    c.ciudad,
    p.id_pedido,
    p.fecha,
    p.total
FROM clientes c
LEFT JOIN pedidos p
ON c.id_cliente = p.id_cliente;


/*
   Pregunta de negocio:
   ¿Qué clientes NO han realizado pedidos?

   Usamos LEFT JOIN y filtramos donde el pedido sea NULL.
*/

SELECT
    c.nombre AS cliente_sin_pedidos,
    c.ciudad
FROM clientes c
LEFT JOIN pedidos p
ON c.id_cliente = p.id_cliente
WHERE p.id_pedido IS NULL;



/* ============================================================
   10. JOIN ENTRE VARIAS TABLAS
   ============================================================ */

/*
   Ahora queremos saber:

   ¿Qué cliente compró qué producto?

   Para eso necesitamos unir:
   - clientes
   - pedidos
   - detalle_pedidos
   - productos
*/

SELECT
    c.nombre AS cliente,
    p.fecha,
    pr.nombre AS producto,
    pr.categoria,
    dp.cantidad,
    pr.precio
FROM clientes c
INNER JOIN pedidos p
ON c.id_cliente = p.id_cliente
INNER JOIN detalle_pedidos dp
ON p.id_pedido = dp.id_pedido
INNER JOIN productos pr
ON dp.id_producto = pr.id_producto;


/*
   Esta consulta muestra una visión más completa del negocio:
   cliente, fecha de compra, producto, categoría, cantidad y precio.
*/



/* ============================================================
   11. CONSULTA ANIDADA EN WHERE
   ============================================================ */

/*
   Una consulta anidada es una consulta dentro de otra consulta.

   La consulta interna obtiene un dato.
   La consulta externa usa ese dato para filtrar.

   Pregunta:
   ¿Qué productos compró Laura Gómez?
*/

SELECT pr.nombre AS producto_comprado
FROM productos pr
WHERE pr.id_producto IN (
    SELECT dp.id_producto
    FROM detalle_pedidos dp
    WHERE dp.id_pedido IN (
        SELECT p.id_pedido
        FROM pedidos p
        WHERE p.id_cliente = (
            SELECT c.id_cliente
            FROM clientes c
            WHERE c.nombre = 'Laura Gómez'
        )
    )
);


/*
   Resultado esperado:
   Teclado Mecánico

   Lectura paso a paso:

   1. Buscamos el id_cliente de Laura Gómez.
   2. Con ese id_cliente buscamos sus pedidos.
   3. Con esos pedidos buscamos los productos comprados.
   4. Finalmente mostramos el nombre del producto.
*/



/* ============================================================
   12. MISMA CONSULTA, PERO CON JOIN
   ============================================================ */

/*
   Esta versión hace lo mismo que la consulta anidada,
   pero usando JOIN.

   En la práctica profesional, muchas veces JOIN será más legible.
*/

SELECT
    c.nombre AS cliente,
    pr.nombre AS producto
FROM clientes c
INNER JOIN pedidos p
ON c.id_cliente = p.id_cliente
INNER JOIN detalle_pedidos dp
ON p.id_pedido = dp.id_pedido
INNER JOIN productos pr
ON dp.id_producto = pr.id_producto
WHERE c.nombre = 'Laura Gómez';



/* ============================================================
   13. GROUP BY
   ============================================================ */

/*
   GROUP BY permite agrupar resultados.

   Pregunta:
   ¿Cuántos pedidos tiene cada cliente?
*/

SELECT
    c.nombre AS cliente,
    COUNT(p.id_pedido) AS cantidad_pedidos
FROM clientes c
LEFT JOIN pedidos p
ON c.id_cliente = p.id_cliente
GROUP BY c.nombre
ORDER BY cantidad_pedidos DESC;


/*
   Pregunta:
   ¿Cuánto ha gastado cada cliente?
*/

SELECT
    c.nombre AS cliente,
    COALESCE(SUM(p.total), 0) AS total_gastado
FROM clientes c
LEFT JOIN pedidos p
ON c.id_cliente = p.id_cliente
GROUP BY c.nombre
ORDER BY total_gastado DESC;


/*
   COALESCE reemplaza NULL por otro valor.

   Si un cliente no tiene pedidos,
   SUM(p.total) devuelve NULL.

   Con COALESCE lo convertimos en 0.
*/



/* ============================================================
   14. HAVING
   ============================================================ */

/*
   WHERE filtra filas antes de agrupar.
   HAVING filtra resultados después de agrupar.

   Pregunta:
   ¿Qué clientes han gastado más de 50000?
*/

SELECT
    c.nombre AS cliente,
    SUM(p.total) AS total_gastado
FROM clientes c
INNER JOIN pedidos p
ON c.id_cliente = p.id_cliente
GROUP BY c.nombre
HAVING SUM(p.total) > 50000;



/* ============================================================
   15. RETO FINAL DE CLASE
   ============================================================ */

/*
   Reto 1:
   Listar todos los productos con stock menor a 10.
*/

SELECT *
FROM productos
WHERE stock < 10;


/*
   Reto 2:
   Listar clientes mayores de 25 años ordenados por edad.
*/

SELECT *
FROM clientes
WHERE edad > 25
ORDER BY edad ASC;


/*
   Reto 3:
   Mostrar todos los clientes y sus pedidos, incluyendo clientes sin pedidos.
*/

SELECT
    c.nombre AS cliente,
    p.id_pedido,
    p.fecha,
    p.total
FROM clientes c
LEFT JOIN pedidos p
ON c.id_cliente = p.id_cliente;


/*
   Reto 4:
   Mostrar qué productos ha comprado Ana Morales.
*/

SELECT
    c.nombre AS cliente,
    pr.nombre AS producto
FROM clientes c
INNER JOIN pedidos p
ON c.id_cliente = p.id_cliente
INNER JOIN detalle_pedidos dp
ON p.id_pedido = dp.id_pedido
INNER JOIN productos pr
ON dp.id_producto = pr.id_producto
WHERE c.nombre = 'Ana Morales';


/*
   Reto 5:
   Mostrar los clientes que no han comprado nada.
*/

SELECT
    c.nombre AS cliente_sin_compras
FROM clientes c
LEFT JOIN pedidos p
ON c.id_cliente = p.id_cliente
WHERE p.id_pedido IS NULL;



/* ============================================================
   CIERRE PEDAGÓGICO
   ============================================================ */

/*
   En esta clase practicamos:

   1. Filtros con WHERE.
   2. Operadores de comparación.
   3. LIKE, BETWEEN, IN, AND, OR.
   4. Funciones SQL como COUNT, AVG, SUM, MAX, MIN.
   5. Ordenamiento con ORDER BY.
   6. INNER JOIN para mostrar coincidencias.
   7. LEFT JOIN para incluir registros sin coincidencia.
   8. Consultas anidadas.
   9. GROUP BY para agrupar.
   10. HAVING para filtrar agrupaciones.

   Idea clave:

   SQL no solo permite guardar datos.
   También permite hacer preguntas útiles para tomar decisiones.
*/