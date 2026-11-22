import { Injectable, inject } from '@angular/core';
import { ChatbotIntentKind, ChatbotQuery } from '../models/chatbot-intent.model';
import { ChatbotNormalizerService } from './chatbot-normalizer.service';

@Injectable({ providedIn: 'root' })
export class ChatbotIntentDetectorService {
  private readonly normalizer = inject(ChatbotNormalizerService);

  detectar(texto: string): ChatbotQuery {
    const normalizedText = this.normalizer.normalizar(texto);
    const intent = this.detectarIntencion(normalizedText);
    return { intent, originalText: texto, normalizedText };
  }

  private detectarIntencion(texto: string): ChatbotIntentKind {
    if (/\b(ubicacion|direccion|donde estan|donde queda)\b/.test(texto)) return 'location';
    if (/\b(socio|socios|ser socio|hacerme socio)\b/.test(texto)) return 'partner_information';
    if (/\b(reservar|reserva|pedido|pedidos|como compro|como pido)\b/.test(texto)) return 'reservation_instructions';
    if (/\b(paquete|paquetes|peso|pesos|disponible|disponibilidad)\b/.test(texto)) return 'package_availability';
    if (/\b(precio|cuesta|costo|vale)\b/.test(texto)) return 'product_price';
    if (/\b(carne|carnes|producto|productos|catalogo|tienen)\b/.test(texto)) return 'catalog';
    return 'unknown';
  }
}
