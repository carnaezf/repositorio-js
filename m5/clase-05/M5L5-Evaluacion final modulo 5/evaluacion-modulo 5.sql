/* ============================================================
   EVALUACIÓN SQL
   PARTE 1: JOIN
   PARTE 2: MODELO ENTIDAD RELACIÓN
   PostgreSQL
   ============================================================ */


/* ============================================================
   PARTE 1
   TABLAS ORIGINALES DEL EJERCICIO
   ============================================================ */

DROP TABLE IF EXISTS reparto_soltera_otra_vez;

CREATE TABLE reparto_soltera_otra_vez (
    nombre VARCHAR(255) PRIMARY KEY,
    temporadas INTEGER,
    protagonico BOOLEAN,
    sueldo INTEGER
);

INSERT INTO reparto_soltera_otra_vez 
(nombre, temporadas, protagonico, sueldo) 
VALUES
('Paz Bascuñán', 3, true, 100),
('Pablo Macaya', 3, true, 100),
('Cristián Arriagada', 3, true, 95),
('Josefina Montané', 2, true, 90),
('Loreto Aravena', 3, true, 95),
('Lorena Bosch', 2, true, 90),
('Nicolás Poblete', 2, true, 85),
('Héctor Morales', 3, true, 80),
('Aranzazú Yankovic', 2, true, 80),
('Luis Gnecco', 3, true, 95),
('Catalina Guerra', 3, true, 90),
('Solange Lackington', 2, true, 70),
('Ignacio Garmendia', 2, true, 70),
('Julio González', 3, true, 75),
('Antonella Orsini', 3, true, 70),
('Tamara Acosta', 1, false, 60),
('Silvia Santelices', 1, false, 55),
('Alejandro Trejo', 1, false, 55),
('Grimanesa Jiménez', 1, false, 60);


DROP TABLE IF EXISTS reparto_papi_ricky;

CREATE TABLE reparto_papi_ricky (
    nombre VARCHAR(255) PRIMARY KEY,
    capitulos INTEGER,
    protagonico BOOLEAN,
    sueldo INTEGER
);

INSERT INTO reparto_papi_ricky 
(nombre, capitulos, protagonico, sueldo) 
VALUES
('Jorge Zabaleta', 135, true, 100),
('Belén Soto', 135, true, 100),
('Tamara Acosta', 135, true, 100),
('María Elena Swett', 135, true, 100),
('Juan Falcón', 135, true, 95),
('Silvia Santelices', 135, true, 85),
('Leonardo Perucci', 135, true, 85),
('Teresita Reyes', 135, true, 80),
('Luis Gnecco', 135, true, 75),
('Alejandro Trejo', 135, true, 65),
('Grimanesa Jiménez', 135, true, 60),
('Remigio Remedy', 135, true, 60),
('María Paz Grandjean', 135, true, 55),
('Héctor Morales', 135, true, 50),
('César Caillet', 135, true, 40),
('José Tomás Guzmán', 135, true, 25),
('Manuel Aguirre', 135, true, 30);


/* ============================================================
   CONSULTAS PARTE 1
   ============================================================ */


/* ============================================================
   P1. Actores que participaron en ambas teleseries,
   sueldo en cada una y suma de ambos sueldos.
   INNER JOIN: muestra solo coincidencias en ambas tablas.
   ============================================================ */

SELECT
    s.nombre,
    s.sueldo AS sueldo_soltera_otra_vez,
    p.sueldo AS sueldo_papi_ricky,
    s.sueldo + p.sueldo AS sueldo_total
FROM reparto_soltera_otra_vez s
INNER JOIN reparto_papi_ricky p
    ON s.nombre = p.nombre
ORDER BY s.nombre;


/* ============================================================
   P2. Actores que participaron exclusivamente en Soltera otra vez
   con sueldo mayor a 90.
   LEFT JOIN + IS NULL: permite encontrar los que no están
   en la segunda tabla.
   ============================================================ */

SELECT
    s.nombre,
    s.sueldo
FROM reparto_soltera_otra_vez s
LEFT JOIN reparto_papi_ricky p
    ON s.nombre = p.nombre
WHERE p.nombre IS NULL
  AND s.sueldo > 90
ORDER BY s.nombre;


/* ============================================================
   P3. Actores con sueldo inferior a 85 que actuaron en una
   teleserie, pero no en ambas.
   
   Se usa UNION para juntar resultados de ambas consultas.
   ============================================================ */

SELECT
    s.nombre,
    'Soltera otra vez' AS teleserie,
    s.sueldo
FROM reparto_soltera_otra_vez s
LEFT JOIN reparto_papi_ricky p
    ON s.nombre = p.nombre
WHERE p.nombre IS NULL
  AND s.sueldo < 85

UNION

SELECT
    p.nombre,
    'Papi Ricky' AS teleserie,
    p.sueldo
FROM reparto_papi_ricky p
LEFT JOIN reparto_soltera_otra_vez s
    ON p.nombre = s.nombre
