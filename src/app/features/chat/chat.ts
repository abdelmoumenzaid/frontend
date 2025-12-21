// src/app/features/chat/chat.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  from: 'bot' | 'user';
  text: string;
  time: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class ChatComponent {
  messages: Message[] = [
    {
      from: 'bot',
      text: "Bonjour! Je suis ton coach nutrition IA. Comment puis-je t'aider aujourd'hui ? 🌟",
      time: '00:38',
    },
  ];

  suggestions: string[] = [
    'Adapter mon plan du jour',
    'Moins de calories le soir',
    'Plus de plats marocains',
    'Recettes végétariennes',
  ];

  input = '';

  private nowTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  send(): void {
    const text = this.input.trim();
    if (!text) return;

    const t = this.nowTime();
    this.messages.push({ from: 'user', text, time: t });

    this.messages.push({
      from: 'bot',
      text: "Merci pour ta question ! Bientôt je répondrai avec une vraie IA connectée à ton profil nutrition 😉.",
      time: this.nowTime(),
    });

    this.input = '';
  }

  useSuggestion(s: string): void {
    this.input = s;
    this.send();
  }
}
