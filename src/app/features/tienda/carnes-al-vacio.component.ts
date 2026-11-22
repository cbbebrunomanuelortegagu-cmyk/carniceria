import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { PublicProduct } from '../../core/models/public-product.model';
import { CatalogoPublicoService } from '../../core/services/catalogo-publico.service';

@Component({
  selector: 'app-carnes-al-vacio',
  standalone: true,
  templateUrl: './carnes-al-vacio.component.html',
  styleUrl: './carnes-al-vacio.component.scss'
})
export class CarnesAlVacioComponent implements OnInit {
  private readonly catalogo = inject(CatalogoPublicoService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly productos = signal<PublicProduct[]>([]);
  readonly cargando = signal(true);
  readonly error = signal('');

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.catalogo.listar().subscribe({
      next: (productos) => {
        this.productos.set(productos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el catálogo. Intenta nuevamente más tarde.');
        this.cargando.set(false);
      }
    });
  }
}
