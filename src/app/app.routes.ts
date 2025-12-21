import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard';
import { RecipeDetailComponent } from './features/recipes-details/recipes-details';
import { RecipesComponent } from './features/recipes/recipes';
import { EntrainementComponent } from './features/entrainement/entrainement';
import { PhotoRecipeComponent } from './features/photo-recipe/photo-recipe';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
    { path: 'recipes', component: RecipesComponent },
    {path: 'entrainement', component: EntrainementComponent},
    { path: 'photo-recipe', component: PhotoRecipeComponent },
  { path: 'recipes/:id', component: RecipeDetailComponent },
];
