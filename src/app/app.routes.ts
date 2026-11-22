import { Routes } from '@angular/router';
import { CatalogoComponent } from './features/tienda/catalogo/catalogo.component';
import { PosMostradorComponent } from './features/ventas/pos-mostrador/pos-mostrador.component';
import { InicioComponent } from './features/inicio/inicio.component';
import { CarnesAlVacioComponent } from './features/tienda/carnes-al-vacio.component';
import { PedidosComponent } from './features/pedidos/pedidos.component';
import { CarritoReservasComponent } from './features/pedidos/carrito-reservas.component';
import { NosotrosComponent } from './features/nosotros/nosotros.component';
import { SociosComponent } from './features/socios/socios.component';
import { GraciasComponent } from './features/pedidos/gracias.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: 'inicio', component: InicioComponent, title: 'Inicio | EdenFarm' },
  { path: 'carnes-al-vacio', component: CarnesAlVacioComponent, title: 'Carnes al vacío | EdenFarm' },
  { path: 'pedidos', component: PedidosComponent, title: 'Pedidos / Reservas | EdenFarm' },
  { path: 'carrito-reservas', component: CarritoReservasComponent, title: 'Carrito de pedidos | EdenFarm' },
  { path: 'gracias', component: GraciasComponent, title: 'Gracias por su compra | EdenFarm' },
  { path: 'nosotros', component: NosotrosComponent, title: 'Nosotros | EdenFarm' },
  { path: 'socios', component: SociosComponent, title: 'Sé socio | EdenFarm' },
  { path: 'tienda', component: CatalogoComponent, title: 'Tienda Virtual | EdenFarm' },
  { path: 'ventas', component: PosMostradorComponent, title: 'Punto de Venta | EdenFarm' },
  { path: '**', redirectTo: 'inicio' }
];
