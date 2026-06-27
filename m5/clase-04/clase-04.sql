/* ============================================================
   CLASE SQL - LLAVES, RELACIONES, DDL Y DML
   Base de datos: veterinaria_clase
   Motor: PostgreSQL
   ============================================================ */

/*
   TEMAS ABORDADOS:
   - Llave primaria (PRIMARY KEY)
   - Llave foránea (FOREIGN KEY)
   - Restricciones (NOT NULL)
   - Inserción de datos (INSERT INTO)
   - Consulta de datos (SELECT)
   - Actualización (UPDATE)
   - Borrado (DELETE)
   - Integridad referencial
   - Comandos DDL: ALTER, DROP y TRUNCATE

   CONTEXTO:
   Una veterinaria necesita registrar tutores y sus mascotas.
   
   RELACIÓN PRINCIPAL:
   Un tutor puede tener muchas mascotas (relación 1 a N).
   Una mascota pertenece a un solo tutor.
*/

-- ============================================================
-- 1. CREACIÓN DE LA BASE DE DATOS
-- ============================================================

-- Eliminar la base de datos si ya existe (para empezar desde cero)
DROP DATABASE IF EXISTS veterinaria_clase;

-- Crear la nueva base de datos
CREATE DATABASE veterinaria_clase;

-- ============================================================
-- 2. LIMPIEZA DE TABLAS (orden inverso a la dependencia)
-- ============================================================

-- Primero eliminar la tabla hija (dependiente)
DROP TABLE IF EXISTS mascotas;
-- Luego eliminar la tabla padre (principal)
DROP TABLE IF EXISTS tutores;

-- ============================================================
-- 3. DDL - CREACIÓN DE TABLAS
-- ============================================================

/*
   DDL (Data Definition Language):
   Comandos para definir la estructura de la base de datos.
   - CREATE TABLE: crear tablas
   - ALTER TABLE: modificar tablas
   - DROP TABLE: eliminar tablas
   - TRUNCATE TABLE: vaciar tablas
*/

-- 3.1 TABLA TUTORES (tabla principal)
/*
   Guarda los datos de las personas responsables de las mascotas.
   
   CARACTERÍSTICAS:
   - rut: Llave primaria (identificador único)
   - nombre: Obligatorio (NOT NULL)
   - telefono: Obligatorio (NOT NULL)
   
   UNA LLAVE PRIMARIA:
   - Identifica de forma única cada registro
   - No permite valores duplicados
   - No permite valores NULL
*/

CREATE TABLE tutores (
    rut VARCHAR(12) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);

-- 3.2 TABLA MASCOTAS (tabla dependiente)
/*
   Guarda las mascotas y las relaciona con sus tutores.
   
   CARACTERÍSTICAS:
   - id_mascota: SERIAL genera números automáticos (1, 2, 3...)
   - nombre, especie, edad: Obligatorios (NOT NULL)
   - rut_tutor: Llave foránea que referencia a tutores(rut)
   
   LLAVE FORÁNEA:
   - Conecta cada mascota con un tutor existente
   - Mantiene la integridad referencial
*/

CREATE TABLE mascotas (
    id_mascota SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    edad INTEGER NOT NULL,
    rut_tutor VARCHAR(12) NOT NULL,
    
    -- Restricción de llave foránea
    CONSTRAINT fk_mascotas_tutores
        FOREIGN KEY (rut_tutor)
        REFERENCES tutores(rut)
);

-- ============================================================
-- 4. DML - INSERCIÓN DE DATOS
-- ============================================================

/*
   DML (Data Manipulation Language):
   Comandos para manipular los datos de las tablas.
   
   PRINCIPALES COMANDOS:
   - INSERT: Agregar nuevos registros
   - SELECT: Consultar registros existentes
   - UPDATE: Modificar registros existentes
   - DELETE: Eliminar registros
*/

-- 4.1 INSERTAR TUTORES
/*
   IMPORTANTE: Primero insertamos en la tabla principal (tutores)
   porque mascotas depende de ella.
   Antes de registrar una mascota, su tutor debe existir.
*/

INSERT INTO tutores (rut, nombre, telefono) VALUES
    ('11111111-1', 'Laura Gómez', '987654321'),
    ('22222222-2', 'Carlos Pérez', '912345678'),
    ('33333333-3', 'Ana Morales', '956789123');

-- Verificar los tutores insertados
SELECT * FROM tutores;

