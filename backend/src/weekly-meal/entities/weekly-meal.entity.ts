// week.entity.ts
import { MealType } from 'src/meal-type/entities';
import { Meal } from 'src/meal/entities';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import Week from './week.entity';

@Entity()
export default class WeeklyMeal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Meal, meal => meal.week, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'meal_id' })
  meal: Meal;

  @ManyToOne(type => Week, week => week.weeklyMeal, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'week_id' })
  week: Week;

  @ManyToOne(() => MealType, (meal_type_id) => meal_type_id.weeklyMeal, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'meal_type_id' })
  meal_type_id: MealType;
}
