import { Injectable, computed, signal } from '@angular/core';
import { PublicProduct } from '../models/public-product.model';
import {
  ReservationCartItem,
  ReservationPackage
} from '../models/reservation-package.model';

@Injectable({ providedIn: 'root' })
export class ReservationCartService {
  private readonly state = signal<ReservationCartItem[]>([]);

  readonly items = this.state.asReadonly();
  readonly cantidadPaquetes = computed(() => this.state().length);
  readonly totalEstimadoBs = computed(() =>
    this.state().reduce((total, item) => total + item.precioPaqueteBs, 0)
  );

  agregar(paquete: ReservationPackage, producto: PublicProduct): boolean {
    if (this.state().some((item) => item.packageId === paquete.id)) return false;
    if (paquete.productId !== producto.id || producto.unidadPrecio !== 'kg') return false;

    const precioPaqueteBs = Math.round(
      (producto.precio * paquete.pesoKg + Number.EPSILON) * 100
    ) / 100;

    this.state.update((items) => [
      ...items,
      {
        packageId: paquete.id,
        productId: producto.id,
        productName: producto.nombre,
        pesoKg: paquete.pesoKg,
        precioKg: producto.precio,
        precioPaqueteBs,
        demo: true
      }
    ]);
    return true;
  }

  quitar(packageId: string): void {
    this.state.update((items) => items.filter((item) => item.packageId !== packageId));
  }

  /** Se invocará únicamente cuando exista una confirmación de pago exitosa. */
  vaciar(): void {
    this.state.set([]);
  }
}
