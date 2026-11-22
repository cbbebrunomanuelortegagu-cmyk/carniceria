-- Configuración del fondo de portada. El archivo de imagen se almacena en
-- uploads/portada y MySQL conserva únicamente su ruta y color de respaldo.
USE edenfarm;

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

UPDATE configuracion_portada
SET imagen_ruta = '/uploads/portada/fondo-celeste-vacas.svg',
    color_fondo = '#DDF3FF'
WHERE id = 1 AND imagen_ruta IS NULL;
