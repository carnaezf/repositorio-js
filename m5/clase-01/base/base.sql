/* ============================================================
   Ejercicio Práctico - Consultas SQL
   Actividad: Consultas sobre tabla clientes
   Motor sugerido: PostgreSQL
   ============================================================ */


/* ============================================================
   1. LIMPIEZA INICIAL
   ============================================================ */

DROP TABLE IF EXISTS clientes;


/* ============================================================
   2. CREACIÓN DE TABLA
   ============================================================ */

CREATE TABLE clientes (
    rut VARCHAR(12) PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    edad INTEGER NOT NULL
);


/* ============================================================
   3. INSERCIÓN DE DATOS DE PRUEBA
   ============================================================ */

INSERT INTO clientes (rut, nombre, edad) VALUES
('13133133-3', 'Mario', 35),
('13333111-1', 'Diego', 28),
('12345678-9', 'Pepa', 22),
('15678901-1', 'Pato', 45),
('98765432-1', 'Ana', 19),
('13456789-0', 'Paula', 38),
('17894561-2', 'Marcela', 31),
('11333444-5', 'Pedro', 41),
('14555666-7', 'Camila', 25),
('22333444-1', 'Marta', 50);


/* ============================================================
   R1. Todos los clientes con rut 13133133-3
   ============================================================ */

SELECT *
FROM clientes
WHERE rut = '13133133-3';


/* ============================================================
   R2. Todos los clientes mayores de 25 años
   ============================================================ */

SELECT *
FROM clientes
WHERE edad > 25;


/* ============================================================
   R3. Todos los clientes que no se llamen Mario
   PostgreSQL: ILIKE no distingue mayúsculas/minúsculas
   ============================================================ */

SELECT *
FROM clientes
WHERE nombre NOT ILIKE 'mario';


/* ============================================================
   R4. Todos los clientes con rut empezado en 13
   ============================================================ */

SELECT *
FROM clientes
WHERE rut LIKE '13%';


/* ============================================================
   R5. Todos los clientes con nombre finalizado en a
   ============================================================ */

SELECT *
FROM clientes
WHERE nombre ILIKE '%a';


/* ============================================================
   R6. Todos los clientes con nombre empezado en P
   y edad mayor a 34
   ============================================================ */

SELECT *
FROM clientes
WHERE nombre ILIKE 'P%'
  AND edad > 34;


/* ============================================================
   R7. Todos los clientes con rut empezado en 1,
   nombre no empezado en M y edad menor a 40
   ============================================================ */

SELECT *
FROM clientes
WHERE rut LIKE '1%'
  AND nombre NOT ILIKE 'M%'
  AND edad < 40;


/* ============================================================
   R8. Todos los clientes con rut empezado en 13
   o terminado en 1, con nombres en:
   Diego, Mario, Pato, Pepa
   y edad entre 20 y 80 incluidos
   ============================================================ */

SELECT *
FROM clientes
WHERE (rut LIKE '13%' OR rut LIKE '%1')
  AND nombre IN ('Diego', 'Mario', 'Pato', 'Pepa')
  AND edad BETWEEN 20 AND 80;