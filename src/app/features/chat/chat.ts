import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Message {
  from: 'bot' | 'user';
  text: string;
  time: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css'],
})
export class ChatComponent {
  @ViewChild('chatMessages') chatMessages!: ElementRef<HTMLDivElement>;

  messages: Message[] = [
    {
      from: 'bot',
      text: "Bonjour ! Je suis ton coach nutrition IA. Comment puis-je t'aider aujourd'hui ?",
      time: this.nowTime(),
    },
  ];

  suggestions: string[] = [
    'Adapter mon plan du jour',
    'Moins de calories le soir',
    'Plus de plats marocains',
    'Recettes végétariennes',
  ];

  input = '';
  loading = false;

  constructor(
    private http: HttpClient,
    private zone: NgZone
  ) {}

  private nowTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const el = this.chatMessages?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }, 50);
  }

  send(): void {
    const text = this.input.trim();
    if (!text || this.loading) return;

    const t = this.nowTime();
    this.messages.push({ from: 'user', text, time: t });
    this.input = '';
    this.loading = true;
    this.scrollToBottom();

    this.http
      .post<{ answer: string }>('http://localhost:8081/api/ai/chat', {
        message: text,
      })
      .subscribe({
        next: (resp) => {
          this.zone.run(() => {
            this.loading = false;
            this.messages.push({
              from: 'bot',
              text: resp.answer,
              time: this.nowTime(),
            });
            this.scrollToBottom();
          });
        },
        error: () => {
          this.zone.run(() => {
            this.loading = false;
            this.messages.push({
              from: 'bot',
              text:
                "Désolé, une erreur est survenue. Réessaie dans un instant ou reformule ta question.",
              time: this.nowTime(),
            });
            this.scrollToBottom();
          });
        },
      });
  }

  useSuggestion(s: string): void {
    this.input = s;
    this.send();
  }

  onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.send();
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
