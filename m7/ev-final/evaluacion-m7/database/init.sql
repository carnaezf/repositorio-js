-- =====================================================
-- TABLA TÉCNICA DE PRUEBA
-- =====================================================
--
-- Esta tabla solo permite verificar:
-- 1. La conexión con PostgreSQL.
-- 2. El funcionamiento de Sequelize.
-- 3. La estructura modelo-servicio-controlador-ruta.
--
-- Puede eliminarse cuando se defina el dominio real.
-- =====================================================

CREATE TABLE IF NOT EXISTS pruebas (
    id SERIAL PRIMARY KEY,
    mensaje VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

INSERT INTO pruebas (mensaje)
SELECT 'Conexión ORM funcionando correctamente'
WHERE NOT EXISTS (
    SELECT 1
    FROM pruebas
);
