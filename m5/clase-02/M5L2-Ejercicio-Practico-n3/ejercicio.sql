/* ============================================================
   ACTIVIDAD 4 - FINANZAS PERSONALES
   Script base y resolución de consultas
   PostgreSQL
   ============================================================ */


/* ============================================================
   1. CREAR BASE DE DATOS
   ============================================================ */

CREATE DATABASE actividad_finanzas;


/*
   IMPORTANTE:
   Después de ejecutar CREATE DATABASE, conectarse a la base
   actividad_finanzas y ejecutar desde aquí hacia abajo.
*/


/* ============================================================
   2. CREAR TABLA
   ============================================================ */

DROP TABLE IF EXISTS finanzas_personales;

CREATE TABLE finanzas_personales (
    nombre VARCHAR(30) PRIMARY KEY,
    me_debe INTEGER,
    cuotas_cobrar INTEGER,
    le_debo INTEGER,
    cuotas_pagar INTEGER
);


/* ============================================================
   3. INSERTAR DATOS INICIALES
   ============================================================ */

INSERT INTO finanzas_personales
(nombre, me_debe, cuotas_cobrar, le_debo, cuotas_pagar)
VALUES
('tía carmen', 0, 0, 5000, 1),
('papá', 0, 0, 15000, 3),
('nacho', 10000, 2, 7000, 1),
('almacén esquina', 0, 0, 13000, 2),
('vicios varios', 0, 0, 35000, 35),
('compañero trabajo', 50000, 5, 0, 0);


/* ============================================================
   VER TABLA COMPLETA
   ============================================================ */

SELECT *
FROM finanzas_personales;


/* ============================================================
   R1. A quién(es) le debe más dinero y cuánto
   ============================================================ */

SELECT nombre, le_debo
FROM finanzas_personales
WHERE le_debo = (
    SELECT MAX(le_debo)
    FROM finanzas_personales
);


/* ============================================================
   R2. Quién(es) le debe más dinero a usted y cuánto
   ============================================================ */

SELECT nombre, me_debe
FROM finanzas_personales
WHERE me_debe = (
    SELECT MAX(me_debe)
    FROM finanzas_personales
);


/* ============================================================
   R3. Cuánto dinero debe en total
   ============================================================ */

SELECT SUM(le_debo) AS total_deuda
FROM finanzas_personales;


/* ============================================================
   R4. Cuánto dinero debe en promedio
   ============================================================ */

SELECT ROUND(AVG(le_debo), 2) AS promedio_deuda
FROM finanzas_personales;


/* ============================================================
   R5. Si no puede pagar más de una cuota al mes,
   cuántos meses demoraría en saldar la deuda
   ============================================================ */

SELECT SUM(cuotas_pagar) AS meses_para_saldar_deuda
FROM finanzas_personales
WHERE le_debo > 0;


/* ============================================================
   R6. Si cobra todo lo que le deben y lo usa para pagar deuda:
   ¿A cuánto asciende la nueva deuda reducida?
   ============================================================ */

SELECT
    SUM(le_debo) AS deuda_actual,
    SUM(me_debe) AS total_por_cobrar,
    SUM(le_debo) - SUM(me_debe) AS nueva_deuda_reducida
FROM finanzas_personales;


/* ============================================================
   R6. ¿Cuánto tendría que pagar mensualmente
   para pagar lo que resta en las cuotas acordadas?
   ============================================================ */

SELECT
    ROUND(
        (
            (SELECT SUM(le_debo) FROM finanzas_personales) -
            (SELECT SUM(me_debe) FROM finanzas_personales)
        )::NUMERIC
        /
        (SELECT SUM(cuotas_pagar)
         FROM finanzas_personales
         WHERE le_debo > 0),
        2
    ) AS pago_mensual_deuda_reducida;


/* ============================================================
   R7. Insertar nuevo registro:
   Le debe 50.000 a su pareja
   ============================================================ */

INSERT INTO finanzas_personales
(nombre, me_debe, cuotas_cobrar, le_debo, cuotas_pagar)
VALUES
('pareja', 0, 0, 50000, 1);


/* ============================================================
   VER TABLA DESPUÉS DEL INSERT
   ============================================================ */

SELECT *
FROM finanzas_personales;


/* ============================================================
   R8. Con este cambio:
   ¿De cuánto será la cuota a pagar este mes?
   ============================================================ */

SELECT
    ROUND(SUM(le_debo::NUMERIC / cuotas_pagar), 2) AS cuota_a_pagar_este_mes
FROM finanzas_personales
WHERE le_debo > 0
  AND cuotas_pagar > 0;


/* ============================================================
   R9. Actualizar cuotas del almacén esquina a 13 cuotas
   ============================================================ */

UPDATE finanzas_personales
SET cuotas_pagar = 13
WHERE nombre = 'almacén esquina';


/* ============================================================
   VER TABLA DESPUÉS DEL UPDATE
   ============================================================ */

SELECT *
FROM finanzas_personales;


/* ============================================================
   R10. Después del ajuste:
   ¿De cuánto será la nueva cuota a pagar este mes?
   ============================================================ */

SELECT
    ROUND(SUM(le_debo::NUMERIC / cuotas_pagar), 2) AS nueva_cuota_a_pagar_este_mes
FROM finanzas_personales
WHERE le_debo > 0
  AND cuotas_pagar > 0;