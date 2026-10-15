import { ItemCarrito } from './carrito.model';

export type MetodoPago = 'efectivo' | 'tarjeta';

export interface Venta {
  id: string;
  fecha: string;
  items: ItemCarrito[];
  metodoPago: MetodoPago;
  subtotal: number;
  impuestos: number;
  total: number;
}
