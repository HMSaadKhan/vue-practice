import { Meal } from 'src/meal/entities';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export default class Allergens {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  allergy_name: string;

  
  @Column({ type: 'boolean', default: 1, nullable: false })
  status: boolean;

  @ManyToMany(() => Meal, (meal) => meal.allergens, {
    onDelete: 'CASCADE'
  })
  @JoinTable({
    name: 'meal_allergy',
    joinColumn: { name: 'allergen_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'meal_id', referencedColumnName: 'id' },
  })
  meals: Meal[];

}
