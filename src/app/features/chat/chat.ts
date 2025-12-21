// src/app/features/chat/chat.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBarComponent } from '../chat-bar/chat-bar';

interface Message {
  from: 'bot' | 'user';
  text: string;
  time: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ChatBarComponent],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class ChatComponent {
  messages: Message[] = [
    {
      from: 'bot',
      text: "Bonjour ! Je suis ton coach nutrition IA. Comment puis-je t'aider aujourd'hui ? 🌟",
      time: '21:33',
    },
  ];

  suggestions = [
    'Adapter mon plan du jour',
    'Moins de calories le soir',
    'Plus de plats marocains',
    'Recettes végétariennes',
  ];

  input = '';

  // appelé quand la ChatBar émet un message
  onSendFromBar(text: string): void {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    const now = new Date();
    const time = now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // message utilisateur
    this.messages.push({ from: 'user', text: trimmed, time });

    // réponse bot placeholder
    this.messages.push({
      from: 'bot',
      text: "Merci pour ta question ! Bientôt je répondrai avec une vraie IA connectée à ton profil nutrition 😉.",
      time,
    });
  }
}
