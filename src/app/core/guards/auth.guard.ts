import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // ✅ Accès autorisé
  } else {
    console.log('🔒 Non authentifié - Redirection login');
    authService.login(); // Redirige vers Keycloak
    return false;
  }
};
