// src/app/features/profile/profile.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface ProfileItem {
  key: string;
  icon: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent {
  name = 'zaid';
  email = 'zaid@example.com';

  accountItems: ProfileItem[] = [
    {
      key: 'personal-info',
      icon: '👤',
      title: 'Informations personnelles',
      subtitle: 'Nom, âge, taille, poids',
    },
    {
      key: 'goal',
      icon: '🎯',
      title: 'Mon objectif',
      subtitle: 'Perte, maintien ou prise de poids',
    },
  ];

  preferenceItems: ProfileItem[] = [
    {
      key: 'diet',
      icon: '🥗',
      title: 'Restrictions alimentaires',
      subtitle: 'Halal, végétarien, allergies...',
    },
    {
      key: 'language',
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

  constructor(private router: Router) {}

  openItem(item: ProfileItem): void {
    switch (item.key) {
      case 'personal-info':
        this.router.navigate(['/profil/personal-info']);
        break;
      case 'goal':
        // plus tard: /profil/goal
        console.log('Ouvrir objectif');
        break;
      case 'diet':
        // plus tard: /profil/diet
        console.log('Ouvrir restrictions alimentaires');
        break;
      case 'language':
        // plus tard: /profil/language
        console.log('Ouvrir langue');
        break;
      default:
        console.log('Ouvrir section', item.title);
    }
  }

  toggleNotifications(): void {
    this.notificationsEnabled = !this.notificationsEnabled;
  }

  logout(): void {
    console.log('Se déconnecter');
  }
}
