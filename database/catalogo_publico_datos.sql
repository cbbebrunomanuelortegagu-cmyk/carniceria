-- Carga inicial autorizada para productos_publicos.
-- Ejecutar una sola vez después de catalogo_publico.sql.
-- INSERT simple: si ya existe algún identificador, MySQL lo reportará
-- en vez de sobrescribir silenciosamente el dato existente.

USE edenfarm;

INSERT INTO productos_publicos (id, nombre, precio, unidad_precio, moneda) VALUES
  ('punta-de-s', 'Punta de S', 115.00, 'kg', 'Bs'),
  ('lomo', 'Lomo', 104.00, 'kg', 'Bs'),
  ('ojo-de-bife', 'Ojo de bife', 104.00, 'kg', 'Bs'),
  ('colita-de-cuadril', 'Colita de cuadril', 94.00, 'kg', 'Bs'),
  ('pollerita', 'Pollerita', 70.00, 'kg', 'Bs'),
  ('lomito', 'Lomito', 105.00, 'kg', 'Bs'),
  ('bollo-grande', 'Bollo grande', 90.00, 'kg', 'Bs'),
  ('keperi', 'Keperi', 87.00, 'kg', 'Bs'),
  ('peceto', 'Peceto', 87.00, 'kg', 'Bs'),
  ('molida-1ra', 'Molida 1ra', 84.00, 'kg', 'Bs'),
  ('molida-2da', 'Molida 2da', 78.00, 'kg', 'Bs'),
  ('jiba', 'Jiba', 80.00, 'kg', 'Bs'),
  ('chorizo-picante', 'Chorizo picante', 60.00, 'kg', 'Bs'),
  ('chorizo-normal', 'Chorizo normal', 60.00, 'kg', 'Bs'),
  ('chorizo-con-queso', 'Chorizo con queso', 60.00, 'kg', 'Bs'),
  ('hamburguesa', 'Hamburguesa', 60.00, 'pack', 'Bs'),
  ('milanesa', 'Milanesa', 80.00, 'kg', 'Bs');
