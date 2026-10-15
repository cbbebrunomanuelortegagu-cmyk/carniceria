import { Injectable, computed, inject, signal } from '@angular/core';
import { Carrito, ItemCarrito } from '../models/carrito.model';
import { Producto } from '../models/producto.model';
import { LocalStorageService } from './local-storage.service';

const CLAVE_CARRITO = 'carniceria-carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private readonly almacenamiento = inject(LocalStorageService);
  private readonly estado = signal<ItemCarrito[]>(
    this.almacenamiento.leer<ItemCarrito[]>(CLAVE_CARRITO) ?? []
  );

  readonly items = this.estado.asReadonly();
  readonly drawerAbierto = signal(false);
  readonly carrito = computed<Carrito>(() => {
    const items = this.estado();
    return {
      items,
      cantidadTotal: items.reduce((total, item) => total + item.cantidad, 0),
      total: items.reduce(
        (total, item) => total + item.producto.precio * item.cantidad,
        0
      )
    };
  });

  agregarProducto(producto: Producto, cantidad = 1): void {
    this.validarCantidad(cantidad);
    this.validarUnidad(cantidad, producto);
    const items = this.estado();
    const existente = items.find((item) => item.producto.id === producto.id);
    const cantidadTotal = (existente?.cantidad ?? 0) + cantidad;
    this.validarStock(producto, cantidadTotal);

    this.actualizarEstado(
      existente
        ? items.map((item) =>
            item.producto.id === producto.id
              ? { ...item, cantidad: item.cantidad + cantidad }
              : item
          )
        : [...items, { producto, cantidad }]
    );
  }

  actualizarCantidad(productoId: string, cantidad: number): void {
    this.validarCantidad(cantidad);
    const item = this.estado().find((actual) => actual.producto.id === productoId);
    if (!item) {
      return;
    }
    this.validarUnidad(cantidad, item.producto);
    this.validarStock(item.producto, cantidad);

    this.actualizarEstado(
      this.estado().map((item) =>
        item.producto.id === productoId ? { ...item, cantidad } : item
      )
    );
  }

  quitarProducto(productoId: string): void {
    this.actualizarEstado(
      this.estado().filter((item) => item.producto.id !== productoId)
    );
  }

  vaciarCarrito(): void {
    this.actualizarEstado([]);
  }

  abrirDrawer(): void {
    this.drawerAbierto.set(true);
  }

  cerrarDrawer(): void {
    this.drawerAbierto.set(false);
  }

  private validarCantidad(cantidad: number): void {
    if (!Number.isFinite(cantidad) || cantidad <= 0) {
      throw new RangeError('La cantidad debe ser un número mayor que cero.');
    }
  }

  private validarStock(producto: Producto, cantidad: number): void {
    if (cantidad > producto.stock) {
      throw new RangeError(
        `Solo hay ${producto.stock} ${producto.unidad} disponibles de ${producto.nombre}.`
      );
    }
  }

  private validarUnidad(cantidad: number, producto: Producto): void {
    if (producto.unidad === 'unidad' && !Number.isInteger(cantidad)) {
      throw new RangeError(
        `La cantidad de ${producto.nombre} debe expresarse en unidades enteras.`
      );
    }
  }

  private actualizarEstado(items: ItemCarrito[]): void {
    this.estado.set(items);
    this.almacenamiento.guardar(CLAVE_CARRITO, items);
  }
}
