import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-bar.html',
  styleUrl: './chat-bar.css',
})
export class ChatBarComponent {
  /** texte courant */
  @Input() value = '';

  /** suggestions à afficher */
  @Input() suggestions: string[] = [];

  /** émis quand on envoie un message */
  @Output() sendMessage = new EventEmitter<string>();

  /** émis quand la valeur change (pour [(ngModel)]-like) */
  @Output() valueChange = new EventEmitter<string>();

  onInputChange(v: string): void {
    this.value = v;
    this.valueChange.emit(v);
  }

  onSend(): void {
    const text = this.value.trim();
    if (!text) {
      return;
    }
    this.sendMessage.emit(text);
    this.valueChange.emit(''); // reset coté parent
    this.value = '';
  }

  useSuggestion(s: string): void {
    this.value = s;
    this.valueChange.emit(s);
    this.onSend();
  }
}
