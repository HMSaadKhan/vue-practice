// week.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import WeeklyMeal from './weekly-meal.entity';

@Entity()
export default class Week {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', name: 'start_date', nullable: false })
  startDate: Date;

  @Column({ type: 'date', name: 'end_date', nullable: false })
  endDate: Date;

  @Column({ type: 'varchar', nullable: false, length: 50})
  week: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  month: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  year: string;

  @OneToMany(() => WeeklyMeal, (WeeklyMeal) => WeeklyMeal.week, {
    onDelete: 'CASCADE'
  })
  weeklyMeal: WeeklyMeal[];
}
