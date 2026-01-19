import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service'; // ✅ CHEMIN CORRIGÉ
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="callback-container">
      <div class="spinner"></div>
      <p>{{ message }}</p>
    </div>
  `,
  styles: [`
    .callback-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-family: Arial, sans-serif;
    }

    .spinner {
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid white;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    p {
      font-size: 18px;
      text-align: center;
    }
  `]
})
export class CallbackComponent implements OnInit {
  message = 'Redirection vers dashboard...';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // ✅ Récupérer le code d'autorisation depuis l'URL
    const code = this.route.snapshot.queryParams['code'];
    const error = this.route.snapshot.queryParams['error'];
    const errorDescription = this.route.snapshot.queryParams['error_description'];

    // ❌ Gestion des erreurs Keycloak
    if (error) {
      console.error('Keycloak error:', error, errorDescription);
      this.message = `Erreur: ${error}`;
      
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3000);
      return;
    }

    // ❌ Code manquant
    if (!code) {
      console.error('Authorization code missing');
      this.message = 'Erreur: Code d\'autorisation manquant';
      
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3000);
      return;
    }

    // ✅ Traiter le code avec le service
    console.log('Authorization code received:', code);
    
    this.authService.handleCallback(code).subscribe({
      next: (response) => {
        console.log('✅ Token received successfully');
        localStorage.setItem('access_token', response.access_token);
        
        if (response.refresh_token) {
          localStorage.setItem('refresh_token', response.refresh_token);
        }

        // Mettre à jour le BehaviorSubject
        this.authService['tokenSubject'].next(response.access_token);

        this.message = 'Authentification réussie! Redirection...';
        
        // Redirection au dashboard
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 500);
      },
      error: (err: any) => {
        console.error('❌ Token exchange failed:', err);
        this.message = `Erreur d'authentification: ${err.error?.error || err.statusText}`;
        
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      }
    });
  }
}