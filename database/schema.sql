-- Esquema inicial para EdenFarm.
-- Requiere MySQL 8.0.16 o posterior para aplicar las restricciones CHECK.
-- Este archivo solo crea estructura: no inserta, actualiza ni elimina registros.

CREATE DATABASE IF NOT EXISTS carniceria
  CHARACTER SET utf8mb4;

USE carniceria;

CREATE TABLE IF NOT EXISTS categorias (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(80) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categorias_nombre (nombre)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS productos (
  id VARCHAR(80) NOT NULL,
  nombre VARCHAR(160) NOT NULL,
  descripcion TEXT NOT NULL,
  precio DECIMAL(12, 2) NOT NULL,
  unidad VARCHAR(16) NOT NULL,
  categoria_id BIGINT UNSIGNED NOT NULL,
  stock DECIMAL(12, 3) NOT NULL,
  imagen VARCHAR(500) NOT NULL,
  PRIMARY KEY (id),
  KEY ix_productos_categoria_id (categoria_id),
  CONSTRAINT fk_productos_categoria
    FOREIGN KEY (categoria_id) REFERENCES categorias (id)
    ON UPDATE RESTRICT ON DELETE RESTRICT,
  CONSTRAINT chk_productos_precio CHECK (precio >= 0),
  CONSTRAINT chk_productos_unidad CHECK (unidad IN ('kg', 'unidad')),
  CONSTRAINT chk_productos_stock CHECK (stock >= 0)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS ventas (
  id VARCHAR(100) NOT NULL,
  fecha_utc DATETIME(3) NOT NULL,
  metodo_pago VARCHAR(20) NOT NULL,
  subtotal DECIMAL(14, 2) NOT NULL,
  impuestos DECIMAL(14, 2) NOT NULL,
  total DECIMAL(14, 2) NOT NULL,
  PRIMARY KEY (id),
  KEY ix_ventas_fecha_utc (fecha_utc),
  CONSTRAINT chk_ventas_metodo_pago CHECK (metodo_pago IN ('efectivo', 'tarjeta')),
  CONSTRAINT chk_ventas_importes CHECK (
    subtotal >= 0 AND impuestos >= 0 AND total >= 0
  )
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS venta_detalles (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  venta_id VARCHAR(100) NOT NULL,
  producto_id VARCHAR(80) NOT NULL,
  producto_nombre VARCHAR(160) NOT NULL,
  producto_descripcion TEXT NOT NULL,
  producto_precio DECIMAL(12, 2) NOT NULL,
  producto_unidad VARCHAR(16) NOT NULL,
  producto_categoria VARCHAR(80) NOT NULL,
  producto_stock DECIMAL(12, 3) NOT NULL,
  producto_imagen VARCHAR(500) NOT NULL,
  cantidad DECIMAL(12, 3) NOT NULL,
  PRIMARY KEY (id),
  KEY ix_venta_detalles_venta_id (venta_id),
  KEY ix_venta_detalles_producto_id (producto_id),
  CONSTRAINT fk_venta_detalles_venta
    FOREIGN KEY (venta_id) REFERENCES ventas (id)
    ON UPDATE RESTRICT ON DELETE RESTRICT,
  CONSTRAINT chk_venta_detalles_cantidad CHECK (cantidad > 0),
  CONSTRAINT chk_venta_detalles_precio CHECK (producto_precio >= 0)
) ENGINE = InnoDB;
