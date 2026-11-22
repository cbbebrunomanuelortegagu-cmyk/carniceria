import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { paquetesDemostracion } from '../../core/data/demo-packages.data';
import { PublicProduct } from '../../core/models/public-product.model';
import { ReservationPackage } from '../../core/models/reservation-package.model';
import { CatalogoPublicoService } from '../../core/services/catalogo-publico.service';
import { ReservationCartService } from '../../core/services/reservation-cart.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent implements OnInit {
  private readonly cart = inject(ReservationCartService);
  private readonly catalogo = inject(CatalogoPublicoService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly productos = signal<PublicProduct[]>([]);
  readonly productId = signal('');
  readonly cargando = signal(true);
  readonly error = signal('');
  readonly aviso = signal('');
  readonly productoSeleccionado = computed(
    () => this.productos().find((producto) => producto.id === this.productId())
  );
  readonly paquetes = computed(() => {
    const producto = this.productoSeleccionado();
    return producto ? paquetesDemostracion(producto) : [];
  });
  readonly seleccionados = this.cart.items;

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.catalogo.listar().subscribe({
      next: (productos) => {
        this.productos.set(productos);
        this.productId.set(productos[0]?.id ?? '');
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el catálogo. Intenta nuevamente más tarde.');
        this.cargando.set(false);
      }
    });
  }

  cambiarProducto(event: Event): void {
    this.productId.set((event.target as HTMLSelectElement).value);
    this.aviso.set('');
  }

  estaEnCarrito(paquete: ReservationPackage): boolean {
    return this.cart.items().some((item) => item.packageId === paquete.id);
  }

  alternarPaquete(paquete: ReservationPackage): void {
    const producto = this.productoSeleccionado();
    if (!producto) return;

    if (this.estaEnCarrito(paquete)) {
      this.cart.quitar(paquete.id);
      this.aviso.set('Paquete quitado del carrito.');
    } else if (this.cart.agregar(paquete, producto)) {
      this.aviso.set('Paquete agregado al carrito.');
    }
  }

  grupo(pesoKg: number): 'small' | 'medium' | 'large' {
    if (pesoKg < 1) return 'small';
    if (pesoKg <= 2) return 'medium';
    return 'large';
  }

  paquetesPorGrupo(grupo: 'small' | 'medium' | 'large'): ReservationPackage[] {
    return this.paquetes().filter((paquete) => this.grupo(paquete.pesoKg) === grupo);
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

  precioPaquete(paquete: ReservationPackage): number {
    const precioKg = this.productoSeleccionado()?.precio ?? 0;
    return Math.round((precioKg * paquete.pesoKg + Number.EPSILON) * 100) / 100;
  }

  get precioReferencia(): string {
    const producto: PublicProduct | undefined = this.productoSeleccionado();
    return producto?.unidadPrecio === 'kg'
      ? `${producto.moneda} ${producto.precio} / kg`
      : `${producto?.moneda ?? 'Bs'} ${producto?.precio ?? 0} / pack`;
  }
}
