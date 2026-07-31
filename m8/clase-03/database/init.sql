CREATE TABLE IF NOT EXISTS canciones (
    id SERIAL PRIMARY KEY,

    titulo VARCHAR(150) NOT NULL,

    artista VARCHAR(120) NOT NULL,

    archivo VARCHAR(500) NOT NULL,

    nombre_original VARCHAR(255) NOT NULL,

    tipo_mime VARCHAR(100) NOT NULL,

    tamanio INTEGER NOT NULL
);

