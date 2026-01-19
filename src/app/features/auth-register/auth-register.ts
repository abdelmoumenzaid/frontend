import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-register.html',
  styleUrls: ['./auth-register.css']
})
export class AuthRegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  formData = {
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: ''
  };

  loading = false;
  error = '';

  register() {
    console.log('✅ register() clicked');
    
    // Simple redirect vers Keycloak registration
    this.authService.registerWithKeycloak();
  }

  goToLogin() {
    this.router.navigate(['/auth-landing']);
  }
}
