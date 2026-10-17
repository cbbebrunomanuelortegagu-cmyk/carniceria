import { Routes } from '@angular/router';
import { CatalogoComponent } from './features/tienda/catalogo/catalogo.component';
import { PosMostradorComponent } from './features/ventas/pos-mostrador/pos-mostrador.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tienda' },
  { path: 'tienda', component: CatalogoComponent, title: 'Tienda Virtual | EdenFarm' },
  { path: 'ventas', component: PosMostradorComponent, title: 'Punto de Venta | EdenFarm' },
  { path: '**', redirectTo: 'tienda' }
];
