import { Injectable, inject, signal } from '@angular/core';
import { ItemCarrito } from '../models/carrito.model';
import { MetodoPago, Venta } from '../models/venta.model';
import { LocalStorageService } from './local-storage.service';

const CLAVE_VENTAS = 'carniceria-ventas';
const TASA_IMPUESTO = 0;

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private readonly almacenamiento = inject(LocalStorageService);
  private readonly estado = signal<Venta[]>(
    this.almacenamiento.leer<Venta[]>(CLAVE_VENTAS) ?? []
  );

  readonly ventas = this.estado.asReadonly();

  registrarVenta(
    items: ItemCarrito[],
    metodoPago: MetodoPago = 'efectivo'
  ): Venta {
    if (items.length === 0) {
      throw new Error('No se puede registrar una venta sin productos.');
    }
    if (
      items.some(
        (item) => !Number.isFinite(item.cantidad) || item.cantidad <= 0
      )
    ) {
      throw new RangeError('La cantidad de cada producto debe ser mayor que cero.');
    }

    const productosVendidos = items.map((item) => ({
      producto: { ...item.producto },
      cantidad: item.cantidad
    }));
    const subtotal = productosVendidos.reduce(
      (total, item) => total + item.producto.precio * item.cantidad,
      0
    );
    const impuestos = subtotal * TASA_IMPUESTO;
    const venta: Venta = {
      id: `venta-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      fecha: new Date().toISOString(),
      items: productosVendidos,
      metodoPago,
      subtotal,
      impuestos,
      total: subtotal + impuestos
    };

    const ventas = [...this.estado(), venta];
    this.estado.set(ventas);
    this.almacenamiento.guardar(CLAVE_VENTAS, ventas);
    return venta;
  }

  obtenerPorId(id: string): Venta | undefined {
    return this.estado().find((venta) => venta.id === id);
  }
}
