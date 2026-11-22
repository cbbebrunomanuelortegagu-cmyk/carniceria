import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-gracias',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './gracias.component.html',
  styleUrl: './gracias.component.scss'
})
export class GraciasComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private redirectTimer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    if (this.isBrowser) {
      this.redirectTimer = setTimeout(() => {
        void this.router.navigateByUrl('/inicio');
      }, 4000);
    }
  }

  ngOnDestroy(): void {
    if (this.redirectTimer) clearTimeout(this.redirectTimer);
  }
}
