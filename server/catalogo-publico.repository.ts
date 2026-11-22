import { RowDataPacket } from 'mysql2';
import { getDatabasePool } from './database';

export interface ProductoPublicoRecord {
  id: string;
  nombre: string;
  precio: number;
  unidadPrecio: 'kg' | 'pack';
  moneda: string;
}

interface ProductoPublicoRow extends RowDataPacket {
  id: string;
  nombre: string;
  precio: string | number;
  unidad_precio: 'kg' | 'pack';
  moneda: string;
  imagen_ruta: string | null;
}

export async function listarCatalogoPublico(): Promise<ProductoPublicoRecord[]> {
  const [rows] = await getDatabasePool().execute<ProductoPublicoRow[]>(
    'SELECT id, nombre, precio, unidad_precio, moneda, imagen_ruta FROM productos_publicos ORDER BY nombre'
  );

  return rows.map((row) => ({
    id: row.id,
    nombre: row.nombre,
    precio: Number(row.precio),
    unidadPrecio: row.unidad_precio,
    moneda: row.moneda,
    imagenRuta: row.imagen_ruta
  }));
}
