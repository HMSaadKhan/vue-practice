// meal-nutrition.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Meal } from './';
import { NutritionFact } from 'src/nutrition-fact/entities';


@Entity()
export default class MealNutrition {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Meal, meal => meal.nutrition)
  @JoinColumn({ name: 'meal_id' })
  meal: Meal;

  @ManyToOne(type => NutritionFact, nutrition => nutrition.nutrition)
  @JoinColumn({ name: 'nutrition_id' })
  nutrition: NutritionFact;

  @Column({ type: 'float', nullable: true })
  value: number;
  
}