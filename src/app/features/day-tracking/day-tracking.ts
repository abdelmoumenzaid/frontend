// src/app/features/calendar/day-tracking.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

interface MealEntry {
  id: string;
  type: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  label: string;
  time: string;
  recipeName: string;
  imageUrl: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  servings: number;
}

interface ExerciseSet {
  id: string;
  exerciseName: string;
  setNumber: number;
  reps?: number;
  weightKg?: number;
  durationSec?: number;
}

interface WorkoutEntry {
  id: string;
  name: string;
  time: string;
  durationMin: number;
  caloriesBurned?: number;
  totalSets: number;
  sets: ExerciseSet[];
}

interface DayTracking {
  date: string; // ISO yyyy-MM-dd
  caloriesIn: number;
  caloriesTarget: number;
  caloriesOut: number;
  totalWorkoutMinutes: number;
  totalSets: number;
  meals: MealEntry[];
  workouts: WorkoutEntry[];
}

interface WeekRing {
  date: string;          // yyyy-MM-dd
  label: string;         // L, M, M, J, V, S, D
  caloriesIn: number;
  caloriesTarget: number;
  trained: boolean;      // entraînement fait ou pas
}

@Component({
  selector: 'app-day-tracking',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './day-tracking.html',
  styleUrl: './day-tracking.css',
})
export class DayTrackingComponent {
  day!: DayTracking;
  displayDate = '';

  weekRings: WeekRing[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const paramDate = params.get('date');
      const today = new Date();
      const date = paramDate ? new Date(paramDate) : today;

      this.displayDate = date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });

      this.day = this.buildMockDay(date);
      this.buildWeekRings(date);
    });
  }
  onAddMeal(): void {
  this.router.navigate(['/calendar', this.day.date, 'add-meal']);
}
  onAddWorkout(): void {
  this.router.navigate(['/calendar', this.day.date, 'add-workout']);
}

  getRingRotation(r: WeekRing): number {
    if (!r.caloriesTarget || r.caloriesTarget <= 0) return 0;
    const ratio = Math.min(r.caloriesIn / r.caloriesTarget, 1);
    return ratio * 360;
  }

  getRingEmoji(r: WeekRing): string {
    return r.trained ? '💪' : '😴';
  }

  getRingColor(r: WeekRing): string {
    const ratio = r.caloriesIn / r.caloriesTarget;
    if (ratio === 0) return '#9ca3af';             // gris : pas de données
    if (ratio >= 0.9 && ratio <= 1.1) return '#22c55e'; // vert : ok
    if (ratio < 0.9) return '#3b82f6';             // bleu : en dessous
    return '#ef4444';                              // rouge : au-dessus
  }

  goToToday(): void {
    const today = new Date();
    const iso = today.toISOString().substring(0, 10);
    this.router.navigate(['/calendar', iso]);
  }

  goToOffset(days: number): void {
    const base = new Date(this.day.date);
    base.setDate(base.getDate() + days);
    const iso = base.toISOString().substring(0, 10);
    this.router.navigate(['/calendar', iso]);
  }

  goToDate(iso: string): void {
    this.router.navigate(['/calendar', iso]);
  }

  private buildWeekRings(centerDate: Date): void {
    // 0 = lundi
    const d = new Date(centerDate);
    const dayOfWeek = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - dayOfWeek);

    const labels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const rings: WeekRing[] = [];

    for (let i = 0; i < 7; i++) {
      const current = new Date(d);
      current.setDate(d.getDate() + i);
      const iso = current.toISOString().substring(0, 10);

      // TODO: remplacer par appel backend /summary semaine
      const mock = this.buildMockDay(current);
      const trained = mock.totalWorkoutMinutes > 0;

      rings.push({
        date: iso,
        label: labels[i],
        caloriesIn: mock.caloriesIn,
        caloriesTarget: mock.caloriesTarget,
        trained,
      });
    }

    this.weekRings = rings;
  }

  private buildMockDay(date: Date): DayTracking {
    const iso = date.toISOString().substring(0, 10);

    const meals: MealEntry[] = [
      {
        id: 'm1',
        type: 'BREAKFAST',
        label: 'Petit-déjeuner',
        time: '08:10',
        recipeName: 'Msemen au miel',
        imageUrl: 'http://localhost:3000/api/images/recipes/msemen-miel.jpg',
        calories: 480,
        protein: 12,
        carbs: 70,
        fat: 15,
        servings: 1,
      },
      {
        id: 'm2',
        type: 'LUNCH',
        label: 'Déjeuner',
        time: '13:05',
        recipeName: 'Tajine poulet & olives',
        imageUrl:
          'http://localhost:3000/api/images/recipes/tajine-poulet-olives.jpg',
        calories: 650,
        protein: 40,
        carbs: 55,
        fat: 22,
        servings: 1,
      },
    ];

    const workout: WorkoutEntry = {
      id: 'w1',
      name: 'Full body force',
      time: '18:30',
      durationMin: 45,
      caloriesBurned: 320,
      totalSets: 6,
      sets: [
        {
          id: 's1',
          exerciseName: 'Squat',
          setNumber: 1,
          reps: 8,
          weightKg: 60,
        },
        {
          id: 's2',
          exerciseName: 'Squat',
          setNumber: 2,
          reps: 8,
          weightKg: 60,
        },
        {
          id: 's3',
          exerciseName: 'Développé couché',
          setNumber: 1,
          reps: 8,
          weightKg: 50,
        },
      ],
    };

    const caloriesIn = meals.reduce((sum, m) => sum + m.calories, 0);
    const caloriesOut = workout.caloriesBurned ?? 0;

    return {
      date: iso,
      caloriesIn,
      caloriesTarget: 2100,
      caloriesOut,
      totalWorkoutMinutes: workout.durationMin,
      totalSets: workout.totalSets,
      meals,
      workouts: [workout],
    };
  }
}
