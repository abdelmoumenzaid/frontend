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
import { CallbackComponent } from './callback.component';
import { AuthLandingComponent } from './features/auth-landing/auth-landing';
import { AuthRegisterComponent } from './features/auth-register/auth-register';
import { AuthConnexionComponent } from './features/auth-connexion/auth-connexion';
import { authGuard } from './core/guards/auth.guard';

/**
 * 🚀 Configuration des routes optimisée
 * ✅ Routes publiques (PAS de guard)
 * ✅ Routes protégées (avec authGuard)
 * ✅ Routes dynamiques avec paramètres
 * ✅ Fallback sûr vers /auth-landing
 */
export const routes: Routes = [
  // 🟢 ROUTES PUBLIQUES (SANS AuthGuard)
  { 
    path: '', 
    redirectTo: '/auth-landing', 
    pathMatch: 'full' 
  },
  
  { 
    path: 'auth-landing', 
    component: AuthLandingComponent,
    data: { title: 'Accueil' }
  },
  
  { 
    path: 'auth-register', 
    component: AuthRegisterComponent,
    data: { title: 'Inscription' }
  },
  
  { 
    path: 'auth-connexion', 
    component: AuthConnexionComponent,
    data: { title: 'Connexion' }
  },
  
  // 🔥 Callback Keycloak (PUBLIC - ne pas ajouter canActivate)
  { 
    path: 'callback', 
    component: CallbackComponent,
    data: { title: 'Authentification' }
  },

  // 🔐 ROUTES PROTÉGÉES (AVEC AuthGuard)
  
  // Dashboard
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard],
    data: { title: 'Tableau de bord' }
  },
  
  // Recettes
  { 
    path: 'recipes', 
    component: RecipesComponent,
    canActivate: [authGuard],
    data: { title: 'Recettes' }
  },
  
  { 
    path: 'recipes/:id',
    component: RecipeDetailComponent,
    canActivate: [authGuard],
    data: { title: 'Détails recette', renderMode: 'client' }
  },
  
  // Entraînement
  { 
    path: 'entrainement', 
    component: EntrainementComponent,
    canActivate: [authGuard],
    data: { title: 'Entraînement' }
  },
  
  // Photo Recipe
  { 
    path: 'photo-recipe', 
    component: PhotoRecipeComponent,
    canActivate: [authGuard],
    data: { title: 'Photo recette' }
  },
  
  // Chat
  { 
    path: 'chat', 
    component: ChatComponent,
    canActivate: [authGuard],
    data: { title: 'Chat' }
  },
  
  // Profil et sous-routes
  { 
    path: 'profil', 
    component: ProfileComponent,
    canActivate: [authGuard],
    data: { title: 'Profil' }
  },
  
  { 
    path: 'profil/personal-info', 
    component: ProfilePersonalInfoComponent,
    canActivate: [authGuard],
    data: { title: 'Informations personnelles' }
  },
  
  { 
    path: 'profil/objectif', 
    component: ObjectifComponent,
    canActivate: [authGuard],
    data: { title: 'Objectif' }
  },
  
  { 
    path: 'profil/langue', 
    component: LanguageComponent,
    canActivate: [authGuard],
    data: { title: 'Langue' }
  },
  
  { 
    path: 'profil/allergie', 
    component: AllergieComponent,
    canActivate: [authGuard],
    data: { title: 'Allergies' }
  },
  
  // Calendrier et suivi
  { 
    path: 'calendar', 
    component: DayTrackingComponent,
    canActivate: [authGuard],
    data: { title: 'Calendrier' }
  },
  
  { 
    path: 'calendar/:date',
    component: DayTrackingComponent,
    canActivate: [authGuard],
    data: { title: 'Suivi du jour', renderMode: 'client' }
  },
  
  { 
    path: 'calendar/:date/add-meal',
    component: AddMealComponent,
    canActivate: [authGuard],
    data: { title: 'Ajouter un repas', renderMode: 'client' }
  },
  
  { 
    path: 'calendar/:date/add-workout',
    component: AddWorkoutComponent,
    canActivate: [authGuard],
    data: { title: 'Ajouter un entraînement', renderMode: 'client' }
  },
  
  { 
    path: 'calendar/:date/add-meal/:mealId',
    component: AddMealComponent,
    canActivate: [authGuard],
    data: { title: 'Modifier un repas', renderMode: 'client' }
  },

  // 🔴 Route catch-all (FALLBACK)
  { 
    path: '**', 
    redirectTo: '/auth-landing' 
  }
];






















