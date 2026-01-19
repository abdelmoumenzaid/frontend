import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ✅ AJOUTER

@Component({
  selector: 'app-auth-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-landing.html',
  styleUrls: ['./auth-landing.css']
})
export class AuthLandingComponent {
  private authService = inject(AuthService);
  private router = inject(Router); // ✅ AJOUTER

  createAccount() {
    this.router.navigate(['/auth-register']); // ✅ NAVIGATE
  }

  login() {
    this.authService.login();
  }
}
