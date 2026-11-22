export type PublicProductUnit = 'kg' | 'pack';

/** Información autorizada para el catálogo público; separada del modelo del POS. */
export interface PublicProduct {
  id: string;
  nombre: string;
  precio: number;
  unidadPrecio: PublicProductUnit;
  moneda: string;
  imagenRuta: string | null;
}
