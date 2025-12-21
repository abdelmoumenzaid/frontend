// src/app/features/dashboard/dashboard.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

interface Recipe {
  id: string;
  name: string;
  image: string;
  description: string;
  calories: number;
  time: number;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  tags: string[];
}

interface Meal {
  id: string;
  type: MealType;
  label: string;
  icon: string;
  calories: number;
  recipes: Recipe[];
  expanded: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  private router = inject(Router);

  userName = 'ZAID';

  targetCalories = 1800;
  consumedCalories = 850;

  meals: Meal[] = [
    {
      id: '1',
      type: 'breakfast',
      label: 'Petit-déjeuner',
      icon: '🌅',
      calories: 600,
      expanded: false,
      recipes: [
        {
          id: 'ms1',
          name: 'Msemen au Miel',
          image: 'http://localhost:3000/api/images/recipes/msemen-miel.jpg',
          description: 'Crêpes feuilletées marocaines traditionnelles',
          calories: 280,
          time: 20,
          difficulty: 'Moyen',
          tags: ['Traditionnel', 'Petit-déjeuner'],
        },
        {
          id: 'sm1',
          name: 'Smoothie Bowl Avocat',
          image: 'http://localhost:3000/api/images/recipes/bowl.jpg',
          description: 'Bowl énergisant pour bien commencer la journée',
          calories: 320,
          time: 10,
          difficulty: 'Facile',
          tags: ['Healthy', 'Végétarien'],
        },
      ],
    },
    {
      id: '2',
      type: 'lunch',
      label: 'Déjeuner',
      icon: '🌞',
      calories: 600,
      expanded: false,
      recipes: [],
    },
    {
      id: '3',
      type: 'dinner',
      label: 'Dîner',
      icon: '🌙',
      calories: 430,
      expanded: false,
      recipes: [],
    },
    {
      id: '4',
      type: 'snack',
      label: 'Collations',
      icon: '🍎',
      calories: 150,
      expanded: false,
      recipes: [],
    },
  ];

  get remainingCalories(): number {
    return this.targetCalories - this.consumedCalories;
  }

  get progressPercent(): number {
    return Math.min(
      100,
      (this.consumedCalories / this.targetCalories) * 100
    );
  }

  onNewPlan(): void {
    console.log('Générer un nouveau plan du jour');
  }

  toggleMeal(meal: Meal): void {
    meal.expanded = !meal.expanded;
  }

  onFavorite(recipe: Recipe): void {
    console.log('Toggle favori', recipe);
  }

  onReplace(recipe: Recipe): void {
    console.log('Remplacer recette', recipe);
  }

  openRecipeDetail(recipe: Recipe): void {
    this.router.navigate(['/recipes', recipe.id]);
  }
}
