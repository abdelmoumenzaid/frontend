// src/app/features/entrainement/entrainement.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Exercise {
  id: string;
  name: string;
  image: string;
  muscle: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
}

@Component({
  selector: 'app-entrainement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entrainement.html',
  styleUrl: './entrainement.css',
})
export class EntrainementComponent {
  // séance du jour
  goal = 'Perte de graisse';
  done = 2;
  total = 5;

  exercises: Exercise[] = [
    {
      id: 'ex1',
      name: 'Pompes',
      image: 'assets/training/pompes.jpg',
      muscle: 'Pectoraux',
      level: 'Débutant',
    },
    {
      id: 'ex2',
      name: 'Squats',
      image: 'assets/training/squats.jpg',
      muscle: 'Jambes',
      level: 'Débutant',
    },
    {
      id: 'ex3',
      name: 'Planche',
      image: 'assets/training/planche.jpg',
      muscle: 'Abdos',
      level: 'Débutant',
    },
    {
      id: 'ex4',
      name: 'Soulevé de terre',
      image: 'assets/training/souleve-terre.jpg',
      muscle: 'Dos',
      level: 'Intermédiaire',
    },
    {
      id: 'ex5',
      name: 'Développé épaules',
      image: 'assets/training/epaules.jpg',
      muscle: 'Épaules',
      level: 'Intermédiaire',
    },
    {
      id: 'ex6',
      name: 'Fentes',
      image: 'assets/training/fentes.jpg',
      muscle: 'Jambes',
      level: 'Intermédiaire',
    },
    {
      id: 'ex7',
      name: 'Curl biceps',
      image: 'assets/training/curl-biceps.jpg',
      muscle: 'Bras',
      level: 'Débutant',
    },
    {
      id: 'ex8',
      name: 'Étirements Yoga',
      image: 'assets/training/yoga.jpg',
      muscle: 'Flexibilité',
      level: 'Débutant',
    },
  ];

  // config plan
  objective = 'Perte de graisse';
  sessionsPerWeek = 3;
  split = 'Full body';

  savedPlans = [
    {
      id: 'p1',
      name: 'Programme débutant',
      goal: 'Perte de graisse',
      sessions: 3,
      split: 'Full body',
    },
    {
      id: 'p2',
      name: 'Force et volume',
      goal: 'Prise de muscle',
      sessions: 4,
      split: 'Upper / Lower',
    },
  ];

  get progressPercent(): number {
    return (this.done / this.total) * 100;
  }

  setObjective(goal: string): void {
    this.objective = goal;
  }

  setSessions(n: number): void {
    this.sessionsPerWeek = n;
  }

  setSplit(split: string): void {
    this.split = split;
  }

  toggleFavorite(ex: Exercise): void {
    console.log('Favori', ex);
  }

  generatePlan(): void {
    console.log(
      'Générer plan',
      this.objective,
      this.sessionsPerWeek,
      this.split,
    );
  }

  openPlan(planId: string): void {
    console.log('Ouvrir plan', planId);
  }
}
