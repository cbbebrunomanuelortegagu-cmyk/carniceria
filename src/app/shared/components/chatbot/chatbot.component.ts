import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../../../core/models/chat-message.model';
import {
  CHATBOT_GATEWAY,
  ChatbotService,
  UnconfiguredChatbotGateway
} from '../../../core/services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule],
  providers: [
    ChatbotService,
    { provide: CHATBOT_GATEWAY, useClass: UnconfiguredChatbotGateway }
  ],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  private readonly chatbot = inject(ChatbotService);
  @ViewChild('messageInput') private messageInput?: ElementRef<HTMLTextAreaElement>;

  readonly abierto = signal(false);
  readonly enviando = signal(false);
  readonly error = signal('');
  readonly borrador = signal('');
  readonly mensajes = signal<ChatMessage[]>([]);

  alternar(): void {
    this.abierto.update((abierto) => !abierto);
    if (this.abierto()) {
      setTimeout(() => this.messageInput?.nativeElement.focus());
    }
  }

  async enviar(): Promise<void> {
    const contenido = this.borrador().trim();
    if (!contenido || this.enviando()) return;

    this.error.set('');
    this.mensajes.update((mensajes) => [...mensajes, this.crearMensaje('user', contenido)]);
    this.borrador.set('');
    this.enviando.set(true);

    try {
      const respuesta = await this.chatbot.responder(this.mensajes());
      this.mensajes.update((mensajes) => [...mensajes, this.crearMensaje('assistant', respuesta)]);
    } catch (error) {
      this.error.set(
        error instanceof Error
          ? error.message
          : 'No se pudo obtener una respuesta. Inténtalo más tarde.'
      );
    } finally {
      this.enviando.set(false);
    }
  }

  private crearMensaje(role: ChatMessage['role'], content: string): ChatMessage {
    return {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      role,
      content,
      createdAt: new Date()
    };
  }
}
