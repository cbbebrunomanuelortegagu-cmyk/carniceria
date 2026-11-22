import { Component, OnInit, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeCoverService } from '../../core/services/home-cover.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {
  private readonly coverService = inject(HomeCoverService);
  private readonly platformId = inject(PLATFORM_ID);

  colorFondo = '#DDF3FF';
  imagenRuta: string | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.coverService.obtener().subscribe({
      next: (cover) => {
        this.colorFondo = cover.colorFondo || '#DDF3FF';
        this.imagenRuta = cover.imagenRuta;
      },
      error: () => {
        // Conserva el fondo celeste predeterminado si el catálogo no responde.
      }
    });
  }
}
