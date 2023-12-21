import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import {Meal} from './';
import { Keyword } from 'src/meal-keyword/entities';

@Entity('meal_key') 
export default class MealKey {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Meal, (meal) => meal)
  meal: Meal;

  @ManyToOne(() => Keyword, (keyword) => keyword)
  keyword: Keyword;

}
