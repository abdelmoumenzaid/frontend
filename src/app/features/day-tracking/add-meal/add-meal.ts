// src/app/features/calendar/add-meal.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';

@Component({
  selector: 'app-add-meal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-meal.html',
  styleUrl: './add-meal.css',
})
export class AddMealComponent {
  date!: string;
  type: MealType = 'LUNCH';
  time = '12:00';
  recipeName = '';
  calories = 0;
  servings = 1;
  protein?: number;
  carbs?: number;
  fat?: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.date = this.route.snapshot.paramMap.get('date') || '';
  }

  onCancel(): void {
    this.router.navigate(['/calendar', this.date]);
  }

  onSave(): void {
    const payload = {
      date: this.date,
      type: this.type,
      time: this.time,
      recipeName: this.recipeName,
      calories: this.calories,
      servings: this.servings,
      protein: this.protein,
      carbs: this.carbs,
      fat: this.fat,
    };

    console.log('Meal to save:', payload);
    // TODO: appel backend POST /api/calendar/days/:date/meals

    this.router.navigate(['/calendar', this.date]);
  }
}
