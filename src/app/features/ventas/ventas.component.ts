import { Component } from '@angular/core';

@Component({
  selector: 'app-ventas',
  standalone: true,
  template: `
    <section class="page-intro" aria-labelledby="page-title">
      <p class="eyebrow">Punto de venta</p>
      <h1 id="page-title">Registro de Ventas (POS)</h1>
      <p>Registra y consulta las ventas de La Selecta.</p>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      padding: clamp(3rem, 8vw, 6rem) 1.25rem;
    }

    .page-intro {
      width: min(100%, 900px);
      margin: 0 auto;
      text-align: center;
    }

    .eyebrow {
      margin: 0 0 0.75rem;
      color: #8c382d;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0;
      color: #273b2d;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: clamp(2.25rem, 6vw, 3.5rem);
    }

    .page-intro > p:last-child {
      margin: 1rem 0 0;
      color: #62665f;
      font-size: 1.05rem;
    }
  `]
})
export class VentasComponent {}
