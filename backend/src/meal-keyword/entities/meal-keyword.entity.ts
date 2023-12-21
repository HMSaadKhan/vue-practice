import { Meal } from 'src/meal/entities';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export default class Keyword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  key_name: string;

  @Column({type: 'boolean', default: 1, nullable: false})
  status: boolean;

  @ManyToMany(() => Meal, (meal) => meal.keywords , {
    onDelete: 'CASCADE'
  })
  @JoinTable({
    name: 'meal_keyword',
    joinColumn: { name: 'keyword_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'meal_id', referencedColumnName: 'id' },
  })
  meals: Meal[];

}


