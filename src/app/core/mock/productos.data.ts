import { Producto } from '../models/producto.model';

export const PRODUCTOS: Producto[] = [
  {
    id: 'res-lomo',
    nombre: 'Lomo de Res',
    descripcion: 'Corte magro y tierno, ideal para asar o preparar a la plancha.',
    precio: 18.9,
    unidad: 'kg',
    categoria: 'Res',
    stock: 24,
    imagen: 'assets/images/productos/res.svg'
  },
  {
    id: 'cerdo-costilla',
    nombre: 'Costilla de Cerdo',
    descripcion: 'Costilla fresca, perfecta para asar o cocinar lentamente.',
    precio: 9.75,
    unidad: 'kg',
    categoria: 'Cerdo',
    stock: 18,
    imagen: 'assets/images/productos/cerdo.svg'
  },
  {
    id: 'pollo-pechuga',
    nombre: 'Pechuga de Pollo',
    descripcion: 'Pechuga fresca sin hueso, versátil y fácil de preparar.',
    precio: 7.5,
    unidad: 'kg',
    categoria: 'Pollo',
    stock: 32,
    imagen: 'assets/images/productos/pollo.svg'
  },
  {
    id: 'embutido-chorizo',
    nombre: 'Chorizo',
    descripcion: 'Chorizo de cerdo sazonado, elaborado para asar o guisar.',
    precio: 8.25,
    unidad: 'kg',
    categoria: 'Embutidos',
    stock: 14,
    imagen: 'assets/images/productos/embutido.svg'
  },
  {
    id: 'res-carne-molida',
    nombre: 'Carne Molida de Res',
    descripcion: 'Carne molida fresca, adecuada para hamburguesas y guisos.',
    precio: 10.5,
    unidad: 'kg',
    categoria: 'Res',
    stock: 20,
    imagen: 'assets/images/productos/res.svg'
  },
  {
    id: 'cerdo-lomo',
    nombre: 'Lomo de Cerdo',
    descripcion: 'Corte de cerdo suave y magro para horno o sartén.',
    precio: 8.9,
    unidad: 'kg',
    categoria: 'Cerdo',
    stock: 16,
    imagen: 'assets/images/productos/cerdo.svg'
  },
  {
    id: 'pollo-muslo',
    nombre: 'Muslo de Pollo',
    descripcion: 'Muslo de pollo fresco, con piel y hueso.',
    precio: 5.8,
    unidad: 'kg',
    categoria: 'Pollo',
    stock: 26,
    imagen: 'assets/images/productos/pollo.svg'
  },
  {
    id: 'res-higado',
    nombre: 'Hígado de Res',
    descripcion: 'Hígado de res fresco, vendido por pieza.',
    precio: 3.25,
    unidad: 'unidad',
    categoria: 'Res',
    stock: 12,
    imagen: 'assets/images/productos/res.svg'
  }
];
