import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CarritoDrawerComponent } from './shared/components/carrito-drawer/carrito-drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CarritoDrawerComponent, FooterComponent, NavbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'carniceria_proyecto';
}
