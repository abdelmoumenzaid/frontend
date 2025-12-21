// src/app/features/recipes/recipes.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  


type MealType = 'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack';

interface RecipeCard {
  id: string;
  name: string;
  image: string;
  description: string;
  calories: number;
  time: number;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  mealType: MealType;
}

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class RecipesComponent {
  constructor(private router: Router) {}

  search = '';
  activeFilter: MealType = 'all';

  recipes: RecipeCard[] = [
    {
      id: 'tg1',
      name: 'Tajine de Poulet aux Olives',
      image: 'http://localhost:3000/api/images/recipes/tajine-poulet.jpg',
      description: 'Tajine marocain mijoté aux olives et citron confit.',
      calories: 430,
      time: 45,
      difficulty: 'Facile',
      mealType: 'lunch',
    },
    {
      id: 'sd1',
      name: 'Salade Méditerranéenne',
      image: 'http://localhost:3000/api/images/recipes/salade-med.jpg',
      description: 'Salade colorée aux légumes frais et pois chiches.',
      calories: 220,
      time: 15,
      difficulty: 'Facile',
      mealType: 'dinner',
    },
    {
      id: 'ms1',
      name: 'Msemen au Miel',
      image: 'http://localhost:3000/api/images/recipes/msemen-miel.jpg',
      description: 'Crêpes feuilletées marocaines traditionnelles.',
      calories: 280,
      time: 20,
      difficulty: 'Moyen',
      mealType: 'breakfast',
    },
    {
      id: 'sm1',
      name: 'Smoothie Bowl Avocat',
      image: 'http://localhost:3000/api/images/recipes/bowl.jpg',
      description: 'Bowl énergisant pour bien commencer la journée.',
      calories: 320,
      time: 10,
      difficulty: 'Facile',
      mealType: 'breakfast',
    },
  ];

  get filteredRecipes(): RecipeCard[] {
    return this.recipes.filter((r) => {
      const matchesFilter =
        this.activeFilter === 'all' || r.mealType === this.activeFilter;
      const matchesSearch =
        !this.search ||
        r.name.toLowerCase().includes(this.search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }

  setFilter(filter: MealType): void {
    this.activeFilter = filter;
  }

  openRecipe(recipe: RecipeCard): void {
    this.router.navigate(['/recipes', recipe.id]);
  }
}