-- 4.2 INSERTAR MASCOTAS
/*
   Cada mascota debe referenciar un rut_tutor que exista en tutores.
   El id_mascota se genera automáticamente (SERIAL).
*/

INSERT INTO mascotas (nombre, especie, edad, rut_tutor) VALUES
    ('Firulais', 'Perro', 5, '11111111-1'),
    ('Michi', 'Gato', 3, '11111111-1'),
    ('Rocky', 'Perro', 2, '22222222-2'),
    ('Luna', 'Conejo', 1, '33333333-3');

-- Verificar las mascotas insertadas
SELECT * FROM mascotas;

-- ============================================================
-- 5. INTEGRIDAD REFERENCIAL
-- ============================================================

/*
   INTEGRIDAD REFERENCIAL:
   Mecanismo que mantiene relaciones coherentes entre tablas.
   
   REGLA BÁSICA:
   Si una mascota dice pertenecer a un tutor,
   ese tutor DEBE existir en la tabla tutores.
*/

-- ============================================================
-- 6. CONSULTAS (SELECT)
-- ============================================================

-- 6.1 JOIN BÁSICO - Relacionar ambas tablas
/*
   INNER JOIN: Muestra solo registros que tienen correspondencia
   en ambas tablas.
*/

SELECT
    t.nombre AS tutor,
    m.nombre AS mascota,
    m.especie,
    m.edad
FROM tutores t
INNER JOIN mascotas m ON t.rut = m.rut_tutor;

-- 6.2 JOIN SIMPLIFICADO (INNER es opcional)
SELECT
    t.nombre AS tutor,
    m.nombre AS mascota,
    m.especie,
    m.edad
FROM tutores t
JOIN mascotas m ON t.rut = m.rut_tutor;

-- 6.3 JOIN CON FILTRO (WHERE)
/*
   ON: Relaciona las tablas
   WHERE: Filtra los resultados
*/

SELECT
    t.nombre AS tutor,
    m.nombre AS mascota,
    m.especie,
    m.edad
FROM tutores t
JOIN mascotas m ON t.rut = m.rut_tutor
WHERE t.nombre = 'Laura Gómez';

-- ============================================================
-- 7. ACTUALIZACIÓN (UPDATE)
-- ============================================================

/*
   ESTRUCTURA:
   UPDATE tabla
   SET columna = nuevo_valor
   WHERE condicion;
   
   ADVERTENCIA:
   Siempre usar WHERE para evitar actualizar toda la tabla.
*/

-- Actualizar el teléfono de un tutor específico
UPDATE tutores
SET telefono = '900000000'
WHERE rut = '22222222-2';

-- ============================================================
-- 8. ELIMINACIÓN (DELETE)
-- ============================================================

/*
   ESTRUCTURA:
   DELETE FROM tabla
   WHERE condicion;
   
   ADVERTENCIA:
   Siempre usar WHERE para evitar borrar toda la tabla.
*/

-- Insertar una mascota temporal para demostrar DELETE
INSERT INTO mascotas (nombre, especie, edad, rut_tutor)
VALUES ('Temporal', 'Perro', 1, '33333333-3');

-- Eliminar la mascota temporal
DELETE FROM mascotas
WHERE nombre = 'Temporal';

-- ============================================================
-- 9. INTEGRIDAD REFERENCIAL - BORRADO EN CASCADA
-- ============================================================

/*
   PROBLEMA: Intento de borrar un tutor que tiene mascotas.
   Esto generará un error porque viola la integridad referencial.
*/

-- Este DELETE fallará porque el tutor tiene mascotas asociadas
DELETE FROM tutores
WHERE rut = '11111111-1';

/*
   SOLUCIÓN: Borrado en cascada (ON DELETE CASCADE)
   
   Pasos para implementar borrado automático:
   1. Eliminar la llave foránea existente
   2. Crear una nueva con ON DELETE CASCADE
*/

-- 1. Eliminar la restricción de llave foránea actual
ALTER TABLE mascotas
DROP CONSTRAINT fk_mascotas_tutores;

-- 2. Crear la nueva llave foránea con ON DELETE CASCADE
/*
   ON DELETE CASCADE:
   Cuando se elimina un tutor, todas sus mascotas
   se eliminan automáticamente.
*/
ALTER TABLE mascotas
ADD CONSTRAINT fk_mascotas_tutores
FOREIGN KEY (rut_tutor)
REFERENCES tutores(rut)
ON DELETE CASCADE;

-- Ahora al eliminar un tutor, sus mascotas se eliminarán automáticamente