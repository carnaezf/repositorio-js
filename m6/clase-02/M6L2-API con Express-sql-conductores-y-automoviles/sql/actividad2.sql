/* ============================================================
   ACTIVIDAD 2 - CONDUCTORES Y AUTOMÓVILES
   PostgreSQL
   ============================================================ */


/* ============================================================
   1. CREAR BASE DE DATOS
   ============================================================ */

CREATE DATABASE actividad_autos;


/*
   IMPORTANTE:
   Después de crear la base de datos, conectarse a actividad_autos
   y ejecutar desde aquí hacia abajo.
*/


/* ============================================================
   2. CREAR TABLAS
   ============================================================ */

DROP TABLE IF EXISTS automoviles;
DROP TABLE IF EXISTS conductores;

CREATE TABLE conductores (
    nombre VARCHAR(255) PRIMARY KEY,
    edad INTEGER NOT NULL
);

CREATE TABLE automoviles (
    marca VARCHAR(255) NOT NULL,
    patente VARCHAR(255) PRIMARY KEY,
    nombre_conductor VARCHAR(255)
);


/* ============================================================
   3. INSERTAR CONDUCTORES
   ============================================================ */

INSERT INTO conductores (nombre, edad) VALUES
('Don Pepe', 55),
('Pedro', 25),
('Maria', 33),
('Francisco', 19),
('Camilo', 29),
('Andres', 35),
('Mario', 48),
('Felipe', 33);


/* ============================================================
   4. INSERTAR AUTOMÓVILES
   ============================================================ */

INSERT INTO automoviles (marca, patente, nombre_conductor) VALUES
('Ford', 'HXJH55', 'Felipe'),
('Toyota', 'HLSA26', 'Pedro'),
('Mercedes', 'JFTS47', 'Maria'),
('Chevrolet', 'RTPP97', 'Francisco'),
('Nissan', 'SDTR51', 'Don Pepe'),
('Mazda', 'RDCS19', 'Francisco'),
('Kia', 'KDTZ28', 'Don Pepe'),
('Jeep', 'FFDF88', 'Paulina'),
('Suzuki', 'DRTS41', 'Heriberto'),
('Honda', 'BXVZ67', 'Manuel');


/* ============================================================
   5. VERIFICAR DATOS
   ============================================================ */

SELECT *
FROM conductores;

SELECT *
FROM automoviles;