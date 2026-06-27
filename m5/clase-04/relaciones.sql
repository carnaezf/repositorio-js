/* ============================================================
   RELACIONES ENTRE TABLAS EN SQL
   Tipos de relaciones: 1:1, 1:N, N:M
   ============================================================ */

/*
   En el diseño de bases de datos relacionales, las tablas se
   relacionan entre sí mediante llaves foráneas.
   
   TIPOS DE RELACIONES:
   - 1:1 (Uno a Uno): Un registro en la tabla A se relaciona 
     con un único registro en la tabla B.
   - 1:N (Uno a Muchos): Un registro en la tabla A se relaciona 
     con muchos registros en la tabla B.
   - N:M (Muchos a Muchos): Muchos registros en la tabla A se 
     relacionan con muchos registros en la tabla B.
*/

-- ============================================================
-- 1. RELACIÓN UNO A UNO (1:1)
-- ============================================================

/*
   EJEMPLO: Usuarios y sus perfiles
   - Cada usuario tiene un único perfil
   - Cada perfil pertenece a un único usuario
*/

-- 1.1 TABLA PRINCIPAL: Usuarios
/*
   Contiene la información básica de los usuarios.
   La llave primaria es id (autoincrementable).
*/
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100)
);

-- 1.2 TABLA RELACIONADA: Perfiles
/*
   Contiene información adicional del usuario.
   
   CARACTERÍSTICAS CLAVE PARA 1:1:
   - usuario_id tiene UNIQUE (no se permiten duplicados)
   - Esto asegura que un usuario solo tenga UN perfil
   - La llave foránea referencia a usuarios(id)
*/
CREATE TABLE perfiles (
    id SERIAL PRIMARY KEY,
    biografia TEXT,
    usuario_id INT UNIQUE, -- UNIQUE asegura la relación 1:1
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- EJEMPLO DE INSERCIÓN 1:1
INSERT INTO usuarios (nombre) VALUES ('María González');
INSERT INTO perfiles (biografia, usuario_id) 
VALUES ('Amante de la tecnología', 1);

-- INTENTO FALLIDO (viola UNIQUE)
-- INSERT INTO perfiles (biografia, usuario_id) 
-- VALUES ('Otro perfil', 1); -- Error: usuario_id ya existe

-- ============================================================
-- 2. RELACIÓN UNO A MUCHOS (1:N)
-- ============================================================

/*
   EJEMPLO: Clientes y sus pedidos
   - Un cliente puede tener muchos pedidos
   - Cada pedido pertenece a un único cliente
*/

-- 2.1 TABLA "UNO": Clientes
/*
   Guarda los datos de los clientes.
   Esta es la tabla "padre" o "principal".
*/
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100)
);

-- 2.2 TABLA "MUCHOS": Pedidos
/*
   Guarda los pedidos de cada cliente.
   
   CARACTERÍSTICAS CLAVE PARA 1:N:
   - cliente_id NO tiene UNIQUE (permite duplicados)
   - Un cliente puede aparecer en muchos pedidos
   - La llave foránea referencia a clientes(id)
*/
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    producto VARCHAR(100),
    cliente_id INT, -- Sin UNIQUE porque un cliente puede tener múltiples pedidos
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- EJEMPLO DE INSERCIÓN 1:N
INSERT INTO clientes (nombre) VALUES ('Carlos Ruiz');
INSERT INTO pedidos (producto, cliente_id) VALUES 
    ('Laptop', 1),
    ('Mouse', 1),
    ('Teclado', 1);

-- CONSULTA: Ver clientes con sus pedidos
SELECT c.nombre, p.producto
FROM clientes c
JOIN pedidos p ON c.id = p.cliente_id;

-- ============================================================
-- 3. RELACIÓN MUCHOS A MUCHOS (N:M)
-- ============================================================

/*
   EJEMPLO: Estudiantes y cursos
   - Un estudiante puede inscribirse en muchos cursos
   - Un curso puede tener muchos estudiantes inscritos
*/

