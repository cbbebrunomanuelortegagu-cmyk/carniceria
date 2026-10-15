import { CurrencyPipe } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItemCarrito } from '../../../core/models/carrito.model';
import { CarritoService } from '../../../core/services/carrito.service';

@Component({
  selector: 'app-carrito-drawer',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './carrito-drawer.component.html',
  styleUrl: './carrito-drawer.component.scss'
})
export class CarritoDrawerComponent {
  private readonly carritoService = inject(CarritoService);

  readonly abierto = this.carritoService.drawerAbierto;
  readonly carrito = this.carritoService.carrito;
  readonly mensajeError = signal('');

  cerrar(): void {
    this.carritoService.cerrarDrawer();
    this.mensajeError.set('');
  }

  quitar(productoId: string): void {
    this.carritoService.quitarProducto(productoId);
    this.mensajeError.set('');
  }

  cambiarCantidad(item: ItemCarrito, incremento: number): void {
    const nuevaCantidad = item.cantidad + incremento;
    if (nuevaCantidad <= 0) {
      this.quitar(item.producto.id);
      return;
    }

    try {
      this.carritoService.actualizarCantidad(item.producto.id, nuevaCantidad);
      this.mensajeError.set('');
    } catch (error) {
      this.mensajeError.set(
        error instanceof Error ? error.message : 'No se pudo actualizar la cantidad.'
      );
    }
  }

  paso(item: ItemCarrito): number {
    return item.producto.unidad === 'kg' ? 0.5 : 1;
  }

  puedeAumentar(item: ItemCarrito): boolean {
    return item.cantidad + this.paso(item) <= item.producto.stock;
  }

  formatearCantidad(cantidad: number): string {
    return new Intl.NumberFormat('es', { maximumFractionDigits: 2 }).format(cantidad);
  }

  @HostListener('document:keydown.escape')
  cerrarConEscape(): void {
    if (this.abierto()) {
      this.cerrar();
    }
  }
}
