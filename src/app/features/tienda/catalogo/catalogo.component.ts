import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { CarritoService } from '../../../core/services/carrito.service';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/models/producto.model';

const CATEGORIAS = ['Todas', 'Res', 'Cerdo', 'Pollo', 'Embutidos'];

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent {
  private readonly productoService = inject(ProductoService);
  private readonly carritoService = inject(CarritoService);

  readonly categorias = CATEGORIAS;
  readonly categoriaActiva = signal('Todas');
  readonly busqueda = signal('');
  readonly mensajeError = signal('');
  readonly productoConError = signal('');
  private readonly cantidades = signal<Record<string, number>>({});
  readonly productosFiltrados = computed(() => {
    const categoria = this.categoriaActiva();
    const termino = this.busqueda().trim().toLocaleLowerCase();

    return this.productoService.productos().filter((producto) => {
      const coincideCategoria =
        categoria === 'Todas' || producto.categoria === categoria;
      const coincideBusqueda =
        termino.length === 0 ||
        `${producto.nombre} ${producto.descripcion} ${producto.categoria}`
          .toLocaleLowerCase()
          .includes(termino);
      return coincideCategoria && coincideBusqueda;
    });
  });

  cambiarCategoria(categoria: string): void {
    this.categoriaActiva.set(categoria);
  }

  cambiarBusqueda(event: Event): void {
    this.busqueda.set((event.target as HTMLInputElement).value);
  }

  cantidadSeleccionada(producto: Producto): number {
    return this.cantidades()[producto.id] ?? this.cantidadRapidaInicial(producto);
  }

  cantidadValida(producto: Producto): boolean {
    const cantidad = this.cantidadSeleccionada(producto);
    return Number.isFinite(cantidad) &&
      cantidad >= (producto.unidad === 'kg' ? 0.1 : 1) &&
      (producto.unidad === 'kg' || Number.isInteger(cantidad));
  }

  seleccionarCantidad(producto: Producto, cantidad: number): void {
    this.cantidades.update((actuales) => ({
      ...actuales,
      [producto.id]: cantidad
    }));
    this.mensajeError.set('');
    this.productoConError.set('');
  }

  cambiarCantidadPersonalizada(producto: Producto, event: Event): void {
    const valor = Number((event.target as HTMLInputElement).value);
    this.seleccionarCantidad(producto, Number.isFinite(valor) ? valor : 0);
  }

  stockDisponible(producto: Producto): number {
    const cantidadEnCarrito = this.carritoService.items()
      .filter((item) => item.producto.id === producto.id)
      .reduce((total, item) => total + item.cantidad, 0);
    return Math.max(0, producto.stock - cantidadEnCarrito);
  }

  agregarAlCarrito(producto: Producto): void {
    try {
      this.carritoService.agregarProducto(
        producto,
        this.cantidadSeleccionada(producto)
      );
      this.mensajeError.set('');
      this.productoConError.set('');
      this.carritoService.abrirDrawer();
    } catch (error) {
      this.productoConError.set(producto.id);
      this.mensajeError.set(
        error instanceof Error ? error.message : 'No se pudo añadir el producto.'
      );
    }
  }

  formatearCantidad(cantidad: number): string {
    return new Intl.NumberFormat('es', { maximumFractionDigits: 2 }).format(cantidad);
  }

  private cantidadRapidaInicial(producto: Producto): number {
    return producto.unidad === 'kg' ? 0.5 : 1;
  }
}
