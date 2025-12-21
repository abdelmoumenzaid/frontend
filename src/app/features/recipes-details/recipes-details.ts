import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface Ingredient {
  name: string;
  quantity: string;
}

interface RecipeDetail {
  id: string;
  name: string;
  image: string;
  description: string;
  calories: number;
  time: number;
  difficulty: string;
  tags: string[];
  ingredients: Ingredient[];
  steps: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipes-details.html',
  styleUrl: './recipes-details.css',
})
export class RecipeDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  recipe!: RecipeDetail;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    // Pour l’instant, mock en dur. Plus tard → appel API.
    if (id === 'ms1') {
      this.recipe = {
        id: 'ms1',
        name: 'Msemen au Miel',
        image: 'assets/recipes/msemen-hero.jpg',
        description: 'Crêpes feuilletées marocaines traditionnelles',
        calories: 280,
        time: 20,
        difficulty: 'Moyen',
        tags: ['Traditionnel', 'Petit-déjeuner'],
        ingredients: [
          { name: 'Farine', quantity: '300g' },
          { name: 'Eau tiède', quantity: '250ml' },
          { name: 'Sel', quantity: '1 c.à.c' },
          { name: 'Huile', quantity: '50ml' },
          { name: 'Miel', quantity: '3 c.à.s' },
        ],
        steps: [
          "Pétrir la pâte jusqu'à élasticité",
          'Laisser reposer 30 minutes',
          'Étaler finement et plier',
          'Cuire à la poêle des deux côtés',
          'Servir chaud avec du miel',
        ],
        nutrition: {
          calories: 280,
          protein: 6,
          carbs: 48,
          fat: 8,
        },
      };
    } else {
      // fallback
      this.router.navigate(['/dashboard']);
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  addToPlan(): void {
    // TODO: appel API pour ajouter au plan
    console.log('Ajouter au plan', this.recipe.id);
  }
}