// import { Routes } from '@angular/router';
// import { DashboardComponent } from './features/dashboard/dashboard';
// import { RecipeDetailComponent } from './features/recipes-details/recipes-details';
// import { RecipesComponent } from './features/recipes/recipes';
// import { EntrainementComponent } from './features/entrainement/entrainement';
// import { PhotoRecipeComponent } from './features/photo-recipe/photo-recipe';
// import { ChatComponent } from './features/chat/chat';
// import { ProfileComponent } from './features/profile/profile';
// import { DayTrackingComponent } from './features/day-tracking/day-tracking';
// import { AddMealComponent } from './features/day-tracking/add-meal/add-meal';
// import { AddWorkoutComponent } from './features/day-tracking/add-workout/add-workout';
// import { ProfilePersonalInfoComponent } from './features/profile/personal-info/personal-info';
// import { ObjectifComponent } from './features/profile/objectif/objectif';
// import { LanguageComponent } from './features/profile/language/language';
// import { AllergieComponent } from './features/profile/allergie/allergie';
// import { CallbackComponent } from './callback.component';
// import { AuthLandingComponent } from './features/auth-landing/auth-landing';
// import { AuthRegisterComponent } from './features/auth-register/auth-register';
// import { AuthConnexionComponent } from './features/auth-connexion/auth-connexion';
// import { authGuard } from './core/guards/auth.guard';

// export const routes: Routes = [
//   // 🟢 PUBLIQUES (pas de guard)
//   { path: '', redirectTo: '/auth-landing', pathMatch: 'full' },
//   { path: 'auth-landing', component: AuthLandingComponent },
//   { path: 'auth-register', component: AuthRegisterComponent },
//   { path: 'auth-connexion', component: AuthConnexionComponent },
  
//   // 🔥 Callback Keycloak (public)
//   { path: 'callback', component: CallbackComponent },

//   // 🔐 PROTÉGÉES (avec authGuard)
//   { 
//     path: 'dashboard', 
//     component: DashboardComponent,
//     canActivate: [authGuard]
//   },
//   { 
//     path: 'recipes', 
//     component: RecipesComponent,
//     canActivate: [authGuard]
//   },
//   { 
//     path: 'entrainement', 
//     component: EntrainementComponent,
//     canActivate: [authGuard]
//   },
//   { 
//     path: 'photo-recipe', 
//     component: PhotoRecipeComponent,
//     canActivate: [authGuard]
//   },
//   { 
//     path: 'chat', 
//     component: ChatComponent,
//     canActivate: [authGuard]
//   },
//   { 
//     path: 'profil', 
//     component: ProfileComponent,
//     canActivate: [authGuard]
//   },
//   { 
//     path: 'profil/personal-info', 
//     component: ProfilePersonalInfoComponent,
//     canActivate: [authGuard]
//   },
//   { 
//     path: 'profil/objectif', 
//     component: ObjectifComponent,
//     canActivate: [authGuard]
//   },
//   { 
//     path: 'profil/langue', 
//     component: LanguageComponent,
//     canActivate: [authGuard]
//   },
//   { 
//     path: 'profil/allergie', 
//     component: AllergieComponent,
//     canActivate: [authGuard]
//   },
//   { 
//     path: 'calendar', 
//     component: DayTrackingComponent,
//     canActivate: [authGuard]
//   },

