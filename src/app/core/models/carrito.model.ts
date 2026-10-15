import { Producto } from './producto.model';

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

export interface Carrito {
  items: ItemCarrito[];
  cantidadTotal: number;
  total: number;
}
