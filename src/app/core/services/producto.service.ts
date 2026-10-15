import { Injectable, inject, signal } from '@angular/core';
import { ItemCarrito } from '../models/carrito.model';
import { PRODUCTOS } from '../mock/productos.data';
import { Producto } from '../models/producto.model';
import { LocalStorageService } from './local-storage.service';

const CLAVE_PRODUCTOS = 'carniceria-productos';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private readonly almacenamiento = inject(LocalStorageService);
  private readonly productosGuardados =
    this.almacenamiento.leer<Producto[]>(CLAVE_PRODUCTOS);
  private readonly estado = signal<Producto[]>(
    this.productosGuardados ?? PRODUCTOS
  );

  readonly productos = this.estado.asReadonly();

  constructor() {
    if (this.productosGuardados === null) {
      this.almacenamiento.guardar(CLAVE_PRODUCTOS, this.estado());
    }
  }

  obtenerPorId(id: string): Producto | undefined {
    return this.estado().find((producto) => producto.id === id);
  }

  guardarProducto(producto: Producto): void {
    const existe = this.estado().some((actual) => actual.id === producto.id);
    const productos = existe
      ? this.estado().map((actual) =>
          actual.id === producto.id ? producto : actual
        )
      : [...this.estado(), producto];

    this.estado.set(productos);
    this.almacenamiento.guardar(CLAVE_PRODUCTOS, productos);
  }

  descontarStock(items: ItemCarrito[]): void {
    const cantidades = new Map<string, number>();
    for (const item of items) {
      if (!Number.isFinite(item.cantidad) || item.cantidad <= 0) {
        throw new RangeError('La cantidad de cada producto debe ser mayor que cero.');
      }
      cantidades.set(
        item.producto.id,
        (cantidades.get(item.producto.id) ?? 0) + item.cantidad
      );
    }

    const productosActuales = this.estado();
    for (const [productoId, cantidad] of cantidades) {
      const producto = productosActuales.find((actual) => actual.id === productoId);
      if (!producto) {
        throw new Error(`No se encontró el producto ${productoId}.`);
      }
      if (cantidad > producto.stock) {
        throw new RangeError(
          `Stock insuficiente para ${producto.nombre}. Disponibles: ${producto.stock} ${producto.unidad}.`
        );
      }
    }

    const productosActualizados = productosActuales.map((producto) => {
      const cantidad = cantidades.get(producto.id) ?? 0;
      return cantidad === 0
        ? producto
        : { ...producto, stock: producto.stock - cantidad };
    });
    this.almacenamiento.guardar(CLAVE_PRODUCTOS, productosActualizados);
    this.estado.set(productosActualizados);
  }

  eliminarProducto(id: string): void {
    const productos = this.estado().filter((producto) => producto.id !== id);
    this.estado.set(productos);
    this.almacenamiento.guardar(CLAVE_PRODUCTOS, productos);
  }
}
