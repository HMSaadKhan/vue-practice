import { Meal, MealNutrition } from 'src/meal/entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export default class NutritionFact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nutrition_name: string;

  @Column({ type: 'varchar', length: 10 })
  unit: string;

  @OneToMany(() => MealNutrition, (MealNutrition) => MealNutrition.nutrition)
  nutrition: NutritionFact[];
}