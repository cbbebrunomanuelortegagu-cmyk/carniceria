import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeCover } from '../models/home-cover.model';

@Injectable({ providedIn: 'root' })
export class HomeCoverService {
  private readonly http = inject(HttpClient);

  obtener(): Observable<HomeCover> {
    return this.http.get<HomeCover>('/api/configuracion-portada');
  }
}
