import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard';
import { RecipeDetailComponent } from './features/recipes-details/recipes-details';
import { RecipesComponent } from './features/recipes/recipes';
import { EntrainementComponent } from './features/entrainement/entrainement';
import { PhotoRecipeComponent } from './features/photo-recipe/photo-recipe';
import { ChatComponent } from './features/chat/chat';
import { ProfileComponent } from './features/profile/profile';
import { DayTrackingComponent } from './features/day-tracking/day-tracking';
import { AddMealComponent } from './features/day-tracking/add-meal/add-meal';
import { AddWorkoutComponent } from './features/day-tracking/add-workout/add-workout';
import { ProfilePersonalInfoComponent } from './features/profile/personal-info/personal-info';
import { ObjectifComponent } from './features/profile/objectif/objectif';
import { LanguageComponent } from './features/profile/language/language';
import { AllergieComponent } from './features/profile/allergie/allergie';

export const routes: Routes = [
  // ✅ Une seule redirection root
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // 🟢 Routes statiques (prerender OK)
  { path: 'dashboard', component: DashboardComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'entrainement', component: EntrainementComponent },
  { path: 'photo-recipe', component: PhotoRecipeComponent },
  { path: 'chat', component: ChatComponent },

  { path: 'profil', component: ProfileComponent },
  { path: 'profil/personal-info', component: ProfilePersonalInfoComponent },
  { path: 'profil/objectif', component: ObjectifComponent },
  { path: 'profil/langue', component: LanguageComponent },
  { path: 'profil/allergie', component: AllergieComponent },

  { path: 'calendar', component: DayTrackingComponent },

  // 🔵 Routes dynamiques → CLIENT ONLY (IMPORTANT)
  {
    path: 'recipes/:id',
    component: RecipeDetailComponent,
    data: { renderMode: 'client' }
  },
  {
    path: 'calendar/:date',
    component: DayTrackingComponent,
    data: { renderMode: 'client' }
  },
  {
    path: 'calendar/:date/add-meal',
    component: AddMealComponent,
    data: { renderMode: 'client' }
  },
  {
    path: 'calendar/:date/add-workout',
    component: AddWorkoutComponent,
    data: { renderMode: 'client' }
  },
  {
    path: 'calendar/:date/add-meal/:mealId',
    component: AddMealComponent,
    data: { renderMode: 'client' }
  },

  // 🔴 Fallback
  { path: '**', redirectTo: 'dashboard' }
];













// import { Routes } from '@angular/router';
// import { DashboardComponent } from './features/dashboard/dashboard';
// import { RecipeDetailComponent } from './features/recipes-details/recipes-details';
// import { RecipesComponent } from './features/recipes/recipes';
// import { EntrainementComponent } from './features/entrainement/entrainement';
// import { PhotoRecipeComponent } from './features/photo-recipe/photo-recipe';
// import { ChatComponent } from './features/chat/chat';
// import { ProfileComponent } from './features/profile/profile';
// import { DayTrackingComponent} from './features/day-tracking/day-tracking';
// import { AddMealComponent } from './features/day-tracking/add-meal/add-meal';
// import { AddWorkoutComponent } from './features/day-tracking/add-workout/add-workout';
// import { ProfilePersonalInfoComponent } from './features/profile/personal-info/personal-info';
// import { ObjectifComponent } from './features/profile/objectif/objectif';
// import { LanguageComponent } from './features/profile/language/language';
// import { AllergieComponent } from './features/profile/allergie/allergie';

// export const routes: Routes = [
//   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'recipes', component: RecipesComponent },
//   { path: 'recipes/:id', component: RecipeDetailComponent },

//   { path: 'entrainement', component: EntrainementComponent },
//   { path: 'photo-recipe', component: PhotoRecipeComponent },
//   { path: 'chat', component: ChatComponent },
//   { path: '', redirectTo: 'chat', pathMatch: 'full' },
  
//   { path: 'profil', component: ProfileComponent },
//   { path: 'profil/personal-info', component: ProfilePersonalInfoComponent },
//   { path: 'profil/objectif', component: ObjectifComponent },
//   { path: 'profil/langue', component: LanguageComponent },
//   { path: 'profil/allergie', component: AllergieComponent },

//   { path: 'calendar', component: DayTrackingComponent },
//   { path: 'calendar/:date', component: DayTrackingComponent },
//   { path: 'calendar/:date/add-meal', component: AddMealComponent },
//   { path: 'calendar/:date/add-workout', component: AddWorkoutComponent },
//   { path: 'calendar/:date/add-meal/:mealId', component: AddMealComponent },  // ✅ AJOUTÉ : même composant !

//   { path: '**', redirectTo: 'dashboard' }
// ];

