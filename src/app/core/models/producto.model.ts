export type UnidadProducto = 'kg' | 'unidad';

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  unidad: UnidadProducto;
  categoria: string;
  stock: number;
  imagen: string;
}
