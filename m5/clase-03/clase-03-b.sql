-- Clase 03: DML, restricciones y transacciones


/*
INSERT
SELECT
UPDATE
DELETE

Comprenderemos:
Restricciones
Llaves primarias
Secuencias SERIAL
Integridad referencial
Transacciones
COMMIT y ROLLBACK
*/

INSERT INTO clientes (nombre, ciudad, edad)
VALUES ('Camila Rojas', 'La Serena', 27);


INSERT INTO productos (nombre, categoria, precio, stock)
VALUES ('Webcam HD', 'Computación', 35000, 8);


-- Actualizando informacion con UPDATE
/*
Estructura

UPDATE tabla
SET columna = nuevo_valor
WHERE condicion

MUY IMPORTANTE
Siempre usar WHERE para evitar actualizar toda la tabla
*/

UPDATE clientes
SET ciudad = 'Coquimbo'
WHERE nombre = 'Camila Rojas';


-- Borrando informacion con DELETE

/*
DELETE permite eliminar registros

Estructura general

DELETE FROM tabla
WHERE condicion;

MUY IMPORTANTE
Siempre usar WHERE.
*/

INSERT INTO clientes (nombre, ciudad, edad)
VALUES ('Cliente Temporal', 'Santiago', 99);



-- Restricciones de una tabla


/*
   Las restricciones son reglas que protegen la calidad
   de los datos.

   En nuestra base tenemos:

   PRIMARY KEY (Unique - Not Null) -> identifica de forma única cada fila.
   NOT NULL     -> obliga a que un campo tenga valor.
   UNIQUE     -> obliga a que un campo sea unico.
   FOREIGN KEY  -> conecta una tabla con otra.
*/

INSERT INTO clientes (ciudad, edad)
VALUES ('Santiago', 99);

-- Integridad referencial

/*
Integridad referencial
Significa que las relaciones entre tablas deben ser validas

Ejemplo
Un pedido debe pertener a un cliente existente
No podemos crear un pedido para un ID que existe

INSERT INTO pedidos (id_cliente, fecha, total)
VALUES (999, '2026-06-10', 50000)

La foreing key protege la relacion entre pedidos y clientes

*/


-- INSERTAR DATOS RESPETANDO LA INTEGRIDAD REFERENCIAL

/*
Para crear un pedido correctamente
1. Primero el cliente debe existir
2. Luego podemos crear el pedido
3. Luego podemos agregar el detalle pedido
*/


-- Paso 1: Creamos un cliente
INSERT INTO clientes (nombre, ciudad, edad)
VALUES ('Francisca Silva', 'Santiago', 29);


-- Revisar que id_cliente recibio

SELECT * 
FROM clientes 
WHERE nombre = 'Francisca Silva';


-- Paso 2: Creamos un pedido para Francisca Silva

INSERT INTO pedidos (id_cliente, fecha, total)
Values(
    (SELECT id_cliente FROM clientes WHERE nombre = 'Francisca Silva'), -- 9
    '2026-06-10',
    3500
 );


 INSERT INTO pedidos (id_cliente, fecha, total)
Values(
    9, -- 9
    '2026-06-10',
    3500
 );

 /*
 BBBD
 id_cliente 
 9 Francisca Silva

 BBDD ALumno
 5 Francisca Silva

ERROR:
more than one row returned by a subquery used as an expression

UUID
 */