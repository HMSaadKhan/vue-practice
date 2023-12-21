import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import {Meal} from './';
import { Allergen } from 'src/allergen/entities';

@Entity()
export default class MealAllergy {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Meal, (meal) => meal.allergens)
  meal: Meal;

  @ManyToOne(() => Allergen, (allergen) => allergen.meals)
  allergen: Allergen;
}


