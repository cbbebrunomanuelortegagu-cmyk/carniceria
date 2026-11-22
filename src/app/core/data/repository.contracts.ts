import { ItemCarrito } from '../models/carrito.model';
import { Producto } from '../models/producto.model';
import { MetodoPago, Venta } from '../models/venta.model';

/** Contratos para conectar repositorios cuando se entregue el esquema real. */
export interface ProductoRepository {
  listar(): Promise<Producto[]>;
  obtenerPorId(id: string): Promise<Producto | undefined>;
}

export interface VentaRepository {
  listar(): Promise<Venta[]>;
  obtenerPorId(id: string): Promise<Venta | undefined>;
  registrar(items: ItemCarrito[], metodoPago: MetodoPago): Promise<Venta>;
}
