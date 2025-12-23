// src/app/features/recipes/recipes.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';

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

// mapping visuel → catégorie backend
const MEALTYPE_TO_CATEGORY: Record<MealType, string | null> = {
  all: null,
  breakfast: 'Breakfast',
  lunch: null,
  dinner: null,
  snack: null,
};

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class RecipesComponent implements OnInit {
  constructor(
    private router: Router,
    private recipeService: RecipeService
  ) {}

  search = '';
  activeFilter: MealType = 'all';

  categories: string[] = [];
  selectedCategory = '';
  showMoreFilters = false;

  loading = false;
  recipes: RecipeCard[] = [];

  ngOnInit(): void {
    this.loadRecipes();
    this.loadCategories();
  }

  loadRecipes(): void {
  console.log('loadRecipes called, search=', this.search, 'filter=', this.activeFilter);
  this.loading = true;

    const searchParts: string[] = [];

    // texte
    if (this.search.trim()) {
      searchParts.push(`title:${this.search.trim()}`);
    }

    // filtre “chips” (Petit-déj, etc.)
    const mappedCategory = MEALTYPE_TO_CATEGORY[this.activeFilter];
    if (mappedCategory) {
      searchParts.push(`category:${mappedCategory}`);
    }

    // filtre catégorie avancée (Plus de filtres)
    if (this.selectedCategory) {
      searchParts.push(`category:${this.selectedCategory}`);
    }

    const searchQuery = searchParts.join(',');

    const obs = searchQuery
      ? this.recipeService.search(searchQuery)
      : this.recipeService.getAll();

    obs.subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = this.mapToRecipeCard(recipes);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement', err);
        this.loading = false;
      },
    });
  }

  loadCategories(): void {
    this.recipeService.getCategories().subscribe({
      next: (categories) => (this.categories = categories),
      error: (err) => console.error('Erreur catégories', err),
    });
  }

  // backend → UI
  private mapToRecipeCard(recipes: Recipe[]): RecipeCard[] {
    return recipes.map((r) => ({
      id: r.id,
      name: r.title,
      image: r.imageUrl || 'assets/default-recipe.jpg',
      description: r.shortDescription || '',
      calories: r.calories || 0,
      time: (r.prepMinutes || 0) + (r.cookMinutes || 0),
      difficulty: this.getDifficulty(r.calories || 0),
      mealType: 'lunch', // pour l’instant, fixe
    }));
  }

  private getDifficulty(calories: number): 'Facile' | 'Moyen' | 'Difficile' {
    if (calories < 400) return 'Facile';
    if (calories < 700) return 'Moyen';
    return 'Difficile';
  }

  onSearch(): void {
    this.loadRecipes();
  }

  setFilter(filter: MealType): void {
    this.activeFilter = filter;
    // on ne reset pas selectedCategory ici, tu peux le faire si tu veux
    this.loadRecipes();
  }

  toggleMoreFilters(): void {
    this.showMoreFilters = !this.showMoreFilters;
  }

  applyCategoryFilter(category: string): void {
    this.selectedCategory = category;
    this.showMoreFilters = false;
    this.activeFilter = 'all'; // on neutralise les chips de base
    this.loadRecipes();
  }

  openRecipe(recipe: RecipeCard): void {
  console.log('openRecipe', recipe.id); // vérifie dans la console
  this.router.navigate(['/recipes', recipe.id]);
}

}
