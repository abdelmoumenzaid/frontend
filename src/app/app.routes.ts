import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard';
import { RecipeDetailComponent } from './features/recipes-details/recipes-details';
import { RecipesComponent } from './features/recipes/recipes';
import { EntrainementComponent } from './features/entrainement/entrainement';
import { PhotoRecipeComponent } from './features/photo-recipe/photo-recipe';
import { ChatComponent } from './features/chat/chat';
import { ProfileComponent } from './features/profile/profile';
import { DayTrackingComponent} from './features/day-tracking/day-tracking';
import { AddMealComponent } from './features/day-tracking/add-meal/add-meal';
import { AddWorkoutComponent } from './features/day-tracking/add-workout/add-workout';
import { ProfilePersonalInfoComponent } from './features/profile/personal-info/personal-info';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/:id', component: RecipeDetailComponent },

  { path: 'entrainement', component: EntrainementComponent },
  { path: 'photo-recipe', component: PhotoRecipeComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  
  { path: 'profil', component: ProfileComponent },
  { path: 'profil/personal-info', component: ProfilePersonalInfoComponent },

  { path: 'calendar', component: DayTrackingComponent },
  { path: 'calendar/:date', component: DayTrackingComponent },
  { path: 'calendar/:date/add-meal', component: AddMealComponent },
  { path: 'calendar/:date/add-workout', component: AddWorkoutComponent },

  { path: '**', redirectTo: 'dashboard' }
];









// export const routes: Routes = [
//   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//   { path: 'dashboard', component: DashboardComponent },
//     { path: 'recipes', component: RecipesComponent },
//     {path: 'entrainement', component: EntrainementComponent},
//     { path: 'photo-recipe', component: PhotoRecipeComponent },
//   { path: 'recipes/:id', component: RecipeDetailComponent },
//   { path: '**', redirectTo: 'recipes' },
//   {path: 'chat', component: ChatComponent},
//   {path: 'profil', component: ProfileComponent},
//   { path: 'calendar/:date', component: DayTrackingComponent },
//   { path: 'calendar/:date/add-meal', component: AddMealComponent },
//   { path: 'calendar/:date/add-workout', component: AddWorkoutComponent },
//   { path: 'calendar', component: DayTrackingComponent },
//   {path: 'profil/personal-info', component: ProfilePersonalInfoComponent},
// ];
