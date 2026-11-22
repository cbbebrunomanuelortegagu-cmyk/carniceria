import { PublicProduct } from '../models/public-product.model';
import { ReservationPackage } from '../models/reservation-package.model';

/** Pesos ilustrativos autorizados solo para demostración visual; no son inventario. */
export const PESOS_DEMO_KG = [0.85, 1.25, 2.3] as const;

export function paquetesDemostracion(producto: PublicProduct): ReservationPackage[] {
  if (producto.unidadPrecio !== 'kg') return [];
  return PESOS_DEMO_KG.map((pesoKg) => ({
    id: `demo-${producto.id}-${pesoKg.toString().replace('.', '-')}`,
    productId: producto.id,
    pesoKg,
    demo: true
  }));
}
