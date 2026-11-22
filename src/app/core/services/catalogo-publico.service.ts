import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicProduct } from '../models/public-product.model';

@Injectable({ providedIn: 'root' })
export class CatalogoPublicoService {
  private readonly http = inject(HttpClient);

  listar(): Observable<PublicProduct[]> {
    return this.http.get<PublicProduct[]>('/api/catalogo-publico');
  }
}
