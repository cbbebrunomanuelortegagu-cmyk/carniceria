import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CarritoService } from '../../../core/services/carrito.service';
import { ReservationCartService } from '../../../core/services/reservation-cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private readonly router = inject(Router);
  private readonly carritoService = inject(CarritoService);
  private readonly reservationCart = inject(ReservationCartService);

  readonly cantidadCarrito = computed(
    () => this.carritoService.carrito().items.length
  );
  readonly paquetesReserva = this.reservationCart.cantidadPaquetes;
  menuAbierto = false;

  esTiendaHeredada(): boolean {
    return this.router.url.split(/[?#]/)[0] === '/tienda';
  }

  alternarMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }

  abrirCarrito(): void {
    this.cerrarMenu();
    this.carritoService.abrirDrawer();
  }
}
