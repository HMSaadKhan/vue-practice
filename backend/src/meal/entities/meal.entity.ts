
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany, DeleteDateColumn } from 'typeorm';
import { MealGroup } from 'src/meal-group/entities';
import { MealType } from 'src/meal-type/entities'; 
import { Keyword } from 'src/meal-keyword/entities';
import { Allergen } from 'src/allergen/entities';
import MealNutrition from './meal-nutrition.entity';
import WeeklyMeal from 'src/weekly-meal/entities/weekly-meal.entity';

@Entity()
export default class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  product_detail: string;

  @Column({ type: 'varchar', nullable: true })
  listing_page: string;

  @Column({ type: 'float', nullable: true })
  price: Float32Array;
  
  @ManyToOne(() => MealGroup, (group) => group.meal)
  @JoinColumn({ name: 'group' })
  group: MealGroup;
  
  @ManyToOne(() => MealType, (type) => type.meal)
  @JoinColumn({ name: 'type' })
  type: MealType;
  
  @Column({ type: 'varchar', nullable: false })
  image: string;

  @ManyToMany(() => Allergen, (allergen) => allergen.meals, {
    onDelete: 'CASCADE'
  })
  @JoinTable({
    name: 'meal_allergy',
    joinColumn: { name: 'meal_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'allergen_id', referencedColumnName: 'id' },
  })
  allergens: Allergen[];

  @OneToMany(() => MealNutrition, (MealNutrition) => MealNutrition.meal)
  nutrition: MealNutrition[];

  @OneToMany(() => WeeklyMeal, (WeeklyMeal) => WeeklyMeal.meal)
  week: WeeklyMeal[];

  @ManyToMany(() => Keyword, (keyword) => keyword.meals, {
    onDelete: 'CASCADE'
  })
  @JoinTable({
    name: 'meal_keyword',
    joinColumn: { name: 'meal_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'keyword_id', referencedColumnName: 'id' },
  })
  keywords: Keyword[];

  @Column({ type: 'varchar', length: 20, nullable: true })
  tailor_meal: string;

  @Column({ type: 'float', nullable: false })
  serving: Float32Array;

  @Column({ type: 'text', nullable: true })
  instructions: string;

  @Column({ type: 'text', nullable: true })
  features: string;

  @Column({ type: 'text', nullable: true })
  ingredients: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
