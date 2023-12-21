import { Meal } from 'src/meal/entities';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export default class MealGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  group: string;

  @OneToMany(() => Meal, (meal) => meal.group)
  meal: Meal[];
}