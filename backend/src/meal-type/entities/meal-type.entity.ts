import { Meal } from 'src/meal/entities';
import WeeklyMeal from 'src/weekly-meal/entities/weekly-meal.entity';
import { Entity, PrimaryGeneratedColumn, Column, IntegerType, OneToMany } from 'typeorm';

@Entity()
export default class MealType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @OneToMany(() => Meal, (meal) => meal.type)
  meal: Meal[];

  @OneToMany(() => WeeklyMeal, (weeklyMeal) => weeklyMeal.meal_type_id)
  weeklyMeal: WeeklyMeal[];
}