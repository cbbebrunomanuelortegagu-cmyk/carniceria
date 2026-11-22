import { InjectionToken, Injectable, inject } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';
import { ChatbotQuery } from '../models/chatbot-intent.model';
import { ChatbotIntentDetectorService } from './chatbot-intent-detector.service';

export interface ChatbotGateway {
  consultar(query: ChatbotQuery, history: readonly ChatMessage[]): Promise<string>;
}

export const CHATBOT_GATEWAY = new InjectionToken<ChatbotGateway>('CHATBOT_GATEWAY');

/** Adaptador explícito hasta que se configure un proveedor real. */
@Injectable({ providedIn: 'root' })
export class UnconfiguredChatbotGateway implements ChatbotGateway {
  async consultar(_query: ChatbotQuery, _history: readonly ChatMessage[]): Promise<string> {
    throw new Error(
      'Aún no hay una fuente de información conectada. No puedo confirmar datos comerciales por ahora.'
    );
  }
}

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private readonly gateway = inject(CHATBOT_GATEWAY);
  private readonly intentDetector = inject(ChatbotIntentDetectorService);

  responder(history: readonly ChatMessage[]): Promise<string> {
    const lastMessage = [...history].reverse().find((message) => message.role === 'user');
    const query = this.intentDetector.detectar(lastMessage?.content ?? '');
    return this.gateway.consultar(query, history);
  }
}
