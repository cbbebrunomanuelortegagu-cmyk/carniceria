export interface ReservationPackage {
  id: string;
  productId: string;
  pesoKg: number;
  demo: true;
}

export interface ReservationCartItem {
  packageId: string;
  productId: string;
  productName: string;
  pesoKg: number;
  precioKg: number;
  precioPaqueteBs: number;
  demo: true;
}
