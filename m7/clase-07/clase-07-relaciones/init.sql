-- =====================================================
-- BASE DE DATOS PARA RELACIONES CON SEQUELIZE
-- =====================================================

DROP DATABASE IF EXISTS movies_orm;
CREATE DATABASE movies_orm;

\connect movies_orm;

-- =====================================================
-- RELACIÓN 1:N
-- Un director tiene muchas películas
-- =====================================================

CREATE TABLE directores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL
);

CREATE TABLE peliculas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    anio INTEGER NOT NULL,
    director_id INTEGER NOT NULL,

    CONSTRAINT fk_peliculas_directores
        FOREIGN KEY (director_id)
        REFERENCES directores(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- =====================================================
-- RELACIÓN N:M
-- Una película tiene muchos géneros
-- Un género pertenece a muchas películas
-- =====================================================

CREATE TABLE generos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE peliculas_generos (
    pelicula_id INTEGER NOT NULL,
    genero_id INTEGER NOT NULL,
    principal BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (pelicula_id, genero_id),

    CONSTRAINT fk_pelicula_genero_pelicula
        FOREIGN KEY (pelicula_id)
        REFERENCES peliculas(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_pelicula_genero_genero
        FOREIGN KEY (genero_id)
        REFERENCES generos(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- =====================================================
-- RELACIÓN 1:1
-- Un usuario tiene un perfil
-- =====================================================

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE perfiles (
    id SERIAL PRIMARY KEY,
    biografia TEXT,
    avatar_url VARCHAR(255),
    usuario_id INTEGER NOT NULL UNIQUE,

    CONSTRAINT fk_perfiles_usuarios
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- =====================================================
-- DATOS DE PRUEBA
-- =====================================================

INSERT INTO directores (nombre)
VALUES
    ('Christopher Nolan'),
    ('Greta Gerwig');

INSERT INTO peliculas (titulo, anio, director_id)
VALUES
    ('Inception', 2010, 1),
    ('Interstellar', 2014, 1),
    ('Barbie', 2023, 2);

INSERT INTO generos (nombre)
VALUES
    ('Ciencia ficción'),
    ('Drama'),
    ('Comedia'),
    ('Aventura');

INSERT INTO peliculas_generos
    (pelicula_id, genero_id, principal)
VALUES
    (1, 1, true),
    (1, 4, false),
    (2, 1, true),
    (2, 2, false),
    (3, 3, true),
    (3, 4, false);

INSERT INTO usuarios (nombre, email)
VALUES
    ('Ana Torres', 'ana@example.com'),
    ('Carlos Soto', 'carlos@example.com');

INSERT INTO perfiles (biografia, avatar_url, usuario_id)
VALUES
    (
        'Amante del cine de ciencia ficción.',
        'https://example.com/ana.jpg',
        1
    );
