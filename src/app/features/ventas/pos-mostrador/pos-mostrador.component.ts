import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ItemCarrito } from '../../../core/models/carrito.model';
import { MetodoPago } from '../../../core/models/venta.model';
import { Producto } from '../../../core/models/producto.model';
import { ProductoService } from '../../../core/services/producto.service';
import { VentaService } from '../../../core/services/venta.service';

const CATEGORIAS = ['Todas', 'Res', 'Cerdo', 'Pollo', 'Embutidos'];
const TASA_IMPUESTO = 0;

@Component({
  selector: 'app-pos-mostrador',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './pos-mostrador.component.html',
  styleUrl: './pos-mostrador.component.scss'
})
export class PosMostradorComponent {
  private readonly productoService = inject(ProductoService);
  private readonly ventaService = inject(VentaService);

  readonly categorias = CATEGORIAS;
  readonly categoriaActiva = signal('Todas');
  readonly busqueda = signal('');
  readonly items = signal<ItemCarrito[]>([]);
  readonly mensajeError = signal('');
  readonly confirmacion = signal('');
  readonly procesando = signal(false);
  readonly tasaImpuesto = TASA_IMPUESTO;
  readonly productosFiltrados = computed(() => {
    const categoria = this.categoriaActiva();
    const termino = this.busqueda().trim().toLocaleLowerCase();

    return this.productoService.productos().filter((producto) => {
      const coincideCategoria =
        categoria === 'Todas' || producto.categoria === categoria;
      const coincideBusqueda =
        termino.length === 0 ||
        `${producto.nombre} ${producto.categoria}`
          .toLocaleLowerCase()
          .includes(termino);
      return coincideCategoria && coincideBusqueda;
    });
  });
  readonly subtotal = computed(() =>
    this.items().reduce(
      (total, item) => total + item.producto.precio * item.cantidad,
      0
    )
  );
  readonly impuestos = computed(() => this.subtotal() * this.tasaImpuesto);
  readonly total = computed(() => this.subtotal() + this.impuestos());

  cambiarCategoria(categoria: string): void {
    this.categoriaActiva.set(categoria);
  }

  cambiarBusqueda(event: Event): void {
    this.busqueda.set((event.target as HTMLInputElement).value);
  }

  cantidadDisponible(producto: Producto): number {
    const cantidadEnVenta = this.items()
      .filter((item) => item.producto.id === producto.id)
      .reduce((total, item) => total + item.cantidad, 0);
    return Math.max(0, producto.stock - cantidadEnVenta);
  }

  agregarProducto(producto: Producto): void {
    const cantidad = this.paso(producto);
    if (this.cantidadDisponible(producto) < cantidad) {
      return;
    }

    const existente = this.items().find(
      (item) => item.producto.id === producto.id
    );
    this.items.update((items) =>
      existente
        ? items.map((item) =>
            item.producto.id === producto.id
              ? { ...item, cantidad: item.cantidad + cantidad }
              : item
          )
        : [...items, { producto, cantidad }]
    );
    this.mensajeError.set('');
    this.confirmacion.set('');
  }

  cambiarCantidad(item: ItemCarrito, incremento: number): void {
    const nuevaCantidad = item.cantidad + incremento;
    if (nuevaCantidad <= 0) {
      this.quitarProducto(item.producto.id);
      return;
    }
    if (nuevaCantidad > item.producto.stock) {
      return;
    }

    this.items.update((items) =>
      items.map((actual) =>
        actual.producto.id === item.producto.id
          ? { ...actual, cantidad: nuevaCantidad }
          : actual
      )
    );
    this.mensajeError.set('');
  }

  quitarProducto(productoId: string): void {
    this.items.update((items) =>
      items.filter((item) => item.producto.id !== productoId)
    );
    this.mensajeError.set('');
  }

  paso(producto: Producto): number {
    return producto.unidad === 'kg' ? 0.5 : 1;
  }

  completarVenta(metodoPago: MetodoPago): void {
    if (this.items().length === 0 || this.procesando()) {
      return;
    }

    this.procesando.set(true);
    this.mensajeError.set('');
    try {
      this.productoService.descontarStock(this.items());
      const venta = this.ventaService.registrarVenta(
        this.items(),
        metodoPago
      );
      this.items.set([]);
      this.confirmacion.set(
        `Venta completada por ${venta.total.toLocaleString('es', {
          style: 'currency',
          currency: 'USD'
        })} con ${metodoPago}.`
      );
    } catch (error) {
      this.mensajeError.set(
        error instanceof Error
          ? error.message
          : 'No se pudo completar la venta. Intenta nuevamente.'
      );
    } finally {
      this.procesando.set(false);
    }
  }

  formatearCantidad(cantidad: number): string {
    return new Intl.NumberFormat('es', { maximumFractionDigits: 2 }).format(
      cantidad
    );
  }
}
