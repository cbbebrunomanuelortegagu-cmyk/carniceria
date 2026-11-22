import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReservationCartService } from '../../core/services/reservation-cart.service';

@Component({
  selector: 'app-carrito-reservas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './carrito-reservas.component.html',
  styleUrl: './carrito-reservas.component.scss'
})
export class CarritoReservasComponent {
  readonly cart = inject(ReservationCartService);
  private readonly router = inject(Router);

  pagarDemostracion(): void {
    if (this.cart.items().length === 0) return;
    this.cart.vaciar();
    void this.router.navigateByUrl('/gracias');
  }

  formatearPeso(pesoKg: number): string {
    return `${pesoKg.toFixed(3)} kg`;
  }

  formatearBs(importe: number): string {
    return `Bs ${new Intl.NumberFormat('es-BO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(importe)}`;
  }
}
