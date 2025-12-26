import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatResponse {
  answer: string;
  provider: string;
}

export interface RecipeCard {
  id?: string;
  title: string;
  imageUrl?: string;
  category?: string;
  area?: string;
  calories?: number;
  readyInMinutes?: number;
  difficulty?: string;
  description?: string;
}

export interface ChatRecipeResponse {
  intro: string;
  recipes: RecipeCard[];
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly baseUrl = 'http://localhost:8081/api/ai';

  constructor(private http: HttpClient) {}

  // chat « texte »
//   sendMessage(message: string, sessionId: string): Observable<any> {
//     return this.http.post(`${this.baseUrl}/chat`, {
//       message,
//       sessionId,
//     });
//   }
// Modif pour historique
    // ✅ Version à utiliser
    sendMessage(
    text: string,
    sessionId: string,
    history: { role: 'user' | 'assistant'; content: string }[]
    ): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.baseUrl}/chat`, {
        message: text,
        sessionId,
        history, // ou supprime si tu ne l’utilises pas encore côté Java
    });
    }


  // chat « recettes »
  sendRecipePrompt(prompt: string, sessionId: string): Observable<ChatRecipeResponse> {
    return this.http.post<ChatRecipeResponse>(`${this.baseUrl}/chat/recipes`, {
      prompt,
      sessionId,
    });
  }

  // 🔥 crée une vraie Recipe en BD à partir d'un prompt et renvoie la Recipe avec id
  materializeRecipeFromPrompt(prompt: string): Observable<any> {
    const params = new HttpParams().set('prompt', prompt);
    return this.http.post(
      'http://localhost:8081/api/ai/generate-and-save',
      params,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
  }
}