-- 3.1 TABLA A: Estudiantes
/*
   Guarda la información de los estudiantes.
*/
CREATE TABLE estudiantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100)
);

-- 3.2 TABLA B: Cursos
/*
   Guarda la información de los cursos disponibles.
*/
CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100)
);

-- 3.3 TABLA UNIÓN (TABLA INTERMEDIA): Inscripciones
/*
   Esta tabla resuelve la relación N:M.
   
   CARACTERÍSTICAS CLAVE PARA N:M:
   - Llave primaria compuesta: (estudiante_id, curso_id)
   - Evita inscripciones duplicadas (mismo estudiante en mismo curso)
   - Dos llaves foráneas: una a estudiantes, otra a cursos
   
   NOMBRE ALTERNATIVO:
   - También se llama "tabla pivote" o "tabla de asociación"
*/
CREATE TABLE inscripciones (
    estudiante_id INT,
    curso_id INT,
    PRIMARY KEY (estudiante_id, curso_id), -- Evita duplicados idénticos
    FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id),
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

-- EJEMPLO DE INSERCIÓN N:M
INSERT INTO estudiantes (nombre) VALUES 
    ('Ana Martínez'),
    ('Luis Fernández');

INSERT INTO cursos (titulo) VALUES 
    ('Matemáticas'),
    ('Historia'),
    ('Programación');

-- Inscribir estudiantes en cursos
INSERT INTO inscripciones (estudiante_id, curso_id) VALUES 
    (1, 1), -- Ana -> Matemáticas
    (1, 3), -- Ana -> Programación
    (2, 1), -- Luis -> Matemáticas
    (2, 2); -- Luis -> Historia

-- CONSULTA: Ver estudiantes con sus cursos
SELECT e.nombre AS estudiante, c.titulo AS curso
FROM estudiantes e
JOIN inscripciones i ON e.id = i.estudiante_id
JOIN cursos c ON i.curso_id = c.id
ORDER BY e.nombre;

-- CONSULTA: Ver cursos con sus estudiantes
SELECT c.titulo AS curso, e.nombre AS estudiante
FROM cursos c
JOIN inscripciones i ON c.id = i.curso_id
JOIN estudiantes e ON i.estudiante_id = e.id
ORDER BY c.titulo;

-- ============================================================
-- RESUMEN DE CLAVES PARA CADA RELACIÓN
-- ============================================================

/*
   PARA RECORDAR:
   
   1:1  -> Llave foránea + UNIQUE en la tabla hija
   1:N  -> Llave foránea SIN UNIQUE en la tabla hija
   N:M  -> Tabla intermedia con llave primaria compuesta
          (dos llaves foráneas)
*/

-- ============================================================
-- COMPROBACIÓN DE INTEGRIDAD REFERENCIAL
-- ============================================================

-- INSERTAR UN PEDIDO CON CLIENTE INEXISTENTE (FALLARÁ)
-- INSERT INTO pedidos (producto, cliente_id) 
-- VALUES ('Tablet', 999); -- Error: cliente_id no existe

-- INSERTAR UNA INSCRIPCIÓN CON ESTUDIANTE INEXISTENTE (FALLARÁ)
-- INSERT INTO inscripciones (estudiante_id, curso_id) 
-- VALUES (999, 1); -- Error: estudiante_id no existe

-- ============================================================
-- OPERACIONES DE MANTENIMIENTO
-- ============================================================

-- ELIMINAR TABLAS (en orden inverso a la dependencia)
DROP TABLE IF EXISTS inscripciones; -- Primero la tabla intermedia
DROP TABLE IF EXISTS perfiles;      -- Luego las tablas hijas
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS usuarios;      -- Finalmente las tablas principales
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS estudiantes;
DROP TABLE IF EXISTS cursos;

-- NOTA: Si se usa ON DELETE CASCADE, el orden de eliminación puede variar