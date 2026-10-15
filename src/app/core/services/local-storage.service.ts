import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  leer<T>(clave: string): T | null {
    if (!this.isBrowser) {
      return null;
    }

    const valor = localStorage.getItem(clave);
    if (valor === null) {
      return null;
    }

    try {
      return JSON.parse(valor) as T;
    } catch {
      throw new Error(`No se pudo leer la información almacenada para "${clave}".`);
    }
  }

  guardar<T>(clave: string, valor: T): void {
    if (this.isBrowser) {
      localStorage.setItem(clave, JSON.stringify(valor));
    }
  }
}