//   // 🔵 DYNAMIQUES protégées
//   {
//     path: 'recipes/:id',
//     component: RecipeDetailComponent,
//     canActivate: [authGuard],
//     data: { renderMode: 'client' }
//   },
//   {
//     path: 'calendar/:date',
//     component: DayTrackingComponent,
//     canActivate: [authGuard],
//     data: { renderMode: 'client' }
//   },
//   {
//     path: 'calendar/:date/add-meal',
//     component: AddMealComponent,
//     canActivate: [authGuard],
//     data: { renderMode: 'client' }
//   },
//   {
//     path: 'calendar/:date/add-workout',
//     component: AddWorkoutComponent,
//     canActivate: [authGuard],
//     data: { renderMode: 'client' }
//   },
//   {
//     path: 'calendar/:date/add-meal/:mealId',
//     component: AddMealComponent,
//     canActivate: [authGuard],
//     data: { renderMode: 'client' }
//   },

//   // 🔴 Fallback
//   { path: '**', redirectTo: '/auth-landing' }
// ];













// import { Routes } from '@angular/router';
// import { DashboardComponent } from './features/dashboard/dashboard';
// import { RecipeDetailComponent } from './features/recipes-details/recipes-details';
// import { RecipesComponent } from './features/recipes/recipes';
// import { EntrainementComponent } from './features/entrainement/entrainement';
// import { PhotoRecipeComponent } from './features/photo-recipe/photo-recipe';
// import { ChatComponent } from './features/chat/chat';
// import { ProfileComponent } from './features/profile/profile';
// import { DayTrackingComponent } from './features/day-tracking/day-tracking';
// import { AddMealComponent } from './features/day-tracking/add-meal/add-meal';
// import { AddWorkoutComponent } from './features/day-tracking/add-workout/add-workout';
// import { ProfilePersonalInfoComponent } from './features/profile/personal-info/personal-info';
// import { ObjectifComponent } from './features/profile/objectif/objectif';
// import { LanguageComponent } from './features/profile/language/language';
// import { AllergieComponent } from './features/profile/allergie/allergie';
// import { CallbackComponent } from './callback.component'; 
// import { AuthLandingComponent } from './features/auth-landing/auth-landing';

// export const routes: Routes = [
//   // ✅ Une seule redirection root
//   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

//   // 🟢 Routes statiques (prerender OK)
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'recipes', component: RecipesComponent },
//   { path: 'entrainement', component: EntrainementComponent },
//   { path: 'photo-recipe', component: PhotoRecipeComponent },
//   { path: 'chat', component: ChatComponent },

//   { path: 'profil', component: ProfileComponent },
//   { path: 'profil/personal-info', component: ProfilePersonalInfoComponent },
//   { path: 'profil/objectif', component: ObjectifComponent },
//   { path: 'profil/langue', component: LanguageComponent },
//   { path: 'profil/allergie', component: AllergieComponent },

//   { path: 'calendar', component: DayTrackingComponent },

//   // 🔐 Callback Keycloak (PRIVÉ - pas dans menu)
//   { path: 'callback', component: CallbackComponent },
//   // 🔥 Page d'accueil = Auth landing
//   { path: '', component: AuthLandingComponent },
//   { path: 'login', component: AuthLandingComponent },


//   // 🔵 Routes dynamiques → CLIENT ONLY (IMPORTANT)
//   {
//     path: 'recipes/:id',
//     component: RecipeDetailComponent,
//     data: { renderMode: 'client' }
//   },
//   {
//     path: 'calendar/:date',
//     component: DayTrackingComponent,
//     data: { renderMode: 'client' }
//   },
//   {
//     path: 'calendar/:date/add-meal',
//     component: AddMealComponent,
//     data: { renderMode: 'client' }
//   },
//   {
//     path: 'calendar/:date/add-workout',
//     component: AddWorkoutComponent,
//     data: { renderMode: 'client' }
//   },
//   {
//     path: 'calendar/:date/add-meal/:mealId',
//     component: AddMealComponent,
//     data: { renderMode: 'client' }
//   },

//   // 🔴 Fallback
//   { path: '**', redirectTo: 'dashboard' }
// ];





