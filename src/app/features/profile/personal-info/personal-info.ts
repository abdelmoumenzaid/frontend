import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-profile-personal-info',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './personal-info.html',
  styleUrl: './personal-info.css',
})
export class ProfilePersonalInfoComponent {
  // TODO: à remplacer par les vraies données backend
  firstName = 'Zaid';
  lastName = '';
  email = 'zaid@example.com';
  age = 30;
  heightCm = 175;
  weightKg = 80;
  gender: 'H' | 'F' | 'A' = 'H';

  constructor(private router: Router) {}

  onCancel(): void {
    this.router.navigate(['/profil']);
  }

  onSave(): void {
    const payload = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      age: this.age,
      heightCm: this.heightCm,
      weightKg: this.weightKg,
      gender: this.gender,
    };

    console.log('Sauvegarder profil perso', payload);
    // TODO: POST/PUT /api/profile/personal-info

    this.router.navigate(['/profil']);
  }
}
