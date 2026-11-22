-- Catálogo público EdenFarm.
-- Crea el esquema edenfarm si no existe y prepara la tabla del catálogo.
-- Ejecutar en MySQL Workbench con una cuenta autorizada para crear esquemas.
-- No modifica las tablas ni los datos del POS, no crea pedidos y no registra pagos.

CREATE DATABASE IF NOT EXISTS edenfarm
  DEFAULT CHARACTER SET utf8mb4;

USE edenfarm;

CREATE TABLE IF NOT EXISTS productos_publicos (
  id VARCHAR(64) NOT NULL,
  nombre VARCHAR(120) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  unidad_precio VARCHAR(8) NOT NULL,
  moneda VARCHAR(8) NOT NULL,
  imagen_ruta VARCHAR(500) NULL,
  PRIMARY KEY (id),
  CONSTRAINT chk_productos_publicos_precio CHECK (precio >= 0),
  CONSTRAINT chk_productos_publicos_unidad CHECK (unidad_precio IN ('kg', 'pack'))
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8mb4;

-- Configuración del banner de inicio. El archivo vive en el servidor;
-- MySQL guarda su ruta relativa y el color de fondo.
CREATE TABLE IF NOT EXISTS configuracion_portada (
  id TINYINT UNSIGNED NOT NULL,
  imagen_ruta VARCHAR(500) NULL,
  color_fondo VARCHAR(7) NOT NULL DEFAULT '#DDF3FF',
  PRIMARY KEY (id),
  CONSTRAINT chk_configuracion_portada_unica CHECK (id = 1),
  CONSTRAINT chk_configuracion_portada_color CHECK (color_fondo REGEXP '^#[0-9A-Fa-f]{6}$')
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8mb4;

INSERT INTO configuracion_portada (id, imagen_ruta, color_fondo)
VALUES (1, '/uploads/portada/fondo-celeste-vacas.svg', '#DDF3FF')
ON DUPLICATE KEY UPDATE id = VALUES(id);