WHERE s.nombre IS NULL
  AND p.sueldo < 85

ORDER BY nombre;


/* ============================================================
   PARTE 2
   MODELO ENTIDAD RELACIÓN MEJORADO
   ============================================================ */

/*
   Modelo propuesto:

   actores
   - id_actor PK
   - nombre

   teleseries
   - id_teleserie PK
   - nombre

   repartos
   - id_reparto PK
   - id_actor FK
   - id_teleserie FK
   - sueldo
   - protagonico
   - temporadas
   - capitulos

   Relación:
   Un actor puede participar en muchas teleseries.
   Una teleserie puede tener muchos actores.
   Por eso usamos una tabla intermedia: repartos.
*/


/* ============================================================
   LIMPIEZA DEL MODELO NUEVO
   ============================================================ */

DROP TABLE IF EXISTS repartos;
DROP TABLE IF EXISTS actores;
DROP TABLE IF EXISTS teleseries;


/* ============================================================
   CREACIÓN DE TABLAS
   ============================================================ */

CREATE TABLE actores (
    id_actor SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE teleseries (
    id_teleserie SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE repartos (
    id_reparto SERIAL PRIMARY KEY,
    id_actor INTEGER NOT NULL,
    id_teleserie INTEGER NOT NULL,
    sueldo INTEGER NOT NULL,
    protagonico BOOLEAN NOT NULL,
    temporadas INTEGER,
    capitulos INTEGER,

    CONSTRAINT fk_actor
        FOREIGN KEY (id_actor)
        REFERENCES actores(id_actor)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_teleserie
        FOREIGN KEY (id_teleserie)
        REFERENCES teleseries(id_teleserie)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


/* ============================================================
   INSERTAR TELESERIES
   ============================================================ */

INSERT INTO teleseries (nombre) VALUES
('Soltera otra vez'),
('Papi Ricky');


/* ============================================================
   INSERTAR ACTORES
   Se insertan actores únicos, sin repetir nombres.
   ============================================================ */

INSERT INTO actores (nombre) VALUES
('Paz Bascuñán'),
('Pablo Macaya'),
('Cristián Arriagada'),
('Josefina Montané'),
('Loreto Aravena'),
('Lorena Bosch'),
('Nicolás Poblete'),
('Héctor Morales'),
('Aranzazú Yankovic'),
('Luis Gnecco'),
('Catalina Guerra'),
('Solange Lackington'),
('Ignacio Garmendia'),
('Julio González'),
('Antonella Orsini'),
('Tamara Acosta'),
('Silvia Santelices'),
('Alejandro Trejo'),
('Grimanesa Jiménez'),
('Jorge Zabaleta'),
('Belén Soto'),
('María Elena Swett'),
('Juan Falcón'),
('Leonardo Perucci'),
('Teresita Reyes'),
('Remigio Remedy'),
('María Paz Grandjean'),
('César Caillet'),
('José Tomás Guzmán'),
('Manuel Aguirre');


/* ============================================================
   INSERTAR REPARTOS - SOLTERA OTRA VEZ
   ============================================================ */

INSERT INTO repartos 
(id_actor, id_teleserie, sueldo, protagonico, temporadas, capitulos)
SELECT 
    a.id_actor,
    t.id_teleserie,
    s.sueldo,
    s.protagonico,
    s.temporadas,
    NULL
FROM reparto_soltera_otra_vez s
JOIN actores a
    ON a.nombre = s.nombre
JOIN teleseries t
    ON t.nombre = 'Soltera otra vez';


/* ============================================================
   INSERTAR REPARTOS - PAPI RICKY
   ============================================================ */

INSERT INTO repartos 
(id_actor, id_teleserie, sueldo, protagonico, temporadas, capitulos)
SELECT 
    a.id_actor,
    t.id_teleserie,
    p.sueldo,
    p.protagonico,
    NULL,
    p.capitulos
FROM reparto_papi_ricky p
JOIN actores a
    ON a.nombre = p.nombre
JOIN teleseries t
    ON t.nombre = 'Papi Ricky';


/* ============================================================
   VERIFICAR MODELO NUEVO
   ============================================================ */

SELECT *
FROM actores;

SELECT *
FROM teleseries;

SELECT *
FROM repartos;


/* ============================================================
   PARTE 2 - CONSULTA FINAL
   Mostrar todas las teleseries y todos los actores de reparto
   asociados.
   
   No incluir actores de rol secundario.
   En este ejercicio, se interpreta:
   protagonico = true  => actor de reparto principal
   protagonico = false => rol secundario
   ============================================================ */

SELECT
    t.nombre AS teleserie,
    a.nombre AS actor,
    r.sueldo,
    r.protagonico
FROM repartos r
JOIN actores a
    ON r.id_actor = a.id_actor
JOIN teleseries t
    ON r.id_teleserie = t.id_teleserie
WHERE r.protagonico = true
ORDER BY t.nombre, a.nombre;