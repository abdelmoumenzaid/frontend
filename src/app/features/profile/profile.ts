// src/app/features/profile/profile.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProfileItem {
  icon: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent {
  name = 'Fatima';
  email = 'fatima@example.com';

  accountItems: ProfileItem[] = [
    {
      icon: '👤',
      title: 'Informations personnelles',
      subtitle: 'Nom, âge, taille, poids',
    },
    {
      icon: '🎯',
      title: 'Mon objectif',
      subtitle: 'Perte, maintien ou prise de poids',
    },
  ];

  preferenceItems: ProfileItem[] = [
    {
      icon: '🥗',
      title: 'Restrictions alimentaires',
      subtitle: 'Halal, végétarien, allergies...',
    },
    {
      icon: '🌐',
      title: 'Langue',
      subtitle: 'Darija, FR, AR, EN',
    },
  ];

  notificationsEnabled = true;

  stats = {
    days: 28,
    recipes: 142,
    goals: 89,
  };

  openItem(item: ProfileItem): void {
    console.log('Ouvrir section', item.title);
  }

  toggleNotifications(): void {
    this.notificationsEnabled = !this.notificationsEnabled;
  }

  logout(): void {
    console.log('Se déconnecter');
  }
}
